import { writeFileSync, existsSync, readFileSync } from 'node:fs';
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { parseResponse } from 'errkit';
import { DashboardApi } from '../_internal/autogen/apis/DashboardApi.js';
import { Configuration, ResponseError } from '../_internal/autogen/runtime.js';
import type { SelectAppInput } from '../types.js';
import { getAuthFilePath, readSettingsFile, readSettingsFileAt, writeSettingsFile, writeSettingsFileAt, type AuthFile, type ResolvedConfig, type SmriteaSettings } from '../config.js';


export interface StudioAppItem {
  id: string;
  name?: string;
}

/**
 * Converts a Studio API error to a typed, informative Error message.
 * If the error is a ResponseError (generated API client), parse the response via errkit
 * to extract the server's code and message. Falls back to the original error message if parsing fails.
 * Non-ResponseError errors are re-raised unchanged.
 */
async function studioRequestError(op: string, err: unknown): Promise<Error> {
  if (err instanceof ResponseError) {
    let detail = '';
    try {
      const parsed = await parseResponse(err.response.clone());
      detail = ` (code: ${parsed.code}, message: ${parsed.message})`;
    } catch {
      // Parsing failed; detail stays empty, but error is still thrown below
    }
    return new Error(`Failed to ${op}${detail}`);
  }
  // Non-ResponseError: re-raise unchanged
  if (err instanceof Error) {
    return err;
  }
  return new Error(`Failed to ${op}: ${String(err)}`);
}

function readJsonFile<T>(path: string): T | null {
  if (!existsSync(path)) {
    return null;
  }

  const raw = readFileSync(path, 'utf-8');
  return JSON.parse(raw) as T;
}

function writeJsonFile(path: string, value: unknown): void {
  writeFileSync(path, JSON.stringify(value, null, 2) + '\n', 'utf-8');
}

function readAuthFile(): AuthFile | null {
  return readJsonFile<AuthFile>(getAuthFilePath());
}

function getRuntimeConfig(config?: ResolvedConfig): ResolvedConfig {
  if (config !== undefined) {
    return config;
  }

  const auth = readAuthFile();
  const settings = readSettingsFile();

  return {
    studioAccessToken: auth?.access_token,
    studioRefreshToken: auth?.refresh_token,
    selectedAppId: settings?.selected_app_id,
    selectedAppAPIKey: undefined,
    memoryBaseUrl: 'https://api-us.smritea.ai',
    studioBaseUrl: settings?.studio_base_url ?? 'https://api.smritea.ai',
    projectName: undefined,
    firstPersonUserId: auth?.user_id,
    apiKey: undefined,
    appId: settings?.selected_app_id,
  };
}

function getRequiredStudioAccessToken(config: ResolvedConfig): string {
  const token = config.studioAccessToken?.trim();
  if (!token) {
    throw new Error('Studio access token not found in ~/.smritea/auth.json. Run Studio login first.');
  }
  return token;
}

function createStudioHeaders(accessToken: string): Record<string, string> {
  return {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  };
}

function createStudioApi(config: ResolvedConfig): DashboardApi {
  const runtimeConfig = getRuntimeConfig(config);
  const accessToken = getRequiredStudioAccessToken(runtimeConfig);

  return new DashboardApi(
    new Configuration({
      basePath: runtimeConfig.studioBaseUrl,
      headers: createStudioHeaders(accessToken),
      credentials: 'omit',
    }),
  );
}

export async function fetchStudioApps(config: ResolvedConfig): Promise<StudioAppItem[]> {
  const api = createStudioApi(config);
  let items;
  try {
    items = await api.listApps();
  } catch (err) {
    throw await studioRequestError('list Studio apps', err);
  }

  return items
    .map((item) => ({
      id: item.response?.id?.trim() ?? '',
      name: item.response?.name?.trim() || undefined,
    }))
    .filter((item) => item.id.length > 0);
}

function buildApiKeyName(now: Date = new Date()): string {
  return `smritea-plugin-${now.toISOString().slice(0, 10)}`;
}

async function createStudioApiKey(config: ResolvedConfig, appId: string): Promise<string> {
  const auth = readAuthFile();
  const orgId = auth?.organization_id?.trim();
  if (!orgId) {
    throw new Error('Organization ID not found in ~/.smritea/auth.json. Run Studio login first.');
  }

  const api = createStudioApi(config);
  let payload;
  try {
    payload = await api.createApiKey({
      orgId,
      request: {
        appId,
        name: buildApiKeyName(),
      },
    });
  } catch (err) {
    throw await studioRequestError('create Studio API key', err);
  }

  const apiKey = payload.apiKey?.trim();
  if (!apiKey) {
    throw new Error('Studio API key response did not include apiKey.');
  }

  return apiKey;
}

async function ensureStoredApiKey(config: ResolvedConfig, input: SelectAppInput): Promise<{ appName?: string; createdApiKey: boolean }> {
  const auth = readAuthFile();
  if (!auth) {
    throw new Error('Studio auth file not found at ~/.smritea/auth.json. Run Studio login first.');
  }

  const existingEntry = auth.apps[input.app_id];
  const storedApiKey = existingEntry?.api_key?.trim();
  const appName = input.app_name ?? existingEntry?.app_name;
  if (storedApiKey) {
    auth.apps[input.app_id] = {
      api_key: storedApiKey,
      app_name: appName,
      first_person_user_id: existingEntry?.first_person_user_id,
    };
    writeJsonFile(getAuthFilePath(), auth);
    return { appName, createdApiKey: false };
  }

  const apiKey = await createStudioApiKey(config, input.app_id);
  auth.apps[input.app_id] = {
    api_key: apiKey,
    app_name: appName,
    first_person_user_id: existingEntry?.first_person_user_id,
  };
  writeJsonFile(getAuthFilePath(), auth);
  return { appName, createdApiKey: true };
}

export async function handleSelectApp(input: SelectAppInput, config: ResolvedConfig, targetPath?: string): Promise<CallToolResult> {
  const settings: SmriteaSettings = (targetPath !== undefined ? readSettingsFileAt(targetPath) : readSettingsFile()) ?? {};
  settings.selected_app_id = input.app_id;
  if (targetPath !== undefined) {
    writeSettingsFileAt(targetPath, settings);
  } else {
    writeSettingsFile(settings);
  }

  const { appName, createdApiKey } = await ensureStoredApiKey(config, input);

  const name = appName !== undefined ? ` (${appName})` : '';
  const keyNote = createdApiKey
    ? 'A new Studio API key was created and stored in ~/.smritea/auth.json.'
    : 'The existing Studio API key in ~/.smritea/auth.json will be used.';

  return {
    content: [
      {
        type: 'text',
        text: [
          `App selected: ${input.app_id}${name}`,
          'User settings updated.',
          keyNote,
          "When SMRITEA_DEV_CONFIG is set, this project's .smritea/settings.json is used instead of the user-level file.",
        ].join('\n'),
      },
    ],
  };
}

export async function handleListApps(config: ResolvedConfig): Promise<CallToolResult> {
  const apps = await fetchStudioApps(config);
  const selectedAppId = config.selectedAppId;

  const lines = apps.length > 0
    ? apps.map((app) => {
        const marker = app.id === selectedAppId ? '*' : '-';
        const suffix = app.name ? ` (${app.name})` : '';
        return `${marker} ${app.id}${suffix}`;
      })
    : ['No apps found for this Studio account.'];

  if (selectedAppId) {
    lines.unshift(`Selected app: ${selectedAppId}`);
    lines.unshift('');
    lines.unshift('Studio apps:');
  } else {
    lines.unshift('Studio apps:');
  }

  return {
    content: [
      {
        type: 'text',
        text: lines.join('\n'),
      },
    ],
  };
}

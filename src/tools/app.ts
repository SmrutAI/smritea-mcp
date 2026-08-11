import { mkdirSync, writeFileSync, existsSync, readFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { DashboardApi } from '../_internal/autogen/apis/DashboardApi.js';
import { Configuration } from '../_internal/autogen/runtime.js';
import type { SelectAppInput } from '../types.js';
import type { AuthFile, GlobalConfigFile, ResolvedConfig } from '../config.js';

const USER_SMRITEA_DIR = join(homedir(), '.smritea');
const AUTH_PATH = join(USER_SMRITEA_DIR, 'auth.json');
const GLOBAL_CONFIG_PATH = join(USER_SMRITEA_DIR, 'config.json');
const PROJECT_SMRITEA_DIR = join(process.cwd(), '.smritea');
const GITIGNORE_PATH = join(PROJECT_SMRITEA_DIR, '.gitignore');

interface StudioAppItem {
  id: string;
  name?: string;
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
  return readJsonFile<AuthFile>(AUTH_PATH);
}

function getRuntimeConfig(config?: ResolvedConfig): ResolvedConfig {
  if (config !== undefined) {
    return config;
  }

  const auth = readAuthFile();
  const globalConfig = readGlobalConfigFile();

  return {
    studioAccessToken: auth?.access_token,
    studioRefreshToken: auth?.refresh_token,
    selectedAppId: globalConfig?.selected_app_id,
    selectedAppAPIKey: undefined,
    dataBaseUrl: 'https://api-us.smritea.ai',
    studioBaseUrl: globalConfig?.studio_base_url ?? 'https://api.smritea.ai',
    projectName: undefined,
    firstPersonUserId: auth?.user_id,
    apiKey: undefined,
    appId: globalConfig?.selected_app_id,
  };
}

function readGlobalConfigFile(): GlobalConfigFile | null {
  return readJsonFile<GlobalConfigFile>(GLOBAL_CONFIG_PATH);
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

async function listStudioApps(config: ResolvedConfig): Promise<StudioAppItem[]> {
  const api = createStudioApi(config);
  const items = await api.listApps();

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
  const orgId = auth?.org_id?.trim() ?? auth?.organization_id?.trim();
  if (!orgId) {
    throw new Error('Organization ID not found in ~/.smritea/auth.json. Run Studio login first.');
  }

  const api = createStudioApi(config);
  const payload = await api.createApiKey({
    orgId,
    request: {
      appId,
      name: buildApiKeyName(),
    },
  });

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
    writeJsonFile(AUTH_PATH, auth);
    return { appName, createdApiKey: false };
  }

  const apiKey = await createStudioApiKey(config, input.app_id);
  auth.apps[input.app_id] = {
    api_key: apiKey,
    app_name: appName,
    first_person_user_id: existingEntry?.first_person_user_id,
  };
  writeJsonFile(AUTH_PATH, auth);
  return { appName, createdApiKey: true };
}

export async function handleSelectApp(input: SelectAppInput, config: ResolvedConfig): Promise<CallToolResult> {
  mkdirSync(USER_SMRITEA_DIR, { recursive: true });

  const globalConfig = readGlobalConfigFile() ?? {};
  globalConfig.selected_app_id = input.app_id;
  writeJsonFile(GLOBAL_CONFIG_PATH, globalConfig);

  const { appName, createdApiKey } = await ensureStoredApiKey(config, input);

  // Prevent committing project-scoped metadata if users create it later.
  mkdirSync(PROJECT_SMRITEA_DIR, { recursive: true });
  if (!existsSync(GITIGNORE_PATH)) {
    writeFileSync(GITIGNORE_PATH, 'config.json\n', 'utf-8');
  }

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
          `User config written to: ${GLOBAL_CONFIG_PATH}`,
          keyNote,
          'Project .smritea/config.json stays reserved for project metadata only.',
        ].join('\n'),
      },
    ],
  };
}

export async function handleListApps(config: ResolvedConfig): Promise<CallToolResult> {
  const apps = await listStudioApps(config);
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

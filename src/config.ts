/**
 * Two-file configuration for smritea-mcp.
 *
 * auth.json  — account secrets: tokens, identity, and per-app API keys ("apps"). Location is
 *              resolved indirectly, via whichever settings.json is active (see below). Never
 *              itself subject to a project/dev override — only its resolved PATH varies.
 * settings.json — everything else: selected app, both base URLs, and (optionally) where auth.json
 *              lives. Safe to commit — never contains a secret. Resolved from exactly one of two
 *              locations, full-file, never merged:
 *                - ~/.smritea/settings.json                 (default, "production")
 *                - <cwd>/.smritea/settings.json              (project override)
 *              Selection is a single boolean: the SMRITEA_DEV_CONFIG env var. Off → always the
 *              user-level file. On → the project file if it exists at cwd, else still the
 *              user-level file. Never merged, never both.
 *
 * No other environment variables are read anywhere in this file. Every value (selected app,
 * API key, both URLs) comes exclusively from the resolved settings.json / auth.json.
 *
 * smritea-cloud runs two separate planes (see cloud_backend/README.md):
 *   - Data plane  (`memoryBaseUrl`)   — memory add/search/get/delete (SmriteaClient). Hardcoded default: https://api-us.smritea.ai
 *   - Control plane (`studioBaseUrl`) — org/app/auth management. Hardcoded default: https://api.smritea.ai
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

export interface AuthFile {
  organization_id?: string;
  user_id?: string;
  email?: string;
  access_token: string;
  refresh_token: string;
  token_type?: string;
  expires_in?: number;
  expires_at: string;
  apps: Record<
    string,
    {
      api_key: string;
      app_name?: string;
      first_person_user_id?: string;
    }
  >;
}

export interface SmriteaSettings {
  selected_app_id?: string;
  studio_base_url?: string;
  memory_base_url?: string;
  /** Absolute path to the auth.json file this settings file says to use. Default: ~/.smritea/auth.json. */
  auth_file_path?: string;
  project_name?: string;
  /** Up to 3 free-form tag strings, stored as map keys. Not yet consumed by any tool call. */
  tags?: Record<string, boolean>;
  preferences?: Record<string, unknown>;
}

export interface ResolvedConfig {
  studioAccessToken?: string;
  studioRefreshToken?: string;
  selectedAppId?: string;
  selectedAppAPIKey?: string;
  memoryBaseUrl: string;
  studioBaseUrl: string;
  projectName?: string;
  firstPersonUserId?: string;
  apiKey?: string;
  appId?: string;
}

const DEFAULT_MEMORY_BASE_URL = 'https://api-us.smritea.ai';
const DEFAULT_STUDIO_BASE_URL = 'https://api.smritea.ai';

const AUTH_CONFIG_PATH = join(homedir(), '.smritea', 'auth.json');

export function isDevConfigEnabled(): boolean {
  const v = process.env['SMRITEA_DEV_CONFIG'];
  return v !== undefined && v !== '' && v !== '0' && v.toLowerCase() !== 'false';
}

function settingsFileName(): string {
  return isDevConfigEnabled() ? 'settings.dev.json' : 'settings.json';
}

/**
 * Resolves which settings.json to use. One boolean decision, no merge:
 * SMRITEA_DEV_CONFIG off → always ~/.smritea/settings.json.
 * SMRITEA_DEV_CONFIG on  → <cwd>/.smritea/settings.json if it exists, else still the user file.
 */
function resolveSettingsPath(): string {
  const fileName = settingsFileName();
  const projectPath = join(process.cwd(), '.smritea', fileName);
  if (existsSync(projectPath)) {
    return projectPath;
  }
  return join(homedir(), '.smritea', fileName);
}

function readJsonFile<T>(path: string): T | null {
  if (!existsSync(path)) return null;
  const raw = readFileSync(path, 'utf-8');
  return JSON.parse(raw) as T;
}

function writeJsonFile(path: string, value: unknown): void {
  writeFileSync(path, JSON.stringify(value, null, 2) + '\n', 'utf-8');
}

/**
 * Creates the resolved settings.json with default values if it does not already exist.
 * Never overwrites an existing settings file. Must run before login writes auth.json, since the
 * settings file (not a hardcoded constant) is the source of truth for where auth.json lives.
 */
export function ensureSettingsFile(): void {
  const path = resolveSettingsPath();
  if (existsSync(path)) {
    return;
  }
  const defaults: SmriteaSettings = {
    studio_base_url: DEFAULT_STUDIO_BASE_URL,
    memory_base_url: DEFAULT_MEMORY_BASE_URL,
  };
  mkdirSync(join(path, '..'), { recursive: true });
  writeJsonFile(path, defaults);
}

/**
 * Reads the currently-resolved settings.json. Exported so tools/app.ts can read the same file
 * this module resolves, for select_app's targeted (never full-overwrite) mutation.
 */
export function readSettingsFile(): SmriteaSettings | null {
  return readJsonFile<SmriteaSettings>(resolveSettingsPath());
}

/**
 * Writes value as the full content of the currently-resolved settings.json. Callers must pass an
 * object built by mutating readSettingsFile()'s own raw return value (or an empty object if none
 * exists yet) — never a merged/effective view — so an existing sparse settings file never
 * accretes fields it didn't already have.
 */
export function writeSettingsFile(value: SmriteaSettings): void {
  writeJsonFile(resolveSettingsPath(), value);
}

export function getSettingsPathForScope(scope: 'user' | 'project'): string {
  const fileName = settingsFileName();
  return scope === 'user'
    ? join(homedir(), '.smritea', fileName)
    : join(process.cwd(), '.smritea', fileName);
}

export function readSettingsFileAt(path: string): SmriteaSettings | null {
  return readJsonFile<SmriteaSettings>(path);
}

export function writeSettingsFileAt(path: string, value: SmriteaSettings): void {
  writeJsonFile(path, value);
}

function readAuthFile(): AuthFile | null {
  return readJsonFile<AuthFile>(getAuthFilePath());
}

/**
 * Resolves the auth.json file path via the resolved settings.json's auth_file_path field,
 * defaulting to ~/.smritea/auth.json when unset. All auth reads and writes across the MCP MUST
 * go through this function — never hardcode the auth.json path.
 */
export function getAuthFilePath(): string {
  const settings = readSettingsFile();
  if (settings?.auth_file_path) {
    return settings.auth_file_path;
  }
  return AUTH_CONFIG_PATH;
}

export function loadConfig(): ResolvedConfig {
  const auth = readAuthFile();
  const settings = readSettingsFile();

  const selectedAppId = settings?.selected_app_id;
  const selectedAppAPIKey = selectedAppId ? auth?.apps?.[selectedAppId]?.api_key : undefined;
  const memoryBaseUrl = settings?.memory_base_url ?? DEFAULT_MEMORY_BASE_URL;
  const studioBaseUrl = settings?.studio_base_url ?? DEFAULT_STUDIO_BASE_URL;

  const firstPersonUserId = auth?.user_id ?? (selectedAppId ? auth?.apps?.[selectedAppId]?.first_person_user_id : undefined);

  return {
    studioAccessToken: auth?.access_token,
    studioRefreshToken: auth?.refresh_token,
    selectedAppId,
    selectedAppAPIKey,
    memoryBaseUrl,
    studioBaseUrl,
    projectName: settings?.project_name,
    firstPersonUserId,
    apiKey: selectedAppAPIKey,
    appId: selectedAppId,
  };
}

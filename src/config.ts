/**
 * Three-tier configuration for smritea-mcp.
 *
 * User-scoped auth (~/.smritea/auth.json):             studio tokens and per-app API keys
 * User-scoped config (~/.smritea/config.json):         selected app and defaults
 * Project-scoped     (.smritea/config.json):           project metadata
 *
 * Environment variable overrides:
 *   SMRITEA_API_KEY, SMRITEA_BASE_URL, SMRITEA_STUDIO_BASE_URL, SMRITEA_APP_ID
 *
 * smritea-cloud runs two separate planes (see cloud_backend/README.md):
 *   - Data plane  (`dataBaseUrl`)     — memory add/search/get/delete (SmriteaClient). Hardcoded: https://api-us.smritea.ai
 *   - Control plane (`studioBaseUrl`) — org/app/auth management. Hardcoded: https://api.smritea.ai
 * Both are env-var-or-hardcoded-default only unless a global config file sets them.
 * SmriteaClient only ever calls the data plane; studioBaseUrl is resolved for future
 * studio-facing calls (e.g. app listing, credential validation) — not yet used at runtime.
 */
import { existsSync, readFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

export interface AuthFile {
  access_token: string;
  refresh_token: string;
  expires_at: string;
  user_id?: string;
  email?: string;
  org_id?: string;
  organization_id?: string;
  org_name?: string;
  apps: Record<
    string,
    {
      api_key: string;
      app_name?: string;
      first_person_user_id?: string;
    }
  >;
}

export interface GlobalConfigFile {
  selected_app_id?: string;
  base_url?: string;
  studio_base_url?: string;
  default_project?: string;
  preferences?: Record<string, unknown>;
}

export interface ProjectConfig {
  app_id?: string;
  app_name?: string;
  project?: string;
}

export interface ResolvedConfig {
  studioAccessToken?: string;
  studioRefreshToken?: string;
  selectedAppId?: string;
  selectedAppAPIKey?: string;
  dataBaseUrl: string;
  studioBaseUrl: string;
  projectName?: string;
  firstPersonUserId?: string;
  apiKey?: string;
  appId?: string;
}

const DEFAULT_DATA_PLANE_BASE_URL = 'https://api-us.smritea.ai';
const DEFAULT_STUDIO_BASE_URL = 'https://api.smritea.ai';

const AUTH_CONFIG_PATH = join(homedir(), '.smritea', 'auth.json');
const GLOBAL_CONFIG_PATH = join(homedir(), '.smritea', 'config.json');
const PROJECT_CONFIG_PATH = join(process.cwd(), '.smritea', 'config.json');

function readJsonFile<T>(path: string): T | null {
  if (!existsSync(path)) return null;
  const raw = readFileSync(path, 'utf-8');
  return JSON.parse(raw) as T;
}

function readAuthFile(): AuthFile | null {
  return readJsonFile<AuthFile>(AUTH_CONFIG_PATH);
}

function readGlobalConfigFile(): GlobalConfigFile | null {
  return readJsonFile<GlobalConfigFile>(GLOBAL_CONFIG_PATH);
}

function readProjectConfig(): ProjectConfig | null {
  return readJsonFile<ProjectConfig>(PROJECT_CONFIG_PATH);
}

export function loadConfig(): ResolvedConfig {
  const auth = readAuthFile();
  const globalConfig = readGlobalConfigFile();
  const projectConfig = readProjectConfig();

  const selectedAppId =
    process.env['SMRITEA_APP_ID'] ?? projectConfig?.app_id ?? globalConfig?.selected_app_id;
  const selectedAppAPIKey = process.env['SMRITEA_API_KEY'] ?? (selectedAppId ? auth?.apps?.[selectedAppId]?.api_key : undefined);
  const dataBaseUrl = process.env['SMRITEA_BASE_URL'] ?? globalConfig?.base_url ?? DEFAULT_DATA_PLANE_BASE_URL;
  const studioBaseUrl =
    process.env['SMRITEA_STUDIO_BASE_URL'] ?? globalConfig?.studio_base_url ?? DEFAULT_STUDIO_BASE_URL;

  const firstPersonUserId = auth?.user_id ?? (selectedAppId ? auth?.apps?.[selectedAppId]?.first_person_user_id : undefined);

  return {
    studioAccessToken: auth?.access_token,
    studioRefreshToken: auth?.refresh_token,
    selectedAppId,
    selectedAppAPIKey,
    dataBaseUrl,
    studioBaseUrl,
    projectName: projectConfig?.project,
    firstPersonUserId,
    apiKey: selectedAppAPIKey,
    appId: selectedAppId,
  };
}

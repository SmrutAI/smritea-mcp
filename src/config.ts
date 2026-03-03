/**
 * Two-tier configuration for smritea-mcp.
 *
 * User-scoped  (~/.smritea/mcp-config.json): api_key, base_url
 * Project-scoped (.smritea/config.json):     app_id, app_name
 *
 * Environment variable overrides:
 *   SMRITEA_API_KEY, SMRITEA_BASE_URL, SMRITEA_APP_ID
 */
import { readFileSync, existsSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

export interface UserConfig {
  api_key: string;
  base_url: string;
  first_person_user_id?: string;
}

export interface ProjectConfig {
  app_id: string;
  app_name?: string;
}

export interface ResolvedConfig {
  apiKey: string;
  baseUrl: string;
  appId: string;
  /** Used as user_id when the user refers to themselves ("I prefer…", "I like…"). */
  firstPersonUserId?: string;
}

const USER_CONFIG_PATH = join(homedir(), '.smritea', 'mcp-config.json');
const PROJECT_CONFIG_PATH = join(process.cwd(), '.smritea', 'config.json');

function readJsonFile<T>(path: string): T | null {
  if (!existsSync(path)) return null;
  const raw = readFileSync(path, 'utf-8');
  return JSON.parse(raw) as T;
}

export function loadConfig(): ResolvedConfig {
  const user = readJsonFile<UserConfig>(USER_CONFIG_PATH);
  const project = readJsonFile<ProjectConfig>(PROJECT_CONFIG_PATH);

  const apiKey = process.env['SMRITEA_API_KEY'] ?? user?.api_key;
  const baseUrl = process.env['SMRITEA_BASE_URL'] ?? user?.base_url ?? 'https://api.smritea.ai';
  const appId = process.env['SMRITEA_APP_ID'] ?? project?.app_id;
  const firstPersonUserId = process.env['SMRITEA_FIRST_PERSON_USER_ID'] ?? user?.first_person_user_id;

  if (!apiKey) {
    throw new Error(
      'smritea API key not configured. Run: npx smritea-mcp init\n' +
      `Or set SMRITEA_API_KEY env var.\n` +
      `Config file expected at: ${USER_CONFIG_PATH}`
    );
  }
  if (!appId) {
    throw new Error(
      'smritea app ID not configured. Run: npx smritea-mcp select-app <app_id>\n' +
      `Or set SMRITEA_APP_ID env var.\n` +
      `Config file expected at: ${PROJECT_CONFIG_PATH}`
    );
  }

  return { apiKey, baseUrl, appId, firstPersonUserId };
}

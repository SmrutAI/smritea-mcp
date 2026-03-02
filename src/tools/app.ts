import { mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import type { SelectAppInput } from '../types.js';
import type { ResolvedConfig } from '../config.js';

const SMRITEA_DIR = join(process.cwd(), '.smritea');
const CONFIG_PATH = join(SMRITEA_DIR, 'config.json');
const GITIGNORE_PATH = join(SMRITEA_DIR, '.gitignore');

export function handleSelectApp(input: SelectAppInput): CallToolResult {
  mkdirSync(SMRITEA_DIR, { recursive: true });

  const config: { app_id: string; app_name?: string } = { app_id: input.app_id };
  if (input.app_name !== undefined) {
    config.app_name = input.app_name;
  }
  writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2) + '\n', 'utf-8');

  // Prevent committing the project-scoped config — it is machine/project-local
  if (!existsSync(GITIGNORE_PATH)) {
    writeFileSync(GITIGNORE_PATH, 'config.json\n', 'utf-8');
  }

  const name = input.app_name !== undefined ? ` (${input.app_name})` : '';
  return {
    content: [
      {
        type: 'text',
        text: `App selected: ${input.app_id}${name}\nConfig written to: ${CONFIG_PATH}\nAll memory operations in this project will now use this app.`,
      },
    ],
  };
}

/**
 * list_apps — stub.
 *
 * Listing apps via API key is not yet supported by the smritea SDK API.
 * API key auth is scoped to a single app; a dedicated /api/v1/sdk/apps
 * endpoint is needed before this can enumerate all apps for an organisation.
 *
 * For now, returns the currently active app from config.
 */
export function handleListApps(config: ResolvedConfig): CallToolResult {
  return {
    content: [
      {
        type: 'text',
        text: [
          `Currently active app: ${config.appId}`,
          '',
          'Note: listing all apps is not yet available via API key auth.',
          'To switch apps, use the select_app tool with the desired app ID.',
        ].join('\n'),
      },
    ],
  };
}

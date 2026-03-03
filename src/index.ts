#!/usr/bin/env node
import { startServer } from './server.js';
import { createInterface } from 'node:readline/promises';
import { mkdirSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

async function runInit(): Promise<void> {
  const configDir = join(homedir(), '.smritea');
  const configPath = join(configDir, 'mcp-config.json');

  const rl = createInterface({ input: process.stdin, output: process.stdout });
  try {
    const baseUrlAnswer = await rl.question('API base URL [https://api.smritea.ai]: ');
    const baseUrl = baseUrlAnswer.trim() || 'https://api.smritea.ai';

    const apiKeyAnswer = await rl.question('API key: ');
    const apiKey = apiKeyAnswer.trim();
    if (!apiKey) {
      console.error('Error: API key is required.');
      process.exit(1);
    }

    const firstPersonUserIdAnswer = await rl.question(
      'Your name or user ID (used when you say "I prefer…", "I like…") [optional]: ',
    );
    const firstPersonUserId = firstPersonUserIdAnswer.trim() || undefined;

    mkdirSync(configDir, { recursive: true });
    const configData: Record<string, string> = { api_key: apiKey, base_url: baseUrl };
    if (firstPersonUserId !== undefined) {
      configData['first_person_user_id'] = firstPersonUserId;
    }
    writeFileSync(configPath, JSON.stringify(configData, null, 2) + '\n');

    console.error('✓ Config saved to ' + configPath);
    if (firstPersonUserId !== undefined) {
      console.error(`✓ First-person user ID set to: ${firstPersonUserId}`);
    }
    console.error('Next: use the select_app tool in your AI assistant to set an app ID.');
  } finally {
    rl.close();
  }
}

const subcommand = process.argv[2];

if (subcommand === 'serve' || subcommand === undefined) {
  startServer().catch((err: unknown) => {
    console.error('Fatal:', err);
    process.exit(1);
  });
} else if (subcommand === 'init') {
  runInit().catch((err: unknown) => {
    console.error('Init failed:', err);
    process.exit(1);
  });
} else {
  console.error(`Unknown subcommand: ${subcommand}`);
  console.error('Usage: smritea-mcp [serve|init]');
  process.exit(1);
}

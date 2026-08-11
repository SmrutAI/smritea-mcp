#!/usr/bin/env node
import { startServer } from './server.js';
import { startSseServer } from './sse.js';
import { runLoginFlow } from './auth.js';

const subcommand = process.argv[2];

if (subcommand === 'serve' || subcommand === undefined) {
  startServer().catch((err: unknown) => {
    console.error('Fatal:', err);
    process.exit(1);
  });
} else if (subcommand === 'serve-sse') {
  const port = parseInt(process.argv[3] ?? '3000', 10);
  if (isNaN(port)) {
    console.error('Error: port must be a number');
    process.exit(1);
  }
  startSseServer(port).catch((err: unknown) => {
    console.error('Fatal:', err);
    process.exit(1);
  });
} else if (subcommand === 'init') {
  console.error('The "init" command has been removed.');
  console.error('Run "smritea-mcp login" to authenticate via Studio OAuth.');
  console.error('Then use the select_app tool in your AI assistant to choose an app.');
  process.exit(1);
} else if (subcommand === 'login') {
  runLoginFlow().catch((err: unknown) => {
    console.error('Login failed:', err);
    process.exit(1);
  });
} else {
  console.error(`Unknown subcommand: ${subcommand}`);
  console.error('Usage: smritea-mcp [serve|serve-sse [port]|login]');
  process.exit(1);
}

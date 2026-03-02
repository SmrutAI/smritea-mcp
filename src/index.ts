#!/usr/bin/env node
import { startServer } from './server.js';

const subcommand = process.argv[2];

if (subcommand === 'serve' || subcommand === undefined) {
  startServer().catch((err: unknown) => {
    console.error('Fatal:', err);
    process.exit(1);
  });
} else if (subcommand === 'init') {
  console.error('smritea-mcp init: not yet implemented');
  process.exit(1);
} else {
  console.error(`Unknown subcommand: ${subcommand}`);
  console.error('Usage: smritea-mcp [serve|init]');
  process.exit(1);
}

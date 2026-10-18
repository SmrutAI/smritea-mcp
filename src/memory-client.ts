import { SmriteaClient } from 'smritea-sdk';

import type { ResolvedConfig } from './config.js';

/**
 * Builds the memory client for one MCP process. Every memory call made through the returned client
 * carries `traceId` as X-Trace-ID. Throws when no app is selected or the selected app has no API key.
 */
export function createMemoryClient(config: ResolvedConfig, traceId: string): SmriteaClient {
  if (config.apiKey === undefined || config.appId === undefined) {
    throw new Error(
      'No app selected or no API key found. Run list_apps and select_app first.',
    );
  }

  return new SmriteaClient({
    apiKey: config.apiKey,
    appId: config.appId,
    baseUrl: config.memoryBaseUrl,
    traceId,
  });
}

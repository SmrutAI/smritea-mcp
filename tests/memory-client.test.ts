import { beforeEach, describe, expect, it, vi } from 'vitest';

import { SmriteaClient } from 'smritea-sdk';

import { buildMcpTraceId, type ResolvedConfig } from '../src/config.js';
import { createMemoryClient } from '../src/memory-client.js';

const { constructorSpy } = vi.hoisted(() => ({ constructorSpy: vi.fn() }));

// Keep the real SmriteaClient behaviour and only record the options it is constructed with, so the
// test proves the traceId that createMemoryClient receives is the one handed to the SDK.
vi.mock('smritea-sdk', async (importOriginal) => {
  const actual = await importOriginal<typeof import('smritea-sdk')>();
  class SpiedSmriteaClient extends actual.SmriteaClient {
    constructor(config: ConstructorParameters<typeof actual.SmriteaClient>[0]) {
      super(config);
      constructorSpy(config);
    }
  }
  return { ...actual, SmriteaClient: SpiedSmriteaClient };
});

function makeConfig(overrides: Partial<ResolvedConfig> = {}): ResolvedConfig {
  return {
    studioBaseUrl: 'https://api.smritea.ai',
    memoryBaseUrl: 'https://api-us.smritea.ai',
    apiKey: 'test-api-key',
    appId: 'app_test',
    ...overrides,
  };
}

describe('createMemoryClient', () => {
  beforeEach(() => {
    constructorSpy.mockClear();
  });

  it.each([
    ['an MCP process trace ID', buildMcpTraceId(new Date('2026-10-17T11:02:03Z'))],
    ['a plain trace ID', 'abcdefgh-trace'],
  ])('passes %s to the SmriteaClient constructor as traceId', (_label, traceId) => {
    const client = createMemoryClient(makeConfig(), traceId);

    expect(client, 'createMemoryClient must return a real SmriteaClient').toBeInstanceOf(SmriteaClient);
    expect(constructorSpy, `SmriteaClient must receive traceId ${traceId}`).toHaveBeenCalledWith(
      expect.objectContaining({
        traceId,
        apiKey: 'test-api-key',
        appId: 'app_test',
        baseUrl: 'https://api-us.smritea.ai',
      }),
    );
  });

  it.each([
    ['apiKey is unset', { apiKey: undefined }],
    ['appId is unset', { appId: undefined }],
  ])('throws the setup error when %s, without building a client', (_label, overrides) => {
    expect(
      () => createMemoryClient(makeConfig(overrides), buildMcpTraceId(new Date('2026-10-17T11:02:03Z'))),
      'missing credentials must throw the setup error',
    ).toThrow('No app selected or no API key found. Run list_apps and select_app first.');
    expect(constructorSpy, 'no SmriteaClient may be constructed without credentials').not.toHaveBeenCalled();
  });

  it.each([
    ['2026-10-17T11:02:03.456Z'],
    ['2000-01-01T00:00:00.000Z'],
    ['2026-12-31T23:59:59.999Z'],
  ])('does not throw for the MCP trace ID built at %s', (iso) => {
    expect(
      () => createMemoryClient(makeConfig(), buildMcpTraceId(new Date(iso))),
      `a valid config with buildMcpTraceId(${iso}) must construct a client`,
    ).not.toThrow();
  });
});

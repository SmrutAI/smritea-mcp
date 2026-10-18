import { describe, it, expect } from 'vitest';
import { buildMcpTraceId, buildTraceId, MCP_TRACE_ORIGIN } from '../src/config.js';

// The SDK accepts a trace ID of 8-100 characters from this set (see smritea-sdk client).
const SDK_TRACE_ID_PATTERN = /^[A-Za-z0-9._:-]{8,100}$/;

describe('buildTraceId', () => {
  it.each([
    ['2026-10-17T11:02:03.456Z', 'smritea-mcp', '20261017T110203.smritea-mcp'],
    ['2026-10-17T11:02:03.456Z', 'smritea-plugin', '20261017T110203.smritea-plugin'],
    ['2000-01-01T00:00:00.000Z', 'smritea-plugin', '20000101T000000.smritea-plugin'],
    ['2026-12-31T23:59:59.999Z', 'smritea-mcp', '20261231T235959.smritea-mcp'],
  ])('formats %s with origin %s as %s', (iso, origin, expected) => {
    expect(buildTraceId(new Date(iso), origin), `buildTraceId(${iso}, ${origin})`).toBe(expected);
  });

  it.each([
    ['2026-10-17T11:02:03.456Z'],
    ['2000-01-01T00:00:00.000Z'],
  ])('matches buildMcpTraceId for %s when given the MCP origin', (iso) => {
    expect(
      buildTraceId(new Date(iso), MCP_TRACE_ORIGIN),
      'the MCP builder must be the generic builder with the MCP origin',
    ).toBe(buildMcpTraceId(new Date(iso)));
  });
});

describe('buildMcpTraceId', () => {
  it.each([
    ['2026-10-17T11:02:03.456Z', '20261017T110203.smritea-mcp'],
    ['2000-01-01T00:00:00.000Z', '20000101T000000.smritea-mcp'],
    ['2026-12-31T23:59:59.999Z', '20261231T235959.smritea-mcp'],
  ])('formats %s as the UTC run ID plus the MCP origin: %s', (iso, expected) => {
    expect(buildMcpTraceId(new Date(iso))).toBe(expected);
  });

  it('ends with the MCP origin segment', () => {
    expect(MCP_TRACE_ORIGIN).toBe('smritea-mcp');
    expect(buildMcpTraceId(new Date('2026-10-17T11:02:03Z')).endsWith(`.${MCP_TRACE_ORIGIN}`)).toBe(true);
  });

  it.each([
    ['2026-10-17T11:02:03.456Z'],
    ['2000-01-01T00:00:00.000Z'],
    ['2026-12-31T23:59:59.999Z'],
  ])('produces a value the SDK accepts as a trace ID: %s', (iso) => {
    expect(buildMcpTraceId(new Date(iso))).toMatch(SDK_TRACE_ID_PATTERN);
  });
});

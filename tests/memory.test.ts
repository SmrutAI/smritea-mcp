import { vi, describe, it, expect, beforeEach } from 'vitest';

// Mock the entire smritea-sdk module so we never import the real file: dependency.
// The mock classes must support instanceof checks, which vitest handles since
// vi.mock is hoisted to the top of the file.
vi.mock('smritea-sdk', () => {
  class SmriteaError extends Error {
    statusCode?: number;
    constructor(message: string, statusCode?: number) {
      super(message);
      this.name = 'SmriteaError';
      this.statusCode = statusCode;
    }
  }
  class SmriteaRateLimitError extends SmriteaError {
    retryAfter?: number;
    constructor(message: string, statusCode?: number, retryAfter?: number) {
      super(message, statusCode);
      this.name = 'SmriteaRateLimitError';
      this.retryAfter = retryAfter;
    }
  }
  return { SmriteaError, SmriteaRateLimitError, SmriteaClient: vi.fn() };
});

import { SmriteaError, SmriteaRateLimitError } from 'smritea-sdk';
import {
  formatError,
  handleAddMemory,
  handleSearchMemories,
  handleGetMemory,
  handleDeleteMemory,
} from '../src/tools/memory.js';

// ---------------------------------------------------------------------------
// formatError
// ---------------------------------------------------------------------------
describe('formatError', () => {
  it('includes retry-after duration for SmriteaRateLimitError with retryAfter', () => {
    const err = new SmriteaRateLimitError('rate limited', 429, 10);
    const result = formatError(err);
    expect(result).toContain('retry after 10s');
  });

  it('omits retry-after when retryAfter is undefined', () => {
    const err = new SmriteaRateLimitError('rate limited', 429);
    const result = formatError(err);
    expect(result).not.toContain('retry after');
    // Falls through to SmriteaError branch, returns .message
    expect(result).toBe('rate limited');
  });

  it('returns message for plain SmriteaError', () => {
    const err = new SmriteaError('not found', 404);
    expect(formatError(err)).toBe('not found');
  });

  it('returns String(err) for generic errors', () => {
    const err = new Error('boom');
    expect(formatError(err)).toBe('Error: boom');
  });

  it('handles non-Error values gracefully', () => {
    expect(formatError('something broke')).toBe('something broke');
  });
});

// ---------------------------------------------------------------------------
// handleAddMemory
// ---------------------------------------------------------------------------
describe('handleAddMemory', () => {
  let mockClient: { add: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    mockClient = { add: vi.fn() };
  });

  it('returns formatted memory on success', async () => {
    const memoryPayload = { id: 'mem_1', content: 'test memory' };
    mockClient.add.mockResolvedValue(memoryPayload);

    const result = await handleAddMemory(
      mockClient as any,
      { content: 'test memory' },
    );

    expect(result.isError).toBeUndefined();
    expect(result.content).toHaveLength(1);
    const parsed = JSON.parse(result.content[0].text);
    expect(parsed.id).toBe('mem_1');
    expect(parsed.content).toBe('test memory');
  });

  it('uses firstPersonUserId when input.actor_id is undefined', async () => {
    mockClient.add.mockResolvedValue({ id: 'mem_2' });

    await handleAddMemory(
      mockClient as any,
      { content: 'hello' },
      'alice',
    );

    expect(mockClient.add).toHaveBeenCalledWith('hello', expect.objectContaining({
      actorId: 'alice',
      actorType: 'user',
    }));
  });

  it('prefers input.actor_id over firstPersonUserId', async () => {
    mockClient.add.mockResolvedValue({ id: 'mem_3' });

    await handleAddMemory(
      mockClient as any,
      { content: 'hello', actor_id: 'bob' },
      'alice',
    );

    expect(mockClient.add).toHaveBeenCalledWith('hello', expect.objectContaining({
      actorId: 'bob',
      actorType: 'user',
    }));
  });

  it('returns isError with retry-after on SmriteaRateLimitError', async () => {
    mockClient.add.mockRejectedValue(
      new SmriteaRateLimitError('too fast', 429, 5),
    );

    const result = await handleAddMemory(
      mockClient as any,
      { content: 'test' },
    );

    expect(result.isError).toBe(true);
    expect(result.content[0].text).toContain('retry after 5s');
  });

  it('returns isError on generic error', async () => {
    mockClient.add.mockRejectedValue(new Error('network failure'));

    const result = await handleAddMemory(
      mockClient as any,
      { content: 'test' },
    );

    expect(result.isError).toBe(true);
    expect(result.content[0].text).toContain('network failure');
  });
});

// ---------------------------------------------------------------------------
// handleSearchMemories
// ---------------------------------------------------------------------------
describe('handleSearchMemories', () => {
  let mockClient: { search: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    mockClient = { search: vi.fn() };
  });

  it('returns "No memories found." for empty results', async () => {
    mockClient.search.mockResolvedValue([]);

    const result = await handleSearchMemories(
      mockClient as any,
      { query: 'anything' },
    );

    expect(result.isError).toBeUndefined();
    expect(result.content[0].text).toBe('No memories found.');
  });

  it('returns JSON with score and memory fields for non-empty results', async () => {
    mockClient.search.mockResolvedValue([
      { score: 0.95, memory: { id: 'mem_1', content: 'relevant' } },
      { score: 0.80, memory: { id: 'mem_2', content: 'somewhat' } },
    ]);

    const result = await handleSearchMemories(
      mockClient as any,
      { query: 'test query' },
    );

    expect(result.isError).toBeUndefined();
    const parsed = JSON.parse(result.content[0].text);
    expect(parsed).toHaveLength(2);
    expect(parsed[0].score).toBe(0.95);
    expect(parsed[0].memory.id).toBe('mem_1');
    expect(parsed[1].score).toBe(0.80);
  });

  it('uses firstPersonUserId when input.actor_id is undefined', async () => {
    mockClient.search.mockResolvedValue([]);

    await handleSearchMemories(
      mockClient as any,
      { query: 'q' },
      'alice',
    );

    expect(mockClient.search).toHaveBeenCalledWith('q', expect.objectContaining({
      actorId: 'alice',
      actorType: 'user',
    }));
  });

  it('prefers input.actor_id over firstPersonUserId', async () => {
    mockClient.search.mockResolvedValue([]);

    await handleSearchMemories(
      mockClient as any,
      { query: 'q', actor_id: 'bob' },
      'alice',
    );

    expect(mockClient.search).toHaveBeenCalledWith('q', expect.objectContaining({
      actorId: 'bob',
      actorType: 'user',
    }));
  });

  it('returns isError on failure', async () => {
    mockClient.search.mockRejectedValue(new SmriteaError('forbidden', 403));

    const result = await handleSearchMemories(
      mockClient as any,
      { query: 'test' },
    );

    expect(result.isError).toBe(true);
    expect(result.content[0].text).toBe('forbidden');
  });
});

// ---------------------------------------------------------------------------
// handleGetMemory
// ---------------------------------------------------------------------------
describe('handleGetMemory', () => {
  let mockClient: { get: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    mockClient = { get: vi.fn() };
  });

  it('returns formatted memory JSON on success', async () => {
    const memoryPayload = { id: 'mem_42', content: 'stored fact' };
    mockClient.get.mockResolvedValue(memoryPayload);

    const result = await handleGetMemory(
      mockClient as any,
      { memory_id: 'mem_42' },
    );

    expect(result.isError).toBeUndefined();
    const parsed = JSON.parse(result.content[0].text);
    expect(parsed.id).toBe('mem_42');
    expect(parsed.content).toBe('stored fact');
  });

  it('returns isError on failure', async () => {
    mockClient.get.mockRejectedValue(new SmriteaError('not found', 404));

    const result = await handleGetMemory(
      mockClient as any,
      { memory_id: 'mem_missing' },
    );

    expect(result.isError).toBe(true);
    expect(result.content[0].text).toBe('not found');
  });
});

// ---------------------------------------------------------------------------
// handleDeleteMemory
// ---------------------------------------------------------------------------
describe('handleDeleteMemory', () => {
  let mockClient: { delete: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    mockClient = { delete: vi.fn() };
  });

  it('returns confirmation message on success', async () => {
    mockClient.delete.mockResolvedValue(undefined);

    const result = await handleDeleteMemory(
      mockClient as any,
      { memory_id: 'mem_1' },
    );

    expect(result.isError).toBeUndefined();
    expect(result.content[0].text).toBe('Memory mem_1 deleted.');
  });

  it('returns isError on failure', async () => {
    mockClient.delete.mockRejectedValue(new Error('server error'));

    const result = await handleDeleteMemory(
      mockClient as any,
      { memory_id: 'mem_1' },
    );

    expect(result.isError).toBe(true);
    expect(result.content[0].text).toContain('server error');
  });
});

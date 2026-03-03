import { SmriteaClient, SmriteaError, SmriteaRateLimitError } from 'smritea-sdk';
import type { Memory, SearchResult } from 'smritea-sdk';
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import type { AddMemoryInput, SearchMemoriesInput, GetMemoryInput, DeleteMemoryInput } from '../types.js';

export function formatMemory(memory: Memory): string {
  return JSON.stringify(memory, null, 2);
}

export function formatSearchResult(result: SearchResult): string {
  return JSON.stringify({ score: result.score, memory: result.memory }, null, 2);
}

export function formatError(err: unknown): string {
  if (err instanceof SmriteaRateLimitError && err.retryAfter !== undefined) {
    return `${err.message} (retry after ${err.retryAfter}s)`;
  }
  if (err instanceof SmriteaError) {
    return err.message;
  }
  return String(err);
}

export async function handleAddMemory(
  client: SmriteaClient,
  input: AddMemoryInput,
): Promise<CallToolResult> {
  try {
    const memory = await client.add(input.content, {
      userId: input.user_id,
      metadata: input.metadata,
    });
    return {
      content: [{ type: 'text', text: formatMemory(memory) }],
    };
  } catch (err) {
    return { isError: true, content: [{ type: 'text', text: formatError(err) }] };
  }
}

export async function handleSearchMemories(
  client: SmriteaClient,
  input: SearchMemoriesInput,
): Promise<CallToolResult> {
  try {
    const results = await client.search(input.query, {
      userId: input.user_id,
      limit: input.limit,
      method: input.method,
      threshold: input.threshold,
      graphDepth: input.graph_depth,
      conversationId: input.conversation_id,
    });

    if (results.length === 0) {
      return {
        content: [{ type: 'text', text: 'No memories found.' }],
      };
    }

    const formatted = JSON.stringify(
      results.map((r) => ({ score: r.score, memory: r.memory })),
      null,
      2,
    );
    return {
      content: [{ type: 'text', text: formatted }],
    };
  } catch (err) {
    return { isError: true, content: [{ type: 'text', text: formatError(err) }] };
  }
}

export async function handleGetMemory(
  client: SmriteaClient,
  input: GetMemoryInput,
): Promise<CallToolResult> {
  try {
    const memory = await client.get(input.memory_id);
    return {
      content: [{ type: 'text', text: formatMemory(memory) }],
    };
  } catch (err) {
    return { isError: true, content: [{ type: 'text', text: formatError(err) }] };
  }
}

export async function handleDeleteMemory(
  client: SmriteaClient,
  input: DeleteMemoryInput,
): Promise<CallToolResult> {
  try {
    await client.delete(input.memory_id);
    return {
      content: [{ type: 'text', text: `Memory ${input.memory_id} deleted.` }],
    };
  } catch (err) {
    return { isError: true, content: [{ type: 'text', text: formatError(err) }] };
  }
}

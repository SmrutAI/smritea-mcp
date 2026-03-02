import { SmriteaClient } from 'smritea';
import type { Memory, SearchResult } from 'smritea';
import type { AddMemoryInput, SearchMemoriesInput, GetMemoryInput, DeleteMemoryInput } from '../types.js';

interface ToolResult {
  content: Array<{ type: 'text'; text: string }>;
}

export function formatMemory(memory: Memory): string {
  return JSON.stringify(memory, null, 2);
}

export function formatSearchResult(result: SearchResult): string {
  return JSON.stringify({ score: result.score, memory: result.memory }, null, 2);
}

export async function handleAddMemory(
  client: SmriteaClient,
  input: AddMemoryInput,
): Promise<ToolResult> {
  const memory = await client.add(input.content, {
    userId: input.user_id,
    metadata: input.metadata,
  });

  return {
    content: [{ type: 'text', text: formatMemory(memory) }],
  };
}

export async function handleSearchMemories(
  client: SmriteaClient,
  input: SearchMemoriesInput,
): Promise<ToolResult> {
  const results = await client.search(input.query, {
    userId: input.user_id,
    limit: input.limit,
    method: input.method,
    threshold: input.threshold,
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
}

export async function handleGetMemory(
  client: SmriteaClient,
  input: GetMemoryInput,
): Promise<ToolResult> {
  const memory = await client.get(input.memory_id);

  return {
    content: [{ type: 'text', text: formatMemory(memory) }],
  };
}

export async function handleDeleteMemory(
  client: SmriteaClient,
  input: DeleteMemoryInput,
): Promise<ToolResult> {
  await client.delete(input.memory_id);

  return {
    content: [{ type: 'text', text: `Memory ${input.memory_id} deleted.` }],
  };
}

import { SmriteaClient, SmriteaError, SmriteaRateLimitError, SmriteaAuthError, SmriteaQuotaError, SmriteaValidationError, SmriteaNotFoundError } from 'smritea-sdk';
import type { Memory, SearchResult } from 'smritea-sdk';
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import type { AddMemoryInput, SearchMemoriesInput, GetMemoryInput, DeleteMemoryInput } from '../types.js';
import type { ResolvedConfig } from '../config.js';

export function formatMemory(memory: Memory): string {
  return JSON.stringify(memory, null, 2);
}

export function formatSearchResult(result: SearchResult): string {
  return JSON.stringify({ score: result.score, memory: result.memory }, null, 2);
}

export function formatError(err: unknown): string {
  if (err instanceof SmriteaAuthError) {
    return 'Authentication failed. Run `smritea-mcp login` to re-authenticate.';
  }
  if (err instanceof SmriteaQuotaError) {
    return 'This app has no credits remaining. Contact your Organization admin to add credits.';
  }
  if (err instanceof SmriteaRateLimitError) {
    const suffix = err.retryAfter !== undefined ? ` (retry after ${err.retryAfter}s)` : '';
    return `Rate limit exceeded.${suffix} Wait a moment and try again.`;
  }
  if (err instanceof SmriteaNotFoundError) {
    return `Not found: ${err.message}`;
  }
  if (err instanceof SmriteaValidationError) {
    return `Invalid request: ${err.message}`;
  }
  if (err instanceof SmriteaError) {
    return `Server error: ${err.message}. Try again in a moment.`;
  }
  return String(err);
}

export async function handleAddMemory(
  client: SmriteaClient,
  input: AddMemoryInput,
  config: ResolvedConfig,
): Promise<CallToolResult> {
  try {
    const actorId = input.actor_id ?? config.firstPersonEmail;
    const actorType = input.actor_type ?? (actorId !== undefined ? 'user' : undefined);
    const actorName = input.actor_name ?? config.actorName;
    const projectName = config.projectName;
    const result = await client.add(input.content, {
      scope: {
        actorId,
        actorType,
        actorName,
        conversationId: input.conversation_id,
        sourceType: input.source_type,
      },
      metadata: projectName !== undefined && projectName.trim().length > 0 ? { ...input.metadata, project_name: projectName } : input.metadata,
      eventOccurredAt: input.event_occurred_at,
      relativeStanding:
        input.importance !== undefined || input.decay_factor !== undefined || input.decay_function !== undefined
          ? { importance: input.importance, decayFactor: input.decay_factor, decayFunction: input.decay_function }
          : undefined,
    });
    return {
      content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
    };
  } catch (err) {
    return { isError: true, content: [{ type: 'text', text: formatError(err) }] };
  }
}

export async function handleSearchMemories(
  client: SmriteaClient,
  input: SearchMemoriesInput,
  config: ResolvedConfig,
): Promise<CallToolResult> {
  try {
    const actorId = input.actor_id ?? config.firstPersonEmail;
    const actorType = input.actor_type ?? (actorId !== undefined ? 'user' : undefined);
    const projectName = config.projectName;
    const metadataFilter =
      projectName === undefined || projectName.trim().length === 0
        ? input.metadata_filter
        : input.metadata_filter !== undefined
          ? { $and: [input.metadata_filter, { project_name: projectName }] }
          : { project_name: projectName };
    const results = await client.search(input.query, {
      scope: {
        actorId,
        actorType,
        conversationId: input.conversation_id,
        sourceType: input.source_type,
        participantIds: input.participant_ids,
      },
      limit: input.limit,
      threshold: input.threshold,
      graphDepth: input.graph_depth,
      fromTime: input.from_time,
      toTime: input.to_time,
      validAt: input.valid_at,
      metadataFilter,
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

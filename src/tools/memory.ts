import { SmriteaClient, SmriteaError, SmriteaTooManyRequestsError, SmriteaUnauthorizedError, SmriteaPaymentRequiredError, SmriteaBadRequestError, SmriteaNotFoundError } from 'smritea-sdk';
import type { Memory, SearchResult } from 'smritea-sdk';
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import type { AddMemoryInput, SearchMemoriesInput, GetMemoryInput, DeleteMemoryInput } from '../types.js';
import type { ResolvedConfig } from '../config.js';

/** Treats null, undefined, and empty/whitespace-only strings as "not provided". Preserves 0 and false. */
function blank<T>(v: T | null | undefined): T | undefined {
  if (v === null || v === undefined) return undefined;
  if (typeof v === 'string' && v.trim().length === 0) return undefined;
  return v;
}

/**
 * Normalises a display name into a stable actor_id slug so the SAME person maps to the SAME id on
 * every add and search: "Harry Potter" -> "harry-potter". Returns undefined if nothing usable remains.
 */
function normalizeActorId(name: string): string | undefined {
  const slug = name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  return slug.length > 0 ? slug : undefined;
}

/**
 * Resolves the actor id for a memory op from (possibly null/empty) input plus config defaults:
 * explicit actor_id wins; else a non-user actor_name is slugified; else it is the first-person
 * user, so the configured email (used as the User ID) applies.
 */
function resolveActorId(
  inputActorId: string | null | undefined,
  inputActorName: string | null | undefined,
  config: ResolvedConfig,
): string | undefined {
  const explicit = blank(inputActorId);
  if (explicit !== undefined) return explicit;
  const name = blank(inputActorName);
  if (name !== undefined) return normalizeActorId(name) ?? config.firstPersonEmail;
  return config.firstPersonEmail;
}

export function formatMemory(memory: Memory): string {
  return JSON.stringify(memory, null, 2);
}

export function formatSearchResult(result: SearchResult): string {
  return JSON.stringify({ score: result.score, memory: result.memory }, null, 2);
}

export function formatError(err: unknown): string {
  if (err instanceof SmriteaUnauthorizedError) {
    return 'Authentication failed. Run `smritea-mcp login` to re-authenticate.';
  }
  if (err instanceof SmriteaPaymentRequiredError) {
    return 'This app has no credits remaining. Contact your Organization admin to add credits.';
  }
  if (err instanceof SmriteaTooManyRequestsError) {
    const suffix = err.retryAfter !== undefined ? ` (retry after ${err.retryAfter}s)` : '';
    return `Rate limit exceeded.${suffix} Wait a moment and try again.`;
  }
  if (err instanceof SmriteaNotFoundError) {
    return `Not found: ${err.message}`;
  }
  if (err instanceof SmriteaBadRequestError) {
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
    const actorId = resolveActorId(input.actor_id, input.actor_name, config);
    const actorType = blank(input.actor_type) ?? (actorId !== undefined ? 'user' : undefined);
    const actorName = blank(input.actor_name) ?? config.actorName;
    const projectName = config.projectName;
    const importance = blank(input.importance);
    const decayFactor = blank(input.decay_factor);
    const decayFunction = blank(input.decay_function);
    const inputMetadata = blank(input.metadata);
    const result = await client.add(input.content, {
      scope: {
        actorId,
        actorType,
        actorName,
        conversationId: blank(input.conversation_id),
        sourceType: blank(input.source_type),
      },
      metadata: projectName !== undefined && projectName.trim().length > 0 ? { ...inputMetadata, project_name: projectName } : inputMetadata,
      eventOccurredAt: blank(input.event_occurred_at),
      relativeStanding:
        importance !== undefined || decayFactor !== undefined || decayFunction !== undefined
          ? { importance, decayFactor, decayFunction }
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
    const actorId = resolveActorId(input.actor_id, input.actor_name, config);
    const actorType = blank(input.actor_type) ?? (actorId !== undefined ? 'user' : undefined);
    const projectName = config.projectName;
    const inputMetadataFilter = blank(input.metadata_filter);
    const metadataFilter =
      projectName === undefined || projectName.trim().length === 0
        ? inputMetadataFilter
        : inputMetadataFilter !== undefined
          ? { $and: [inputMetadataFilter, { project_name: projectName }] }
          : { project_name: projectName };
    const results = await client.search(input.query, {
      scope: {
        actorId,
        actorType,
        conversationId: blank(input.conversation_id),
        sourceType: blank(input.source_type),
        participantIds: blank(input.participant_ids),
      },
      limit: blank(input.limit),
      threshold: blank(input.threshold),
      graphDepth: blank(input.graph_depth),
      fromTime: blank(input.from_time),
      toTime: blank(input.to_time),
      validAt: blank(input.valid_at),
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

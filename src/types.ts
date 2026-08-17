import { z } from 'zod';

export const AddMemoryInput = z.object({
  content: z.string().min(1).describe('The memory content to store'),
  actor_id: z.string().nullish().describe('Actor this memory belongs to. Omit for the user\'s own memory — it defaults to your configured identity. For another named person, set actor_name and leave this unset (actor_id is auto-derived from the name). null or empty string are treated as omitted; never invent a UUID or placeholder.'),
  actor_type: z
    .enum(['user', 'agent', 'system'])
    .nullish()
    .describe('Optional. Defaults to "user". Set "agent" or "system" only for a non-human actor.'),
  actor_name: z.string().max(255).nullish().describe('Display name of the actor. For a non-user actor (e.g. "Harry Potter"), set this — actor_id is derived from it. Omit for the user (defaults to your configured name). Max 255 chars.'),
  conversation_id: z.string().nullish().describe('Conversation ID to scope this memory to (UUID)'),
  source_type: z
    .enum(['conversation', 'document', 'api'])
    .nullish()
    .describe('Origin of the memory: "conversation", "document", or "api". Defaults to "api" when omitted.'),
  metadata: z.record(z.string(), z.unknown()).nullish().describe('Optional key-value metadata'),
  event_occurred_at: z
    .string()
    .nullish()
    .describe(
      'ISO-8601 datetime — when this content was created or occurred. Used by the extraction LLM to resolve relative temporal expressions like "last year" or "yesterday". Defaults to current time if omitted.',
    ),
  importance: z
    .number()
    .min(0)
    .max(1)
    .nullish()
    .describe('How important is this memory (0.0-1.0). Higher = ranks higher in search. Default: 1.0.'),
  decay_factor: z
    .number()
    .min(0)
    .nullish()
    .describe(
      'Rate of relevance decay over time (>=0). 0 = no decay (memory score is pinned permanently). 0.2 = light decay (default). 1.0 = standard. 3.0+ = aggressive.',
    ),
  decay_function: z
    .enum(['exponential', 'gaussian', 'linear'])
    .nullish()
    .describe('Decay curve shape: "exponential", "gaussian", or "linear". Default: "exponential".'),
});
export type AddMemoryInput = z.infer<typeof AddMemoryInput>;

export const SearchMemoriesInput = z.object({
  query: z.string().min(1).describe('Natural language search query'),
  actor_id: z.string().nullish().describe('Filter by the actor this memory belongs to. Omit to use your configured identity; for another named person set actor_name instead (actor_id is derived). null or empty are treated as omitted; not a UUID.'),
  actor_type: z
    .enum(['user', 'agent', 'system'])
    .nullish()
    .describe('Optional. Filter by actor type: "user", "agent", or "system".'),
  actor_name: z
    .string()
    .max(255)
    .nullish()
    .describe('To search a specific named person\'s memories, set their display name (e.g. "Harry Potter") — actor_id is derived from it (same slug used on add). Omit for your own memories (defaults to your configured identity). Max 255 chars.'),
  participant_ids: z
    .array(z.string())
    .min(2)
    .nullish()
    .describe(
      'Search across conversations where ALL listed actors participated (AND semantics). Requires at least 2 IDs. Mutually exclusive with conversation_id.',
    ),
  limit: z
    .number()
    .int()
    .min(0)
    .max(100)
    .nullish()
    .describe('Maximum number of results (0 = use app default, typically 20; max 100)'),
  threshold: z.number().min(0).max(1).nullish().describe('Minimum relevance score filter (0.0–1.0). Note: pipeline uses RRF scores (~0.06), not cosine similarity.'),
  graph_depth: z
    .number()
    .int()
    .min(0)
    .max(5)
    .nullish()
    .describe('Graph traversal depth (0 = use app config; 1–5 = explicit override)'),
  conversation_id: z.string().nullish().describe('Filter to a specific conversation'),
  source_type: z
    .enum(['conversation', 'document', 'api'])
    .nullish()
    .describe('Filter by origin of the memory: "conversation", "document", or "api".'),
  from_time: z
    .string()
    .nullish()
    .describe('ISO-8601 datetime — only return memories created at or after this time (e.g. "2024-01-01T00:00:00Z")'),
  to_time: z
    .string()
    .nullish()
    .describe('ISO-8601 datetime — only return memories created at or before this time (e.g. "2024-12-31T23:59:59Z")'),
  valid_at: z
    .string()
    .nullish()
    .describe('ISO-8601 datetime — return memories valid at exactly this point in time. Mutually exclusive with from_time/to_time.'),
  metadata_filter: z
    .record(z.unknown())
    .nullish()
    .describe(
      'MongoDB-style operator DSL to filter by memory metadata. ' +
        'Simple equality: {"department": "engineering"}. ' +
        'Range: {"level": {"$gte": 4}}. ' +
        'Logical: {"$and": [{"department": "eng"}, {"level": {"$gt": 3}}]}. ' +
        'Operators: $eq $ne $gt $gte $lt $lte $in $nin $contains $and $or $not "*". ' +
        'Values must be string or number. Note: $contains may return fewer results than limit.',
    ),
});
export type SearchMemoriesInput = z.infer<typeof SearchMemoriesInput>;

export const GetMemoryInput = z.object({
  memory_id: z.string().min(1).describe('The memory ID to retrieve'),
});
export type GetMemoryInput = z.infer<typeof GetMemoryInput>;

export const DeleteMemoryInput = z.object({
  memory_id: z.string().min(1).describe('The memory ID to delete'),
});
export type DeleteMemoryInput = z.infer<typeof DeleteMemoryInput>;

export const SelectAppInput = z.object({
  app_id: z.string().min(1).describe('The smritea app ID to use for this project'),
  app_name: z.string().optional().describe('Optional display name for the app'),
});
export type SelectAppInput = z.infer<typeof SelectAppInput>;

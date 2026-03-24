import { z } from 'zod';

export const AddMemoryInput = z.object({
  content: z.string().min(1).describe('The memory content to store'),
  actor_id: z.string().optional().describe('Actor ID to associate with this memory (UUID)'),
  actor_type: z
    .enum(['user', 'agent', 'system'])
    .optional()
    .describe('Actor type: "user", "agent", or "system". Required when actor_id is provided.'),
  actor_name: z.string().max(255).optional().describe('Display name of the actor (optional, max 255 chars)'),
  conversation_id: z.string().optional().describe('Conversation ID to scope this memory to (UUID)'),
  metadata: z.record(z.string(), z.unknown()).optional().describe('Optional key-value metadata'),
});
export type AddMemoryInput = z.infer<typeof AddMemoryInput>;

export const SearchMemoriesInput = z.object({
  query: z.string().min(1).describe('Natural language search query'),
  actor_id: z.string().optional().describe('Filter memories by actor ID (UUID)'),
  actor_type: z
    .enum(['user', 'agent', 'system'])
    .optional()
    .describe('Filter by actor type: "user", "agent", or "system".'),
  limit: z
    .number()
    .int()
    .min(0)
    .max(100)
    .optional()
    .describe('Maximum number of results (0 = use app default, typically 20; max 100)'),
  threshold: z.number().min(0).max(1).optional().describe('Minimum relevance score filter (0.0–1.0). Note: pipeline uses RRF scores (~0.06), not cosine similarity.'),
  graph_depth: z
    .number()
    .int()
    .min(0)
    .max(5)
    .optional()
    .describe('Graph traversal depth (0 = use app config; 1–5 = explicit override)'),
  conversation_id: z.string().optional().describe('Filter to a specific conversation'),
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

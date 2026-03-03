import { z } from 'zod';

export const AddMemoryInput = z.object({
  content: z.string().min(1).describe('The memory content to store'),
  user_id: z.string().optional().describe('User ID to associate with this memory'),
  metadata: z.record(z.string(), z.unknown()).optional().describe('Optional key-value metadata'),
});
export type AddMemoryInput = z.infer<typeof AddMemoryInput>;

export const SearchMemoriesInput = z.object({
  query: z.string().min(1).describe('Natural language search query'),
  user_id: z.string().optional().describe('Filter memories by user ID'),
  limit: z.number().int().positive().optional().describe('Maximum number of results'),
  method: z.string().optional().describe('Search method: quick_search, deep_search, context_aware_search'),
  threshold: z.number().min(0).max(1).optional().describe('Minimum relevance score (0.0-1.0)'),
  graph_depth: z.number().int().positive().optional().describe('Graph traversal depth override'),
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

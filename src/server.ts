import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { SmriteaClient } from 'smritea-sdk';
import { loadConfig } from './config.js';
import { AddMemoryInput, SearchMemoriesInput, GetMemoryInput, DeleteMemoryInput, SelectAppInput } from './types.js';
import {
  handleAddMemory,
  handleSearchMemories,
  handleGetMemory,
  handleDeleteMemory,
} from './tools/memory.js';
import { handleSelectApp, handleListApps } from './tools/app.js';

export async function startServer(): Promise<void> {
  const config = loadConfig();

  const client = new SmriteaClient({
    apiKey: config.apiKey,
    appId: config.appId,
    baseUrl: config.baseUrl,
  });

  const server = new McpServer(
    { name: 'smritea', version: '0.1.0' },
    {
      instructions:
        'smritea is a persistent AI memory system. Use it to remember facts, preferences, ' +
        'decisions, and context across conversations. Proactively store anything the user tells ' +
        'you that they would want recalled later. Before starting work on a task, search memories ' +
        'to surface relevant context the user may not have re-stated. When the user says "remember" ' +
        'or "don\'t forget", always call add_memory immediately.',
    },
  );

  const firstPersonUserId = config.firstPersonUserId;

  server.tool(
    'add_memory',
    'Store a memory in smritea. Call this whenever the user shares a preference, decision, fact ' +
    'about themselves, or anything they would want recalled in a future conversation. Do not wait ' +
    'to be asked — if the user says "I prefer X", "my X is Y", "remember that", or "don\'t forget", ' +
    'call this immediately. If the user says "I" or refers to themselves, omit user_id — it is ' +
    'automatically set to the configured default.',
    AddMemoryInput.shape,
    async (input) => handleAddMemory(client, AddMemoryInput.parse(input), firstPersonUserId),
  );

  server.tool(
    'search_memories',
    'Search smritea memories by natural language query. Call this at the start of a new task or ' +
    'topic to surface relevant context — user preferences, past decisions, stated constraints — ' +
    'without waiting for the user to re-explain them. Also call when the user asks "do you remember", ' +
    '"what do you know about", or "remind me". Omit user_id when searching for the current user\'s ' +
    'own memories — it defaults to the configured user automatically.',
    SearchMemoriesInput.shape,
    async (input) => handleSearchMemories(client, SearchMemoriesInput.parse(input), firstPersonUserId),
  );

  server.tool(
    'get_memory',
    'Retrieve a specific memory by its ID. Use when you already have a memory_id from a previous ' +
    'search result and need the full memory object.',
    GetMemoryInput.shape,
    async (input) => handleGetMemory(client, GetMemoryInput.parse(input)),
  );

  server.tool(
    'delete_memory',
    'Permanently delete a memory by its ID. Use when the user explicitly asks to forget something ' +
    'or says a stored fact is no longer true. This action is irreversible — confirm the memory_id ' +
    'from a search result before deleting.',
    DeleteMemoryInput.shape,
    async (input) => handleDeleteMemory(client, DeleteMemoryInput.parse(input)),
  );

  server.tool(
    'select_app',
    'Set the active smritea app for this project. Writes a project-scoped config to ' +
    '.smritea/config.json so all subsequent memory operations use this app. Call this once ' +
    'when setting up smritea in a new project.',
    SelectAppInput.shape,
    (input) => handleSelectApp(SelectAppInput.parse(input)),
  );

  server.tool(
    'list_apps',
    'Show the currently configured smritea app for this project. Useful for confirming which ' +
    'app memories are being stored under.',
    {},
    () => handleListApps(config),
  );

  server.prompt(
    'recall',
    'Search your smritea memories and surface everything relevant to the current topic or task. ' +
    'Use this at the start of a conversation or when switching context.',
    { topic: z.string().describe('The topic, task, or question to search memories for') },
    ({ topic }) => ({
      messages: [
        {
          role: 'user' as const,
          content: {
            type: 'text' as const,
            text:
              `Search my smritea memories for everything relevant to: "${topic}"\n\n` +
              'Retrieve the most relevant results and summarise what you find before we continue. ' +
              'If you find preferences, constraints, or past decisions related to this topic, ' +
              'apply them proactively without waiting for me to re-state them.',
          },
        },
      ],
    }),
  );

  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('smritea MCP server running (stdio)');
}

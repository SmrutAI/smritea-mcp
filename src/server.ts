import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
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

  const server = new McpServer({
    name: 'smritea',
    version: '0.1.0',
  });

  server.tool(
    'add_memory',
    'Add a new memory to smritea. Stores content with optional user association and metadata.',
    AddMemoryInput.shape,
    async (input) => handleAddMemory(client, AddMemoryInput.parse(input)),
  );

  server.tool(
    'search_memories',
    'Search memories semantically. Returns ranked results by relevance score.',
    SearchMemoriesInput.shape,
    async (input) => handleSearchMemories(client, SearchMemoriesInput.parse(input)),
  );

  server.tool(
    'get_memory',
    'Get a memory by its ID. Returns the full memory object.',
    GetMemoryInput.shape,
    async (input) => handleGetMemory(client, GetMemoryInput.parse(input)),
  );

  server.tool(
    'delete_memory',
    'Delete a memory by its ID. This action is irreversible.',
    DeleteMemoryInput.shape,
    async (input) => handleDeleteMemory(client, DeleteMemoryInput.parse(input)),
  );

  server.tool(
    'select_app',
    'Set the active smritea app for this project. Writes a project-scoped config to .smritea/config.json so all subsequent memory operations use this app.',
    SelectAppInput.shape,
    (input) => handleSelectApp(SelectAppInput.parse(input)),
  );

  server.tool(
    'list_apps',
    'Show the currently active app. Full app listing via API key auth is not yet available.',
    {},
    () => handleListApps(config),
  );

  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('smritea MCP server running (stdio)');
}

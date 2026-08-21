import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { z } from 'zod';
import { SmriteaClient } from 'smritea-sdk';
import { loadConfig, verifyUserSetup } from './config.js';
import { refreshIfNeeded, AuthRequiredError } from './auth.js';
import { AddMemoryInput, SearchMemoriesInput, GetMemoryInput, DeleteMemoryInput, SelectAppInput } from './types.js';
import {
  handleAddMemory,
  handleSearchMemories,
  handleGetMemory,
  handleDeleteMemory,
} from './tools/memory.js';
import { handleSelectApp, handleListApps } from './tools/app.js';

function getMemoryClient(): SmriteaClient {
  const config = loadConfig();

  if (config.apiKey === undefined || config.appId === undefined) {
    throw new Error(
      'No app selected or no API key found. Run list_apps and select_app first.',
    );
  }

  return new SmriteaClient({
    apiKey: config.apiKey,
    appId: config.appId,
    baseUrl: config.memoryBaseUrl,
  });
}

/**
 * Preflight for the memory tools: if the user-level setup can't support an API call
 * (not logged in / no app / no API key), return a friendly, actionable tool result instead of
 * letting the SDK throw. Returns null when the call may proceed.
 */
function setupPreflight(): CallToolResult | null {
  const status = verifyUserSetup();
  if (status.ok) {
    return null;
  }
  const lines = status.missing.map((m) => `  - ${m}`).join('\n');
  return {
    isError: true,
    content: [
      {
        type: 'text',
        text: `smritea is not set up for this account yet. Complete setup, then retry:\n${lines}`,
      },
    ],
  };
}

/**
 * Renews the access token if it is stale. Any renewal failure — refresh token expired/revoked, a
 * non-2xx from the endpoint, a network error, or an unusable response — is turned into a clear
 * "sign in again" tool result instead of leaking a raw error or the old "Invalid time value" crash.
 * Returns null when the session is usable and the call may proceed.
 */
async function guardedRefresh(): Promise<CallToolResult | null> {
  try {
    await refreshIfNeeded();
    return null;
  } catch (err) {
    const text =
      err instanceof AuthRequiredError
        ? err.message
        : 'Could not renew your smritea session. Run `smritea-mcp login` to re-authenticate.';
    return { isError: true, content: [{ type: 'text', text }] };
  }
}

/**
 * Full preflight for the memory tools: verify user-level setup, then renew the session. Returns a
 * ready-to-send error result on any problem, or null when the call may proceed.
 */
async function ensureSession(): Promise<CallToolResult | null> {
  const pre = setupPreflight();
  if (pre !== null) {
    return pre;
  }
  return guardedRefresh();
}

/**
 * Builds the actor-identity hint injected into the memory tool descriptions from the configured
 * first-person email (used as the actor_id / User ID) and display name. Tells the model to use
 * these as defaults and to leave the fields unset rather than invent placeholder values.
 */
function actorDefaultsHint(email: string | undefined, name: string | undefined): string {
  if (email === undefined) {
    return (
      ' Identity is not configured — run `smritea-mcp configure`.' +
      ' For the user\'s own memory, leave actor_id, actor_type, and actor_name unset.' +
      ' For a different named person, set actor_name only. Never invent UUIDs or placeholder IDs.'
    );
  }
  const namePart = name !== undefined && name.trim().length > 0 ? ` and actor_name "${name}"` : '';
  return (
    ` If the memory is the USER's own, leave actor_id, actor_type, and actor_name UNSET — they default to actor_id "${email}"${namePart}, actor_type "user".` +
    ' If the memory is clearly from a DIFFERENT named person, set actor_name to that person\'s name (e.g. "Harry Potter") and leave actor_id unset — it is auto-normalized to a stable id ("harry-potter").' +
    ' Every actor field is optional on every call; null or empty string are treated as unset. Never invent UUIDs or placeholder IDs.'
  );
}

/**
 * Creates and fully configures an McpServer with all tools and prompts.
 * Does NOT connect a transport — caller is responsible for connecting.
 */
export function createMcpServer(): McpServer {
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

  const startupConfig = loadConfig();
  const firstPersonHint = actorDefaultsHint(startupConfig.firstPersonEmail, startupConfig.actorName);

  server.tool(
    'add_memory',
    'Store a memory in smritea. Call this whenever the user shares a preference, decision, fact ' +
    'about themselves, or anything they would want recalled in a future conversation. Do not wait ' +
    'to be asked — if the user says "I prefer X", "my X is Y", "remember that", or "don\'t forget", ' +
    'call this immediately.' +
    firstPersonHint,
    AddMemoryInput.shape,
    async (input) => {
      const pre = await ensureSession();
      if (pre !== null) {
        return pre;
      }
      const config = loadConfig();
      const client = getMemoryClient();
      return handleAddMemory(client, AddMemoryInput.parse(input), config);
    },
  );

  server.tool(
    'search_memories',
    'Search smritea memories by natural language query. Call this at the start of a new task or ' +
    'topic to surface relevant context — user preferences, past decisions, stated constraints — ' +
    'without waiting for the user to re-explain them. Also call when the user asks "do you remember", ' +
    '"what do you know about", or "remind me".' +
    firstPersonHint,
    SearchMemoriesInput.shape,
    async (input) => {
      const pre = await ensureSession();
      if (pre !== null) {
        return pre;
      }
      const config = loadConfig();
      const client = getMemoryClient();
      return handleSearchMemories(client, SearchMemoriesInput.parse(input), config);
    },
  );

  server.tool(
    'get_memory',
    'Retrieve a specific memory by its ID. Use when you already have a memory_id from a previous ' +
    'search result and need the full memory object.',
    GetMemoryInput.shape,
    async (input) => {
      const pre = await ensureSession();
      if (pre !== null) {
        return pre;
      }
      const client = getMemoryClient();
      return handleGetMemory(client, GetMemoryInput.parse(input));
    },
  );

  server.tool(
    'delete_memory',
    'Permanently delete a memory by its ID. Use when the user explicitly asks to forget something ' +
    'or says a stored fact is no longer true. This action is irreversible — confirm the memory_id ' +
    'from a search result before deleting.',
    DeleteMemoryInput.shape,
    async (input) => {
      const pre = await ensureSession();
      if (pre !== null) {
        return pre;
      }
      const client = getMemoryClient();
      return handleDeleteMemory(client, DeleteMemoryInput.parse(input));
    },
  );

  server.tool(
    'select_app',
    'Set the active smritea app. Stores selected_app_id in ~/.smritea/settings.json and provisions ' +
    'an API key if needed. Call this once when setting up smritea in a new project.',
    SelectAppInput.shape,
    async (input) => {
      const pre = await guardedRefresh();
      if (pre !== null) {
        return pre;
      }
      const config = loadConfig();
      return handleSelectApp(SelectAppInput.parse(input), config);
    },
  );

  server.tool(
    'list_apps',
    'List Studio apps for the logged-in account. Uses the Studio JWT from ~/.smritea/auth.json ' +
    'to query the control plane.',
    {},
    async () => {
      const pre = await guardedRefresh();
      if (pre !== null) {
        return pre;
      }
      const config = loadConfig();
      return handleListApps(config);
    },
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

  return server;
}

/**
 * Stdio entry point — unchanged behaviour for existing users.
 */
export async function startServer(): Promise<void> {
  const server = createMcpServer();
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('smritea MCP server running (stdio)');
}

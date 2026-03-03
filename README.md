# smritea-mcp

MCP (Model Context Protocol) server for [smritea](https://smritea.ai) — gives AI assistants (Claude Code, Cursor, etc.) direct access to your smritea memory store.

---

## Installation

### Step 1 — Run init

```bash
npx -y smritea-mcp init
```

This interactive wizard prompts for three values:

```
API base URL [https://api.smritea.ai]:
```
Press Enter to use the default (`https://api.smritea.ai`). If you are self-hosting smritea, enter your custom URL here.

```
API key:
```
Paste your smritea API key (required). You can find it in the smritea dashboard under API Keys.

```
Your name or user ID (used when you say "I prefer…", "I like…") [optional]:
```
Optional. If set, this value is automatically used as the `user_id` when you refer to yourself in conversation ("I prefer dark mode", "I like Python"), so memories about you are stored under a consistent ID without having to pass `user_id` explicitly every time.

On success, credentials are saved to `~/.smritea/mcp-config.json`.

### Step 2 — Register the server with your AI client

**Claude Code** — add to `~/.claude.json` under the `mcpServers` key:

```json
{
  "mcpServers": {
    "smritea": {
      "command": "npx",
      "args": ["-y", "smritea-mcp", "serve"]
    }
  }
}
```

**Cursor / network-connected clients (SSE mode)** — start the server first, then point Cursor at it:

```bash
# Start the SSE server (default port 3000, runs in background)
npx -y smritea-mcp serve-sse &

# Custom port
npx -y smritea-mcp serve-sse 8080 &
```

Then add to `~/.cursor/mcp.json` (or Cursor Settings → MCP):

```json
{
  "mcpServers": {
    "smritea": {
      "url": "http://localhost:3000/sse"
    }
  }
}
```

> **Note**: `serve-sse` must be running before you start Cursor. Each client connection gets its own isolated session — you can connect multiple clients simultaneously on the same port.

### Step 3 — Set the active app (once per project)

In a conversation with Claude Code, run:

```
Use the select_app tool with app_id "<your-app-id>"
```

This writes `.smritea/config.json` in your project directory (automatically gitignored) so all memory operations in that project are scoped to the correct app.

---

## Configuration

smritea-mcp uses a two-tier config system.

### User-scoped (`~/.smritea/mcp-config.json`)

Created once by `npx smritea-mcp init`. Stores credentials shared across all projects.

```json
{
  "api_key": "sk-...",
  "base_url": "https://api.smritea.ai",
  "first_person_user_id": "alice"
}
```

`first_person_user_id` is optional. When set, it is automatically used as `user_id` for memory operations where the user refers to themselves ("I prefer…", "I like…") without explicitly passing a `user_id`.

### Project-scoped (`.smritea/config.json`)

Created per-project by the `select_app` tool. Determines which smritea app receives memory operations in this project. Automatically gitignored.

```json
{
  "app_id": "app_abc123",
  "app_name": "My App"
}
```

### Environment variable overrides

| Variable | Overrides |
|----------|-----------|
| `SMRITEA_API_KEY` | `api_key` in user config |
| `SMRITEA_BASE_URL` | `base_url` in user config |
| `SMRITEA_APP_ID` | `app_id` in project config |
| `SMRITEA_FIRST_PERSON_USER_ID` | `first_person_user_id` in user config |

---

## Tools

### `select_app`

Set the active smritea app for the current project. All subsequent memory operations in this project will use the specified app.

Writes `.smritea/config.json` in the current working directory and creates `.smritea/.gitignore` so the config is never accidentally committed.

**Parameters**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `app_id` | string | Yes | The smritea app ID (e.g. `app_abc123`) |
| `app_name` | string | No | Optional display name for the app |

**Example**

```
Use the select_app tool with app_id "app_abc123" and app_name "My Project"
```

---

### `list_apps`

Show the currently active app for this project.

> **Note**: Listing all apps via API key auth is not yet available. API keys are scoped to a single app. Use `select_app` to switch apps.

**Parameters**: none

---

### `add_memory`

Add a new memory to the active smritea app.

**Parameters**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `content` | string | Yes | The memory content to store |
| `actor_id` | string | No | Actor UUID to associate with this memory. Defaults to the configured `first_person_user_id` when omitted. |
| `actor_type` | string | No | Actor type: `user`, `agent`, or `system`. Required when `actor_id` is provided. Defaults to `user` when omitted alongside `actor_id`. |
| `metadata` | object | No | Optional key-value metadata |

**Example**

```
Add a memory: "User prefers dark mode and uses vim keybindings" for actor_id "550e8400-e29b-41d4-a716-446655440000" actor_type "user"
```

---

### `search_memories`

Search for memories semantically. Returns results ranked by relevance score.

**Parameters**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `query` | string | Yes | Natural language search query |
| `actor_id` | string | No | Filter results to a specific actor (UUID). Defaults to the configured `first_person_user_id` when omitted. |
| `actor_type` | string | No | Filter by actor type: `user`, `agent`, or `system`. Defaults to `user` when omitted alongside `actor_id`. |
| `limit` | number | No | Maximum number of results to return |
| `method` | string | No | Search method: `quick_search`, `deep_search`, `context_aware_search` |
| `threshold` | number | No | Minimum relevance score (0.0–1.0) |
| `graph_depth` | number | No | Graph traversal depth override |
| `conversation_id` | string | No | Filter to a specific conversation |

**Example**

```
Search memories for "editor preferences" for actor_id "550e8400-e29b-41d4-a716-446655440000" actor_type "user", limit 5
```

---

### `get_memory`

Retrieve a single memory by its ID.

**Parameters**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `memory_id` | string | Yes | The memory ID (e.g. `mem_abc123`) |

---

### `delete_memory`

Delete a memory by its ID. This action is irreversible.

**Parameters**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `memory_id` | string | Yes | The memory ID to delete |

---

## How it works

smritea-mcp is a TypeScript MCP server that wraps the [smritea TypeScript SDK](https://github.com/SmrutAI/smritea-sdk) and exposes memory operations as MCP tools.

It supports two transports:

**stdio** (default, for Claude Code and local clients):

All JSON-RPC communication flows over stdout. All logging goes to stderr so it never interferes with the MCP protocol stream.

```
AI assistant (Claude Code)
    ↕ JSON-RPC over stdio
smritea-mcp serve
    ↕ HTTPS
smritea TypeScript SDK  →  smritea Cloud API
```

**SSE** (for Cursor and network-connected clients):

The server runs as an HTTP server. Clients open a persistent `GET /sse` EventStream connection to receive server messages, and send messages via `POST /messages?sessionId=<id>`. Each client connection gets its own isolated McpServer instance.

```
AI assistant (Cursor / other)
    ↕ SSE stream (GET /sse) + POST /messages
smritea-mcp serve-sse
    ↕ HTTPS
smritea TypeScript SDK  →  smritea Cloud API
```

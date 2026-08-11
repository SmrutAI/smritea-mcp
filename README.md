---
type: Overview
title: smritea-mcp
status: stable
tags:
- readme
---

# smritea-mcp

MCP (Model Context Protocol) server for [smritea](https://smritea.ai) — gives AI assistants (Claude Code, Cursor, etc.) direct access to your smritea memory store.

---

## Installation

### Step 1 — Run Studio login

```bash
npx -y smritea-mcp login
```

This opens the browser, authenticates against your Studio account, and saves Studio tokens to `~/.smritea/auth.json`.

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

### Step 3 — Select the active app (once per project)

In a conversation with Claude Code, run:

```
Use the list_apps tool, then use the select_app tool with app_id "<your-app-id>"
```

`list_apps` uses the generated Studio SDK and the Studio JWT from `~/.smritea/auth.json` to load real apps from the control plane. `select_app` stores `selected_app_id` in `~/.smritea/config.json`. If the selected app has no stored API key yet, `select_app` creates one through the Studio API and saves it back to `~/.smritea/auth.json` using the name `smritea-plugin-<YYYY-MM-DD>`.

Project-level `.smritea/config.json` stays reserved for project metadata only.

---

## Configuration

smritea-mcp uses three files with separate responsibilities.

### `~/.smritea/auth.json` (global auth)

Stores Studio access + refresh tokens and per-app API keys.

### `~/.smritea/config.json` (global selection)

Stores the selected app ID and user-level defaults.

### `.smritea/config.json` (project metadata)

Stores project-only metadata such as the project name. It is not the primary auth file and it does not own Studio tokens.

### Environment variable overrides

| Variable | Purpose | Default |
|----------|---------|---------|
| `SMRITEA_BASE_URL` | Data-plane base URL for memory operations | `https://api-us.smritea.ai` |
| `SMRITEA_STUDIO_BASE_URL` | Control-plane base URL for Studio auth/app operations | `https://api.smritea.ai` |
| `SMRITEA_API_KEY` | Override selected app API key | — |
| `SMRITEA_APP_ID` | Override selected app ID | — |

The MCP resolves the selected app from `~/.smritea/config.json`, then resolves the app API key from `~/.smritea/auth.json.apps[selected_app_id].api_key`.

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

List real Studio apps for the logged-in Studio account.

It uses the generated Studio SDK against the control plane with the Studio JWT from `~/.smritea/auth.json`.

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
| `actor_name` | string | No | Optional actor display name |
| `conversation_id` | string | No | Scope this memory to a conversation |
| `source_type` | string | No | Origin: `conversation`, `document`, or `api` |
| `metadata` | object | No | Optional key-value metadata |
| `event_occurred_at` | string | No | ISO-8601 event time used for temporal resolution |
| `importance` | number | No | Memory importance from `0.0` to `1.0` |
| `decay_factor` | number | No | Time-decay strength |
| `decay_function` | string | No | Decay curve: `exponential`, `gaussian`, `linear` |

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
| `source_type` | string | No | Filter by origin: `conversation`, `document`, or `api` |

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

smritea-mcp is a TypeScript MCP server that wraps two client layers:
- the customer `smritea-sdk` for dataplane memory operations
- the generated Studio SDK for control-plane login, app listing, and API-key provisioning

The server starts without requiring app selection — `list_apps` and `select_app` work immediately after login. The dataplane client is created lazily on the first memory tool call. Every tool invocation reads config and auth fresh from disk, so login, token refresh, and app selection take effect without restarting the server.

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

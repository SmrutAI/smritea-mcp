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

`list_apps` uses the generated Studio SDK and the Studio JWT from `~/.smritea/auth.json` to load real apps from the control plane. `select_app` stores `selected_app_id` in `~/.smritea/settings.json`. If the selected app has no stored API key yet, `select_app` creates one through the Studio API and saves it back to `~/.smritea/auth.json` using the name `smritea-plugin-<YYYY-MM-DD>`.

Project-level `.smritea/settings.json` can override `selected_app_id` and both base URLs for a specific project — see Configuration below.

---

## CLI Commands

| Command | Title | Description |
|---------|-------|-------------|
| `smritea-mcp serve` | Start the MCP server (stdio) | The default command (also runs when no subcommand is given). Starts the MCP server over stdio and blocks, communicating via JSON-RPC on stdout — this is what Claude Code launches. |
| `smritea-mcp serve-sse [port]` | Start the MCP server (SSE) | Starts the MCP server as an HTTP server using Server-Sent Events, for Cursor and other network-connected clients. Defaults to port `3000` if no port is given. |
| `smritea-mcp login` | Authenticate with Studio | Opens the browser, runs the OAuth PKCE flow against Studio, and saves the resulting access and refresh tokens to `auth.json`. |
| `smritea-mcp configure` | Interactive setup wizard | Guided terminal setup: logs in first if needed, asks whether to configure at the user or project level, lets you pick a Studio app (provisioning an API key if one isn't already stored), and prompts for a project name and up to 3 tags — each answer is saved immediately as you go, and re-running it shows your current values before asking whether to change them. |
| `smritea-mcp init` | Removed | No longer does anything. Prints a message directing you to run `login` and then use the `select_app` tool, and exits with an error. |

---

## Configuration

smritea-mcp uses two files with separate responsibilities.

### `~/.smritea/auth.json` (account secrets)

Stores Studio access + refresh tokens, account identity, and per-app API keys (`apps`). Never contains anything meant to be shared — never commit this file.

### `settings.json` (selection and URLs — safe to commit)

Stores `selected_app_id`, `studio_base_url`, `memory_base_url`, and (optionally) `auth_file_path` — where this settings file says `auth.json` should be read from. Contains no secrets, so it's safe to check into a project's version control.

Resolved from exactly one of two locations, the whole file at once, never merged field-by-field:

- `~/.smritea/settings.json` — the default, used whenever `SMRITEA_DEV_CONFIG` is unset.
- `.smritea/settings.json` (in the current working directory) — used instead of the user-level file, in full, only when `SMRITEA_DEV_CONFIG` is set AND this project file exists. If `SMRITEA_DEV_CONFIG` is set but no project-level file exists, the user-level file is still used.

### Environment variable

| Variable | Purpose | Default |
|----------|---------|---------|
| `SMRITEA_DEV_CONFIG` | Enables reading a project-level `.smritea/settings.json` instead of the user-level one, when present. Not a value override — it only selects which settings file to read. | unset (always use the user-level file) |

The MCP resolves the selected app from the active `settings.json`, then resolves the app API key from `~/.smritea/auth.json.apps[selected_app_id].api_key` (or wherever that settings file's `auth_file_path` points instead).

---

## Tools

The four memory tools (`add_memory`, `search_memories`, `get_memory`, `delete_memory`) preflight-check
that the account is fully set up (login + selected app + API key) before calling the API. If anything
is missing, the tool returns actionable setup guidance instead of a raw SDK error.

Every optional tool parameter treats `null`, `""`, and omission identically as "not provided" and falls
back to its configured default — none of them throw on a nullish input.

When the access token has expired, the memory tools renew it automatically before the call. If the
session can no longer be renewed — the refresh token has expired or been revoked — they return a clear
"run `smritea-mcp login` to re-authenticate" message instead of a raw error, so an expired session
prompts a clean re-login rather than failing cryptically.

### `select_app`

Set the active smritea app for the current project. All subsequent memory operations in this project will use the specified app.

Writes the currently active `settings.json` (user-level by default, or the project-level `.smritea/settings.json` when `SMRITEA_DEV_CONFIG` is set and that file exists) and creates `.smritea/.gitignore` in the current working directory so a user-level default install never accidentally commits a stray `.smritea/` directory.

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
| `actor_id` | string | No | Actor UUID. Omit for the user's own memory — defaults to their configured email as the first-person User ID. For a different person, leave this unset and set `actor_name` instead; `actor_id` is auto-derived from it. |
| `actor_type` | string | No | Actor type: `user`, `agent`, or `system`. Defaults to `user`. |
| `actor_name` | string | No | Display name of a different, named actor (e.g. `"Harry Potter"`). Auto-derived into a stable slug used as `actor_id` (e.g. `"harry-potter"`) — the same name always maps to the same id. Omit for the user's own memory. |
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
| `actor_id` | string | No | Filter to a specific actor (UUID). Omit for the user's own memories — defaults to their configured email. For a different named person, leave this unset and set `actor_name` instead (same slug derivation as `add_memory`). |
| `actor_type` | string | No | Filter by actor type: `user`, `agent`, or `system`. Defaults to `user`. |
| `actor_name` | string | No | Search a specific named person's memories (e.g. `"Harry Potter"`) — `actor_id` is derived from it, the same slug used on `add_memory`. Omit for the user's own memories. |
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

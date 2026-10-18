---
type: Overview
title: smritea-mcp
status: stable
tags:
- readme
stale_after: 2027-05-20
generated:
  by: Tushar Dwivedi
  at: 2026-10-19T00:00:00Z
---

# smritea-mcp


| Section | What it covers |
|---------|----------------|
| [Installation](#installation) | Installation |
| [CLI Commands](#cli-commands) | CLI Commands |
| [Configuration](#configuration) | smritea-mcp uses two files with separate responsibilities. |
| [Tools](#tools) | The four memory tools (add_memory, search_memories, get_memory, delete_memory)… |
| [How it works](#how-it-works) | smritea-mcp is a TypeScript MCP server that wraps two client layers: |

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

`list_apps` uses the Smritea Studio API client and the login token from `~/.smritea/auth.json` to load your real apps. `select_app` stores `selected_app_id` in `~/.smritea/settings.json`. If the selected app has no stored API key yet, `select_app` creates one through the Studio API and saves it back to `~/.smritea/auth.json` using the name `smritea-plugin-<YYYY-MM-DD>`.

With `SMRITEA_DEV_CONFIG` on, a project-level `.smritea/settings.dev.json` can override `selected_app_id` and both base URLs for a specific project — see Configuration below.

---

## CLI Commands

| Command | Title | Description |
|---------|-------|-------------|
| `smritea-mcp serve` | Start the MCP server (stdio) | The default command (also runs when no subcommand is given). Starts the MCP server over stdio and blocks, communicating via JSON-RPC on stdout — this is what Claude Code launches. |
| `smritea-mcp serve-sse [port]` | Start the MCP server (SSE) | Starts the MCP server as an HTTP server using Server-Sent Events, for Cursor and other network-connected clients. Defaults to port `3000` if no port is given. |
| `smritea-mcp login` | Authenticate with Studio | Opens the browser, runs the OAuth PKCE flow against Studio, and saves the resulting access and refresh tokens to `auth.json`. |
| `smritea-mcp configure` | Interactive setup wizard | Guided terminal setup: logs in first if needed, asks whether to configure at the user or project level, lets you pick a Studio app (provisioning an API key if one isn't already stored), and prompts for your name, a project name, and up to 3 tags — each answer is saved immediately as you go, and re-running it shows your current values before asking whether to change them. |
| `smritea-mcp init` | Removed | No longer does anything. Prints a message directing you to run `login` and then use the `select_app` tool, and exits with an error. |

---

## Configuration

smritea-mcp uses two files with separate responsibilities.

### `~/.smritea/auth.json` (account secrets)

Stores Studio access + refresh tokens, account identity, and per-app API keys (`apps`). Never contains anything meant to be shared — never commit this file.

### `settings.json` (selection and URLs — safe to commit)

Stores `selected_app_id`, `studio_base_url`, `memory_base_url`, `auth_file_path` (optional — where this settings file says `auth.json` should be read from), `project_name`, `actor_name`, `tags`, and `preferences`. Contains no secrets, so it's safe to check into a project's version control.

Resolved from exactly one of two locations, the whole file at once, never merged field-by-field:

- `~/.smritea/settings.json` — the default, used whenever `SMRITEA_DEV_CONFIG` is off.
- `.smritea/settings.dev.json` (in the current working directory) — used instead of the user-level file, in full, only when `SMRITEA_DEV_CONFIG` is on AND this project file exists. If `SMRITEA_DEV_CONFIG` is on but no project-level file exists, the user-level `~/.smritea/settings.dev.json` is used instead. The on-state user-level file is therefore always `settings.dev.json`, never `settings.json`.

### Environment variable

| Variable | Purpose | Default |
|----------|---------|---------|
| `SMRITEA_DEV_CONFIG` | Switches the settings file name to `settings.dev.json` and enables reading a project-level `.smritea/settings.dev.json` instead of the user-level one, when present. Empty, `0`, and `false` (any case) leave it off. Not a value override — it only selects which settings file to read. | unset (always use the user-level file) |

The MCP resolves the selected app from the active `settings.json`, then resolves the app API key from `~/.smritea/auth.json.apps[selected_app_id].api_key` (or wherever that settings file's `auth_file_path` points instead).

### Trace ID

Each server process generates one Trace ID when it starts and sends it as the `X-Trace-ID` header on every memory call (`add_memory`, `search_memories`, `get_memory`, `delete_memory`). The value is `<UTC start time as YYYYMMDDTHHMMSS>.smritea-mcp`, for example `20261017T110203.smritea-mcp`. All calls from one process share the same value, including calls from several SSE clients connected to one `serve-sse` process; restarting the server generates a new one. The value cannot be changed by a setting or an environment variable.

---

## Tools

The four memory tools (`add_memory`, `search_memories`, `get_memory`, `delete_memory`) preflight-check
that the account is fully set up (login, selected app, API key, your name, and project name) before calling the API. If anything
is missing, the tool returns actionable setup guidance instead of a raw SDK error.

Every optional tool parameter accepts `null` or omission as "not provided" and falls back to its configured
default — none of them throw on a nullish input. For string parameters, `""` (and whitespace-only text) is
also "not provided". Number, enum, object, and array parameters do not accept `""`; it fails validation.

When the access token has expired, the memory tools renew it automatically before the call. Renewal
failures are reported by cause, so the AI sees exactly what went wrong:

- **HTTP 401** (refresh token expired or revoked) — the only case treated as a dead session. Returns a
  clear "run `smritea-mcp login` to re-authenticate" message.
- **Any other 4xx/5xx** — reports the real HTTP status plus the server's `code` and `message`, read from
  the response body, and suggests a retry.
- **Network / transport error** (no response received) — reported as a connectivity problem to check and
  retry.
- **HTTP 200 with no access token** — reported as an unexpected response from the auth service.

### `select_app`

Set the active smritea app for the current project. All subsequent memory operations in this project will use the specified app.

Writes the currently active settings file (`settings.json` at user level by default, or the project-level `.smritea/settings.dev.json` when `SMRITEA_DEV_CONFIG` is on and that file exists).

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

It uses the Smritea Studio API client with the login token from `~/.smritea/auth.json`.

**Parameters**: none

---

### `add_memory`

Add a new memory to the active smritea app.

**Parameters**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `content` | string | Yes | The memory content to store |
| `actor_id` | string | No | Actor UUID. Omit for the user's own memory — defaults to their configured email as the first-person User ID. For a different person, leave this unset and set `actor_name` instead; `actor_id` is auto-derived from it. |
| `actor_type` | string | No | Actor type: `user`, `agent`, or `system`. Defaults to `user` when an actor ID resolves. |
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

This tool does not apply an actor filter. The `actor_id` / `actor_name` you pass are sent as the
*speaker* identity (`speakerActorId`) — a "who is asking" signal used for pronoun resolution and
audit — not as a scope filter, so they do not narrow the result set. (The underlying search API can
filter by `scope.actor_id`, but this tool does not expose that; it only sends `conversation_id`,
`source_type`, and `participant_ids` as scope filters.) To restrict which memories are searched, use
`conversation_id`, `source_type`, `participant_ids`, or `metadata_filter`.

**Parameters**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `query` | string | Yes | Natural language search query |
| `actor_id` | string | No | Identity of who is asking (the speaker), used only for pronoun resolution and audit — never a filter. It does not restrict results to that actor. Omit to search with no requester identity; unlike `add_memory` it does not default to your configured identity. |
| `actor_type` | string | No | Not used as a filter by this tool — actor input is sent as the speaker identity, not a scope filter. Accepted only for parity with `add_memory`. |
| `actor_name` | string | No | Display name of the requester, used to derive the speaker identity (same slug as `add_memory`) for pronoun resolution — not a filter. Setting it does not restrict results to that person. |
| `participant_ids` | string[] | No | Search across conversations where all listed actors participated (AND semantics). Requires at least 2 IDs. Mutually exclusive with `conversation_id`. |
| `limit` | number | No | Number of results; must not exceed the server `top_n_max` (default 20). Omit to use the app top_n. |
| `graph_depth` | number | No | Graph traversal depth (`1`-`5`). Omit to use the system default. |
| `conversation_id` | string | No | Filter to a specific conversation. |
| `source_type` | string | No | Filter by origin: `conversation`, `document`, or `api`. |
| `from_time` | string | No | ISO-8601 — start of a time range: memories whose validity period overlaps [from_time, ∞). Can be used alone (open-ended). Cannot be combined with `valid_at`. |
| `to_time` | string | No | ISO-8601 — end of a time range (inclusive): memories whose validity period overlaps (−∞, to_time]. Can be used alone (open-ended). Cannot be combined with `valid_at`. |
| `valid_at` | string | No | ISO-8601 — return memories valid at exactly this moment. Cannot be combined with `from_time` or `to_time`. |
| `metadata_filter` | object | No | MongoDB-style operator DSL to filter by memory metadata (e.g. `{"level": {"$gte": 4}}`). |

**Example**

```
Search memories for "editor preferences", limit 5
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
- the customer `smritea-sdk` for memory operations
- the Smritea Studio API client for login, app listing, and API-key provisioning

The server starts without requiring app selection — `list_apps` and `select_app` work immediately after login. A new `smritea-sdk` client is created on every memory tool call; none is cached. Every tool invocation reads config and auth fresh from disk, so login, token refresh, and app selection take effect without restarting the server.

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

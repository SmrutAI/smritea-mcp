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
| `user_id` | string | No | User ID to associate with this memory |
| `metadata` | object | No | Optional key-value metadata |

**Example**

```
Add a memory: "User prefers dark mode and uses vim keybindings" for user_id "alice"
```

---

### `search_memories`

Search for memories semantically. Returns results ranked by relevance score.

**Parameters**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `query` | string | Yes | Natural language search query |
| `user_id` | string | No | Filter results to a specific user |
| `limit` | number | No | Maximum number of results to return |
| `method` | string | No | Search method: `quick_search`, `deep_search`, `context_aware_search` |
| `threshold` | number | No | Minimum relevance score (0.0–1.0) |
| `graph_depth` | number | No | Graph traversal depth override |
| `conversation_id` | string | No | Filter to a specific conversation |

**Example**

```
Search memories for "editor preferences" for user_id "alice", limit 5
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

smritea-mcp is a TypeScript MCP server using `stdio` transport. It wraps the [smritea TypeScript SDK](https://github.com/SmrutAI/smritea-sdk) and exposes memory operations as MCP tools.

All JSON-RPC communication flows over stdout. All logging goes to stderr so it never interferes with the MCP protocol stream.

```
AI assistant (Claude Code / Cursor)
    ↕ JSON-RPC over stdio
smritea-mcp (this server)
    ↕ HTTPS
smritea TypeScript SDK  →  smritea Cloud API
```

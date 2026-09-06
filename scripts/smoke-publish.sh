#!/usr/bin/env bash
# smoke-publish.sh — smoke-test the PUBLISHABLE smritea-mcp artifact.
#
# Simulates what an external `npx smritea-mcp` user receives: the manifest with the
# publish-time rewrites applied (errkit dep stripped — it is bundled by tsup; smritea-sdk
# resolvable), npm-packed into a tarball, installed into a clean directory with no access
# to this repo's layout, and the bin executed once. A local `make install-local-plugins`
# cannot catch these failures: it runs the repo checkout, where file: deps resolve.
#
# The bin is run with a bogus subcommand: dist/index.js imports every module BEFORE argv
# dispatch, so reaching the "Unknown subcommand" usage message proves full module
# resolution of the installed artifact; a bundling or manifest gap dies earlier with
# "Cannot find module".
#
# Usage (via `make smoke` in this directory, or `make smoke` at the smritea-cloud root):
#   SDK_SPEC=local (default): pack the LOCAL smritea-sdk and depend on that tarball —
#                             pre-publish reality, tests today's SDK code. Requires the
#                             smritea-cloud monorepo layout (../../polyglot/smritea-sdk).
#   SDK_SPEC=latest:          depend on the public registry smritea-sdk — what
#                             publish-mcp.sh actually ships; works in a standalone clone.
set -euo pipefail

RED='\033[0;31m'; GREEN='\033[0;32m'; BOLD='\033[1m'; RESET='\033[0m'
ok()   { printf "${GREEN}  ✓${RESET} %s\n" "$*"; }
err()  { printf "${RED}  ✗ ERROR:${RESET} %s\n" "$*" >&2; }
step() { printf "\n${BOLD}%s${RESET}\n" "$*"; }
fail() { err "$*"; exit 1; }

MCP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SDK_TS_DIR="$MCP_DIR/../../polyglot/smritea-sdk/typescript"
SDK_SPEC="${SDK_SPEC:-local}"
if [ "$SDK_SPEC" = "local" ] && [ ! -d "$SDK_TS_DIR" ]; then
    fail "SDK_SPEC=local needs the smritea-cloud monorepo layout (missing $SDK_TS_DIR); use SDK_SPEC=latest in a standalone clone"
fi

WORK="$(mktemp -d "${TMPDIR:-/tmp}/smritea-mcp-smoke.XXXXXX")"
trap 'rm -rf "$WORK"' EXIT
STAGE="$WORK/stage"
RUN_DIR="$WORK/run"
mkdir -p "$STAGE" "$RUN_DIR"

# Build the local SDK BEFORE the MCP: the MCP's `npm install` copies the file: SDK
# dependency into node_modules, and on a clean checkout the SDK has no dist yet —
# building SDK-first guarantees the MCP build always sees a complete dependency.
if [ "$SDK_SPEC" = "local" ]; then
    step "Building + packing local smritea-sdk (typescript) — pre-publish SDK reality"
    (cd "$SDK_TS_DIR" && npm install --silent && npm run build >/dev/null)
    SDK_TGZ="$(cd "$SDK_TS_DIR" && npm pack --pack-destination "$WORK" 2>/dev/null | tail -1)"
    SDK_DEP="file:$WORK/$SDK_TGZ"
    ok "smritea-sdk built and packed: $SDK_TGZ"
else
    SDK_DEP="latest"
    ok "using smritea-sdk@latest from the public registry"
fi

step "Building smritea-mcp (errkit-build prerequisite included)"
make -C "$MCP_DIR" build

step "Staging publishable package (same manifest rewrites as publish-mcp.sh)"
cp -R "$MCP_DIR/dist" "$STAGE/dist"
cp "$MCP_DIR/package.json" "$STAGE/package.json"
if [ -f "$MCP_DIR/README.md" ]; then cp "$MCP_DIR/README.md" "$STAGE/"; fi
if [ -f "$MCP_DIR/LICENSE" ]; then cp "$MCP_DIR/LICENSE" "$STAGE/"; fi
STAGE="$STAGE" SDK_DEP="$SDK_DEP" node -e "
const fs = require('fs');
const p = process.env.STAGE + '/package.json';
const pkg = JSON.parse(fs.readFileSync(p, 'utf8'));
// errkit is bundled by tsup (noExternal) — the published manifest must not carry it.
delete pkg.dependencies['errkit'];
pkg.dependencies['smritea-sdk'] = process.env.SDK_DEP;
fs.writeFileSync(p, JSON.stringify(pkg, null, 2) + '\n');
"
if grep -q '"errkit"' "$STAGE/package.json"; then
    fail "staged manifest still declares errkit — rewrite failed"
fi
ok "staged manifest: errkit stripped, smritea-sdk -> $SDK_DEP"

step "Packing smritea-mcp tarball"
MCP_TGZ="$(cd "$STAGE" && npm pack --pack-destination "$WORK" 2>/dev/null | tail -1)"
ok "packed: $MCP_TGZ"

step "Installing tarball into a clean directory (no repo layout available)"
(cd "$RUN_DIR" && npm init -y >/dev/null 2>&1 && npm install --silent "$WORK/$MCP_TGZ")
ok "clean install succeeded"

step "Executing the installed bin (module-resolution probe)"
set +e
OUTPUT="$(cd "$RUN_DIR" && ./node_modules/.bin/smritea-mcp __smoke__ 2>&1)"
CODE=$?
set -e
printf '%s\n' "$OUTPUT"

if printf '%s' "$OUTPUT" | grep -qiE "cannot find module|ERR_MODULE_NOT_FOUND|MODULE_NOT_FOUND"; then
    fail "module resolution error in the installed artifact — the published package would break for npx users"
fi
if ! printf '%s' "$OUTPUT" | grep -q "Unknown subcommand"; then
    fail "bin never reached argv dispatch (exit=$CODE) — module loading failed before the usage message"
fi
if [ "$CODE" -ne 1 ]; then
    fail "expected exit 1 from the unknown-subcommand path, got $CODE"
fi
ok "smoke-mcp-publish PASSED: the publishable artifact installs and executes cleanly"

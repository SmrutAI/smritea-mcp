.PHONY: lint typecheck build test format publish errkit-build smoke help

help: ## Show available targets
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  %-20s %s\n", $$1, $$2}'

test: ## Run smritea-mcp tests
	npm run test

format: ## Auto-fix TypeScript with ESLint (--fix)
	npm install --silent
	npm run lint:fix

lint: errkit-build ## Type-check and lint smritea-mcp TypeScript (needs errkit dist for type resolution)
	npm install --silent
	npm run typecheck
	npm run lint

errkit-build: ## Build errkit-ts (prerequisite for bundling into smritea-mcp)
	npm --prefix ../../../smritea-oss/modules/polyglot/errkit/errkit-ts install --silent
	npm --prefix ../../../smritea-oss/modules/polyglot/errkit/errkit-ts run build

build: errkit-build ## Compile TypeScript
	rm -rf dist
	npm install --silent
	npm run build

smoke: ## Smoke-test the publishable artifact (pack + clean install + run bin); SDK_SPEC=local|latest
	bash scripts/smoke-publish.sh

# publish deliberately does NOT depend on build: scripts/publish-mcp.sh builds FIRST (with the
# dev manifest, so the errkit file: dep resolves for bundling), THEN rewrites the manifest
# (strips errkit, sdk -> latest), THEN publishes. A rebuild after the rewrite would run
# `npm install` against the stripped manifest, prune node_modules/errkit, and break the
# tsup noExternal bundling. Never run this target directly — use scripts/publish-mcp.sh.
publish: ## Publish the ALREADY-BUILT artifact to npm (invoked by scripts/publish-mcp.sh only)
	@if [ ! -f dist/index.js ]; then \
		echo "ERROR: dist/index.js missing — run 'make build' first (via scripts/publish-mcp.sh)"; exit 1; \
	fi
	@if [ -z "$$NPM_TOKEN" ]; then \
		echo "ERROR: NPM_TOKEN environment variable is not set"; exit 1; \
	fi
	npm set "//registry.npmjs.org/:_authToken=$$NPM_TOKEN" && npm publish --access public

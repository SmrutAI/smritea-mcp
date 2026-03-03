.PHONY: lint typecheck build test format publish help

help: ## Show available targets
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  %-20s %s\n", $$1, $$2}'

test: ## Run smritea-mcp tests
	npm run test

format: ## Auto-fix TypeScript with ESLint (--fix)
	npm install --silent
	npm run lint:fix

lint: ## Type-check and lint smritea-mcp TypeScript
	npm install --silent
	npm run typecheck
	npm run lint

build: ## Compile TypeScript
	rm -rf dist
	npm install --silent
	npm run build

publish: build ## Build and publish smritea-mcp to npm (requires NPM_TOKEN env var)
	@if [ -z "$$NPM_TOKEN" ]; then \
		echo "ERROR: NPM_TOKEN environment variable is not set"; exit 1; \
	fi
	npm set "//registry.npmjs.org/:_authToken=$$NPM_TOKEN" && npm publish --access public

import { defineConfig } from 'tsup';

// errkit is a private repo-local library (file: dep) — it must be COMPILED INTO the
// published bundle (spec 175 decision 11m); it can never appear as a runtime dependency
// of the published package because the npm name "errkit" belongs to a third party.
export default defineConfig({
  entry: ['src/index.ts', 'src/config.ts'],
  format: ['cjs'],
  dts: true,
  noExternal: ['errkit'],
});

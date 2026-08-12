import { dirname } from 'node:path';
import { mkdirSync } from 'node:fs';
import { refreshIfNeeded, runLoginFlow } from './auth.js';
import { getSettingsPathForScope, readSettingsFileAt, writeSettingsFileAt, loadConfig, type SmriteaSettings } from './config.js';
import { fetchStudioApps, handleSelectApp } from './tools/app.js';

export async function runConfigureFlow(): Promise<void> {
  // @clack/prompts is ESM-only; this package stays CommonJS, so it's loaded via dynamic import
  // rather than a static one, which Node's CJS runtime can do without issue.
  const { intro, outro, select, text, confirm, isCancel, cancel, log } = await import('@clack/prompts');
  intro('smritea configure');

  let auth;
  try {
    auth = await refreshIfNeeded();
  } catch {
    auth = null;
  }
  if (auth === null) {
    log.info('Not logged in — opening browser for Studio login...');
    await runLoginFlow();
  }

  const scope = await select({
    message: 'Configure smritea for:',
    options: [
      { value: 'user', label: 'This user account', hint: 'applies to all projects' },
      { value: 'project', label: 'This project only', hint: 'writes .smritea/settings.json here' },
    ],
  });
  if (isCancel(scope)) {
    cancel('Cancelled.');
    process.exit(0);
  }

  const path = getSettingsPathForScope(scope as 'user' | 'project');
  mkdirSync(dirname(path), { recursive: true });
  let current: SmriteaSettings = readSettingsFileAt(path) ?? {};
  const config = loadConfig();

  const apps = await fetchStudioApps(config);
  const selectedAppId = current.selected_app_id;
  let mustSelect = false;
  if (selectedAppId !== undefined) {
    const currentApp = apps.find((a) => a.id === selectedAppId);
    const label = currentApp?.name ? `${selectedAppId} (${currentApp.name})` : selectedAppId;
    const update = await confirm({ message: `Update selected app (${label})?`, initialValue: false });
    if (isCancel(update)) {
      cancel('Cancelled.');
      process.exit(0);
    }
    if (update) {
      mustSelect = true;
    }
  } else {
    mustSelect = true;
  }
  if (mustSelect) {
    if (apps.length === 0) {
      log.error('No apps found for this Studio account. Log in to the dashboard and create an app first, then re-run `smritea-mcp configure`.');
      process.exit(1);
    }
    const chosen = await select({
      message: 'Select an app:',
      options: apps.map((a) => ({ value: a.id, label: a.name ? `${a.id} (${a.name})` : a.id })),
    });
    if (isCancel(chosen)) {
      cancel('Cancelled.');
      process.exit(0);
    }
    const selectedApp = apps.find((a) => a.id === chosen);
    await handleSelectApp({ app_id: chosen as string, app_name: selectedApp?.name }, config, path);
    current = readSettingsFileAt(path) ?? {};
    log.success(`App selected: ${chosen}`);
  }

  let updateActorName = current.actor_name === undefined;
  if (current.actor_name !== undefined) {
    log.info(`Your name: ${current.actor_name}`);
    const update = await confirm({ message: 'Update your name?', initialValue: false });
    if (isCancel(update)) {
      cancel('Cancelled.');
      process.exit(0);
    }
    updateActorName = update;
  }
  if (updateActorName) {
    const name = await text({
      message: 'Your name (to make your memories memorable):',
      initialValue: current.actor_name ?? '',
      validate: (value) => ((value ?? '').trim().length === 0 ? 'Name cannot be empty.' : undefined),
    });
    if (isCancel(name)) {
      cancel('Cancelled.');
      process.exit(0);
    }
    const latest = readSettingsFileAt(path) ?? {};
    writeSettingsFileAt(path, { ...latest, actor_name: name });
    current = { ...current, actor_name: name };
  }

  let updateProjectName = current.project_name === undefined;
  if (current.project_name !== undefined) {
    log.info(`Project name: ${current.project_name}`);
    const update = await confirm({ message: 'Update project name?', initialValue: false });
    if (isCancel(update)) {
      cancel('Cancelled.');
      process.exit(0);
    }
    updateProjectName = update;
  }
  if (updateProjectName) {
    const name = await text({
      message: 'Project name:',
      initialValue: current.project_name ?? '',
      validate: (value) => ((value ?? '').trim().length === 0 ? 'Project name cannot be empty.' : undefined),
    });
    if (isCancel(name)) {
      cancel('Cancelled.');
      process.exit(0);
    }
    const latest = readSettingsFileAt(path) ?? {};
    writeSettingsFileAt(path, { ...latest, project_name: name });
    current = { ...current, project_name: name };
  }

  const hasTags = current.tags !== undefined && Object.keys(current.tags).length > 0;
  let updateTags = !hasTags;
  if (hasTags) {
    log.info(`Tags: ${Object.keys(current.tags as Record<string, boolean>).join(', ')}`);
    const update = await confirm({ message: 'Update tags?', initialValue: false });
    if (isCancel(update)) {
      cancel('Cancelled.');
      process.exit(0);
    }
    updateTags = update;
  }
  if (updateTags) {
    const raw = await text({ message: 'Tags (comma-separated, up to 3):', placeholder: 'e.g. backend, urgent, personal' });
    if (isCancel(raw)) {
      cancel('Cancelled.');
      process.exit(0);
    }
    const tagList = raw.split(',').map((t) => t.trim()).filter((t) => t.length > 0).slice(0, 3);
    const tags: Record<string, boolean> = {};
    for (const t of tagList) {
      tags[t] = true;
    }
    const latest = readSettingsFileAt(path) ?? {};
    writeSettingsFileAt(path, { ...latest, tags });
  }

  outro('Configuration saved.');
}

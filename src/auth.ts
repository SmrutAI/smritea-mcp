import { spawn } from 'node:child_process';
import { createHash, randomBytes } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import http, { type IncomingMessage, type ServerResponse } from 'node:http';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { AuthApi, Configuration, type CLIRefreshTokenRequest, type CLITokenRequest } from '../../../../sdks/autogen/studio/typescript/src/index.js';
import { loadConfig, type AuthFile } from './config.js';

const AUTH_DIR_PATH = join(homedir(), '.smritea');
const AUTH_FILE_PATH = join(AUTH_DIR_PATH, 'auth.json');
const CALLBACK_HOST = '127.0.0.1';
const CALLBACK_PATH = '/callback';
const CLIENT_ID = 'smritea-plugin';
const CALLBACK_TIMEOUT_MS = 5 * 60 * 1000;
const REFRESH_SKEW_MS = 60 * 1000;

type CLITokenResponse = {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  user_id: string;
  email: string;
  organization_id: string;
};

type PersistedAuth = AuthFile &
  Partial<CLITokenResponse> & {
    expires_at?: string;
  };

type CallbackResult = {
  code: string;
  state: string;
};

function toBase64Url(input: Buffer): string {
  return input
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');
}

function generateState(): string {
  return toBase64Url(randomBytes(32));
}

function generateCodeVerifier(): string {
  return toBase64Url(randomBytes(48));
}

function generateCodeChallenge(verifier: string): string {
  return toBase64Url(createHash('sha256').update(verifier).digest());
}

function deriveFrontendUrl(studioBaseUrl: string): string {
  if (studioBaseUrl.includes('://api.')) {
    return studioBaseUrl.replace('://api.', '://app.');
  }
  // Local dev: frontend runs on port 4200 by default
  if (studioBaseUrl.includes('://localhost')) {
    return 'http://localhost:4200';
  }
  return studioBaseUrl;
}

function buildAuthorizeUrl(studioBaseUrl: string, redirectUri: string, state: string, codeChallenge: string): URL {
  const url = new URL('/auth/cli-authorize', deriveFrontendUrl(studioBaseUrl));
  url.searchParams.set('client_id', CLIENT_ID);
  url.searchParams.set('redirect_uri', redirectUri);
  url.searchParams.set('response_type', 'code');
  url.searchParams.set('state', state);
  url.searchParams.set('code_challenge', codeChallenge);
  url.searchParams.set('code_challenge_method', 'S256');
  return url;
}

function openBrowser(url: string): void {
  if (process.platform === 'darwin') {
    spawn('open', [url], { detached: true, stdio: 'ignore' }).unref();
    return;
  }

  if (process.platform === 'win32') {
    spawn('cmd', ['/c', 'start', '', url], { detached: true, stdio: 'ignore' }).unref();
    return;
  }

  spawn('xdg-open', [url], { detached: true, stdio: 'ignore' }).unref();
}

function writeHtml(res: ServerResponse, statusCode: number, title: string, message: string): void {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.end(
    `<!doctype html><html><head><meta charset="utf-8"><title>${title}</title></head><body><h1>${title}</h1><p>${message}</p></body></html>`,
  );
}

function getServerPort(server: http.Server): number {
  const address = server.address();
  if (address === null || typeof address === 'string') {
    throw new Error('OAuth callback server did not expose a TCP port.');
  }
  return address.port;
}

function readCallback(req: IncomingMessage): CallbackResult {
  const url = new URL(req.url ?? '/', `http://${CALLBACK_HOST}`);
  if (url.pathname !== CALLBACK_PATH) {
    throw new Error('Unexpected callback path.');
  }

  const error = url.searchParams.get('error');
  const errorDescription = url.searchParams.get('error_description');
  if (error !== null) {
    throw new Error(errorDescription ?? `Authorization failed: ${error}`);
  }

  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  if (code === null || state === null) {
    throw new Error('Authorization callback missed code or state.');
  }

  return { code, state };
}

function closeServer(server: http.Server | null): Promise<void> {
  if (server === null) {
    return Promise.resolve();
  }

  return new Promise<void>((resolve) => {
    server.close(() => resolve());
  });
}

function createStudioAuthApi(studioBaseUrl: string): AuthApi {
  return new AuthApi(
    new Configuration({
      basePath: studioBaseUrl,
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      credentials: 'omit',
    }),
  );
}

async function exchangeCode(
  studioBaseUrl: string,
  body: {
    grant_type: 'authorization_code';
    code: string;
    client_id: typeof CLIENT_ID;
    redirect_uri: string;
    code_verifier: string;
  },
): Promise<CLITokenResponse> {
  const api = createStudioAuthApi(studioBaseUrl);
  const request: CLITokenRequest = {
    clientId: body.client_id,
    code: body.code,
    codeVerifier: body.code_verifier,
    grantType: body.grant_type,
    redirectUri: body.redirect_uri,
  };
  return (await api.cliTokenExchange({ request })) as CLITokenResponse;
}

async function refreshToken(studioBaseUrl: string, refreshTokenValue: string): Promise<CLITokenResponse> {
  const api = createStudioAuthApi(studioBaseUrl);
  const request: CLIRefreshTokenRequest = {
    clientId: CLIENT_ID,
    grantType: 'refresh_token',
    refreshToken: refreshTokenValue,
  };
  return (await api.cliTokenRefresh({ request })) as CLITokenResponse;
}

function readAuth(): PersistedAuth | null {
  try {
    return JSON.parse(readFileSync(AUTH_FILE_PATH, 'utf-8')) as PersistedAuth;
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === 'ENOENT') {
      return null;
    }
    throw err;
  }
}

function toExpiresAt(expiresInSeconds: number): string {
  return new Date(Date.now() + expiresInSeconds * 1000).toISOString();
}

function mergeAuth(existing: PersistedAuth | null, tokens: CLITokenResponse): PersistedAuth {
  const base: Partial<PersistedAuth> = existing ?? {};
  return {
    ...base,
    access_token: tokens.access_token,
    refresh_token: tokens.refresh_token,
    token_type: tokens.token_type,
    expires_in: tokens.expires_in,
    expires_at: toExpiresAt(tokens.expires_in),
    user_id: tokens.user_id || base.user_id,
    email: tokens.email || base.email,
    organization_id: tokens.organization_id || base.organization_id,
    apps: existing?.apps ?? {},
  };
}

export function loadAuth(): PersistedAuth | null {
  return readAuth();
}

export function saveAuth(tokens: CLITokenResponse): PersistedAuth {
  const nextAuth = mergeAuth(readAuth(), tokens);
  mkdirSync(AUTH_DIR_PATH, { recursive: true });
  writeFileSync(AUTH_FILE_PATH, JSON.stringify(nextAuth, null, 2) + '\n', 'utf-8');
  return nextAuth;
}

function needsRefresh(auth: PersistedAuth): boolean {
  if (typeof auth.expires_at !== 'string' || auth.expires_at.length === 0) {
    return true;
  }

  const expiresAt = Date.parse(auth.expires_at);
  if (Number.isNaN(expiresAt)) {
    return true;
  }

  return expiresAt - REFRESH_SKEW_MS <= Date.now();
}

export async function refreshIfNeeded(): Promise<PersistedAuth | null> {
  const auth = loadAuth();
  if (auth === null) {
    return null;
  }

  if (!needsRefresh(auth)) {
    return auth;
  }

  if (typeof auth.refresh_token !== 'string' || auth.refresh_token.length === 0) {
    throw new Error('Saved auth is missing refresh_token.');
  }

  const { studioBaseUrl } = loadConfig();
  return saveAuth(await refreshToken(studioBaseUrl, auth.refresh_token));
}

export async function runLoginFlow(): Promise<void> {
  const { studioBaseUrl } = loadConfig();
  const state = generateState();
  const codeVerifier = generateCodeVerifier();
  const codeChallenge = generateCodeChallenge(codeVerifier);

  let server: http.Server | null = null;
  let timeoutId: NodeJS.Timeout | null = null;

  try {
    const callbackResult = await new Promise<{ callback: CallbackResult; redirectUri: string }>((resolve, reject) => {
      let settled = false;
      const finish = (fn: () => void): void => {
        if (settled) {
          return;
        }
        settled = true;
        if (timeoutId !== null) {
          clearTimeout(timeoutId);
          timeoutId = null;
        }
        fn();
      };

      server = http.createServer((req, res) => {
        try {
          const callback = readCallback(req);
          if (callback.state !== state) {
            writeHtml(res, 400, 'Login failed', 'State verification failed.');
            finish(() => reject(new Error('OAuth state verification failed.')));
            return;
          }

          const activeServer = server;
          if (activeServer === null) {
            finish(() => reject(new Error('OAuth callback server was not available.')));
            return;
          }
          writeHtml(res, 200, 'Login complete', 'You can close this tab and return to the terminal.');
          finish(() => resolve({ callback, redirectUri: `http://${CALLBACK_HOST}:${getServerPort(activeServer)}${CALLBACK_PATH}` }));
        } catch (err) {
          if (err instanceof Error && err.message === 'Unexpected callback path.') {
            writeHtml(res, 404, 'Not found', 'This callback path is not valid.');
            return;
          }

          writeHtml(
            res,
            400,
            'Login failed',
            err instanceof Error ? err.message : 'The login callback was invalid.',
          );
          finish(() => reject(err));
        }
      });

      server.once('error', (err) => finish(() => reject(err)));
      server.listen(0, CALLBACK_HOST, () => {
        const activeServer = server;
        if (activeServer === null) {
          finish(() => reject(new Error('OAuth callback server was not available.')));
          return;
        }
        const redirectUri = `http://${CALLBACK_HOST}:${getServerPort(activeServer)}${CALLBACK_PATH}`;
        const authorizeUrl = buildAuthorizeUrl(studioBaseUrl, redirectUri, state, codeChallenge);
        timeoutId = setTimeout(() => {
          finish(() => reject(new Error('OAuth login timed out.')));
        }, CALLBACK_TIMEOUT_MS);
        openBrowser(authorizeUrl.toString());
      });
    });

    const tokens = await exchangeCode(studioBaseUrl, {
      grant_type: 'authorization_code',
      code: callbackResult.callback.code,
      client_id: CLIENT_ID,
      redirect_uri: callbackResult.redirectUri,
      code_verifier: codeVerifier,
    });

    saveAuth(tokens);
  } finally {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
    await closeServer(server);
  }
}

import { spawn } from 'node:child_process';
import { createHash, randomBytes } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import http, { type IncomingMessage, type ServerResponse } from 'node:http';
import { dirname } from 'node:path';
import { AuthApi } from './_internal/autogen/apis/AuthApi.js';
import { type CLIRefreshTokenRequest, type CLITokenRequest, type CLITokenResponse } from './_internal/autogen/models/index.js';
import { Configuration, ResponseError } from './_internal/autogen/runtime.js';
import { ensureSettingsFile, getAuthFilePath, loadConfig, type AuthFile } from './config.js';
import { SMONKU_CSS } from './views/styles.js';

const CALLBACK_HOST = '127.0.0.1';
const CALLBACK_PATH = '/callback';
const CLIENT_ID = 'smritea-plugin';
const CALLBACK_TIMEOUT_MS = 5 * 60 * 1000;
const REFRESH_SKEW_MS = 60 * 1000;

/** Message shown to the user when their session cannot be renewed and they must sign in again. */
const SESSION_EXPIRED_MSG =
  'Your smritea session has expired or could not be renewed. Run `smritea-mcp login` to re-authenticate.';

/**
 * Thrown when the stored session cannot be renewed — the refresh call failed, the refresh token was
 * revoked/expired, or the refresh response was unusable. Callers surface its message and stop; the
 * user must sign in again. This replaces the raw HTTP error / date crash that used to leak out.
 */
export class AuthRequiredError extends Error {
  override name = 'AuthRequiredError' as const;
  constructor(message: string = SESSION_EXPIRED_MSG, options?: { cause?: unknown }) {
    super(message, options);
  }
}

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
    const domain = studioBaseUrl.split('://api.')[1];
    return `https://${domain}`;
  }
  // Local dev: the studio frontend's dev server is hardcoded to port 3000 (strictPort).
  if (studioBaseUrl.includes('://localhost')) {
    return 'http://localhost:3000';
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
  const isSuccess = statusCode === 200;
  res.end(`<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${title}</title>
<style>${SMONKU_CSS}</style></head><body>
<div class="card">
<img src="https://cdn.smritea.ai/${isSuccess ? 'monk_happy_logged_in.png' : 'monk_sad_login_failed.png'}" alt="Smonku" class="monk smonku-fade smonku-enter" />
<h1 class="smonku-text-1">${isSuccess ? 'Welcome home!' : title}</h1>
<p class="smonku-text-2">${isSuccess ? 'Smonku remembered you. You can close this tab and return to the app.' : message}</p>
</div></body></html>`);
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
    return JSON.parse(readFileSync(getAuthFilePath(), 'utf-8')) as PersistedAuth;
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === 'ENOENT') {
      return null;
    }
    throw err;
  }
}

function toExpiresAt(expiresInSeconds: number): string {
  // Guard a non-finite value (e.g. a malformed refresh response): NaN would make an Invalid Date whose
  // toISOString() throws the opaque "Invalid time value". Fall back to 0 (treated as immediate expiry).
  const secs = Number.isFinite(expiresInSeconds) ? expiresInSeconds : 0;
  return new Date(Date.now() + secs * 1000).toISOString();
}

function mergeAuth(existing: PersistedAuth | null, tokens: CLITokenResponse): PersistedAuth {
  const base: Partial<PersistedAuth> = existing ?? {};
  return {
    ...base,
    access_token: tokens.accessToken ?? '',
    refresh_token: tokens.refreshToken ?? '',
    token_type: tokens.tokenType,
    expires_in: tokens.expiresIn,
    expires_at: toExpiresAt(tokens.expiresIn ?? 0),
    user_id: tokens.userId || base.user_id,
    email: tokens.email || base.email,
    organization_id: tokens.organizationId || base.organization_id,
    apps: existing?.apps ?? {},
  };
}

export function loadAuth(): PersistedAuth | null {
  return readAuth();
}

export function saveAuth(tokens: CLITokenResponse): PersistedAuth {
  const nextAuth = mergeAuth(readAuth(), tokens);
  const authFilePath = getAuthFilePath();
  mkdirSync(dirname(authFilePath), { recursive: true });
  writeFileSync(authFilePath, JSON.stringify(nextAuth, null, 2) + '\n', 'utf-8');
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

/**
 * Maps a token-refresh failure to a meaningful error for the caller (and the AI to read):
 * - HTTP 401 → the refresh token is expired/revoked; this is the ONLY case that needs a re-login.
 * - Any other 4xx/5xx → surface BOTH the HTTP status code AND the server's error code + message
 *   (from the SDK ResponseError's raw `.response`), explicitly NOT framed as a login problem.
 * - No response (network/transport error) → surface the underlying error as a connectivity problem.
 */
async function renewFailureError(err: unknown): Promise<Error> {
  if (err instanceof ResponseError) {
    const status = err.response.status;
    if (status === 401) {
      return new AuthRequiredError(SESSION_EXPIRED_MSG, { cause: err });
    }
    let detail = '';
    try {
      const raw = (await err.response.clone().text()).trim();
      let code: unknown;
      let message: unknown;
      try {
        const parsed = JSON.parse(raw) as Record<string, unknown>;
        code = parsed['code'];
        message = parsed['message'];
      } catch {
        // Non-JSON body — fall through to the raw text below.
      }
      if (typeof code === 'string' || typeof message === 'string') {
        detail = ` (code: ${typeof code === 'string' ? code : 'n/a'}, message: ${typeof message === 'string' ? message : 'n/a'})`;
      } else if (raw.length > 0) {
        detail = ` — ${raw.slice(0, 500)}`;
      }
    } catch {
      detail = '';
    }
    return new Error(
      `Token refresh failed with HTTP ${status}${detail}. Retry, and check your connection or the ` +
        'smritea service status if it persists.',
      { cause: err },
    );
  }
  const netDetail = err instanceof Error && err.message.length > 0 ? err.message : String(err);
  return new Error(
    `Token refresh failed before a response was received: ${netDetail}. This looks like a network or ` +
      'connectivity problem — check your connection and retry.',
    { cause: err },
  );
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
    throw new AuthRequiredError();
  }

  const { studioBaseUrl } = loadConfig();
  let tokens: CLITokenResponse;
  try {
    tokens = await refreshToken(studioBaseUrl, auth.refresh_token);
  } catch (err) {
    // 401 → re-login; any other 4xx/5xx → real status + server code/message; network error → as such.
    throw await renewFailureError(err);
  }

  // A successful refresh MUST return a new access token. A 200 without one is an unexpected response
  // from the auth service — report it as such, not as a login problem.
  if (typeof tokens.accessToken !== 'string' || tokens.accessToken.length === 0) {
    throw new Error(
      'Token refresh returned HTTP 200 but no access token — the smritea auth service sent an ' +
        'unexpected response. Retry; if it persists, report it.',
    );
  }

  return saveAuth(tokens);
}

export async function runLoginFlow(): Promise<void> {
  ensureSettingsFile();
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
            writeHtml(res, 400, 'The door didn\'t open this time', 'State verification failed.');
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
            writeHtml(res, 404, 'The door didn\'t open this time', 'This callback path is not valid.');
            return;
          }

          writeHtml(
            res,
            400,
            'The door didn\'t open this time',
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

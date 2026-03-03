import { createServer } from 'node:http';
import { SSEServerTransport } from '@modelcontextprotocol/sdk/server/sse.js';
import { createMcpServer } from './server.js';

/**
 * Starts an HTTP server that exposes the MCP server over SSE transport.
 *
 * Clients connect via GET /sse (EventStream) and send messages via
 * POST /messages?sessionId=<id>. Each connection gets its own isolated
 * McpServer instance.
 */
export async function startSseServer(port: number): Promise<void> {
  const transports = new Map<string, SSEServerTransport>();

  const httpServer = createServer((req, res) => {
    // GET /sse — establish SSE connection
    if (req.method === 'GET' && req.url === '/sse') {
      const transport = new SSEServerTransport('/messages', res);
      transports.set(transport.sessionId, transport);

      transport.onclose = () => {
        transports.delete(transport.sessionId);
      };

      const server = createMcpServer();
      server.connect(transport).catch((err: unknown) => {
        console.error('SSE connect error:', err);
        res.end();
      });
      return;
    }

    // POST /messages?sessionId=<id> — client → server message
    if (req.method === 'POST' && req.url?.startsWith('/messages')) {
      const sessionId =
        new URL(req.url, `http://localhost:${port}`).searchParams.get('sessionId') ?? '';
      const transport = transports.get(sessionId);

      if (!transport) {
        res.writeHead(404).end('Session not found');
        return;
      }

      let body = '';
      req.on('data', (chunk: Buffer | string) => {
        body += chunk.toString();
      });
      req.on('end', () => {
        let parsed: unknown;
        try {
          parsed = JSON.parse(body);
        } catch (err) {
          res.writeHead(400).end('Invalid JSON');
          console.error('JSON parse error:', err);
          return;
        }
        transport.handlePostMessage(req, res, parsed).catch((err: unknown) => {
          console.error('Message handling error:', err);
        });
      });
      return;
    }

    res.writeHead(404).end('Not found');
  });

  httpServer.listen(port, () => {
    console.error(`smritea MCP server running (SSE) on port ${port}`);
    console.error(`  SSE stream : http://localhost:${port}/sse`);
    console.error(`  Messages   : http://localhost:${port}/messages`);
  });
}

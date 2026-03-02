export class McpConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'McpConfigError';
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class McpToolError extends Error {
  constructor(message: string, public readonly cause?: unknown) {
    super(message);
    this.name = 'McpToolError';
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

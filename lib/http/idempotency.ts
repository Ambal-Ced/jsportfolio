type Stored = {
  status: number;
  body: string;
  contentType: string;
  expiresAt: number;
};

const mem = new Map<string, Stored>();
const TTL_MS = 10 * 60_000;

export function readIdempotency(key: string): Stored | null {
  const row = mem.get(key);
  if (!row) return null;
  if (Date.now() > row.expiresAt) {
    mem.delete(key);
    return null;
  }
  return row;
}

export function writeIdempotency(
  key: string,
  status: number,
  body: string,
  contentType = "application/json",
): void {
  mem.set(key, { status, body, contentType, expiresAt: Date.now() + TTL_MS });
}

export function requireIdempotencyKey(headers: Headers): string {
  const key = headers.get("idempotency-key")?.trim();
  if (!key) {
    const err = new Error("Missing Idempotency-Key");
    err.name = "IdempotencyRequiredError";
    throw err;
  }
  return key;
}

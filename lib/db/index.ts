import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { schema } from "@/drizzle/schema";
import { withBulkhead } from "@/lib/resilience/bulkhead";
import { withCircuitBreaker } from "@/lib/resilience/circuitBreaker";

const dbPath = join(process.cwd(), "data", "prep.db").replace(/\\/g, "/");

mkdirSync(dirname(dbPath), { recursive: true });

const client = createClient({ url: `file:${dbPath}` });

export const db = drizzle(client, { schema });

let migrated = false;

const DDL = `
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  avatar_url TEXT,
  created_at INTEGER NOT NULL
);
CREATE UNIQUE INDEX IF NOT EXISTS users_email_uidx ON users(email);
CREATE INDEX IF NOT EXISTS users_name_idx ON users(name);
CREATE INDEX IF NOT EXISTS users_created_at_idx ON users(created_at);

CREATE TABLE IF NOT EXISTS sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id),
  token TEXT NOT NULL,
  expires_at INTEGER NOT NULL,
  created_at INTEGER NOT NULL
);
CREATE UNIQUE INDEX IF NOT EXISTS sessions_token_uidx ON sessions(token);
CREATE INDEX IF NOT EXISTS sessions_user_id_idx ON sessions(user_id);
CREATE INDEX IF NOT EXISTS sessions_expires_at_idx ON sessions(expires_at);
CREATE INDEX IF NOT EXISTS sessions_user_expires_idx ON sessions(user_id, expires_at);

CREATE TABLE IF NOT EXISTS posts (
  id TEXT PRIMARY KEY,
  author_id TEXT NOT NULL REFERENCES users(id),
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  created_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS posts_author_id_idx ON posts(author_id);
CREATE INDEX IF NOT EXISTS posts_created_at_idx ON posts(created_at);
CREATE INDEX IF NOT EXISTS posts_author_created_idx ON posts(author_id, created_at);

CREATE TABLE IF NOT EXISTS notifications (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id),
  title TEXT NOT NULL,
  read INTEGER NOT NULL DEFAULT 0,
  created_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS notifications_user_created_idx ON notifications(user_id, created_at);
CREATE INDEX IF NOT EXISTS notifications_user_read_idx ON notifications(user_id, read);

CREATE TABLE IF NOT EXISTS idempotency_keys (
  key TEXT PRIMARY KEY,
  status INTEGER NOT NULL,
  body TEXT NOT NULL,
  created_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS idempotency_created_at_idx ON idempotency_keys(created_at);
`;

export async function ensureDb(): Promise<typeof db> {
  if (!migrated) {
    await client.executeMultiple(DDL);
    migrated = true;
  }
  return db;
}

export async function withDb<T>(fn: (database: typeof db) => Promise<T>): Promise<T> {
  await ensureDb();
  return withCircuitBreaker("db", () => withBulkhead("db", () => fn(db)));
}

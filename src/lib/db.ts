import 'server-only';
import { createClient } from '@libsql/client';
import { drizzle, type LibSQLDatabase } from 'drizzle-orm/libsql';
import { sql } from 'drizzle-orm';
import * as schema from '@/lib/schema';

let db: LibSQLDatabase<typeof schema> | null = null;
let schemaReady: Promise<void> | null = null;

export function hasDb(): boolean {
  return Boolean(process.env.TURSO_DATABASE_URL);
}

export function getDb(): LibSQLDatabase<typeof schema> {
  if (!db) {
    const client = createClient({
      url: process.env.TURSO_DATABASE_URL as string,
      authToken: process.env.TURSO_AUTH_TOKEN,
    });
    db = drizzle(client, { schema });
  }
  return db;
}

/** Buat tabel kalau belum ada + seed default sekali. Idempotent, di-cache per proses. */
export function ensureSchema(): Promise<void> {
  if (!schemaReady) {
    schemaReady = init().catch((e) => {
      schemaReady = null;
      throw e;
    });
  }
  return schemaReady;
}

async function init(): Promise<void> {
  const d = getDb();

  await d.run(sql`CREATE TABLE IF NOT EXISTS experiences (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    position INTEGER NOT NULL,
    role TEXT NOT NULL,
    company TEXT NOT NULL,
    type TEXT NOT NULL,
    period TEXT NOT NULL,
    descr TEXT NOT NULL,
    tech TEXT NOT NULL,
    side TEXT NOT NULL
  )`);

  await d.run(sql`CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    position INTEGER NOT NULL,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    tech TEXT NOT NULL,
    description TEXT NOT NULL,
    github_url TEXT,
    play_store_url TEXT,
    app_store_url TEXT,
    created_at INTEGER
  )`);

  // Migrasi untuk tabel projects lama: tambah kolom created_at bila belum ada,
  // lalu backfill berdasarkan position agar urutan saat ini tetap terjaga
  // (position 0 = paling baru).
  try {
    await d.run(sql`ALTER TABLE projects ADD COLUMN created_at INTEGER`);
  } catch {
    // kolom sudah ada — abaikan
  }
  await d.run(
    sql`UPDATE projects SET created_at = (CAST(strftime('%s','now') AS INTEGER) * 1000 - position * 86400000) WHERE created_at IS NULL`
  );

  await d.run(sql`CREATE TABLE IF NOT EXISTS contact (
    id INTEGER PRIMARY KEY,
    email TEXT NOT NULL,
    linkedin_url TEXT NOT NULL,
    github_url TEXT NOT NULL
  )`);
}

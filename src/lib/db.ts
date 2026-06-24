import 'server-only';
import { createClient } from '@libsql/client';
import { drizzle, type LibSQLDatabase } from 'drizzle-orm/libsql';
import { sql } from 'drizzle-orm';
import {
  DEFAULT_CONTACT,
  DEFAULT_EXPERIENCES,
  DEFAULT_PROJECTS,
} from '@/data/content';
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

  await seedIfEmpty(d);
}

async function seedIfEmpty(d: LibSQLDatabase<typeof schema>): Promise<void> {
  const [exp] = await d
    .select({ n: sql<number>`count(*)` })
    .from(schema.experiences);
  const [proj] = await d
    .select({ n: sql<number>`count(*)` })
    .from(schema.projects);

  if (Number(exp.n) === 0) {
    await d.insert(schema.experiences).values(
      DEFAULT_EXPERIENCES.map((e, i) => ({
        position: i,
        role: e.role,
        company: e.company,
        type: e.type,
        period: e.period,
        descr: e.desc,
        tech: JSON.stringify(e.tech),
        side: e.side,
      }))
    );
  }

  if (Number(proj.n) === 0) {
    await d.insert(schema.projects).values(
      DEFAULT_PROJECTS.map((p, i) => ({
        position: i,
        title: p.title,
        category: p.category,
        tech: p.tech,
        description: p.description,
        githubUrl: p.githubUrl ?? null,
        playStoreUrl: p.playStoreUrl ?? null,
        appStoreUrl: p.appStoreUrl ?? null,
        // Urutan array = terbaru → lama; beri createdAt menurun agar konsisten.
        createdAt: Date.now() - i * 86400000,
      }))
    );
  }

  const [cont] = await d
    .select({ n: sql<number>`count(*)` })
    .from(schema.contact);
  if (Number(cont.n) === 0) {
    await d.insert(schema.contact).values({
      id: 1,
      email: DEFAULT_CONTACT.email,
      linkedinUrl: DEFAULT_CONTACT.linkedinUrl,
      githubUrl: DEFAULT_CONTACT.githubUrl,
    });
  }
}

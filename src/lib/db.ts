import 'server-only';
import { createClient, type Client } from '@libsql/client';
import { DEFAULT_EXPERIENCES, DEFAULT_PROJECTS } from '@/data/content';

let client: Client | null = null;
let schemaReady: Promise<void> | null = null;

export function hasDb(): boolean {
  return Boolean(process.env.TURSO_DATABASE_URL);
}

export function getClient(): Client {
  if (!client) {
    client = createClient({
      url: process.env.TURSO_DATABASE_URL as string,
      authToken: process.env.TURSO_AUTH_TOKEN,
    });
  }
  return client;
}

/** Buat tabel kalau belum ada + seed default sekali. Dijalankan idempotent, di-cache per proses. */
export function ensureSchema(): Promise<void> {
  if (!schemaReady) {
    schemaReady = init().catch((e) => {
      // reset biar bisa retry di request berikutnya
      schemaReady = null;
      throw e;
    });
  }
  return schemaReady;
}

async function init(): Promise<void> {
  const db = getClient();

  await db.batch(
    [
      `CREATE TABLE IF NOT EXISTS experiences (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        position INTEGER NOT NULL,
        role TEXT NOT NULL,
        company TEXT NOT NULL,
        type TEXT NOT NULL,
        period TEXT NOT NULL,
        descr TEXT NOT NULL,
        tech TEXT NOT NULL,
        side TEXT NOT NULL
      )`,
      `CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        position INTEGER NOT NULL,
        title TEXT NOT NULL,
        category TEXT NOT NULL,
        tech TEXT NOT NULL,
        description TEXT NOT NULL,
        github_url TEXT,
        play_store_url TEXT,
        app_store_url TEXT
      )`,
    ],
    'write'
  );

  await seedIfEmpty(db);
}

async function seedIfEmpty(db: Client): Promise<void> {
  const [exp, proj] = await Promise.all([
    db.execute('SELECT COUNT(*) AS n FROM experiences'),
    db.execute('SELECT COUNT(*) AS n FROM projects'),
  ]);

  if (Number(exp.rows[0].n) === 0) {
    await db.batch(
      DEFAULT_EXPERIENCES.map((e, i) => ({
        sql: `INSERT INTO experiences (position, role, company, type, period, descr, tech, side)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [
          i,
          e.role,
          e.company,
          e.type,
          e.period,
          e.desc,
          JSON.stringify(e.tech),
          e.side,
        ],
      })),
      'write'
    );
  }

  if (Number(proj.rows[0].n) === 0) {
    await db.batch(
      DEFAULT_PROJECTS.map((p, i) => ({
        sql: `INSERT INTO projects (position, title, category, tech, description, github_url, play_store_url, app_store_url)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [
          i,
          p.title,
          p.category,
          p.tech,
          p.description,
          p.githubUrl ?? null,
          p.playStoreUrl ?? null,
          p.appStoreUrl ?? null,
        ],
      })),
      'write'
    );
  }
}

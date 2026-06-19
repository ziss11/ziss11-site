import 'server-only';
import {
  DEFAULT_EXPERIENCES,
  DEFAULT_PROJECTS,
  type Experience,
  type Project,
} from '@/data/content';
import { ensureSchema, getClient, hasDb } from '@/lib/db';

export async function getExperiences(): Promise<Experience[]> {
  if (!hasDb()) return DEFAULT_EXPERIENCES;
  try {
    await ensureSchema();
    const { rows } = await getClient().execute(
      'SELECT role, company, type, period, descr, tech, side FROM experiences ORDER BY position ASC'
    );
    return rows.map((r) => ({
      role: String(r.role),
      company: String(r.company),
      type: String(r.type),
      period: String(r.period),
      desc: String(r.descr),
      tech: JSON.parse(String(r.tech)) as string[],
      side: r.side === 'right' ? 'right' : 'left',
    }));
  } catch {
    return DEFAULT_EXPERIENCES;
  }
}

export async function getProjects(): Promise<Project[]> {
  if (!hasDb()) return DEFAULT_PROJECTS;
  try {
    await ensureSchema();
    const { rows } = await getClient().execute(
      'SELECT title, category, tech, description, github_url, play_store_url, app_store_url FROM projects ORDER BY position ASC'
    );
    return rows.map((r) => ({
      title: String(r.title),
      category: String(r.category),
      tech: String(r.tech),
      description: String(r.description),
      githubUrl: r.github_url ? String(r.github_url) : undefined,
      playStoreUrl: r.play_store_url ? String(r.play_store_url) : undefined,
      appStoreUrl: r.app_store_url ? String(r.app_store_url) : undefined,
    }));
  } catch {
    return DEFAULT_PROJECTS;
  }
}

export async function saveExperiences(data: Experience[]): Promise<void> {
  await ensureSchema();
  await getClient().batch(
    [
      { sql: 'DELETE FROM experiences', args: [] },
      ...data.map((e, i) => ({
        sql: `INSERT INTO experiences (position, role, company, type, period, descr, tech, side)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [
          i,
          e.role,
          e.company,
          e.type,
          e.period,
          e.desc,
          JSON.stringify(e.tech ?? []),
          e.side === 'right' ? 'right' : 'left',
        ],
      })),
    ],
    'write'
  );
}

export async function saveProjects(data: Project[]): Promise<void> {
  await ensureSchema();
  await getClient().batch(
    [
      { sql: 'DELETE FROM projects', args: [] },
      ...data.map((p, i) => ({
        sql: `INSERT INTO projects (position, title, category, tech, description, github_url, play_store_url, app_store_url)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [
          i,
          p.title,
          p.category,
          p.tech,
          p.description,
          p.githubUrl?.trim() || null,
          p.playStoreUrl?.trim() || null,
          p.appStoreUrl?.trim() || null,
        ],
      })),
    ],
    'write'
  );
}

import 'server-only';
import { asc } from 'drizzle-orm';
import {
  DEFAULT_EXPERIENCES,
  DEFAULT_PROJECTS,
  type Experience,
  type Project,
} from '@/data/content';
import { ensureSchema, getDb, hasDb } from '@/lib/db';
import { experiences, projects } from '@/lib/schema';

export async function getExperiences(): Promise<Experience[]> {
  if (!hasDb()) return DEFAULT_EXPERIENCES;
  try {
    await ensureSchema();
    const rows = await getDb()
      .select()
      .from(experiences)
      .orderBy(asc(experiences.position));
    return rows.map((r) => ({
      role: r.role,
      company: r.company,
      type: r.type,
      period: r.period,
      desc: r.descr,
      tech: JSON.parse(r.tech) as string[],
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
    const rows = await getDb()
      .select()
      .from(projects)
      .orderBy(asc(projects.position));
    return rows.map((r) => ({
      title: r.title,
      category: r.category,
      tech: r.tech,
      description: r.description,
      githubUrl: r.githubUrl ?? undefined,
      playStoreUrl: r.playStoreUrl ?? undefined,
      appStoreUrl: r.appStoreUrl ?? undefined,
    }));
  } catch {
    return DEFAULT_PROJECTS;
  }
}

export async function saveExperiences(data: Experience[]): Promise<void> {
  await ensureSchema();
  const d = getDb();
  if (data.length === 0) {
    await d.delete(experiences);
    return;
  }
  await d.batch([
    d.delete(experiences),
    d.insert(experiences).values(
      data.map((e, i) => ({
        position: i,
        role: e.role,
        company: e.company,
        type: e.type,
        period: e.period,
        descr: e.desc,
        tech: JSON.stringify(e.tech ?? []),
        side: e.side === 'right' ? 'right' : 'left',
      }))
    ),
  ]);
}

export async function saveProjects(data: Project[]): Promise<void> {
  await ensureSchema();
  const d = getDb();
  if (data.length === 0) {
    await d.delete(projects);
    return;
  }
  await d.batch([
    d.delete(projects),
    d.insert(projects).values(
      data.map((p, i) => ({
        position: i,
        title: p.title,
        category: p.category,
        tech: p.tech,
        description: p.description,
        githubUrl: p.githubUrl?.trim() || null,
        playStoreUrl: p.playStoreUrl?.trim() || null,
        appStoreUrl: p.appStoreUrl?.trim() || null,
      }))
    ),
  ]);
}

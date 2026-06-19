import 'server-only';
import { list, put } from '@vercel/blob';
import {
  DEFAULT_EXPERIENCES,
  DEFAULT_PROJECTS,
  type Experience,
  type Project,
} from '@/data/content';

const EXPERIENCE_PATH = 'content/experience.json';
const PROJECTS_PATH = 'content/projects.json';
const RESUME_PATH = 'content/resume.pdf';

function hasToken(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

/** Cari URL blob berdasarkan pathname persis. Null kalau belum ada / tanpa token. */
async function findBlobUrl(pathname: string): Promise<string | null> {
  if (!hasToken()) return null;
  try {
    const { blobs } = await list({ prefix: pathname, limit: 1 });
    const match = blobs.find((b) => b.pathname === pathname);
    return match?.url ?? null;
  } catch {
    return null;
  }
}

async function readJson<T>(pathname: string, fallback: T): Promise<T> {
  const url = await findBlobUrl(pathname);
  if (!url) return fallback;
  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return fallback;
    return (await res.json()) as T;
  } catch {
    return fallback;
  }
}

export async function getExperiences(): Promise<Experience[]> {
  return readJson<Experience[]>(EXPERIENCE_PATH, DEFAULT_EXPERIENCES);
}

export async function getProjects(): Promise<Project[]> {
  return readJson<Project[]>(PROJECTS_PATH, DEFAULT_PROJECTS);
}

export async function saveExperiences(data: Experience[]): Promise<void> {
  await put(EXPERIENCE_PATH, JSON.stringify(data), {
    access: 'public',
    allowOverwrite: true,
    contentType: 'application/json',
    cacheControlMaxAge: 0,
  });
}

export async function saveProjects(data: Project[]): Promise<void> {
  await put(PROJECTS_PATH, JSON.stringify(data), {
    access: 'public',
    allowOverwrite: true,
    contentType: 'application/json',
    cacheControlMaxAge: 0,
  });
}

/** URL resume yang di-upload via admin. Null kalau belum ada (pakai /resume.pdf statis). */
export async function getResumeUrl(): Promise<string | null> {
  return findBlobUrl(RESUME_PATH);
}

export async function resumeExists(): Promise<boolean> {
  return Boolean(await getResumeUrl());
}

export async function saveResume(file: File): Promise<void> {
  await put(RESUME_PATH, file, {
    access: 'public',
    allowOverwrite: true,
    contentType: 'application/pdf',
    cacheControlMaxAge: 0,
  });
}

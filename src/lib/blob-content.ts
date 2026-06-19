import 'server-only';
import { list, put } from '@vercel/blob';

const RESUME_PATH = 'content/resume.pdf';

function hasToken(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

/** URL resume yang di-upload via admin. Null kalau belum ada (pakai /resume.pdf statis). */
export async function getResumeUrl(): Promise<string | null> {
  if (!hasToken()) return null;
  try {
    const { blobs } = await list({ prefix: RESUME_PATH, limit: 1 });
    const match = blobs.find((b) => b.pathname === RESUME_PATH);
    return match?.url ?? null;
  } catch {
    return null;
  }
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

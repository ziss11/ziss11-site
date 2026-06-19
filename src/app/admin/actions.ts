'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { SESSION_COOKIE, expectedToken, verifyPassword } from '@/lib/auth';
import { saveExperiences, saveProjects } from '@/lib/content-db';
import { saveResume } from '@/lib/blob-content';
import type { Experience, Project } from '@/data/content';

export async function login(_prev: unknown, formData: FormData) {
  const password = String(formData.get('password') ?? '');

  if (!verifyPassword(password)) {
    return { error: 'Password salah.' };
  }

  const token = await expectedToken();
  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 hari
  });

  redirect('/admin');
}

export async function logout() {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
  redirect('/admin/login');
}

export async function saveExperiencesAction(data: Experience[]) {
  try {
    await saveExperiences(data);
    revalidatePath('/');
    return { ok: true as const };
  } catch (e) {
    return { ok: false as const, error: (e as Error).message };
  }
}

export async function saveProjectsAction(data: Project[]) {
  try {
    await saveProjects(data);
    revalidatePath('/');
    return { ok: true as const };
  } catch (e) {
    return { ok: false as const, error: (e as Error).message };
  }
}

export async function saveResumeAction(_prev: unknown, formData: FormData) {
  const file = formData.get('resume');

  if (!(file instanceof File) || file.size === 0) {
    return { ok: false as const, error: 'Pilih file PDF dulu.' };
  }
  if (file.type !== 'application/pdf') {
    return { ok: false as const, error: 'File harus PDF.' };
  }

  try {
    await saveResume(file);
    revalidatePath('/resume.pdf');
    return { ok: true as const };
  } catch (e) {
    return { ok: false as const, error: (e as Error).message };
  }
}

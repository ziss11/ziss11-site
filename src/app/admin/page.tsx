import AdminShell from '@/components/admin/AdminShell';
import { getContact, getExperiences, getProjects } from '@/lib/content-db';
import { resumeExists } from '@/lib/blob-content';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const [experiences, projects, contact, hasResume] = await Promise.all([
    getExperiences(),
    getProjects(),
    getContact(),
    resumeExists(),
  ]);

  return (
    <AdminShell
      experiences={experiences}
      projects={projects}
      contact={contact}
      hasResume={hasResume}
    />
  );
}

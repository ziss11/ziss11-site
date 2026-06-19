import { LogOut } from 'lucide-react';
import AdminTabs from '@/components/admin/AdminTabs';
import { getContact, getExperiences, getProjects } from '@/lib/content-db';
import { resumeExists } from '@/lib/blob-content';
import { logout } from './actions';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const [experiences, projects, contact, hasResume] = await Promise.all([
    getExperiences(),
    getProjects(),
    getContact(),
    resumeExists(),
  ]);

  return (
    <main className='mx-auto max-w-[820px] px-4 py-12 md:px-6'>
      <header className='mb-8 flex items-center justify-between'>
        <div className='font-mono'>
          <div className='flex items-center gap-2 text-xs text-text-secondary'>
            <span className='text-accent-green'>$</span>
            <span>~/admin</span>
          </div>
          <h1 className='mt-1 text-[1.6rem] text-text-primary'>
            Content <span className='text-accent-green'>Manager</span>
          </h1>
        </div>
        <form action={logout}>
          <button
            type='submit'
            className='btn-terminal flex items-center gap-2 hover:border-accent-red hover:text-accent-red'
          >
            <LogOut size={16} /> logout
          </button>
        </form>
      </header>

      <AdminTabs
        experiences={experiences}
        projects={projects}
        contact={contact}
        hasResume={hasResume}
      />
    </main>
  );
}

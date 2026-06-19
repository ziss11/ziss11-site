import { LogOut } from 'lucide-react';
import ExperienceEditor from '@/components/admin/ExperienceEditor';
import ProjectsEditor from '@/components/admin/ProjectsEditor';
import ResumeUploader from '@/components/admin/ResumeUploader';
import { getExperiences, getProjects } from '@/lib/content-db';
import { resumeExists } from '@/lib/blob-content';
import { logout } from './actions';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const [experiences, projects, hasResume] = await Promise.all([
    getExperiences(),
    getProjects(),
    resumeExists(),
  ]);

  return (
    <main className='mx-auto max-w-[900px] px-4 py-16 md:px-8'>
      <header className='mb-10 flex items-center justify-between'>
        <div className='font-mono'>
          <div className='flex items-center gap-2 text-sm text-text-secondary'>
            <span className='text-accent-green'>$</span>
            <span>./admin --dashboard</span>
          </div>
          <h1 className='mt-2 text-[2rem] text-text-primary'>
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

      <div className='flex flex-col gap-14'>
        <section>
          <ExperienceEditor initial={experiences} />
        </section>
        <section>
          <ProjectsEditor initial={projects} />
        </section>
        <section>
          <ResumeUploader hasCustom={hasResume} />
        </section>
      </div>
    </main>
  );
}

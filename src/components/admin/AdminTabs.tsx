'use client';

import { useState } from 'react';
import { Briefcase, FileText, FolderGit2, Mail } from 'lucide-react';
import type { Contact, Experience, Project } from '@/data/content';
import ExperienceEditor from './ExperienceEditor';
import ProjectsEditor from './ProjectsEditor';
import ContactEditor from './ContactEditor';
import ResumeUploader from './ResumeUploader';

type TabId = 'milestones' | 'projects' | 'contact' | 'resume';

const TABS: { id: TabId; label: string; icon: React.ReactNode }[] = [
  { id: 'milestones', label: 'Milestones', icon: <Briefcase size={16} /> },
  { id: 'projects', label: 'Projects', icon: <FolderGit2 size={16} /> },
  { id: 'contact', label: 'Contact', icon: <Mail size={16} /> },
  { id: 'resume', label: 'Resume', icon: <FileText size={16} /> },
];

export default function AdminTabs({
  experiences,
  projects,
  contact,
  hasResume,
}: {
  experiences: Experience[];
  projects: Project[];
  contact: Contact;
  hasResume: boolean;
}) {
  const [active, setActive] = useState<TabId>('milestones');

  return (
    <div className='flex flex-col gap-6'>
      {/* Tab bar */}
      <div className='flex flex-wrap gap-2 border-b border-text-secondary/10 pb-3'>
        {TABS.map((t) => {
          const on = active === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 font-mono text-sm transition-all ${
                on
                  ? 'bg-accent-green/10 text-accent-green border border-accent-green/40'
                  : 'text-text-secondary border border-transparent hover:text-text-primary hover:bg-bg-tertiary'
              }`}
            >
              {t.icon}
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Panel */}
      <div>
        {active === 'milestones' && <ExperienceEditor initial={experiences} />}
        {active === 'projects' && <ProjectsEditor initial={projects} />}
        {active === 'contact' && <ContactEditor initial={contact} />}
        {active === 'resume' && <ResumeUploader hasCustom={hasResume} />}
      </div>
    </div>
  );
}

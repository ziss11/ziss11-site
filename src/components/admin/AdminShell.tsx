'use client';

import { useState, useTransition } from 'react';
import {
  Briefcase,
  Check,
  ExternalLink,
  FileText,
  FolderGit2,
  LogOut,
  Mail,
  Pencil,
  Plus,
  Trash2,
  X,
} from 'lucide-react';
import Link from 'next/link';
import type { Contact, Experience, Project } from '@/data/content';
import {
  logout,
  saveContactAction,
  saveExperiencesAction,
  saveProjectsAction,
} from '@/app/admin/actions';
import ResumeUploader from './ResumeUploader';

type Tab = 'experience' | 'projects' | 'contact' | 'resume';

type FormField = {
  key: string;
  label: string;
  value: string;
  placeholder?: string;
  hint?: string;
  multiline?: boolean;
};

type Editing =
  | { kind: 'experience'; index: number | null; draft: Record<string, string> }
  | { kind: 'project'; index: number | null; draft: Record<string, string> }
  | null;

const MONO: React.CSSProperties = { fontFamily: 'var(--font-mono)' };
const DISPLAY: React.CSSProperties = { fontFamily: 'var(--font-display)' };

const META: Record<
  Tab,
  { icon: React.ReactNode; label: string; kicker: string; title: string; desc: string; add: string }
> = {
  experience: {
    icon: <Briefcase size={16} />,
    label: 'Experience',
    kicker: 'Section 01',
    title: 'Experience',
    desc: 'Manage the career milestones shown on your timeline.',
    add: 'Add role',
  },
  projects: {
    icon: <FolderGit2 size={16} />,
    label: 'Projects',
    kicker: 'Section 02',
    title: 'Projects',
    desc: 'Curate the featured work displayed in your portfolio grid.',
    add: 'Add project',
  },
  contact: {
    icon: <Mail size={16} />,
    label: 'Contact',
    kicker: 'Section 03',
    title: 'Contact',
    desc: 'Update the contact channels visitors use to reach you.',
    add: '',
  },
  resume: {
    icon: <FileText size={16} />,
    label: 'Resume',
    kicker: 'Section 04',
    title: 'Resume',
    desc: 'Upload the PDF served at /resume.pdf.',
    add: '',
  },
};

export default function AdminShell({
  experiences: initialExp,
  projects: initialProj,
  contact: initialContact,
  hasResume,
}: {
  experiences: Experience[];
  projects: Project[];
  contact: Contact;
  hasResume: boolean;
}) {
  const [tab, setTab] = useState<Tab>('experience');
  const [experiences, setExperiences] = useState<Experience[]>(initialExp);
  const [projects, setProjects] = useState<Project[]>(initialProj);
  const [contact, setContact] = useState<Contact>(initialContact);
  const [editing, setEditing] = useState<Editing>(null);
  const [toast, setToast] = useState('');
  const [, startTransition] = useTransition();

  const flash = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2200);
  };

  // ----- nav -----
  const navItems: { key: Tab; count: number }[] = [
    { key: 'experience', count: experiences.length },
    { key: 'projects', count: projects.length },
    { key: 'contact', count: 3 },
    { key: 'resume', count: hasResume ? 1 : 0 },
  ];

  // ----- list rows -----
  type Row = { title: string; badge?: string; subtitle: string; index: number };
  let rows: Row[] = [];
  if (tab === 'experience') {
    rows = experiences.map((e, i) => ({
      title: e.role,
      badge: e.type,
      subtitle: `${e.company ? e.company + ' · ' : ''}${e.period} — ${e.desc}`,
      index: i,
    }));
  } else if (tab === 'projects') {
    rows = projects.map((p, i) => ({
      title: p.title,
      subtitle: p.description,
      index: i,
    }));
  }

  // ----- editing drawer -----
  const openEdit = (index: number | null) => {
    if (tab === 'experience') {
      const e = index == null ? null : experiences[index];
      setEditing({
        kind: 'experience',
        index,
        draft: {
          role: e?.role ?? '',
          company: e?.company ?? '',
          period: e?.period ?? '',
          type: e?.type ?? '',
          desc: e?.desc ?? '',
          tags: e ? e.tech.join(', ') : '',
        },
      });
    } else if (tab === 'projects') {
      const p = index == null ? null : projects[index];
      setEditing({
        kind: 'project',
        index,
        draft: {
          title: p?.title ?? '',
          category: p?.category ?? '',
          description: p?.description ?? '',
          tags: p?.tech ?? '',
          githubUrl: p?.githubUrl ?? '',
          playStoreUrl: p?.playStoreUrl ?? '',
          appStoreUrl: p?.appStoreUrl ?? '',
        },
      });
    }
  };

  const setField = (key: string, value: string) =>
    setEditing((prev) =>
      prev ? { ...prev, draft: { ...prev.draft, [key]: value } } : prev
    );

  const formFields = (): FormField[] => {
    if (!editing) return [];
    const d = editing.draft;
    if (editing.kind === 'experience') {
      return [
        { key: 'role', label: 'Role', value: d.role, placeholder: 'Sr. Mobile Engineer' },
        { key: 'company', label: 'Company', value: d.company, placeholder: '@ Company name' },
        { key: 'period', label: 'Period', value: d.period, placeholder: 'Jul 2024 — Present' },
        { key: 'type', label: 'Type', value: d.type, placeholder: 'Full-time' },
        { key: 'desc', label: 'Description', value: d.desc, placeholder: 'What you did…', multiline: true },
        { key: 'tags', label: 'Tags', value: d.tags, placeholder: 'Flutter, CI/CD', hint: 'Comma-separated' },
      ];
    }
    return [
      { key: 'title', label: 'Project name', value: d.title, placeholder: 'Project name' },
      { key: 'category', label: 'Category', value: d.category, placeholder: 'Flutter / Dart' },
      { key: 'description', label: 'Description', value: d.description, placeholder: 'What it does…', multiline: true },
      { key: 'tags', label: 'Tags', value: d.tags, placeholder: 'Flutter, SaaS', hint: 'Comma-separated' },
      { key: 'playStoreUrl', label: 'Play Store URL', value: d.playStoreUrl, placeholder: 'https://…', hint: 'Optional' },
      { key: 'appStoreUrl', label: 'App Store URL', value: d.appStoreUrl, placeholder: 'https://…', hint: 'Optional' },
      { key: 'githubUrl', label: 'GitHub URL', value: d.githubUrl, placeholder: 'https://…', hint: 'Optional' },
    ];
  };

  const persistExperiences = (next: Experience[], msg: string) => {
    setExperiences(next);
    startTransition(async () => {
      const res = await saveExperiencesAction(next);
      flash(res.ok ? msg : `Save failed: ${res.error}`);
    });
  };

  const persistProjects = (next: Project[], msg: string) => {
    setProjects(next);
    startTransition(async () => {
      const res = await saveProjectsAction(next);
      flash(res.ok ? msg : `Save failed: ${res.error}`);
    });
  };

  const saveEdit = () => {
    if (!editing) return;
    const d = editing.draft;
    if (editing.kind === 'experience') {
      const item: Experience = {
        role: d.role,
        company: d.company,
        period: d.period,
        type: d.type,
        desc: d.desc,
        tech: d.tags.split(',').map((t) => t.trim()).filter(Boolean),
        side: editing.index != null ? experiences[editing.index].side : 'left',
      };
      const next = [...experiences];
      if (editing.index == null) next.push(item);
      else next[editing.index] = item;
      persistExperiences(next, editing.index == null ? 'Item added' : 'Changes saved');
    } else {
      const item: Project = {
        title: d.title,
        category: d.category,
        tech: d.tags,
        description: d.description,
        githubUrl: d.githubUrl.trim() || undefined,
        playStoreUrl: d.playStoreUrl.trim() || undefined,
        appStoreUrl: d.appStoreUrl.trim() || undefined,
        createdAt:
          editing.index != null
            ? projects[editing.index].createdAt
            : Date.now(),
      };
      const next = [...projects];
      if (editing.index == null) next.push(item);
      else next[editing.index] = item;
      persistProjects(next, editing.index == null ? 'Item added' : 'Changes saved');
    }
    setEditing(null);
  };

  const del = (index: number) => {
    if (tab === 'experience') {
      persistExperiences(experiences.filter((_, i) => i !== index), 'Item deleted');
    } else if (tab === 'projects') {
      persistProjects(projects.filter((_, i) => i !== index), 'Item deleted');
    }
  };

  const saveContact = () => {
    startTransition(async () => {
      const res = await saveContactAction(contact);
      flash(res.ok ? 'Contact details saved' : `Save failed: ${res.error}`);
    });
  };

  const meta = META[tab];

  return (
    <div className='admin-shell'>
      {/* SIDEBAR */}
      <aside
        className='admin-sidebar'
        style={{
          position: 'sticky',
          top: 0,
          alignSelf: 'start',
          height: '100vh',
          borderRight: '1px solid rgba(255,255,255,0.07)',
          padding: '26px 18px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '0 8px 22px',
            marginBottom: 16,
            borderBottom: '1px solid rgba(255,255,255,0.07)',
          }}
        >
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 36,
              height: 36,
              border: '1px solid var(--color-border)',
              borderRadius: 9,
              ...DISPLAY,
              fontWeight: 700,
              fontSize: 15,
              color: 'var(--color-accent)',
            }}
          >
            AZ
          </span>
          <div>
            <p style={{ ...MONO, fontWeight: 700, fontSize: 13, margin: 0, letterSpacing: '-0.01em' }}>
              <span className='prompt'>admin@portfolio</span>:~#
            </p>
            <p style={{ ...MONO, fontSize: 10, letterSpacing: '0.06em', color: 'var(--color-accent-dim)', margin: '2px 0 0' }}>
              content-cms v1.0
            </p>
          </div>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {navItems.map(({ key, count }) => {
            const on = key === tab;
            return (
              <button
                key={key}
                onClick={() => {
                  setTab(key);
                  setEditing(null);
                }}
                style={{
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 10,
                  fontSize: 14.5,
                  fontWeight: on ? 500 : 400,
                  padding: '11px 13px',
                  borderRadius: 9,
                  border: 'none',
                  background: on ? 'rgba(124,138,255,0.1)' : 'transparent',
                  color: on ? 'var(--color-accent)' : 'rgba(255,255,255,0.6)',
                  transition: 'background .2s, color .2s',
                }}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                  {META[key].icon}
                  {META[key].label}
                </span>
                <span style={{ ...MONO, fontSize: 11, opacity: 0.65 }}>{count}</span>
              </button>
            );
          })}
        </nav>

        <div
          style={{
            marginTop: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
            paddingTop: 16,
            borderTop: '1px solid rgba(255,255,255,0.07)',
          }}
        >
          <Link href='/' target='_blank' rel='noopener noreferrer' className='az-side-link'>
            <ExternalLink size={15} /> View live site
          </Link>
          <form action={logout}>
            <button type='submit' className='az-side-link az-side-link-danger' style={{ width: '100%' }}>
              <LogOut size={15} /> Sign out
            </button>
          </form>
        </div>
      </aside>

      {/* MAIN */}
      <main style={{ padding: '40px 48px 80px', maxWidth: 980 }}>
        {toast && (
          <div
            style={{
              position: 'fixed',
              top: 24,
              right: 32,
              zIndex: 80,
              display: 'flex',
              alignItems: 'center',
              gap: 9,
              fontSize: 14,
              color: '#101012',
              background: 'var(--color-accent)',
              padding: '12px 18px',
              borderRadius: 9,
              boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
            }}
          >
            <Check size={16} strokeWidth={2.6} /> {toast}
          </div>
        )}

        <header
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: 20,
            marginBottom: 8,
          }}
        >
          <div>
            <p style={{ ...MONO, fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-accent)', margin: '0 0 10px' }}>
              {meta.kicker}
            </p>
            <h1 style={{ ...DISPLAY, fontWeight: 600, fontSize: 36, letterSpacing: '-0.025em', lineHeight: 1, margin: 0 }}>
              {meta.title}
            </h1>
          </div>
          {meta.add && (
            <button onClick={() => openEdit(null)} className='az-btn' style={{ fontSize: 14, padding: '11px 18px', borderRadius: 9, whiteSpace: 'nowrap' }}>
              <Plus size={15} strokeWidth={2.6} /> {meta.add}
            </button>
          )}
        </header>
        <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', margin: '0 0 36px', maxWidth: 560 }}>
          {meta.desc}
        </p>

        {/* LIST (experience / projects) */}
        {(tab === 'experience' || tab === 'projects') && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {rows.map((row) => (
              <div
                key={row.index}
                className='az-row'
                style={{ display: 'flex', alignItems: 'flex-start', gap: 18, padding: '22px 24px' }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 6 }}>
                    <span style={{ ...DISPLAY, fontWeight: 600, fontSize: 17, letterSpacing: '-0.01em' }}>
                      {row.title}
                    </span>
                    {row.badge && (
                      <span style={{ ...MONO, fontSize: 10.5, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-accent)', border: '1px solid rgba(124,138,255,0.3)', borderRadius: 9, padding: '3px 9px' }}>
                        {row.badge}
                      </span>
                    )}
                  </div>
                  <p
                    style={{
                      fontSize: 14,
                      color: 'rgba(255,255,255,0.5)',
                      margin: 0,
                      lineHeight: 1.55,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    {row.subtitle}
                  </p>
                </div>
                <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                  <button onClick={() => openEdit(row.index)} title='Edit' className='az-icon-btn'>
                    <Pencil size={15} />
                  </button>
                  <button onClick={() => del(row.index)} title='Delete' className='az-icon-btn az-icon-btn-danger'>
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CONTACT inline form */}
        {tab === 'contact' && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 18,
              padding: 30,
              border: '1px solid rgba(255,255,255,0.09)',
              borderRadius: 9,
              background: 'rgba(255,255,255,0.018)',
            }}
          >
            {([
              { key: 'email', label: 'Email', placeholder: 'you@email.com' },
              { key: 'linkedinUrl', label: 'LinkedIn URL', placeholder: 'https://linkedin.com/in/username' },
              { key: 'githubUrl', label: 'GitHub URL', placeholder: 'https://github.com/username' },
            ] as const).map((f) => (
              <div key={f.key} style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                <label style={{ ...MONO, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>
                  {f.label}
                </label>
                <input
                  className='az-input'
                  value={contact[f.key]}
                  placeholder={f.placeholder}
                  onChange={(e) => setContact((prev) => ({ ...prev, [f.key]: e.target.value }))}
                />
              </div>
            ))}
            <button onClick={saveContact} className='az-btn' style={{ alignSelf: 'flex-start', fontSize: 14, padding: '12px 22px', borderRadius: 0 }}>
              Save contact details
            </button>
          </div>
        )}

        {/* RESUME */}
        {tab === 'resume' && <ResumeUploader hasCustom={hasResume} />}
      </main>

      {/* EDIT DRAWER */}
      {editing && (
        <>
          <div
            onClick={() => setEditing(null)}
            style={{ position: 'fixed', inset: 0, zIndex: 90, background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(3px)' }}
          />
          <div
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              zIndex: 91,
              width: 'min(480px, 92vw)',
              background: 'var(--color-surface)',
              borderLeft: '1px solid rgba(255,255,255,0.1)',
              padding: '34px 32px',
              overflowY: 'auto',
              boxShadow: '-30px 0 80px rgba(0,0,0,0.5)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
              <h2 style={{ ...DISPLAY, fontWeight: 600, fontSize: 22, letterSpacing: '-0.02em', margin: 0 }}>
                {editing.index == null
                  ? editing.kind === 'experience'
                    ? 'Add role'
                    : 'Add project'
                  : editing.kind === 'experience'
                    ? 'Edit role'
                    : 'Edit project'}
              </h2>
              <button onClick={() => setEditing(null)} className='az-icon-btn' title='Close'>
                <X size={16} strokeWidth={2.2} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {formFields().map((f) => (
                <div key={f.key} style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                  <label style={{ ...MONO, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>
                    {f.label}
                  </label>
                  {f.multiline ? (
                    <textarea
                      className='az-textarea'
                      rows={3}
                      value={f.value}
                      placeholder={f.placeholder}
                      onChange={(e) => setField(f.key, e.target.value)}
                    />
                  ) : (
                    <input
                      className='az-input'
                      value={f.value}
                      placeholder={f.placeholder}
                      onChange={(e) => setField(f.key, e.target.value)}
                    />
                  )}
                  {f.hint && (
                    <span style={{ ...MONO, fontSize: 11, color: 'rgba(255,255,255,0.34)' }}>{f.hint}</span>
                  )}
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 12, marginTop: 32 }}>
              <button onClick={saveEdit} className='az-btn' style={{ flex: 1, justifyContent: 'center', padding: 14 }}>
                Save changes
              </button>
              <button onClick={() => setEditing(null)} className='az-btn-ghost' style={{ padding: '14px 24px' }}>
                Cancel
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

'use client';

import { useState, useTransition } from 'react';
import { ArrowDown, ArrowUp, Plus, Trash2 } from 'lucide-react';
import type { Project } from '@/data/content';
import { saveProjectsAction } from '@/app/admin/actions';

const inputClass =
  'w-full rounded-lg border border-accent-green/20 bg-[#05050a]/80 px-3 py-2 font-mono text-sm text-text-primary outline-none transition-all placeholder:text-text-muted focus:border-accent-green focus:shadow-[0_0_0_3px_rgba(126,231,135,0.12)]';
const labelClass = 'font-mono text-xs text-text-secondary';

const emptyProject: Project = {
  title: '',
  category: '',
  tech: '',
  description: '',
  githubUrl: '',
  playStoreUrl: '',
  appStoreUrl: '',
};

export default function ProjectsEditor({ initial }: { initial: Project[] }) {
  const [items, setItems] = useState<Project[]>(initial);
  const [status, setStatus] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const update = (i: number, patch: Partial<Project>) =>
    setItems((prev) =>
      prev.map((it, idx) => (idx === i ? { ...it, ...patch } : it))
    );

  const remove = (i: number) =>
    setItems((prev) => prev.filter((_, idx) => idx !== i));

  const move = (i: number, dir: -1 | 1) =>
    setItems((prev) => {
      const j = i + dir;
      if (j < 0 || j >= prev.length) return prev;
      const next = [...prev];
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });

  const add = () => setItems((prev) => [...prev, { ...emptyProject }]);

  const save = () => {
    setStatus(null);
    startTransition(async () => {
      // Buang field URL kosong agar tetap optional.
      const cleaned = items.map((p) => ({
        ...p,
        githubUrl: p.githubUrl?.trim() || undefined,
        playStoreUrl: p.playStoreUrl?.trim() || undefined,
        appStoreUrl: p.appStoreUrl?.trim() || undefined,
      }));
      const res = await saveProjectsAction(cleaned);
      setStatus(res.ok ? 'tersimpan ✓' : `gagal: ${res.error}`);
    });
  };

  return (
    <div className='flex flex-col gap-5'>
      <div className='flex items-center justify-between'>
        <h2 className='font-mono text-[1.3rem] text-text-primary'>
          Featured <span className='text-accent-green'>Projects</span>
        </h2>
        <button
          onClick={add}
          className='btn-terminal flex items-center gap-2 hover:border-accent-green hover:text-accent-green'
        >
          <Plus size={16} /> tambah
        </button>
      </div>

      {items.map((it, i) => (
        <div
          key={i}
          className='rounded-[16px] border border-accent-green/20 bg-[#05050a]/80 p-4 backdrop-blur-md'
        >
          <div className='mb-3 flex items-center justify-between'>
            <span className='font-mono text-xs text-accent-green'>
              [{String(i + 1).padStart(2, '0')}]
            </span>
            <div className='flex items-center gap-1'>
              <button
                onClick={() => move(i, -1)}
                disabled={i === 0}
                className='rounded p-1 text-text-secondary transition-colors hover:text-accent-blue disabled:opacity-30'
                title='naik'
              >
                <ArrowUp size={16} />
              </button>
              <button
                onClick={() => move(i, 1)}
                disabled={i === items.length - 1}
                className='rounded p-1 text-text-secondary transition-colors hover:text-accent-blue disabled:opacity-30'
                title='turun'
              >
                <ArrowDown size={16} />
              </button>
              <button
                onClick={() => remove(i)}
                className='rounded p-1 text-text-secondary transition-colors hover:text-accent-red'
                title='hapus'
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>

          <div className='grid grid-cols-1 gap-3 md:grid-cols-2'>
            <label className='flex flex-col gap-1'>
              <span className={labelClass}>title</span>
              <input
                className={inputClass}
                value={it.title}
                onChange={(e) => update(i, { title: e.target.value })}
              />
            </label>
            <label className='flex flex-col gap-1'>
              <span className={labelClass}>category</span>
              <input
                className={inputClass}
                value={it.category}
                onChange={(e) => update(i, { category: e.target.value })}
              />
            </label>
            <label className='flex flex-col gap-1 md:col-span-2'>
              <span className={labelClass}>tech (pisah koma)</span>
              <input
                className={inputClass}
                value={it.tech}
                onChange={(e) => update(i, { tech: e.target.value })}
              />
            </label>
            <label className='flex flex-col gap-1 md:col-span-2'>
              <span className={labelClass}>description</span>
              <textarea
                rows={2}
                className={inputClass}
                value={it.description}
                onChange={(e) => update(i, { description: e.target.value })}
              />
            </label>
            <label className='flex flex-col gap-1'>
              <span className={labelClass}>githubUrl (opsional)</span>
              <input
                className={inputClass}
                value={it.githubUrl ?? ''}
                onChange={(e) => update(i, { githubUrl: e.target.value })}
              />
            </label>
            <label className='flex flex-col gap-1'>
              <span className={labelClass}>playStoreUrl (opsional)</span>
              <input
                className={inputClass}
                value={it.playStoreUrl ?? ''}
                onChange={(e) => update(i, { playStoreUrl: e.target.value })}
              />
            </label>
            <label className='flex flex-col gap-1 md:col-span-2'>
              <span className={labelClass}>appStoreUrl (opsional)</span>
              <input
                className={inputClass}
                value={it.appStoreUrl ?? ''}
                onChange={(e) => update(i, { appStoreUrl: e.target.value })}
              />
            </label>
          </div>
        </div>
      ))}

      <div className='flex items-center gap-3'>
        <button
          onClick={save}
          disabled={pending}
          className='btn-terminal hover:border-accent-green hover:text-accent-green disabled:opacity-50'
        >
          {pending ? '> menyimpan...' : '$ simpan projects'}
        </button>
        {status && (
          <span
            className={`font-mono text-xs ${
              status.startsWith('gagal') ? 'text-accent-red' : 'text-accent-green'
            }`}
          >
            {status}
          </span>
        )}
      </div>
    </div>
  );
}

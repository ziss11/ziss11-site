'use client';

import { useState, useTransition } from 'react';
import { ArrowDown, ArrowUp, Plus, Save, Trash2 } from 'lucide-react';
import type { Experience } from '@/data/content';
import { saveExperiencesAction } from '@/app/admin/actions';

const inputClass =
  'w-full rounded-lg border border-accent-green/20 bg-[#05050a]/80 px-3 py-2 font-mono text-sm text-text-primary outline-none transition-all placeholder:text-text-muted focus:border-accent-green focus:shadow-[0_0_0_3px_rgba(126,231,135,0.12)]';
const labelClass = 'font-mono text-xs text-text-secondary';

const emptyExperience: Experience = {
  role: '',
  company: '',
  type: 'Full-time',
  period: '',
  desc: '',
  tech: [],
  side: 'left',
};

export default function ExperienceEditor({
  initial,
}: {
  initial: Experience[];
}) {
  const [items, setItems] = useState<Experience[]>(initial);
  const [pending, startTransition] = useTransition();
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const [busyIndex, setBusyIndex] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const update = (i: number, patch: Partial<Experience>) =>
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

  const add = () => setItems((prev) => [...prev, { ...emptyExperience }]);

  // Simpan seluruh daftar (snapshot terkini). Tombol ada di tiap item agar mudah dijangkau.
  const save = (sourceIndex: number) => {
    setError(null);
    setBusyIndex(sourceIndex);
    startTransition(async () => {
      const res = await saveExperiencesAction(items);
      setBusyIndex(null);
      if (res.ok) {
        setSavedAt(sourceIndex);
        setTimeout(() => setSavedAt(null), 2000);
      } else {
        setError(res.error ?? 'gagal menyimpan');
      }
    });
  };

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center justify-between'>
        <p className='font-mono text-xs text-text-muted'>
          {items.length} milestone
        </p>
        <button
          onClick={add}
          className='btn-terminal flex items-center gap-2 hover:border-accent-green hover:text-accent-green'
        >
          <Plus size={16} /> tambah
        </button>
      </div>

      {error && (
        <p className='font-mono text-xs text-accent-red'>{'>'} {error}</p>
      )}

      {items.map((it, i) => (
        <div
          key={i}
          className='rounded-[16px] border border-accent-blue/20 bg-[#05050a]/60 p-4 backdrop-blur-md'
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
              <span className={labelClass}>role</span>
              <input
                className={inputClass}
                value={it.role}
                onChange={(e) => update(i, { role: e.target.value })}
              />
            </label>
            <label className='flex flex-col gap-1'>
              <span className={labelClass}>company</span>
              <input
                className={inputClass}
                value={it.company}
                onChange={(e) => update(i, { company: e.target.value })}
              />
            </label>
            <label className='flex flex-col gap-1'>
              <span className={labelClass}>type</span>
              <input
                className={inputClass}
                value={it.type}
                onChange={(e) => update(i, { type: e.target.value })}
              />
            </label>
            <label className='flex flex-col gap-1'>
              <span className={labelClass}>period</span>
              <input
                className={inputClass}
                value={it.period}
                onChange={(e) => update(i, { period: e.target.value })}
              />
            </label>
            <label className='flex flex-col gap-1 md:col-span-2'>
              <span className={labelClass}>desc</span>
              <textarea
                rows={2}
                className={inputClass}
                value={it.desc}
                onChange={(e) => update(i, { desc: e.target.value })}
              />
            </label>
            <label className='flex flex-col gap-1'>
              <span className={labelClass}>tech (pisah koma)</span>
              <input
                className={inputClass}
                value={it.tech.join(', ')}
                onChange={(e) =>
                  update(i, {
                    tech: e.target.value
                      .split(',')
                      .map((t) => t.trim())
                      .filter(Boolean),
                  })
                }
              />
            </label>
            <label className='flex flex-col gap-1'>
              <span className={labelClass}>side (posisi timeline)</span>
              <select
                className={inputClass}
                value={it.side}
                onChange={(e) =>
                  update(i, { side: e.target.value as 'left' | 'right' })
                }
              >
                <option value='left'>left</option>
                <option value='right'>right</option>
              </select>
            </label>
          </div>

          <div className='mt-4 flex items-center gap-3 border-t border-accent-green/10 pt-3'>
            <button
              onClick={() => save(i)}
              disabled={pending}
              className='btn-terminal flex items-center gap-2 hover:border-accent-green hover:text-accent-green disabled:opacity-50'
            >
              <Save size={15} />
              {busyIndex === i ? 'menyimpan...' : 'simpan'}
            </button>
            {savedAt === i && (
              <span className='font-mono text-xs text-accent-green'>
                tersimpan ✓
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

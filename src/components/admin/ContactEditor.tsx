'use client';

import { useState, useTransition } from 'react';
import type { Contact } from '@/data/content';
import { saveContactAction } from '@/app/admin/actions';

const inputClass =
  'w-full rounded-lg border border-accent-green/20 bg-[#05050a]/80 px-3 py-2 font-mono text-sm text-text-primary outline-none transition-all placeholder:text-text-muted focus:border-accent-green focus:shadow-[0_0_0_3px_rgba(126,231,135,0.12)]';
const labelClass = 'font-mono text-xs text-text-secondary';

export default function ContactEditor({ initial }: { initial: Contact }) {
  const [data, setData] = useState<Contact>(initial);
  const [status, setStatus] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const update = (patch: Partial<Contact>) =>
    setData((prev) => ({ ...prev, ...patch }));

  const save = () => {
    setStatus(null);
    startTransition(async () => {
      const res = await saveContactAction(data);
      setStatus(res.ok ? 'tersimpan ✓' : `gagal: ${res.error}`);
    });
  };

  return (
    <div className='rounded-[16px] border border-accent-green/20 bg-[#05050a]/60 p-5 backdrop-blur-md'>
      <div className='flex flex-col gap-3'>
        <label className='flex flex-col gap-1'>
          <span className={labelClass}>email</span>
          <input
            className={inputClass}
            type='email'
            value={data.email}
            onChange={(e) => update({ email: e.target.value })}
          />
        </label>
        <label className='flex flex-col gap-1'>
          <span className={labelClass}>LinkedIn URL</span>
          <input
            className={inputClass}
            value={data.linkedinUrl}
            onChange={(e) => update({ linkedinUrl: e.target.value })}
          />
        </label>
        <label className='flex flex-col gap-1'>
          <span className={labelClass}>GitHub URL</span>
          <input
            className={inputClass}
            value={data.githubUrl}
            onChange={(e) => update({ githubUrl: e.target.value })}
          />
        </label>
      </div>

      <div className='mt-4 flex items-center gap-3'>
        <button
          onClick={save}
          disabled={pending}
          className='btn-terminal hover:border-accent-green hover:text-accent-green disabled:opacity-50'
        >
          {pending ? '> menyimpan...' : '$ simpan kontak'}
        </button>
        {status && (
          <span
            className={`font-mono text-xs ${
              status.startsWith('gagal')
                ? 'text-accent-red'
                : 'text-accent-green'
            }`}
          >
            {status}
          </span>
        )}
      </div>
    </div>
  );
}

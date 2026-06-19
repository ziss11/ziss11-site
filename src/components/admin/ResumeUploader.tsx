'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { FileText } from 'lucide-react';
import { saveResumeAction } from '@/app/admin/actions';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type='submit'
      disabled={pending}
      className='btn-terminal hover:border-accent-green hover:text-accent-green disabled:opacity-50'
    >
      {pending ? '> mengunggah...' : '$ upload resume'}
    </button>
  );
}

export default function ResumeUploader({
  hasCustom,
}: {
  hasCustom: boolean;
}) {
  const [state, formAction] = useActionState(saveResumeAction, null);

  return (
    <div className='flex flex-col gap-5'>
      <h2 className='font-mono text-[1.3rem] text-text-primary'>
        Resume <span className='text-accent-yellow'>File</span>
      </h2>

      <div className='rounded-[16px] border border-accent-yellow/20 bg-[#05050a]/80 p-4 backdrop-blur-md'>
        <div className='mb-4 flex items-center gap-2 font-mono text-sm text-text-secondary'>
          <FileText size={18} className='text-accent-yellow' />
          <span>
            file aktif:{' '}
            <span className='text-text-primary'>
              {hasCustom ? 'resume hasil upload' : 'resume.pdf (default)'}
            </span>
          </span>
          <a
            href='/resume.pdf'
            target='_blank'
            rel='noopener noreferrer'
            className='ml-2 text-accent-blue hover:text-accent-green'
          >
            [lihat]
          </a>
        </div>

        <form action={formAction} className='flex flex-col gap-4'>
          <label className='flex flex-col gap-2'>
            <span className='font-mono text-xs text-text-secondary'>
              [PDF FILE]
            </span>
            <input
              type='file'
              name='resume'
              accept='application/pdf'
              className='font-mono text-sm text-text-secondary file:mr-3 file:cursor-pointer file:rounded file:border file:border-accent-green/30 file:bg-transparent file:px-3 file:py-2 file:font-mono file:text-xs file:text-accent-green hover:file:bg-bg-tertiary'
            />
          </label>

          {state?.ok && (
            <p className='font-mono text-xs text-accent-green'>
              {'>'} resume tersimpan ✓
            </p>
          )}
          {state && !state.ok && (
            <p className='font-mono text-xs text-accent-red'>
              {'>'} {state.error}
            </p>
          )}

          <SubmitButton />
        </form>
      </div>
    </div>
  );
}

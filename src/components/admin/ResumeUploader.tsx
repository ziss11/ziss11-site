'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { FileText } from 'lucide-react';
import { saveResumeAction } from '@/app/admin/actions';

const MONO: React.CSSProperties = { fontFamily: 'var(--font-mono)' };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type='submit'
      disabled={pending}
      className='az-btn'
      style={{
        alignSelf: 'flex-start',
        fontSize: 14,
        opacity: pending ? 0.6 : 1,
      }}
    >
      {pending ? 'Uploading…' : 'Upload resume'}
    </button>
  );
}

export default function ResumeUploader({ hasCustom }: { hasCustom: boolean }) {
  const [state, formAction] = useActionState(saveResumeAction, null);

  return (
    <div className='card card-pad' style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 14, color: 'var(--color-muted)' }}>
        <FileText size={18} style={{ color: 'var(--color-accent)' }} />
        <span>
          Active file:{' '}
          <span style={{ color: 'var(--color-fg)' }}>
            {hasCustom ? 'uploaded resume' : 'resume.pdf (default)'}
          </span>
        </span>
        <a
          href='/resume.pdf'
          target='_blank'
          rel='noopener noreferrer'
          style={{ ...MONO, fontSize: 12, color: 'var(--color-accent)', textDecoration: 'none', marginLeft: 4 }}
        >
          View →
        </a>
      </div>

      <form action={formAction} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
          <label style={{ ...MONO, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>
            PDF file
          </label>
          <input
            type='file'
            name='resume'
            accept='application/pdf'
            className='az-resume-input'
          />
        </div>

        {state?.ok && (
          <p style={{ ...MONO, fontSize: 12.5, color: 'var(--color-accent)', margin: 0 }}>
            Resume saved ✓
          </p>
        )}
        {state && !state.ok && (
          <p
            style={{
              ...MONO,
              fontSize: 12.5,
              color: 'var(--color-danger)',
              margin: 0,
              padding: '11px 14px',
              border: '1px solid rgba(240,97,109,0.3)',
              borderRadius: 'var(--radius-sm)',
              background: 'rgba(240,97,109,0.08)',
            }}
          >
            {state.error}
          </p>
        )}

        <SubmitButton />
      </form>
    </div>
  );
}

'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { login } from '../actions';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type='submit'
      disabled={pending}
      className='btn-terminal w-full hover:border-accent-green hover:text-accent-green disabled:opacity-50 disabled:cursor-not-allowed'
    >
      {pending ? '> authenticating...' : '> login'}
    </button>
  );
}

export default function LoginPage() {
  const [state, formAction] = useActionState(login, null);

  return (
    <main className='flex min-h-screen items-center justify-center px-4'>
      <div className='glass-strong w-full max-w-[420px] rounded-[20px] border border-accent-green/20 bg-[#05050a]/80 p-6 md:p-8 backdrop-blur-md'>
        <div className='mb-6 font-mono'>
          <div className='flex items-center gap-2 text-sm text-text-secondary'>
            <span className='text-accent-green'>$</span>
            <span>./auth --login</span>
            <span className='cursor' />
          </div>
          <h1 className='mt-3 text-[1.5rem] text-text-primary'>
            Admin <span className='text-accent-green'>Access</span>
          </h1>
          <p className='mt-1 text-xs text-text-secondary'>
            {'//'} masukkan password untuk lanjut
          </p>
        </div>

        <form action={formAction} className='flex flex-col gap-4'>
          <label className='flex flex-col gap-2'>
            <span className='font-mono text-xs text-text-secondary'>
              [PASSWORD]
            </span>
            <input
              type='password'
              name='password'
              autoFocus
              autoComplete='current-password'
              className='rounded-lg border border-accent-green/20 bg-[#05050a]/80 px-4 py-3 font-mono text-sm text-text-primary outline-none transition-all placeholder:text-text-muted focus:border-accent-green focus:shadow-[0_0_0_3px_rgba(126,231,135,0.12)]'
              placeholder='••••••••'
            />
          </label>

          {state?.error && (
            <p className='font-mono text-xs text-accent-red'>
              {'>'} {state.error}
            </p>
          )}

          <SubmitButton />
        </form>
      </div>
    </main>
  );
}

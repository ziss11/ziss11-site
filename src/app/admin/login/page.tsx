'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import Link from 'next/link';
import { login } from '../actions';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type='submit'
      disabled={pending}
      className='az-btn'
      style={{
        marginTop: 6,
        justifyContent: 'center',
        padding: 14,
        opacity: pending ? 0.6 : 1,
      }}
    >
      {pending ? 'Signing in…' : 'Sign in'}
    </button>
  );
}

export default function LoginPage() {
  const [state, formAction] = useActionState(login, null);

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 32,
        background:
          'radial-gradient(54% 50% at 50% 0%, rgba(124,138,255,0.07), transparent 70%)',
      }}
    >
      <div style={{ width: '100%', maxWidth: 420 }}>
        <Link
          href='/'
          className='az-navlink'
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            fontSize: 13.5,
            marginBottom: 42,
          }}
        >
          <svg
            width='15'
            height='15'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <line x1='19' y1='12' x2='5' y2='12' />
            <polyline points='12 19 5 12 12 5' />
          </svg>
          Back to site
        </Link>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 11,
            marginBottom: 30,
          }}
        >
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 40,
              height: 40,
              border: '1px solid var(--color-border-strong)',
              borderRadius: 'var(--radius-sm)',
              fontFamily: 'var(--font-display)',
              fontWeight: 600,
              fontSize: 17,
            }}
          >
            AZ
          </span>
          <div>
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                fontSize: 16,
                margin: 0,
                letterSpacing: '-0.01em',
              }}
            >
              Admin Console
            </p>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                letterSpacing: '0.06em',
                color: 'var(--color-faint)',
                margin: '3px 0 0',
              }}
            >
              Content management
            </p>
          </div>
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            fontSize: 34,
            letterSpacing: '-0.025em',
            lineHeight: 1.05,
            margin: '0 0 10px',
          }}
        >
          Welcome back.
        </h1>
        <p
          style={{
            fontSize: 15,
            color: 'var(--color-muted)',
            margin: '0 0 34px',
          }}
        >
          Sign in to manage your portfolio content.
        </p>

        <form
          action={formAction}
          style={{ display: 'flex', flexDirection: 'column', gap: 18 }}
        >
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: 9 }}
          >
            <label
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--color-muted)',
              }}
            >
              Password
            </label>
            <input
              type='password'
              name='password'
              autoFocus
              autoComplete='current-password'
              placeholder='••••••••'
              className='az-input'
            />
          </div>

          {state?.error && (
            <p
              style={{
                fontFamily: 'var(--font-mono)',
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
    </div>
  );
}

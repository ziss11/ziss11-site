'use client';

import { useEffect } from 'react';
import type { Project } from '@/data/content';

type LinkOption = {
  key: 'play' | 'app' | 'github';
  label: string;
  url: string;
  icon: React.ReactNode;
};

const iconProps = {
  width: 22,
  height: 22,
  viewBox: '0 0 24 24',
  fill: 'currentColor',
} as const;

const PlayIcon = () => (
  <svg {...iconProps} aria-hidden>
    <path d='M22.018 13.298l-3.919 2.218-3.515-3.493 3.543-3.521 3.891 2.202a1.49 1.49 0 0 1 0 2.594zM1.337.924a1.486 1.486 0 0 0-.112.568v21.017c0 .217.045.419.124.6l11.155-11.087L1.337.924zm12.207 10.065l3.258-3.238L3.45.195a1.466 1.466 0 0 0-.946-.179l11.04 10.973zm0 2.067l-11 10.933c.298.036.612-.016.906-.183l13.324-7.54-3.23-3.21z' />
  </svg>
);

const AppleIcon = () => (
  <svg {...iconProps} aria-hidden>
    <path d='M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.428 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701' />
  </svg>
);

const GithubIcon = () => (
  <svg {...iconProps} aria-hidden>
    <path d='M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12' />
  </svg>
);

export function projectOptions(p: Project): LinkOption[] {
  const opts: LinkOption[] = [];
  if (p.playStoreUrl)
    opts.push({ key: 'play', label: 'Google Play', url: p.playStoreUrl, icon: <PlayIcon /> });
  if (p.appStoreUrl)
    opts.push({ key: 'app', label: 'App Store', url: p.appStoreUrl, icon: <AppleIcon /> });
  if (p.githubUrl)
    opts.push({ key: 'github', label: 'GitHub', url: p.githubUrl, icon: <GithubIcon /> });
  return opts;
}

export default function ProjectLinks({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  const options = projectOptions(project);

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 90,
          background: 'rgba(0,0,0,0.55)',
          backdropFilter: 'blur(3px)',
        }}
      />
      <div
        role='dialog'
        aria-modal='true'
        aria-label={`Open ${project.title}`}
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          zIndex: 91,
          width: 'min(380px, 92vw)',
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border-strong)',
          borderRadius: 'var(--radius)',
          padding: 26,
          boxShadow: '0 24px 60px rgba(0,0,0,0.55)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: 12,
            marginBottom: 20,
          }}
        >
          <div>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--color-faint)',
                margin: '0 0 6px',
              }}
            >
              Open project
            </p>
            <h3
              style={{
                fontWeight: 600,
                fontSize: 19,
                letterSpacing: '-0.02em',
                margin: 0,
                color: 'var(--color-fg-strong)',
              }}
            >
              {project.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label='Close'
            className='az-icon-btn'
            style={{ flexShrink: 0 }}
          >
            <svg
              width='16'
              height='16'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2.2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <line x1='18' y1='6' x2='6' y2='18' />
              <line x1='6' y1='6' x2='18' y2='18' />
            </svg>
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {options.map((o) => (
            <a
              key={o.key}
              href={o.url}
              target='_blank'
              rel='noopener noreferrer'
              className='az-link-option'
            >
              <span style={{ display: 'inline-flex', color: 'var(--color-fg)' }}>
                {o.icon}
              </span>
              <span
                style={{
                  flex: 1,
                  fontSize: 15,
                  fontWeight: 500,
                  color: 'var(--color-fg-strong)',
                }}
              >
                {o.label}
              </span>
              <svg
                width='16'
                height='16'
                viewBox='0 0 24 24'
                fill='none'
                stroke='var(--color-accent)'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <line x1='7' y1='17' x2='17' y2='7' />
                <polyline points='9 7 17 7 17 15' />
              </svg>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}

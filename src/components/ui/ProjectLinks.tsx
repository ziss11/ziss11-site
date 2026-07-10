'use client';

import { useEffect } from 'react';
import type { Project } from '@/data/content';
import { Play, Github, X, ExternalLink } from 'lucide-react';

function AppleGlyph({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 384 512'
      fill='currentColor'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z' />
    </svg>
  );
}

type LinkOption = {
  key: 'play' | 'app' | 'github';
  label: string;
  url: string;
  icon: React.ReactNode;
  color: string;
};

export function projectOptions(p: Project): LinkOption[] {
  const opts: LinkOption[] = [];
  if (p.playStoreUrl)
    opts.push({ 
      key: 'play', 
      label: 'Google Play Store', 
      url: p.playStoreUrl, 
      icon: <Play size={18} fill="currentColor" />,
      color: 'rgba(16, 185, 129, 0.1)'
    });
  if (p.appStoreUrl)
    opts.push({ 
      key: 'app', 
      label: 'App Store (iOS)', 
      url: p.appStoreUrl, 
      icon: <AppleGlyph size={18} />,
      color: 'rgba(74, 127, 192, 0.1)'
    });
  if (p.githubUrl)
    opts.push({ 
      key: 'github', 
      label: 'Source Code (GitHub)', 
      url: p.githubUrl, 
      icon: <Github size={18} />,
      color: 'rgba(74, 127, 192, 0.1)'
    });
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
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 90,
          background: 'rgba(3, 3, 7, 0.65)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
        }}
      />
      
      {/* Modal Dialog */}
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
          width: 'min(420px, 92vw)',
          background: 'rgba(15, 15, 27, 0.9)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: 'var(--radius)',
          padding: '28px',
          boxShadow: '0 24px 64px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: 12,
            marginBottom: 24,
          }}
        >
          <div>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--color-accent)',
                margin: '0 0 6px',
              }}
            >
              Launch Platform
            </p>
            <h3
              style={{
                fontWeight: 700,
                fontSize: 20,
                letterSpacing: '-0.025em',
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
            style={{ 
              flexShrink: 0,
              borderRadius: '50%',
              width: 32,
              height: 32
            }}
          >
            <X size={15} />
          </button>
        </div>

        {/* Action Links */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {options.map((o) => (
            <a
              key={o.key}
              href={o.url}
              target='_blank'
              rel='noopener noreferrer'
              className='az-link-option'
              style={{
                padding: '14px 18px',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.015)',
                border: '1px solid rgba(255, 255, 255, 0.04)',
              }}
            >
              <div 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  width: 36,
                  height: 36,
                  borderRadius: '8px',
                  background: o.color,
                  color: 'var(--color-fg-strong)',
                  flexShrink: 0
                }}
              >
                {o.icon}
              </div>
              <span
                style={{
                  flex: 1,
                  fontSize: 14.5,
                  fontWeight: 600,
                  color: 'var(--color-fg-strong)',
                  marginLeft: 4,
                }}
              >
                {o.label}
              </span>
              <ExternalLink
                size={14}
                style={{
                  color: 'var(--color-muted)',
                }}
              />
            </a>
          ))}
        </div>
      </div>
    </>
  );
}

'use client';

import { useState } from 'react';
import type { Project } from '@/data/content';
import SectionKicker from './SectionKicker';
import ProjectLinks, { projectOptions } from './ProjectLinks';

function tagsOf(p: Project): string[] {
  return p.tech
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);
}

// Clean, hand-drawn system diagram — the "featured project" preview.
function ArchitectureMock() {
  const layers = [
    { label: 'Presentation', node: 'Flutter Widgets' },
    { label: 'State', node: 'BLoC / Cubit' },
    { label: 'Domain', node: 'Use Cases' },
    { label: 'Data', node: 'Repository · REST · Local DB' },
  ];
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        padding: 22,
        borderRadius: 'var(--radius-sm)',
        border: '1px solid var(--color-border)',
        background:
          'radial-gradient(120% 100% at 50% 0%, rgba(124,138,255,0.06), transparent 60%), var(--color-bg)',
      }}
      aria-hidden
    >
      <span className='eyebrow' style={{ fontSize: 10.5 }}>
        Clean Architecture
      </span>
      {layers.map((l, i) => (
        <div key={l.label}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '11px 14px',
              borderRadius: 8,
              border: '1px solid var(--color-border)',
              background: 'var(--color-surface-2)',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 12.5,
                color: 'var(--color-fg-strong)',
              }}
            >
              {l.node}
            </span>
            <span style={{ fontSize: 11, color: 'var(--color-faint)' }}>
              {l.label}
            </span>
          </div>
          {i < layers.length - 1 && (
            <div
              style={{
                width: 1,
                height: 10,
                margin: '0 auto',
                background: 'var(--color-border-strong)',
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default function Projects({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<Project | null>(null);

  const featured = projects[0];
  const rest = projects.slice(1);

  return (
    <section id='work' style={{ padding: '90px 0 0', scrollMarginTop: 80 }}>
      <div className='az-reveal'>
        <SectionKicker
          eyebrow='Selected work'
          title='Featured projects'
          description='Deployed applications impacting thousands of users across platforms.'
        />
      </div>

      <div className='bento'>
        {/* Featured */}
        {featured && (
          <button
            type='button'
            onClick={
              projectOptions(featured).length > 0
                ? () => setActive(featured)
                : undefined
            }
            className='card az-reveal span-12 feat-card tilt'
            style={{
              display: 'grid',
              gap: 0,
              textAlign: 'left',
              fontFamily: 'inherit',
              color: 'inherit',
              cursor:
                projectOptions(featured).length > 0 ? 'pointer' : 'default',
              overflow: 'hidden',
            }}
          >
            <div
              className='feat-info'
              style={{
                padding: 34,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <span className='eyebrow' style={{ color: 'var(--color-accent)' }}>
                Featured
              </span>
              <h3
                style={{
                  fontWeight: 600,
                  fontSize: 26,
                  letterSpacing: '-0.025em',
                  margin: '14px 0 0',
                  color: 'var(--color-fg-strong)',
                }}
              >
                {featured.title}
              </h3>
              <p
                style={{
                  fontSize: 15,
                  lineHeight: 1.62,
                  color: 'var(--color-muted)',
                  margin: '12px 0 0',
                }}
              >
                {featured.description}
              </p>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 7,
                  marginTop: 20,
                }}
              >
                {tagsOf(featured).map((tag) => (
                  <span key={tag} className='tech-card' style={{ padding: '6px 10px' }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div
              style={{
                padding: 22,
                borderLeft: '1px solid var(--color-border)',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <div style={{ width: '100%' }}>
                <ArchitectureMock />
              </div>
            </div>
          </button>
        )}

        {/* Rest */}
        {rest.map((proj, i) => {
          const hasLinks = projectOptions(proj).length > 0;
          const num = String(i + 2).padStart(2, '0');
          return (
            <button
              key={i}
              type='button'
              onClick={hasLinks ? () => setActive(proj) : undefined}
              className='az-card az-reveal span-4'
              style={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: 210,
                padding: 26,
                textAlign: 'left',
                fontFamily: 'inherit',
                color: 'inherit',
                cursor: hasLinks ? 'pointer' : 'default',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 18,
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 12,
                    color: 'var(--color-faint)',
                  }}
                >
                  {num}
                </span>
                <svg
                  width='16'
                  height='16'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='var(--color-faint)'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <line x1='7' y1='17' x2='17' y2='7' />
                  <polyline points='9 7 17 7 17 15' />
                </svg>
              </div>
              <h3
                style={{
                  fontWeight: 600,
                  fontSize: 18,
                  letterSpacing: '-0.02em',
                  margin: '0 0 10px',
                  color: 'var(--color-fg-strong)',
                }}
              >
                {proj.title}
              </h3>
              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.6,
                  color: 'var(--color-muted)',
                  margin: 0,
                }}
              >
                {proj.description}
              </p>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 6,
                  marginTop: 'auto',
                  paddingTop: 20,
                }}
              >
                {tagsOf(proj)
                  .slice(0, 3)
                  .map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 11,
                        color: 'var(--color-muted)',
                        border: '1px solid var(--color-border)',
                        borderRadius: 6,
                        padding: '3px 8px',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
              </div>
            </button>
          );
        })}
      </div>

      {active && (
        <ProjectLinks project={active} onClose={() => setActive(null)} />
      )}
    </section>
  );
}

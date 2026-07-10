'use client';

import { useState } from 'react';
import type { Project } from '@/data/content';
import SectionKicker from './SectionKicker';
import ProjectLinks, { projectOptions } from './ProjectLinks';
import { ArrowUpRight, Folder } from 'lucide-react';

function tagsOf(p: Project): string[] {
  return p.tech
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);
}

const ARCHITECTURE_LAYERS: {
  label: string;
  detail: string;
  color: string;
}[] = [
  { label: 'UI layer', detail: 'Components / Views', color: 'var(--color-fg-strong)' },
  { label: 'State management', detail: 'Store / Hooks / Providers', color: 'var(--color-accent-warm)' },
  { label: 'Domain layer', detail: 'Use Cases / Business Logic', color: 'var(--color-fg-strong)' },
  { label: 'Data layer', detail: 'Repositories / APIs / DB', color: 'var(--color-accent)' },
];

// Clean layered-architecture summary (presentation -> state -> domain -> data)
function ArchitectureMock() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        padding: 24,
        borderRadius: 'var(--radius)',
        border: '1px solid var(--color-border)',
        background:
          'radial-gradient(130% 100% at 50% 0%, rgba(74, 127, 192, 0.08), transparent 70%), rgba(14, 27, 46, 0.4)',
      }}
      aria-hidden
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 4,
        }}
      >
        <span className='eyebrow' style={{ fontSize: 10 }}>
          FIG. 02 — Clean System Architecture
        </span>
        <span
          style={{
            fontSize: 9,
            fontFamily: 'var(--font-mono)',
            color: 'var(--color-accent)',
            background: 'rgba(74, 127, 192, 0.1)',
            padding: '2px 6px',
            borderRadius: 4,
          }}
        >
          Layered Design
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {ARCHITECTURE_LAYERS.map((layer) => (
          <div
            key={layer.label}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 12,
              padding: '12px 16px',
              borderRadius: 8,
              background: 'rgba(255, 255, 255, 0.02)',
              border:
                layer.label === 'State management'
                  ? '1px solid rgba(217, 123, 63, 0.3)'
                  : '1px solid var(--color-border)',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                fontWeight: 600,
                color: layer.color,
                flexShrink: 0,
              }}
            >
              {layer.label}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 10,
                color: 'var(--color-muted)',
                textAlign: 'right',
              }}
            >
              {layer.detail}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Projects({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<Project | null>(null);

  const featured = projects[0];
  const rest = projects.slice(1);

  return (
    <section id='work' style={{ padding: '100px 0 0', scrollMarginTop: 80 }}>
      <div className='az-reveal'>
        <SectionKicker
          eyebrow='Portfolio'
          title='Selected projects'
          description='Production applications built with architectural integrity, shipped to App Store and Google Play.'
        />
      </div>

      <div className='bento' style={{ marginTop: 8 }}>
        {/* Featured Project */}
        {featured && (
          <button
            type='button'
            onClick={
              projectOptions(featured).length > 0
                ? () => setActive(featured)
                : undefined
            }
            className='card card-hover az-reveal span-12 feat-card'
            style={{
              display: 'grid',
              gap: 0,
              textAlign: 'left',
              fontFamily: 'inherit',
              color: 'inherit',
              cursor:
                projectOptions(featured).length > 0 ? 'pointer' : 'default',
              overflow: 'hidden',
              padding: 0,
            }}
          >
            <div
              className='feat-info'
              style={{
                padding: '36px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span className='eyebrow' style={{ color: 'var(--color-accent)' }}>
                  FIG. 03 — Featured Project
                </span>
                <span
                  style={{
                    fontSize: 10,
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--color-accent)',
                    border: '1px solid rgba(74, 127, 192, 0.3)',
                    background: 'rgba(74, 127, 192, 0.06)',
                    padding: '2px 8px',
                    borderRadius: 99,
                  }}
                >
                  {featured.category}
                </span>
              </div>
              
              <h3
                style={{
                  fontWeight: 700,
                  fontSize: 26,
                  letterSpacing: '-0.03em',
                  margin: '16px 0 0',
                  color: 'var(--color-fg-strong)',
                }}
              >
                {featured.title}
              </h3>
              
              <p
                style={{
                  fontSize: 15,
                  lineHeight: 1.65,
                  color: 'var(--color-muted)',
                  margin: '14px 0 0',
                }}
              >
                {featured.description}
              </p>

              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 8,
                  marginTop: 24,
                }}
              >
                {tagsOf(featured).map((tag) => (
                  <span key={tag} className='tech-card'>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div
              style={{
                padding: 24,
                borderLeft: '1px solid var(--color-border)',
                display: 'flex',
                alignItems: 'center',
                background: 'rgba(255, 255, 255, 0.005)',
              }}
            >
              <div style={{ width: '100%' }}>
                <ArchitectureMock />
              </div>
            </div>
          </button>
        )}

        {/* Other Projects */}
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
                minHeight: 250,
                padding: '28px',
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
                  marginBottom: 20,
                }}
              >
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 10,
                    background: 'rgba(127, 168, 214, 0.04)',
                    border: '1px solid var(--color-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-accent)',
                  }}
                >
                  <Folder size={18} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 11.5,
                      color: 'var(--color-faint)',
                    }}
                  >
                    FIG. {num}
                  </span>
                  {hasLinks && (
                    <ArrowUpRight size={15} style={{ color: 'var(--color-faint)' }} />
                  )}
                </div>
              </div>

              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10.5,
                  color: 'var(--color-accent)',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: 6,
                }}
              >
                {proj.category}
              </span>

              <h3
                style={{
                  fontWeight: 700,
                  fontSize: 18.5,
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
                  paddingTop: 24,
                }}
              >
                {tagsOf(proj)
                  .slice(0, 3)
                  .map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 10.5,
                        color: 'var(--color-muted)',
                        background: 'rgba(255, 255, 255, 0.02)',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
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

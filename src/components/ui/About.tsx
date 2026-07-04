import SectionKicker from './SectionKicker';
import { Zap, Gauge, Database, Layers } from 'lucide-react';

const FOCUS = [
  {
    title: 'Performance Engineering',
    desc: 'Profiling critical paths, optimizing memory and render cycles, and eliminating bottlenecks across the stack.',
    icon: <Zap size={16} style={{ color: 'var(--color-accent-cyan)' }} />
  },
  {
    title: 'Scalable Systems',
    desc: 'Designing APIs and services that stay fast and reliable as traffic and complexity grow.',
    icon: <Gauge size={16} style={{ color: 'var(--color-accent)' }} />
  },
  {
    title: 'Data & Sync Architecture',
    desc: 'Architecting resilient data layers — from relational schemas to offline-first sync with conflict resolution.',
    icon: <Database size={16} style={{ color: 'var(--color-accent-purple)' }} />
  },
  {
    title: 'Clean Architecture',
    desc: 'Strict layer boundaries separating UI, business logic, and data access for testable, maintainable codebases.',
    icon: <Layers size={16} style={{ color: 'var(--color-ok)' }} />
  },
];

export default function About() {
  return (
    <section id='about' style={{ padding: '100px 0 0', scrollMarginTop: 80 }}>
      <div className='az-reveal'>
        <SectionKicker eyebrow='About' title='Development principles' />
      </div>

      <div className='bento' style={{ marginTop: 8 }}>
        {/* About Paragraph Card */}
        <div 
          className='card card-pad az-reveal span-8'
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            background: 'radial-gradient(circle at top left, rgba(99,102,241,0.04), transparent 50%), var(--color-surface)',
          }}
        >
          <p
            style={{
              fontWeight: 600,
              fontSize: 'clamp(20px, 2.2vw, 26px)',
              lineHeight: 1.45,
              letterSpacing: '-0.025em',
              margin: 0,
              color: 'var(--color-muted)',
            }}
          >
            I translate complex business requirements into robust software products — obsessing over{' '}
            <span style={{ color: 'var(--color-fg-strong)' }}>native efficiency</span>,{' '}
            <span style={{ color: 'var(--color-fg-strong)' }}>frame-budget rendering</span>, and{' '}
            <span style={{ color: 'var(--color-fg-strong)' }}>offline resilience</span>.
          </p>
        </div>

        {/* Focus Areas Card List */}
        <div
          className='card card-pad az-reveal span-4'
          style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
        >
          <p className='eyebrow' style={{ margin: 0 }}>
            Core Focus Areas
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {FOCUS.map((f) => (
              <div
                key={f.title}
                style={{
                  display: 'flex',
                  gap: 12,
                  background: 'rgba(255, 255, 255, 0.01)',
                  border: '1px solid rgba(255, 255, 255, 0.03)',
                  padding: '12px 14px',
                  borderRadius: '10px',
                }}
              >
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 6,
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: 2,
                  }}
                >
                  {f.icon}
                </div>
                <div>
                  <h4
                    style={{
                      fontWeight: 700,
                      fontSize: 14,
                      color: 'var(--color-fg-strong)',
                      margin: 0,
                    }}
                  >
                    {f.title}
                  </h4>
                  <p
                    style={{
                      fontSize: 12,
                      color: 'var(--color-muted)',
                      margin: '4px 0 0',
                      lineHeight: 1.5,
                    }}
                  >
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

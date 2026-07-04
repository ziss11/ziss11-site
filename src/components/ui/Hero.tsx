import TechRadar from './TechRadar';
import { Smartphone, Sparkles, Calendar, Terminal as TermIcon, ArrowUpRight } from 'lucide-react';

const METRICS = [
  {
    value: '5+ Years',
    label: 'Shipping production software',
    icon: <Calendar size={18} style={{ color: 'var(--color-accent)' }} />,
    color: 'rgba(99, 102, 241, 0.1)'
  },
  {
    value: 'Web & Mobile',
    label: 'Full-stack platform depth',
    icon: <Smartphone size={18} style={{ color: 'var(--color-accent-cyan)' }} />,
    color: 'rgba(6, 182, 212, 0.1)'
  },
  { 
    value: '60fps UI', 
    label: 'Fluid rendering benchmark', 
    icon: <Sparkles size={18} style={{ color: 'var(--color-accent-purple)' }} />,
    color: 'rgba(168, 85, 247, 0.1)'
  },
];

export default function Hero() {
  return (
    <section id='top' style={{ padding: '72px 0 20px' }}>
      <div className='bento'>
        {/* Headline Card */}
        <div
          className='card card-pad az-reveal span-8'
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: 380,
            padding: '36px',
            position: 'relative',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <span className='eyebrow'>
              <TermIcon size={12} />
              Software Engineer
            </span>
          </div>

          {/* Core Info & Title */}
          <div style={{ margin: '32px 0 0' }}>
            <div>
              <h1
                style={{
                  fontWeight: 800,
                  fontSize: 'clamp(32px, 4.2vw, 52px)',
                  lineHeight: 1.08,
                  letterSpacing: '-0.04em',
                  margin: 0,
                  color: 'var(--color-fg-strong)',
                }}
              >
                Building software that{' '}
                <span style={{
                  background: 'linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-cyan) 50%, var(--color-accent-purple) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                  feels native
                </span>{' '}
                and ships on time.
              </h1>
              <p
                style={{
                  fontSize: 'clamp(14.5px, 1.3vw, 16px)',
                  lineHeight: 1.6,
                  color: 'var(--color-muted)',
                  maxWidth: 480,
                  margin: '20px 0 0',
                }}
              >
                I design and build high-performance software across web and mobile —
                specializing in Flutter, React, Next.js, and clean, scalable
                architecture.
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div
            style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 36 }}
          >
            <a href='#work' className='az-btn'>
              Explore Projects
              <ArrowUpRight size={15} />
            </a>
            <a href='#contact' className='az-btn-ghost'>
              Let&apos;s Talk
            </a>
          </div>
        </div>

        {/* Tech Focus Radar Card */}
        <div
          className='card card-pad az-reveal span-4 tilt'
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: 380,
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.03)',
            background: 'radial-gradient(circle at top right, rgba(99, 102, 241, 0.05), transparent 50%), var(--color-surface)',
          }}
        >
          <div>
            <p className='eyebrow' style={{ margin: 0 }}>
              Radar Chart
            </p>
            <h3
              style={{
                fontWeight: 700,
                fontSize: 16.5,
                color: 'var(--color-fg-strong)',
                margin: '10px 0 0',
                letterSpacing: '-0.02em',
              }}
            >
              Proficiency across stack
            </h3>
          </div>
          <div style={{ margin: '14px 0' }}>
            <TechRadar />
          </div>
        </div>

        {/* Dynamic Metric Strip */}
        {METRICS.map((m) => (
          <div
            key={m.label}
            className='card card-pad card-hover az-reveal span-4'
            style={{ 
              padding: '24px 26px',
              display: 'flex',
              alignItems: 'center',
              gap: 18,
              background: `radial-gradient(circle at 10% 20%, ${m.color}, transparent 45%), var(--color-surface)`
            }}
          >
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: 12,
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              {m.icon}
            </div>
            <div>
              <p
                style={{
                  fontWeight: 700,
                  fontSize: 22,
                  letterSpacing: '-0.03em',
                  margin: 0,
                  color: 'var(--color-fg-strong)',
                }}
              >
                {m.value}
              </p>
              <p
                style={{
                  fontSize: 13,
                  color: 'var(--color-muted)',
                  margin: '4px 0 0',
                  lineHeight: 1.3,
                }}
              >
                {m.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

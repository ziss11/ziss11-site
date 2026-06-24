import type { Experience as ExperienceItem } from '@/data/content';
import SectionKicker from './SectionKicker';

const sectionTitle: React.CSSProperties = {
  fontFamily: 'var(--font-display)',
  fontWeight: 600,
  fontSize: 'clamp(32px,4.6vw,56px)',
  letterSpacing: '-0.03em',
  lineHeight: 1,
  margin: '0 0 56px',
  color: 'var(--color-fg-strong)',
};

export default function Experience({
  experiences,
}: {
  experiences: ExperienceItem[];
}) {
  return (
    <section id='experience' style={{ padding: '104px 0' }}>
      <div className='az-reveal'>
        <SectionKicker num='01' label='Experience' />
        <h2 style={sectionTitle}>Career milestones</h2>
      </div>

      {experiences.map((exp, i) => (
        <div
          key={i}
          className='az-reveal exp-row'
          style={{ display: 'grid', gap: 44 }}
        >
          <div style={{ paddingTop: 2 }}>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 13,
                color: 'var(--color-accent)',
                margin: '0 0 8px',
                letterSpacing: '0.01em',
              }}
            >
              {exp.period}
            </p>
            <span
              style={{
                display: 'inline-block',
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.45)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 999,
                padding: '4px 10px',
              }}
            >
              {exp.type}
            </span>
          </div>
          <div
            style={{
              position: 'relative',
              padding: '0 0 52px 38px',
              borderLeft: '1px solid rgba(255,255,255,0.12)',
            }}
          >
            <span
              style={{
                position: 'absolute',
                left: -5,
                top: 6,
                width: 9,
                height: 9,
                borderRadius: '50%',
                background: 'var(--color-accent)',
                boxShadow: '0 0 0 4px rgba(196,242,74,0.13)',
              }}
            />
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                fontSize: 23,
                letterSpacing: '-0.02em',
                margin: 0,
                color: 'var(--color-fg)',
              }}
            >
              {exp.role}
            </h3>
            <p
              style={{
                fontSize: 15,
                color: 'rgba(255,255,255,0.6)',
                margin: '7px 0 0',
              }}
            >
              {exp.company}
            </p>
            <p
              style={{
                fontSize: 15.5,
                lineHeight: 1.68,
                color: 'rgba(255,255,255,0.55)',
                margin: '16px 0 0',
                maxWidth: 600,
              }}
            >
              {exp.desc}
            </p>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 8,
                marginTop: 18,
              }}
            >
              {exp.tech.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 12,
                    color: 'rgba(255,255,255,0.62)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: 999,
                    padding: '5px 11px',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

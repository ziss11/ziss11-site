import type { Experience as ExperienceItem } from '@/data/content';
import SectionKicker from './SectionKicker';

export default function Experience({
  experiences,
}: {
  experiences: ExperienceItem[];
}) {
  return (
    <section
      id='experience'
      style={{ padding: '90px 0 0', scrollMarginTop: 80 }}
    >
      <div className='az-reveal'>
        <SectionKicker
          eyebrow='Career'
          title='Experience'
          description='Roles where I shipped production mobile software.'
        />
      </div>

      <div className='card az-reveal' style={{ padding: '8px 0' }}>
        {experiences.map((exp, i) => (
          <div
            key={i}
            className='exp-row'
            style={{
              display: 'grid',
              gap: 28,
              padding: '26px 30px',
              borderTop:
                i === 0 ? 'none' : '1px solid var(--color-border)',
            }}
          >
            <div>
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 12.5,
                  color: 'var(--color-muted)',
                  margin: '0 0 10px',
                }}
              >
                {exp.period}
              </p>
              <span
                style={{
                  display: 'inline-block',
                  fontSize: 11,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  color: 'var(--color-faint)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 6,
                  padding: '3px 9px',
                }}
              >
                {exp.type}
              </span>
            </div>
            <div>
              <h3
                style={{
                  fontWeight: 600,
                  fontSize: 18,
                  letterSpacing: '-0.02em',
                  margin: 0,
                  color: 'var(--color-fg-strong)',
                }}
              >
                {exp.role}
              </h3>
              <p
                style={{
                  fontSize: 14.5,
                  color: 'var(--color-accent)',
                  margin: '6px 0 0',
                }}
              >
                {exp.company}
              </p>
              <p
                style={{
                  fontSize: 14.5,
                  lineHeight: 1.65,
                  color: 'var(--color-muted)',
                  margin: '14px 0 0',
                  maxWidth: 620,
                }}
              >
                {exp.desc}
              </p>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 7,
                  marginTop: 16,
                }}
              >
                {exp.tech.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 11.5,
                      color: 'var(--color-muted)',
                      border: '1px solid var(--color-border)',
                      borderRadius: 6,
                      padding: '4px 9px',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

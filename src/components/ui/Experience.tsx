import type { Experience as ExperienceItem } from '@/data/content';
import SectionKicker from './SectionKicker';
import { Calendar, Briefcase } from 'lucide-react';

export default function Experience({
  experiences,
}: {
  experiences: ExperienceItem[];
}) {
  return (
    <section
      id='experience'
      style={{ padding: '100px 0 0', scrollMarginTop: 80 }}
    >
      <div className='az-reveal'>
        <SectionKicker
          eyebrow='Career'
          title='Professional roadmap'
          description='Roles where I engineered production-grade software across web and mobile, and guided developer operations.'
        />
      </div>

      <div style={{ position: 'relative', marginTop: 12 }} className='az-reveal'>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          {experiences.map((exp, i) => {
            const isLeft = i % 2 === 0;
            const showLine = experiences.length > 1;

            const lineStyle: React.CSSProperties = {
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 2,
              borderLeft: '2px dashed rgba(255, 255, 255, 0.08)',
              zIndex: 1,
              top: i === 0 ? '24px' : '0',
              bottom: i === experiences.length - 1 ? undefined : '0',
              height: i === experiences.length - 1 ? '24px' : undefined,
            };

            return (
              <div
                key={i}
                style={{ position: 'relative' }}
                className='grid gap-4 grid-cols-1 lg:grid-cols-12'
              >
                {/* Date / Period Column */}
                <div
                  style={{
                    paddingTop: 12,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                  className={`order-1 lg:col-span-5 ${
                    isLeft
                      ? 'lg:order-1 lg:items-end lg:text-right'
                      : 'lg:order-3 lg:items-start lg:text-left'
                  }`}
                >
                  <div
                    style={{ display: 'flex', alignItems: 'center', gap: 8 }}
                    className={`lg:flex-row ${isLeft ? 'lg:flex-row-reverse' : ''}`}
                  >
                    <Calendar size={13} style={{ color: 'var(--color-muted)' }} />
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 12.5,
                        fontWeight: 600,
                        color: 'var(--color-fg-strong)',
                      }}
                    >
                      {exp.period}
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: 10,
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--color-accent-cyan)',
                      border: '1px solid rgba(6, 182, 212, 0.2)',
                      background: 'rgba(6, 182, 212, 0.04)',
                      borderRadius: 6,
                      padding: '3px 8px',
                      marginTop: 8,
                      width: 'fit-content',
                    }}
                  >
                    {exp.type}
                  </span>
                </div>

                {/* Timeline Dot Indicator (Desktop Center Column) */}
                <div
                  className='hidden lg:flex lg:col-span-2 order-2'
                  style={{
                    position: 'relative',
                    justifyContent: 'center',
                    minHeight: 50,
                  }}
                >
                  {showLine && <div style={lineStyle} />}
                  <div
                    style={{
                      position: 'absolute',
                      top: 18,
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      background: 'var(--color-bg)',
                      border: '2.5px solid var(--color-accent)',
                      boxShadow: '0 0 6px var(--color-accent)',
                      zIndex: 2,
                    }}
                  />
                </div>

                {/* Content Card Column */}
                <div
                  className={`card card-pad card-hover order-3 lg:col-span-5 ${
                    isLeft ? 'lg:order-3' : 'lg:order-1'
                  }`}
                  style={{
                    background: 'rgba(13, 13, 23, 0.4)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 8,
                        background: 'rgba(255, 255, 255, 0.02)',
                        border: '1px solid rgba(255, 255, 255, 0.06)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--color-accent-purple)',
                      }}
                    >
                      <Briefcase size={16} />
                    </div>
                    <div>
                      <h3
                        style={{
                          fontWeight: 700,
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
                          fontSize: 14,
                          fontWeight: 600,
                          color: 'var(--color-accent)',
                          margin: '2px 0 0',
                        }}
                      >
                        {exp.company}
                      </p>
                    </div>
                  </div>

                  <p
                    style={{
                      fontSize: 14,
                      lineHeight: 1.65,
                      color: 'var(--color-muted)',
                      margin: '16px 0 0',
                    }}
                  >
                    {exp.desc}
                  </p>

                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 6,
                      marginTop: 20,
                    }}
                  >
                    {exp.tech.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: 11,
                          color: 'var(--color-fg)',
                          background: 'rgba(255, 255, 255, 0.02)',
                          border: '1px solid rgba(255, 255, 255, 0.06)',
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
            );
          })}
        </div>
      </div>
    </section>
  );
}

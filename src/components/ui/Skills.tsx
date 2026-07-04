import { SKILL_GROUPS } from '@/data/content';
import SectionKicker from './SectionKicker';

export default function Skills() {
  return (
    <section id='stack' style={{ padding: '90px 0 0', scrollMarginTop: 80 }}>
      <div className='az-reveal'>
        <SectionKicker
          eyebrow='Toolkit'
          title='Tech stack'
          description='The languages, frameworks, and infrastructure I reach for.'
        />
      </div>

      <div className='bento'>
        {SKILL_GROUPS.map((group) => (
          <div
            key={group.label}
            className='card card-pad az-reveal span-4'
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 18,
              }}
            >
              <h3
                style={{
                  fontWeight: 600,
                  fontSize: 15,
                  letterSpacing: '-0.01em',
                  margin: 0,
                  color: 'var(--color-fg-strong)',
                }}
              >
                {group.label}
              </h3>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  color: 'var(--color-faint)',
                }}
              >
                {String(group.items.length).padStart(2, '0')}
              </span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {group.items.map((item) => (
                <span key={item} className='tech-card'>
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

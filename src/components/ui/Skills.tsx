import { SKILL_GROUPS } from '@/data/content';
import SectionKicker from './SectionKicker';

export default function Skills() {
  return (
    <section id='skills' style={{ padding: '104px 0' }}>
      <div className='az-reveal'>
        <SectionKicker num='03' label='Skills' />
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            fontSize: 'clamp(32px,4.6vw,56px)',
            letterSpacing: '-0.03em',
            lineHeight: 1,
            margin: '0 0 56px',
            color: 'var(--color-fg-strong)',
          }}
        >
          The toolkit
        </h2>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(210px,1fr))',
          gap: '40px 28px',
        }}
      >
        {SKILL_GROUPS.map((group) => (
          <div key={group.label} className='az-reveal'>
            <h3
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 12,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--color-accent)',
                margin: '0 0 20px',
                paddingBottom: 14,
                borderBottom: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              {group.label}
            </h3>
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: 13 }}
            >
              {group.items.map((item) => (
                <span
                  key={item}
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 16,
                    color: 'rgba(255,255,255,0.78)',
                  }}
                >
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

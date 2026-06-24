import SectionKicker from './SectionKicker';

const CHIPS = ['iOS', 'Android', 'Flutter'];

export default function About() {
  return (
    <section id='about' style={{ padding: '104px 0' }}>
      <div className='az-reveal'>
        <SectionKicker num='04' label='About' marginBottom={40} />
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 400,
            fontSize: 'clamp(26px,3.5vw,42px)',
            lineHeight: 1.32,
            letterSpacing: '-0.02em',
            margin: 0,
            maxWidth: 920,
            color: 'rgba(255,255,255,0.5)',
          }}
        >
          Senior Mobile Engineer focused on{' '}
          <span style={{ color: 'var(--color-fg-strong)' }}>
            native performance
          </span>
          , smooth{' '}
          <span style={{ color: 'var(--color-fg-strong)' }}>60&nbsp;fps UI</span>
          , and{' '}
          <span style={{ color: 'var(--color-fg-strong)' }}>offline-first</span>{' '}
          architecture — turning complex requirements into mobile products
          people actually enjoy using.
        </p>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 10,
            marginTop: 40,
          }}
        >
          {CHIPS.map((c) => (
            <span
              key={c}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 13,
                color: 'rgba(255,255,255,0.7)',
                border: '1px solid rgba(255,255,255,0.13)',
                borderRadius: 999,
                padding: '8px 15px',
              }}
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

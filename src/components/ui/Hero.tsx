const STATS = [
  { label: 'Platforms', value: 'iOS · Android' },
  { label: 'Framework', value: 'Flutter' },
  { label: 'Architecture', value: 'Clean Architecture + BLoC' },
];

export default function Hero() {
  return (
    <section
      style={{
        position: 'relative',
        padding: '188px 0 130px',
        background:
          'radial-gradient(56% 46% at 78% 4%, rgba(196,242,74,0.09), transparent 72%)',
      }}
    >
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 10,
          padding: '7px 14px 7px 12px',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 999,
          marginBottom: 46,
        }}
      >
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: 'var(--color-accent)',
            animation: 'var(--animate-az-pulse)',
          }}
        />
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            letterSpacing: '0.06em',
            color: 'rgba(255,255,255,0.7)',
          }}
        >
          Available for new opportunities
        </span>
      </div>

      <p
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 13,
          letterSpacing: '0.24em',
          textTransform: 'uppercase',
          color: 'var(--color-accent)',
          margin: '0 0 22px',
        }}
      >
        Senior Mobile Engineer
      </p>
      <h1
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 600,
          fontSize: 'clamp(54px,9.2vw,138px)',
          lineHeight: 0.92,
          letterSpacing: '-0.035em',
          margin: 0,
          color: 'var(--color-fg-strong)',
        }}
      >
        Abdul Azis
      </h1>
      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 400,
          fontSize: 'clamp(26px,4.4vw,58px)',
          lineHeight: 1.04,
          letterSpacing: '-0.025em',
          margin: '18px 0 0',
          color: 'rgba(255,255,255,0.42)',
          maxWidth: 880,
        }}
      >
        Crafting native mobile experiences that feel{' '}
        <span style={{ color: 'var(--color-fg-strong)' }}>effortless</span>.
      </h2>
      <p
        style={{
          fontSize: 'clamp(16px,1.5vw,19px)',
          lineHeight: 1.7,
          color: 'rgba(255,255,255,0.6)',
          maxWidth: 600,
          margin: '36px 0 0',
        }}
      >
        I build high-performance, offline-first apps for iOS and Android —
        specialized in Flutter, Clean Architecture, and pixel-perfect 60&nbsp;fps
        UI.
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 42 }}>
        <a href='#projects' className='az-btn'>
          View selected work
          <svg
            width='15'
            height='15'
            viewBox='0 0 24 24'
            fill='none'
            stroke='#09090a'
            strokeWidth='2.4'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <line x1='7' y1='17' x2='17' y2='7' />
            <polyline points='9 7 17 7 17 15' />
          </svg>
        </a>
        <a href='#contact' className='az-btn-ghost'>
          Get in touch
        </a>
      </div>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 48,
          marginTop: 88,
          paddingTop: 40,
          borderTop: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        {STATS.map((s) => (
          <div key={s.label}>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.4)',
                margin: '0 0 9px',
              }}
            >
              {s.label}
            </p>
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 19,
                color: 'var(--color-fg)',
                margin: 0,
                letterSpacing: '-0.01em',
              }}
            >
              {s.value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

import TechRadar from './TechRadar';

const METRICS = [
  { value: '5+', label: 'Years shipping mobile' },
  { value: 'iOS · Android', label: 'Native platforms' },
  { value: '60fps', label: 'Pixel-perfect UI' },
];

export default function Hero() {
  return (
    <section id='top' style={{ padding: '52px 0 20px' }}>
      <div className='bento'>
        {/* Headline */}
        <div
          className='card card-pad az-reveal span-8'
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: 340,
            padding: 34,
          }}
        >
          <span className='eyebrow'>Senior Mobile Engineer · Flutter</span>

          <div style={{ margin: '28px 0 0' }}>
            <h1
              style={{
                fontWeight: 600,
                fontSize: 'clamp(34px,4.6vw,58px)',
                lineHeight: 1.04,
                letterSpacing: '-0.035em',
                margin: 0,
                color: 'var(--color-fg-strong)',
              }}
            >
              Building mobile apps that
              <br />
              feel native and ship on time.
            </h1>
            <p
              style={{
                fontSize: 'clamp(15px,1.4vw,17px)',
                lineHeight: 1.6,
                color: 'var(--color-muted)',
                maxWidth: 520,
                margin: '20px 0 0',
              }}
            >
              I design and build high-performance, offline-first apps for iOS and
              Android — specialized in Flutter, Clean Architecture, and clean 60fps
              interfaces.
            </p>
          </div>

          <div
            style={{ display: 'flex', flexWrap: 'wrap', gap: 11, marginTop: 32 }}
          >
            <a href='#work' className='az-btn'>
              View work
              <svg
                width='14'
                height='14'
                viewBox='0 0 24 24'
                fill='none'
                stroke='#101012'
                strokeWidth='2.4'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <line x1='5' y1='12' x2='19' y2='12' />
                <polyline points='12 5 19 12 12 19' />
              </svg>
            </a>
            <a href='#contact' className='az-btn-ghost'>
              Get in touch
            </a>
          </div>
        </div>

        {/* Contribution graph */}
        <div
          className='card card-pad az-reveal span-4 tilt'
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: 340,
          }}
        >
          <div>
            <p className='eyebrow' style={{ margin: 0 }}>
              Tech focus
            </p>
            <p
              style={{
                fontSize: 15,
                color: 'var(--color-fg)',
                margin: '10px 0 0',
                lineHeight: 1.5,
              }}
            >
              Where the depth sits across the stack.
            </p>
          </div>
          <TechRadar />
        </div>

        {/* Metric strip */}
        {METRICS.map((m) => (
          <div
            key={m.label}
            className='card card-pad az-reveal span-4'
            style={{ padding: '22px 24px' }}
          >
            <p
              style={{
                fontWeight: 600,
                fontSize: 24,
                letterSpacing: '-0.02em',
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
                margin: '6px 0 0',
              }}
            >
              {m.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

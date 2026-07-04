import SectionKicker from './SectionKicker';

const FOCUS = ['Native performance', '60fps UI', 'Offline-first', 'Clean Architecture'];

export default function About() {
  return (
    <section id='about' style={{ padding: '90px 0 0', scrollMarginTop: 80 }}>
      <div className='az-reveal'>
        <SectionKicker eyebrow='About' title='How I work' />
      </div>

      <div className='bento'>
        <div className='card card-pad az-reveal span-8'>
          <p
            style={{
              fontWeight: 500,
              fontSize: 'clamp(20px,2.3vw,28px)',
              lineHeight: 1.45,
              letterSpacing: '-0.02em',
              margin: 0,
              color: 'var(--color-muted)',
            }}
          >
            I turn complex requirements into mobile products people actually
            enjoy using — obsessing over{' '}
            <span style={{ color: 'var(--color-fg-strong)' }}>native performance</span>,{' '}
            <span style={{ color: 'var(--color-fg-strong)' }}>smooth 60fps UI</span>, and{' '}
            <span style={{ color: 'var(--color-fg-strong)' }}>offline-first</span>{' '}
            architecture.
          </p>
        </div>

        <div
          className='card card-pad az-reveal span-4'
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <p className='eyebrow' style={{ margin: '0 0 16px' }}>
            Focus areas
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {FOCUS.map((f) => (
              <div
                key={f}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  fontSize: 14,
                  color: 'var(--color-fg)',
                }}
              >
                <span
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: '50%',
                    background: 'var(--color-accent)',
                    flexShrink: 0,
                  }}
                />
                {f}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

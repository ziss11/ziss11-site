export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        marginTop: 100,
        background: 'rgba(5, 5, 10, 0.2)',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '32px 24px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 13.5, color: 'var(--color-muted)' }}>
            © {new Date().getFullYear()} Abdul Azis
          </span>
          <div style={{ width: 1, height: 12, background: 'var(--color-border)' }} />
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: 'var(--color-ok)',
                boxShadow: '0 0 6px var(--color-ok)',
              }}
            />
            <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--color-muted)' }}>
              Operational status: Normal
            </span>
          </div>
        </div>
        
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11.5,
            color: 'var(--color-faint)',
            letterSpacing: '-0.01em',
          }}
        >
          Designed &amp; built for high-performance impact
        </span>
      </div>
    </footer>
  );
}

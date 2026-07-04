export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--color-border)',
        marginTop: 90,
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '28px 32px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
        }}
      >
        <span style={{ fontSize: 13.5, color: 'var(--color-muted)' }}>
          © {new Date().getFullYear()} Abdul Azis
        </span>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            color: 'var(--color-faint)',
          }}
        >
          Designed &amp; built for mobile-first impact
        </span>
      </div>
    </footer>
  );
}

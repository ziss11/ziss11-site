import Link from 'next/link';

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid rgba(255,255,255,0.07)',
        marginTop: 40,
      }}
    >
      <div
        style={{
          maxWidth: 1180,
          margin: '0 auto',
          padding: 32,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 14,
        }}
      >
        <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.42)' }}>
          © {new Date().getFullYear()} Abdul Azis
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
          <Link
            href='/admin'
            className='az-navlink'
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              letterSpacing: '0.08em',
              color: 'rgba(255,255,255,0.32)',
            }}
          >
            Admin
          </Link>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              letterSpacing: '0.08em',
              color: 'rgba(255,255,255,0.32)',
            }}
          >
            Designed &amp; built for mobile-first impact
          </span>
        </div>
      </div>
    </footer>
  );
}

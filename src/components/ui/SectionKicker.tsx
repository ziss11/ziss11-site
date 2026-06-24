/** The "01 — EXPERIENCE ———" eyebrow row repeated atop each section. */
export default function SectionKicker({
  num,
  label,
  marginBottom = 18,
}: {
  num: string;
  label: string;
  marginBottom?: number;
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        marginBottom,
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 12,
          letterSpacing: '0.1em',
          color: 'var(--color-accent)',
        }}
      >
        {num}
      </span>
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 12,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.5)',
        }}
      >
        {label}
      </span>
      <span
        style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.1)' }}
      />
    </div>
  );
}

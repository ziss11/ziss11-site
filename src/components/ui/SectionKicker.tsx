/** Clean section header: eyebrow + title + optional description. */
export default function SectionKicker({
  eyebrow,
  title,
  description,
  marginBottom = 32,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  marginBottom?: number;
}) {
  return (
    <div style={{ marginBottom }}>
      <p className='eyebrow' style={{ margin: '0 0 14px' }}>
        {eyebrow}
      </p>
      <h2
        style={{
          fontWeight: 600,
          fontSize: 'clamp(26px,3.4vw,40px)',
          letterSpacing: '-0.03em',
          lineHeight: 1.05,
          margin: 0,
          color: 'var(--color-fg-strong)',
        }}
      >
        {title}
      </h2>
      {description && (
        <p
          style={{
            fontSize: 16,
            lineHeight: 1.6,
            color: 'var(--color-muted)',
            margin: '14px 0 0',
            maxWidth: 560,
          }}
        >
          {description}
        </p>
      )}
    </div>
  );
}

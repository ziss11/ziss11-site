import type { Project } from '@/data/content';
import SectionKicker from './SectionKicker';

const sectionTitle: React.CSSProperties = {
  fontFamily: 'var(--font-display)',
  fontWeight: 600,
  fontSize: 'clamp(32px,4.6vw,56px)',
  letterSpacing: '-0.03em',
  lineHeight: 1,
  margin: '0 0 14px',
  color: 'var(--color-fg-strong)',
};

/** First available external link, in priority order. */
function primaryUrl(p: Project): string | undefined {
  return p.playStoreUrl || p.appStoreUrl || p.githubUrl || undefined;
}

function tagsOf(p: Project): string[] {
  return p.tech
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);
}

/** Renders the card as a link when a URL exists, else a plain div. */
function CardWrapper({
  url,
  style,
  children,
}: {
  url?: string;
  style: React.CSSProperties;
  children: React.ReactNode;
}) {
  if (url) {
    return (
      <a
        href={url}
        target='_blank'
        rel='noopener noreferrer'
        className='az-card az-reveal'
        style={style}
      >
        {children}
      </a>
    );
  }
  return (
    <div className='az-card az-reveal' style={style}>
      {children}
    </div>
  );
}

export default function Projects({ projects }: { projects: Project[] }) {
  return (
    <section id='projects' style={{ padding: '104px 0' }}>
      <div className='az-reveal'>
        <SectionKicker num='02' label='Projects' />
        <h2 style={sectionTitle}>Featured work</h2>
        <p
          style={{
            fontSize: 17,
            color: 'rgba(255,255,255,0.55)',
            margin: '0 0 52px',
            maxWidth: 560,
          }}
        >
          A showcase of deployed applications impacting thousands of users.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(330px,1fr))',
          gap: 18,
        }}
      >
        {projects.map((proj, i) => {
          const url = primaryUrl(proj);
          const num = String(i + 1).padStart(2, '0');
          const cardStyle: React.CSSProperties = {
            display: 'flex',
            flexDirection: 'column',
            minHeight: 248,
            padding: 30,
            textDecoration: 'none',
            color: 'inherit',
          };
          return (
            <CardWrapper key={i} url={url} style={cardStyle}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  marginBottom: 22,
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 13,
                    color: 'rgba(255,255,255,0.35)',
                  }}
                >
                  {num}
                </span>
                <svg
                  width='18'
                  height='18'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='rgba(255,255,255,0.32)'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <line x1='7' y1='17' x2='17' y2='7' />
                  <polyline points='9 7 17 7 17 15' />
                </svg>
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 600,
                  fontSize: 22,
                  letterSpacing: '-0.02em',
                  margin: '0 0 12px',
                  color: 'var(--color-fg)',
                }}
              >
                {proj.title}
              </h3>
              <p
                style={{
                  fontSize: 15,
                  lineHeight: 1.62,
                  color: 'rgba(255,255,255,0.55)',
                  margin: 0,
                }}
              >
                {proj.description}
              </p>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 8,
                  marginTop: 'auto',
                  paddingTop: 24,
                }}
              >
                {tagsOf(proj).map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 11.5,
                      color: 'rgba(255,255,255,0.6)',
                      border: '1px solid rgba(255,255,255,0.11)',
                      borderRadius: 999,
                      padding: '4px 10px',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </CardWrapper>
          );
        })}
      </div>
    </section>
  );
}

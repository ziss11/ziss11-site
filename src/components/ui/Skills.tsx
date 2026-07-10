import { SKILL_GROUPS } from '@/data/content';
import SectionKicker from './SectionKicker';
import { Layers, Code2, Boxes, RefreshCw, ShieldCheck, Database } from 'lucide-react';

const ICON_MAP: Record<string, React.ReactNode> = {
  'Architecture': <Layers size={18} style={{ color: 'var(--color-accent-warm)' }} />,
  'Languages': <Code2 size={18} style={{ color: 'var(--color-accent)' }} />,
  'Frameworks': <Boxes size={18} style={{ color: 'var(--color-accent)' }} />,
  'Backend & Data': <Database size={18} style={{ color: 'var(--color-accent)' }} />,
  'CI / CD': <RefreshCw size={18} style={{ color: 'var(--color-accent)' }} />,
  'Testing': <ShieldCheck size={18} style={{ color: 'var(--color-accent)' }} />,
};


const GLOW_COLOR_MAP: Record<string, string> = {
  'Architecture': 'rgba(217, 123, 63, 0.05)',
  'Languages': 'rgba(74, 127, 192, 0.04)',
  'Frameworks': 'rgba(74, 127, 192, 0.04)',
  'Backend & Data': 'rgba(74, 127, 192, 0.04)',
  'CI / CD': 'rgba(74, 127, 192, 0.04)',
  'Testing': 'rgba(74, 127, 192, 0.04)',
};

export default function Skills() {
  return (
    <section id='stack' style={{ padding: '100px 0 0', scrollMarginTop: 80 }}>
      <div className='az-reveal'>
        <SectionKicker
          eyebrow='Stack'
          title='Technical toolkit'
          description='Professional competencies spanning the entire mobile development and shipping pipeline.'
        />
      </div>

      <div className='bento' style={{ marginTop: 8 }}>
        {SKILL_GROUPS.map((group) => {
          const icon = ICON_MAP[group.label] || <Layers size={18} />;
          const glowColor = GLOW_COLOR_MAP[group.label] || 'rgba(255, 255, 255, 0.02)';
          
          return (
            <div
              key={group.label}
              className='card card-pad card-hover az-reveal span-4'
              style={{
                display: 'flex',
                flexDirection: 'column',
                background: `radial-gradient(circle at 90% 10%, ${glowColor}, transparent 50%), var(--color-surface)`,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 20,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 8,
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {icon}
                  </div>
                  <h3
                    style={{
                      fontWeight: 700,
                      fontSize: 15.5,
                      letterSpacing: '-0.015em',
                      margin: 0,
                      color: 'var(--color-fg-strong)',
                    }}
                  >
                    {group.label}
                  </h3>
                </div>
                
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 11,
                    color: 'var(--color-faint)',
                    fontWeight: 600,
                  }}
                >
                  {String(group.items.length).padStart(2, '0')}
                </span>
              </div>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 'auto' }}>
                {group.items.map((item) => (
                  <span
                    key={item}
                    className='tech-card'
                    style={{
                      // Custom hover properties set locally per category
                      transition: 'all 0.25s ease',
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// Radar / spider chart of stack proficiency. Dynamic, animated — a high-fidelity
// visual signal of where the focus sits.

type Axis = { label: string; value: number };

const AXES: Axis[] = [
  { label: 'Mobile', value: 94 },
  { label: 'Web', value: 85 },
  { label: 'Backend', value: 80 },
  { label: 'Testing', value: 78 },
  { label: 'CI/CD', value: 75 },
  { label: 'Arch', value: 92 },
];

const CX = 150;
const CY = 132;
const R = 92;
const RINGS = [0.25, 0.5, 0.75, 1];

// angle for axis i, starting at the top and going clockwise
function angle(i: number): number {
  return (-90 + (360 / AXES.length) * i) * (Math.PI / 180);
}

function point(i: number, radius: number): [number, number] {
  const a = angle(i);
  return [CX + radius * Math.cos(a), CY + radius * Math.sin(a)];
}

function polygon(scale: (i: number) => number): string {
  return AXES.map((_, i) => point(i, scale(i)).join(','))
    .join(' ');
}

export default function TechRadar() {
  const dataPts = polygon((i) => (AXES[i].value / 100) * R);

  return (
    <div>
      <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
        <svg
          viewBox='0 0 300 268'
          width='100%'
          role='img'
          aria-label='Tech stack proficiency radar'
          style={{ display: 'block' }}
        >
          <defs>
            {/* Glow filters */}
            <filter id="radar-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            
            {/* Sweep gradient */}
            <linearGradient id="radarSweepGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--color-accent-warm)" stopOpacity="0.25" />
              <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0.0" />
            </linearGradient>

            {/* Radar area gradient */}
            <radialGradient id="radarAreaGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="var(--color-accent-warm)" stopOpacity="0.1" />
            </radialGradient>
          </defs>

          {/* Radar background grid rings */}
          {RINGS.map((ring) => (
            <polygon
              key={ring}
              points={polygon(() => ring * R)}
              fill='none'
              stroke='var(--color-border-strong)'
              strokeWidth={1}
              strokeDasharray={ring < 1 ? '4 4' : 'none'}
              opacity={0.6}
            />
          ))}

          {/* Axis spokes */}
          {AXES.map((_, i) => {
            const [x, y] = point(i, R);
            return (
              <line
                key={i}
                x1={CX}
                y1={CY}
                x2={x}
                y2={y}
                stroke='var(--color-border)'
                strokeWidth={1.2}
              />
            );
          })}

          {/* Animated radar sweep beam */}
          <g style={{ transformOrigin: `${CX}px ${CY}px`, animation: 'radarSweep 8s linear infinite' }}>
            <path
              d={`M ${CX} ${CY} L ${CX} ${CY - R} A ${R} ${R} 0 0 1 ${CX + R * Math.sin(Math.PI / 4)} ${CY - R * Math.cos(Math.PI / 4)} Z`}
              fill="url(#radarSweepGrad)"
            />
            <line
              x1={CX}
              y1={CY}
              x2={CX}
              y2={CY - R}
              stroke="var(--color-accent-warm)"
              strokeWidth={1.5}
              opacity={0.8}
            />
          </g>

          {/* Data shape Proficiencies */}
          <polygon
            points={dataPts}
            fill='url(#radarAreaGrad)'
            stroke='var(--color-accent)'
            strokeWidth={2}
            strokeLinejoin='round'
            filter="url(#radar-glow)"
          />

          {/* Vertices */}
          {AXES.map((ax, i) => {
            const [x, y] = point(i, (ax.value / 100) * R);
            return (
              <g key={i}>
                <circle
                  cx={x}
                  cy={y}
                  r={5}
                  fill='var(--color-bg)'
                  stroke='var(--color-accent)'
                  strokeWidth={1.5}
                />
                <circle
                  cx={x}
                  cy={y}
                  r={2}
                  fill='var(--color-accent-warm)'
                />
              </g>
            );
          })}

          {/* Labels */}
          {AXES.map((ax, i) => {
            const [x, y] = point(i, R + 18);
            const cos = Math.cos(angle(i));
            const anchor =
              Math.abs(cos) < 0.3 ? 'middle' : cos > 0 ? 'start' : 'end';
            return (
              <text
                key={ax.label}
                x={x}
                y={y}
                textAnchor={anchor}
                dominantBaseline='middle'
                fontFamily='var(--font-mono)'
                fontSize={10}
                fontWeight={600}
                fill='var(--color-muted)'
                letterSpacing='-0.02em'
              >
                {ax.label}
              </text>
            );
          })}
        </svg>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          marginTop: 10,
          fontSize: 12,
          color: 'var(--color-muted)',
          fontFamily: 'var(--font-mono)',
          justifyContent: 'center',
        }}
      >
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: 'var(--color-accent-warm)',
            boxShadow: '0 0 8px var(--color-accent-warm)',
          }}
          className='animate-pulse'
          aria-hidden
        />
        Live engine proficiencies
      </div>
    </div>
  );
}

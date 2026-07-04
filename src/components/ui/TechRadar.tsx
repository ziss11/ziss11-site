// Radar / spider chart of stack proficiency. Static, deterministic — a compact
// visual signal of where the focus sits.

type Axis = { label: string; value: number };

const AXES: Axis[] = [
  { label: 'Flutter', value: 96 },
  { label: 'Native', value: 80 },
  { label: 'State', value: 88 },
  { label: 'Testing', value: 78 },
  { label: 'CI/CD', value: 72 },
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
      <svg
        viewBox='0 0 300 268'
        width='100%'
        role='img'
        aria-label='Tech stack proficiency radar'
        style={{ display: 'block' }}
      >
        {/* grid rings */}
        {RINGS.map((ring) => (
          <polygon
            key={ring}
            points={polygon(() => ring * R)}
            fill='none'
            stroke='var(--color-border)'
            strokeWidth={1}
          />
        ))}

        {/* axis spokes */}
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
              strokeWidth={1}
            />
          );
        })}

        {/* data shape */}
        <polygon
          points={dataPts}
          fill='rgba(124,138,255,0.16)'
          stroke='var(--color-accent)'
          strokeWidth={1.6}
          strokeLinejoin='round'
        />

        {/* vertices */}
        {AXES.map((ax, i) => {
          const [x, y] = point(i, (ax.value / 100) * R);
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={2.6}
              fill='var(--color-accent)'
            />
          );
        })}

        {/* labels */}
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
              fontSize={10.5}
              fill='var(--color-muted)'
            >
              {ax.label}
            </text>
          );
        })}
      </svg>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          marginTop: 6,
          fontSize: 12,
          color: 'var(--color-faint)',
          fontFamily: 'var(--font-mono)',
        }}
      >
        <span
          style={{
            width: 10,
            height: 10,
            borderRadius: 3,
            background: 'rgba(124,138,255,0.16)',
            border: '1px solid var(--color-accent)',
          }}
          aria-hidden
        />
        Proficiency across the stack
      </div>
    </div>
  );
}

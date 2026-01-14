'use client';

const skills = [
  // Orbit 1 - Core Mobile Frameworks
  { name: 'Flutter', color: '#58a6ff', orbit: 1 },
  { name: 'Swift', color: '#ffa657', orbit: 1 },
  { name: 'Kotlin', color: '#bc8cff', orbit: 1 },

  // Orbit 2 - State Management & Architecture
  { name: 'BLoC', color: '#7ee787', orbit: 2 },
  { name: 'GetX', color: '#58a6ff', orbit: 2 },
  { name: 'SwiftUI', color: '#ffa657', orbit: 2 },
  { name: 'Jetpack Compose', color: '#bc8cff', orbit: 2 },

  // Orbit 3 - Tools & Libraries
  { name: 'Firebase', color: '#ffa657', orbit: 3 },
  { name: 'REST API', color: '#7ee787', orbit: 3 },
  { name: 'SQLite', color: '#58a6ff', orbit: 3 },
  { name: 'Git', color: '#bc8cff', orbit: 3 },
];

export default function SkillsOrbit() {
  return (
    <div
      style={{
        position: 'relative',
        width: '600px',
        height: '600px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '0 auto',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Central Core */}
      <div
        style={{
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, #58a6ff 0%, transparent 70%)',
          boxShadow: '0 0 50px #58a6ff, 0 0 100px #58a6ff',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 10,
          border: '2px solid #58a6ff',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            letterSpacing: '2px',
            color: '#58a6ff',
            textShadow: '0 0 10px #58a6ff',
          }}
        >
          MOBILE
        </span>
      </div>

      {/* Orbit Rings */}
      {[1, 2, 3].map((ringIndex) => (
        <div
          key={ringIndex}
          style={{
            position: 'absolute',
            width: `${200 + ringIndex * 140}px`,
            height: `${200 + ringIndex * 140}px`,
            borderRadius: '50%',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            boxShadow: `0 0 20px rgba(0, 243, 255, 0.05)`,
            animation: `spin ${20 + ringIndex * 10}s linear infinite ${
              ringIndex % 2 === 0 ? 'reverse' : 'normal'
            }`,
          }}
        >
          {/* Plot Skills on Orbit */}
          {skills
            .filter((s) => s.orbit === ringIndex)
            .map((skill, i, arr) => (
              <div
                key={skill.name}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: `rotate(${i * (360 / arr.length)}deg) translate(${
                    100 + ringIndex * 70
                  }px) rotate(-${i * (360 / arr.length)}deg)`, // Distribute evenly
                  transformOrigin: 'top left',
                }}
              >
                <div
                  style={{
                    background: 'rgba(5, 5, 8, 0.8)',
                    border: `1px solid ${skill.color}`,
                    padding: '0.5rem 1rem',
                    borderRadius: '20px',
                    color: '#fff',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8rem',
                    boxShadow: `0 0 10px ${skill.color}40`,
                    whiteSpace: 'nowrap',
                    animation: `counter-spin ${
                      20 + ringIndex * 10
                    }s linear infinite ${
                      ringIndex % 2 === 0 ? 'reverse' : 'normal'
                    }`, // Keep text upright
                  }}
                >
                  {skill.name}
                </div>
              </div>
            ))}
        </div>
      ))}

      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes counter-spin {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }
      `}</style>
    </div>
  );
}

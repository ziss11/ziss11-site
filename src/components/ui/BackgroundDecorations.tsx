'use client';

export default function BackgroundDecorations() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
      }}
    >
      {/* Subtle Grain Overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0.03,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
          backgroundRepeat: 'repeat',
        }}
      />

      {/* Gradient Blobs */}
      <div
        style={{
          position: 'absolute',
          top: '-20%',
          left: '-10%',
          width: '50vw',
          height: '50vw',
          background:
            'radial-gradient(circle, rgba(112, 0, 255, 0.08) 0%, rgba(0,0,0,0) 70%)',
          filter: 'blur(60px)',
          animation: 'float 20s infinite ease-in-out',
        }}
      />

      <div
        style={{
          position: 'absolute',
          bottom: '-20%',
          right: '-10%',
          width: '60vw',
          height: '60vw',
          background:
            'radial-gradient(circle, rgba(0, 255, 255, 0.05) 0%, rgba(0,0,0,0) 70%)',
          filter: 'blur(80px)',
          animation: 'float 25s infinite ease-in-out reverse',
        }}
      />

      <style jsx>{`
        @keyframes float {
          0% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(5%, 10%);
          }
          100% {
            transform: translate(0, 0);
          }
        }
      `}</style>
    </div>
  );
}

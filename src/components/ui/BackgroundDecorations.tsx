'use client';

export default function BackgroundDecorations() {
  return (
    <div className='fixed inset-0 w-full h-full pointer-events-none -z-10 overflow-hidden'>
      {/* Subtle Grain Overlay */}
      <div className="absolute inset-0 w-full h-full opacity-[0.03] bg-repeat bg-[url('data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E')]" />

      {/* Gradient Blobs */}
      <div className='absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-[radial-gradient(circle,rgba(112,0,255,0.08)_0%,rgba(0,0,0,0)_70%)] blur-[60px] animate-float' />

      <div className='absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-[radial-gradient(circle,rgba(0,255,255,0.05)_0%,rgba(0,0,0,0)_70%)] blur-[80px] animate-float-reverse' />
    </div>
  );
}

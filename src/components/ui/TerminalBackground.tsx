'use client';

import { useEffect, useRef } from 'react';

export default function TerminalBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Matrix rain effect
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(1);

    // Characters - mix of binary, hex, and code symbols
    const chars =
      '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';

    const draw = () => {
      // Semi-transparent black for trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Green text
      ctx.fillStyle = '#7ee787';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        // Random character
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(text, x, y);

        // Reset drop randomly
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33); // ~30fps

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div
      className='fixed inset-0 overflow-hidden'
      style={{ zIndex: 0, background: '#000000', pointerEvents: 'none' }}
    >
      {/* Matrix Rain Canvas */}
      <canvas
        ref={canvasRef}
        className='absolute inset-0'
        style={{ opacity: 0.15 }}
      />

      {/* Subtle Grid Pattern */}
      <div
        className='absolute inset-0 grid-pattern'
        style={{ opacity: 0.03 }}
      />

      {/* Gradient Overlay for depth */}
      <div
        className='absolute inset-0'
        style={{
          background:
            'radial-gradient(circle at 20% 50%, rgba(126, 231, 135, 0.03) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(88, 166, 255, 0.03) 0%, transparent 50%)',
        }}
      />

      {/* Vignette */}
      <div
        className='absolute inset-0'
        style={{
          background:
            'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.4) 100%)',
        }}
      />
    </div>
  );
}

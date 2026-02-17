'use client';

import { useEffect, useRef } from 'react';

const FONT_SIZE = 14;
const CHARS =
  '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン><{}[]()=+-/*&^%$#@!;:,.?|~`';

const COLUMN_COLOR = '#7ee787'; // accent-green

interface Column {
  y: number;
  speed: number;
  length: number;
  color: string;
  chars: string[];
}

export default function TerminalBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrameId: number;
    let columns: Column[] = [];

    const initColumns = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const count = Math.floor(canvas.width / FONT_SIZE);
      columns = Array.from({ length: count }, () => {
        const length = 8 + Math.floor(Math.random() * 20);
        return {
          y: Math.floor(Math.random() * -(canvas.height / FONT_SIZE)),
          speed: 0.2 + Math.random() * 0.6,
          length,
          color: COLUMN_COLOR,
          chars: Array.from(
            { length },
            () => CHARS[Math.floor(Math.random() * CHARS.length)],
          ),
        };
      });
    };

    initColumns();
    window.addEventListener('resize', initColumns);

    // Offscreen canvas for compositing
    const offscreen = document.createElement('canvas');

    const draw = () => {
      offscreen.width = canvas.width;
      offscreen.height = canvas.height;

      // Fade previous frame on main canvas
      ctx.fillStyle = 'rgba(0,0,0,0.18)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      columns.forEach((col, i) => {
        const x = i * FONT_SIZE;
        const headY = Math.floor(col.y);

        col.chars.forEach((ch, j) => {
          const row = headY - j;
          if (row < 0 || row > canvas.height / FONT_SIZE) return;

          const alpha = j === 0 ? 1 : Math.max(0, 1 - j / col.length);

          if (j === 0) {
            // Bright white head
            ctx.fillStyle = `rgba(220,255,230,${alpha})`;
            ctx.shadowColor = col.color;
            ctx.shadowBlur = 8;
          } else {
            const hex = col.color;
            ctx.fillStyle = `rgba(${hexToRgb(hex)},${alpha * 0.85})`;
            ctx.shadowBlur = j < 3 ? 4 : 0;
            ctx.shadowColor = col.color;
          }

          ctx.font = `${FONT_SIZE}px monospace`;
          ctx.fillText(ch, x, row * FONT_SIZE);
        });

        ctx.shadowBlur = 0;

        // Randomly mutate a char in trail
        if (Math.random() > 0.92) {
          const idx = Math.floor(Math.random() * col.chars.length);
          col.chars[idx] = CHARS[Math.floor(Math.random() * CHARS.length)];
        }

        col.y += col.speed;

        // Reset when head moves off screen
        if ((col.y - col.length) * FONT_SIZE > canvas.height) {
          col.y = -col.length - Math.floor(Math.random() * 20);
          col.speed = 0.2 + Math.random() * 0.6;
          col.color = COLUMN_COLOR;
          col.chars = Array.from(
            { length: col.length },
            () => CHARS[Math.floor(Math.random() * CHARS.length)],
          );
        }
      });

      animFrameId = requestAnimationFrame(draw);
    };

    // Tiny delay so canvas is sized before first frame
    const startId = setTimeout(() => {
      draw();
    }, 50);

    return () => {
      clearTimeout(startId);
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('resize', initColumns);
    };
  }, []);

  return (
    <div className='fixed inset-0 overflow-hidden -z-10 bg-black pointer-events-none'>
      {/* Matrix Rain */}
      <canvas
        ref={canvasRef}
        className='absolute inset-0 opacity-10'
      />

      {/* Subtle grid dots */}
      <div className='absolute inset-0 grid-pattern opacity-[0.025]' />

      {/* Radial accent glows */}
      <div className='absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_10%_40%,rgba(126,231,135,0.04)_0%,transparent_70%),radial-gradient(ellipse_50%_40%_at_90%_70%,rgba(88,166,255,0.04)_0%,transparent_70%),radial-gradient(ellipse_40%_30%_at_50%_90%,rgba(188,140,255,0.03)_0%,transparent_60%)]' />

      {/* Vignette */}
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.55)_100%)]' />
    </div>
  );
}

function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}

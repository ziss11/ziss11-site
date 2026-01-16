'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function CyberpunkBackground() {
  // Generate hexagonal particles
  const [hexagons] = useState(() =>
    Array.from({ length: 20 }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 30 + 20,
      duration: Math.random() * 10 + 15,
      delay: Math.random() * 5,
    }))
  );

  return (
    <div className='fixed inset-0 -z-10 overflow-hidden bg-[#0a0a0f]'>
      {/* Perspective Grid */}
      <div className='absolute inset-0 [perspective:1000px]'>
        <motion.div
          className='absolute inset-0 cyber-grid opacity-20 [transform-style:preserve-3d]'
          style={{
            transform: 'rotateX(60deg) translateZ(-200px)',
            transformOrigin: 'center bottom',
          }}
          animate={{
            backgroundPosition: ['0px 0px', '50px 50px'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      {/* Floating Hexagons */}
      {hexagons.map((hex, i) => (
        <motion.div
          key={i}
          className='absolute'
          style={{
            left: `${hex.x}%`,
            top: `${hex.y}%`,
            width: hex.size,
            height: hex.size,
          }}
          animate={{
            y: [0, -50, 0],
            rotate: [0, 360],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: hex.duration,
            repeat: Infinity,
            delay: hex.delay,
            ease: 'easeInOut',
          }}
        >
          <svg
            viewBox='0 0 100 100'
            className='w-full h-full'
          >
            <polygon
              points='50 1 95 25 95 75 50 99 5 75 5 25'
              fill='none'
              stroke={
                i % 3 === 0 ? '#00fff9' : i % 3 === 1 ? '#ff006e' : '#8b00ff'
              }
              strokeWidth='1'
              className='drop-shadow-[0_0_5px_currentColor]'
              style={{
                color:
                  i % 3 === 0 ? '#00fff9' : i % 3 === 1 ? '#ff006e' : '#8b00ff',
              }}
            />
          </svg>
        </motion.div>
      ))}

      {/* Neon Orbs */}
      <motion.div
        className='absolute w-96 h-96 rounded-full blur-3xl bg-[radial-gradient(circle,rgba(0,255,249,0.15)_0%,transparent_70%)] left-[10%] top-[20%]'
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className='absolute w-80 h-80 rounded-full blur-3xl bg-[radial-gradient(circle,rgba(255,0,110,0.15)_0%,transparent_70%)] right-[10%] bottom-[20%]'
        animate={{
          x: [0, -100, 0],
          y: [0, 50, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />

      <motion.div
        className='absolute w-72 h-72 rounded-full blur-3xl bg-[radial-gradient(circle,rgba(139,0,255,0.15)_0%,transparent_70%)] left-1/2 top-1/2'
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />

      {/* Scanlines */}
      <div className='scanline' />

      {/* Horizontal Scanline Effect */}
      <div className='absolute inset-0 pointer-events-none opacity-5 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,255,249,0.1)_2px,rgba(0,255,249,0.1)_4px)]' />

      {/* Neon Lines */}
      <svg className='absolute inset-0 w-full h-full opacity-30'>
        <defs>
          <linearGradient
            id='neonGradient1'
            x1='0%'
            y1='0%'
            x2='100%'
            y2='0%'
          >
            <stop
              offset='0%'
              stopColor='#00fff9'
              stopOpacity='0'
            />
            <stop
              offset='50%'
              stopColor='#00fff9'
              stopOpacity='0.8'
            />
            <stop
              offset='100%'
              stopColor='#00fff9'
              stopOpacity='0'
            />
          </linearGradient>
          <linearGradient
            id='neonGradient2'
            x1='0%'
            y1='0%'
            x2='100%'
            y2='0%'
          >
            <stop
              offset='0%'
              stopColor='#ff006e'
              stopOpacity='0'
            />
            <stop
              offset='50%'
              stopColor='#ff006e'
              stopOpacity='0.8'
            />
            <stop
              offset='100%'
              stopColor='#ff006e'
              stopOpacity='0'
            />
          </linearGradient>
        </defs>

        <motion.line
          x1='0'
          y1='30%'
          x2='100%'
          y2='30%'
          stroke='url(#neonGradient1)'
          strokeWidth='2'
          animate={{
            y1: ['30%', '35%', '30%'],
            y2: ['30%', '35%', '30%'],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <motion.line
          x1='0'
          y1='70%'
          x2='100%'
          y2='70%'
          stroke='url(#neonGradient2)'
          strokeWidth='2'
          animate={{
            y1: ['70%', '65%', '70%'],
            y2: ['70%', '65%', '70%'],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
      </svg>

      {/* Dark Gradient Overlay */}
      <div className='absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0f]/50 to-[#0a0a0f]/90 pointer-events-none' />
    </div>
  );
}

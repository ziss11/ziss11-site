'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function HeroBackground() {
  // Generate stable random values using useState
  const [particles] = useState(() =>
    Array.from({ length: 30 }).map((_, i) => ({
      width: Math.random() * 4 + 2,
      height: Math.random() * 4 + 2,
      left: Math.random() * 100,
      top: Math.random() * 100,
      color: i % 2 === 0 ? '#4d4dff' : '#bc13fe',
      shadowSize: Math.random() * 10 + 5,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
    }))
  );

  return (
    <div className='absolute inset-0 -z-10 overflow-hidden'>
      {/* Animated Gradient Background */}
      <div className='absolute inset-0 bg-gradient-to-br from-[#020204] via-[#0a0a1f] to-[#020204]'>
        <motion.div
          className='absolute inset-0 opacity-30'
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, rgba(77, 77, 255, 0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 50%, rgba(188, 19, 254, 0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 80%, rgba(77, 77, 255, 0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 50%, rgba(77, 77, 255, 0.15) 0%, transparent 50%)',
            ],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      {/* Floating Particles */}
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className='absolute rounded-full'
          style={{
            width: particle.width,
            height: particle.height,
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            background: particle.color,
            boxShadow: `0 0 ${particle.shadowSize}px ${particle.color}`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Geometric Shapes */}
      <motion.div
        className='absolute left-[10%] top-[20%] h-32 w-32 rounded-lg border border-blue-500/20 bg-blue-500/5 backdrop-blur-sm'
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      <motion.div
        className='absolute right-[15%] top-[30%] h-24 w-24 rounded-full border border-purple-500/20 bg-purple-500/5 backdrop-blur-sm'
        animate={{
          y: [0, -20, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className='absolute bottom-[25%] left-[20%] h-20 w-20 rotate-45 border border-cyan-500/20 bg-cyan-500/5 backdrop-blur-sm'
        animate={{
          rotate: [45, 405],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Grid Pattern */}
      <div className='absolute inset-0 opacity-10 bg-[size:50px_50px] bg-[linear-gradient(rgba(77,77,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(77,77,255,0.1)_1px,transparent_1px)]' />

      {/* Glowing Orbs */}
      <motion.div
        className='absolute right-[10%] bottom-[30%] h-40 w-40 rounded-full blur-3xl bg-[radial-gradient(circle,rgba(77,77,255,0.3)_0%,transparent_70%)]'
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className='absolute left-[15%] bottom-[20%] h-32 w-32 rounded-full blur-3xl bg-[radial-gradient(circle,rgba(188,19,254,0.3)_0%,transparent_70%)]'
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />

      {/* Scanline Effect */}
      <motion.div
        className='absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent'
        animate={{
          top: ['0%', '100%'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  );
}

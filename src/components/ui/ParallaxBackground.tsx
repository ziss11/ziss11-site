'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function ParallaxBackground() {
  // Generate stable random particles
  const [particles] = useState(() =>
    Array.from({ length: 50 }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
      animateX: Math.random() * 100 - 50,
      animateY: Math.random() * 100 - 50,
    }))
  );

  return (
    <div className='fixed inset-0 z-0 overflow-hidden bg-[#020204]'>
      {/* Animated Gradient Mesh */}
      <motion.div
        className='absolute inset-0'
        animate={{
          background: [
            'radial-gradient(circle at 0% 0%, rgba(77, 77, 255, 0.15) 0%, transparent 50%), radial-gradient(circle at 100% 100%, rgba(188, 19, 254, 0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 100% 0%, rgba(188, 19, 254, 0.15) 0%, transparent 50%), radial-gradient(circle at 0% 100%, rgba(77, 77, 255, 0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 50% 50%, rgba(77, 77, 255, 0.15) 0%, transparent 50%), radial-gradient(circle at 50% 50%, rgba(188, 19, 254, 0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 0% 0%, rgba(77, 77, 255, 0.15) 0%, transparent 50%), radial-gradient(circle at 100% 100%, rgba(188, 19, 254, 0.15) 0%, transparent 50%)',
          ],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Flowing Particles */}
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className='absolute rounded-full'
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            background:
              i % 3 === 0 ? '#4d4dff' : i % 3 === 1 ? '#bc13fe' : '#00f3ff',
            boxShadow: `0 0 ${particle.size * 3}px ${
              i % 3 === 0 ? '#4d4dff' : i % 3 === 1 ? '#bc13fe' : '#00f3ff'
            }`,
          }}
          animate={{
            x: [0, particle.animateX, 0],
            y: [0, particle.animateY, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Animated Wave Lines */}
      <svg className='absolute inset-0 w-full h-full opacity-20'>
        <defs>
          <linearGradient
            id='waveGradient1'
            x1='0%'
            y1='0%'
            x2='100%'
            y2='0%'
          >
            <stop
              offset='0%'
              stopColor='#4d4dff'
              stopOpacity='0.5'
            />
            <stop
              offset='50%'
              stopColor='#bc13fe'
              stopOpacity='0.5'
            />
            <stop
              offset='100%'
              stopColor='#4d4dff'
              stopOpacity='0.5'
            />
          </linearGradient>
        </defs>

        <motion.path
          d='M0,100 Q250,50 500,100 T1000,100 T1500,100 T2000,100'
          stroke='url(#waveGradient1)'
          strokeWidth='2'
          fill='none'
          animate={{
            d: [
              'M0,100 Q250,50 500,100 T1000,100 T1500,100 T2000,100',
              'M0,100 Q250,150 500,100 T1000,100 T1500,100 T2000,100',
              'M0,100 Q250,50 500,100 T1000,100 T1500,100 T2000,100',
            ],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <motion.path
          d='M0,300 Q250,250 500,300 T1000,300 T1500,300 T2000,300'
          stroke='url(#waveGradient1)'
          strokeWidth='2'
          fill='none'
          animate={{
            d: [
              'M0,300 Q250,250 500,300 T1000,300 T1500,300 T2000,300',
              'M0,300 Q250,350 500,300 T1000,300 T1500,300 T2000,300',
              'M0,300 Q250,250 500,300 T1000,300 T1500,300 T2000,300',
            ],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
      </svg>

      {/* Rotating Gradient Orbs */}
      <motion.div
        className='absolute w-96 h-96 rounded-full blur-3xl'
        style={{
          background:
            'radial-gradient(circle, rgba(77, 77, 255, 0.2) 0%, transparent 70%)',
          left: '10%',
          top: '20%',
        }}
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className='absolute w-80 h-80 rounded-full blur-3xl'
        style={{
          background:
            'radial-gradient(circle, rgba(188, 19, 254, 0.2) 0%, transparent 70%)',
          right: '10%',
          bottom: '20%',
        }}
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

      {/* Grid Pattern with Animation */}
      <motion.div
        className='absolute inset-0 opacity-10'
        style={{
          backgroundImage: `
            linear-gradient(rgba(77, 77, 255, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(77, 77, 255, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
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

      {/* Floating Geometric Shapes */}
      <motion.div
        className='absolute left-[15%] top-[30%] w-20 h-20 border border-blue-500/30 rounded-lg'
        animate={{
          rotate: [0, 360],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      <motion.div
        className='absolute right-[20%] top-[40%] w-16 h-16 border border-purple-500/30 rounded-full'
        animate={{
          rotate: [360, 0],
          x: [0, 30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Scanline Effect */}
      <motion.div
        className='absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent'
        animate={{
          top: ['0%', '100%'],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Dark Overlay for Readability */}
      <div className='absolute inset-0 bg-gradient-to-b from-transparent via-[#020204]/50 to-[#020204]/80' />
    </div>
  );
}

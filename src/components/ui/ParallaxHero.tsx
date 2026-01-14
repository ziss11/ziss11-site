'use client';

import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Code, Layers, Smartphone } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function ParallaxHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Detect touch device - using useMemo to avoid setState in useEffect
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check on mount only
    const checkTouch = () => {
      setIsTouchDevice(
        'ontouchstart' in window || navigator.maxTouchPoints > 0
      );
    };
    checkTouch();
  }, []);

  // Parallax speeds - reduced on touch devices
  const bgSpeed = isTouchDevice ? 0.05 : 0.2;
  const midSpeed = isTouchDevice ? 0.1 : 0.5;

  // Layer 1: Background (slowest)
  const bgY = useTransform(
    scrollYProgress,
    [0, 1],
    ['0%', `${bgSpeed * 100}%`]
  );
  const bgYSpring = useSpring(bgY, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Layer 2: Midground (medium speed)
  const midY = useTransform(
    scrollYProgress,
    [0, 1],
    ['0%', `${midSpeed * 100}%`]
  );
  const midYSpring = useSpring(midY, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Opacity fade for layers
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);

  return (
    <div
      ref={containerRef}
      className='relative h-screen w-full overflow-hidden bg-[#020204]'
    >
      {/* Layer 1: Background Pattern */}
      <motion.div
        style={{ y: bgYSpring, opacity }}
        className='absolute inset-0 z-0'
      >
        <div className='absolute inset-0 opacity-20 blur-sm'>
          {/* Circuit/Code Pattern */}
          <div
            className='h-full w-full'
            style={{
              backgroundImage: `
                linear-gradient(90deg, rgba(77, 77, 255, 0.1) 1px, transparent 1px),
                linear-gradient(rgba(77, 77, 255, 0.1) 1px, transparent 1px),
                linear-gradient(45deg, rgba(188, 19, 254, 0.05) 25%, transparent 25%),
                linear-gradient(-45deg, rgba(188, 19, 254, 0.05) 25%, transparent 25%)
              `,
              backgroundSize: '50px 50px, 50px 50px, 100px 100px, 100px 100px',
              backgroundPosition: '0 0, 0 0, 0 0, 50px 50px',
            }}
          />
          {/* Code symbols scattered */}
          <div className='absolute inset-0 flex flex-wrap gap-20 p-10 opacity-30'>
            {Array.from({ length: 15 }).map((_, i) => (
              <Code
                key={i}
                size={24}
                className='text-blue-500'
                style={{
                  transform: `rotate(${i * 15}deg)`,
                  opacity: 0.3,
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Layer 2: Midground - Floating UI Elements */}
      <motion.div
        style={{ y: midYSpring, opacity }}
        className='absolute inset-0 z-10 flex items-center justify-center'
      >
        <div className='relative h-full w-full max-w-6xl'>
          {/* Floating Smartphone Icons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
            className='absolute left-[10%] top-[20%]'
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <div className='rounded-2xl border border-blue-500/30 bg-blue-500/5 p-4 backdrop-blur-sm'>
              <Smartphone
                size={48}
                className='text-blue-400'
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, type: 'spring', stiffness: 100 }}
            className='absolute right-[15%] top-[30%]'
            whileHover={{ scale: 1.1, rotate: -5 }}
          >
            <div className='rounded-2xl border border-purple-500/30 bg-purple-500/5 p-4 backdrop-blur-sm'>
              <Layers
                size={48}
                className='text-purple-400'
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, type: 'spring', stiffness: 100 }}
            className='absolute bottom-[25%] left-[20%]'
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <div className='rounded-2xl border border-cyan-500/30 bg-cyan-500/5 p-4 backdrop-blur-sm'>
              <Code
                size={48}
                className='text-cyan-400'
              />
            </div>
          </motion.div>

          {/* Additional floating elements */}
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className='absolute right-[25%] bottom-[35%]'
          >
            <div className='h-16 w-16 rounded-lg border border-blue-400/20 bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm' />
          </motion.div>

          <motion.div
            animate={{
              y: [0, 20, 0],
              rotate: [0, -5, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1,
            }}
            className='absolute left-[15%] bottom-[40%]'
          >
            <div className='h-12 w-12 rounded-full border border-purple-400/20 bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm' />
          </motion.div>
        </div>
      </motion.div>

      {/* Layer 3: Main Content (normal scroll speed) */}
      <div className='relative z-20 flex h-full items-center justify-center px-6'>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: 'spring',
            stiffness: 100,
            damping: 20,
            delay: 0.3,
          }}
          className='text-center'
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 100 }}
            className='mb-6 inline-block rounded-full border border-blue-500/30 bg-blue-500/10 px-6 py-2 backdrop-blur-sm'
          >
            <span className='text-sm font-semibold text-blue-400'>
              Performance Obsessed
            </span>
          </motion.div>

          <h1 className='mb-6 text-6xl font-bold leading-tight text-white md:text-7xl lg:text-8xl'>
            Mobile Engineer
            <br />
            <span className='bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent'>
              Portfolio
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className='mx-auto max-w-2xl text-lg text-gray-400 md:text-xl'
          >
            Crafting native-quality experiences across iOS, Android, and Web.
            Specialized in high-performance architecture and seamless UX.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, type: 'spring', stiffness: 100 }}
            className='mt-10 flex flex-wrap items-center justify-center gap-6'
          >
            <div className='flex items-center gap-2 text-gray-300'>
              <Smartphone
                size={20}
                className='text-purple-400'
              />
              <span>iOS & Android</span>
            </div>
            <div className='flex items-center gap-2 text-gray-300'>
              <Layers
                size={20}
                className='text-blue-400'
              />
              <span>Clean Architecture</span>
            </div>
            <div className='flex items-center gap-2 text-gray-300'>
              <Code
                size={20}
                className='text-cyan-400'
              />
              <span>60fps Performance</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Gradient Overlay for depth */}
      <div className='pointer-events-none absolute inset-0 z-30 bg-gradient-to-b from-transparent via-transparent to-[#020204]/80' />
    </div>
  );
}

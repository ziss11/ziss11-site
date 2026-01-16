'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5 },
  },
};

export default function Hero() {
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className='relative h-screen flex flex-col justify-center px-[10%] max-w-[1200px] mx-auto overflow-hidden'>
      <motion.div
        variants={containerVariants}
        initial='hidden'
        animate='visible'
      >
        {/* Logo */}
        <motion.div
          variants={itemVariants}
          className='mb-8'
        >
          <div className='w-20 h-20 relative rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(126,231,135,0.3)] border border-accent-green/20'>
            <Image
              src='/logo.png'
              alt='Logo'
              fill
              className='object-cover'
              priority
            />
          </div>
        </motion.div>

        {/* Main Title with Terminal Prompt */}
        <motion.div variants={itemVariants}>
          <h1 className='text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.3] mb-6 text-text-primary font-mono'>
            <span className='text-accent-green'>$</span>{' '}
            <span className='text-accent-purple'>const</span>{' '}
            <span className='text-accent-blue'>mobileEngineer</span> ={' '}
            <span className='text-accent-yellow'>&quot;</span>
            <span className='text-accent-green'>
              Crafting Native Mobile Experiences
            </span>
            <span className='text-accent-yellow'>&quot;</span>
            {showCursor && (
              <span className='inline-block w-[3px] h-[1.2em] bg-accent-green ml-1 align-text-bottom' />
            )}
          </h1>
        </motion.div>

        {/* Description */}
        <motion.div variants={itemVariants}>
          <p className='max-w-[700px] leading-[1.8] text-text-secondary text-[1rem] mb-10 font-mono'>
            <span className='text-text-muted'>{'/* '}</span>
            Specialized in building high-performance native mobile apps for{' '}
            <span className='text-accent-blue'>iOS</span> and{' '}
            <span className='text-accent-green'>Android</span>. Expert in{' '}
            <span className='text-accent-purple'>Flutter</span>,{' '}
            <span className='text-accent-yellow'>Clean Architecture</span>, and
            delivering pixel-perfect UIs with smooth{' '}
            <span className='text-accent-yellow'>60fps</span> performance.
            <span className='text-text-muted'>{' */'}</span>
          </p>
        </motion.div>

        {/* Tech Stack List */}
        <motion.div variants={itemVariants}>
          <ul className='text-[0.95rem] font-mono'>
            <li className='mb-2 text-text-secondary'>
              <span className='text-accent-blue'>platforms</span>:{' '}
              <span className='text-accent-green'>
                [&apos;iOS&apos;, &apos;Android&apos;]
              </span>
            </li>
            <li className='mb-2 text-text-secondary'>
              <span className='text-accent-blue'>framework</span>:{' '}
              <span className='text-accent-green'>&apos;Flutter&apos;</span>
            </li>
            <li className='mb-2 text-text-secondary'>
              <span className='text-accent-blue'>architecture</span>:{' '}
              <span className='text-accent-green'>
                &apos;Clean Architecture + BLoC&apos;
              </span>
            </li>
          </ul>
        </motion.div>
      </motion.div>
    </section>
  );
}

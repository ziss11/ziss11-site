'use client';

import { motion } from 'framer-motion';
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
    transition: { duration: 0.5, ease: 'easeOut' },
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
    <section
      style={{
        position: 'relative',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 10%',
        maxWidth: '1200px',
        margin: '0 auto',
        overflow: 'hidden',
      }}
    >
      <motion.div
        variants={containerVariants}
        initial='hidden'
        animate='visible'
      >
        {/* Terminal Comment */}
        <motion.div
          variants={itemVariants}
          style={{ marginBottom: '1rem' }}
        >
          <span style={{ color: '#8b949e', fontStyle: 'italic' }}>
            // Senior Mobile Engineer
          </span>
        </motion.div>

        {/* Main Title with Terminal Prompt */}
        <motion.div variants={itemVariants}>
          <h1
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 600,
              lineHeight: 1.3,
              marginBottom: '1.5rem',
              color: '#c9d1d9',
              fontFamily: 'var(--font-mono)',
            }}
          >
            <span style={{ color: '#7ee787' }}>$</span>{' '}
            <span style={{ color: '#bc8cff' }}>const</span>{' '}
            <span style={{ color: '#58a6ff' }}>mobileEngineer</span> ={' '}
            <span style={{ color: '#ffa657' }}>"</span>
            <span style={{ color: '#7ee787' }}>
              Crafting Native Mobile Experiences
            </span>
            <span style={{ color: '#ffa657' }}>"</span>
            {showCursor && (
              <span
                style={{
                  display: 'inline-block',
                  width: '3px',
                  height: '1.2em',
                  background: '#7ee787',
                  marginLeft: '4px',
                  verticalAlign: 'text-bottom',
                }}
              />
            )}
          </h1>
        </motion.div>

        {/* Description */}
        <motion.div variants={itemVariants}>
          <p
            style={{
              maxWidth: '700px',
              lineHeight: 1.8,
              color: '#8b949e',
              fontSize: '1rem',
              marginBottom: '2.5rem',
              fontFamily: 'var(--font-mono)',
            }}
          >
            <span style={{ color: '#6e7681' }}>{'/* '}</span>
            Specialized in building high-performance native mobile apps for{' '}
            <span style={{ color: '#58a6ff' }}>iOS</span> and{' '}
            <span style={{ color: '#7ee787' }}>Android</span>. Expert in{' '}
            <span style={{ color: '#bc8cff' }}>Flutter</span>,{' '}
            <span style={{ color: '#ffa657' }}>Clean Architecture</span>, and
            delivering pixel-perfect UIs with smooth{' '}
            <span style={{ color: '#ffa657' }}>60fps</span> performance.
            <span style={{ color: '#6e7681' }}>{' */'}</span>
          </p>
        </motion.div>

        {/* Tech Stack List */}
        <motion.div variants={itemVariants}>
          <ul
            className='terminal-list'
            style={{ fontSize: '0.95rem' }}
          >
            <li style={{ marginBottom: '0.5rem', color: '#8b949e' }}>
              <span style={{ color: '#58a6ff' }}>platforms</span>:{' '}
              <span style={{ color: '#7ee787' }}>['iOS', 'Android']</span>
            </li>
            <li style={{ marginBottom: '0.5rem', color: '#8b949e' }}>
              <span style={{ color: '#58a6ff' }}>framework</span>:{' '}
              <span style={{ color: '#7ee787' }}>'Flutter'</span>
            </li>
            <li style={{ marginBottom: '0.5rem', color: '#8b949e' }}>
              <span style={{ color: '#58a6ff' }}>architecture</span>:{' '}
              <span style={{ color: '#7ee787' }}>
                'Clean Architecture + BLoC'
              </span>
            </li>
          </ul>
        </motion.div>
      </motion.div>
    </section>
  );
}

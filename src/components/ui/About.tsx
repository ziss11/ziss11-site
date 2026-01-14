'use client';

import { motion } from 'framer-motion';

export default function About() {
  return (
    <section
      style={{
        position: 'relative',
        zIndex: 1,
        padding: '6rem 10%',
      }}
    >
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        {/* Visual Title - Matched to other sections */}
        <h2
          style={{
            fontSize: '2.5rem',
            textAlign: 'center',
            marginBottom: '4rem',
            color: 'white',
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
          }}
        >
          About <span style={{ color: '#7ee787' }}>Me</span>
        </h2>

        {/* Glass Panel - Unified Design */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          style={{
            padding: '3rem',
            background: 'rgba(5, 5, 10, 0.8)',
            border: '1px solid rgba(126, 231, 135, 0.2)',
            borderRadius: '24px',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.4)',
            fontFamily: 'var(--font-mono)',
          }}
        >
          {/* Internal Content - Clean List */}
          <div
            style={{
              fontSize: '1.1rem',
              color: '#c9d1d9',
              lineHeight: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            <div
              style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}
            >
              <span
                style={{ color: '#7ee787', fontWeight: 600, minWidth: '80px' }}
              >
                [USER]
              </span>
              <span>ziss11</span>
            </div>

            <div
              style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}
            >
              <span
                style={{ color: '#7ee787', fontWeight: 600, minWidth: '80px' }}
              >
                [ROLE]
              </span>
              <span>Senior Mobile Engineer</span>
            </div>

            <div
              style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}
            >
              <span
                style={{ color: '#7ee787', fontWeight: 600, minWidth: '80px' }}
              >
                [SPECS]
              </span>
              <span>iOS • Android • Flutter</span>
            </div>

            <div
              style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}
            >
              <span
                style={{ color: '#7ee787', fontWeight: 600, minWidth: '80px' }}
              >
                [FOCUS]
              </span>
              <span>Native Performance, 60fps UI, Offline-First</span>
            </div>

            <div
              style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}
            >
              <span
                style={{ color: '#7ee787', fontWeight: 600, minWidth: '80px' }}
              >
                [STATUS]
              </span>
              <span>Building production-ready apps...</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

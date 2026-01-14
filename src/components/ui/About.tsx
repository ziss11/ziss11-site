'use client';

import { motion } from 'framer-motion';
import SkillsOrbit from './SkillsOrbit';

export default function About() {
  return (
    <section
      style={{
        position: 'relative',
        zIndex: 1,
        padding: '8rem 10%',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Terminal Panel with Glassmorphism */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className='glass-strong'
          style={{
            padding: '3rem 2rem 2rem 2rem',
            marginBottom: '4rem',
            borderRadius: '12px',
            position: 'relative',
          }}
        >
          {/* Terminal Header Dots */}
          <div
            style={{
              position: 'absolute',
              top: '10px',
              left: '12px',
              display: 'flex',
              gap: '6px',
            }}
          >
            <div
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: '#f85149',
              }}
            />
            <div
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: '#ffa657',
              }}
            />
            <div
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: '#7ee787',
              }}
            />
          </div>

          {/* Content */}
          <div style={{ marginTop: '1rem' }}>
            <h2
              style={{
                fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                marginBottom: '1.5rem',
                color: '#c9d1d9',
                fontFamily: 'var(--font-mono)',
                fontWeight: 600,
              }}
            >
              <span style={{ color: '#6e7681' }}>{'// '}</span>
              <span style={{ color: '#58a6ff' }}>About Me</span>
            </h2>

            <div
              style={{
                fontSize: '1rem',
                color: '#8b949e',
                lineHeight: 1.8,
                fontFamily: 'var(--font-mono)',
              }}
            >
              <p style={{ marginBottom: '1rem' }}>
                <span style={{ color: '#bc8cff' }}>const</span>{' '}
                <span style={{ color: '#58a6ff' }}>profile</span> = {'{'}
                <br />
                <span style={{ paddingLeft: '2rem', display: 'block' }}>
                  <span style={{ color: '#58a6ff' }}>role</span>:{' '}
                  <span style={{ color: '#ffa657' }}>
                    'Senior Mobile Engineer'
                  </span>
                  ,
                </span>
                <span style={{ paddingLeft: '2rem', display: 'block' }}>
                  <span style={{ color: '#58a6ff' }}>specialization</span>:{' '}
                  <span style={{ color: '#7ee787' }}>[</span>
                  <span style={{ color: '#ffa657' }}>'iOS'</span>,{' '}
                  <span style={{ color: '#ffa657' }}>'Android'</span>,{' '}
                  <span style={{ color: '#ffa657' }}>'Flutter'</span>
                  <span style={{ color: '#7ee787' }}>]</span>,
                </span>
                <span style={{ paddingLeft: '2rem', display: 'block' }}>
                  <span style={{ color: '#58a6ff' }}>expertise</span>:{' '}
                  <span style={{ color: '#7ee787' }}>[</span>
                  <span style={{ color: '#ffa657' }}>'Native Development'</span>
                  , <span style={{ color: '#ffa657' }}>'State Management'</span>
                  ,{' '}
                  <span style={{ color: '#ffa657' }}>
                    'Performance Optimization'
                  </span>
                  <span style={{ color: '#7ee787' }}>]</span>,
                </span>
                <span style={{ paddingLeft: '2rem', display: 'block' }}>
                  <span style={{ color: '#58a6ff' }}>architecture</span>:{' '}
                  <span style={{ color: '#ffa657' }}>
                    'Clean Architecture + BLoC'
                  </span>
                  ,
                </span>
                <span style={{ paddingLeft: '2rem', display: 'block' }}>
                  <span style={{ color: '#58a6ff' }}>focus</span>:{' '}
                  <span style={{ color: '#7ee787' }}>[</span>
                  <span style={{ color: '#ffa657' }}>'60fps UI'</span>,{' '}
                  <span style={{ color: '#ffa657' }}>
                    'App Size Optimization'
                  </span>
                  , <span style={{ color: '#ffa657' }}>'Offline-First'</span>
                  <span style={{ color: '#7ee787' }}>]</span>
                </span>
                {'};'}
              </p>

              <p
                style={{
                  color: '#6e7681',
                  fontStyle: 'italic',
                  marginTop: '1.5rem',
                }}
              >
                {'/* '}
                Building production-ready mobile apps that users love. From
                pixel-perfect UIs to complex state management and real-time
                features.
                {' */'}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Skills */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '4rem',
          }}
        >
          <SkillsOrbit />
        </div>
      </div>
    </section>
  );
}

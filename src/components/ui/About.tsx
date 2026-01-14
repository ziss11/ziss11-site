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
          {/* Terminal Window Controls - Monochromatic for Terminal Feel */}
          <div
            style={{
              position: 'absolute',
              top: '12px',
              left: '16px',
              display: 'flex',
              gap: '8px',
            }}
          >
            <div
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: 'rgba(126, 231, 135, 0.3)',
                border: '1px solid rgba(126, 231, 135, 0.4)',
              }}
            />
            <div
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: 'rgba(126, 231, 135, 0.3)',
                border: '1px solid rgba(126, 231, 135, 0.4)',
              }}
            />
            <div
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: 'rgba(126, 231, 135, 0.3)',
                border: '1px solid rgba(126, 231, 135, 0.4)',
              }}
            />
          </div>

          {/* Content */}
          <div style={{ marginTop: '2rem' }}>
            <h2
              style={{
                fontSize: '1.2rem',
                marginBottom: '1.5rem',
                color: '#c9d1d9',
                fontFamily: 'var(--font-mono)',
                fontWeight: 500,
              }}
            >
              <span style={{ color: '#7ee787' }}>root@portfolio:~$</span> whoami
            </h2>

            <div
              style={{
                fontSize: '1rem',
                color: '#c9d1d9',
                lineHeight: 1.8,
                fontFamily: 'var(--font-mono)',
                paddingLeft: '1rem',
                borderLeft: '2px solid rgba(126, 231, 135, 0.2)',
              }}
            >
              <div style={{ marginBottom: '0.8rem' }}>
                <span style={{ color: '#7ee787' }}>[USER]</span> ziss11
              </div>
              <div style={{ marginBottom: '0.8rem' }}>
                <span style={{ color: '#7ee787' }}>[ROLE]</span> Senior Mobile
                Engineer
              </div>
              <div style={{ marginBottom: '0.8rem' }}>
                <span style={{ color: '#7ee787' }}>[SPECS]</span> iOS • Android
                • Flutter
              </div>
              <div style={{ marginBottom: '0.8rem' }}>
                <span style={{ color: '#7ee787' }}>[FOCUS]</span> Native
                Performance, 60fps UI, Offline-First
              </div>
              <div style={{ marginBottom: '0.8rem' }}>
                <span style={{ color: '#7ee787' }}>[STATUS]</span> Building
                production-ready apps...
              </div>
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

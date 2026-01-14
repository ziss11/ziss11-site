'use client';

import { motion } from 'framer-motion';
import {
  Database,
  Layout,
  Server,
  ShieldCheck,
  Smartphone,
} from 'lucide-react';

const BentoCard = ({
  children,
  span = '',
  title,
  icon: Icon,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  span?: string;
  title: string;
  icon: React.ComponentType<{ size?: number; color?: string }>;
  delay?: number;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className={`glass-panel ${span} ${className}`}
    style={{
      padding: '1.5rem',
      borderRadius: '24px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      overflow: 'hidden',
      position: 'relative',
      background: 'rgba(5, 5, 10, 0.8)', // Darker terminal background (Matches Projects)
      border: '1px solid rgba(126, 231, 135, 0.2)', // Terminal Green border
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.4)',
      backdropFilter: 'blur(10px)',
      fontFamily: 'var(--font-mono)', // Enforce terminal font
    }}
  >
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.8rem',
        marginBottom: '1rem',
        zIndex: 2,
      }}
    >
      <div
        style={{
          background: 'rgba(126, 231, 135, 0.1)', // Green tint bg
          padding: '8px',
          borderRadius: '12px',
        }}
      >
        <Icon
          size={20}
          color='#7ee787' // Terminal Green icon
        />
      </div>
      <h3
        style={{
          fontSize: '1.1rem',
          fontWeight: 600,
          color: '#c9d1d9',
          fontFamily: 'var(--font-mono)',
        }}
      >
        <span style={{ color: '#8b949e' }}>{'// '}</span>
        {title}
      </h3>
    </div>
    <div style={{ zIndex: 2 }}>{children}</div>
    {/* Subtle Glow Background */}
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '150px',
        height: '150px',
        background:
          'radial-gradient(circle, rgba(126, 231, 135, 0.15) 0%, transparent 70%)',
        filter: 'blur(30px)',
        zIndex: 1,
      }}
    />
  </motion.div>
);

export default function BentoGrid() {
  return (
    <section style={{ padding: '0 10%', margin: '6rem 0' }}>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{
          fontSize: '2.5rem',
          marginBottom: '3rem',
          textAlign: 'center',
          fontFamily: 'var(--font-mono)',
        }}
      >
        Mobile <span style={{ color: '#7ee787' }}>Arsenal</span>
      </motion.h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          gridAutoRows: 'minmax(180px, auto)',
        }}
      >
        {/* Mobile Architecture - Large Span */}
        <BentoCard
          title='System Architecture'
          icon={Layout}
          span='col-span-2'
          delay={0.1}
        >
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              color: '#8b949e',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
            }}
          >
            <div>
              <span style={{ color: '#7ee787' }}>[SYSTEM]</span> Initializing
              modules...
            </div>
            <div
              style={{
                paddingLeft: '1rem',
                borderLeft: '1px solid rgba(126, 231, 135, 0.2)',
              }}
            >
              {[
                { name: 'Clean Architecture', status: 'LOADED' },
                { name: 'BLoC State Mgmt', status: 'ACTIVE' },
                { name: 'Dependency Injection', status: 'READY' },
                { name: 'Router Module', status: 'MOUNTED' },
              ].map((mod) => (
                <div
                  key={mod.name}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '4px',
                  }}
                >
                  <span>{mod.name}</span>
                  <span style={{ color: '#7ee787' }}>[{mod.status}]</span>
                </div>
              ))}
            </div>
            <div>
              <span style={{ color: '#7ee787' }}>[SYSTEM]</span> All systems
              operational.
            </div>
          </div>
        </BentoCard>

        {/* Realtime Database - Pulse Effect */}
        <BentoCard
          title='Network Stream'
          icon={Database}
          delay={0.2}
        >
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              color: '#8b949e',
            }}
          >
            <div>
              <span style={{ color: '#c9d1d9' }}>&gt;</span> Connecting to
              socket...
            </div>
            <div style={{ color: '#7ee787' }}>
              <span style={{ color: '#c9d1d9' }}>&gt;</span> Handshake success.
            </div>
            <div style={{ color: '#7ee787' }}>
              <span style={{ color: '#c9d1d9' }}>&gt;</span> Subscribing to
              channel.
            </div>
            <div
              style={{
                marginTop: '0.8rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#c9d1d9',
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  background: '#7ee787',
                  borderRadius: '50%',
                  boxShadow: '0 0 8px #7ee787',
                  animation: 'pulse 2s infinite',
                }}
              />
              Stream Active
            </div>
          </div>
        </BentoCard>

        {/* Mobile Frameworks */}
        <BentoCard
          title='Tech Stack'
          icon={Smartphone}
          delay={0.3}
        >
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
            <div style={{ color: '#8b949e', marginBottom: '0.5rem' }}>
              <span style={{ color: '#7ee787' }}>root@mobile:~$</span>{' '}
              ./list-stack
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '4px',
                color: '#c9d1d9',
              }}
            >
              <span>Flutter</span>
              <span style={{ color: '#7ee787', textAlign: 'right' }}>3.x</span>
              <span>Dart</span>
              <span style={{ color: '#7ee787', textAlign: 'right' }}>3.0</span>
              <span>Kotlin</span>
              <span style={{ color: '#7ee787', textAlign: 'right' }}>1.9</span>
              <span>Swift</span>
              <span style={{ color: '#7ee787', textAlign: 'right' }}>5.9</span>
            </div>
          </div>
        </BentoCard>

        {/* CI/CD */}
        <BentoCard
          title='CI/CD Pipelines'
          icon={Server}
          delay={0.4}
        >
          <div
            style={{
              width: '100%',
              background: 'rgba(255,255,255,0.1)',
              height: '6px',
              borderRadius: '3px',
              marginTop: '0.5rem',
            }}
          >
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
              style={{
                height: '100%',
                background: 'linear-gradient(90deg, #2ea043, #7ee787)',
                borderRadius: '3px',
              }}
            />
          </div>
          <div
            style={{
              fontSize: '0.9rem',
              marginTop: '0.8rem',
              color: '#aaa',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <span>Codemagic</span>
            <span>Github Actions</span>
          </div>
        </BentoCard>

        {/* Testing Strategy */}
        <BentoCard
          title='Testing Strategy'
          icon={ShieldCheck}
          delay={0.5}
        >
          {/* Testing Section Replacement */}
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
            <div style={{ color: '#8b949e', marginBottom: '0.5rem' }}>
              $ run_tests.sh
            </div>
            {[
              { label: 'Unit Tests', val: 'PASS' },
              { label: 'Widget Tests', val: 'PASS' },
              { label: 'Integration', val: 'PASS' },
            ].map((test, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '0.3rem',
                }}
              >
                <span>
                  <span style={{ color: '#79c0ff' }}>[TEST]</span> {test.label}
                </span>
                <span style={{ color: '#7ee787' }}>{test.val}</span>
              </div>
            ))}
          </div>
        </BentoCard>
      </div>
    </section>
  );
}

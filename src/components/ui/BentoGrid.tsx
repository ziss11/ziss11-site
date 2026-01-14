'use client';

import { motion } from 'framer-motion';
import { Database, Layout, Server, Smartphone } from 'lucide-react';

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
      background: 'rgba(255,255,255,0.08)',
      border: '1px solid rgba(255,255,255,0.1)',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
      backdropFilter: 'blur(12px)',
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
          background: 'rgba(255,255,255,0.1)',
          padding: '8px',
          borderRadius: '12px',
        }}
      >
        <Icon
          size={20}
          color='#fff'
        />
      </div>
      <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#fff' }}>
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
          'radial-gradient(circle, rgba(77, 77, 255, 0.15) 0%, transparent 70%)',
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
        }}
      >
        Mobile <span className='text-gradient-blue'>Arsenal</span>
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
          title='Mobile Architecture'
          icon={Layout}
          span='col-span-2'
          delay={0.1}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
              height: '100%',
            }}
          >
            <div
              className='arch-circle'
              style={{ textAlign: 'center' }}
            >
              <div
                className='circle-progress'
                style={{
                  width: '60px',
                  height: '60px',
                  border: '4px solid #58a6ff',
                  borderRadius: '50%',
                  marginBottom: '0.5rem',
                }}
              ></div>
              <span>Clean Arch</span>
            </div>
            <div
              className='arch-circle'
              style={{ textAlign: 'center' }}
            >
              <div
                className='circle-progress'
                style={{
                  width: '60px',
                  height: '60px',
                  border: '4px solid #7ee787',
                  borderRadius: '50%',
                  marginBottom: '0.5rem',
                }}
              ></div>
              <span>BLoC</span>
            </div>
            <div
              className='arch-circle'
              style={{ textAlign: 'center' }}
            >
              <div
                className='circle-progress'
                style={{
                  width: '60px',
                  height: '60px',
                  border: '4px solid #bc8cff',
                  borderRadius: '50%',
                  marginBottom: '0.5rem',
                }}
              ></div>
              <span>MVVM</span>
            </div>
          </div>
        </BentoCard>

        {/* Realtime Database - Pulse Effect */}
        <BentoCard
          title='Realtime'
          icon={Database}
          delay={0.2}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ position: 'relative' }}>
              <div
                style={{
                  width: '12px',
                  height: '12px',
                  background: '#00ff9f',
                  borderRadius: '50%',
                }}
              ></div>
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: '#00ff9f',
                  borderRadius: '50%',
                  animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite',
                }}
              ></div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.9rem', color: '#ccc' }}>
                Websocket
              </span>
              <span style={{ fontSize: '0.9rem', color: '#ccc' }}>
                Firebase
              </span>
            </div>
          </div>
        </BentoCard>

        {/* Mobile Frameworks */}
        <BentoCard
          title='Mobile Frameworks'
          icon={Smartphone}
          delay={0.3}
        >
          <ul style={{ listStyle: 'none', fontSize: '0.95rem', color: '#bbb' }}>
            <li
              style={{
                marginBottom: '0.5rem',
                fontWeight: 600,
                color: '#58a6ff',
              }}
            >
              Flutter
            </li>
            <li
              style={{
                marginBottom: '0.5rem',
                color: '#8b949e',
              }}
            >
              Swift (iOS)
            </li>
            <li
              style={{
                color: '#8b949e',
              }}
            >
              Kotlin (Android)
            </li>
          </ul>
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
                background: 'linear-gradient(90deg, #4d4dff, #bc13fe)',
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
      </div>
    </section>
  );
}

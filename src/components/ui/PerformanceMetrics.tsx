'use client';

import { motion, useInView, useSpring } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const Counter = ({
  value,
  label,
  suffix = '',
  prefix = '',
}: {
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  // Using a spring for the counting animation value
  const count = useSpring(0, { duration: 2000, bounce: 0 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      count.set(value);
    }
  }, [isInView, value, count]);

  useEffect(() => {
    const unsubscribe = count.on('change', (latest) => {
      setDisplayValue(Math.floor(latest));
    });
    return unsubscribe;
  }, [count]);

  return (
    <div
      ref={ref}
      style={{ textAlign: 'center' }}
    >
      <motion.div
        style={{
          fontSize: '3.5rem',
          fontWeight: 800,
          color: '#fff',
          marginBottom: '0.5rem',
          fontFamily: 'var(--font-mono)',
        }}
        className='text-gradient-blue'
      >
        {prefix}
        {displayValue}
        {suffix}
      </motion.div>
      <div style={{ color: '#aaa', fontSize: '1rem', letterSpacing: '1px' }}>
        {label}
      </div>
    </div>
  );
};

export default function PerformanceMetrics() {
  return (
    <section
      style={{
        padding: '6rem 10%',
        background:
          'linear-gradient(180deg, transparent 0%, rgba(77, 77, 255, 0.05) 50%, transparent 100%)',
        margin: '4rem 0',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h2
          style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'white' }}
        >
          Performance <span style={{ color: '#bc13fe' }}>Obsessed</span>
        </h2>
        <p style={{ color: '#888', maxWidth: '600px', margin: '0 auto' }}>
          Metrics from my latest production deployment.
        </p>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
          gap: '3rem',
        }}
      >
        <Counter
          value={60}
          label='FPS'
        />
        <Counter
          value={98}
          label='Crash Free Users'
          suffix='%'
        />
        <Counter
          value={3}
          label='App Launch Time'
          prefix='<'
          suffix='s'
        />
      </div>
    </section>
  );
}

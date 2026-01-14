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
      style={{
        textAlign: 'left', // Align left for log style
        fontFamily: 'var(--font-mono)',
        borderBottom: '1px dashed rgba(126, 231, 135, 0.2)',
        padding: '1rem 0',
        width: '100%',
        maxWidth: '300px',
      }}
    >
      <div
        style={{ fontSize: '0.8rem', color: '#8b949e', marginBottom: '0.2rem' }}
      >
        <span style={{ color: '#7ee787' }}>[BENCHMARK]</span>{' '}
        {label.toUpperCase()}
      </div>
      <motion.div
        style={{
          fontSize: '2rem',
          fontWeight: 700,
          color: '#c9d1d9',
          display: 'flex',
          alignItems: 'baseline',
          gap: '10px',
        }}
      >
        <div
          style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}
        >
          <span style={{ fontSize: '0.9rem', color: '#7ee787' }}>{'>'}</span>
          <span style={{ color: '#c9d1d9' }}>
            {prefix}
            {displayValue}
            {suffix}
          </span>
        </div>
        <span style={{ fontSize: '0.8rem', color: '#2ea043' }}>[OK]</span>
      </motion.div>
    </div>
  );
};

export default function PerformanceMetrics() {
  return (
    <section
      style={{
        padding: '6rem 10%',
        margin: '4rem 0',
        fontFamily: 'var(--font-mono)',
        borderTop: '1px solid rgba(126, 231, 135, 0.1)',
        borderBottom: '1px solid rgba(126, 231, 135, 0.1)',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h2
          style={{
            fontSize: '2.5rem',
            marginBottom: '1rem',
            color: '#c9d1d9',
            fontFamily: 'var(--font-mono)',
          }}
        >
          System <span style={{ color: '#7ee787' }}>Metrics</span>
        </h2>
        <div style={{ color: '#8b949e', fontFamily: 'var(--font-mono)' }}>
          <span style={{ color: '#7ee787' }}>root@server:~$</span>{' '}
          ./run-benchmarks.sh
        </div>
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

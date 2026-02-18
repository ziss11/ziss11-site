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
      className='text-left font-mono border-b border-accent-green/20 border-dashed py-4 w-full max-w-[300px]'
    >
      <div className='text-[0.8rem] text-text-secondary mb-[0.2rem]'>
        <span className='text-accent-green'>[BENCHMARK]</span>{' '}
        {label.toUpperCase()}
      </div>
      <motion.div className='text-[2rem] font-bold text-text-primary flex items-baseline gap-[10px]'>
        <div className='flex items-center gap-2 flex-1'>
          <span className='text-[0.9rem] text-accent-green'>{'>'}</span>
          <span className='text-text-primary'>
            {prefix}
            {displayValue}
            {suffix}
          </span>
        </div>
        <span className='text-[0.8rem] text-[#2ea043]'>[OK]</span>
      </motion.div>
    </div>
  );
};

export default function PerformanceMetrics() {
  return (
    <section className='py-24 px-4 md:px-[10%] my-16 font-mono border-y border-accent-green/10'>
      <div className='text-center mb-16'>
        <h2 className='text-[2.5rem] mb-4 text-text-primary font-mono'>
          System <span className='text-accent-green'>Metrics</span>
        </h2>
        <div className='text-text-secondary font-mono'>
          <span className='text-accent-green'>root@server:~$</span>{' '}
          ./run-benchmarks.sh
        </div>
      </div>

      <div className='flex justify-center md:justify-around flex-wrap gap-6 md:gap-12'>
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

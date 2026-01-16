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
    className={`glass ${span} ${className} p-6 rounded-[24px] flex flex-col justify-between overflow-hidden relative bg-[#05050a]/80 border border-accent-green/20 shadow-[0_4px_30px_rgba(0,0,0,0.4)] backdrop-blur-md`}
  >
    <div className='flex items-center gap-[0.8rem] mb-4 z-10'>
      <div className='bg-accent-green/10 p-2 rounded-xl'>
        <Icon
          size={20}
          color='#7ee787' // Terminal Green icon
        />
      </div>
      <h3 className='text-[1.1rem] font-semibold text-text-primary'>
        <span className='text-text-secondary'>{'// '}</span>
        {title}
      </h3>
    </div>
    <div className='z-10'>{children}</div>
    {/* Subtle Glow Background */}
    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150px] h-[150px] bg-[radial-gradient(circle,rgba(126,231,135,0.15)_0%,transparent_70%)] blur-[30px] z-1'></div>
  </motion.div>
);

export default function BentoGrid() {
  return (
    <section className='px-[10%] my-24'>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className='text-[2.5rem] mb-12 text-center'
      >
        Mobile <span className='text-accent-green'>Arsenal</span>
      </motion.h2>

      <div className='grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6 auto-rows-[minmax(180px,auto)]'>
        {/* Mobile Architecture - Large Span */}
        <BentoCard
          title='System Architecture'
          icon={Layout}
          span='col-span-2'
          delay={0.1}
        >
          <div className='font-mono text-[0.85rem] text-text-secondary flex flex-col gap-2'>
            <div>
              <span className='text-accent-green'>[SYSTEM]</span> Initializing
              modules...
            </div>
            <div className='pl-4 border-l border-accent-green/20'>
              {[
                { name: 'Clean Architecture', status: 'LOADED' },
                { name: 'BLoC State Mgmt', status: 'ACTIVE' },
                { name: 'Dependency Injection', status: 'READY' },
                { name: 'Router Module', status: 'MOUNTED' },
              ].map((mod) => (
                <div
                  key={mod.name}
                  className='flex justify-between mb-1'
                >
                  <span>{mod.name}</span>
                  <span className='text-accent-green'>[{mod.status}]</span>
                </div>
              ))}
            </div>
            <div>
              <span className='text-accent-green'>[SYSTEM]</span> All systems
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
          <div className='font-mono text-[0.85rem] text-text-secondary'>
            <div>
              <span className='text-text-primary'>&gt;</span> Connecting to
              socket...
            </div>
            <div className='text-accent-green'>
              <span className='text-text-primary'>&gt;</span> Handshake success.
            </div>
            <div className='text-accent-green'>
              <span className='text-text-primary'>&gt;</span> Subscribing to
              channel.
            </div>
            <div className='mt-[0.8rem] flex items-center gap-2 text-text-primary'>
              <div className='w-2 h-2 bg-accent-green rounded-full shadow-[0_0_8px_#7ee787] animate-pulse'></div>
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
          <div className='font-mono text-[0.85rem]'>
            <div className='text-text-secondary mb-2'>
              <span className='text-accent-green'>root@mobile:~$</span>{' '}
              ./list-stack
            </div>
            <div className='grid grid-cols-2 gap-1 text-text-primary'>
              <span>Flutter</span>
              <span className='text-accent-green text-right'>3.x</span>
              <span>Dart</span>
              <span className='text-accent-green text-right'>3.0</span>
              <span>Kotlin</span>
              <span className='text-accent-green text-right'>1.9</span>
              <span>Swift</span>
              <span className='text-accent-green text-right'>5.9</span>
            </div>
          </div>
        </BentoCard>

        {/* CI/CD */}
        <BentoCard
          title='CI/CD Pipelines'
          icon={Server}
          delay={0.4}
        >
          <div className='w-full bg-white/10 h-[6px] rounded-full mt-2'>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
              className='h-full bg-linear-to-r from-[#2ea043] to-accent-green rounded-full'
            />
          </div>
          <div className='text-[0.9rem] mt-[0.8rem] text-[#aaa] flex justify-between'>
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
          <div className='font-mono text-[0.85rem]'>
            <div className='text-text-secondary mb-2'>$ run_tests.sh</div>
            {[
              { label: 'Unit Tests', val: 'PASS' },
              { label: 'Widget Tests', val: 'PASS' },
              { label: 'Integration', val: 'PASS' },
            ].map((test, i) => (
              <div
                key={i}
                className='flex justify-between mb-[0.3rem]'
              >
                <span>
                  <span className='text-[#79c0ff]'>[TEST]</span> {test.label}
                </span>
                <span className='text-accent-green'>{test.val}</span>
              </div>
            ))}
          </div>
        </BentoCard>
      </div>
    </section>
  );
}

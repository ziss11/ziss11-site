'use client';

import { motion } from 'framer-motion';

export default function About() {
  return (
    <section className='relative z-10 py-24 px-[10%]'>
      <div className='max-w-[1000px] mx-auto'>
        {/* Visual Title - Matched to other sections */}
        <h2 className='text-[2.5rem] text-center mb-16 text-white font-bold'>
          About <span className='text-accent-green'>Me</span>
        </h2>

        {/* Glass Panel - Unified Design */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className='p-12 bg-[#05050a]/80 border border-accent-green/20 rounded-[24px] backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.4)]'
        >
          {/* Internal Content - Clean List */}
          <div className='text-[1.1rem] text-text-primary leading-[2] flex flex-col gap-4'>
            <div className='flex items-baseline gap-2'>
              <span className='text-accent-green font-semibold min-w-[80px]'>
                [USER]
              </span>
              <span>Abdul Azis</span>
            </div>

            <div className='flex items-baseline gap-2'>
              <span className='text-accent-green font-semibold min-w-[80px]'>
                [ROLE]
              </span>
              <span>Senior Mobile Engineer</span>
            </div>

            <div className='flex items-baseline gap-2'>
              <span className='text-accent-green font-semibold min-w-[80px]'>
                [SPECS]
              </span>
              <span>iOS • Android • Flutter</span>
            </div>

            <div className='flex items-baseline gap-2'>
              <span className='text-accent-green font-semibold min-w-[80px]'>
                [FOCUS]
              </span>
              <span>Native Performance, 60fps UI, Offline-First</span>
            </div>

            <div className='flex items-baseline gap-2'>
              <span className='text-accent-green font-semibold min-w-[80px]'>
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

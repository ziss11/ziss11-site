'use client';

import { motion, useScroll, useSpring } from 'framer-motion';
import { useRef } from 'react';

const experiences = [
  {
    role: 'Sr. Mobile Engineer',
    company: 'PT Gamatecha Solusi Nusantara',
    type: 'Full-time',
    period: 'Jul 2024 - Present',
    desc: 'Leading mobile development, driving architectural decisions, and building scalable apps with complex API integrations.',
    tech: ['Flutter', 'Clean Arch', 'CI/CD', 'Rest API'],
    side: 'left',
  },
  {
    role: 'Software Engineer Trainee',
    company: 'ETHERVAL IT Consultancy',
    type: 'Contract',
    period: 'Oct 2023 - Dec 2023',
    desc: 'Gained hands-on experience in software engineering best practices.',
    tech: ['React', 'TypeScript', 'System Design'],
    side: 'right',
  },
  {
    role: 'Mobile Developer',
    company: 'Suitmedia Digital Agency',
    type: 'Internship',
    period: 'Feb 2023 - Jun 2023',
    desc: 'Developed hybrid e-commerce apps using Flutter & GetX. Researched chat modules.',
    tech: ['Flutter', 'GetX', 'Dart', 'E-commerce'],
    side: 'left',
  },
  {
    role: 'Machine Learning Cohort',
    company: 'Bangkit Academy',
    type: 'Apprenticeship',
    period: 'Feb 2022 - Jul 2022',
    desc: 'Led Capstone project with Indosat Ooredoo. Built ML models for translation.',
    tech: ['TensorFlow', 'Python', 'Machine Learning'],
    side: 'right',
  },
];

const TimelineCard = ({
  data,
  index,
}: {
  data: {
    role: string;
    company: string;
    type: string;
    period: string;
    desc: string;
    tech: string[];
    side: string;
  };
  index: number;
}) => {
  return (
    <motion.div
      className={`timeline-card relative mb-8 w-full md:mb-16 md:w-[45%] ${
        data.side === 'right' ? 'md:ml-auto' : 'md:mr-auto'
      }`}
      initial={{ opacity: 0, x: data.side === 'left' ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
    >
      <div className='glass p-6 rounded-[20px] bg-[#05050a]/80 border border-[#58a6ff40] backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.4)] relative overflow-hidden transition-all duration-300'>
        {/* Header: Period & Type */}
        <div className='flex justify-between items-center mb-4 font-mono'>
          <div className='flex items-center gap-[0.4rem] text-accent-green text-[0.85rem] font-semibold'>
            <span className='text-text-secondary'>$</span>
            {data.period}
          </div>
          <span className='text-[0.75rem] px-[0.6rem] py-[0.2rem] rounded border border-accent-green/20 bg-accent-green/10 text-accent-green font-medium font-mono'>
            {data.type}
          </span>
        </div>

        {/* Role & Company */}
        <div className='mb-4'>
          <h3 className='text-[1.3rem] text-text-primary mb-[0.3rem] flex items-center gap-2 font-mono'>
            <span className='text-accent-green'>{'>'}</span>
            {data.role}
          </h3>
          <h4 className='text-[0.95rem] text-text-secondary flex items-center gap-[0.4rem] font-mono ml-[1.2rem]'>
            <span className='text-accent-blue font-mono'>@</span> {data.company}
          </h4>
        </div>

        {/* Description */}
        <p className='text-[#aaa] text-[0.95rem] leading-[1.6] mb-[1.2rem]'>
          {data.desc}
        </p>

        {/* Tech Stack Tags */}
        <div className='flex flex-wrap gap-2'>
          {data.tech.map((tech, i) => (
            <span
              key={i}
              className='text-[0.75rem] text-accent-blue bg-[#388bfd1a] px-[0.6rem] py-[0.2rem] rounded border border-[#388bfd33] font-mono'
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Cyberpunk Diamond Node - Hidden on Mobile */}
      <div
        className={`timeline-dot absolute top-[21px] w-[22px] h-[22px] rotate-45 bg-[#050505] border-2 border-accent-green z-10 shadow-[0_0_10px_rgba(126,231,135,0.5)] items-center justify-center hidden md:flex ${
          data.side === 'left'
            ? '-right-[calc(11.1%+11px)]'
            : '-left-[calc(11.1%+11px)]'
        }`}
      >
        <div className='w-2 h-2 bg-accent-green shadow-[0_0_8px_#7ee787]' />
      </div>
    </motion.div>
  );
};

export default function ExperienceTimeline() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section
      id='experience'
      ref={ref}
      className='py-16 px-4 md:px-[10%] relative overflow-hidden'
    >
      <h2 className='text-[2.5rem] text-center mb-10 md:mb-20 text-white'>
        Career <span className='text-accent-blue'>Milestones</span>
      </h2>

      <div className='relative max-w-[1000px] mx-auto'>
        {/* Center Line - Hidden on Mobile */}
        <div className='center-line absolute left-1/2 top-0 bottom-0 w-[2px] bg-linear-to-b from-transparent via-accent-green/30 to-transparent -translate-x-1/2 hidden md:block' />

        {/* Animated Progress Line - Hidden on Mobile */}
        <motion.div
          className='progress-line absolute left-1/2 top-0 bottom-0 w-[2px] bg-linear-to-b from-accent-green to-[#2ea043] -translate-x-1/2 origin-top shadow-[0_0_10px_rgba(77,77,255,0.5)] hidden md:block'
          style={{ scaleY }}
        />

        {experiences.map((exp, index) => (
          <TimelineCard
            key={index}
            data={exp}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}

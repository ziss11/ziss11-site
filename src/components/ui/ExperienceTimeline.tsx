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
      className='timeline-card'
      initial={{ opacity: 0, x: data.side === 'left' ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      style={{
        width: '45%',
        marginLeft: data.side === 'right' ? 'auto' : '0',
        marginRight: data.side === 'left' ? 'auto' : '0',
        marginBottom: '4rem',
        position: 'relative',
      }}
    >
      <div
        className='glass-panel'
        style={{
          padding: '1.5rem',
          borderRadius: '20px',
          background: 'rgba(5, 5, 10, 0.8)', // Darker terminal background
          border: '1px solid rgba(88, 166, 255, 0.15)', // Match Mobile Arsenal (Cyan)
          backdropFilter: 'blur(10px)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.4)',
          position: 'relative',
          overflow: 'hidden',
          transition: 'all 0.3s ease',
        }}
      >
        {/* Header: Period & Type */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1rem',
            fontFamily: 'var(--font-mono)', // Terminal font
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              color: '#7ee787', // Terminal Green
              fontSize: '0.85rem',
              fontWeight: 600,
            }}
          >
            <span style={{ color: '#8b949e' }}>$</span>
            {data.period}
          </div>
          <span
            style={{
              fontSize: '0.75rem',
              padding: '0.2rem 0.6rem',
              borderRadius: '4px',
              background: 'rgba(126, 231, 135, 0.1)', // Green tint
              color: '#7ee787', // Green text
              border: '1px solid rgba(126, 231, 135, 0.2)',
              fontWeight: 500,
              fontFamily: 'var(--font-mono)',
            }}
          >
            {data.type}
          </span>
        </div>

        {/* Role & Company */}
        <div style={{ marginBottom: '1rem' }}>
          <h3
            style={{
              fontSize: '1.3rem',
              color: '#c9d1d9', // Light gray text
              marginBottom: '0.3rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontFamily: 'var(--font-mono)',
            }}
          >
            <span style={{ color: '#7ee787' }}>{'>'}</span>
            {data.role}
          </h3>
          <h4
            style={{
              fontSize: '0.95rem',
              color: '#8b949e',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontFamily: 'var(--font-mono)',
              marginLeft: '1.2rem', // Indent for hierarchy
            }}
          >
            <span style={{ color: '#79c0ff' }}>@</span> {data.company}
          </h4>
        </div>

        {/* Description */}
        <p
          style={{
            color: '#aaa',
            fontSize: '0.95rem',
            lineHeight: 1.6,
            marginBottom: '1.2rem',
          }}
        >
          {data.desc}
        </p>

        {/* Tech Stack Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {data.tech.map((tech, i) => (
            <span
              key={i}
              style={{
                fontSize: '0.75rem',
                color: '#79c0ff', // Soft Blue
                background: 'rgba(56, 139, 253, 0.1)',
                padding: '0.2rem 0.6rem',
                borderRadius: '4px',
                border: '1px solid rgba(56, 139, 253, 0.2)',
                fontFamily: 'var(--font-mono)',
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Tech Connector Line */}
      <div
        className='timeline-connector'
        style={{
          position: 'absolute',
          top: '32px',
          [data.side === 'left' ? 'right' : 'left']: '-20px',
          width: '12%',
          height: '0',
          borderTop: '2px dashed rgba(126, 231, 135, 0.3)',
          zIndex: 1,
        }}
      />

      {/* Cyberpunk Diamond Node */}
      <div
        className='timeline-dot'
        style={{
          position: 'absolute',
          top: '21px',
          [data.side === 'left' ? 'right' : 'left']: 'calc(-11.1% - 11px)',
          width: '22px',
          height: '22px',
          transform: 'rotate(45deg)',
          background: '#050505',
          border: '2px solid #7ee787', // Terminal Green Border
          zIndex: 10,
          boxShadow: '0 0 10px rgba(126, 231, 135, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: '8px',
            height: '8px',
            background: '#7ee787',
            boxShadow: '0 0 8px #7ee787',
          }}
        />
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
      ref={ref}
      style={{ padding: '4rem 10%', position: 'relative', overflow: 'hidden' }}
    >
      <h2
        style={{
          fontSize: '2.5rem',
          textAlign: 'center',
          marginBottom: '5rem',
          color: 'white',
        }}
      >
        Career <span className='text-gradient-blue'>Milestones</span>
      </h2>

      <div
        style={{ position: 'relative', maxWidth: '1000px', margin: '0 auto' }}
      >
        {/* Center Line */}
        <div
          className='center-line'
          style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            bottom: 0,
            width: '2px',
            background:
              'linear-gradient(to bottom, transparent, rgba(126, 231, 135, 0.3), transparent)',
            transform: 'translateX(-50%)',
          }}
        />

        {/* Animated Progress Line */}
        <motion.div
          className='progress-line'
          style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            bottom: 0,
            width: '2px',
            background: 'linear-gradient(to bottom, #7ee787, #2ea043)',
            transform: 'translateX(-50%)',
            transformOrigin: 'top',
            scaleY,
            boxShadow: '0 0 10px rgba(77, 77, 255, 0.5)',
          }}
        />

        {experiences.map((exp, index) => (
          <TimelineCard
            key={index}
            data={exp}
            index={index}
          />
        ))}
      </div>
      <style
        jsx
        global
      >{`
        @media (max-width: 768px) {
          .timeline-card {
            width: 100% !important;
            margin-left: 0 !important;
            margin-right: 0 !important;
            margin-bottom: 2rem !important;
          }

          .timeline-dot,
          .timeline-connector,
          .center-line,
          .progress-line {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}

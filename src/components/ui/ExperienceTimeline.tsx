'use client';

import { motion, useScroll, useSpring } from 'framer-motion';
import { Briefcase, Building2, Calendar } from 'lucide-react';
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
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.2)',
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
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              color: '#4d4dff',
              fontSize: '0.85rem',
              fontWeight: 600,
            }}
          >
            <Calendar size={14} />
            {data.period}
          </div>
          <span
            style={{
              fontSize: '0.75rem',
              padding: '0.2rem 0.6rem',
              borderRadius: '99px',
              background: 'rgba(77, 77, 255, 0.15)',
              color: '#4d4dff',
              border: '1px solid rgba(77, 77, 255, 0.3)',
              fontWeight: 500,
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
              color: 'white',
              marginBottom: '0.3rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <Briefcase
              size={18}
              color='#bc13fe'
            />
            {data.role}
          </h3>
          <h4
            style={{
              fontSize: '0.95rem',
              color: '#ccc',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            <Building2
              size={14}
              color='#888'
            />
            {data.company}
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
                color: '#fff',
                background: 'rgba(255,255,255,0.08)',
                padding: '0.2rem 0.6rem',
                borderRadius: '6px',
                border: '1px solid rgba(255,255,255,0.05)',
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Timeline Dot */}
      <div
        style={{
          position: 'absolute',
          top: '24px',
          [data.side === 'left' ? 'right' : 'left']: '-11.5%',
          width: '16px',
          height: '16px',
          background: '#1a1a1a', // Dark center
          border: '3px solid #4d4dff', // Blue ring
          borderRadius: '50%',
          zIndex: 10,
          boxShadow: '0 0 15px rgba(77, 77, 255, 0.6)',
        }}
      />
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
          style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            bottom: 0,
            width: '2px',
            background:
              'linear-gradient(to bottom, transparent, rgba(77, 77, 255, 0.3), transparent)',
            transform: 'translateX(-50%)',
          }}
        />

        {/* Animated Progress Line */}
        <motion.div
          style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            bottom: 0,
            width: '2px',
            background: 'linear-gradient(to bottom, #4d4dff, #bc13fe)',
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
    </section>
  );
}

'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Check, Copy, Mail } from 'lucide-react';
import { useState } from 'react';
import { SiGithub, SiLinkedin } from 'react-icons/si';

const contactMethods = [
  {
    id: 'email',
    name: 'Email',
    value: 'abdul.azizz1108@gmail.com',
    icon: <Mail size={24} />,
    type: 'copy',
    actionLabel: 'Click to copy',
    color: '#7ee787', // Terminal Green
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    value: 'linkedin.com/in/abdazis11',
    link: 'https://www.linkedin.com/in/abdazis11/',
    icon: <SiLinkedin size={24} />,
    type: 'link',
    actionLabel: 'Connect',
    color: '#0077b5', // LinkedIn Blue
  },
  {
    id: 'github',
    name: 'GitHub',
    value: 'github.com/ziss11',
    link: 'https://github.com/ziss11',
    icon: <SiGithub size={24} />,
    type: 'link',
    actionLabel: 'Follow',
    color: '#c9d1d9', // GitHub Gray
  },
];

export default function ContactTerminal() {
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      style={{
        padding: '6rem 10%',
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Title - Matched to Career Milestones */}
      <h2
        style={{
          fontSize: '2.5rem',
          textAlign: 'center',
          marginBottom: '4rem',
          color: 'white',
          fontFamily: 'var(--font-mono)',
          fontWeight: 700,
        }}
      >
        Get in <span className='text-[#7ee787]'>Touch</span>
      </h2>

      {/* Grid Layout with Explicit Inline Styles for Robustness */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {contactMethods.map((method, index) => (
          <motion.div
            key={method.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            onClick={() => {
              if (method.type === 'copy') handleCopy(method.value);
              else if (method.link) window.open(method.link, '_blank');
            }}
            className='group cursor-pointer'
            style={{
              background: 'rgba(5, 5, 10, 0.8)',
              border: '1px solid rgba(126, 231, 135, 0.2)',
              padding: '2rem',
              borderRadius: '20px',
              backdropFilter: 'blur(10px)',
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '220px',
              cursor: 'pointer', // Ensure cursor changes on hover
            }}
            whileHover={{
              transform: 'translateY(-5px)',
              boxShadow: '0 10px 30px -10px rgba(126, 231, 135, 0.15)',
              borderColor: 'rgba(126, 231, 135, 0.5)',
            }}
          >
            {/* Header: Icon & Name */}
            <div>
              <div className='flex items-center gap-3 mb-4'>
                <div className='p-3 rounded-lg bg-[rgba(126,231,135,0.1)] text-[#7ee787] group-hover:bg-[#7ee787] group-hover:text-black transition-colors duration-300'>
                  {method.icon}
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: '#c9d1d9',
                  }}
                >
                  {method.name}
                </h3>
              </div>

              <p
                style={{
                  color: '#8b949e',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.9rem',
                  wordBreak: 'break-all',
                }}
              >
                {method.value}
              </p>
            </div>

            {/* Footer: Action */}
            <div className='mt-6 pt-4 border-t border-[#7ee787]/10 flex justify-between items-center'>
              <span className='text-[#7ee787] text-xs font-mono font-bold opacity-60 group-hover:opacity-100 transition-opacity'>
                {method.type === 'copy' && copied
                  ? 'COPIED!'
                  : method.actionLabel.toUpperCase()}
              </span>
              <div className='text-[#7ee787] opacity-60 group-hover:transform group-hover:translate-x-1 transition-all'>
                {method.type === 'copy' ? (
                  copied ? (
                    <Check size={16} />
                  ) : (
                    <Copy size={16} />
                  )
                ) : (
                  <ArrowUpRight size={16} />
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

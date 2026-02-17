'use client';

import { motion, useInView } from 'framer-motion';
import { ArrowUpRight, Check, Copy, Mail } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { SiGithub, SiLinkedin } from 'react-icons/si';

const contactMethods = [
  {
    id: 'email',
    name: 'Email',
    value: 'zis.dev@gmail.com',
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
  const [forceVisible, setForceVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '100px' });

  // Fallback: force visibility after 2 seconds if viewport detection fails
  useEffect(() => {
    const timer = setTimeout(() => {
      setForceVisible(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shouldAnimate = isInView || forceVisible;

  return (
    <section
      ref={sectionRef}
      className='py-24 px-[10%] relative overflow-hidden w-full flex flex-col items-center'
    >
      {/* Title - Matched to Career Milestones */}
      <h2 className='text-[2.5rem] text-center mb-16 text-white font-bold'>
        Get in <span className='text-accent-green'>Touch</span>
      </h2>

      {/* Grid Layout with Explicit Inline Styles for Robustness */}
      <div className='grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-8 w-full max-w-[1200px] mx-auto'>
        {contactMethods.map((method, index) => (
          <motion.div
            key={method.id}
            initial={{ opacity: 0, y: 20 }}
            animate={
              shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{ delay: index * 0.1, duration: 0.5 }}
            onClick={() => {
              if (method.type === 'copy') handleCopy(method.value);
              else if (method.link) window.open(method.link, '_blank');
            }}
            className='group cursor-pointer bg-[#05050a]/80 border border-accent-green/20 p-8 rounded-[20px] backdrop-blur-md relative overflow-hidden transition-all duration-300 flex flex-col justify-between min-h-[220px]'
            whileHover={{
              transform: 'translateY(-5px)',
              boxShadow: '0 10px 30px -10px rgba(126, 231, 135, 0.15)',
              borderColor: 'rgba(126, 231, 135, 0.5)',
            }}
          >
            {/* Header: Icon & Name */}
            <div>
              <div className='flex items-center gap-3 mb-4'>
                <div className='p-3 rounded-lg bg-accent-green/10 text-accent-green group-hover:bg-accent-green group-hover:text-black transition-colors duration-300'>
                  {method.icon}
                </div>
                <h3 className='text-[1.1rem] font-semibold text-text-primary'>
                  {method.name}
                </h3>
              </div>

              <p className='text-text-secondary text-sm break-all'>
                {method.value}
              </p>
            </div>

            {/* Footer: Action */}
            <div className='mt-6 pt-4 border-t border-accent-green/10 flex justify-between items-center'>
              <span className='text-accent-green text-xs font-mono font-bold opacity-60 group-hover:opacity-100 transition-opacity'>
                {method.type === 'copy' && copied
                  ? 'COPIED!'
                  : method.actionLabel.toUpperCase()}
              </span>
              <div className='text-accent-green opacity-60 group-hover:transform group-hover:translate-x-1 transition-all'>
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

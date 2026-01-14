'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Send } from 'lucide-react';
import { useRef } from 'react';

const MagneticButton = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((e.clientX - centerX) * 0.3); // Magnetic strength
    y.set((e.clientY - centerY) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: mouseXSpring, y: mouseYSpring }}
      className='magnetic-btn'
    >
      {children}
    </motion.button>
  );
};

export default function Contact() {
  return (
    <section style={{ padding: '6rem 10%', position: 'relative' }}>
      <div
        style={{
          maxWidth: '600px',
          margin: '0 auto',
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          borderRadius: '24px',
          padding: '3rem',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
        }}
      >
        <h2
          style={{
            fontSize: '2.5rem',
            textAlign: 'center',
            marginBottom: '2.5rem',
            color: 'white',
          }}
        >
          Let&apos;s <span className='text-gradient-blue'>Talk</span>
        </h2>

        <form
          style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
        >
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}
          >
            <label
              style={{
                color: '#ccc',
                fontSize: '0.9rem',
                marginLeft: '4px',
                fontWeight: 500,
              }}
            >
              Name
            </label>
            <input
              type='text'
              placeholder='Ex. John Doe'
              className='glass-input'
            />
          </div>
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}
          >
            <label
              style={{
                color: '#ccc',
                fontSize: '0.9rem',
                marginLeft: '4px',
                fontWeight: 500,
              }}
            >
              Email
            </label>
            <input
              type='email'
              placeholder='Ex. john@example.com'
              className='glass-input'
            />
          </div>
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}
          >
            <label
              style={{
                color: '#ccc',
                fontSize: '0.9rem',
                marginLeft: '4px',
                fontWeight: 500,
              }}
            >
              Message
            </label>
            <textarea
              rows={4}
              placeholder='Tell me about your project...'
              className='glass-input'
            />
          </div>

          <div
            style={{
              marginTop: '1.5rem',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <MagneticButton>
              <div
                style={{
                  background: 'rgba(77, 77, 255, 0.1)',
                  padding: '1rem 3rem',
                  borderRadius: '50px',
                  color: 'white',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  border: '1px solid rgba(77, 77, 255, 0.5)',
                  boxShadow:
                    '0 0 20px rgba(77, 77, 255, 0.2), inset 0 0 10px rgba(77, 77, 255, 0.1)',
                  backdropFilter: 'blur(5px)',
                  transition: 'all 0.3s ease',
                }}
              >
                Send Message{' '}
                <Send
                  size={18}
                  color='#bc13fe'
                />
              </div>
            </MagneticButton>
          </div>
        </form>
      </div>

      <style jsx>{`
        .glass-input {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 1rem 1.25rem;
          border-radius: 12px;
          color: white;
          font-size: 1rem;
          outline: none;
          transition: all 0.3s ease;
        }
        .glass-input:focus {
          border-color: #4d4dff;
          background: rgba(255, 255, 255, 0.05);
          box-shadow: 0 0 15px rgba(77, 77, 255, 0.1);
        }
      `}</style>
    </section>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useRevealOnScroll } from '@/components/utils/useRevealOnScroll';

const LINKS = [
  { href: '#experience', label: 'Experience', id: 'experience' },
  { href: '#projects', label: 'Projects', id: 'projects' },
  { href: '#skills', label: 'Skills', id: 'skills' },
  { href: '#about', label: 'About', id: 'about' },
  { href: '#contact', label: 'Contact', id: 'contact' },
];

export default function Nav() {
  const [active, setActive] = useState<string>('');
  const [open, setOpen] = useState(false);

  // Global scroll-reveal for .az-reveal across all sections.
  useRevealOnScroll();

  // Scroll-spy: highlight the nav link of the section in view.
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('section[id]');
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) setActive(en.target.id);
        });
      },
      { threshold: 0.5 }
    );
    sections.forEach((s) => spy.observe(s));
    return () => spy.disconnect();
  }, []);

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backdropFilter: 'blur(16px)',
        background: 'rgba(9,9,10,0.62)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div
        style={{
          maxWidth: 1180,
          margin: '0 auto',
          height: 68,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        className='px-5 md:px-8'
      >
        <a
          href='#top'
          onClick={() => setOpen(false)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            textDecoration: 'none',
            flexShrink: 0,
          }}
        >
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 34,
              height: 34,
              border: '1px solid rgba(255,255,255,0.16)',
              borderRadius: 9,
              fontFamily: 'var(--font-display)',
              fontWeight: 600,
              fontSize: 15,
              color: 'var(--color-fg)',
            }}
          >
            AZ
          </span>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 500,
              fontSize: 15,
              color: 'var(--color-fg)',
              letterSpacing: '-0.01em',
            }}
          >
            Abdul Azis
          </span>
        </a>

        {/* Desktop links */}
        <div className='hidden items-center gap-7 md:flex'>
          {LINKS.map((l) => (
            <a
              key={l.id}
              href={l.href}
              className='az-navlink'
              style={active === l.id ? { color: 'var(--color-fg)' } : undefined}
            >
              {l.label}
            </a>
          ))}
          <a
            href='/resume.pdf'
            target='_blank'
            rel='noopener noreferrer'
            className='az-btn'
            style={{ fontSize: 13.5, padding: '9px 17px', borderRadius: 9 }}
          >
            Resume
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          type='button'
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className='az-icon-btn md:hidden'
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile dropdown panel */}
      {open && (
        <div
          className='md:hidden'
          style={{
            borderTop: '1px solid rgba(255,255,255,0.06)',
            background: 'rgba(9,9,10,0.92)',
            backdropFilter: 'blur(16px)',
            padding: '14px 20px 22px',
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
          }}
        >
          {LINKS.map((l) => (
            <a
              key={l.id}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{
                textDecoration: 'none',
                fontSize: 16,
                padding: '12px 4px',
                color: active === l.id ? 'var(--color-fg)' : 'rgba(255,255,255,0.6)',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
              }}
            >
              {l.label}
            </a>
          ))}
          <a
            href='/resume.pdf'
            target='_blank'
            rel='noopener noreferrer'
            onClick={() => setOpen(false)}
            className='az-btn'
            style={{ marginTop: 12, justifyContent: 'center' }}
          >
            Resume
          </a>
        </div>
      )}
    </nav>
  );
}

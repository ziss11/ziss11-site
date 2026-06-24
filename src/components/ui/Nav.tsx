'use client';

import { useEffect, useState } from 'react';
import { useRevealOnScroll } from '@/components/utils/useRevealOnScroll';

const LINKS = [
  { href: '#experience', label: 'Experience', id: 'experience' },
  { href: '#projects', label: 'Projects', id: 'projects' },
  { href: '#skills', label: 'Skills', id: 'skills' },
  { href: '#about', label: 'About', id: 'about' },
];

export default function Nav() {
  const [active, setActive] = useState<string>('');

  // Global scroll-reveal for [data-reveal] across all sections.
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
          padding: '0 32px',
          height: 68,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <a
          href='#top'
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            textDecoration: 'none',
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

        <div
          style={{ display: 'flex', alignItems: 'center', gap: 30 }}
          className='max-md:hidden'
        >
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
      </div>
    </nav>
  );
}

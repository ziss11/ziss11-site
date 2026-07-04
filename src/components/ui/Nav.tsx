'use client';

import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useRevealOnScroll } from '@/components/utils/useRevealOnScroll';

const LINKS = [
  { href: '#work', label: 'Work', id: 'work' },
  { href: '#stack', label: 'Stack', id: 'stack' },
  { href: '#experience', label: 'Experience', id: 'experience' },
  { href: '#contact', label: 'Contact', id: 'contact' },
];

export default function Nav() {
  const [active, setActive] = useState<string>('');
  const [open, setOpen] = useState(false);

  useRevealOnScroll();

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('section[id]');
    const visible = new Set<string>();
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) visible.add(en.target.id);
          else visible.delete(en.target.id);
        });
        const top = LINKS.find((l) => visible.has(l.id));
        setActive(top ? top.id : '');
      },
      { threshold: 0.4 }
    );
    sections.forEach((s) => spy.observe(s));
    return () => spy.disconnect();
  }, []);

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backdropFilter: 'blur(14px)',
        background: 'rgba(18,18,18,0.72)',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          height: 62,
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
            gap: 11,
            textDecoration: 'none',
            flexShrink: 0,
          }}
        >
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 30,
              height: 30,
              border: '1px solid var(--color-border-strong)',
              borderRadius: 8,
              fontWeight: 600,
              fontSize: 13,
              letterSpacing: '-0.02em',
              color: 'var(--color-fg-strong)',
            }}
          >
            AZ
          </span>
          <span
            style={{
              fontWeight: 500,
              fontSize: 14.5,
              color: 'var(--color-fg-strong)',
              letterSpacing: '-0.015em',
            }}
          >
            Abdul Azis
          </span>
        </a>

        <div className='hidden items-center gap-7 md:flex'>
          {LINKS.map((l) => (
            <a
              key={l.id}
              href={l.href}
              className='az-navlink'
              style={
                active === l.id ? { color: 'var(--color-fg-strong)' } : undefined
              }
            >
              {l.label}
            </a>
          ))}
          <a
            href='/resume.pdf'
            target='_blank'
            rel='noopener noreferrer'
            className='az-btn'
            style={{ fontSize: 13, padding: '8px 15px' }}
          >
            Résumé
          </a>
        </div>

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

      {open && (
        <div
          className='md:hidden'
          style={{
            borderTop: '1px solid var(--color-border)',
            background: 'rgba(18,18,18,0.96)',
            backdropFilter: 'blur(14px)',
            padding: '12px 20px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          {LINKS.map((l) => (
            <a
              key={l.id}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{
                textDecoration: 'none',
                fontSize: 15.5,
                padding: '11px 4px',
                color:
                  active === l.id ? 'var(--color-fg-strong)' : 'var(--color-muted)',
                borderBottom: '1px solid var(--color-border)',
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
            Résumé
          </a>
        </div>
      )}
    </nav>
  );
}

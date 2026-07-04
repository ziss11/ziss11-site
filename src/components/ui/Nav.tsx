'use client';

import { useEffect, useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
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
  const [scrolled, setScrolled] = useState(false);

  useRevealOnScroll();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      { threshold: 0.35 }
    );
    sections.forEach((s) => spy.observe(s));
    return () => spy.disconnect();
  }, []);

  return (
    <header
      style={{
        position: 'sticky',
        top: 16,
        zIndex: 50,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        padding: '0 24px',
        pointerEvents: 'none',
      }}
    >
      <nav
        style={{
          width: '100%',
          maxWidth: 1200,
          background: scrolled
            ? 'rgba(10, 10, 20, 0.75)'
            : 'rgba(13, 13, 23, 0.45)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: 99,
          height: 56,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 8px 0 20px',
          pointerEvents: 'auto',
          boxShadow: scrolled
            ? '0 12px 40px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
            : '0 8px 24px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.03)',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Brand Logo */}
        <a
          href='#top'
          onClick={() => setOpen(false)}
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
              width: 32,
              height: 32,
              border: '1.5px solid transparent',
              background: 'linear-gradient(var(--color-bg), var(--color-bg)) padding-box, linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-cyan) 100%) border-box',
              borderRadius: '50%',
              fontWeight: 700,
              fontSize: 12,
              fontFamily: 'var(--font-mono)',
              color: 'var(--color-fg-strong)',
              boxShadow: '0 2px 8px rgba(99, 102, 241, 0.2)',
            }}
          >
            AZ
          </span>
          <span
            style={{
              fontWeight: 600,
              fontSize: 14.5,
              color: 'var(--color-fg-strong)',
              letterSpacing: '-0.02em',
            }}
            className='hidden sm:inline'
          >
            Abdul Azis
          </span>
        </a>

        {/* Desktop Links */}
        <div className='hidden items-center gap-2 md:flex'>
          {LINKS.map((l) => (
            <a
              key={l.id}
              href={l.href}
              className='az-navlink'
              style={
                active === l.id
                  ? {
                      color: 'var(--color-fg-strong)',
                      background: 'rgba(255, 255, 255, 0.06)',
                    }
                  : undefined
              }
            >
              {l.label}
            </a>
          ))}
          <div
            style={{
              width: 1,
              height: 18,
              background: 'var(--color-border)',
              margin: '0 8px',
            }}
          />
          <a
            href='/resume.pdf'
            target='_blank'
            rel='noopener noreferrer'
            className='az-btn'
            style={{
              fontSize: 13,
              padding: '6px 14px',
              borderRadius: 99,
              height: 38,
            }}
          >
            Résumé
            <ArrowUpRight size={13} style={{ opacity: 0.8 }} />
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          type='button'
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className='az-icon-btn md:hidden'
          style={{
            borderRadius: '50%',
            width: 40,
            height: 40,
            border: 'none',
            background: 'transparent',
          }}
        >
          {open ? <X size={18} style={{ color: 'var(--color-fg-strong)' }} /> : <Menu size={18} />}
        </button>

        {/* Mobile Dropdown Drawer */}
        {open && (
          <div
            className='md:hidden'
            style={{
              position: 'absolute',
              top: 68,
              left: 0,
              right: 0,
              background: 'rgba(10, 10, 20, 0.95)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: 24,
              padding: '16px 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
              boxShadow: '0 20px 48px rgba(0, 0, 0, 0.6)',
              zIndex: 49,
            }}
          >
            {LINKS.map((l) => (
              <a
                key={l.id}
                href={l.href}
                onClick={() => setOpen(false)}
                style={{
                  textDecoration: 'none',
                  fontSize: 15,
                  fontWeight: 500,
                  padding: '12px 16px',
                  color:
                    active === l.id ? 'var(--color-fg-strong)' : 'var(--color-muted)',
                  background: active === l.id ? 'rgba(255, 255, 255, 0.04)' : 'transparent',
                  borderRadius: 12,
                  transition: 'all 0.2s',
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
              style={{
                marginTop: 8,
                justifyContent: 'center',
                borderRadius: 16,
                padding: '12px',
              }}
            >
              Résumé
              <ArrowUpRight size={15} />
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}

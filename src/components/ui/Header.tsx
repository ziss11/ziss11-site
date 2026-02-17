'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useLenis } from 'lenis/react';

const navItems = [
  { label: 'Home', href: 'hero' },
  { label: 'Experience', href: 'experience' },
  { label: 'Projects', href: 'projects' },
  { label: 'Skills', href: 'skills' },
  { label: 'About', href: 'about' },
  { label: 'Contact', href: 'contact' },
];

const sectionIds = ['hero', 'experience', 'projects', 'skills', 'about', 'contact'];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const lenis = useLenis();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.3, rootMargin: '-80px 0px 0px 0px' }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    lenis?.scrollTo(el, { offset: -72, duration: 1.4, easing: (t) => 1 - Math.pow(1 - t, 4) });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-2 glass-strong border-b border-border-default shadow-[0_4px_20px_rgba(0,0,0,0.5)]'
          : 'py-4 bg-transparent'
      }`}
    >
      <div className='max-w-[1200px] mx-auto px-[5%] flex items-center justify-between'>
        {/* Logo + Name */}
        <button
          onClick={() => scrollTo('hero')}
          className='flex items-center gap-3 cursor-pointer bg-transparent border-none group'
        >
          <div className='w-8 h-8 relative rounded-lg overflow-hidden border border-accent-green/30 group-hover:border-accent-green/60 transition-colors duration-200'>
            <Image
              src='/logo.png'
              alt='Logo'
              fill
              className='object-cover'
              priority
            />
          </div>
          <span className='font-mono text-[0.9rem] font-semibold text-text-primary group-hover:text-accent-green transition-colors duration-200'>
            Abdul Azis
          </span>
        </button>

        {/* Nav Links - hidden on mobile */}
        <nav className='hidden md:flex items-center gap-6'>
          {navItems.map((item) => {
            const isActive = activeSection === item.href;
            return (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className={`font-mono text-[0.8rem] bg-transparent border-none cursor-pointer transition-colors duration-200 ${
                  isActive
                    ? 'text-accent-green'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Resume Button */}
        <a
          href='/resume.pdf'
          target='_blank'
          rel='noopener noreferrer'
          className='btn-terminal text-[0.8rem] hover:text-accent-green hover:border-accent-green'
        >
          Resume
        </a>
      </div>
    </header>
  );
}

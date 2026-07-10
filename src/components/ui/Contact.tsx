'use client';

import type { Contact as ContactInfo } from '@/data/content';
import {
  Check,
  Copy,
  Github,
  Linkedin,
  Mail,
  MessageSquare,
} from 'lucide-react';
import { useState } from 'react';

export default function Contact({ contact }: { contact: ContactInfo }) {
  const [copied, setCopied] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  const copyEmail = () => {
    try {
      navigator.clipboard.writeText(contact.email);
    } catch {
      /* clipboard unavailable */
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const linkedinLabel = (url: string): string => {
    const m = url.match(/linkedin\.com\/(.+?)\/?$/i);
    return m
      ? `linkedin.com/${m[1]}`
      : url.replace(/^https?:\/\//, '').replace(/\/$/, '');
  };

  const githubLabel = (url: string): string => {
    return url.replace(/^https?:\/\//, '').replace(/\/$/, '');
  };

  // Styles
  const cardStyle = (
    id: string,
    activeHoverBg: string,
    activeHoverBorder: string,
  ): React.CSSProperties => {
    const isHovered = hovered === id;
    return {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      padding: '28px',
      textDecoration: 'none',
      textAlign: 'left',
      fontFamily: 'inherit',
      cursor: 'pointer',
      background: isHovered ? activeHoverBg : 'var(--color-surface)',
      borderColor: isHovered ? activeHoverBorder : 'var(--color-border)',
      transform: isHovered ? 'translateY(-3px)' : 'translateY(0)',
      boxShadow: isHovered
        ? '0 12px 30px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.06)'
        : '0 4px 20px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.04)',
      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
    };
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: 'var(--font-mono)',
    fontSize: 10.5,
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    color: 'var(--color-faint)',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  };

  const valueStyle: React.CSSProperties = {
    fontSize: 17,
    fontWeight: 700,
    color: 'var(--color-fg-strong)',
    letterSpacing: '-0.02em',
  };

  const hintStyle = (
    isActive: boolean,
    activeColor: string,
  ): React.CSSProperties => ({
    fontSize: 12.5,
    color: isActive ? activeColor : 'var(--color-muted)',
    marginTop: 6,
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    transition: 'color 0.2s',
  });

  return (
    <section
      id='contact'
      style={{ padding: '100px 0 0', scrollMarginTop: 80 }}
    >
      <div className='bento'>
        {/* Title panel */}
        <div
          className='card card-pad az-reveal span-4'
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            background:
              'radial-gradient(circle at top left, rgba(74,127,192,0.06), transparent 50%), var(--color-surface)',
          }}
        >
          <span className='eyebrow'>
            <MessageSquare size={12} />
            Contact
          </span>
          <h2
            style={{
              fontWeight: 800,
              fontSize: 'clamp(28px, 2.8vw, 36px)',
              letterSpacing: '-0.04em',
              lineHeight: 1.1,
              margin: '14px 0 0',
              color: 'var(--color-fg-strong)',
            }}
          >
            Let&apos;s build something great.
          </h2>
          <p
            style={{
              fontSize: 14.5,
              lineHeight: 1.6,
              color: 'var(--color-muted)',
              margin: '14px 0 0',
            }}
          >
            Have a project in mind, want to discuss architectures, or just say
            hello? Reach out.
          </p>
        </div>

        {/* Email Copy Card */}
        <button
          type='button'
          onClick={copyEmail}
          className='az-card az-reveal span-8'
          style={cardStyle(
            'email',
            'rgba(74, 127, 192, 0.06)',
            'rgba(74, 127, 192, 0.3)',
          )}
          onMouseEnter={() => setHovered('email')}
          onMouseLeave={() => setHovered(null)}
        >
          <span style={labelStyle}>
            <Mail
              size={12}
              style={{ color: 'var(--color-accent)' }}
            />
            Direct Email
          </span>
          <span style={valueStyle}>{contact.email}</span>
          <span style={hintStyle(copied, 'var(--color-ok)')}>
            {copied ? (
              <>
                <Check size={14} />
                Copied to clipboard
              </>
            ) : (
              <>
                <Copy size={13} />
                Click to copy address
              </>
            )}
          </span>
        </button>

        {/* LinkedIn Link Card */}
        <a
          href={contact.linkedinUrl}
          target='_blank'
          rel='noopener noreferrer'
          className='az-card az-reveal span-6'
          style={cardStyle(
            'linkedin',
            'rgba(74, 127, 192, 0.06)',
            'rgba(74, 127, 192, 0.3)',
          )}
          onMouseEnter={() => setHovered('linkedin')}
          onMouseLeave={() => setHovered(null)}
        >
          <span style={labelStyle}>
            <Linkedin
              size={12}
              style={{ color: 'var(--color-accent)' }}
            />
            LinkedIn
          </span>
          <span style={valueStyle}>{linkedinLabel(contact.linkedinUrl)}</span>
          <span
            style={hintStyle(hovered === 'linkedin', 'var(--color-fg-strong)')}
          >
            Connect on LinkedIn →
          </span>
        </a>

        {/* GitHub Link Card */}
        <a
          href={contact.githubUrl}
          target='_blank'
          rel='noopener noreferrer'
          className='az-card az-reveal span-6'
          style={cardStyle(
            'github',
            'rgba(74, 127, 192, 0.06)',
            'rgba(74, 127, 192, 0.3)',
          )}
          onMouseEnter={() => setHovered('github')}
          onMouseLeave={() => setHovered(null)}
        >
          <span style={labelStyle}>
            <Github
              size={12}
              style={{ color: 'var(--color-accent)' }}
            />
            GitHub Profile
          </span>
          <span style={valueStyle}>{githubLabel(contact.githubUrl)}</span>
          <span
            style={hintStyle(hovered === 'github', 'var(--color-fg-strong)')}
          >
            Follow development projects →
          </span>
        </a>
      </div>
    </section>
  );
}

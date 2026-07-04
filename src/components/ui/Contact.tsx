'use client';

import { useState } from 'react';
import type { Contact as ContactInfo } from '@/data/content';
import SectionKicker from './SectionKicker';

const cardStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 7,
  padding: 24,
  textDecoration: 'none',
  textAlign: 'left',
  fontFamily: 'inherit',
};

const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: 11,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'var(--color-faint)',
};

const valueStyle: React.CSSProperties = {
  fontSize: 16,
  fontWeight: 500,
  color: 'var(--color-fg-strong)',
  letterSpacing: '-0.01em',
};

const hintStyle: React.CSSProperties = {
  fontSize: 12.5,
  color: 'var(--color-muted)',
  marginTop: 2,
};

function linkedinLabel(url: string): string {
  const m = url.match(/linkedin\.com\/(.+?)\/?$/i);
  return m ? m[1] : url.replace(/^https?:\/\//, '').replace(/\/$/, '');
}

function githubLabel(url: string): string {
  return url.replace(/^https?:\/\//, '').replace(/\/$/, '');
}

export default function Contact({ contact }: { contact: ContactInfo }) {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    try {
      navigator.clipboard.writeText(contact.email);
    } catch {
      /* clipboard unavailable */
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1700);
  };

  return (
    <section
      id='contact'
      style={{ padding: '90px 0 0', scrollMarginTop: 80 }}
    >
      <div className='bento'>
        <div
          className='card card-pad az-reveal span-4'
          style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
        >
          <p className='eyebrow' style={{ margin: '0 0 16px' }}>
            Contact
          </p>
          <h2
            style={{
              fontWeight: 600,
              fontSize: 'clamp(26px,3vw,36px)',
              letterSpacing: '-0.03em',
              lineHeight: 1.08,
              margin: 0,
              color: 'var(--color-fg-strong)',
            }}
          >
            Let&apos;s build something great.
          </h2>
          <p
            style={{
              fontSize: 15,
              lineHeight: 1.6,
              color: 'var(--color-muted)',
              margin: '14px 0 0',
            }}
          >
            Have a project in mind or just want to say hello? My inbox is always
            open.
          </p>
        </div>

        <button
          type='button'
          onClick={copyEmail}
          className='az-card az-reveal span-8'
          style={{ ...cardStyle, cursor: 'pointer', justifyContent: 'center' }}
        >
          <span style={labelStyle}>Email</span>
          <span style={valueStyle}>{contact.email}</span>
          <span
            style={{
              ...hintStyle,
              color: copied ? 'var(--color-ok)' : hintStyle.color,
              transition: 'color 0.2s',
            }}
          >
            {copied ? 'Copied to clipboard' : 'Click to copy'}
          </span>
        </button>

        <a
          href={contact.linkedinUrl}
          target='_blank'
          rel='noopener noreferrer'
          className='az-card az-reveal span-6'
          style={cardStyle}
        >
          <span style={labelStyle}>LinkedIn</span>
          <span style={valueStyle}>{linkedinLabel(contact.linkedinUrl)}</span>
          <span style={hintStyle}>Connect →</span>
        </a>

        <a
          href={contact.githubUrl}
          target='_blank'
          rel='noopener noreferrer'
          className='az-card az-reveal span-6'
          style={cardStyle}
        >
          <span style={labelStyle}>GitHub</span>
          <span style={valueStyle}>{githubLabel(contact.githubUrl)}</span>
          <span style={hintStyle}>Follow →</span>
        </a>
      </div>
    </section>
  );
}

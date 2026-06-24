'use client';

import { useState } from 'react';
import type { Contact as ContactInfo } from '@/data/content';
import SectionKicker from './SectionKicker';

const cardStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  padding: 26,
  borderRadius: 16,
  textDecoration: 'none',
  textAlign: 'left',
  fontFamily: 'inherit',
};

const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: 11,
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.42)',
};

const valueStyle: React.CSSProperties = {
  fontFamily: 'var(--font-display)',
  fontSize: 18,
  color: 'var(--color-fg)',
  letterSpacing: '-0.01em',
};

const hintStyle: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: 12,
  color: 'rgba(255,255,255,0.4)',
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
    <section id='contact' style={{ padding: '104px 0 64px' }}>
      <div className='az-reveal'>
        <SectionKicker num='05' label='Contact' />
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            fontSize: 'clamp(38px,6vw,82px)',
            letterSpacing: '-0.035em',
            lineHeight: 0.98,
            margin: '0 0 18px',
            color: 'var(--color-fg-strong)',
          }}
        >
          Let&apos;s build
          <br />
          something great.
        </h2>
        <p
          style={{
            fontSize: 18,
            color: 'rgba(255,255,255,0.55)',
            margin: '0 0 52px',
            maxWidth: 520,
          }}
        >
          Have a project in mind or just want to say hello? My inbox is always
          open.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))',
            gap: 16,
          }}
        >
          <button
            type='button'
            onClick={copyEmail}
            className='az-card'
            style={{ ...cardStyle, cursor: 'pointer' }}
          >
            <span style={labelStyle}>Email</span>
            <span style={valueStyle}>{contact.email}</span>
            <span
              style={{
                ...hintStyle,
                color: copied ? 'var(--color-accent)' : hintStyle.color,
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
            className='az-card'
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
            className='az-card'
            style={cardStyle}
          >
            <span style={labelStyle}>GitHub</span>
            <span style={valueStyle}>{githubLabel(contact.githubUrl)}</span>
            <span style={hintStyle}>Follow →</span>
          </a>
        </div>
      </div>
    </section>
  );
}

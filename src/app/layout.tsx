import type { Metadata } from 'next';
import { type ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Abdul Azis | Software Engineer',
    template: '%s | Abdul Azis',
  },
  description:
    'Software Engineer specializing in full-stack web and mobile development — Flutter, React, Next.js, and clean, scalable architecture.',
  keywords: [
    'Software Engineer',
    'Full-Stack Developer',
    'Flutter Developer',
    'React Developer',
    'Next.js Developer',
    'Abdul Azis',
    'ziss11',
    'Web Development',
    'Mobile App Development',
    'Backend Development',
  ],
  authors: [{ name: 'Abdul Azis', url: 'https://github.com/ziss11' }],
  creator: 'Abdul Azis',
  publisher: 'Abdul Azis',
  metadataBase: new URL('https://ziss11.vercel.app'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ziss11.vercel.app',
    siteName: 'Abdul Azis Portfolio',
    title: 'Abdul Azis | Software Engineer',
    description:
      'Software Engineer specializing in full-stack web and mobile development.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Abdul Azis - Software Engineer',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/icon.svg',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  alternates: {
    canonical: 'https://ziss11.vercel.app',
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang='en'>
      <body className='font-sans'>{children}</body>
    </html>
  );
}

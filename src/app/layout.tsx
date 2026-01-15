import type { Metadata } from 'next';
import { Outfit, Space_Grotesk } from 'next/font/google';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-main',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Abdul Azis | Senior Mobile Engineer',
    template: '%s | Abdul Azis',
  },
  description:
    'Senior Mobile Engineer specializing in Flutter, iOS, and Android development. Building high-performance, offline-first mobile applications with 60fps UI.',
  keywords: [
    'Mobile Engineer',
    'Flutter Developer',
    'iOS Developer',
    'Android Developer',
    'Senior Software Engineer',
    'Abdul Azis',
    'ziss11',
    'Mobile App Development',
    'Cross-Platform Development',
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
    title: 'Abdul Azis | Senior Mobile Engineer',
    description:
      'Senior Mobile Engineer specializing in Flutter, iOS, and Android development.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Abdul Azis - Senior Mobile Engineer',
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
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
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
  children: React.ReactNode;
}) {
  return (
    <html
      lang='en'
      className={`${outfit.variable} ${spaceGrotesk.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}

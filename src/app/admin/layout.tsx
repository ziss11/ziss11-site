import type { Metadata } from 'next';
import { type ReactNode } from 'react';
import TerminalBackground from '@/components/ui/TerminalBackground';

export const metadata: Metadata = {
  title: 'Admin',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className='relative min-h-screen bg-bg-primary text-text-primary'>
      <TerminalBackground />
      <div className='relative z-10'>{children}</div>
    </div>
  );
}

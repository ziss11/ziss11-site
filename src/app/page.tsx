'use client';

import About from '@/components/ui/About';
import BentoGrid from '@/components/ui/BentoGrid';
import ExperienceTimeline from '@/components/ui/ExperienceTimeline';
import GithubActivity from '@/components/ui/GithubActivity';
import Hero from '@/components/ui/Hero';
import PerformanceMetrics from '@/components/ui/PerformanceMetrics';
import Projects from '@/components/ui/Projects';
import TerminalBackground from '@/components/ui/TerminalBackground';
import LenisWrapper from '@/components/utils/LenisWrapper';

export default function Home() {
  return (
    <LenisWrapper>
      <main
        className='relative w-full overflow-x-hidden'
        style={{ background: '#000000' }}
      >
        {/* <TerminalBackground /> */}
        <div style={{ position: 'absolute', zIndex: 0 }}>
          <TerminalBackground />
        </div>
        {/* Content Sections */}
        <Hero />
        <About />
        <ExperienceTimeline />
        <Projects />
        <BentoGrid />
        <PerformanceMetrics />
        <GithubActivity />
        <footer
          style={{
            padding: '2rem',
            textAlign: 'center',
            opacity: 0.3,
            fontSize: '0.8rem',
            color: '#fff',
            marginBottom: '1rem',
            fontFamily: 'var(--font-mono)',
          }}
        >
          © {new Date().getFullYear()} Zis.
        </footer>
      </main>
    </LenisWrapper>
  );
}

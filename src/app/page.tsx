import About from '@/components/ui/About';
import Contact from '@/components/ui/Contact';
import Experience from '@/components/ui/Experience';
import Footer from '@/components/ui/Footer';
import Hero from '@/components/ui/Hero';
import Motion from '@/components/ui/Motion';
import Nav from '@/components/ui/Nav';
import Projects from '@/components/ui/Projects';
import Skills from '@/components/ui/Skills';
import { getContact, getExperiences, getProjects } from '@/lib/content-db';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const [experiences, projects, contact] = await Promise.all([
    getExperiences(),
    getProjects(),
    getContact(),
  ]);

  return (
    <div
      style={{
        position: 'relative',
        background: 'var(--color-bg)',
        minHeight: '100vh',
      }}
    >
      <div className='ambient' aria-hidden />
      <Motion />
      <Nav />
      <main
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 24px 40px',
        }}
      >
        <Hero />
        <Projects projects={projects} />
        <Skills />
        <Experience experiences={experiences} />
        <About />
        <Contact contact={contact} />
      </main>
      <Footer />
    </div>
  );
}

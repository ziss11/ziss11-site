import Nav from "@/components/ui/Nav";
import Hero from "@/components/ui/Hero";
import Experience from "@/components/ui/Experience";
import Projects from "@/components/ui/Projects";
import Skills from "@/components/ui/Skills";
import About from "@/components/ui/About";
import Contact from "@/components/ui/Contact";
import Footer from "@/components/ui/Footer";
import { getContact, getExperiences, getProjects } from "@/lib/content-db";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [experiences, projects, contact] = await Promise.all([
    getExperiences(),
    getProjects(),
    getContact(),
  ]);

  return (
    <div
      style={{
        position: "relative",
        background: "var(--color-bg)",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      {/* Full-bleed hero glow — sits behind content so it fades smoothly to the
          page background instead of being clipped at the 1180px container. */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 820,
          background:
            "radial-gradient(900px 620px at 72% -60px, rgba(196,242,74,0.10), transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <Nav />
      <main
        id="top"
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1180,
          margin: "0 auto",
          padding: "0 32px",
        }}
      >
        <Hero />
        <Experience experiences={experiences} />
        <Projects projects={projects} />
        <Skills />
        <About />
        <Contact contact={contact} />
      </main>
      <Footer />
    </div>
  );
}

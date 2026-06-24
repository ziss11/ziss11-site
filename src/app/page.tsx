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
    <div style={{ background: "var(--color-bg)", minHeight: "100vh" }}>
      <Nav />
      <main
        id="top"
        style={{ maxWidth: 1180, margin: "0 auto", padding: "0 32px" }}
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

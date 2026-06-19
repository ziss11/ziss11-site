import About from "@/components/ui/About";
import BentoGrid from "@/components/ui/BentoGrid";
import ContactTerminal from "@/components/ui/ContactTerminal";
import ExperienceTimeline from "@/components/ui/ExperienceTimeline";
import GithubActivity from "@/components/ui/GithubActivity";
import Header from "@/components/ui/Header";
import Hero from "@/components/ui/Hero";
import PerformanceMetrics from "@/components/ui/PerformanceMetrics";
import Projects from "@/components/ui/Projects";
import TerminalBackground from "@/components/ui/TerminalBackground";
import LenisWrapper from "@/components/utils/LenisWrapper";
import { getExperiences, getProjects } from "@/lib/blob-content";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [experiences, projects] = await Promise.all([
    getExperiences(),
    getProjects(),
  ]);

  return (
    <LenisWrapper>
      <Header />
      <main className="absolute w-full overflow-x-hidden">
        <TerminalBackground />
        {/* Content Sections */}
        <Hero />
        <ExperienceTimeline experiences={experiences} />
        <Projects projects={projects} />
        <BentoGrid />
        <PerformanceMetrics />
        <GithubActivity />
        <About />
        <ContactTerminal />
        <footer
          style={{
            padding: "2rem",
            textAlign: "center",
            opacity: 0.3,
            fontSize: "0.8rem",
            color: "#fff",
            marginBottom: "1rem",
            fontFamily: "var(--font-mono)",
          }}
        >
          © {new Date().getFullYear()} Abdul Azis.
        </footer>
      </main>
    </LenisWrapper>
  );
}

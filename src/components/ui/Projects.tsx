'use client';

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { Github, X } from 'lucide-react';
import { useRef, useState } from 'react';

const AndroidIcon = ({ size = 20, color = 'currentColor' }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    stroke={color}
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <path d='M4 10l0 6' />
    <path d='M20 10l0 6' />
    <path d='M7 9h10v8a1 1 0 0 1 -1 1h-8a1 1 0 0 1 -1 -1v-8a5 5 0 0 1 10 0' />
    <path d='M8 3l1 2' />
    <path d='M16 3l-1 2' />
    <path d='M9 18l0 3' />
    <path d='M15 18l0 3' />
  </svg>
);

const AppleIcon = ({ size = 20, color = 'currentColor' }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    stroke={color}
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <path d='M9 7c-3 0 -4 3 -4 5.5c0 3 2 7.5 4 7.5c1.088 -.046 1.679 -.5 3 -.5c1.312 0 1.5 .5 3 .5s4 -3 4 -5c-.028 -.01 -2.472 -.403 -2.5 -3c-.019 -2.17 2.416 -2.954 2.5 -3c-1.023 -1.492 -2.956 -1.967 -4 -2c-1.427 -.045 -2.5 .5 -3 .5c-.5 0 -1.573 -.54 -3 -.5z' />
    <path d='M12 4a2 2 0 0 0 2 -2a2 2 0 0 0 -2 2' />
  </svg>
);

const ProjectModal = ({
  project,
  onClose,
}: {
  project: (typeof projects)[0];
  onClose: () => void;
}) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onClick={onClose}
    className='fixed inset-0 bg-black/60 backdrop-blur-sm z-[1000] flex items-center justify-center p-5'
  >
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      onClick={(e) => e.stopPropagation()}
      className='bg-[#05050a]/95 border border-accent-green/20 p-8 rounded-[24px] max-w-[500px] w-[90%] relative shadow-[0_0_40px_rgba(126,231,135,0.1)]'
    >
      <button
        onClick={onClose}
        className='absolute top-5 right-5 bg-none border-none text-[#888] cursor-pointer hover:text-white transition-colors'
      >
        <X size={24} />
      </button>

      <h3 className='text-[1.5rem] mb-2 text-white'>{project.title}</h3>
      <p className='text-[#888] mb-8'>Check out the project</p>

      <div className='grid gap-4'>
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center gap-3 p-3 px-5 bg-accent-green/5 border border-accent-green/20 rounded-xl text-text-primary no-underline transition-all hover:bg-accent-green/10'
          >
            <Github size={22} />
            <span>View Source Code</span>
          </a>
        )}
        {project.playStoreUrl && (
          <a
            href={project.playStoreUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center gap-3 p-3 px-5 bg-accent-green/5 border border-accent-green/20 rounded-xl text-text-primary no-underline transition-all hover:bg-accent-green/10'
          >
            <AndroidIcon
              size={24}
              color='#fff'
            />
            <span>Get on Play Store</span>
          </a>
        )}
        {project.appStoreUrl && (
          <a
            href={project.appStoreUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center gap-3 p-3 px-5 bg-accent-green/5 border border-accent-green/20 rounded-xl text-text-primary no-underline transition-all hover:bg-accent-green/10'
          >
            <AppleIcon
              size={22}
              color='#fff'
            />
            <span>Download on App Store</span>
          </a>
        )}
      </div>
    </motion.div>
  </motion.div>
);

const projects = [
  {
    title: 'Omnisource',
    category: 'SaaS Platform',
    tech: 'Flutter, SaaS, Real-time Operations',
    description:
      'A web & mobile SaaS platform helping outsourcing companies manage operations centrally and in real-time.',
    playStoreUrl:
      'https://play.google.com/store/apps/details?id=com.omnisource.app',
    appStoreUrl: 'https://apps.apple.com/id/app/omnisource/id6756401381',
  },
  {
    title: 'Baharkam Information Gateway',
    category: 'Government Security',
    tech: 'Mobile Security, Digital Gateway',
    description:
      'Comprehensive digital solution supporting operational duties of the National Police Security Maintenance Agency.',
    playStoreUrl:
      'https://play.google.com/store/apps/details?id=com.baharkam.big',
    appStoreUrl:
      'https://apps.apple.com/id/app/baharkam-information-gateway/id6749742831',
  },
  {
    title: 'Portal Humas Presisi',
    category: 'News & Public Relations',
    tech: 'Flutter, News Aggregation',
    description:
      'Official Police PR portal providing exclusive access to law enforcement news and activities across the country.',
    playStoreUrl:
      'https://play.google.com/store/apps/details?id=id.go.polri.portalhumas.portal_humas_flutter',
    appStoreUrl: 'https://apps.apple.com/id/app/portal-humas/id6477856986',
  },
  {
    title: 'Ditonton Movie App',
    category: 'Flutter / Dart',
    tech: 'BLoC, Clean Architecture, CI/CD, TDD',
    description:
      'Expert-level Movie App submission for Dicoding. Features strict type safety, unit testing, and modular architecture.',
    githubUrl: 'https://github.com/ziss11/ditonton-app',
  },
  {
    title: 'Jetpack Compose Movie App',
    category: 'Android / Kotlin',
    tech: 'Jetpack Compose, MVVM, Hilt, Retrofit',
    description:
      'Modern Android movie application built entirely with Jetpack Compose. Showcase of declarative UI patterns.',
    githubUrl: 'https://github.com/ziss11/movie-comp',
  },
  {
    title: 'MyTelkomsel App Clone',
    category: 'Flutter / Dart',
    tech: 'Flutter UI, Custom Widgets, Responsive',
    description:
      'Pixel-perfect clone of the MyTelkomsel app interface. Demonstrates complex layout implementation and verified visual fidelity.',
    githubUrl: 'https://github.com/ziss11/mytelkomsel-clone-ui',
  },
  {
    title: 'Story App',
    category: 'Flutter / Dart',
    tech: 'Provider, Camera X, Google Maps API',
    description:
      'Intermediate flutter app allowing users to post stories with location data and camera integration.',
    githubUrl: 'https://github.com/ziss11/story-app',
  },
];

const ProjectCard = ({
  project,
  index,
  onClick,
}: {
  project: {
    title: string;
    category: string;
    tech: string;
    description: string;
    playStoreUrl?: string;
    appStoreUrl?: string;
    githubUrl?: string;
  };
  index: number;
  onClick: () => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    ['17.5deg', '-17.5deg']
  );
  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    ['-17.5deg', '17.5deg']
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className='perspective-[1000px] transform-3d'
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className='bg-[#05050a]/80 border border-accent-green/20 shadow-[0_4px_30px_rgba(0,0,0,0.4)] backdrop-blur-md rounded-2xl p-8 h-full flex flex-col justify-between cursor-pointer'
        whileHover={{
          scale: 1.02, // Less scale
          zIndex: 10,
          borderColor: 'rgba(126, 231, 135, 0.6)', // Brighter Green on hover
          background: 'rgba(5, 5, 10, 0.95)',
        }}
      >
        <div style={{ transform: 'translateZ(50px)' }}>
          {/* IDE Header Like */}
          <div className='text-text-secondary text-[0.75rem] font-medium mb-[0.8rem] flex items-center gap-2 overflow-hidden whitespace-nowrap'>
            <span className='text-accent-green'>root@portfolio</span>
            <span className='text-text-primary'>:</span>
            <span className='text-accent-blue'>~/projects</span>
            <span className='text-text-primary'>$</span>
            <span className='text-text-primary'>
              ./view {project.title.toLowerCase().replace(/\s+/g, '-')}
            </span>
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className='inline-block w-[6px] h-[1.2em] bg-accent-green align-middle'
            />
          </div>

          <h3 className='text-[1.4rem] mb-4 text-text-primary font-semibold'>
            {project.title}
          </h3>

          <div className='text-text-secondary leading-[1.6] text-[0.9rem] mb-6 italic'>
            {'//'} {project.description}
          </div>
        </div>

        <div
          style={{
            transform: 'translateZ(30px)',
          }}
          className='flex justify-between items-center mt-auto'
        >
          <div className='flex gap-2 flex-wrap text-[0.85rem] text-text-secondary'>
            <span className='text-accent-green'>[STACK]</span>
            {project.tech.split(', ').map((t: string, i, arr) => (
              <span key={t}>
                {t}
                {i < arr.length - 1 && ','}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<
    (typeof projects)[0] | null
  >(null);

  return (
    <section
      id='projects'
      className='py-24 px-[10%]'
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className='mb-16 text-center'
      >
        <h2 className='text-[2.5rem] mb-4 text-text-primary block'>
          Featured <span className='text-accent-green'>Projects</span>
        </h2>
        <p className='text-text-secondary max-w-[600px] mx-auto'>
          {'>'} Showcase of deployed applications impacting thousands of users.
        </p>
      </motion.div>

      <div className='grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-10'>
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            project={project}
            index={index}
            onClick={() => setSelectedProject(project)}
          />
        ))}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

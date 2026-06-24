export interface Experience {
  role: string;
  company: string;
  type: string;
  period: string;
  desc: string;
  tech: string[];
  side: 'left' | 'right';
}

export interface Project {
  title: string;
  category: string;
  tech: string;
  description: string;
  githubUrl?: string;
  playStoreUrl?: string;
  appStoreUrl?: string;
}

export interface Contact {
  email: string;
  linkedinUrl: string;
  githubUrl: string;
}

export interface SkillGroup {
  label: string;
  items: string[];
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    label: 'Architecture',
    items: [
      'Clean Architecture',
      'BLoC Pattern',
      'Dependency Injection',
      'Modular Routing',
      'MVVM',
    ],
  },
  { label: 'Languages', items: ['Dart 3.0', 'Kotlin 1.9', 'Swift 5.9', 'Python'] },
  {
    label: 'Frameworks',
    items: [
      'Flutter 3.x',
      'Jetpack Compose',
      'GetX',
      'Provider',
      'Hilt',
      'Retrofit',
      'TensorFlow',
    ],
  },
  { label: 'CI / CD', items: ['Codemagic', 'GitHub Actions'] },
  {
    label: 'Testing',
    items: ['Unit Testing', 'Widget Testing', 'Integration Testing', 'TDD'],
  },
];

export const DEFAULT_CONTACT: Contact = {
  email: 'ziss.dev@gmail.com',
  linkedinUrl: 'https://www.linkedin.com/in/abdazis11/',
  githubUrl: 'https://github.com/ziss11',
};

export const DEFAULT_EXPERIENCES: Experience[] = [
  {
    role: 'Sr. Mobile Engineer',
    company: 'PT Gamatecha Solusi Nusantara',
    type: 'Full-time',
    period: 'Jul 2024 - Present',
    desc: 'Leading mobile development, driving architectural decisions, and building scalable apps with complex API integrations.',
    tech: ['Flutter', 'Clean Arch', 'CI/CD', 'Rest API'],
    side: 'left',
  },
  {
    role: 'Software Engineer Trainee',
    company: 'ETHERVAL IT Consultancy',
    type: 'Contract',
    period: 'Oct 2023 - Dec 2023',
    desc: 'Gained hands-on experience in software engineering best practices.',
    tech: ['React', 'TypeScript', 'System Design'],
    side: 'right',
  },
  {
    role: 'Mobile Developer',
    company: 'Suitmedia Digital Agency',
    type: 'Internship',
    period: 'Feb 2023 - Jun 2023',
    desc: 'Developed hybrid e-commerce apps using Flutter & GetX. Researched chat modules.',
    tech: ['Flutter', 'GetX', 'Dart', 'E-commerce'],
    side: 'left',
  },
  {
    role: 'Machine Learning Cohort',
    company: 'Bangkit Academy',
    type: 'Apprenticeship',
    period: 'Feb 2022 - Jul 2022',
    desc: 'Led Capstone project with Indosat Ooredoo. Built ML models for translation.',
    tech: ['TensorFlow', 'Python', 'Machine Learning'],
    side: 'right',
  },
];

export const DEFAULT_PROJECTS: Project[] = [
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

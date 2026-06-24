export interface Experience {
  role: string;
  company: string;
  type: string;
  period: string;
  desc: string;
  tech: string[];
  side: "left" | "right";
}

export interface Project {
  title: string;
  category: string;
  tech: string;
  description: string;
  githubUrl?: string;
  playStoreUrl?: string;
  appStoreUrl?: string;
  /** ms epoch; newer = shown first. Optional for static fallback data. */
  createdAt?: number;
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
    label: "Architecture",
    items: [
      "Clean Architecture",
      "BLoC Pattern",
      "Dependency Injection",
      "Modular Routing",
      "MVVM",
      "MVP",
    ],
  },
  {
    label: "Languages",
    items: ["Dart 3.0", "Kotlin 1.9", "Swift 5.9", "Python"],
  },
  {
    label: "Frameworks",
    items: [
      "Flutter 3.x",
      "Jetpack Compose",
      "GetX",
      "Provider",
      "Hilt",
      "Retrofit",
      "TensorFlow",
    ],
  },
  { label: "CI / CD", items: ["Codemagic", "GitHub Actions"] },
  {
    label: "Testing",
    items: ["Unit Testing", "Widget Testing", "Integration Testing", "TDD"],
  },
];

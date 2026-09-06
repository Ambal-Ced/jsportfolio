export type ProjectItem = {
  slug: string;
  src: string;
  title: string;
  subtitle: string;
  fullDescription: string;
  tags: string[];
  url: string;
};

/** Edit `title`, `subtitle`, `fullDescription`, `tags`, and `url`. Keep `slug` and `src`. */
export const projects: ProjectItem[] = [
  {
    slug: "fedm-java-gui",
    src: "/proj/github.webp",
    title: "Project FEDM JAVA GUI",
    subtitle: "JAVA desktop GUI project",
    fullDescription: "Project FEDM JAVA GUI",
    tags: ["JAVA"],
    url: "https://github.com",
  },
  {
    slug: "dph06a",
    src: "/proj/jupyter.webp",
    title: "DPH06A",
    subtitle: "Jupyter notebook project",
    fullDescription: "DPH06A",
    tags: ["IPYNB"],
    url: "https://github.com",
  },
  {
    slug: "ecotrack-admin",
    src: "/proj/ecotrack.webp",
    title: "EcoTrack Admin",
    subtitle: "Admin system for EcoTrack",
    fullDescription: "EcoTrack Admin",
    tags: ["C#", "ASP.NET", "SQL"],
    url: "https://github.com",
  },
  {
    slug: "fcc-survey-form",
    src: "/proj/github.webp",
    title: "Free code camp survey form activity",
    subtitle: "HTML and CSS survey form",
    fullDescription: "Free code camp survey form activity",
    tags: ["HTML", "CSS"],
    url: "https://github.com",
  },
  {
    slug: "csharp-gui-calculator",
    src: "/proj/github.webp",
    title: "C# GUI Calculator",
    subtitle: "Desktop calculator in C#",
    fullDescription: "C# GUI Calculator",
    tags: ["C#"],
    url: "https://github.com",
  },
  {
    slug: "csharp-logical-calculator",
    src: "/proj/github.webp",
    title: "C# Logical Calculator Terminal",
    subtitle: "Terminal calculator in C#",
    fullDescription: "C# Logical Calculator Terminal",
    tags: ["C#"],
    url: "https://github.com",
  },
  {
    slug: "es-project",
    src: "/proj/github.webp",
    title: "ES project",
    subtitle: "Web project",
    fullDescription: "ES project",
    tags: ["HTML", "CSS", "JS"],
    url: "https://github.com",
  },
  {
    slug: "system-violation-recorder",
    src: "/proj/github.webp",
    title: "System Violation Recorder",
    subtitle: "JAVA application",
    fullDescription: "System Violation Recorder",
    tags: ["JAVA"],
    url: "https://github.com",
  },
  {
    slug: "studio-ponkan",
    src: "/proj/studioponkan.webp",
    title: "Studio Ponkan",
    subtitle: "PHP and SQL Server project",
    fullDescription: "Studio Ponkan",
    tags: ["PHP", "SQL Server"],
    url: "https://github.com",
  },
  {
    slug: "eventtria",
    src: "/proj/eventria.webp",
    title: "EventTria",
    subtitle: "Next.js event platform",
    fullDescription: "EventTria",
    tags: ["Next.js", "ShadcnUI", "Supabase"],
    url: "https://github.com",
  },
  {
    slug: "quazar-quiz",
    src: "/proj/quazar.webp",
    title: "Quazar Quiz",
    subtitle: "Flutter quiz app",
    fullDescription: "Quazar Quiz",
    tags: ["Flutter"],
    url: "https://github.com",
  },
  {
    slug: "quazar-cloud",
    src: "/proj/quazarcloud.webp",
    title: "Quazar Cloud",
    subtitle: "HTML, CSS, and JavaScript project",
    fullDescription: "Quazar Cloud",
    tags: ["HTML", "CSS", "JavaScript"],
    url: "https://www.quazarcloud.online/index.html",
  },
  {
    slug: "ecotrack",
    src: "/proj/ecotrack.webp",
    title: "EcoTrack",
    subtitle: "C#, ASP.NET, and SQL Server project",
    fullDescription: "EcoTrack",
    tags: ["C#", "ASP.NET", "SQL Server"],
    url: "https://github.com",
  },
  {
    slug: "more-coming-soon",
    src: "/proj/github.webp",
    title: "More Projects Coming Soon",
    subtitle: "New work will be added here",
    fullDescription: "More Projects Coming Soon",
    tags: [],
    url: "",
  },
];

export function getProject(slug: string) {
  return projects.find((item) => item.slug === slug);
}

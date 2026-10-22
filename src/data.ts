/* ──────────────────────────────────────────────
   Site data — single source of truth for all copy
   ────────────────────────────────────────────── */

// ─── Types ──────────────────────────────────

export interface ResumeData {
  url: string
  available: boolean
}

export interface Profile {
  name: { first: string; middle: string; last: string }
  role: string
  tagline: string
  location: string
  kicker: string
  email: string
  github: { url: string; label: string }
  linkedin: { url: string; label: string }
  resume: ResumeData
}

export interface AboutData {
  leadPrefix: string
  leadEmphasis: string          // word(s) wrapped in <em>
  leadSuffix: string
  prose: string
}

export type ProjectStatus = 'live' | 'in-progress'

export interface ProjectLink {
  label: string
  url: string
}

export interface Project {
  title: string
  status: ProjectStatus
  statusLabel: string
  description: string
  tags?: string[]
  focusLine?: string
  links?: ProjectLink[]
  comingSoon?: string
}

export interface SkillGroup {
  label: string
  items: string[]
}

export interface ManifestLine {
  tag: string      // e.g. "<artifactId>"
  value: string    // e.g. "spring-boot-starter-web"
  closeTag: string // e.g. "</artifactId>"
}

export interface ExperienceData {
  lead: string
  tags: string[]
}

export interface ContactRow {
  label: string
  value: string
  url?: string
}

// ─── Data ───────────────────────────────────

export const profile: Profile = {
  name: { first: 'Naman', middle: 'Deep', last: 'Tripathi' },
  role: 'Software Developer \u00a0/\u00a0 AI\u00b7ML Engineer',
  tagline:
    'Building practical software products and exploring intelligent solutions to real-world problems.',
  location: 'Mathura, India',
  kicker: 'Portfolio',
  email: 'namandeeptripathi@gmail.com',
  github: {
    url: 'https://github.com/namandeeptripathi',
    label: 'GitHub',
  },
  linkedin: {
    url: 'https://www.linkedin.com/in/naman-deep-tripathi-2709a6286/',
    label: 'LinkedIn',
  },
  resume: {
    url: '/resume.pdf',
    available: false,
  },
}

export const about: AboutData = {
  leadPrefix: "I'm a software developer interested in ",
  leadEmphasis: 'backend engineering',
  leadSuffix:
    ', building web applications, and developing AI-powered solutions.',
  prose:
    'I enjoy solving technical problems, experimenting with new ideas, and turning concepts into functional products. My focus is on writing reliable software, developing useful applications, and continuously improving my engineering skills.',
}

export const projects: Project[] = [
  {
    title: 'TrendSole',
    status: 'live',
    statusLabel: 'Live \u00b7 Marketplace',
    description:
      'A fashion and lifestyle marketplace featuring product browsing, user authentication, shopping carts, order management, and user profiles.',
    tags: [
      'Java',
      'Spring Boot',
      'Spring Security',
      'Hibernate',
      'MySQL',
      'Bootstrap',
      'JavaScript',
    ],
    links: [
      { label: 'Live site', url: 'https://trendsole-1.onrender.com/' },
      {
        label: 'GitHub',
        url: 'https://github.com/namandeeptripathi/TrendSole',
      },
    ],
  },
  {
    title: 'CoroVista',
    status: 'live',
    statusLabel: 'Live \u00b7 AI / Visualization',
    description:
      'An AI-based cardiovascular visualization project exploring risk analysis, vessel-specific stenosis prediction, and 3D coronary-vessel visualization.',
    focusLine:
      'AI/ML, cardiovascular data visualization, vessel-level prediction, 3D visualization',
    links: [
      { label: 'Live site', url: 'https://coro-vista-eta.vercel.app/' },
      {
        label: 'GitHub',
        url: 'https://github.com/namandeeptripathi/CoroVista',
      },
    ],
  },
  {
    title: 'DevFlow-AI',
    status: 'in-progress',
    statusLabel: 'In progress \u00b7 AI platform',
    description:
      'An AI engineering platform designed to support software development workflows, including sprint planning, code review, engineering analytics, and documentation.',
    focusLine:
      'AI/ML, multi-agent systems, RAG, software engineering automation',
    comingSoon: 'Repository and demo coming soon.',
  },
]

export const skillGroups: SkillGroup[] = [
  { label: 'Languages', items: ['Java', 'Python', 'JavaScript', 'SQL'] },
  {
    label: 'Backend',
    items: [
      'Spring Boot',
      'Spring MVC',
      'Spring Security',
      'Hibernate',
      'JDBC',
      'REST APIs',
    ],
  },
  { label: 'Database', items: ['MySQL'] },
  { label: 'Frontend', items: ['Bootstrap', 'JavaScript'] },
  {
    label: 'AI / ML',
    items: ['Machine Learning', 'Deep Learning', 'AI/ML integration'],
  },
  { label: 'Tools', items: ['Git', 'GitHub', 'Maven', 'Swagger', 'Postman'] },
  {
    label: 'Fundamentals',
    items: [
      'OOP',
      'Data Structures & Algorithms',
      'Collections',
      'Exception Handling',
    ],
  },
]

export const manifestComment = '<!-- stack at a glance -->'
export const manifestLines: ManifestLine[] = [
  { tag: '<artifactId>', value: 'spring-boot-starter-web', closeTag: '</artifactId>' },
  { tag: '<artifactId>', value: 'spring-boot-starter-security', closeTag: '</artifactId>' },
  { tag: '<artifactId>', value: 'hibernate-core', closeTag: '</artifactId>' },
  { tag: '<artifactId>', value: 'mysql-connector-j', closeTag: '</artifactId>' },
  { tag: '<artifactId>', value: 'springdoc-openapi', closeTag: '</artifactId>' },
]

export const experience: ExperienceData = {
  lead: 'Hands-on project development involving backend systems, REST APIs, web applications, and AI/ML-focused solutions.',
  tags: ['Backend systems', 'REST APIs', 'Web applications', 'AI/ML solutions'],
}

export const contactRows: ContactRow[] = [
  {
    label: 'GitHub',
    value: 'GitHub',
    url: 'https://github.com/namandeeptripathi',
  },
  {
    label: 'LinkedIn',
    value: 'LinkedIn',
    url: 'https://www.linkedin.com/in/naman-deep-tripathi-2709a6286/',
  },
  { label: 'Location', value: 'Mathura, India' },
]

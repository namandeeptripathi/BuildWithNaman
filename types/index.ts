export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectLinks {
  live?: string;
  github?: string;
  caseStudy?: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: string;
  year: string;
  role: string;
  description: string;
  highlights: string[];
  stack: string[];
  metrics?: ProjectMetric[];
  links: ProjectLinks;
  status: 'Production' | 'Active' | 'Experimental' | 'Research';
  accentColor?: string;
}

export interface SocialLink {
  name: string;
  url: string;
  handle: string;
  isPlaceholder?: boolean;
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface ProfileData {
  name: string;
  roleTitle: string;
  headline: string;
  location: string;
  availability: string;
  bioShort: string;
  bioManifesto: string[];
  skills: SkillGroup[];
  socials: SocialLink[];
  resumeUrl: string;
}

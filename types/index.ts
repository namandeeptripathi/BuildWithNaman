export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectLinks {
  live?: string;
  github?: string;
  caseStudy?: string;
}

export interface ArchitectureNode {
  id: string;
  name: string;
  stage: string;
  description: string;
  inputs: string[];
  outputs: string[];
  tech: string[];
  status: 'Implemented (External)' | 'Planned' | 'Unverified';
}

export interface ArchitectureEdge {
  from: string;
  to: string;
  label?: string;
}

export interface ArchitectureDiagram {
  overview: string;
  nodes: ArchitectureNode[];
  edges: ArchitectureEdge[];
}

export interface KeyDecision {
  decision: string;
  tradeOff: string;
  rationale: string;
}

export interface VerifiedStatus {
  repoStatus: 'External Repository' | 'Public' | 'Unlinked';
  demoStatus: 'Demo on Request' | 'Internal' | 'Unlinked';
  note: string;
  evidenceAudit: string;
}

export interface CaseStudyDetail {
  problem: string;
  intendedUsers: string[];
  engineeringApproach: string;
  keyDecisions: KeyDecision[];
  implementedFeatures: string[];
  plannedWork: string[];
  challengesSolved: string[];
  architecture: ArchitectureDiagram;
  verifiedStatus: VerifiedStatus;
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
  caseStudyData?: CaseStudyDetail;
}

export interface SocialLink {
  name: string;
  url: string;
  handle: string;
  isPlaceholder?: boolean;
}

export interface SkillProjectLink {
  projectId: string;
  projectName: string;
  responsibility: string;
  caseStudyAnchor?: string;
}

export type SkillCategory =
  | 'Languages'
  | 'Frontend'
  | 'Backend & APIs'
  | 'AI & Data'
  | 'Infrastructure & Tools';

export interface SkillItem {
  id: string;
  name: string;
  category: SkillCategory;
  description: string;
  usageContext: string;
  projectLinks: SkillProjectLink[];
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
  skills?: SkillGroup[];
  socials: SocialLink[];
  resumeUrl: string;
}

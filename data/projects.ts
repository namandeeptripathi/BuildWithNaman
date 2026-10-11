import { Project } from '@/types';

export const projectsData: Project[] = [
  {
    id: 'orgtrace',
    title: 'OrgTrace',
    tagline: 'Enterprise organizational dependency telemetry and graph visualization engine.',
    category: 'Distributed Systems & Visualization',
    year: '2024',
    role: 'Lead Frontend Architect',
    description:
      'High-throughput interactive graph explorer mapping cross-functional dependencies, team bottlenecks, and organizational infrastructure hierarchies in real time.',
    highlights: [
      'Rendered 10,000+ relational nodes at 60fps utilizing hardware-accelerated Canvas and WebGL pipelines.',
      'Designed declarative query filtering and cluster exploration mode for distributed team telemetry.',
      'Reduced initial topology rendering latency by 68% via multi-threaded web worker spatial layout indexing.',
    ],
    stack: ['TypeScript', 'React', 'WebGL / Canvas', 'Web Workers', 'Tailwind CSS'],
    metrics: [
      { label: 'Graph Throughput', value: '10K+ Nodes' },
      { label: 'Render Latency', value: '< 16ms' },
      { label: 'Payload Reduction', value: '68%' },
    ],
    links: {
      live: 'https://example.com/[orgtrace-demo]',
      github: 'https://github.com/[orgtrace-repo]',
      caseStudy: '/projects/orgtrace',
    },
    status: 'Production',
    accentColor: '#8065FF',
  },
  {
    id: 'hazard-project',
    title: 'Hazard Project',
    tagline: 'Industrial safety telemetry and predictive hazard detection dashboard.',
    category: 'Computer Vision & IoT Telemetry',
    year: '2024',
    role: 'Frontend & Creative Technologist',
    description:
      'Mission-critical monitoring console synthesizing real-time sensory IoT feeds, spatial hazard zones, and automated incident response workflows for high-risk industrial facilities.',
    highlights: [
      'Built interactive 3D facility zoning visualization mapping heat sensors and atmospheric contaminants.',
      'Engineered zero-lag telemetry stream consumers handling 1,500 state updates per second with WebSockets.',
      'Designed high-contrast, emergency-first UI mode compliant with mission-critical visibility protocols.',
    ],
    stack: ['Next.js', 'Three.js / R3F', 'WebSockets', 'Tailwind CSS', 'TypeScript'],
    metrics: [
      { label: 'Event Ingestion', value: '1,500/sec' },
      { label: 'Alert Latency', value: '45ms' },
      { label: 'Uptime Reliability', value: '99.98%' },
    ],
    links: {
      live: 'https://example.com/[hazard-demo]',
      github: 'https://github.com/[hazard-repo]',
      caseStudy: '/projects/hazard-project',
    },
    status: 'Active',
    accentColor: '#48BFFF',
  },
  {
    id: 'devflow-ai',
    title: 'DevFlow AI',
    tagline: 'Autonomous developer workflow orchestration and contextual pipeline assistant.',
    category: 'AI Tooling & Developer Experience',
    year: '2025',
    role: 'Full-Stack Product Engineer',
    description:
      'Developer tool bridging contextual code intelligence, branch automation, and CI/CD diagnostic insights through an ambient command palette and streaming natural language interface.',
    highlights: [
      'Engineered an ultra-low latency command palette (< 8ms response) with fuzzy command matching.',
      'Built a reactive streaming code diff visualization component with syntax highlight chunking.',
      'Architected keyboard-first navigation enabling 100% mouse-free workflow automation.',
    ],
    stack: ['TypeScript', 'React', 'Motion', 'Next.js App Router', 'Tailwind CSS'],
    metrics: [
      { label: 'Interaction Latency', value: '< 8ms' },
      { label: 'Diff Streaming', value: '60 FPS' },
      { label: 'Workflow Acceleration', value: '3.4x' },
    ],
    links: {
      live: 'https://example.com/[devflow-demo]',
      github: 'https://github.com/[devflow-repo]',
      caseStudy: '/projects/devflow-ai',
    },
    status: 'Active',
    accentColor: '#A78BFA',
  },
];

import { ProfileData } from '@/types';

export const profileData: ProfileData = {
  name: 'Namandeep Tripathi',
  roleTitle: 'Senior Frontend Engineer & Creative Technologist',
  headline: 'Engineering cinematic digital interfaces, high-performance web systems, and interactive experiences.',
  location: 'India [Specify City/Timezone]',
  availability: 'Available for Select Contracts & High-Impact Roles',
  bioShort:
    'Focused at the intersection of modern frontend architecture, cinematic motion graphics, and selective 3D interfaces. Building software that operates with deterministic reliability and visual distinction.',
  bioManifesto: [
    'Software interfaces should feel tactile, responsive, and alive—not like sterile administrative spreadsheets.',
    'Performance is not a compromise with aesthetics. Frame budgets, memory footprints, and bundle trees demand rigorous engineering.',
    'Cinematic motion is an intentional storytelling tool that guides cognitive focus, not visual noise or decoration.',
    'Systems architecture should remain as minimal as possible, as maintainable as necessary, and ruthlessly devoid of hype-driven complexity.',
  ],
  skills: [
    {
      category: 'Core Engineering',
      items: ['TypeScript', 'React 19', 'Next.js App Router', 'Node.js', 'System Architecture', 'Design Systems'],
    },
    {
      category: 'Creative Technology & 3D',
      items: ['Three.js', 'React Three Fiber', 'GLSL Shaders', 'Motion for React', 'Canvas 2D/WebGL', 'Interactive Audio'],
    },
    {
      category: 'Styling & Performance',
      items: ['Tailwind CSS', 'CSS Custom Properties', 'Web Vitals Optimization', 'Responsive Architecture', 'Micro-interactions'],
    },
    {
      category: 'Tooling & Workflow',
      items: ['Git & CI/CD', 'Vite / Turbopack', 'ESLint / Prettier', 'Terminal Ergonomics', 'Full-stack Integration'],
    },
  ],
  socials: [
    {
      name: 'GitHub',
      url: 'https://github.com/[your-github-username]',
      handle: '@[your-github]',
      isPlaceholder: true,
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/[your-linkedin-username]',
      handle: 'in/[your-linkedin]',
      isPlaceholder: true,
    },
    {
      name: 'X (Twitter)',
      url: 'https://x.com/[your-handle]',
      handle: '@[your-handle]',
      isPlaceholder: true,
    },
    {
      name: 'Email',
      url: 'mailto:[your-email@example.com]',
      handle: '[your-email@example.com]',
      isPlaceholder: true,
    },
  ],
  resumeUrl: '#[Add-Resume-URL]',
};

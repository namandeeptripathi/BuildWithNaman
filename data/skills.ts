import { SkillItem, SkillCategory } from '@/types';

export const skillCategories: (SkillCategory | 'All')[] = [
  'All',
  'Languages',
  'Frontend',
  'Backend & APIs',
  'AI & Data',
  'Infrastructure & Tools',
];

export const skillsData: SkillItem[] = [
  // --- LANGUAGES ---
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'Languages',
    description:
      'Strongly typed programming language providing static compile-time safety, strict interface contracts, and robust refactoring tooling.',
    usageContext:
      'Primary language for full-stack and frontend development. Used for end-to-end data schemas, UI components, and state logic.',
    projectLinks: [
      {
        projectId: 'devflow-ai',
        projectName: 'DevFlow AI',
        responsibility: 'Command palette shell, AST symbol interfaces, and streaming diff chunk renderer.',
        caseStudyAnchor: '#devflow-ai',
      },
      {
        projectId: 'hazard-project',
        projectName: 'Hazard Project',
        responsibility: 'Interactive decision-support dashboard, scenario simulator, and GeoJSON layer interfaces.',
        caseStudyAnchor: '#hazard-project',
      },
      {
        projectId: 'portfolio',
        projectName: 'BuildWithNaman Portfolio',
        responsibility: 'Full Next.js 15 App Router architecture, 3D WebGL scene bindings, and typed case study contracts.',
      },
    ],
  },
  {
    id: 'python',
    name: 'Python',
    category: 'Languages',
    description:
      'Interpreted, high-level language used for asynchronous backend services, data extraction, spatial computation, and automation pipelines.',
    usageContext:
      'Core language for backend microservices, web crawling automation, and mathematical decision scoring.',
    projectLinks: [
      {
        projectId: 'orgtrace',
        projectName: 'OrgTrace',
        responsibility: 'Brønnøysund register entity resolution, Playwright crawler pool, and Pydantic extraction pipelines.',
        caseStudyAnchor: '#orgtrace',
      },
      {
        projectId: 'hazard-project',
        projectName: 'Hazard Project',
        responsibility: 'GeoPandas GIS vector ingestion, spatial polygon intersection, and composite risk scoring algorithms.',
        caseStudyAnchor: '#hazard-project',
      },
    ],
  },
  {
    id: 'javascript',
    name: 'JavaScript (ESNext)',
    category: 'Languages',
    description:
      'Modern ECMAScript for browser runtime APIs, asynchronous event loop orchestration, and dynamic client interactions.',
    usageContext:
      'Client-side event handling, WebGL hardware context bindings, and dynamic DOM interaction management.',
    projectLinks: [
      {
        projectId: 'portfolio',
        projectName: 'BuildWithNaman Portfolio',
        responsibility: 'Real-time mouse coordinate tracking, event throttling, and WebGL lifecycle listeners.',
      },
    ],
  },
  {
    id: 'java',
    name: 'Java',
    category: 'Languages',
    description:
      'Object-oriented language known for strong memory management, strict type hierarchies, and robust enterprise design patterns.',
    usageContext:
      'Core engineering toolkit for object-oriented systems architecture and algorithmic foundations.',
    projectLinks: [], // No public case study currently linked
  },
  {
    id: 'sql',
    name: 'SQL',
    category: 'Languages',
    description:
      'Declarative database query language for relational data modeling, table schemas, complex joins, and transactional querying.',
    usageContext:
      'Database schema definition, relational indexing, and structured query optimization.',
    projectLinks: [
      {
        projectId: 'orgtrace',
        projectName: 'OrgTrace',
        responsibility: 'PostgreSQL entity persistence, change telemetry logging, and organization lookup indices.',
        caseStudyAnchor: '#orgtrace',
      },
    ],
  },

  // --- FRONTEND ---
  {
    id: 'react',
    name: 'React 19',
    category: 'Frontend',
    description:
      'Component-based declarative UI library emphasizing concurrent rendering, clean hook composition, and reactive state trees.',
    usageContext:
      'Building responsive, accessible web interfaces, interactive data dashboards, and modular design components.',
    projectLinks: [
      {
        projectId: 'hazard-project',
        projectName: 'Hazard Project',
        responsibility: 'Interactive geospatial map controls, hazard category filters, and scenario trade-off comparison cards.',
        caseStudyAnchor: '#hazard-project',
      },
      {
        projectId: 'devflow-ai',
        projectName: 'DevFlow AI',
        responsibility: 'Low-latency keyboard focus trap management, ambient modal shell, and live diff chunk container.',
        caseStudyAnchor: '#devflow-ai',
      },
      {
        projectId: 'portfolio',
        projectName: 'BuildWithNaman Portfolio',
        responsibility: 'Floating dock, interactive architecture diagram inspector, and deep-linking modal orchestrator.',
      },
    ],
  },
  {
    id: 'nextjs',
    name: 'Next.js App Router',
    category: 'Frontend',
    description:
      'React framework featuring server-rendered shells, static optimization, font swaps, and optimized client bundling.',
    usageContext:
      'Full-stack frontend framework providing zero-layout-shift font loading, dynamic client-only imports, and SEO metadata.',
    projectLinks: [
      {
        projectId: 'portfolio',
        projectName: 'BuildWithNaman Portfolio',
        responsibility: 'App Router architecture, dynamic 3D scene isolation (SSR: false), and metadata optimization.',
      },
      {
        projectId: 'devflow-ai',
        projectName: 'DevFlow AI',
        responsibility: 'App Router foundation, layout architecture, and client action boundaries.',
        caseStudyAnchor: '#devflow-ai',
      },
    ],
  },
  {
    id: 'tailwind-css',
    name: 'Tailwind CSS',
    category: 'Frontend',
    description:
      'Utility-first CSS framework coupled with custom CSS custom properties for cohesive, maintainable design systems.',
    usageContext:
      'Creating editorial dark interfaces, glassmorphic surfaces, responsive layouts, and restrained color accents.',
    projectLinks: [
      {
        projectId: 'portfolio',
        projectName: 'BuildWithNaman Portfolio',
        responsibility: 'Void-black (#080A12) palette, atmospheric grid textures, and glassmorphic telemetry cards.',
      },
      {
        projectId: 'hazard-project',
        projectName: 'Hazard Project',
        responsibility: 'High-contrast emergency dashboard styling and responsive map overlay layout.',
        caseStudyAnchor: '#hazard-project',
      },
    ],
  },
  {
    id: 'threejs-r3f',
    name: 'Three.js & R3F',
    category: 'Frontend',
    description:
      'Hardware-accelerated WebGL graphics engine paired with React Three Fiber for declarative 3D scene graph manipulation.',
    usageContext:
      'Selective 3D environments: procedural geometric meshes, studio lighting rigs, orbital animations, and pointer parallax.',
    projectLinks: [
      {
        projectId: 'portfolio',
        projectName: 'BuildWithNaman Portfolio',
        responsibility: 'Signature procedural Cosmic Core hero scene with pointer parallax and resonance overclock mechanics.',
      },
    ],
  },
  {
    id: 'motion',
    name: 'Motion for React',
    category: 'Frontend',
    description:
      'Animation library for React delivering layout transitions, exit choreography, spring physics, and viewport scroll reveals.',
    usageContext:
      'Choreographing purposeful editorial motion, entrance transitions, and interactive modal dialogs.',
    projectLinks: [
      {
        projectId: 'portfolio',
        projectName: 'BuildWithNaman Portfolio',
        responsibility: 'Scroll-triggered section reveals, floating dock tracking, and Case Study modal animation.',
      },
      {
        projectId: 'devflow-ai',
        projectName: 'DevFlow AI',
        responsibility: 'Command palette entry/exit animations and smooth result list transitions.',
        caseStudyAnchor: '#devflow-ai',
      },
    ],
  },
  {
    id: 'html-css',
    name: 'HTML5 & Modern CSS',
    category: 'Frontend',
    description:
      'Semantic document structuring, accessible ARIA attributes, modern layout engines (CSS Grid/Flexbox), and CSS custom properties.',
    usageContext:
      'Semantic document hierarchy, accessible screen-reader navigation, and custom design tokens for responsive layouts.',
    projectLinks: [
      {
        projectId: 'portfolio',
        projectName: 'BuildWithNaman Portfolio',
        responsibility: 'Semantic landmark regions, custom design tokens, and accessible modal dialog containers.',
      },
    ],
  },

  // --- BACKEND & APIS ---
  {
    id: 'fastapi',
    name: 'FastAPI (Python)',
    category: 'Backend & APIs',
    description:
      'Modern, high-performance Python web framework built on Starlette and Pydantic with native async support and OpenAPI schemas.',
    usageContext:
      'Asynchronous REST endpoints, background task dispatching, and rigid request/response validation.',
    projectLinks: [
      {
        projectId: 'orgtrace',
        projectName: 'OrgTrace',
        responsibility: 'REST API service for company search, batch queue execution, and structured report retrieval.',
        caseStudyAnchor: '#orgtrace',
      },
      {
        projectId: 'hazard-project',
        projectName: 'Hazard Project',
        responsibility: 'Geospatial query endpoints delivering computed settlement risk indices and relocation parcel scores.',
        caseStudyAnchor: '#hazard-project',
      },
    ],
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'Backend & APIs',
    description:
      'Asynchronous event-driven JavaScript runtime for developer tooling, local servers, and build processes.',
    usageContext:
      'Development server execution, build tool pipelines, and module resolution.',
    projectLinks: [
      {
        projectId: 'portfolio',
        projectName: 'BuildWithNaman Portfolio',
        responsibility: 'Next.js build execution, PostCSS transpilation, and npm dependency auditing.',
      },
    ],
  },
  {
    id: 'rest-architecture',
    name: 'REST Architecture',
    category: 'Backend & APIs',
    description:
      'Stateless client-server architectural style emphasizing standard HTTP verbs, clean resource URIs, and structured JSON contracts.',
    usageContext:
      'Designing predictable API endpoints, error code contracts, and decoupled frontend-to-backend communication.',
    projectLinks: [
      {
        projectId: 'orgtrace',
        projectName: 'OrgTrace',
        responsibility: 'Brønnøysund register client integration and structured JSON API response formatting.',
        caseStudyAnchor: '#orgtrace',
      },
    ],
  },

  // --- AI & DATA ---
  {
    id: 'llm-extraction',
    name: 'LLM Structured Extraction',
    category: 'AI & Data',
    description:
      'Enforcing strict JSON schema contracts on language model completions to guarantee deterministic structured outputs.',
    usageContext:
      'Transforming unstructured crawled web content into validated corporate and developer payloads without hallucination.',
    projectLinks: [
      {
        projectId: 'orgtrace',
        projectName: 'OrgTrace',
        responsibility: 'Extracting executive rosters, corporate summaries, and financial reports into validated Pydantic models.',
        caseStudyAnchor: '#orgtrace',
      },
      {
        projectId: 'devflow-ai',
        projectName: 'DevFlow AI',
        responsibility: 'Enforcing strict unified diff formatting and syntax patch contracts on model completions.',
        caseStudyAnchor: '#devflow-ai',
      },
    ],
  },
  {
    id: 'geopandas-gis',
    name: 'Geospatial GIS (GeoPandas)',
    category: 'AI & Data',
    description:
      'Python geospatial data processing toolkit extending pandas for vector spatial geometry operations and spatial indices.',
    usageContext:
      'Reading GeoJSON/shapefiles, calculating polygon intersections, and performing spatial buffer analyses.',
    projectLinks: [
      {
        projectId: 'hazard-project',
        projectName: 'Hazard Project',
        responsibility: 'Disaster risk zoning, floodplain polygon intersections, and candidate relocation suitability modeling.',
        caseStudyAnchor: '#hazard-project',
      },
    ],
  },
  {
    id: 'playwright-crawler',
    name: 'Playwright & Web Scraping',
    category: 'AI & Data',
    description:
      'Headless browser automation framework capable of executing complex web navigation and capturing dynamically rendered HTML.',
    usageContext:
      'Automating corporate website discovery, text chunk extraction, and citation provenance collection.',
    projectLinks: [
      {
        projectId: 'orgtrace',
        projectName: 'OrgTrace',
        responsibility: 'Official corporate website exploration, text chunk capture, and citation provenance linking.',
        caseStudyAnchor: '#orgtrace',
      },
    ],
  },

  // --- INFRASTRUCTURE & TOOLS ---
  {
    id: 'git-github',
    name: 'Git & GitHub',
    category: 'Infrastructure & Tools',
    description:
      'Distributed version control system and collaborative code hosting for branch management and atomic commits.',
    usageContext:
      'Version control, feature branch workflows, clean commit discipline, and remote synchronization.',
    projectLinks: [
      {
        projectId: 'portfolio',
        projectName: 'BuildWithNaman Portfolio',
        responsibility: 'Local Git repository tracking and GitHub remote synchronization (BuildWithNaman).',
      },
    ],
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    category: 'Infrastructure & Tools',
    description:
      'Advanced open-source relational database supporting ACID transactions, JSONB document fields, and robust indexing.',
    usageContext:
      'Persistent storage of structured corporate entities, relationship mapping, and change telemetry history.',
    projectLinks: [
      {
        projectId: 'orgtrace',
        projectName: 'OrgTrace',
        responsibility: 'Persistence of canonical company records, verified evidence citations, and batch queue states.',
        caseStudyAnchor: '#orgtrace',
      },
    ],
  },
  {
    id: 'docker',
    name: 'Docker',
    category: 'Infrastructure & Tools',
    description:
      'Containerization platform creating isolated, reproducible software environments for services and backend workers.',
    usageContext:
      'Isolating background workers, browser automation runtimes, and database dependencies.',
    projectLinks: [], // General engineering toolkit
  },
  {
    id: 'redis-queues',
    name: 'Redis & Async Queues',
    category: 'Infrastructure & Tools',
    description:
      'In-memory key-value data store used for low-latency caching, pub/sub messaging, and background task queue orchestration.',
    usageContext:
      'Asynchronous task queuing, intermediate report caching, and event-driven worker synchronization.',
    projectLinks: [
      {
        projectId: 'orgtrace',
        projectName: 'OrgTrace',
        responsibility: 'Batch queue worker coordination and asynchronous change telemetry diff scheduling.',
        caseStudyAnchor: '#orgtrace',
      },
    ],
  },
  {
    id: 'eslint-tooling',
    name: 'ESLint & TypeScript Tooling',
    category: 'Infrastructure & Tools',
    description:
      'Static code analysis tools enforcing code hygiene, accessibility standards, and type correctness.',
    usageContext:
      'Enforcing zero-warning linting pipelines, strict type verification, and consistent code formatting.',
    projectLinks: [
      {
        projectId: 'portfolio',
        projectName: 'BuildWithNaman Portfolio',
        responsibility: 'Enforcing next/core-web-vitals rules and strict TypeScript compilation with zero warnings.',
      },
    ],
  },
];

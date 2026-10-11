import { Project } from '@/types';

export const projectsData: Project[] = [
  {
    id: 'orgtrace',
    title: 'OrgTrace',
    tagline: 'Agent for Norwegian company intelligence and evidence-backed research.',
    category: 'Company Intelligence & Research Agent',
    year: '2024',
    role: 'Software Developer & System Architect',
    description:
      'An autonomous research agent built for Norwegian entity intelligence. It resolves company identities against official registry structures, discovers web domains, extracts financial filings, gathers external evidence, and monitors structural corporate changes.',
    highlights: [
      'Automated company identity resolution matching official Norwegian Brønnøysund register formats.',
      'Profile extraction engine collecting corporate leadership, operational activity, and regulatory filings.',
      'Evidence collection pipeline linking extracted corporate facts directly to verifiable web citations.',
      'Change intelligence batch orchestrator managing asynchronous multi-entity analysis.',
    ],
    stack: ['Python', 'TypeScript', 'FastAPI', 'Playwright / Headless Browser', 'PostgreSQL', 'Async Queues', 'LLM Extraction'],
    links: {
      caseStudy: '#orgtrace',
    },
    status: 'Active',
    accentColor: '#8065FF',
    caseStudyData: {
      problem:
        'Financial analysts, corporate investigators, and compliance officers spend excessive hours manually verifying Norwegian companies across public registers, scouring diverse websites for current executive rosters, and cross-checking annual statements without verifiable provenance.',
      intendedUsers: [
        'Corporate Investigators',
        'B2B Due Diligence Analysts',
        'Compliance & Risk Officers',
        'Market Research Teams',
      ],
      engineeringApproach:
        'Engineered a deterministic-first pipeline architecture: official Norwegian registry lookups (Brønnøysund) establish verified legal identities first, followed by resilient web crawling and structured LLM extraction. Every extracted piece of data maintains an exact provenance link with source URLs, timestamping, and raw snippet context.',
      keyDecisions: [
        {
          decision: 'Deterministic Registry Anchor Before Web Discovery',
          tradeOff: 'Requires initial registry validation query before crawling begins.',
          rationale:
            'Prevents hallucinated or misattributed company profiles by anchoring scraping to canonical Norwegian org numbers and legal names.',
        },
        {
          decision: 'Evidence Citation Offset Storage',
          tradeOff: 'Increases data payload size and storage complexity.',
          rationale:
            'Ensures analysts can click any extracted financial or executive claim to inspect the exact web paragraph and source timestamp from which it was derived.',
        },
        {
          decision: 'Asynchronous Queue-Backed Batch Processing',
          tradeOff: 'Requires dedicated queue workers and state persistence.',
          rationale:
            'Prevents rate-limiting and external request timeouts when analysts submit multi-company bulk portfolios for continuous change intelligence.',
        },
      ],
      implementedFeatures: [
        'Canonical entity resolution matching Norwegian organization numbers and company structures.',
        'Targeted web discovery engine identifying official company domains and filtering third-party aggregators.',
        'Structured extraction of executive leadership, board members, and reported financial indicators.',
        'Evidence collection pipeline attaching source URLs and text citations to all extracted records.',
        'Asynchronous batch job runner with task status tracking and error retries.',
      ],
      plannedWork: [
        'Continuous webhook ingestion for official Norwegian Gazette (Norsk Lysingsblad) announcements.',
        'Cross-border registry federation across Scandinavian registries (Swedish Bolagsverket, Danish CVR).',
        'Interactive relational network graph mapping cross-company board memberships.',
      ],
      challengesSolved: [
        'Disambiguating complex parent-subsidiary hierarchies by resolving canonical parent organization IDs.',
        'Handling dynamic JavaScript rendering on enterprise portals via a pooled, resource-capped headless browser cluster.',
        'Eliminating extraction hallucination by enforcing rigid JSON schemas with strict validation guards.',
      ],
      architecture: {
        overview:
          'Data flows from initial user query through canonical register verification, resilient web discovery, structured extraction, evidence attribution, and persistence.',
        nodes: [
          {
            id: 'node-query',
            name: 'Entity Query Input',
            stage: 'Ingestion',
            description: 'Accepts company name, organization number, or batch list for intelligence gathering.',
            inputs: ['User Query', 'Batch CSV'],
            outputs: ['Normalized Search Payload'],
            tech: ['FastAPI', 'Pydantic'],
            status: 'Implemented (External)',
          },
          {
            id: 'node-registry',
            name: 'Brønnøysund Identity Resolver',
            stage: 'Verification',
            description: 'Queries Norwegian national register structures to establish canonical organization identity and status.',
            inputs: ['Normalized Search Payload'],
            outputs: ['Canonical Org Profile', 'Legal Name', 'Org Number'],
            tech: ['Python', 'REST API', 'Fuzzy Matching'],
            status: 'Implemented (External)',
          },
          {
            id: 'node-discovery',
            name: 'Web Discovery & Domain Crawler',
            stage: 'Discovery',
            description: 'Discovers verified corporate websites, maps site architectures, and captures raw web contents.',
            inputs: ['Canonical Org Profile'],
            outputs: ['Raw HTML', 'Cleaned Text Chunks'],
            tech: ['Playwright', 'BeautifulSoup', 'DNS Resolver'],
            status: 'Implemented (External)',
          },
          {
            id: 'node-extractor',
            name: 'Profile & Financial Extractor',
            stage: 'Extraction',
            description: 'Extracts leadership rosters, operational summaries, and financial reports using structured schemas.',
            inputs: ['Cleaned Text Chunks', 'Registry Records'],
            outputs: ['Structured Entity Profile'],
            tech: ['LLM Structured Extraction', 'Pydantic Schemas'],
            status: 'Implemented (External)',
          },
          {
            id: 'node-evidence',
            name: 'Evidence & Provenance Verifier',
            stage: 'Validation',
            description: 'Attaches exact source URLs, timestamps, and contextual text snippets to all extracted claims.',
            inputs: ['Structured Entity Profile', 'Raw HTML'],
            outputs: ['Verified Evidence Graph'],
            tech: ['Text Offset Matcher', 'Hashing'],
            status: 'Implemented (External)',
          },
          {
            id: 'node-batch',
            name: 'Batch Queue & Change Telemetry',
            stage: 'Storage & Monitoring',
            description: 'Persists entity knowledge and schedules asynchronous diff detection across reporting cycles.',
            inputs: ['Verified Evidence Graph'],
            outputs: ['Change Telemetry Feed', 'Final JSON Report'],
            tech: ['PostgreSQL', 'Redis / Async Queue'],
            status: 'Implemented (External)',
          },
        ],
        edges: [
          { from: 'node-query', to: 'node-registry', label: 'Validate Org Identity' },
          { from: 'node-registry', to: 'node-discovery', label: 'Fetch Official Domain' },
          { from: 'node-discovery', to: 'node-extractor', label: 'Pass Crawled Content' },
          { from: 'node-extractor', to: 'node-evidence', label: 'Verify Claims & Sources' },
          { from: 'node-evidence', to: 'node-batch', label: 'Persist & Schedule Telemetry' },
        ],
      },
      verifiedStatus: {
        repoStatus: 'External Repository',
        demoStatus: 'Demo on Request',
        note: 'Developed as part of the Norwegian company intelligence challenge (Signalpost specification). Source code maintained externally.',
        evidenceAudit: 'No in-tree source code in this repository. Technical claims reflect external challenge implementation.',
      },
    },
  },
  {
    id: 'hazard-project',
    title: 'Hazard Project',
    tagline: 'Disaster hazard assessment and relocation decision-support system.',
    category: 'Geospatial Decision Support & Risk Modeling',
    year: '2024',
    role: 'Software Developer',
    description:
      'A spatial decision-support system designed to assess disaster hazards (floods, landslides, wildfires), evaluate settlement exposure, and model relocation suitability for vulnerable communities.',
    highlights: [
      'Multi-layer geospatial ingestion processing terrain elevation, floodplain models, and hazard zones.',
      'Hazard prioritization matrix scoring settlements by composite risk severity.',
      'Relocation intelligence core evaluating destination zones for ecological and logistical safety.',
      'Comparative scenario execution modeling resource trade-offs under varying risk thresholds.',
    ],
    stack: ['TypeScript', 'React', 'Python', 'GeoPandas / Shapely', 'Leaflet / Mapbox GL', 'FastAPI', 'Tailwind CSS'],
    links: {
      caseStudy: '#hazard-project',
    },
    status: 'Active',
    accentColor: '#48BFFF',
    caseStudyData: {
      problem:
        'Municipal authorities, civil defense agencies, and regional urban planners lack integrated tools that connect immediate multi-hazard risk analysis with long-term, explainable relocation intelligence for climate-vulnerable communities.',
      intendedUsers: [
        'Disaster Management Authorities',
        'Regional Urban & Civil Planners',
        'Climate Adaptation Researchers',
        'Municipal Emergency Coordinators',
      ],
      engineeringApproach:
        'Unified multi-hazard spatial vectors (floods, landslides, slope gradients) into an explainable multi-criteria decision matrix. The system decouples geospatial indexing from simulation execution, allowing planners to dynamically adjust risk thresholds, observe settlement impact rankings, and inspect why specific destination parcels are deemed safe.',
      keyDecisions: [
        {
          decision: 'Decoupled Vector Processing & Simulation Pipeline',
          tradeOff: 'Requires preprocessing GIS rasters into optimized vector tiles.',
          rationale:
            'Ensures fluid, sub-100ms interactive scenario recalculations directly in the web dashboard without recalculating heavy GIS geometry on every slider adjustment.',
        },
        {
          decision: 'Explainable Multi-Criteria Scoring vs. Black-Box Models',
          tradeOff: 'Requires explicit weight definitions and transparent formula exposure.',
          rationale:
            'Public sector stakeholders and municipal planners require transparent, audit-ready justifications when classifying zones as uninhabitable or recommending relocation.',
        },
        {
          decision: 'Client-Side Spatial Layer Caching',
          tradeOff: 'Increases initial map payload marginally.',
          rationale:
            'Enables responsive map layer toggling, choropleth rendering, and offline resilience during emergency demonstrations.',
        },
      ],
      implementedFeatures: [
        'Multi-layer geospatial map viewer with hazard vector overlays and elevation contours.',
        'Settlement hazard prioritization engine computing composite vulnerability scores.',
        'Relocation zone suitability analyzer checking road connectivity, slope stability, and flood buffers.',
        'Scenario execution engine simulating outcomes across customizable risk thresholds.',
        'Transparent decision explanation cards breaking down individual hazard factors for civic reports.',
      ],
      plannedWork: [
        'Integration with live satellite synthetic-aperture radar (SAR) feeds for real-time flood extent updating.',
        'Multi-objective Pareto optimization for cost-vs-safety relocation transit planning.',
        'Community survey module incorporating local demographic priorities into suitability weightings.',
      ],
      challengesSolved: [
        'Optimizing heavy multi-polygon GeoJSON shapefile rendering to maintain 60 FPS map panning.',
        'Developing a balanced normalization formula that prevents high-frequency low-impact hazards from drowning out severe low-frequency catastrophic risks.',
      ],
      architecture: {
        overview:
          'Geospatial data flows from raw vector/raster ingestion through prioritization scoring, relocation suitability modeling, scenario trade-off comparison, and the explainability dashboard.',
        nodes: [
          {
            id: 'node-gis-ingestion',
            name: 'Geospatial Data Ingestion',
            stage: 'Ingestion',
            description: 'Ingests digital elevation models (DEM), hydrological shapefiles, and historical hazard polygons.',
            inputs: ['GeoJSON', 'Shapefiles', 'Elevation Rasters'],
            outputs: ['Standardized Spatial GeoData'],
            tech: ['GeoPandas', 'Shapely', 'FastAPI'],
            status: 'Implemented (External)',
          },
          {
            id: 'node-hazard-matrix',
            name: 'Hazard Prioritization Core',
            stage: 'Analysis',
            description: 'Computes settlement-level composite vulnerability indices using weighted hazard severity algorithms.',
            inputs: ['Standardized Spatial GeoData', 'Population Layers'],
            outputs: ['Prioritized Risk Ranks', 'Settlement Hazard Scores'],
            tech: ['Python / NumPy', 'Spatial Indexing'],
            status: 'Implemented (External)',
          },
          {
            id: 'node-relocation-intel',
            name: 'Relocation Intelligence Engine',
            stage: 'Evaluation',
            description: 'Evaluates candidate relocation zones against ecological buffer zones, road access, and elevation headroom.',
            inputs: ['Candidate Parcels', 'Infrastructure Layers'],
            outputs: ['Suitability Heatmap', 'Viable Relocation Clusters'],
            tech: ['Spatial Buffer Analysis', 'Vector Math'],
            status: 'Implemented (External)',
          },
          {
            id: 'node-scenario-sim',
            name: 'Scenario Execution Engine',
            stage: 'Simulation',
            description: 'Executes comparative simulations comparing resource allocation, timeline feasibility, and safety trade-offs.',
            inputs: ['Settlement Hazard Scores', 'Viable Relocation Clusters', 'User Risk Thresholds'],
            outputs: ['Scenario Comparison Matrix'],
            tech: ['TypeScript Engine', 'Parametric Modeling'],
            status: 'Implemented (External)',
          },
          {
            id: 'node-explainability-ui',
            name: 'Explainability Dashboard & Map',
            stage: 'Visualization',
            description: 'Interactive geospatial visualization rendering multi-layer choropleths and transparent scoring breakdowns.',
            inputs: ['Scenario Comparison Matrix', 'Standardized Spatial GeoData'],
            outputs: ['Interactive Map Layers', 'Audit Report Cards'],
            tech: ['React', 'Mapbox / Leaflet', 'Tailwind CSS'],
            status: 'Implemented (External)',
          },
        ],
        edges: [
          { from: 'node-gis-ingestion', to: 'node-hazard-matrix', label: 'Index Hazard Layers' },
          { from: 'node-hazard-matrix', to: 'node-relocation-intel', label: 'Identify Impacted Zones' },
          { from: 'node-relocation-intel', to: 'node-scenario-sim', label: 'Supply Viable Target Sites' },
          { from: 'node-scenario-sim', to: 'node-explainability-ui', label: 'Render Comparative Metrics' },
        ],
      },
      verifiedStatus: {
        repoStatus: 'External Repository',
        demoStatus: 'Demo on Request',
        note: 'Decision-support research prototype. Source code and shapefile pipelines maintained externally; walkthrough available upon request.',
        evidenceAudit: 'No in-tree source code in this repository. Technical claims reflect the research prototype implementation.',
      },
    },
  },
  {
    id: 'devflow-ai',
    title: 'DevFlow AI',
    tagline: 'AI-first engineering intelligence and developer workflow assistant.',
    category: 'AI Developer Tooling & Context Architecture',
    year: '2025',
    role: 'Full-Stack Developer',
    description:
      'A context-aware developer assistance platform that indexes repository architectures, parses natural language intent, and streams code modifications through a low-latency keyboard-first interface.',
    highlights: [
      'Local repository indexer extracting AST symbols, git staging buffers, and project context.',
      'Context retrieval pipeline identifying relevant code chunks for developer intent.',
      'Streaming unified diff generator with syntax highlighting chunk rendering.',
      'Ambient command palette architecture delivering keyboard-first action orchestration.',
    ],
    stack: ['TypeScript', 'Next.js App Router', 'React', 'Motion', 'Tailwind CSS', 'Node.js', 'LLM API Integration'],
    links: {
      caseStudy: '#devflow-ai',
    },
    status: 'Active',
    accentColor: '#A78BFA',
    caseStudyData: {
      problem:
        'Software engineers spend substantial cognitive energy context-switching between decoupled chat windows, terminal buffers, diff viewers, and documentation without a unified, ambient tool aware of local repository state.',
      intendedUsers: [
        'Full-Stack Software Engineers',
        'Engineering Leads',
        'Developers Navigating Complex Multi-Module Repositories',
      ],
      engineeringApproach:
        'Built an ambient command palette interface with a strong emphasis on keyboard ergonomics, strict diff generation, and verified git context. Decoupled context extraction from model orchestration, ensuring the developer can inspect exact file references before any code patch is drafted.',
      keyDecisions: [
        {
          decision: 'Unified Streaming Diff Container vs. Chat Output',
          tradeOff: 'Requires custom chunk parsing for git unified diff formats.',
          rationale:
            'Developers think in concrete code modifications and unified diffs, not verbose conversational explanations.',
        },
        {
          decision: 'Deterministic AST Symbol Indexing Over Unbounded Vector Search',
          tradeOff: 'Limited to language parsers supported by the local indexer.',
          rationale:
            'AST symbol hierarchies produce exact, deterministic references for classes, functions, and exports without embedding drift.',
        },
        {
          decision: 'Keyboard-First Ergonomics with Cmd+K Shortcuts',
          tradeOff: 'Requires strict keyboard focus trap management and accessibility states.',
          rationale:
            'Keeps developers in flow state without requiring mouse interactions during coding cycles.',
        },
      ],
      implementedFeatures: [
        'Ambient command palette interface with fuzzy command filtering and shortcut bindings.',
        'Real-time streaming unified git diff component with syntax highlighting.',
        'Active workspace context tracking (git status, open files, and recent terminal activity).',
        'Structured prompt orchestration enforcing strict, clean code patch formats.',
        'Pre-application patch verification ensuring generated changes align with existing line ranges.',
      ],
      plannedWork: [
        'Multi-repository semantic cross-indexing and background dependency watchers.',
        'Autonomous pull-request verification agent with local test runner integration.',
        'Integrated tree-sitter AST parser expansion for polyglot monorepos.',
      ],
      challengesSolved: [
        'Preventing layout jitter during fast token streaming by pre-calculating monospace diff chunk boundaries.',
        'Enforcing rigid diff generation contracts so generated code adheres strictly to existing formatting and lint rules.',
      ],
      architecture: {
        overview:
          'User intent flows from the command palette shell through local repository context indexing, prompt orchestration, streaming diff parsing, and patch application.',
        nodes: [
          {
            id: 'node-command-shell',
            name: 'Ambient Command Palette Shell',
            stage: 'Interaction',
            description: 'Low-latency keyboard-first modal handling user intent, action shortcuts, and execution states.',
            inputs: ['Keyboard Shortcuts (Cmd+K)', 'Natural Language Intent'],
            outputs: ['Parsed Action Command', 'Context Request'],
            tech: ['React', 'Motion', 'Tailwind CSS'],
            status: 'Implemented (External)',
          },
          {
            id: 'node-repo-indexer',
            name: 'Repository & Workspace Indexer',
            stage: 'Context Gathering',
            description: 'Scans workspace directory trees, extracts symbol signatures, and inspects git staging buffers.',
            inputs: ['File System', 'Git Status'],
            outputs: ['AST Symbols', 'Dirty Buffer Diffs'],
            tech: ['TypeScript', 'Node.js fs', 'Git CLI'],
            status: 'Implemented (External)',
          },
          {
            id: 'node-context-engine',
            name: 'Context Retrieval Engine',
            stage: 'Context Gathering',
            description: 'Filters and ranks high-relevance code snippets matching the target developer intent.',
            inputs: ['AST Symbols', 'Parsed Action Command'],
            outputs: ['Ranked Context Chunks'],
            tech: ['Context Scorer', 'Heuristic Ranking'],
            status: 'Implemented (External)',
          },
          {
            id: 'node-prompt-orchestrator',
            name: 'Prompt & Guardrail Orchestrator',
            stage: 'Intelligence',
            description: 'Constructs system prompts, enforces strict diff output contracts, and guards against destructive modifications.',
            inputs: ['Ranked Context Chunks', 'Parsed Action Command'],
            outputs: ['Structured Model Request'],
            tech: ['Pydantic / Zod Schemas', 'LLM API Client'],
            status: 'Implemented (External)',
          },
          {
            id: 'node-streaming-diff',
            name: 'Streaming Diff & Patch Engine',
            stage: 'Output & Execution',
            description: 'Streams unified diff chunks, renders syntax-highlighted additions/deletions, and validates patch applicability.',
            inputs: ['Structured Model Response Stream'],
            outputs: ['Visual Diff View', 'Validated Code Patch'],
            tech: ['Streaming Parser', 'Syntax Highlighting'],
            status: 'Implemented (External)',
          },
        ],
        edges: [
          { from: 'node-command-shell', to: 'node-repo-indexer', label: 'Trigger Context Scan' },
          { from: 'node-repo-indexer', to: 'node-context-engine', label: 'Provide AST & Git Diffs' },
          { from: 'node-context-engine', to: 'node-prompt-orchestrator', label: 'Assemble Ranked Context' },
          { from: 'node-prompt-orchestrator', to: 'node-streaming-diff', label: 'Stream Generated Diff' },
          { from: 'node-streaming-diff', to: 'node-command-shell', label: 'Display Diff & Apply Patch' },
        ],
      },
      verifiedStatus: {
        repoStatus: 'External Repository',
        demoStatus: 'Internal',
        note: 'Active engineering project. Source code and local tooling modules maintained externally.',
        evidenceAudit: 'No in-tree source code in this repository. Technical claims reflect active tooling development.',
      },
    },
  },
];

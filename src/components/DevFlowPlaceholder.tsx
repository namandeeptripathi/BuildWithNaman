export default function DevFlowPlaceholder() {
  return (
    <div className="relative w-full aspect-[1600/803] overflow-hidden bg-[var(--surface)] flex items-center justify-center">
      <svg
        viewBox="0 0 1600 803"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full block"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="devflow-grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="var(--rule)"
              strokeWidth="0.75"
              strokeOpacity="0.4"
            />
          </pattern>
        </defs>

        {/* Background grid on surface */}
        <rect width="1600" height="803" fill="var(--surface)" />
        <rect width="1600" height="803" fill="url(#devflow-grid)" />

        {/* Workflow Edges */}
        <g stroke="var(--brass)" strokeOpacity="0.45" strokeWidth="1.5" strokeDasharray="5 5">
          {/* Spec -> Orchestrator */}
          <path d="M 460 280 C 620 280, 660 400, 750 400" />
          {/* Code Synthesis -> Orchestrator */}
          <path d="M 460 520 C 620 520, 660 400, 750 400" />
          {/* Orchestrator -> Review */}
          <path d="M 850 400 C 940 400, 980 280, 1140 280" />
          {/* Orchestrator -> Analytics */}
          <path d="M 850 400 C 940 400, 980 520, 1140 520" />
          {/* Top Feedback loop */}
          <path d="M 1140 280 C 1240 280, 1260 170, 800 170 C 480 170, 460 220, 460 260" strokeOpacity="0.25" />
        </g>

        {/* Connecting coordinate axes */}
        <g stroke="var(--brass)" strokeOpacity="0.6" strokeWidth="1.5">
          <line x1="730" y1="400" x2="870" y2="400" />
          <line x1="800" y1="330" x2="800" y2="470" />
        </g>

        {/* Orchestrator Central Node */}
        <circle cx="800" cy="400" r="44" fill="var(--ground)" stroke="var(--brass)" strokeWidth="2" />
        <circle cx="800" cy="400" r="34" fill="none" stroke="var(--rule)" strokeWidth="1" strokeDasharray="3 3" />
        <circle cx="800" cy="400" r="6" fill="var(--brass)" />
        <text
          x="800"
          y="466"
          textAnchor="middle"
          fill="var(--ink)"
          fontFamily="var(--font-mono)"
          fontSize="13"
          letterSpacing="0.14em"
        >
          ORCHESTRATOR
        </text>

        {/* Node 1: Spec Agent */}
        <circle cx="420" cy="280" r="28" fill="var(--ground)" stroke="var(--brass)" strokeWidth="1.5" />
        <circle cx="420" cy="280" r="4" fill="var(--brass)" />
        <text
          x="420"
          y="328"
          textAnchor="middle"
          fill="var(--muted)"
          fontFamily="var(--font-mono)"
          fontSize="12"
          letterSpacing="0.12em"
        >
          SPRINT & SPEC AGENT
        </text>

        {/* Node 2: Code Gen Agent */}
        <circle cx="420" cy="520" r="28" fill="var(--ground)" stroke="var(--brass)" strokeWidth="1.5" />
        <circle cx="420" cy="520" r="4" fill="var(--brass)" />
        <text
          x="420"
          y="568"
          textAnchor="middle"
          fill="var(--muted)"
          fontFamily="var(--font-mono)"
          fontSize="12"
          letterSpacing="0.12em"
        >
          CODE SYNTHESIS
        </text>

        {/* Node 3: Review & Test Agent */}
        <circle cx="1180" cy="280" r="28" fill="var(--ground)" stroke="var(--brass)" strokeWidth="1.5" />
        <circle cx="1180" cy="280" r="4" fill="var(--brass)" />
        <text
          x="1180"
          y="328"
          textAnchor="middle"
          fill="var(--muted)"
          fontFamily="var(--font-mono)"
          fontSize="12"
          letterSpacing="0.12em"
        >
          REVIEW & VERIFY
        </text>

        {/* Node 4: RAG Knowledge Store */}
        <circle cx="1180" cy="520" r="28" fill="var(--ground)" stroke="var(--brass)" strokeWidth="1.5" />
        <circle cx="1180" cy="520" r="4" fill="var(--brass)" />
        <text
          x="1180"
          y="568"
          textAnchor="middle"
          fill="var(--muted)"
          fontFamily="var(--font-mono)"
          fontSize="12"
          letterSpacing="0.12em"
        >
          RAG & ANALYTICS
        </text>

        {/* Status Badge */}
        <g transform="translate(64, 720)">
          <rect
            x="0"
            y="0"
            width="132"
            height="30"
            rx="2"
            fill="var(--ground)"
            stroke="var(--rule)"
            strokeWidth="1"
          />
          <circle cx="16" cy="15" r="3.5" fill="none" stroke="var(--brass)" strokeWidth="1.5" />
          <text
            x="28"
            y="19.5"
            fill="var(--brass)"
            fontFamily="var(--font-mono)"
            fontSize="11"
            letterSpacing="0.16em"
          >
            IN PROGRESS
          </text>
        </g>
      </svg>
    </div>
  )
}

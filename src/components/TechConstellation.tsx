import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactElement,
} from 'react'
import './TechConstellation.css'

export interface ConstellationLink {
  from: string
  to: string
}

export interface SectorDefinition {
  id: string
  kicker: string
  title: string
  className: string
  category?: string
  items?: string[]
  groups?: {
    category: string
    label: string
    items: string[]
  }[]
}

// ─── Authentic Architectural Links ───────────────────────────
export const CONSTELLATION_LINKS: ConstellationLink[] = [
  // Java & Backend Core
  { from: 'Java', to: 'Spring Boot' },
  { from: 'Java', to: 'Hibernate' },
  { from: 'Java', to: 'JDBC' },
  { from: 'Java', to: 'Maven' },
  { from: 'Java', to: 'OOP' },
  { from: 'Java', to: 'Collections' },
  { from: 'Java', to: 'Exception Handling' },
  { from: 'Java', to: 'Data Structures & Algorithms' },

  // Spring Boot Core Ecosystem
  { from: 'Spring Boot', to: 'Spring MVC' },
  { from: 'Spring Boot', to: 'Spring Security' },
  { from: 'Spring Boot', to: 'Hibernate' },
  { from: 'Spring Boot', to: 'REST APIs' },
  { from: 'Spring Boot', to: 'MySQL' },
  { from: 'Spring Boot', to: 'Maven' },

  // Database & Persistence
  { from: 'SQL', to: 'MySQL' },
  { from: 'SQL', to: 'JDBC' },
  { from: 'Hibernate', to: 'MySQL' },
  { from: 'Hibernate', to: 'JDBC' },

  // Python & AI/ML Ecosystem
  { from: 'Python', to: 'Machine Learning' },
  { from: 'Python', to: 'Deep Learning' },
  { from: 'Machine Learning', to: 'AI/ML integration' },
  { from: 'Deep Learning', to: 'AI/ML integration' },
  { from: 'AI/ML integration', to: 'REST APIs' },

  // Frontend & Client
  { from: 'JavaScript', to: 'Bootstrap' },
  { from: 'JavaScript', to: 'REST APIs' },

  // Tools & API Contracts
  { from: 'REST APIs', to: 'Swagger' },
  { from: 'REST APIs', to: 'Postman' },
  { from: 'Git', to: 'GitHub' },

  // Fundamentals & CS Core
  { from: 'OOP', to: 'Data Structures & Algorithms' },
  { from: 'OOP', to: 'Exception Handling' },
  { from: 'Collections', to: 'Data Structures & Algorithms' },
]

// ─── 5 Constellation Clusters (All 24 technologies & 7 categories from data.ts preserved) ───
const CONSTELLATION_SECTORS: SectorDefinition[] = [
  {
    id: 'backend',
    kicker: '01 · BACKEND',
    title: 'Core Backend Framework',
    className: 'sector-backend',
    category: 'Backend',
    items: [
      'Spring Boot',
      'Spring MVC',
      'Spring Security',
      'Hibernate',
      'JDBC',
      'REST APIs',
    ],
  },
  {
    id: 'languages',
    kicker: '02 · LANGUAGES',
    title: 'Polyglot Languages',
    className: 'sector-languages',
    category: 'Languages',
    items: ['Java', 'Python', 'JavaScript', 'SQL'],
  },
  {
    id: 'aiml',
    kicker: '03 · AI & ML',
    title: 'AI & Machine Learning',
    className: 'sector-aiml',
    category: 'AI / ML',
    items: ['Machine Learning', 'Deep Learning', 'AI/ML integration'],
  },
  {
    id: 'dataclient',
    kicker: '04 · PERSISTENCE & CLIENT',
    title: 'Database & Frontend',
    className: 'sector-dataclient',
    groups: [
      {
        category: 'Database',
        label: 'Relational Database',
        items: ['MySQL'],
      },
      {
        category: 'Frontend',
        label: 'Client Interface',
        items: ['Bootstrap', 'JavaScript'],
      },
    ],
  },
  {
    id: 'foundations',
    kicker: '05 · ECOSYSTEM & CORE',
    title: 'Toolchain & CS Fundamentals',
    className: 'sector-foundations',
    groups: [
      {
        category: 'Tools',
        label: 'Developer Toolchain',
        items: ['Git', 'GitHub', 'Maven', 'Swagger', 'Postman'],
      },
      {
        category: 'Fundamentals',
        label: 'CS Core & Fundamentals',
        items: [
          'OOP',
          'Data Structures & Algorithms',
          'Collections',
          'Exception Handling',
        ],
      },
    ],
  },
]

interface Props {
  inView?: boolean
}

export default function TechConstellation({ inView = true }: Props): ReactElement {
  const viewportRef = useRef<HTMLDivElement>(null)
  const nodeRefs = useRef<Map<string, HTMLElement>>(new Map())
  const [coords, setCoords] = useState<Record<string, { x: number; y: number }>>({})
  const [hoveredTech, setHoveredTech] = useState<string | null>(null)
  const [focusedTech, setFocusedTech] = useState<string | null>(null)
  const [selectedTech, setSelectedTech] = useState<string | null>(null)

  // Register nodes into ref map
  const registerNode = useCallback((id: string, el: HTMLElement | null) => {
    if (el) {
      nodeRefs.current.set(id, el)
    } else {
      nodeRefs.current.delete(id)
    }
  }, [])

  // Measure center coordinates of each node relative to viewport
  const measureCoords = useCallback(() => {
    if (!viewportRef.current) return
    const parentRect = viewportRef.current.getBoundingClientRect()
    const nextCoords: Record<string, { x: number; y: number }> = {}

    nodeRefs.current.forEach((el, id) => {
      const rect = el.getBoundingClientRect()
      nextCoords[id] = {
        x: rect.left + rect.width / 2 - parentRect.left,
        y: rect.top + rect.height / 2 - parentRect.top,
      }
    })

    setCoords(nextCoords)
  }, [])

  // ResizeObserver to keep connection lines mathematically anchored
  useEffect(() => {
    const el = viewportRef.current
    if (!el) return

    measureCoords()

    const ro = new ResizeObserver(() => {
      window.requestAnimationFrame(measureCoords)
    })
    ro.observe(el)

    window.addEventListener('resize', measureCoords)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measureCoords)
    }
  }, [measureCoords])

  // Remeasure after initial reveal
  useEffect(() => {
    if (inView) {
      const timer = setTimeout(measureCoords, 80)
      return () => clearTimeout(timer)
    }
  }, [inView, measureCoords])

  // Click outside to deselect
  useEffect(() => {
    if (!selectedTech) return
    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      const target = e.target as HTMLElement | null
      if (target && !target.closest('.constellation-node')) {
        setSelectedTech(null)
      }
    }
    window.addEventListener('click', handleOutsideClick)
    return () => window.removeEventListener('click', handleOutsideClick)
  }, [selectedTech])

  // Escape key to clear selection
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedTech(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Active technology being inspected: hover takes precedence, then focus, then selection
  const activeTechName = hoveredTech ?? focusedTech ?? selectedTech

  // Pre-calculate connection map: which tech connects to which tech
  const connectionMap = useMemo(() => {
    const map = new Map<string, Set<string>>()
    CONSTELLATION_LINKS.forEach(({ from, to }) => {
      if (!map.has(from)) map.set(from, new Set())
      if (!map.has(to)) map.set(to, new Set())
      map.get(from)!.add(to)
      map.get(to)!.add(from)
    })
    return map
  }, [])

  // Technologies connected to the active tech
  const connectedTechSet = useMemo(() => {
    if (!activeTechName) return new Set<string>()
    return connectionMap.get(activeTechName) ?? new Set<string>()
  }, [activeTechName, connectionMap])

  const handleNodeClick = useCallback((item: string) => {
    setSelectedTech((prev) => (prev === item ? null : item))
  }, [])

  return (
    <div className="constellation-ecosystem" aria-label="Interactive Technology Constellation">
      {/* ─── Spatial Constellation Viewport ─── */}
      <div ref={viewportRef} className="constellation-viewport">
        {/* Dynamic SVG Connection Web */}
        <svg className="constellation-svg" aria-hidden="true">
          {CONSTELLATION_LINKS.map(({ from, to }) => {
            const p1 = coords[from]
            const p2 = coords[to]
            if (!p1 || !p2) return null

            const isHighlighted =
              activeTechName !== null &&
              (from === activeTechName || to === activeTechName)

            const isDimmed = activeTechName !== null && !isHighlighted

            // Subtle celestial arc
            const dx = p2.x - p1.x
            const dy = p2.y - p1.y
            const cx = (p1.x + p2.x) / 2 - dy * 0.06
            const cy = (p1.y + p2.y) / 2 + dx * 0.06
            const d = `M ${p1.x.toFixed(1)} ${p1.y.toFixed(1)} Q ${cx.toFixed(1)} ${cy.toFixed(1)} ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`

            return (
              <path
                key={`${from}-${to}`}
                d={d}
                className={`constellation-line ${isHighlighted ? 'active' : ''} ${isDimmed ? 'dimmed' : ''}`}
              />
            )
          })}
        </svg>

        {/* Constellation Sectors Grid */}
        <div className="constellation-grid">
          {CONSTELLATION_SECTORS.map((sector) => (
            <div
              key={sector.id}
              className={`constellation-sector ${sector.className}`}
            >
              <div className="sector-header">
                <span className="mono sector-kicker">{sector.kicker}</span>
                <h3 className="mono sector-title">{sector.title}</h3>
              </div>

              {/* Direct item list sector */}
              {sector.items && sector.category && (
                <div className="sector-nodes">
                  {sector.items.map((item) => {
                    const isActive = activeTechName === item
                    const isConnected = connectedTechSet.has(item)
                    const isDimmed = activeTechName !== null && !isActive && !isConnected
                    const connectionCount = connectionMap.get(item)?.size ?? 0

                    return (
                      <button
                        key={item}
                        ref={(el) => registerNode(item, el)}
                        type="button"
                        className={`constellation-node ${isActive ? 'active' : ''} ${isConnected ? 'connected' : ''} ${isDimmed ? 'dimmed' : ''}`}
                        onClick={() => handleNodeClick(item)}
                        onMouseEnter={() => setHoveredTech(item)}
                        onMouseLeave={() => setHoveredTech(null)}
                        onFocus={() => setFocusedTech(item)}
                        onBlur={() => setFocusedTech(null)}
                        aria-label={`${item} (${sector.category}) — ${connectionCount} architectural connections`}
                        aria-pressed={selectedTech === item}
                      >
                        <span className="node-star" aria-hidden="true" />
                        <span className="node-name">{item}</span>
                      </button>
                    )
                  })}
                </div>
              )}

              {/* Sub-grouped sector (Database/Frontend, Tools/Fundamentals) */}
              {sector.groups && (
                <div className="sector-subsections">
                  {sector.groups.map((subgroup) => (
                    <div key={subgroup.category} className="sector-subgroup">
                      <span className="mono sector-subgroup-label">
                        {subgroup.label}
                      </span>
                      <div className="sector-nodes">
                        {subgroup.items.map((item) => {
                          const isActive = activeTechName === item
                          const isConnected = connectedTechSet.has(item)
                          const isDimmed = activeTechName !== null && !isActive && !isConnected
                          const connectionCount = connectionMap.get(item)?.size ?? 0

                          return (
                            <button
                              key={`${subgroup.category}-${item}`}
                              ref={(el) => {
                                if (!nodeRefs.current.has(item)) {
                                  registerNode(item, el)
                                }
                              }}
                              type="button"
                              className={`constellation-node ${isActive ? 'active' : ''} ${isConnected ? 'connected' : ''} ${isDimmed ? 'dimmed' : ''}`}
                              onClick={() => handleNodeClick(item)}
                              onMouseEnter={() => setHoveredTech(item)}
                              onMouseLeave={() => setHoveredTech(null)}
                              onFocus={() => setFocusedTech(item)}
                              onBlur={() => setFocusedTech(null)}
                              aria-label={`${item} (${subgroup.category}) — ${connectionCount} architectural connections`}
                              aria-pressed={selectedTech === item}
                            >
                              <span className="node-star" aria-hidden="true" />
                              <span className="node-name">{item}</span>
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

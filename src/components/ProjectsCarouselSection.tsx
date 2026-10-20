import { useEffect, useMemo, useRef, useState } from 'react'
import CircularCarousel, { type CircularCarouselHandle } from './reactbits/CircularCarousel'
import { projects } from '../data'

export interface FullProject {
  title: string
  status: 'live' | 'in-progress'
  statusLabel: string
  description: string
  tags: string[]
  focusLine?: string
  comingSoon?: string
  links?: { label: string; url: string }[]
  imageSrc: string
  urlText: string
  alt: string
}

const PROJECT_META: Record<
  string,
  { urlText: string; imageSrc: string; alt: string; defaultTags?: string[] }
> = {
  TrendSole: {
    urlText: 'trendsole-1.onrender.com',
    imageSrc: '/projects/trendsole.webp',
    alt: 'Desktop preview of TrendSole e-commerce marketplace homepage showing curated fashion categories',
  },
  CoroVista: {
    urlText: 'coro-vista-eta.vercel.app',
    imageSrc: '/projects/corovista.webp',
    alt: 'Desktop preview of CoroVista cardiovascular AI analysis and 3D coronary digital twin dashboard',
    defaultTags: ['AI/ML', 'FastAPI', 'Three.js', 'PyTorch', 'Cardiovascular AI'],
  },
  'DevFlow-AI': {
    urlText: 'devflow-ai.internal/workflow',
    imageSrc: '/projects/devflow.svg',
    alt: 'Architecture workflow and multi-agent orchestration diagram for DevFlow-AI',
    defaultTags: ['AI/ML', 'Multi-Agent', 'RAG', 'DevOps Automation', 'Python'],
  },
}

export default function ProjectsCarouselSection() {
  const containerRef = useRef<HTMLElement>(null)
  const carouselRef = useRef<CircularCarouselHandle>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  // Complete project items built directly from real data
  const fullProjects: FullProject[] = useMemo(() => {
    return projects.map((p) => {
      const meta = PROJECT_META[p.title] ?? {
        urlText: p.title.toLowerCase(),
        imageSrc: '/projects/devflow.svg',
        alt: p.description,
        defaultTags: [],
      }
      return {
        ...p,
        tags: p.tags && p.tags.length > 0 ? p.tags : (meta.defaultTags ?? []),
        urlText: meta.urlText,
        imageSrc: meta.imageSrc,
        alt: meta.alt,
      }
    })
  }, [])

  // Detect responsive viewport for optimal 3D sizing
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 820)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile, { passive: true })
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Direct selection of target project
  const selectProject = (index: number) => {
    setActiveIndex(index)
    carouselRef.current?.focusIndex(index)
  }

  const cardW = isMobile ? 310 : 490
  const cardH = isMobile ? 480 : 535

  return (
    <section
      id="work"
      ref={containerRef}
      className="work-scroll-container"
      aria-label="Selected work 3D carousel"
    >
      <div className="work-sticky-stage">
        <div className="work-editorial-wrapper">
          {/* Compact Editorial Header */}
          <div className="work-editorial-header">
            <div className="work-header-left">
              <h2 className="label mono">Selected work</h2>
              <span className="work-header-sub mono">— 3D Ring</span>
            </div>
            <div className="work-header-right">
              <div className="work-counter-pills" role="tablist" aria-label="Project tabs">
                {fullProjects.map((p, i) => (
                  <button
                    key={p.title}
                    type="button"
                    role="tab"
                    aria-selected={i === activeIndex}
                    aria-label={`Go to project ${i + 1}: ${p.title}`}
                    className={`work-pill-btn mono ${i === activeIndex ? 'is-active' : ''}`}
                    onClick={() => selectProject(i)}
                  >
                    <span className="pill-num">{String(i + 1).padStart(2, '0')}</span>
                    <span className="pill-title">{p.title}</span>
                  </button>
                ))}
              </div>
              <div className="work-scroll-cue" aria-hidden="true">
                <span className="cue-line" />
                <span className="cue-text mono">SCROLL TO ROTATE</span>
              </div>
            </div>
          </div>

          {/* Full-Width 3D Carousel Stage */}
          <div className="work-carousel-stage">
            <CircularCarousel<FullProject>
              ref={carouselRef}
              containerRef={containerRef}
              items={fullProjects}
              preset="cylinder"
              intro="none"
              tilt={isMobile ? -2 : -4}
              cardWidth={cardW}
              cardHeight={cardH}
              radius={isMobile ? 280 : 430}
              perspective={isMobile ? 1100 : 2200}
              targetIndex={activeIndex}
              focusOnClick={true}
              onChange={(idx) => {
                setActiveIndex(idx)
              }}
              onItemClick={(_, index) => selectProject(index)}
              depthFade={0.65}
              innerShade={0.7}
              fadeColor="var(--ground)"
              className="work-3d-ring"
              renderCard={(project, index, isActive) => {
                const isLive = project.status === 'live'
                const liveLink = project.links?.find((l) => l.label.toLowerCase().includes('live'))
                const githubLink = project.links?.find((l) =>
                  l.label.toLowerCase().includes('github'),
                )

                return (
                  <article
                    className={`project-3d-card ${isActive ? 'is-active' : ''}`}
                    style={{
                      width: `${cardW}px`,
                      height: `${cardH}px`,
                      transform: 'translate3d(-50%, -50%, 0)',
                    }}
                    role="article"
                    aria-label={`${project.title} project card`}
                  >
                    {/* Upper Portion: Browser Chrome + Screenshot */}
                    <div className="pcard-browser-bar">
                      <div className="pcard-dots" aria-hidden="true">
                        <span className="pcard-dot pcard-dot-red" />
                        <span className="pcard-dot pcard-dot-yellow" />
                        <span className="pcard-dot pcard-dot-green" />
                      </div>
                      <span className="pcard-url mono">{project.urlText}</span>
                      <span className="pcard-spacer" aria-hidden="true" />
                    </div>

                    <div className="pcard-preview">
                      <img
                        src={project.imageSrc}
                        alt={project.alt}
                        className="pcard-img"
                        loading="eager"
                        decoding="async"
                      />
                      <div className="pcard-overlay" aria-hidden="true" />
                    </div>

                    {/* Lower Portion: Information & Actions */}
                    <div className="pcard-body">
                      <div className="pcard-meta-row">
                        <div className="pcard-status">
                          <span
                            className={`pcard-status-dot ${isLive ? 'is-live' : 'is-progress'}`}
                            aria-hidden="true"
                          />
                          <span className="pcard-status-text mono">{project.statusLabel}</span>
                        </div>
                        <span className="pcard-counter mono">
                          {String(index + 1).padStart(2, '0')} / 0{fullProjects.length}
                        </span>
                      </div>

                      <h3 className="pcard-title">{project.title}</h3>

                      <p className="pcard-desc">{project.description}</p>

                      {project.focusLine && (
                        <p className="pcard-focus">
                          <span className="focus-tag mono">Focus</span>
                          <span>{project.focusLine}</span>
                        </p>
                      )}

                      {project.tags && project.tags.length > 0 && (
                        <ul className="pcard-tags" aria-label="Technology stack">
                          {project.tags.map((tag) => (
                            <li key={tag} className="pcard-tag mono">
                              {tag}
                            </li>
                          ))}
                        </ul>
                      )}

                      <div className="pcard-actions">
                        {isLive && liveLink && (
                          <a
                            href={liveLink.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="pcard-btn-primary mono"
                            onClick={(e) => e.stopPropagation()}
                            aria-label={`Open live demo for ${project.title}`}
                          >
                            Live Demo ↗
                          </a>
                        )}
                        {githubLink && (
                          <a
                            href={githubLink.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="pcard-btn-secondary mono"
                            onClick={(e) => e.stopPropagation()}
                            aria-label={`View ${project.title} source code on GitHub`}
                          >
                            GitHub ↗
                          </a>
                        )}
                        {!isLive && project.comingSoon && (
                          <div className="pcard-soon mono">
                            <span className="pcard-soon-dot" aria-hidden="true" />
                            <span>{project.comingSoon}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </article>
                )
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

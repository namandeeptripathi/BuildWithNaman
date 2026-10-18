import type { Project } from '../data'
import SpotlightCard from './reactbits/SpotlightCard'
import DevFlowPlaceholder from './DevFlowPlaceholder'

interface Props {
  project: Project
}

interface ProjectPreviewConfig {
  urlText: string
  imageSrc?: string
  alt?: string
  isPlaceholder?: boolean
}

const PREVIEWS: Record<string, ProjectPreviewConfig> = {
  TrendSole: {
    urlText: 'trendsole-1.onrender.com',
    imageSrc: '/projects/trendsole.webp',
    alt: 'Desktop preview of TrendSole e-commerce marketplace homepage showing curated fashion categories',
  },
  CoroVista: {
    urlText: 'coro-vista-eta.vercel.app',
    imageSrc: '/projects/corovista.webp',
    alt: 'Desktop preview of CoroVista cardiovascular AI analysis and 3D coronary digital twin dashboard',
  },
  'DevFlow-AI': {
    urlText: 'in progress',
    isPlaceholder: true,
  },
}

export default function ProjectRow({ project }: Props) {
  const isLive = project.status === 'live'
  const preview = PREVIEWS[project.title] ?? {
    urlText: 'in progress',
    isPlaceholder: true,
  }

  return (
    <article className="piece">
      {/* Device-style preview frame */}
      <div className="piece-preview">
        <SpotlightCard
          className="browser-frame"
          spotlightColor="var(--brass)"
          borderGlow={0.65}
          intensity={0.25}
          softness={0.7}
          proximity={90}
        >
          {/* Browser chrome top bar */}
          <div className="browser-bar">
            <div className="browser-dots" aria-hidden="true">
              <span className="b-dot" />
              <span className="b-dot" />
              <span className="b-dot" />
            </div>
            <span className="browser-url mono">{preview.urlText}</span>
          </div>

          {/* Screenshot viewport or inline SVG placeholder */}
          <div className="browser-screen">
            {preview.isPlaceholder ? (
              <DevFlowPlaceholder />
            ) : (
              <>
                <img
                  src={preview.imageSrc}
                  alt={preview.alt}
                  width={1600}
                  height={803}
                  loading="lazy"
                  decoding="async"
                  className="browser-img"
                />
                <div className="browser-overlay" aria-hidden="true" />
              </>
            )}
          </div>
        </SpotlightCard>
      </div>

      {/* Editorial case-study text */}
      <div className="piece-content">
        <p className="status mono">
          <span
            className={`dot${isLive ? '' : ' hollow'}`}
            aria-hidden="true"
          />
          {project.statusLabel}
        </p>

        <h3>{project.title}</h3>

        <p className="d">{project.description}</p>

        {project.tags && (
          <ul className="tags" aria-label="Tech stack">
            {project.tags.map((t) => (
              <li key={t} className="tag">{t}</li>
            ))}
          </ul>
        )}

        {project.focusLine && (
          <p className="focus-line">
            <span>Focus</span>
            {project.focusLine}
          </p>
        )}

        {project.links && (
          <div className="links">
            {project.links.map((l) => (
              <a
                key={l.url}
                className="lnk"
                href={l.url}
                target="_blank"
                rel="noopener"
              >
                {l.label} ↗
              </a>
            ))}
          </div>
        )}

        {project.comingSoon && (
          <p className="soon">{project.comingSoon}</p>
        )}
      </div>
    </article>
  )
}

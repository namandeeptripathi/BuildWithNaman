import type { Project } from '../data'

interface Props {
  project: Project
}

export default function ProjectRow({ project }: Props) {
  const isLive = project.status === 'live'

  return (
    <article className="piece">
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
    </article>
  )
}

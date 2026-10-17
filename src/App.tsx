import { useTheme } from './lib/useTheme'
import { useReveal } from './lib/useReveal'
import { useTilt } from './lib/useTilt'
import Header from './components/Header'
import Footer from './components/Footer'
import SectionShell from './components/SectionShell'
import ProjectRow from './components/ProjectRow'
import HeroLattice from './components/HeroLattice'
import ScrollProgress from './components/ScrollProgress'
import CopyEmailButton from './components/CopyEmailButton'
import {
  about,
  contactRows,
  experience,
  manifestComment,
  manifestLines,
  profile,
  projects,
  skillGroups,
} from './data'

export default function App() {
  const { toggle } = useTheme()
  useReveal()
  useTilt()

  return (
    <>
      <ScrollProgress />
      <div className="page">
        <Header toggle={toggle} />

        <main id="top">
          {/* Hero */}
          <section className="hero" aria-label="Introduction">
            <HeroLattice />
            <div>
              <p className="kicker mono">
                <b>{profile.kicker}</b>
                <span>{profile.location}</span>
              </p>
              <h1 className="name">
                <span>{profile.name.first}</span>
                <span className="mid">{profile.name.middle}</span>
                <span className="last">{profile.name.last}</span>
              </h1>
            </div>
            <div className="hero-side">
              <p className="tagline">{profile.tagline}</p>
              <p className="role mono">{profile.role}</p>
              <div className="cta">
                <a className="btn" href="#work">
                  View work
                </a>
                <a
                  className="lnk"
                  href={profile.github.url}
                  target="_blank"
                  rel="noopener"
                >
                  {profile.github.label} ↗
                </a>
                <a
                  className="lnk"
                  href={profile.linkedin.url}
                  target="_blank"
                  rel="noopener"
                >
                  {profile.linkedin.label} ↗
                </a>
              </div>
            </div>
          </section>

          <div className="rule" aria-hidden="true" />

          {/* About */}
          <SectionShell id="about" label="About" first>
            <p className="lead">
              {about.leadPrefix}
              <em>{about.leadEmphasis}</em>
              {about.leadSuffix}
            </p>
            <p className="prose">{about.prose}</p>
          </SectionShell>

          {/* Work */}
          <SectionShell id="work" label="Selected work">
            <div className="pieces">
              {projects.map((project) => (
                <ProjectRow key={project.title} project={project} />
              ))}
            </div>
          </SectionShell>

          {/* Stack */}
          <SectionShell id="stack" label="Skills & stack">
            <dl className="stack-rows">
              {skillGroups.map((group) => (
                <div key={group.label} className="row">
                  <dt className="mono">{group.label}</dt>
                  <dd>
                    {group.items.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
            <pre
              className="manifest"
              aria-label="Stack at a glance, written as a Maven dependency list"
            >
              <code>
                <span className="c">{manifestComment}</span>
                {'\n'}
                <span className="t">&lt;dependencies&gt;</span>
                {'\n'}
                {manifestLines.map((line, i) => (
                  <span key={i}>
                    {'  '}
                    <span className="t">{line.tag}</span>
                    <span className="v">{line.value}</span>
                    <span className="t">{line.closeTag}</span>
                    {'\n'}
                  </span>
                ))}
                <span className="t">&lt;/dependencies&gt;</span>
              </code>
            </pre>
          </SectionShell>

          {/* Experience */}
          <SectionShell id="experience" label="Experience">
            <p className="xp-lead">{experience.lead}</p>
            <ul className="tags" aria-label="Areas of work">
              {experience.tags.map((tag) => (
                <li key={tag} className="tag">
                  {tag}
                </li>
              ))}
            </ul>
          </SectionShell>

          {/* Contact */}
          <SectionShell id="contact" label="Contact" className="contact">
            <h2>
              Have something worth <em>building?</em>
            </h2>
            <CopyEmailButton email={profile.email} />
            <dl className="contact-rows">
              {contactRows.map((row) => (
                <div key={row.label} className="row">
                  <dt className="mono">{row.label}</dt>
                  <dd>
                    {row.url ? (
                      <a href={row.url} target="_blank" rel="noopener">
                        {row.value}
                      </a>
                    ) : (
                      row.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </SectionShell>
        </main>

        <Footer />
      </div>
    </>
  )
}

import { useState } from 'react'
import { useTheme } from './lib/useTheme'
import { useMotionScope } from './lib/motion/useMotionScope'
import Header from './components/Header'
import Footer from './components/Footer'
import SectionShell from './components/SectionShell'
import ProjectsCarouselSection from './components/ProjectsCarouselSection'
import LazyHeroLattice from './components/LazyHeroLattice'
import ScrollProgress from './components/ScrollProgress'
import CopyEmailButton from './components/CopyEmailButton'
import ContactForm from './components/ContactForm'
import Preloader from './components/Preloader'
import BlurText from './components/reactbits/BlurText'
import AboutSection from './components/AboutSection'
import {
  contactRows,
  experience,
  manifestComment,
  manifestLines,
  profile,
  skillGroups,
} from './data'

export default function App() {
  const { toggle } = useTheme()
  useMotionScope()
  const [preloaderComplete, setPreloaderComplete] = useState(false)

  return (
    <>
      {!preloaderComplete && (
        <Preloader onComplete={() => setPreloaderComplete(true)} />
      )}
      <a href="#top" className="skip-link">
        Skip to content
      </a>
      <ScrollProgress />
      <div className="page">
        <Header toggle={toggle} />

        <main id="top">
          {/* Hero */}
          <section className="hero" aria-label="Introduction">
            <LazyHeroLattice />
            <div className="hero-identity">
              <p className="kicker mono">
                <b>{profile.kicker}</b>
                <span className="kicker-sep" aria-hidden="true">·</span>
                <span>{profile.location}</span>
              </p>
              <h1
                className="name"
                aria-label={`${profile.name.first} ${profile.name.middle} ${profile.name.last}`}
              >
                <span className="name-line line-1">
                  <BlurText
                    text={profile.name.first}
                    delay={35}
                    animateBy="letters"
                    direction="top"
                    as="span"
                    ariaHidden
                    initialDelay={0}
                    stepDuration={0.32}
                    animationFrom={{ filter: 'blur(10px)', opacity: 0, y: 22 }}
                    animationTo={[
                      { filter: 'blur(4px)', opacity: 0.7, y: 6 },
                      { filter: 'blur(0px)', opacity: 1, y: 0 },
                    ]}
                    easing={[0.2, 0.7, 0.2, 1]}
                  />
                </span>
                <span className="name-line line-2 mid">
                  <BlurText
                    text={profile.name.middle}
                    delay={35}
                    animateBy="letters"
                    direction="top"
                    as="span"
                    ariaHidden
                    initialDelay={0.14}
                    stepDuration={0.32}
                    animationFrom={{ filter: 'blur(10px)', opacity: 0, y: 22 }}
                    animationTo={[
                      { filter: 'blur(4px)', opacity: 0.7, y: 6 },
                      { filter: 'blur(0px)', opacity: 1, y: 0 },
                    ]}
                    easing={[0.2, 0.7, 0.2, 1]}
                  />
                </span>
                <span className="name-line line-3 last">
                  <BlurText
                    text={profile.name.last}
                    delay={35}
                    animateBy="letters"
                    direction="top"
                    as="span"
                    ariaHidden
                    initialDelay={0.28}
                    stepDuration={0.32}
                    animationFrom={{ filter: 'blur(10px)', opacity: 0, y: 22 }}
                    animationTo={[
                      { filter: 'blur(4px)', opacity: 0.7, y: 6 },
                      { filter: 'blur(0px)', opacity: 1, y: 0 },
                    ]}
                    easing={[0.2, 0.7, 0.2, 1]}
                  />
                </span>
              </h1>
              <p className="role mono">{profile.role}</p>
            </div>
            <div className="hero-side">
              <p className="tagline">{profile.tagline}</p>
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
                {profile.resume?.available && (
                  <a
                    className="lnk"
                    href={profile.resume.url}
                    target="_blank"
                    rel="noopener"
                    aria-label="Download resume (PDF)"
                  >
                    Download resume
                  </a>
                )}
              </div>
            </div>
            <div className="hero-scroll-hint" aria-hidden="true">
              <span className="scroll-line" />
            </div>
          </section>

          {/* About */}
          <AboutSection />

          {/* Work */}
          <ProjectsCarouselSection />

          {/* Stack */}
          <SectionShell id="stack" label="Skills & stack">
            <dl className="stack-rows">
              {skillGroups.map((group) => (
                <div key={group.label} className="row">
                  <dt className="mono">{group.label}</dt>
                  <dd>
                    {group.items.map((item, idx) => (
                      <span key={item}>
                        {idx > 0 && (
                          <span className="sep" aria-hidden="true">
                            /
                          </span>
                        )}
                        {item}
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
            <pre
              className="manifest"
              tabIndex={0}
              aria-label="Stack at a glance, written as a Maven dependency list"
            >
              <code>
                <span className="m-line">
                  <span className="c">{manifestComment}</span>
                </span>
                <span className="m-line">
                  <span className="t">&lt;dependencies&gt;</span>
                </span>
                {manifestLines.map((line, i) => (
                  <span key={i} className="m-line">
                    {'  '}
                    <span className="t">{line.tag}</span>
                    <span className="v">{line.value}</span>
                    <span className="t">{line.closeTag}</span>
                  </span>
                ))}
                <span className="m-line">
                  <span className="t">&lt;/dependencies&gt;</span>
                </span>
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
            <ContactForm email={profile.email} />
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
              {profile.resume?.available && (
                <div className="row">
                  <dt className="mono">Resume</dt>
                  <dd>
                    <a
                      href={profile.resume.url}
                      target="_blank"
                      rel="noopener"
                      aria-label="Download resume (PDF)"
                    >
                      Download resume
                    </a>
                  </dd>
                </div>
              )}
            </dl>
          </SectionShell>
        </main>

        <Footer />
      </div>
    </>
  )
}

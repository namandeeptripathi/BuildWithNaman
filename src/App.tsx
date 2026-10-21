import { useState } from 'react'
import { useTheme } from './lib/useTheme'
import { useMotionScope } from './lib/motion/useMotionScope'
import Header from './components/Header'
import Footer from './components/Footer'
import ProjectsCarouselSection from './components/ProjectsCarouselSection'
import LazyHeroLattice from './components/LazyHeroLattice'
import ScrollProgress from './components/ScrollProgress'
import Preloader from './components/Preloader'
import BlurText from './components/reactbits/BlurText'
import AboutSection from './components/AboutSection'
import SkillsSection from './components/SkillsSection'
import ContactSection from './components/ContactSection'
import { profile } from './data'

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
          <SkillsSection />

          {/* Contact */}
          <ContactSection />
        </main>

        <Footer />
      </div>
    </>
  )
}

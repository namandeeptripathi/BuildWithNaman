import SectionShell from './SectionShell'
import { about } from '../data'

interface Principle {
  idx: string
  title: string
  tag: string
  desc: string
}

const PRINCIPLES: Principle[] = [
  {
    idx: '01',
    title: 'Build useful software',
    tag: 'UTILITY',
    desc: 'Crafting dependable, user-focused applications designed for production reliability and real-world utility.',
  },
  {
    idx: '02',
    title: 'Solve technical problems',
    tag: 'SYSTEMS',
    desc: 'Approaching backend complexity, distributed data flows, and performance bottlenecks through methodical engineering.',
  },
  {
    idx: '03',
    title: 'Keep experimenting',
    tag: 'LEARNING',
    desc: 'Continually prototyping new ideas, integrating modern AI/ML workflows, and advancing engineering skill with every build.',
  },
]

/**
 * Editorial About section with choreographed line reveals,
 * gold emphasis, subtle technical SVG motif, and core principles.
 */
export default function AboutSection() {
  return (
    <>
      {/* Top Divider with viewport-triggered draw animation */}
      <div className="about-divider" aria-hidden="true">
        <div className="about-divider-line" />
      </div>

      <SectionShell
        id="about"
        label="About"
        first
      >
        {/* Line-by-line masked editorial headline */}
        <h3
          className="lead about-lead"
          aria-label="I'm a software developer interested in backend engineering, building web applications, and developing AI-powered solutions."
        >
          <span className="about-line-mask">
            <span className="about-line">
              I'm a software developer interested in{' '}
            </span>
          </span>
          <span className="about-line-mask">
            <span className="about-line">
              <em>backend engineering</em>, building web applications,{' '}
            </span>
          </span>
          <span className="about-line-mask">
            <span className="about-line">
              and developing <em>AI-powered solutions</em>.
            </span>
          </span>
        </h3>

        {/* Staggered body prose */}
        <p className="prose about-prose">{about.prose}</p>

        {/* Supporting principles triad */}
        <div className="about-principles" aria-label="Core Engineering Principles">
          <div className="about-principles-header" aria-hidden="true">
            <span className="principles-kicker mono">CORE PRINCIPLES</span>
            <span className="about-principles-line" />
          </div>

          <div className="principles-grid">
            {PRINCIPLES.map((item) => (
              <div key={item.idx} className="about-principle">
                <div className="principle-meta">
                  <span className="principle-idx mono">{item.idx}</span>
                  <span className="principle-tag mono">{item.tag}</span>
                </div>
                <h4 className="principle-title">{item.title}</h4>
                <p className="principle-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionShell>
    </>
  )
}

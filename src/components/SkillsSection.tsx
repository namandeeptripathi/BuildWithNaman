import { useEffect, useRef, useState } from 'react'
import SectionShell from './SectionShell'
import TechConstellation from './TechConstellation'
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion'

/**
 * Interactive Technology Constellation Ecosystem:
 * - 5 architectural sectors with clean SVG connection lines
 * - Interactive hover, focus, and click-to-select with zero layout jitter
 * - Razor-sharp DOM typography aligned with editorial portfolio design
 * - All 24 technologies across 7 categories preserved from source data
 * - Full keyboard accessibility, touch support, and reduced-motion compliance
 */
export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const prefersReducedMotion = usePrefersReducedMotion()
  const [motionReady, setMotionReady] = useState(false)
  const [revealed, setRevealed] = useState(prefersReducedMotion)

  useEffect(() => {
    if (prefersReducedMotion) {
      setRevealed(true)
      return
    }

    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true)
          observer.disconnect()
        } else {
          setMotionReady(true)
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px',
      }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [prefersReducedMotion])

  return (
    <SectionShell
      ref={sectionRef}
      id="stack"
      label="Skills & stack"
      className="stack-section"
      data-motion={motionReady ? 'true' : 'false'}
      data-revealed={revealed ? 'true' : 'false'}
    >
      <TechConstellation inView={revealed} />
    </SectionShell>
  )
}


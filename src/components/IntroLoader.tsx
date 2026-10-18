import { useEffect, useState } from 'react'
import { animate } from 'animejs'

interface Props {
  onComplete: () => void
}

export default function IntroLoader({ onComplete }: Props) {
  const [progress, setProgress] = useState(0)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    const started = performance.now()
    const duration = 1650
    let frame = 0
    let finished = false

    const finish = () => {
      if (finished) return
      finished = true
      const overlay = document.querySelector('.intro-loader')
      if (overlay) {
        animate(overlay, {
          opacity: [1, 0],
          translateY: ['0%', '-2%'],
          duration: 520,
          ease: 'inOut(3)',
          onComplete,
        })
      } else onComplete()
    }

    const tick = () => {
      const elapsed = performance.now() - started
      const eased = 1 - Math.pow(1 - Math.min(1, elapsed / duration), 2.2)
      const next = Math.min(100, Math.round(eased * 100))
      setProgress(next)
      if (next < 100 && !finished) frame = requestAnimationFrame(tick)
      else finish()
    }

    frame = requestAnimationFrame(tick)
    const safety = window.setTimeout(finish, 2500)

    return () => {
      cancelAnimationFrame(frame)
      window.clearTimeout(safety)
    }
  }, [onComplete])

  const skip = () => {
    if (leaving) return
    setLeaving(true)
    const overlay = document.querySelector('.intro-loader')
    if (overlay) {
      animate(overlay, { opacity: [1, 0], duration: 220, ease: 'out(2)', onComplete })
    } else onComplete()
  }

  return (
    <div className={`intro-loader${leaving ? ' is-leaving' : ''}`} role="status" aria-label="Loading portfolio">
      <div className="intro-grid" aria-hidden="true" />
      <div className="intro-orbit intro-orbit-a" aria-hidden="true" />
      <div className="intro-orbit intro-orbit-b" aria-hidden="true" />
      <div className="intro-core" aria-hidden="true"><span>N</span></div>
      <div className="intro-copy">
        <p className="mono intro-eyebrow">NDT / DIGITAL PORTFOLIO</p>
        <p className="intro-title">Building <em>what's next.</em></p>
        <div className="intro-status">
          <span>INITIALIZING EXPERIENCE</span>
          <span>{String(progress).padStart(2, '0')}%</span>
        </div>
        <div className="intro-progress"><span style={{ width: `${progress}%` }} /></div>
      </div>
      <button className="intro-skip mono" type="button" onClick={skip}>SKIP INTRO ↗</button>
    </div>
  )
}

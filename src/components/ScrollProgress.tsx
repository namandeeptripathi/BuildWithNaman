import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion'

/**
 * Fixed 2px brass bar at the top of the viewport that scales
 * horizontally with scroll progress. Also drives the hero name
 * parallax effect.
 */
export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)
  const reduce = usePrefersReducedMotion()

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return

    let ticking = false

    function onScroll() {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        if (!bar) return
        const y = window.pageYOffset || 0
        const max = Math.max(
          1,
          document.documentElement.scrollHeight - window.innerHeight,
        )
        bar.style.transform = `scaleX(${Math.min(1, y / max)})`

        // Hero name parallax
        if (!reduce && y < 1000) {
          const lines = document.querySelectorAll<HTMLElement>('h1.name > span')
          if (lines.length === 3) {
            lines[0].style.transform = `translateX(${-y * 0.06}px)`
            lines[1].style.transform = `translateX(${y * 0.12}px)`
            lines[2].style.transform = `translateX(${-y * 0.03}px)`
          }
        }
        ticking = false
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [reduce])

  return (
    <div
      className="progress"
      ref={barRef}
      aria-hidden="true"
    />
  )
}

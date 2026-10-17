import { useEffect } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

/**
 * Adds 3D tilt + brass spotlight to `.piece` cards on pointer-capable
 * devices, exactly matching the reference behavior. Disabled under
 * prefers-reduced-motion.
 */
export function useTilt() {
  const reduce = usePrefersReducedMotion()

  useEffect(() => {
    if (reduce) return
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    if (!mq.matches) return

    const pieces = document.querySelectorAll<HTMLElement>('.piece')

    function onMove(this: HTMLElement, e: PointerEvent) {
      const r = this.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width
      const y = (e.clientY - r.top) / r.height
      this.style.setProperty('--mx', `${x * 100}%`)
      this.style.setProperty('--my', `${y * 100}%`)
      this.style.transform = `perspective(1000px) rotateX(${(0.5 - y) * 3.5}deg) rotateY(${(x - 0.5) * 5}deg)`
    }

    function onLeave(this: HTMLElement) {
      this.style.transform = ''
    }

    pieces.forEach((p) => {
      p.addEventListener('pointermove', onMove as EventListener)
      p.addEventListener('pointerleave', onLeave as EventListener)
    })

    return () => {
      pieces.forEach((p) => {
        p.removeEventListener('pointermove', onMove as EventListener)
        p.removeEventListener('pointerleave', onLeave as EventListener)
      })
    }
  }, [reduce])
}

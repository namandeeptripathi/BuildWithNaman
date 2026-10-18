import { useEffect } from 'react'

export default function PointerHalo() {
  useEffect(() => {
    if (
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) return

    const halo = document.createElement('div')
    halo.className = 'pointer-halo'
    halo.setAttribute('aria-hidden', 'true')
    document.body.appendChild(halo)

    let x = 0
    let y = 0
    let targetX = 0
    let targetY = 0
    let frame = 0

    const move = (event: PointerEvent) => {
      targetX = event.clientX
      targetY = event.clientY
      halo.classList.add('is-visible')
    }
    const render = () => {
      x += (targetX - x) * 0.18
      y += (targetY - y) * 0.18
      halo.style.transform = `translate3d(${x}px, ${y}px, 0)`
      frame = requestAnimationFrame(render)
    }

    window.addEventListener('pointermove', move, { passive: true })
    frame = requestAnimationFrame(render)
    return () => {
      window.removeEventListener('pointermove', move)
      cancelAnimationFrame(frame)
      halo.remove()
    }
  }, [])
  return null
}

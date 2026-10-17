import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

/**
 * Adds the `.rv` class (opacity 0.35 + translateY) to selected child elements,
 * then promotes them to `.in` when they enter the viewport.
 *
 * Selector string should match the reference's reveal targets.
 * Attach the returned ref to the scrollable container (or pass a root ref).
 */
export function useReveal(
  selector: string =
    '.lead,.prose,.piece,.stack-rows .row,.manifest,.xp-lead,.xp-lead + .tags,.contact h2:not(.label),.mailrow,.contact-rows .row',
) {
  const reduce = usePrefersReducedMotion()
  const attached = useRef(false)

  useEffect(() => {
    if (reduce || attached.current) return
    attached.current = true

    const root = document.documentElement
    root.classList.add('js')

    const items = Array.from(document.querySelectorAll<HTMLElement>(selector))
    items.forEach((el) => {
      el.classList.add('rv')
      const idx = Array.from(el.parentElement?.children ?? []).indexOf(el)
      el.style.transitionDelay = `${Math.min(idx, 6) * 60}ms`
    })

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return
          const el = en.target as HTMLElement
          el.classList.add('in')
          io.unobserve(el)
          setTimeout(() => {
            el.style.transitionDelay = ''
            el.classList.add('done')
          }, 1200)
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    )

    items.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [reduce, selector])
}

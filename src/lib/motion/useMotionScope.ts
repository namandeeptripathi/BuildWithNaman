import { useEffect } from 'react'
import { usePrefersReducedMotion } from '../usePrefersReducedMotion'

/**
 * Creates one master Anime.js scope with createScope().
 * Runs scroll-driven motion only when (prefers-reduced-motion: no-preference).
 * Dynamically loads the motion layer so hero initial paint (LCP/FCP) is never delayed.
 * Under reduced motion, no animations run and every element shows its final state immediately.
 * Cleanly reverts all animations, observers, and DOM classes on cleanup (safe in React StrictMode).
 */
export function useMotionScope() {
  const reduce = usePrefersReducedMotion()

  useEffect(() => {
    if (reduce) return

    let cancelled = false
    let revertScope: (() => void) | null = null
    const rootEl = document.documentElement

    Promise.all([
      import('animejs'),
      import('./revealSections'),
      import('./stackStagger'),
      import('./manifestReveal'),
      import('./workLine'),
    ]).then(
      ([
        anime,
        { initRevealSections },
        { initStackStagger },
        { initManifestReveal },
        { initWorkLine },
      ]) => {
        if (cancelled) return

        rootEl.classList.add('motion-ready')
        const scope = anime.createScope({ root: document.documentElement })

        scope.add(() => {
          initRevealSections(document)
          initStackStagger(document)
          initManifestReveal(document)
          const cleanupWorkLine = initWorkLine(document)

          return () => {
            cleanupWorkLine()
          }
        })

        revertScope = () => {
          scope.revert()
          rootEl.classList.remove('motion-ready')
        }
      },
    )

    return () => {
      cancelled = true
      if (revertScope) {
        revertScope()
      } else {
        rootEl.classList.remove('motion-ready')
      }
    }
  }, [reduce])
}

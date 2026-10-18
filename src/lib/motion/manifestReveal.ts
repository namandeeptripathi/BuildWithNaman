import { animate, onScroll, stagger } from 'animejs'

/**
 * Effect B2: Maven-style manifest line-by-line reveal.
 *
 * Each line fades and slides ~8px with a 60ms stagger, playing once on enter.
 * Preserves clean line elements without splitting into per-character DOM nodes
 * for accessibility and clean text selection.
 */
export function initManifestReveal(root: HTMLElement | Document = document) {
  const manifestEl = root.querySelector<HTMLElement>('#stack .manifest')
  if (!manifestEl) return

  onScroll({
    target: manifestEl,
    enter: 'bottom 15%',
    repeat: false,
    onEnter: () => {
      const lines = manifestEl.querySelectorAll<HTMLElement>('.m-line')
      if (lines.length === 0) return

      animate(Array.from(lines), {
        y: [8, 0],
        opacity: [0.35, 1],
        duration: 700,
        delay: stagger(60),
        ease: 'outExpo',
      })
    },
  })
}

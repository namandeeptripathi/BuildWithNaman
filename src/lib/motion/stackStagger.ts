import { animate, onScroll } from 'animejs'

/**
 * Effect B1: Stack rows stagger with brass "/" separator reveals.
 *
 * The seven stack rows enter with a ~70ms stagger.
 * Inside each row, the brass "/" separators fade in just after their row enters.
 * Triggers once when the stack rows enter the viewport by ~15%.
 */
export function initStackStagger(root: HTMLElement | Document = document) {
  const stackRowsEl = root.querySelector<HTMLElement>('#stack .stack-rows')
  if (!stackRowsEl) return

  onScroll({
    target: stackRowsEl,
    enter: 'bottom 15%',
    repeat: false,
    onEnter: () => {
      const rows = stackRowsEl.querySelectorAll<HTMLElement>('.row')
      rows.forEach((row, index) => {
        const rowDelay = index * 70

        // 1. Stack row fades and rises
        animate(row, {
          y: [24, 0],
          opacity: [0.35, 1],
          duration: 800,
          delay: rowDelay,
          ease: 'outExpo',
        })

        // 2. Brass "/" separators fade in just after their row
        const seps = row.querySelectorAll<HTMLElement>('.sep')
        if (seps.length > 0) {
          animate(Array.from(seps), {
            opacity: [0, 1],
            duration: 450,
            delay: rowDelay + 220,
            ease: 'outQuad',
          })
        }
      })
    },
  })
}

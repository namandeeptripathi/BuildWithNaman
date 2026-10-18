import { animate, onScroll, stagger } from 'animejs'

/**
 * Effect A: Section reveal for About, Work, Stack, Experience, and Contact.
 *
 * Section labels slide in from the left (~16px), while sibling content
 * blocks fade and rise with a ~70ms stagger (800ms duration, outExpo ease).
 * Triggers once when ~15% enters viewport and does not replay on scroll back.
 */
export function initRevealSections(root: HTMLElement | Document = document) {
  const sectionIds = ['about', 'work', 'stack', 'experience', 'contact']

  sectionIds.forEach((id) => {
    const section = root.querySelector<HTMLElement>(`#${id}`)
    if (!section) return

    // 1. Section label slides in from left
    const label = section.querySelector<HTMLElement>(':scope > .label, .sec-label, .label')
    if (label) {
      onScroll({
        target: label,
        enter: 'bottom 15%',
        repeat: false,
        onEnter: () => {
          animate(label, {
            x: [-16, 0],
            opacity: [0.35, 1],
            duration: 800,
            ease: 'outExpo',
          })
        },
      })
    }

    // 2. Section content items
    if (id === 'about') {
      const items = section.querySelectorAll<HTMLElement>('.lead, .prose')
      if (items.length > 0) {
        onScroll({
          target: section,
          enter: 'bottom 15%',
          repeat: false,
          onEnter: () => {
            animate(Array.from(items), {
              y: [24, 0],
              opacity: [0.35, 1],
              duration: 800,
              delay: stagger(70),
              ease: 'outExpo',
            })
          },
        })
      }
    } else if (id === 'work') {
      // Each project row enters independently as user scrolls to it
      const pieces = section.querySelectorAll<HTMLElement>('.pieces > .piece')
      pieces.forEach((piece) => {
        onScroll({
          target: piece,
          enter: 'bottom 15%',
          repeat: false,
          onEnter: () => {
            animate(piece, {
              y: [24, 0],
              opacity: [0.35, 1],
              duration: 850,
              ease: 'outExpo',
            })
          },
        })
      })
    } else if (id === 'experience') {
      const items = section.querySelectorAll<HTMLElement>('.xp-lead, .tags')
      if (items.length > 0) {
        onScroll({
          target: section,
          enter: 'bottom 15%',
          repeat: false,
          onEnter: () => {
            animate(Array.from(items), {
              y: [24, 0],
              opacity: [0.35, 1],
              duration: 800,
              delay: stagger(70),
              ease: 'outExpo',
            })
          },
        })
      }
    } else if (id === 'contact') {
      const heading = section.querySelector<HTMLElement>('h2:not(.label)')
      const mailrow = section.querySelector<HTMLElement>('.mailrow')
      const rows = section.querySelectorAll<HTMLElement>('.contact-rows .row')
      const items: HTMLElement[] = []
      if (heading) items.push(heading)
      if (mailrow) items.push(mailrow)
      rows.forEach((r) => items.push(r))

      if (items.length > 0) {
        onScroll({
          target: section,
          enter: 'bottom 15%',
          repeat: false,
          onEnter: () => {
            animate(items, {
              y: [24, 0],
              opacity: [0.35, 1],
              duration: 800,
              delay: stagger(70),
              ease: 'outExpo',
            })
          },
        })
      }
    }
  })
}

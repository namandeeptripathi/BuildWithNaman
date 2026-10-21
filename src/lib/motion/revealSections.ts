import { animate, onScroll, stagger } from 'animejs'

/**
 * Effect A: Section reveal for About, Work, Stack, Experience, and Contact.
 *
 * Section labels slide in from the left (~16px), while sibling content
 * blocks fade and rise with a ~70ms stagger (800ms duration, outExpo ease).
 * Triggers once when ~15% enters viewport and does not replay on scroll back.
 */
export function initRevealSections(root: HTMLElement | Document = document) {
  const sectionIds = ['about', 'work', 'stack', 'contact']

  sectionIds.forEach((id) => {
    const section = root.querySelector<HTMLElement>(`#${id}`)
    if (!section) return

    // 1. Section label slides in from left (for sections other than about and stack)
    if (id !== 'about' && id !== 'stack') {
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
    }

    // 2. Section content items
    if (id === 'about') {
      onScroll({
        target: section,
        enter: 'bottom 18%',
        repeat: false,
        onEnter: () => {
          // 1. Animate top divider drawing across
          const divider = root.querySelector<HTMLElement>('.about-divider-line')
          if (divider) {
            animate(divider, {
              scaleX: [0, 1],
              opacity: [0.15, 0.35],
              duration: 900,
              ease: 'outExpo',
            })
          }

          // 2. Reveal ABOUT label with subtle fade and upward movement
          const aboutLabel = section.querySelector<HTMLElement>(':scope > .label, .label')
          if (aboutLabel) {
            animate(aboutLabel, {
              y: [16, 0],
              opacity: [0, 1],
              duration: 800,
              ease: 'outExpo',
            })
          }

          // 3. Reveal subtle technical motif in negative space
          const motifLine = section.querySelector<SVGElement>('.about-motif-line')
          const motifNodes = section.querySelectorAll<SVGElement>('.about-motif-node')
          if (motifLine) {
            animate(motifLine, {
              scaleY: [0, 1],
              opacity: [0, 0.35],
              duration: 950,
              delay: 150,
              ease: 'outExpo',
            })
          }
          if (motifNodes.length > 0) {
            animate(Array.from(motifNodes), {
              scale: [0, 1],
              opacity: [0, 0.85],
              duration: 650,
              delay: stagger(120, { start: 400 }),
              ease: 'outBack',
            })
          }

          // 4. Reveal headline line-by-line using smooth clip / slide
          const lines = section.querySelectorAll<HTMLElement>('.about-line')
          if (lines.length > 0) {
            animate(Array.from(lines), {
              y: ['110%', '0%'],
              opacity: [0, 1],
              duration: 900,
              delay: stagger(90, { start: 100 }),
              ease: 'outExpo',
            })
          }

          // 5. Fade and move body paragraph with short stagger after headline
          const prose = section.querySelector<HTMLElement>('.about-prose')
          if (prose) {
            animate(prose, {
              y: [20, 0],
              opacity: [0, 1],
              duration: 850,
              delay: 380,
              ease: 'outExpo',
            })
          }

          // 6. Reveal supporting principles sequence & gold connector line
          const principlesLine = section.querySelector<HTMLElement>('.about-principles-line')
          if (principlesLine) {
            animate(principlesLine, {
              scaleX: [0, 1],
              opacity: [0, 1],
              duration: 800,
              delay: 460,
              ease: 'outExpo',
            })
          }

          const principles = section.querySelectorAll<HTMLElement>('.about-principle')
          if (principles.length > 0) {
            animate(Array.from(principles), {
              y: [20, 0],
              opacity: [0, 1],
              duration: 800,
              delay: stagger(110, { start: 520 }),
              ease: 'outExpo',
            })
          }
        },
      })
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
    } else if (id === 'contact') {
      const heading = section.querySelector<HTMLElement>('.contact-headline')
      const prose = section.querySelector<HTMLElement>('.contact-prose')
      const mailrow = section.querySelector<HTMLElement>('.mailrow')
      const grid = section.querySelector<HTMLElement>('.contact-grid')
      const items: HTMLElement[] = []
      if (heading) items.push(heading)
      if (prose) items.push(prose)
      if (mailrow) items.push(mailrow)
      if (grid) items.push(grid)

      if (items.length > 0) {
        onScroll({
          target: section,
          enter: 'bottom 15%',
          repeat: false,
          onEnter: () => {
            animate(items, {
              y: [20, 0],
              opacity: [0.35, 1],
              duration: 800,
              delay: stagger(60),
              ease: 'outExpo',
            })
          },
        })
      }
    }
  })
}

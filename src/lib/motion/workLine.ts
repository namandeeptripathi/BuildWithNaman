import { createTimeline, onScroll, svg } from 'animejs'
import type { ScrollObserver, Timeline } from 'animejs'

/**
 * Effect C: Scroll-linked brass line in the Work section (Desktop > 820px).
 *
 * Runs a 1px brass line from below the "Selected work" label down to the end
 * of the last project. Scrubbed via onScroll with sync so it reverses on scroll up.
 * 3 circular nodes align to project titles:
 * - TrendSole: fills in (live)
 * - CoroVista: fills in (live)
 * - DevFlow-AI: stays hollow (in progress)
 * Sized from section's real height with a debounced ResizeObserver.
 * Colors read from CSS variables (var(--brass), var(--bg)) for immediate theme updates.
 */
function getOffsetTop(el: HTMLElement, root: HTMLElement): number {
  let top = 0
  let curr: HTMLElement | null = el
  while (curr && curr !== root) {
    top += curr.offsetTop
    curr = curr.offsetParent as HTMLElement | null
  }
  return top
}

function getOffsetLeft(el: HTMLElement, root: HTMLElement): number {
  let left = 0
  let curr: HTMLElement | null = el
  while (curr && curr !== root) {
    left += curr.offsetLeft
    curr = curr.offsetParent as HTMLElement | null
  }
  return left
}

export function initWorkLine(root: HTMLElement | Document = document): () => void {
  const workSection = root.querySelector<HTMLElement>('#work')
  if (!workSection) return () => {}

  let activeScroller: ScrollObserver | null = null
  let activeTimeline: Timeline | null = null
  let resizeTimeout: ReturnType<typeof setTimeout> | null = null

  function cleanupActive() {
    if (activeScroller) {
      activeScroller.revert()
      activeScroller = null
    }
    if (activeTimeline) {
      activeTimeline.revert()
      activeTimeline = null
    }
  }

  function setup() {
    cleanupActive()

    // Desktop only (> 820px)
    if (window.innerWidth <= 820) return

    const label = workSection?.querySelector<HTMLElement>('.label')
    const pieces = workSection?.querySelectorAll<HTMLElement>('.pieces > .piece')
    const svgEl = workSection?.querySelector<SVGSVGElement>('.work-line-svg')
    const lineEl = svgEl?.querySelector<SVGLineElement>('.work-line')

    if (!workSection || !label || !pieces || pieces.length === 0 || !svgEl || !lineEl) return

    const labelTop = getOffsetTop(label, workSection)
    const labelLeft = getOffsetLeft(label, workSection)
    const labelHeight = label.offsetHeight
    const lastPiece = pieces[pieces.length - 1]
    const lastPieceTop = getOffsetTop(lastPiece, workSection)
    const lastPieceBottom = lastPieceTop + lastPiece.offsetHeight

    // Align line horizontally with label left margin (+4px inset)
    const x = labelLeft + 4
    const yStart = labelTop + labelHeight + 14
    const yEnd = lastPieceBottom - 24
    const totalLineLength = Math.max(1, yEnd - yStart)

    // Compute title vertical center for each project
    const nodePositions: number[] = []
    pieces.forEach((piece) => {
      const title = piece.querySelector<HTMLElement>('h3')
      const targetEl = title ?? piece
      const targetTop = getOffsetTop(targetEl, workSection)
      const nodeY = Math.round(targetTop + targetEl.offsetHeight / 2)
      nodePositions.push(nodeY)
    })

    // Sizing SVG
    const secWidth = workSection.offsetWidth
    const secHeight = workSection.offsetHeight
    svgEl.setAttribute('viewBox', `0 0 ${secWidth} ${secHeight}`)
    svgEl.style.width = `${secWidth}px`
    svgEl.style.height = `${secHeight}px`

    // Line coordinates
    lineEl.setAttribute('x1', String(x))
    lineEl.setAttribute('y1', String(yStart))
    lineEl.setAttribute('x2', String(x))
    lineEl.setAttribute('y2', String(yEnd))

    // Position node circles
    const nodeGroups = svgEl.querySelectorAll<SVGGElement>('.work-node')
    nodeGroups.forEach((g, idx) => {
      const nodeY = nodePositions[idx] ?? yStart
      const circles = g.querySelectorAll<SVGCircleElement>('circle')
      circles.forEach((c) => {
        c.setAttribute('cx', String(x))
        c.setAttribute('cy', String(nodeY))
      })
    })

    // 1. Create Anime.js drawable proxy on the line element
    const [drawable] = svg.createDrawable(lineEl, 0, 0)

    // 2. Build scrubbed timeline (1000 units duration)
    const tl = createTimeline({
      duration: 1000,
      autoplay: false,
    })

    tl.add(
      drawable,
      {
        draw: '0 1',
        ease: 'linear',
        duration: 1000,
      },
      0,
    )

    // Compute relative progress at which the line reaches each project node
    const p0 = Math.max(0, Math.min(1, ((nodePositions[0] ?? yStart) - yStart) / totalLineLength))
    const p1 = Math.max(0, Math.min(1, ((nodePositions[1] ?? yStart) - yStart) / totalLineLength))

    const node0Fill = svgEl.querySelector<SVGCircleElement>('.work-node-0 .work-node-fill')
    const node1Fill = svgEl.querySelector<SVGCircleElement>('.work-node-1 .work-node-fill')

    // Node 0 (TrendSole) fills in as line passes through
    if (node0Fill) {
      tl.add(
        node0Fill,
        {
          opacity: [0, 1],
          ease: 'linear',
          duration: 40,
        },
        Math.round(p0 * 1000),
      )
    }

    // Node 1 (CoroVista) fills in as line passes through
    if (node1Fill) {
      tl.add(
        node1Fill,
        {
          opacity: [0, 1],
          ease: 'linear',
          duration: 40,
        },
        Math.round(p1 * 1000),
      )
    }
    // Node 2 (DevFlow-AI) stays hollow as it is in progress

    // 3. Link timeline to onScroll with sync
    const scroller = onScroll({
      target: workSection,
      enter: '75% top',
      leave: '25% bottom',
      sync: true,
    })
    scroller.link(tl)

    activeScroller = scroller
    activeTimeline = tl
  }

  // Initial setup
  setup()

  // Debounced ResizeObserver to recompute coordinates on layout shifts / window resize
  const ro = new ResizeObserver(() => {
    if (resizeTimeout) clearTimeout(resizeTimeout)
    resizeTimeout = setTimeout(() => {
      setup()
    }, 150)
  })

  ro.observe(workSection)

  // Scope cleanup callback
  return () => {
    if (resizeTimeout) clearTimeout(resizeTimeout)
    ro.disconnect()
    cleanupActive()
  }
}

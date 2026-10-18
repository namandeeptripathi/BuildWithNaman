import { useEffect, useRef, useState } from 'react'
import { createTimeline, createDrawable } from 'animejs'

interface PreloaderProps {
  onComplete?: () => void
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [isExiting, setIsExiting] = useState(false)
  const isExitedRef = useRef(false)
  const onCompleteRef = useRef(onComplete)
  useEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])

  const pathNRef = useRef<SVGPathElement | null>(null)
  const pathAmanRef = useRef<SVGPathElement | null>(null)
  const pathDRef = useRef<SVGPathElement | null>(null)
  const pathEepRef = useRef<SVGPathElement | null>(null)
  const pathFlourishRef = useRef<SVGPathElement | null>(null)
  const progressLineRef = useRef<SVGLineElement | null>(null)

  useEffect(() => {
    let exitTimeoutId: ReturnType<typeof setTimeout>
    let finishTimeoutId: ReturnType<typeof setTimeout>
    let fallbackTimeoutId: ReturnType<typeof setTimeout>
    let activeTimeline: ReturnType<typeof createTimeline> | null = null

    const triggerExit = () => {
      if (isExitedRef.current) return
      isExitedRef.current = true
      setIsExiting(true)
      finishTimeoutId = setTimeout(() => {
        onCompleteRef.current?.()
      }, 320)
    }

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      exitTimeoutId = setTimeout(() => {
        triggerExit()
      }, 200)

      return () => {
        clearTimeout(exitTimeoutId)
        clearTimeout(finishTimeoutId)
      }
    }

    if (
      !pathNRef.current ||
      !pathAmanRef.current ||
      !pathDRef.current ||
      !pathEepRef.current ||
      !pathFlourishRef.current ||
      !progressLineRef.current
    ) {
      triggerExit()
      return () => {
        clearTimeout(finishTimeoutId)
      }
    }

    // Safety fallback: ensure preloader never traps the user if animation stalls
    // Normal sequence: 2.9s draw + 0.2s hold + 0.32s fade = ~3.42s total
    fallbackTimeoutId = setTimeout(() => {
      triggerExit()
    }, 4000)

    // Initialize drawables using Anime.js v4 svg API
    const dN = createDrawable(pathNRef.current)
    const dAman = createDrawable(pathAmanRef.current)
    const dD = createDrawable(pathDRef.current)
    const dEep = createDrawable(pathEepRef.current)
    const dFlourish = createDrawable(pathFlourishRef.current)
    const dProgress = createDrawable(progressLineRef.current)

    // Construct sequential timeline matching the reference video's stroke order & pacing (~2.9s draw)
    const tl = createTimeline({
      onComplete: () => {
        // Hold completed signature for 200ms, then begin smooth fade-out
        exitTimeoutId = setTimeout(() => {
          triggerExit()
        }, 200)
      },
    })
    activeTimeline = tl

    // Stroke 1: Capital 'N' (0.0s – 0.58s = 580ms)
    tl.add(dN, { draw: ['0 0', '0 1'], duration: 580, ease: 'inOutQuad' }, 0)

    // Stroke 2: Cursive 'aman' (0.58s – 1.33s = 750ms)
    tl.add(dAman, { draw: ['0 0', '0 1'], duration: 750, ease: 'linear' }, 580)

    // Natural pen-lift pause between "Naman" and "Deep" (100ms: 1330ms – 1430ms)

    // Stroke 3: Capital 'D' (1.43s – 1.98s = 550ms)
    tl.add(dD, { draw: ['0 0', '0 1'], duration: 550, ease: 'inOutQuad' }, 1430)

    // Stroke 4: Cursive 'eep' with descender (1.98s – 2.46s = 480ms)
    tl.add(dEep, { draw: ['0 0', '0 1'], duration: 480, ease: 'linear' }, 1980)

    // Stroke 5: Underline flourish loop (2.46s – 2.90s = 440ms)
    tl.add(dFlourish, { draw: ['0 0', '0 1'], duration: 440, ease: 'outQuad' }, 2460)

    // Synchronized progress bar: precisely 0% to 100% over the full 2900ms drawing duration
    tl.add(dProgress, { draw: ['0 0', '0 1'], duration: 2900, ease: 'linear' }, 0)

    return () => {
      activeTimeline?.revert()
      clearTimeout(exitTimeoutId)
      clearTimeout(finishTimeoutId)
      clearTimeout(fallbackTimeoutId)
    }
  }, [])

  return (
    <div
      className={`preloader-overlay ${isExiting ? 'is-exiting' : ''}`}
      role="status"
      aria-label="Loading signature animation"
      aria-live="polite"
    >
      <svg
        className="preloader-svg"
        viewBox="0 0 1050 450"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="sig-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Signature strokes */}
        <g
          stroke="var(--ink, #E9E4D6)"
          strokeWidth="4.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#sig-glow)"
        >
          <path
            ref={pathNRef}
            d="M 155,250 C 125,260 108,235 116,205 C 130,150 165,85 205,68 C 215,64 224,72 220,90 C 210,145 186,225 176,265 C 174,274 182,275 192,260 C 214,225 240,155 262,135 C 272,125 282,130 280,150 C 276,185 268,230 274,255 C 276,264 286,262 300,248"
          />
          <path
            ref={pathAmanRef}
            d="M 300,248 C 312,235 324,220 338,220 C 324,220 312,232 312,244 C 312,255 322,260 334,252 C 342,246 345,234 345,224 C 345,238 344,252 348,260 C 352,265 358,264 365,252 C 372,238 380,222 390,220 C 396,220 398,228 396,242 C 394,254 392,260 397,260 C 402,260 410,238 418,222 C 424,220 428,228 426,242 C 424,254 422,260 427,260 C 432,260 440,238 448,222 C 454,220 458,228 456,242 C 454,254 452,260 458,260 C 466,260 476,245 486,232 C 498,220 510,220 514,230 C 502,230 492,238 492,248 C 492,258 502,262 512,254 C 518,246 521,236 521,224 C 521,238 520,252 524,260 C 528,265 534,264 540,252 C 546,238 552,222 560,220 C 565,220 568,228 566,242 C 564,254 562,260 568,260 C 572,260 576,252 580,244"
          />
          <path
            ref={pathDRef}
            d="M 660,68 C 646,128 630,208 622,258 C 619,268 610,268 608,258 C 610,244 620,230 638,204 C 674,144 728,72 720,52 C 712,32 668,36 630,58 C 605,72 592,102 602,126 C 614,150 640,180 664,212"
          />
          <path
            ref={pathEepRef}
            d="M 674,244 C 684,230 696,208 708,208 C 716,208 714,222 704,238 C 692,256 704,262 716,252 C 726,230 738,208 750,208 C 758,208 756,222 746,238 C 734,256 746,262 758,250 C 766,238 776,222 784,218 C 788,218 786,228 782,248 C 774,298 764,358 754,408 C 752,416 758,418 764,410 C 772,392 782,324 790,272 C 796,242 812,228 828,236 C 838,244 834,262 820,268 C 808,270 798,266 796,260 C 806,260 822,252 840,240"
          />
          <path
            ref={pathFlourishRef}
            stroke="var(--brass, #C8A25E)"
            strokeWidth="3.6"
            d="M 840,240 C 875,220 905,230 915,260 C 925,290 900,330 850,345 C 750,375 545,370 345,355 C 235,347 145,335 95,320"
          />
        </g>

        {/* Synchronized progress bar underneath */}
        <g transform="translate(365, 410)">
          <line
            x1="0"
            y1="0"
            x2="320"
            y2="0"
            stroke="var(--rule, #24342B)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            ref={progressLineRef}
            x1="0"
            y1="0"
            x2="320"
            y2="0"
            stroke="var(--brass, #C8A25E)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </div>
  )
}

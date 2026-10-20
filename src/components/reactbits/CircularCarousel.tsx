import React, { useCallback, useEffect, useImperativeHandle, useLayoutEffect, useMemo, useRef, useState } from 'react'

export interface CircularCarouselItem {
  src: string
  alt?: string
  title?: string
  subtitle?: string
}

export interface CircularCarouselHandle {
  focusIndex: (index: number) => void
  stepBy: (delta: number) => void
  getActiveIndex: () => number
}

export type CircularCarouselPreset = 'cylinder' | 'orbit' | 'wheel' | 'panorama'
export type CircularCarouselIntro = 'assemble' | 'rise' | 'spin' | 'none'
export type CircularCarouselAutoplay = 'drift' | 'step' | 'off'

export interface CircularCarouselProps<T = CircularCarouselItem> {
  items?: T[]
  preset?: CircularCarouselPreset
  intro?: CircularCarouselIntro
  cardWidth?: number
  cardHeight?: number
  aspectRatio?: number
  gap?: number
  curve?: number
  tilt?: number
  perspective?: number
  radius?: number
  autoplay?: CircularCarouselAutoplay
  speed?: number
  interval?: number
  direction?: 'left' | 'right'
  draggable?: boolean
  momentum?: number
  snap?: boolean
  pauseOnHover?: boolean
  focusOnClick?: boolean
  parallax?: number
  stretch?: number
  depthFade?: number
  fadeColor?: string
  innerShade?: number
  cornerRadius?: number
  captions?: boolean
  controlledAngle?: number
  targetIndex?: number
  onChange?: (index: number) => void
  onItemClick?: (item: T, index: number) => void
  renderCard?: (item: T, index: number, isActive: boolean) => React.ReactNode
  containerRef?: React.RefObject<HTMLElement | null>
  className?: string
  style?: React.CSSProperties
}

type Vec3 = [number, number, number]

interface Layout {
  axis: 'x' | 'y'
  tilt: number
  perspective: number
  curve: number
  spread: number
  inward: boolean
  billboard: boolean
  backfaces: boolean
  window: number
}

interface Tile {
  index: number
  total: number
  start: number
  end: number
  size: number
  move: string
}

interface Sample {
  time: number
  angle: number
}

interface Press {
  id: number
  x: number
  y: number
  angle: number
  moved: boolean
  origin: number
  samples: Sample[]
}

interface CarouselState {
  angle: number
  velocity: number
  target: number | null
  dir: number
  press: Press | null
  drag: boolean
  hover: boolean
  pointer: { inside: boolean; x: number; y: number }
  yaw: number
  pitch: number
  intro: { type: CircularCarouselIntro; start: number } | null
  introDone: boolean
  holdUntil: number
  stepAt: number
  suppressClick: boolean
  wheelTimer: ReturnType<typeof setTimeout> | undefined
  fit: number
  shift: number
  drop: number
  last: number
}

interface Settings {
  count: number
  step: number
  radius: number
  layout: Layout
  axis: 'x' | 'y'
  tilt: number
  perspective: number
  cardW: number
  cardH: number
  intro: CircularCarouselIntro
  autoplay: CircularCarouselAutoplay
  speed: number
  interval: number
  draggable: boolean
  momentum: number
  snap: boolean
  pauseOnHover: boolean
  parallax: number
  stretch: number
  depthFade: number
  captions: boolean
  reduced: boolean
}

interface IntroPose {
  radius: number
  lift: number
}

interface Leaving<T = any> {
  id: number
  items: T[]
  delays: number[]
}

const PRESETS: Record<CircularCarouselPreset, Layout> = {
  cylinder: {
    axis: 'y',
    tilt: -4,
    perspective: 2200,
    curve: 1,
    spread: 1.05,
    inward: false,
    billboard: false,
    backfaces: true,
    window: 0,
  },
  orbit: {
    axis: 'y',
    tilt: -16,
    perspective: 1500,
    curve: 0,
    spread: 1.45,
    inward: false,
    billboard: true,
    backfaces: false,
    window: 0,
  },
  wheel: {
    axis: 'x',
    tilt: 0,
    perspective: 1800,
    curve: 0,
    spread: 1,
    inward: false,
    billboard: false,
    backfaces: true,
    window: 1.7,
  },
  panorama: {
    axis: 'y',
    tilt: 0,
    perspective: 0,
    curve: 1,
    spread: 1,
    inward: true,
    billboard: false,
    backfaces: false,
    window: 0,
  },
}

const INTRO_LENGTH: Record<CircularCarouselIntro, number> = {
  assemble: 1500,
  rise: 1400,
  spin: 1800,
  none: 0,
}
const TILES = 8
const OVERLAP = 2.5
const DRAG_THRESHOLD = 5
const SPRING = 118
const SETTLE_SPEED = 9
const CAPTION_SPACE = 76
const SWAP_LENGTH = 700
const SWAP_SPREAD = 420
const TO_RAD = Math.PI / 180

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))
const wrap = (degrees: number) => (((((degrees + 180) % 360) + 360) % 360) - 180)
const easeOut = (t: number) => 1 - Math.pow(1 - t, 4)
const easeOutQuint = (t: number) => 1 - Math.pow(1 - t, 5)

const rotateX = (p: Vec3, degrees: number): Vec3 => {
  const r = degrees * TO_RAD
  const c = Math.cos(r)
  const s = Math.sin(r)
  return [p[0], p[1] * c - p[2] * s, p[1] * s + p[2] * c]
}

const rotateY = (p: Vec3, degrees: number): Vec3 => {
  const r = degrees * TO_RAD
  const c = Math.cos(r)
  const s = Math.sin(r)
  return [p[0] * c + p[2] * s, p[1], -p[0] * s + p[2] * c]
}

const Digits = ({ value }: { value: number }) => (
  <span className="cc-digits-wrapper">
    {String(value)
      .padStart(2, '0')
      .split('')
      .map((digit, index) => (
        <span key={index} className="cc-digit-col">
          <span
            className="cc-digit-strip"
            style={{ transform: `translateY(${-Number(digit) * 10}%)` }}
          >
            {'0123456789'.split('').map((n) => (
              <span key={n} className="cc-digit-num">
                {n}
              </span>
            ))}
          </span>
        </span>
      ))}
  </span>
)

const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const query = window.matchMedia?.('(prefers-reduced-motion: reduce)')
    if (!query) return undefined
    const update = () => setReduced(query.matches)
    update()
    query.addEventListener?.('change', update)
    return () => query.removeEventListener?.('change', update)
  }, [])
  return reduced
}

const CircularCarouselInner = <T extends { title?: string; alt?: string; src?: string; imageSrc?: string }>(
  {
    items = [],
    preset = 'cylinder',
    intro = 'none',
    cardWidth = 440,
    cardHeight,
    aspectRatio = 1.9925,
    gap = 36,
    curve,
    tilt,
    perspective,
    radius: radiusProp,
    autoplay = 'off',
    speed = 14,
    interval = 3,
    direction = 'left',
    draggable = true,
    momentum = 0.6,
    snap = true,
    pauseOnHover = true,
    focusOnClick = true,
    parallax = 0.25,
    stretch = 0.4,
    depthFade = 0.65,
    fadeColor = 'var(--bg)',
    innerShade = 0.65,
    cornerRadius = 10,
    captions = false,
    controlledAngle,
    targetIndex,
    onChange,
    onItemClick,
    renderCard,
    containerRef,
    className = '',
    style,
  }: CircularCarouselProps<T>,
  ref: React.ForwardedRef<CircularCarouselHandle>,
) => {
  const [list, setList] = useState<T[]>(items)
  const [leaving, setLeaving] = useState<Leaving<T> | null>(null)
  const count = list.length
  const shape: CircularCarouselPreset = PRESETS[preset] ? preset : 'cylinder'
  const layout = PRESETS[shape]
  const axis = layout.axis
  const tiltValue = tilt ?? layout.tilt
  const curveValue = layout.billboard ? 0 : clamp(curve ?? layout.curve, 0, 1)
  const reduced = usePrefersReducedMotion()

  const cardW = Math.max(40, cardWidth)
  const cardH = cardHeight ?? cardW / clamp(aspectRatio, 0.2, 5)
  const along = axis === 'x' ? cardH : cardW
  const step = 360 / Math.max(count, 1)

  const radius = useMemo(() => {
    if (radiusProp) return radiusProp
    const n = Math.max(count, 3)
    const pitch = (along + gap) * layout.spread
    const chord = pitch / (2 * Math.sin(Math.PI / n))
    const arc = (n * pitch) / (2 * Math.PI)
    return Math.max(chord + (arc - chord) * curveValue, along * 0.75)
  }, [radiusProp, count, along, gap, curveValue, layout.spread])

  const tiles = useMemo<Tile[]>(() => {
    const total = curveValue > 0.001 ? TILES : 1
    const length = along / total
    const bend = curveValue > 0.001 ? radius / curveValue : 0
    return Array.from({ length: total }, (_, index) => {
      const start = index * length - (index > 0 ? OVERLAP / 2 : 0)
      const end = (index + 1) * length + (index < total - 1 ? OVERLAP / 2 : 0)
      const center = (start + end) / 2 - along / 2
      const alpha = bend ? center / bend : 0
      const shift = bend ? bend * Math.sin(alpha) : center
      const sink = bend ? bend * (1 - Math.cos(alpha)) : 0
      const depth = layout.inward ? sink : -sink
      const turn = ((layout.inward ? -alpha : alpha) * 180) / Math.PI
      const move =
        axis === 'x'
          ? `translate3d(0px, ${shift}px, ${depth}px) rotateX(${-turn}deg)`
          : `translate3d(${shift}px, 0px, ${depth}px) rotateY(${turn}deg)`
      return { index, total, start, end, size: end - start, move }
    })
  }, [along, axis, curveValue, layout.inward, radius])

  const rootRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const cameraRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const wakeRef = useRef<() => void>(() => {})
  const measureRef = useRef<() => void>(() => {})
  const activeRef = useRef(0)
  const [active, setActive] = useState(0)
  const [ready, setReady] = useState(true)
  const [dragging, setDragging] = useState(false)
  const readyRef = useRef(true)
  useEffect(() => {
    readyRef.current = ready
  }, [ready])

  const isControlled = controlledAngle !== undefined
  const controlledAngleRef = useRef(controlledAngle)
  useEffect(() => {
    controlledAngleRef.current = controlledAngle
  }, [controlledAngle])

  const stateRef = useRef<CarouselState>({
    angle: controlledAngle ?? 0,
    velocity: 0,
    target: null,
    dir: 0,
    press: null,
    drag: false,
    hover: false,
    pointer: { inside: false, x: 0, y: 0 },
    yaw: 0,
    pitch: 0,
    intro: null,
    introDone: false,
    holdUntil: 0,
    stepAt: 0,
    suppressClick: false,
    wheelTimer: undefined,
    fit: 1,
    shift: 0,
    drop: 0,
    last: 0,
  })

  const settings: Settings = {
    count,
    step,
    radius,
    layout,
    axis,
    tilt: tiltValue,
    perspective: layout.inward ? radius : (perspective ?? layout.perspective),
    cardW,
    cardH,
    intro: reduced ? 'none' : intro in INTRO_LENGTH ? intro : 'none',
    autoplay: reduced || isControlled ? 'off' : autoplay,
    speed,
    interval: Math.max(0.5, interval),
    draggable: !isControlled && draggable,
    momentum: clamp(momentum, 0, 1),
    snap,
    pauseOnHover,
    parallax: reduced ? 0 : clamp(parallax, 0, 1),
    stretch: reduced ? 0 : clamp(stretch, 0, 1),
    depthFade: clamp(depthFade, 0, 1),
    captions,
    reduced,
  }
  const settingsRef = useRef(settings)
  useLayoutEffect(() => {
    settingsRef.current = settings
  })

  const onChangeRef = useRef(onChange)
  useEffect(() => {
    onChangeRef.current = onChange
  }, [onChange])

  const dragSign = layout.inward ? -1 : 1
  const directionSign = (direction === 'right' ? 1 : -1) * dragSign

  useEffect(() => {
    stateRef.current.dir = directionSign
    wakeRef.current()
  }, [directionSign])

  const itemsRef = useRef(items)
  useEffect(() => {
    itemsRef.current = items
  }, [items])

  const listRef = useRef(list)
  useEffect(() => {
    listRef.current = list
  }, [list])
  const sourcesKey = items
    .map((item) => (item as any).src ?? (item as any).imageSrc ?? '')
    .join('|')

  useEffect(() => {
    let cancelled = false
    const next = itemsRef.current
    const smooth = readyRef.current && next.length === listRef.current.length
    if (!smooth) {
      setReady(false)
      setLeaving(null)
      setList(next)
    }
    const sources = next
      .map((item) => (item as any).src ?? (item as any).imageSrc)
      .filter(Boolean) as string[]
    const load = (src: string) =>
      new Promise<void>((resolve) => {
        const image = new Image()
        image.decoding = 'async'
        image.onload = () => {
          if (image.decode)
            image.decode().then(
              () => resolve(),
              () => resolve(),
            )
          else resolve()
        }
        image.onerror = () => resolve()
        image.src = src
      })
    const timeout = new Promise<void>((resolve) => setTimeout(resolve, 2000))
    Promise.race([Promise.all(sources.map(load)), timeout]).then(() => {
      if (cancelled) return
      const state = stateRef.current
      if (smooth) {
        const previous = listRef.current
        const s = settingsRef.current
        if (!s.reduced && previous !== next) {
          setLeaving((current) => ({
            id: (current?.id || 0) + 1,
            items: previous,
            delays: previous.map(
              (_, index) => (Math.abs(wrap(index * s.step + state.angle)) / 180) * SWAP_SPREAD,
            ),
          }))
        }
        setList(next)
        wakeRef.current()
        return
      }
      state.introDone = true
      state.intro = null
      setReady(true)
      wakeRef.current()
    })
    return () => {
      cancelled = true
    }
  }, [sourcesKey])

  useEffect(() => {
    if (!leaving) return undefined
    const timer = setTimeout(() => setLeaving(null), SWAP_LENGTH + SWAP_SPREAD + 80)
    return () => clearTimeout(timer)
  }, [leaving])

  // Sync external controlledAngle
  useEffect(() => {
    if (controlledAngle !== undefined) {
      const state = stateRef.current
      state.target = null
      state.velocity = 0
      state.angle = controlledAngle
      wakeRef.current()
    }
  }, [controlledAngle])

  useLayoutEffect(() => {
    const root = rootRef.current
    const stage = stageRef.current
    const camera = cameraRef.current
    const ring = ringRef.current
    if (!root || !stage || !camera || !ring) return undefined
    const state = stateRef.current
    let raf = 0
    let visible = true

    const nearest = (angle: number) =>
      Math.round(angle / settingsRef.current.step) * settingsRef.current.step

    const measure = () => {
      const s = settingsRef.current
      const rect = root.getBoundingClientRect()
      const rWidth = rect.width || root.clientWidth || (typeof window !== 'undefined' ? window.innerWidth : 1200)
      const rHeight = rect.height || root.clientHeight || (typeof window !== 'undefined' ? Math.max(540, window.innerHeight - 120) : 600)
      if (!rWidth || !rHeight) return
      const room = s.captions ? CAPTION_SPACE : 0
      const width = rWidth * 0.94
      const height = (rHeight - room) * 0.92
      const P = s.perspective
      let minX = Infinity
      let maxX = -Infinity
      let minY = Infinity
      let maxY = -Infinity
      if (s.layout.inward) {
        minX = -width / 2
        maxX = width / 2
        minY = -s.cardH / 2
        maxY = s.cardH / 2
      } else {
        const corners: [number, number][] = [
          [-s.cardW / 2, -s.cardH / 2],
          [s.cardW / 2, -s.cardH / 2],
          [-s.cardW / 2, s.cardH / 2],
          [s.cardW / 2, s.cardH / 2],
        ]
        const limit = s.layout.window ? s.layout.window * s.step : 180
        for (let a = -limit; a <= limit; a += limit / 24) {
          for (const [cx, cy] of corners) {
            let p: Vec3
            if (s.axis === 'x') {
              p = rotateY(rotateX([cx, cy, s.radius], -a), s.tilt)
            } else if (s.layout.billboard) {
              const c = rotateY([0, 0, s.radius], a)
              p = rotateX([c[0] + cx, cy, c[2]], s.tilt)
            } else {
              p = rotateX(rotateY([cx, cy, s.radius], a), s.tilt)
            }
            p = [p[0], p[1], p[2] - s.radius]
            if (p[2] >= P * 0.95) continue
            const k = P / (P - p[2])
            minX = Math.min(minX, p[0] * k)
            maxX = Math.max(maxX, p[0] * k)
            minY = Math.min(minY, p[1] * k)
            maxY = Math.max(maxY, p[1] * k)
          }
        }
      }
      const spanX = Math.max(maxX - minX, 1)
      const spanY = Math.max(maxY - minY, 1)
      const fit = Math.min(1, width / spanX, height / spanY)
      state.fit = fit
      state.shift = -((minY + maxY) / 2) * fit - room / 2
      state.drop =
        s.axis === 'x'
          ? (rect.width / fit) * 0.55 + s.cardW
          : (rect.height / fit) * 0.55 + s.cardH
      stage.style.perspective = `${P}px`
      stage.style.transform = `translate3d(0, ${state.shift}px, 0) scale(${fit})`
    }
    measureRef.current = measure

    const introCard = (elapsed: number, landing: number): IntroPose => {
      if (!state.intro) return { radius: 1, lift: 0 }
      const type = state.intro.type
      const reach = Math.abs(wrap(landing + state.angle))
      if (type === 'assemble') {
        const delay = (reach / 180) * 420
        const p = easeOut(clamp((elapsed - delay) / 1080, 0, 1))
        return { radius: 1 + 0.6 * (1 - p), lift: 0 }
      }
      if (type === 'rise') {
        const delay = (reach / 180) * 480
        const p = easeOutQuint(clamp((elapsed - delay) / 900, 0, 1))
        return { radius: 1, lift: (1 - p) * state.drop }
      }
      if (type === 'spin') {
        const p = easeOut(clamp(elapsed / INTRO_LENGTH.spin, 0, 1))
        return { radius: 1 + 0.28 * (1 - p), lift: 0 }
      }
      return { radius: 1, lift: 0 }
    }

    const advance = (s: Settings, dt: number, now: number) => {
      // If externally controlled by scroll, skip internal momentum physics
      if (controlledAngleRef.current !== undefined) {
        state.angle = controlledAngleRef.current
        state.velocity = 0
        state.target = null
        const ease = 1 - Math.exp(-dt / 0.35)
        const aimYaw = state.pointer.inside ? state.pointer.x * s.parallax * 7 : 0
        const aimPitch = state.pointer.inside ? -state.pointer.y * s.parallax * 5 : 0
        state.yaw += (aimYaw - state.yaw) * ease
        state.pitch += (aimPitch - state.pitch) * ease
        return Math.abs(aimYaw - state.yaw) > 0.01 || Math.abs(aimPitch - state.pitch) > 0.01
      }

      if (!state.introDone && readyRef.current) {
        if (!state.intro) {
          if (s.intro === 'none' || reduced) state.introDone = true
          else state.intro = { type: s.intro, start: now }
        }
        if (state.intro && now - state.intro.start >= INTRO_LENGTH[state.intro.type]) {
          state.intro = null
          state.introDone = true
        }
      }

      const paused = (s.pauseOnHover && state.hover) || state.drag || now < state.holdUntil
      const cruise = s.autoplay === 'drift' && !paused && !state.intro ? s.speed * state.dir : 0
      let busy = Boolean(state.intro) || state.drag

      if (state.drag || state.intro) {
        state.velocity = state.drag ? state.velocity : 0
      } else if (state.target !== null) {
        let remaining = dt
        const damping = 2 * Math.sqrt(SPRING)
        while (remaining > 0) {
          const h = Math.min(remaining, 1 / 240)
          const accel = SPRING * (state.target - state.angle) - damping * state.velocity
          state.velocity += accel * h
          state.angle += state.velocity * h
          remaining -= h
        }
        if (Math.abs(state.target - state.angle) < 0.004 && Math.abs(state.velocity) < 0.03) {
          state.angle = state.target
          state.velocity = 0
          state.target = null
        }
        busy = true
      } else {
        const tau = 0.18 + s.momentum * 1.5
        state.velocity += (cruise - state.velocity) * (1 - Math.exp(-dt / tau))
        state.angle += state.velocity * dt
        if (cruise === 0 && s.snap && Math.abs(state.velocity) < SETTLE_SPEED) {
          state.target = nearest(state.angle)
        }
        busy = busy || cruise !== 0 || Math.abs(state.velocity) > 0.01 || state.target !== null
      }

      if (s.autoplay === 'step' && !paused && !state.intro && state.introDone) {
        if (!state.stepAt) state.stepAt = now + s.interval * 1000
        if (now >= state.stepAt) {
          state.target = (state.target ?? nearest(state.angle)) + s.step * state.dir
          state.stepAt = now + s.interval * 1000
        }
        busy = true
      } else {
        state.stepAt = 0
      }

      if (now < state.holdUntil) busy = true

      const ease = 1 - Math.exp(-dt / 0.35)
      const aimYaw = state.pointer.inside ? state.pointer.x * s.parallax * 8 : 0
      const aimPitch = state.pointer.inside ? -state.pointer.y * s.parallax * 6 : 0
      state.yaw += (aimYaw - state.yaw) * ease
      state.pitch += (aimPitch - state.pitch) * ease
      if (Math.abs(aimYaw - state.yaw) > 0.01 || Math.abs(aimPitch - state.pitch) > 0.01) busy = true

      return busy
    }

    const render = (s: Settings, now: number) => {
      const elapsed = state.intro ? now - state.intro.start : 0
      const swell = 1 + s.stretch * 0.12 * Math.min(1, Math.abs(state.velocity) / 420)
      let spinOffset = 0
      if (state.intro?.type === 'spin') {
        const p = easeOut(clamp(elapsed / INTRO_LENGTH.spin, 0, 1))
        spinOffset = -300 * state.dir * (1 - p)
      } else if (state.intro?.type === 'assemble') {
        const p = easeOut(clamp(elapsed / INTRO_LENGTH.assemble, 0, 1))
        spinOffset = -32 * state.dir * (1 - p)
      }
      const angle = state.angle + spinOffset
      const R = s.radius * swell

      if (s.axis === 'x') {
        camera.style.transform = `translate3d(0, 0, ${-R}px) rotateY(${s.tilt + state.yaw}deg) rotateX(${state.pitch}deg)`
        ring.style.transform = `rotateX(${-angle}deg)`
      } else if (s.layout.inward) {
        camera.style.transform = `translate3d(0, 0, ${s.perspective - 1}px) rotateX(${s.tilt + state.pitch}deg) rotateY(${state.yaw}deg)`
        ring.style.transform = `rotateY(${angle}deg)`
      } else {
        camera.style.transform = `translate3d(0, 0, ${-R}px) rotateX(${s.tilt + state.pitch}deg) rotateY(${state.yaw}deg)`
        ring.style.transform = `rotateY(${angle}deg)`
      }

      for (let index = 0; index < s.count; index++) {
        const card = cardRefs.current[index]
        if (!card) continue
        const base = index * s.step
        const mod = introCard(elapsed, base)
        const r = R * mod.radius
        let transform: string
        if (s.axis === 'x') {
          transform = `rotateX(${-base}deg) translateZ(${r}px)`
        } else if (s.layout.inward) {
          transform = `rotateY(${base}deg) translateZ(${-r}px)`
        } else {
          transform = `rotateY(${base}deg) translateZ(${r}px)`
          if (s.layout.billboard) {
            transform += ` rotateY(${-(base + angle)}deg)`
          } else {
            // Counter-rotate each card locally so it always faces forward toward the viewer.
            // Net orientation in camera space = world - world * 0.75 = 0.25 * world.
            // For world in [-120deg, 120deg], net angle is in [-30deg, 30deg].
            // The camera is ALWAYS viewing the front face of the card, completely
            // eliminating mirrored/backwards text and images while preserving 3D depth!
            const world = wrap(base + angle)
            transform += ` rotateY(${-world * 0.75}deg)`
          }
        }
        if (mod.lift)
          transform += s.axis === 'x' ? ` translateX(${mod.lift}px)` : ` translateY(${mod.lift}px)`
        card.style.transform = transform
        card.style.opacity = '1'

        const world = wrap(base + angle)
        const facing = Math.cos(world * TO_RAD)
        if (s.layout.inward) card.style.visibility = Math.abs(world) > 86 ? 'hidden' : ''
        const fade = s.depthFade * Math.pow((1 - facing) / 2, 1.25)
        card.style.setProperty('--cc-depth', fade.toFixed(3))
        card.style.zIndex = String(Math.round(facing * 100))
      }

      if (state.target === null || Math.abs(state.angle - state.target) < 1) {
        const rawIndex = Math.round(-state.angle / s.step)
        const index = ((rawIndex % s.count) + s.count) % s.count || 0
        if (index !== activeRef.current) {
          activeRef.current = index
          setActive(index)
          onChangeRef.current?.(index)
        }
      }
    }

    const frame = (now: number) => {
      raf = 0
      const s = settingsRef.current
      const dt = state.last ? Math.min((now - state.last) / 1000, 0.05) : 1 / 60
      state.last = now
      const busy = advance(s, dt, now)
      render(s, now)
      if (busy && visible && !document.hidden) raf = requestAnimationFrame(frame)
      else state.last = 0
    }

    const wake = () => {
      if (!raf && visible && !document.hidden) raf = requestAnimationFrame(frame)
    }
    wakeRef.current = wake

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf)
        raf = 0
        state.last = 0
      } else wake()
    }

    const resize = new ResizeObserver(() => {
      measure()
      wake()
    })
    resize.observe(root)

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) wake()
      else {
        cancelAnimationFrame(raf)
        raf = 0
        state.last = 0
      }
    })
    io.observe(root)

    document.addEventListener('visibilitychange', onVisibility)

    measure()
    render(settingsRef.current, performance.now())
    wake()

    return () => {
      cancelAnimationFrame(raf)
      resize.disconnect()
      io.disconnect()
      clearTimeout(state.wheelTimer)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  useLayoutEffect(() => {
    measureRef.current()
    wakeRef.current()
  }, [radius, cardW, cardH, tiltValue, perspective, preset, captions, count])

  useEffect(() => {
    wakeRef.current()
  })

  const focusIndex = useCallback((index: number) => {
    const state = stateRef.current
    const s = settingsRef.current
    let target = -index * s.step
    target += 360 * Math.round((state.angle - target) / 360)
    state.target = target
    state.holdUntil = performance.now() + 2800
    activeRef.current = index
    setActive(index)
    onChangeRef.current?.(index)
    wakeRef.current()
  }, [])

  const stepBy = useCallback((delta: number) => {
    const state = stateRef.current
    const s = settingsRef.current
    const base = state.target ?? Math.round(state.angle / s.step) * s.step
    state.target = base - delta * s.step * (s.layout.inward ? -1 : 1)
    state.holdUntil = performance.now() + 2800
    wakeRef.current()
  }, [])

  useImperativeHandle(
    ref,
    () => ({
      focusIndex,
      stepBy,
      getActiveIndex: () => activeRef.current,
    }),
    [focusIndex, stepBy],
  )

  const prevTargetRef = useRef<number | undefined>(undefined)
  useEffect(() => {
    if (targetIndex !== undefined && targetIndex !== prevTargetRef.current) {
      prevTargetRef.current = targetIndex
      focusIndex(targetIndex)
    }
  }, [targetIndex, focusIndex])

  // Single authoritative window-level capture-phase wheel listener scoped strictly to #work
  useEffect(() => {
    const container = containerRef?.current ?? rootRef.current
    if (!container) return

    interface GestureState {
      isActive: boolean
      direction: number // 1: down, -1: up
      startIndex: number // active index at gesture start
      isConsuming: boolean // whether this gesture intercepts and consumes events
      transitionFired: boolean
      lastEventTime: number
      lockUntil: number
      lastDeltaY: number
    }

    const gesture: GestureState = {
      isActive: false,
      direction: 0,
      startIndex: 0,
      isConsuming: false,
      transitionFired: false,
      lastEventTime: 0,
      lockUntil: 0,
      lastDeltaY: 0,
    }

    let settleTimer: ReturnType<typeof setTimeout> | null = null
    let lastUndockedScrollTime = 0

    const settleGesture = () => {
      const now = performance.now()
      // If animation lock has not expired, wait until it expires
      if (now < gesture.lockUntil) {
        settleTimer = setTimeout(settleGesture, Math.max(gesture.lockUntil - now, 25))
        return
      }
      gesture.isActive = false
      gesture.isConsuming = false
      gesture.direction = 0
      gesture.transitionFired = false
      gesture.lastDeltaY = 0
      settleTimer = null
    }

    const onWheel = (e: WheelEvent) => {
      // 1. Ignore browser pinch-to-zoom (Cmd/Ctrl + wheel)
      if (e.ctrlKey || e.metaKey) return

      const now = performance.now()
      const s = settingsRef.current
      const currentIdx = activeRef.current

      // 2. Measure container position and header
      const rect = container.getBoundingClientRect()
      const header = document.querySelector('header.top')
      const headerBottom = header ? header.getBoundingClientRect().bottom : 60
      const windowHeight = window.innerHeight

      // 3. Check if container is completely offscreen
      if (rect.bottom <= headerBottom || rect.top >= windowHeight) {
        lastUndockedScrollTime = now
        return
      }

      // 4. Check if cursor / pointer interaction is scoped to #work
      const isTargetInside = e.target instanceof Node && container.contains(e.target)
      const isCursorInside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom

      if (!isTargetInside && !isCursorInside) {
        lastUndockedScrollTime = now
        return
      }

      // 5. Docking alignment check:
      // When scrolling down, if #work has not yet reached the header dock position,
      // allow normal vertical page scroll until it aligns.
      const isAboveDock = rect.top > headerBottom + 60
      const isBelowDock = rect.top < headerBottom - 60

      const dir = e.deltaY > 0 ? 1 : -1

      // If page is scrolling down toward #work, let normal scroll continue
      if (dir > 0 && isAboveDock && !gesture.isActive) {
        lastUndockedScrollTime = now
        return
      }

      // If page is scrolling up toward #work from below (from Stack), let normal scroll continue
      if (dir < 0 && isBelowDock && !gesture.isActive) {
        lastUndockedScrollTime = now
        return
      }

      // If user just arrived at #work via page scroll within the last 140ms,
      // do not let residual momentum from the page scroll trigger a project advance!
      if (now - lastUndockedScrollTime < 140 && !gesture.isActive) {
        return
      }

      // 6. Distinguish continuing momentum events vs. a genuinely NEW intentional gesture:
      const timeSinceLast = now - gesture.lastEventTime
      const lockExpired = now >= gesture.lockUntil
      const absDelta = Math.abs(e.deltaY)
      const prevAbsDelta = Math.abs(gesture.lastDeltaY)

      // Direction reversal (e.g. user was scrolling down then intentionally flicked up)
      const isReversal =
        gesture.isActive &&
        Math.sign(e.deltaY) !== Math.sign(gesture.direction) &&
        absDelta >= 8

      // Acceleration spike indicating fresh user finger stroke after previous rotation settled:
      // In trackpad momentum, delta decreases monotonically.
      // A fresh user stroke creates a distinct acceleration spike vs trickling momentum:
      const isAccelerationSpike =
        gesture.isActive &&
        lockExpired &&
        absDelta >= 12 &&
        prevAbsDelta > 0 &&
        absDelta >= prevAbsDelta * 1.5

      const isQuietGap = timeSinceLast > 90

      // A gesture is NEW if:
      // a) No gesture is currently active, OR
      // b) Quiet pause elapsed (> 90ms with no wheel events), OR
      // c) Intentional direction reversal, OR
      // d) Distinct acceleration spike after rotation settled
      const isNewGesture = !gesture.isActive || isQuietGap || isReversal || isAccelerationSpike

      if (!isNewGesture) {
        // --- CONTINUING EVENT OF THE CURRENT GESTURE STREAM ---
        gesture.lastEventTime = now
        gesture.lastDeltaY = e.deltaY

        if (settleTimer) clearTimeout(settleTimer)
        settleTimer = setTimeout(settleGesture, 90)

        // If this gesture was flagged to consume, consume trailing momentum/inertia events.
        // If it was a boundary release gesture (isConsuming === false), allow natural document scrolling!
        if (gesture.isConsuming) {
          e.preventDefault()
        }
        return
      }

      // --- NEW GESTURE BEGINS ---
      gesture.lastEventTime = now
      gesture.lastDeltaY = e.deltaY

      // Determine boundary eligibility based STRICTLY on active index at gesture onset
      const startIndex = currentIdx

      // Boundary Release Case A:
      // At final project (DevFlow-AI) and user initiates a NEW downward gesture:
      // Release naturally to Stack on the very first gesture!
      if (dir > 0 && startIndex >= s.count - 1) {
        gesture.isActive = true
        gesture.direction = dir
        gesture.startIndex = startIndex
        gesture.isConsuming = false
        gesture.transitionFired = false
        gesture.lockUntil = 0

        if (settleTimer) clearTimeout(settleTimer)
        settleTimer = setTimeout(settleGesture, 90)
        // DO NOT prevent default -> allows natural single-swipe exit to Stack
        return
      }

      // Boundary Release Case B:
      // At first project (TrendSole) and user initiates a NEW upward gesture:
      // Release naturally to About on the very first gesture!
      if (dir < 0 && startIndex <= 0) {
        gesture.isActive = true
        gesture.direction = dir
        gesture.startIndex = startIndex
        gesture.isConsuming = false
        gesture.transitionFired = false
        gesture.lockUntil = 0

        if (settleTimer) clearTimeout(settleTimer)
        settleTimer = setTimeout(settleGesture, 90)
        // DO NOT prevent default -> allows natural single-swipe exit to About
        return
      }

      // Interior Project Transition Case:
      // Intercept and consume event stream, keeping page presentation stationary!
      e.preventDefault()

      gesture.isActive = true
      gesture.direction = dir
      gesture.startIndex = startIndex
      gesture.isConsuming = true
      gesture.transitionFired = true
      gesture.lockUntil = now + 400

      // Advance by exactly 1 card
      const nextIdx = clamp(startIndex + dir, 0, s.count - 1)
      if (nextIdx !== currentIdx) {
        focusIndex(nextIdx)
      }

      if (settleTimer) clearTimeout(settleTimer)
      settleTimer = setTimeout(settleGesture, 90)
    }

    window.addEventListener('wheel', onWheel, { capture: true, passive: false })
    return () => {
      window.removeEventListener('wheel', onWheel, { capture: true })
      if (settleTimer) clearTimeout(settleTimer)
    }
  }, [containerRef, focusIndex])

  const updatePointer = (event: React.PointerEvent<HTMLDivElement>) => {
    const root = rootRef.current
    if (!root) return
    const rect = root.getBoundingClientRect()
    const pointer = stateRef.current.pointer
    pointer.x = clamp(((event.clientX - rect.left) / rect.width) * 2 - 1, -1, 1)
    pointer.y = clamp(((event.clientY - rect.top) / rect.height) * 2 - 1, -1, 1)
  }

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement
    if (target.closest('a, button')) return
    const state = stateRef.current
    state.suppressClick = false
    if (isControlled || !draggable || event.button !== 0) return
    state.press = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      angle: state.angle,
      moved: false,
      origin: 0,
      samples: [{ time: performance.now(), angle: state.angle }],
    }
  }

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const state = stateRef.current
    if (event.pointerType === 'mouse') {
      state.pointer.inside = true
      updatePointer(event)
    }
    const press = state.press
    if (!press || press.id !== event.pointerId) {
      wakeRef.current()
      return
    }
    const s = settingsRef.current
    const delta = s.axis === 'x' ? event.clientY - press.y : event.clientX - press.x
    const cross = s.axis === 'x' ? event.clientX - press.x : event.clientY - press.y
    if (!press.moved) {
      if (Math.abs(delta) < DRAG_THRESHOLD) return
      if (Math.abs(cross) > Math.abs(delta) * 1.2 && event.pointerType !== 'mouse') {
        state.press = null
        return
      }
      press.moved = true
      press.origin = delta
      state.drag = true
      state.target = null
      state.velocity = 0
      setDragging(true)
      try {
        rootRef.current?.setPointerCapture(event.pointerId)
      } catch {}
    }
    const perPixel = 180 / (Math.PI * s.radius * state.fit)
    state.angle = press.angle + (delta - press.origin) * perPixel * (s.layout.inward ? -1 : 1)
    const now = performance.now()
    press.samples.push({ time: now, angle: state.angle })
    while (press.samples.length > 2 && now - press.samples[0].time > 110) press.samples.shift()
    wakeRef.current()
  }

  const releasePointer = (event: React.PointerEvent<HTMLDivElement>) => {
    const state = stateRef.current
    const press = state.press
    if (!press || press.id !== event.pointerId) return
    state.press = null
    if (!press.moved) return
    state.drag = false
    setDragging(false)
    state.suppressClick = true
    const s = settingsRef.current
    const first = press.samples[0]
    const last = press.samples[press.samples.length - 1]
    const span = (last.time - first.time) / 1000
    const velocity = span > 0.008 ? clamp((last.angle - first.angle) / span, -1400, 1400) : 0
    state.velocity = velocity
    if (Math.abs(velocity) > 60) state.dir = Math.sign(velocity)
    const coasting =
      s.autoplay === 'drift' && !(s.pauseOnHover && state.hover && event.pointerType === 'mouse')
    if (s.snap && !coasting) {
      const tau = 0.18 + s.momentum * 1.5
      state.target = Math.round((state.angle + velocity * tau * 0.55) / s.step) * s.step
    }
    wakeRef.current()
  }

  const handlePointerEnter = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse') return
    stateRef.current.hover = true
    wakeRef.current()
  }

  const handlePointerLeave = (event: React.PointerEvent<HTMLDivElement>) => {
    const state = stateRef.current
    if (event.pointerType === 'mouse') {
      state.hover = false
      state.pointer.inside = false
    }
    wakeRef.current()
  }

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement
    if (target.closest('a, button')) return
    const state = stateRef.current
    if (state.suppressClick) {
      state.suppressClick = false
      return
    }
    const card = target.closest?.('[data-cc-index]')
    if (!card) return
    const index = Number(card.getAttribute('data-cc-index'))
    if (!isNaN(index) && list[index]) {
      if (focusOnClick && !isControlled) focusIndex(index)
      onItemClick?.(list[index], index)
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const forward = axis === 'x' ? 'ArrowDown' : 'ArrowRight'
    const backward = axis === 'x' ? 'ArrowUp' : 'ArrowLeft'
    if (event.key === forward) stepBy(1)
    else if (event.key === backward) stepBy(-1)
    else if (event.key === 'Home') focusIndex(0)
    else if (event.key === 'End') focusIndex(count - 1)
    else if (event.key === 'Enter' || event.key === ' ') {
      if (list[activeRef.current]) onItemClick?.(list[activeRef.current], activeRef.current)
    } else return
    event.preventDefault()
  }

  const current = list[active] || list[0]
  const label = current ? current.title || current.alt || `Project ${active + 1}` : ''

  const renderTile = (
    item: CircularCarouselItem,
    tile: Tile,
    back: boolean,
    index: number,
  ) => {
    const strip = back ? tile.total - 1 - tile.index : tile.index
    const first = strip === 0
    const last = strip === tile.total - 1
    const r = 'var(--cc-radius)'
    const frameRadius =
      axis === 'x'
        ? `${first ? r : 0} ${first ? r : 0} ${last ? r : 0} ${last ? r : 0}`
        : `${first ? r : 0} ${last ? r : 0} ${last ? r : 0} ${first ? r : 0}`
    const offset = back ? along - tile.end : tile.start
    const size = tile.size
    const box: React.CSSProperties =
      axis === 'x'
        ? { left: -cardW / 2, top: -size / 2, width: cardW, height: size }
        : { left: -size / 2, top: -cardH / 2, width: size, height: cardH }
    const photoStyle: React.CSSProperties =
      axis === 'x'
        ? { left: 0, top: -offset, width: cardW, height: cardH }
        : { left: -offset, top: 0, width: cardW, height: cardH }
    const flip = axis === 'x' ? ' rotateX(180deg)' : ' rotateY(180deg)'
    const gone = leaving?.items[index]
    return (
      <div
        key={`${back ? 'b' : 'f'}${tile.index}`}
        className="cc-tile"
        style={{ ...box, transform: tile.move + (back ? flip : '') }}
        aria-hidden="true"
      >
        <div
          className="cc-tile-inner"
          style={{ height: axis === 'x' ? size : cardH, borderRadius: frameRadius }}
        >
          <img
            className="cc-tile-img"
            src={item.src}
            alt=""
            draggable={false}
            decoding="async"
            style={photoStyle}
          />
          {gone && (
            <img
              key={`leaving-${leaving.id}`}
              className="cc-tile-img cc-tile-leaving"
              src={gone.src}
              alt=""
              draggable={false}
              decoding="async"
              style={{ ...photoStyle, animationDelay: `${Math.round(leaving.delays[index])}ms` }}
            />
          )}
          {back && <div className="cc-tile-back-shade" />}
          <div className="cc-tile-depth-shade" />
        </div>
      </div>
    )
  }

  return (
    <div
      ref={rootRef}
      className={`circular-carousel ${ready ? 'is-ready' : ''} ${className}`.trim()}
      style={
        {
          ...style,
          '--cc-fade': fadeColor,
          '--cc-radius': `${Math.max(0, cornerRadius)}px`,
          '--cc-inner': (1 - clamp(innerShade, 0, 1)).toFixed(3),
        } as React.CSSProperties
      }
      role="region"
      aria-roledescription="carousel"
      aria-label="Projects 3D ring"
      tabIndex={0}
      data-axis={axis}
      data-shape={shape}
      data-ready={ready ? '' : undefined}
      data-draggable={!isControlled && draggable ? '' : undefined}
      data-dragging={dragging ? '' : undefined}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={releasePointer}
      onPointerCancel={releasePointer}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <div className="cc-mask-wrapper">
        <div ref={stageRef} className="cc-stage">
          <div ref={cameraRef} className="cc-camera">
            <div ref={ringRef} className="cc-ring">
              {list.map((item, index) => (
                <div
                  key={index}
                  ref={(element) => {
                    cardRefs.current[index] = element
                  }}
                  className={`cc-card ${index === active ? 'is-active' : ''}`}
                  data-cc-index={index}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${item.title || item.alt || `Project ${index + 1}`}, ${index + 1} of ${count}`}
                >
                  {renderCard ? (
                    renderCard(item, index, index === active)
                  ) : (
                    <>
                      {tiles.map((tile) => renderTile(item as unknown as CircularCarouselItem, tile, false, index))}
                      {layout.backfaces &&
                        tiles.map((tile) => renderTile(item as unknown as CircularCarouselItem, tile, true, index))}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {captions && current && (
        <div className="cc-captions" aria-hidden="true">
          <span key={active} className="cc-caption-title">
            {current.title || current.alt}
            {(current as any).subtitle && (
              <span className="cc-caption-sub">{(current as any).subtitle}</span>
            )}
          </span>
          <span className="cc-caption-count">
            <Digits value={active + 1} />
            <span className="cc-caption-sep">/</span>
            <span>{String(count).padStart(2, '0')}</span>
          </span>
        </div>
      )}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {`${label}, ${active + 1} of ${count}`}
      </div>
    </div>
  )
}

const CircularCarousel = React.forwardRef(CircularCarouselInner) as <
  T extends { title?: string; alt?: string; src?: string; imageSrc?: string }
>(
  props: CircularCarouselProps<T> & { ref?: React.ForwardedRef<CircularCarouselHandle> },
) => React.ReactElement

export default CircularCarousel

import { useEffect, useRef } from 'react'
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  Color,
  Float32BufferAttribute,
  Group,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  Points,
  PointsMaterial,
  RingGeometry,
  Scene,
  SphereGeometry,
  WebGLRenderer,
} from 'three'
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion'

interface ColorTokens {
  brass: string
  ink: string
  muted: string
  ground: string
  surface: string
  rule: string
  teal: string
  isLight: boolean
}

interface CodeToken {
  text: string
  color: string
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  if (typeof ctx.roundRect === 'function') {
    ctx.roundRect(x, y, w, h, r)
  } else {
    ctx.beginPath()
    ctx.moveTo(x + r, y)
    ctx.lineTo(x + w - r, y)
    ctx.arcTo(x + w, y, x + w, y + h, r)
    ctx.arcTo(x + w, y + h, x, y + h, r)
    ctx.arcTo(x, y + h, x, y, r)
    ctx.arcTo(x, y, x + w, y, r)
    ctx.closePath()
  }
}

function drawLineTokens(
  ctx: CanvasRenderingContext2D,
  lineNum: string,
  tokens: CodeToken[],
  x: number,
  y: number,
  lineNumColor: string,
) {
  ctx.fillStyle = lineNumColor
  ctx.fillText(lineNum, x, y)
  let curX = x + 30
  for (const token of tokens) {
    ctx.fillStyle = token.color
    ctx.fillText(token.text, curX, y)
    curX += ctx.measureText(token.text).width
  }
}

/**
 * Creates high-DPI texture for the primary foreground Java / Spring Boot code panel.
 * Enhanced with refined 1px-style antique gold outline (#C8A25E), soft outer glow, and brighter corner accents.
 */
function createJavaPanelTexture(tokens: ColorTokens): CanvasTexture {
  const w = 580
  const h = 360
  const canvas = document.createElement('canvas')
  canvas.width = w * 2
  canvas.height = h * 2
  const ctx = canvas.getContext('2d')!
  ctx.scale(2, 2)

  const pad = 4
  const r = 8

  // 1. Panel background surface (clean, translucent)
  ctx.beginPath()
  roundRect(ctx, pad, pad, w - pad * 2, h - pad * 2, r)
  const bgGrad = ctx.createLinearGradient(0, 0, w, h)
  if (tokens.isLight) {
    bgGrad.addColorStop(0, 'rgba(238, 243, 236, 0.96)')
    bgGrad.addColorStop(1, 'rgba(226, 233, 223, 0.98)')
  } else {
    bgGrad.addColorStop(0, 'rgba(18, 30, 24, 0.94)')
    bgGrad.addColorStop(1, 'rgba(10, 19, 16, 0.96)')
  }
  ctx.fillStyle = bgGrad
  ctx.fill()

  // 2. Clearly visible, crisp antique-gold border (#C8A25E) with high contrast & subtle ambient glow
  ctx.save()
  ctx.shadowColor = tokens.isLight ? 'rgba(145, 105, 35, 0.40)' : 'rgba(200, 162, 94, 0.50)'
  ctx.shadowBlur = 5
  ctx.beginPath()
  roundRect(ctx, pad, pad, w - pad * 2, h - pad * 2, r)
  ctx.strokeStyle = tokens.isLight ? 'rgba(145, 105, 35, 0.95)' : 'rgba(200, 162, 94, 0.96)'
  ctx.lineWidth = 1.6
  ctx.stroke()
  ctx.restore()

  // 3. Subtle glow and brighter edge highlights on selected corners (top-left and bottom-right)
  ctx.save()
  ctx.shadowColor = tokens.isLight ? 'rgba(215, 175, 80, 0.65)' : 'rgba(245, 218, 155, 0.75)'
  ctx.shadowBlur = 8
  const goldHighlight = tokens.isLight ? 'rgba(180, 130, 45, 1.0)' : 'rgba(255, 235, 175, 0.98)'
  const cornerLen = 18
  ctx.lineWidth = 2.0
  ctx.strokeStyle = goldHighlight

  // Top-left highlight
  ctx.beginPath()
  ctx.moveTo(pad, pad + r + cornerLen)
  ctx.lineTo(pad, pad + r)
  ctx.arcTo(pad, pad, pad + r, pad, r)
  ctx.lineTo(pad + r + cornerLen, pad)
  ctx.stroke()

  // Bottom-right highlight
  ctx.beginPath()
  ctx.moveTo(w - pad - r - cornerLen, h - pad)
  ctx.lineTo(w - pad - r, h - pad)
  ctx.arcTo(w - pad, h - pad, w - pad, h - pad - r, r)
  ctx.lineTo(w - pad, h - pad - r - cornerLen)
  ctx.stroke()
  ctx.restore()

  // Subtle technical corner detailing ticks
  ctx.fillStyle = goldHighlight
  ctx.fillRect(pad + 0.5, pad + 0.5, 2.5, 2.5)
  ctx.fillRect(w - pad - 3, pad + 0.5, 2.5, 2.5)
  ctx.fillRect(pad + 0.5, h - pad - 3, 2.5, 2.5)
  ctx.fillRect(w - pad - 3, h - pad - 3, 2.5, 2.5)

  // 2. Title bar
  const headerH = 34
  ctx.beginPath()
  roundRect(ctx, pad, pad, w - pad * 2, headerH, r)
  ctx.fillStyle = tokens.isLight ? 'rgba(215, 222, 210, 0.85)' : 'rgba(22, 36, 29, 0.85)'
  ctx.fill()

  // Window dots
  const dotY = headerH / 2 + pad
  const dotColors = ['#E06C75', '#E5C07B', '#98C379']
  dotColors.forEach((color, i) => {
    ctx.beginPath()
    ctx.arc(18 + i * 14, dotY, 4, 0, Math.PI * 2)
    ctx.fillStyle = color
    ctx.globalAlpha = 0.9
    ctx.fill()
    ctx.globalAlpha = 1.0
  })

  // Title
  ctx.font = '500 12px "DM Mono", ui-monospace, monospace'
  ctx.fillStyle = tokens.muted
  ctx.fillText('ApiGateway.java', 72, dotY + 4)

  // Status badge at top right
  const badgeW = 126
  const badgeH = 20
  const badgeX = w - badgeW - 14
  const badgeY = (headerH - badgeH) / 2 + pad
  ctx.beginPath()
  roundRect(ctx, badgeX, badgeY, badgeW, badgeH, 4)
  ctx.fillStyle = tokens.isLight ? 'rgba(27, 115, 107, 0.15)' : 'rgba(61, 168, 160, 0.18)'
  ctx.fill()
  ctx.strokeStyle = tokens.teal
  ctx.lineWidth = 1
  ctx.stroke()

  ctx.beginPath()
  ctx.arc(badgeX + 10, badgeY + badgeH / 2, 3, 0, Math.PI * 2)
  ctx.fillStyle = tokens.teal
  ctx.fill()

  ctx.font = '600 10.5px "DM Mono", ui-monospace, monospace'
  ctx.fillStyle = tokens.teal
  ctx.fillText('BUILD SUCCESS', badgeX + 18, badgeY + badgeH / 2 + 3.5)

  // Divider
  ctx.beginPath()
  ctx.moveTo(pad, headerH + pad)
  ctx.lineTo(w - pad, headerH + pad)
  ctx.strokeStyle = tokens.isLight ? 'rgba(138, 100, 32, 0.25)' : 'rgba(200, 162, 94, 0.25)'
  ctx.lineWidth = 1
  ctx.stroke()

  // 3. Code Lines
  ctx.font = '500 12.5px "DM Mono", ui-monospace, monospace'
  const lineNumColor = tokens.isLight ? 'rgba(79, 97, 86, 0.45)' : 'rgba(147, 163, 152, 0.38)'
  const brass = tokens.brass
  const ink = tokens.ink
  const teal = tokens.teal
  const muted = tokens.muted

  const lines: { num: string; tokens: CodeToken[] }[] = [
    { num: '01', tokens: [{ text: '@RestController', color: brass }] },
    {
      num: '02',
      tokens: [
        { text: '@RequestMapping', color: brass },
        { text: '("/api/v1/inference")', color: teal },
      ],
    },
    {
      num: '03',
      tokens: [
        { text: 'public class ', color: brass },
        { text: 'ModelController', color: ink },
        { text: ' {', color: muted },
      ],
    },
    {
      num: '04',
      tokens: [
        { text: '  @PostMapping', color: brass },
        { text: '("/predict")', color: teal },
      ],
    },
    {
      num: '05',
      tokens: [
        { text: '  public ', color: brass },
        { text: 'ResponseEntity', color: teal },
        { text: '<', color: muted },
        { text: 'Result', color: teal },
        { text: '> infer(', color: ink },
        { text: 'Payload', color: teal },
        { text: ' req) {', color: muted },
      ],
    },
    {
      num: '06',
      tokens: [
        { text: '    var ', color: brass },
        { text: 'out = pipeline.', color: ink },
        { text: 'evaluate', color: teal },
        { text: '(req);', color: muted },
      ],
    },
    {
      num: '07',
      tokens: [
        { text: '    return ', color: brass },
        { text: 'ResponseEntity.', color: ink },
        { text: 'ok', color: teal },
        { text: '(out);', color: muted },
      ],
    },
    { num: '08', tokens: [{ text: '  }', color: muted }] },
    { num: '09', tokens: [{ text: '}', color: muted }] },
  ]

  const startY = headerH + 26
  const lineHeight = 27
  lines.forEach((line, idx) => {
    drawLineTokens(ctx, line.num, line.tokens, 16, startY + idx * lineHeight, lineNumColor)
  })

  const texture = new CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

/**
 * Creates high-DPI texture for the receding Python / AI-ML background code panel.
 * Enhanced with restrained teal/cyan outline (#3DA8A0), soft outer glow, and corner highlights.
 */
function createPythonPanelTexture(tokens: ColorTokens): CanvasTexture {
  const w = 530
  const h = 330
  const canvas = document.createElement('canvas')
  canvas.width = w * 2
  canvas.height = h * 2
  const ctx = canvas.getContext('2d')!
  ctx.scale(2, 2)

  const pad = 4
  const r = 8

  // 1. Panel background surface
  ctx.beginPath()
  roundRect(ctx, pad, pad, w - pad * 2, h - pad * 2, r)
  const bgGrad = ctx.createLinearGradient(0, 0, w, h)
  if (tokens.isLight) {
    bgGrad.addColorStop(0, 'rgba(230, 236, 228, 0.90)')
    bgGrad.addColorStop(1, 'rgba(218, 225, 215, 0.92)')
  } else {
    bgGrad.addColorStop(0, 'rgba(14, 25, 20, 0.85)')
    bgGrad.addColorStop(1, 'rgba(8, 16, 13, 0.90)')
  }
  ctx.fillStyle = bgGrad
  ctx.fill()

  // 2. Restrained but distinguishable teal outline (#3DA8A0) with subtle glow
  ctx.save()
  ctx.shadowColor = tokens.isLight ? 'rgba(27, 115, 107, 0.38)' : 'rgba(61, 168, 160, 0.48)'
  ctx.shadowBlur = 5
  ctx.beginPath()
  roundRect(ctx, pad, pad, w - pad * 2, h - pad * 2, r)
  ctx.strokeStyle = tokens.isLight ? 'rgba(22, 120, 112, 0.90)' : 'rgba(61, 168, 160, 0.90)'
  ctx.lineWidth = 1.5
  ctx.stroke()
  ctx.restore()

  // 3. Subtle glow and brighter edge highlights on selected corners (top-right and bottom-left)
  ctx.save()
  ctx.shadowColor = tokens.isLight ? 'rgba(27, 115, 107, 0.55)' : 'rgba(100, 235, 225, 0.70)'
  ctx.shadowBlur = 7
  const tealHighlight = tokens.isLight ? 'rgba(15, 135, 125, 1.0)' : 'rgba(110, 245, 235, 0.98)'
  const cornerLen = 16
  ctx.lineWidth = 1.8
  ctx.strokeStyle = tealHighlight

  // Top-right corner highlight
  ctx.beginPath()
  ctx.moveTo(w - pad - r - cornerLen, pad)
  ctx.lineTo(w - pad - r, pad)
  ctx.arcTo(w - pad, pad, w - pad, pad + r, r)
  ctx.lineTo(w - pad, pad + r + cornerLen)
  ctx.stroke()

  // Bottom-left corner highlight
  ctx.beginPath()
  ctx.moveTo(pad, h - pad - r - cornerLen)
  ctx.lineTo(pad, h - pad - r)
  ctx.arcTo(pad, h - pad, pad + r, h - pad, r)
  ctx.lineTo(pad + r + cornerLen, h - pad)
  ctx.stroke()
  ctx.restore()

  // Subtle corner micro-ticks
  ctx.fillStyle = tealHighlight
  ctx.fillRect(pad + 0.5, pad + 0.5, 2, 2)
  ctx.fillRect(w - pad - 2.5, pad + 0.5, 2, 2)
  ctx.fillRect(pad + 0.5, h - pad - 2.5, 2, 2)
  ctx.fillRect(w - pad - 2.5, h - pad - 2.5, 2, 2)

  // 2. Title bar
  const headerH = 34
  ctx.beginPath()
  roundRect(ctx, pad, pad, w - pad * 2, headerH, r)
  ctx.fillStyle = tokens.isLight ? 'rgba(215, 222, 210, 0.72)' : 'rgba(16, 28, 23, 0.72)'
  ctx.fill()

  // Window dots
  const dotY = headerH / 2 + pad
  const dotColors = ['#E06C75', '#E5C07B', '#98C379']
  dotColors.forEach((color, i) => {
    ctx.beginPath()
    ctx.arc(18 + i * 14, dotY, 4, 0, Math.PI * 2)
    ctx.fillStyle = color
    ctx.globalAlpha = 0.75
    ctx.fill()
    ctx.globalAlpha = 1.0
  })

  // Title
  ctx.font = '500 12px "DM Mono", ui-monospace, monospace'
  ctx.fillStyle = tokens.muted
  ctx.fillText('transformer_core.py', 72, dotY + 4)

  // Status badge at top right
  const badgeW = 114
  const badgeH = 20
  const badgeX = w - badgeW - 14
  const badgeY = (headerH - badgeH) / 2 + pad
  ctx.beginPath()
  roundRect(ctx, badgeX, badgeY, badgeW, badgeH, 4)
  ctx.fillStyle = tokens.isLight ? 'rgba(138, 100, 32, 0.12)' : 'rgba(200, 162, 94, 0.14)'
  ctx.fill()
  ctx.strokeStyle = tokens.brass
  ctx.lineWidth = 1
  ctx.stroke()

  ctx.beginPath()
  ctx.arc(badgeX + 10, badgeY + badgeH / 2, 3, 0, Math.PI * 2)
  ctx.fillStyle = tokens.brass
  ctx.fill()

  ctx.font = '600 10.5px "DM Mono", ui-monospace, monospace'
  ctx.fillStyle = tokens.brass
  ctx.fillText('99.2% ACCURACY', badgeX + 18, badgeY + badgeH / 2 + 3.5)

  // Divider
  ctx.beginPath()
  ctx.moveTo(pad, headerH + pad)
  ctx.lineTo(w - pad, headerH + pad)
  ctx.strokeStyle = tokens.isLight ? 'rgba(27, 115, 107, 0.22)' : 'rgba(61, 168, 160, 0.22)'
  ctx.lineWidth = 1
  ctx.stroke()

  // 3. Python Code
  ctx.font = '500 12.5px "DM Mono", ui-monospace, monospace'
  const lineNumColor = tokens.isLight ? 'rgba(79, 97, 86, 0.42)' : 'rgba(147, 163, 152, 0.35)'
  const brass = tokens.brass
  const ink = tokens.ink
  const teal = tokens.teal
  const muted = tokens.muted

  const lines: { num: string; tokens: CodeToken[] }[] = [
    {
      num: '01',
      tokens: [
        { text: 'class ', color: brass },
        { text: 'AttentionLayer', color: ink },
        { text: '(', color: muted },
        { text: 'nn.Module', color: teal },
        { text: '):', color: muted },
      ],
    },
    {
      num: '02',
      tokens: [
        { text: '  def ', color: brass },
        { text: '__init__', color: teal },
        { text: '(self, d_model=512, heads=8):', color: muted },
      ],
    },
    {
      num: '03',
      tokens: [
        { text: '    super().__init__()', color: muted },
      ],
    },
    {
      num: '04',
      tokens: [
        { text: '    self.qkv = nn.', color: muted },
        { text: 'Linear', color: teal },
        { text: '(d_model, d_model * 3)', color: muted },
      ],
    },
    {
      num: '05',
      tokens: [
        { text: '  def ', color: brass },
        { text: 'forward', color: teal },
        { text: '(self, x: ', color: muted },
        { text: 'Tensor', color: teal },
        { text: ') -> ', color: muted },
        { text: 'Tensor', color: teal },
        { text: ':', color: muted },
      ],
    },
    {
      num: '06',
      tokens: [
        { text: '    scores = ', color: muted },
        { text: 'softmax', color: teal },
        { text: '(q @ k.T / math.sqrt(d))', color: muted },
      ],
    },
    {
      num: '07',
      tokens: [
        { text: '    return ', color: brass },
        { text: 'self.proj(scores @ v)', color: ink },
      ],
    },
  ]

  const startY = headerH + 26
  const lineHeight = 27
  lines.forEach((line, idx) => {
    drawLineTokens(ctx, line.num, line.tokens, 16, startY + idx * lineHeight, lineNumColor)
  })

  const texture = new CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

/**
 * Creates high-DPI texture for architectural badges: REST API, AI / ML, PostgreSQL.
 */
function createBadgeTexture(
  label: string,
  icon: string,
  accentColor: string,
  tokens: ColorTokens,
): CanvasTexture {
  const w = 240
  const h = 58
  const canvas = document.createElement('canvas')
  canvas.width = w * 2
  canvas.height = h * 2
  const ctx = canvas.getContext('2d')!
  ctx.scale(2, 2)

  // Background pill with soft glass gradient
  const bgGrad = ctx.createLinearGradient(0, 0, w, 0)
  if (tokens.isLight) {
    bgGrad.addColorStop(0, 'rgba(238, 243, 236, 0.96)')
    bgGrad.addColorStop(1, 'rgba(228, 235, 225, 0.94)')
  } else {
    bgGrad.addColorStop(0, 'rgba(16, 28, 23, 0.95)')
    bgGrad.addColorStop(1, 'rgba(10, 20, 16, 0.92)')
  }
  ctx.beginPath()
  roundRect(ctx, 2, 2, w - 4, h - 4, (h - 4) / 2)
  ctx.fillStyle = bgGrad
  ctx.fill()

  // Accent rim
  ctx.strokeStyle = accentColor
  ctx.lineWidth = 1.4
  ctx.stroke()

  // Inner icon / symbol
  ctx.font = '600 13px "DM Mono", monospace'
  ctx.fillStyle = accentColor
  ctx.fillText(icon, 18, h / 2 + 4.5)

  // Label text
  ctx.font = '600 12.5px "DM Mono", monospace'
  ctx.fillStyle = tokens.ink
  ctx.fillText(label, 38, h / 2 + 4.5)

  const texture = new CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

/**
 * Creates terminal status pill texture: e.g. "⚡ API GATEWAY READY · POSTGRES ACTIVE · 12ms"
 * Enhanced with refined outline, soft glow, and subtle technical corner accents.
 */
function createTerminalStatusTexture(tokens: ColorTokens): CanvasTexture {
  const w = 380
  const h = 52
  const canvas = document.createElement('canvas')
  canvas.width = w * 2
  canvas.height = h * 2
  const ctx = canvas.getContext('2d')!
  ctx.scale(2, 2)

  const pad = 3
  const r = 6

  // 1. Panel background surface
  ctx.beginPath()
  roundRect(ctx, pad, pad, w - pad * 2, h - pad * 2, r)
  const bgGrad = ctx.createLinearGradient(0, 0, w, h)
  if (tokens.isLight) {
    bgGrad.addColorStop(0, 'rgba(232, 238, 229, 0.96)')
    bgGrad.addColorStop(1, 'rgba(220, 228, 217, 0.95)')
  } else {
    bgGrad.addColorStop(0, 'rgba(14, 25, 20, 0.94)')
    bgGrad.addColorStop(1, 'rgba(8, 16, 13, 0.94)')
  }
  ctx.fillStyle = bgGrad
  ctx.fill()

  // 2. Crisp, clearly visible antique-gold border with subtle glow
  ctx.save()
  ctx.shadowColor = tokens.isLight ? 'rgba(138, 100, 32, 0.30)' : 'rgba(200, 162, 94, 0.40)'
  ctx.shadowBlur = 4
  ctx.beginPath()
  roundRect(ctx, pad, pad, w - pad * 2, h - pad * 2, r)
  ctx.strokeStyle = tokens.isLight ? 'rgba(145, 105, 35, 0.92)' : 'rgba(200, 162, 94, 0.92)'
  ctx.lineWidth = 1.5
  ctx.stroke()
  ctx.restore()

  // 3. Subtle teal corner brackets on selected corners (top-left & bottom-right) with soft glow
  ctx.save()
  ctx.shadowColor = tokens.isLight ? 'rgba(27, 115, 107, 0.50)' : 'rgba(61, 168, 160, 0.65)'
  ctx.shadowBlur = 6
  const termHighlight = tokens.isLight ? 'rgba(20, 130, 120, 1.0)' : 'rgba(90, 235, 225, 0.98)'
  const cLen = 11
  ctx.lineWidth = 1.8
  ctx.strokeStyle = termHighlight

  // Top-left corner bracket
  ctx.beginPath()
  ctx.moveTo(pad, pad + r + cLen)
  ctx.lineTo(pad, pad + r)
  ctx.arcTo(pad, pad, pad + r, pad, r)
  ctx.lineTo(pad + r + cLen, pad)
  ctx.stroke()

  // Bottom-right corner bracket
  ctx.beginPath()
  ctx.moveTo(w - pad - r - cLen, h - pad)
  ctx.lineTo(w - pad - r, h - pad)
  ctx.arcTo(w - pad, h - pad, w - pad, h - pad - r, r)
  ctx.lineTo(w - pad, h - pad - r - cLen)
  ctx.stroke()
  ctx.restore()

  // Micro-accents
  ctx.fillStyle = termHighlight
  ctx.fillRect(pad + 0.5, pad + 0.5, 2.5, 2.5)
  ctx.fillRect(w - pad - 3, h - pad - 3, 2.5, 2.5)

  // Terminal icon
  ctx.font = '700 12px "DM Mono", monospace'
  ctx.fillStyle = tokens.teal
  ctx.fillText('⚡', 14, h / 2 + 4)

  // Text segments
  ctx.font = '600 11px "DM Mono", monospace'
  ctx.fillStyle = tokens.teal
  ctx.fillText('API GATEWAY READY', 30, h / 2 + 4)

  ctx.fillStyle = tokens.muted
  ctx.fillText('·', 160, h / 2 + 4)

  ctx.fillStyle = tokens.brass
  ctx.fillText('POSTGRES ACTIVE', 174, h / 2 + 4)

  ctx.fillStyle = tokens.muted
  ctx.fillText('·', 290, h / 2 + 4)

  ctx.fillStyle = tokens.teal
  ctx.fillText('12ms', 304, h / 2 + 4)

  const texture = new CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

/**
 * Three.js "Living Software Environment" cinematic hero visual.
 *
 * Renders:
 * - Layered code panels with clear foreground presence (Java) and deep background (Python)
 * - Three architectural component nodes: REST API, AI / ML, and PostgreSQL with rim glows
 * - Clean spatial separation ensuring zero occlusion between terminal status and PostgreSQL
 * - Natural 3D atmospheric dust without any hollow cutout void
 * - Coordinated entrance choreography and gentle pointer-reactive parallax
 * - Mathematically bounded camera framing with a deliberate safe margin
 */
export default function HeroLattice() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduce = usePrefersReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const hero = canvas.parentElement
    if (!hero) return

    const root = document.documentElement
    const startTime = performance.now()

    // ─── Renderer ───
    let renderer: WebGLRenderer
    try {
      renderer = new WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
      })
    } catch {
      canvas.style.display = 'none'
      return
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))

    const onContextLost = (e: Event) => {
      e.preventDefault()
      running = false
      canvas.classList.remove('ready')
      canvas.style.display = 'none'
    }
    canvas.addEventListener('webglcontextlost', onContextLost, false)

    // ─── Scene & Camera ───
    const scene = new Scene()
    const camera = new PerspectiveCamera(40, 1, 0.1, 80)
    camera.position.z = 7.5

    const group = new Group()
    scene.add(group)

    // ─── Color Tokens ───
    function getTokens(): ColorTokens {
      const isLight =
        root.getAttribute('data-theme') === 'light' ||
        (!root.getAttribute('data-theme') && window.matchMedia('(prefers-color-scheme: light)').matches)

      return {
        brass: isLight ? '#8A6420' : '#C8A25E',
        ink: isLight ? '#0F1D17' : '#E9E4D6',
        muted: isLight ? '#4F6156' : '#93A398',
        ground: isLight ? '#ECEFE8' : '#0A1310',
        surface: isLight ? '#E0E6DD' : '#101C17',
        rule: isLight ? '#C3CDC0' : '#24342B',
        teal: isLight ? '#1B736B' : '#3DA8A0',
        isLight,
      }
    }

    let tokens = getTokens()

    // ─── Textures & Materials References for Theme Updates ───
    let javaTex: CanvasTexture
    let pyTex: CanvasTexture
    let badgeApiTex: CanvasTexture
    let badgeMlTex: CanvasTexture
    let badgeDbTex: CanvasTexture
    let terminalTex: CanvasTexture

    // 1. Primary Foreground Java Panel
    javaTex = createJavaPanelTexture(tokens)
    const javaGeo = new PlaneGeometry(2.32, 1.40)
    const javaMat = new MeshBasicMaterial({
      map: javaTex,
      transparent: true,
      opacity: 0.98,
      depthWrite: false,
    })
    const javaMesh = new Mesh(javaGeo, javaMat)
    const javaRestPos = { x: -0.26, y: 0.18, z: 0.34 }
    javaMesh.position.set(javaRestPos.x, javaRestPos.y, reduce ? javaRestPos.z : 0.12)
    javaMesh.rotation.set(-0.025, 0.07, 0)
    group.add(javaMesh)

    // Blinking cursor on Java panel (at line 06)
    const cursorGeo = new PlaneGeometry(0.016, 0.085)
    const cursorMat = new MeshBasicMaterial({
      color: new Color(tokens.brass),
      transparent: true,
      opacity: 0.95,
    })
    const cursorMesh = new Mesh(cursorGeo, cursorMat)
    cursorMesh.position.set(0.48, -0.16, 0.01)
    javaMesh.add(cursorMesh)

    // 2. Receding Background Python Panel
    pyTex = createPythonPanelTexture(tokens)
    const pyGeo = new PlaneGeometry(2.04, 1.25)
    const pyMat = new MeshBasicMaterial({
      map: pyTex,
      transparent: true,
      opacity: 0.86,
      depthWrite: false,
    })
    const pyMesh = new Mesh(pyGeo, pyMat)
    const pyRestPos = { x: 0.64, y: 0.44, z: -0.38 }
    pyMesh.position.set(pyRestPos.x, pyRestPos.y, reduce ? pyRestPos.z : -0.15)
    pyMesh.rotation.set(0.04, -0.14, 0)
    group.add(pyMesh)

    // 3. Connected Architectural Nodes
    interface ArchNode {
      name: string
      x: number
      y: number
      z: number
      accent: string
      coreMesh: Mesh
      ringMesh: Mesh
      badgeMesh: Mesh
    }

    const archNodes: ArchNode[] = []

    badgeApiTex = createBadgeTexture('REST API', '●', tokens.teal, tokens)
    badgeMlTex = createBadgeTexture('AI / ML', '✦', tokens.teal, tokens)
    badgeDbTex = createBadgeTexture('PostgreSQL', '⛁', tokens.brass, tokens)

    // Balanced spatial distribution: REST API top-left, AI/ML top-right, PostgreSQL bottom-left
    const nodeDefs = [
      { name: 'REST API', x: -1.20, y: 1.02, z: 0.42, accent: tokens.teal, tex: badgeApiTex, w: 0.88 },
      { name: 'AI / ML', x: 1.24, y: 0.96, z: -0.15, accent: tokens.teal, tex: badgeMlTex, w: 0.82 },
      { name: 'PostgreSQL', x: -0.80, y: -0.82, z: 0.24, accent: tokens.brass, tex: badgeDbTex, w: 0.94 },
    ]

    const nodesGroup = new Group()
    group.add(nodesGroup)

    nodeDefs.forEach((nd) => {
      // Core glowing sphere
      const coreGeo = new SphereGeometry(0.045, 16, 16)
      const coreMat = new MeshBasicMaterial({
        color: new Color(nd.accent),
        transparent: true,
        opacity: 0.95,
      })
      const coreMesh = new Mesh(coreGeo, coreMat)
      coreMesh.position.set(nd.x, nd.y, nd.z)

      // Orbital pulsing ring with soft glow
      const ringGeo = new RingGeometry(0.075, 0.090, 24)
      const ringMat = new MeshBasicMaterial({
        color: new Color(nd.accent),
        transparent: true,
        opacity: 0.50,
        depthWrite: false,
      })
      const ringMesh = new Mesh(ringGeo, ringMat)
      ringMesh.position.set(nd.x, nd.y, nd.z)

      // Badge pill mesh
      const badgeGeo = new PlaneGeometry(nd.w, 0.24)
      const badgeMat = new MeshBasicMaterial({
        map: nd.tex,
        transparent: true,
        opacity: 0.95,
        depthWrite: false,
      })
      const badgeMesh = new Mesh(badgeGeo, badgeMat)
      badgeMesh.position.set(nd.x, nd.y + 0.18, nd.z + 0.01)

      nodesGroup.add(coreMesh, ringMesh, badgeMesh)
      archNodes.push({
        name: nd.name,
        x: nd.x,
        y: nd.y,
        z: nd.z,
        accent: nd.accent,
        coreMesh,
        ringMesh,
        badgeMesh,
      })
    })

    // 4. Edge Connections (API <-> ML, API <-> DB, ML <-> DB)
    const edgeConnections: [number, number][] = [
      [0, 1], // REST API <-> AI / ML
      [0, 2], // REST API <-> PostgreSQL
      [1, 2], // AI / ML <-> PostgreSQL
    ]

    const edgesGroup = new Group()
    group.add(edgesGroup)

    edgeConnections.forEach(([a, b]) => {
      const nodeA = archNodes[a]
      const nodeB = archNodes[b]
      const positions = new Float32Array([
        nodeA.x, nodeA.y, nodeA.z,
        nodeB.x, nodeB.y, nodeB.z,
      ])
      const geo = new BufferGeometry()
      geo.setAttribute('position', new BufferAttribute(positions, 3))
      const mat = new LineBasicMaterial({
        color: new Color(tokens.brass),
        transparent: true,
        opacity: 0.32,
      })
      const line = new LineSegments(geo, mat)
      edgesGroup.add(line)
    })

    // 5. Data Flow Packets traveling along connections
    interface FlowParticle {
      points: Points
      from: { x: number; y: number; z: number }
      to: { x: number; y: number; z: number }
      speed: number
      offset: number
    }

    const flowGroup = new Group()
    group.add(flowGroup)

    const flowParticles: FlowParticle[] = []
    const particlesPerEdge = 4

    edgeConnections.forEach(([a, b], edgeIdx) => {
      const nodeA = archNodes[a]
      const nodeB = archNodes[b]
      const isTeal = edgeIdx === 0 // API <-> ML pipeline

      for (let p = 0; p < particlesPerEdge; p++) {
        const geo = new BufferGeometry()
        geo.setAttribute('position', new Float32BufferAttribute([0, 0, 0], 3))
        const mat = new PointsMaterial({
          size: 0.048,
          color: new Color(isTeal ? tokens.teal : tokens.brass),
          transparent: true,
          opacity: 0.85,
          blending: AdditiveBlending,
          depthWrite: false,
        })
        const points = new Points(geo, mat)
        flowGroup.add(points)
        flowParticles.push({
          points,
          from: nodeA,
          to: nodeB,
          speed: 0.16 + Math.random() * 0.10,
          offset: p / particlesPerEdge + edgeIdx * 0.22,
        })
      }
    })

    // 6. Terminal Status Pill (situated below Java panel, completely clear of PostgreSQL)
    terminalTex = createTerminalStatusTexture(tokens)
    const termGeo = new PlaneGeometry(1.58, 0.24)
    const termMat = new MeshBasicMaterial({
      map: terminalTex,
      transparent: true,
      opacity: 0.98,
      depthWrite: false,
    })
    const termMesh = new Mesh(termGeo, termMat)
    const termRestPos = { x: 0.46, y: -0.58, z: 0.28 }
    termMesh.position.set(termRestPos.x, termRestPos.y, termRestPos.z)
    termMesh.rotation.set(-0.02, 0.05, 0)
    group.add(termMesh)

    // 7. Atmospheric Dust (Distributed uniformly in 3D volume without hollow voids)
    const dustCount = 60
    const dustPos = new Float32Array(dustCount * 3)
    for (let i = 0; i < dustCount; i++) {
      const u = Math.random()
      const rad = Math.cbrt(u) * 3.8
      const th = Math.random() * Math.PI * 2
      const ph = Math.acos(2 * Math.random() - 1)
      dustPos[i * 3] = rad * Math.sin(ph) * Math.cos(th) * 1.3
      dustPos[i * 3 + 1] = rad * Math.sin(ph) * Math.sin(th) * 0.95
      dustPos[i * 3 + 2] = rad * Math.cos(ph) * 1.1
    }
    const dustGeo = new BufferGeometry()
    dustGeo.setAttribute('position', new BufferAttribute(dustPos, 3))
    const dust = new Points(
      dustGeo,
      new PointsMaterial({
        size: 0.022,
        color: new Color(tokens.muted),
        transparent: true,
        opacity: 0.28,
        depthWrite: false,
      }),
    )
    group.add(dust)

    // ─── Theme Re-render Function ───
    function applyColors() {
      tokens = getTokens()

      // Re-create textures
      javaTex.dispose()
      pyTex.dispose()
      badgeApiTex.dispose()
      badgeMlTex.dispose()
      badgeDbTex.dispose()
      terminalTex.dispose()

      javaTex = createJavaPanelTexture(tokens)
      pyTex = createPythonPanelTexture(tokens)
      badgeApiTex = createBadgeTexture('REST API', '●', tokens.teal, tokens)
      badgeMlTex = createBadgeTexture('AI / ML', '✦', tokens.teal, tokens)
      badgeDbTex = createBadgeTexture('PostgreSQL', '⛁', tokens.brass, tokens)
      terminalTex = createTerminalStatusTexture(tokens)

      javaMat.map = javaTex
      javaMat.needsUpdate = true

      pyMat.map = pyTex
      pyMat.needsUpdate = true

      cursorMat.color.set(tokens.brass)

      archNodes[0].badgeMesh.material = new MeshBasicMaterial({ map: badgeApiTex, transparent: true, opacity: 0.95 })
      archNodes[1].badgeMesh.material = new MeshBasicMaterial({ map: badgeMlTex, transparent: true, opacity: 0.95 })
      archNodes[2].badgeMesh.material = new MeshBasicMaterial({ map: badgeDbTex, transparent: true, opacity: 0.95 })

      archNodes[0].coreMesh.material = new MeshBasicMaterial({ color: new Color(tokens.teal), transparent: true, opacity: 0.95 })
      archNodes[1].coreMesh.material = new MeshBasicMaterial({ color: new Color(tokens.teal), transparent: true, opacity: 0.95 })
      archNodes[2].coreMesh.material = new MeshBasicMaterial({ color: new Color(tokens.brass), transparent: true, opacity: 0.95 })

      archNodes[0].ringMesh.material = new MeshBasicMaterial({ color: new Color(tokens.teal), transparent: true, opacity: 0.50, depthWrite: false })
      archNodes[1].ringMesh.material = new MeshBasicMaterial({ color: new Color(tokens.teal), transparent: true, opacity: 0.50, depthWrite: false })
      archNodes[2].ringMesh.material = new MeshBasicMaterial({ color: new Color(tokens.brass), transparent: true, opacity: 0.50, depthWrite: false })

      edgesGroup.children.forEach((child) => {
        ;((child as LineSegments).material as LineBasicMaterial).color.set(tokens.brass)
      })

      flowParticles.forEach((fp, idx) => {
        const isTeal = Math.floor(idx / particlesPerEdge) === 0
        ;(fp.points.material as PointsMaterial).color.set(isTeal ? tokens.teal : tokens.brass)
      })

      termMat.map = terminalTex
      termMat.needsUpdate = true

      ;(dust.material as PointsMaterial).color.set(tokens.muted)

      if (!running) draw()
    }

    // ─── Precision Sizing & Bounded Framing ───
    const COMP_RX = 1.68
    const COMP_RY = 1.18

    let baseX = 0
    let baseY = 0

    function resize() {
      if (!hero) return
      const w = hero.clientWidth
      const h = hero.clientHeight
      if (!w || !h) return

      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()

      // Frustum half-dimensions at z = 0 (camera at z = 7.5, fov = 40 deg)
      const hh = Math.tan((20 * Math.PI) / 180) * 7.5 // ≈ 2.73
      const hw = hh * camera.aspect

      const isMobile = w <= 820 || camera.aspect < 1.15

      if (isMobile) {
        // Mobile single-column: simplified composition positioned in upper viewport
        baseX = hw * 0.08
        baseY = hh * 0.54
        const maxMobileScale = (hw * 0.72) / COMP_RX
        const scale = Math.min(0.44, maxMobileScale)
        group.scale.setScalar(scale)

        pyMesh.visible = false
        termMesh.visible = false
        javaMat.opacity = 0.52
        archNodes[2].badgeMesh.visible = false
        archNodes[2].coreMesh.visible = false
        archNodes[2].ringMesh.visible = false
      } else {
        // Desktop two-column: positioned high in right column
        baseX = hw * 0.44
        baseY = hh * 0.18

        pyMesh.visible = true
        termMesh.visible = true
        javaMat.opacity = 0.98
        archNodes[2].badgeMesh.visible = true
        archNodes[2].coreMesh.visible = true
        archNodes[2].ringMesh.visible = true

        // Mathematically bounded scaling to guarantee scene stays comfortably within canvas
        const maxScaleX = (hw * 0.88 - baseX) / COMP_RX
        const maxScaleY = (hh * 0.86 - baseY) / COMP_RY

        let scale = Math.min(1.05, maxScaleX, maxScaleY)
        scale = Math.max(0.68, scale)
        group.scale.setScalar(scale)
      }

      group.position.set(baseX, baseY, 0)
      if (!running) draw()
    }

    // ─── Mouse tracking ───
    let mx = 0
    let my = 0
    let sx = 0
    let sy = 0

    function onPointerMove(e: PointerEvent) {
      mx = e.clientX / window.innerWidth - 0.5
      my = e.clientY / window.innerHeight - 0.5
    }
    window.addEventListener('pointermove', onPointerMove, { passive: true })

    // ─── Draw & Animations ───
    function draw() {
      const now = performance.now()
      const t = now * 0.001
      const elapsed = (now - startTime) * 0.001
      const s = (window.pageYOffset || 0) / 800

      // Coordinated Entrance Sequence (0 to 1.8s)
      const entranceProgress = reduce ? 1 : Math.min(1, elapsed / 1.8)
      const ease = reduce ? 1 : 1 - Math.pow(1 - entranceProgress, 3)

      // Smooth pointer parallax with idle gentle sway
      const idleRotY = reduce ? 0.08 : Math.sin(t * 0.22) * 0.035
      const idleRotX = reduce ? 0.05 : Math.cos(t * 0.18) * 0.025
      group.rotation.y = idleRotY + sx * 0.20 + s * 0.15
      group.rotation.x = idleRotX + sy * 0.12 + s * 0.08
      group.position.y = baseY + s * 0.4

      if (!reduce) {
        // Entrance settling of code panels into distinct depths
        javaMesh.position.z = 0.12 + (javaRestPos.z - 0.12) * ease
        pyMesh.position.z = -0.15 + (pyRestPos.z - (-0.15)) * ease

        // Subtle independent floating for 3D depth
        javaMesh.position.y = javaRestPos.y + Math.sin(t * 0.35) * 0.025
        pyMesh.position.y = pyRestPos.y + Math.sin(t * 0.28 + 1.3) * 0.03
        termMesh.position.y = termRestPos.y + Math.sin(t * 0.42 + 2.2) * 0.016

        // Coordinated sequential illumination of nodes
        archNodes.forEach((node, idx) => {
          // Node illumination triggers sequentially: Node 0 @ 0.2s, Node 1 @ 0.6s, Node 2 @ 1.0s
          const nodeDelay = 0.2 + idx * 0.4
          const nodeProgress = Math.min(1, Math.max(0, (elapsed - nodeDelay) / 0.5))
          const nodeEase = 1 - Math.pow(1 - nodeProgress, 3)

          const breathing = 1 + Math.sin(t * 1.5 + idx * 1.6) * 0.06
          node.ringMesh.scale.setScalar(nodeEase * breathing)
          node.coreMesh.scale.setScalar(nodeEase)
          node.badgeMesh.scale.setScalar(nodeEase)
        })

        // Terminal status pill fades in during sequence
        const termDelay = 1.2
        const termProgress = Math.min(1, Math.max(0, (elapsed - termDelay) / 0.5))
        termMat.opacity = 0.95 * (1 - Math.pow(1 - termProgress, 3))

        // Data-flow particles traveling along connections
        flowParticles.forEach((fp) => {
          const progress = (t * fp.speed + fp.offset) % 1
          const pos = fp.points.geometry.attributes.position as BufferAttribute
          const arr = pos.array as Float32Array
          arr[0] = fp.from.x + (fp.to.x - fp.from.x) * progress
          arr[1] = fp.from.y + (fp.to.y - fp.from.y) * progress
          arr[2] = fp.from.z + (fp.to.z - fp.from.z) * progress
          pos.needsUpdate = true

          // Smooth fade at endpoints
          const fade = Math.sin(progress * Math.PI)
          ;(fp.points.material as PointsMaterial).opacity = fade * 0.85 * ease
        })

        // Blinking cursor
        cursorMesh.visible = Math.sin(t * 3.2) > 0

        // Soft dust drift
        dust.rotation.y = -t * 0.012 + s * 0.12
      } else {
        javaMesh.position.z = javaRestPos.z
        pyMesh.position.z = pyRestPos.z
        javaMesh.position.y = javaRestPos.y
        pyMesh.position.y = pyRestPos.y
        termMesh.position.y = termRestPos.y
        termMat.opacity = 0.95
        archNodes.forEach((node) => {
          node.ringMesh.scale.setScalar(1)
          node.coreMesh.scale.setScalar(1)
          node.badgeMesh.scale.setScalar(1)
        })
      }

      renderer.render(scene, camera)
    }

    // ─── Animation Loop ───
    let running = false
    let visible = true

    function loop() {
      if (!running) return
      sx += (mx - sx) * 0.035
      sy += (my - sy) * 0.035
      draw()
      requestAnimationFrame(loop)
    }

    function setRunning(on: boolean) {
      if (reduce) return
      if (on && !running) {
        running = true
        requestAnimationFrame(loop)
      }
      if (!on) running = false
    }

    // ─── Init ───
    resize()
    draw()
    canvas.classList.add('ready')

    const ro = new ResizeObserver(resize)
    ro.observe(hero)

    const io = new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting
      setRunning(visible && !document.hidden)
    })
    io.observe(hero)

    function onVisChange() {
      setRunning(visible && !document.hidden)
    }
    document.addEventListener('visibilitychange', onVisChange)

    const mo = new MutationObserver(applyColors)
    mo.observe(root, { attributes: true, attributeFilter: ['data-theme'] })

    const colorMq = window.matchMedia('(prefers-color-scheme: light)')
    colorMq.addEventListener('change', applyColors)

    function onScrollReduce() {
      draw()
    }
    if (reduce) {
      window.addEventListener('scroll', onScrollReduce, { passive: true })
    }

    setRunning(true)

    // ─── Cleanup ───
    return () => {
      running = false
      canvas.removeEventListener('webglcontextlost', onContextLost)
      ro.disconnect()
      io.disconnect()
      mo.disconnect()
      document.removeEventListener('visibilitychange', onVisChange)
      window.removeEventListener('pointermove', onPointerMove)
      colorMq.removeEventListener('change', applyColors)
      if (reduce) window.removeEventListener('scroll', onScrollReduce)

      javaTex.dispose()
      pyTex.dispose()
      badgeApiTex.dispose()
      badgeMlTex.dispose()
      badgeDbTex.dispose()
      terminalTex.dispose()

      scene.traverse((obj) => {
        if (obj instanceof Mesh || obj instanceof Points || obj instanceof LineSegments) {
          obj.geometry.dispose()
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose())
          } else {
            obj.material.dispose()
          }
        }
      })
      renderer.dispose()
    }
  }, [reduce])

  return (
    <canvas
      ref={canvasRef}
      id="stage"
      aria-hidden="true"
    />
  )
}

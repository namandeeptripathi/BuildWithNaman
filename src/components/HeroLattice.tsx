import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion'

/**
 * Three.js icosahedron lattice positioned in the hero section.
 * Faithfully ports the reference's 3D scene: outer wireframe,
 * glowing nodes, counter-rotating inner shape, dust particles.
 *
 * Reacts to pointer position, scroll, theme changes, visibility.
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

    // ─── Renderer ───
    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
      })
    } catch {
      canvas.style.display = 'none'
      return
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))

    // ─── Scene ───
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 50)
    camera.position.z = 6
    const group = new THREE.Group()
    scene.add(group)

    // Outer wireframe
    const outerGeo = new THREE.IcosahedronGeometry(1.55, 2)
    const wire = new THREE.LineSegments(
      new THREE.WireframeGeometry(outerGeo),
      new THREE.LineBasicMaterial({ transparent: true, opacity: 0.34 }),
    )
    const nodes = new THREE.Points(
      outerGeo,
      new THREE.PointsMaterial({ size: 0.055, transparent: true, opacity: 0.95 }),
    )

    // Inner counter-rotating shape
    const inner = new THREE.LineSegments(
      new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(0.8, 1)),
      new THREE.LineBasicMaterial({ transparent: true, opacity: 0.3 }),
    )
    group.add(wire, nodes, inner)

    // Dust particles
    const count = window.matchMedia('(max-width: 820px)').matches ? 90 : 190
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const rad = 2.3 + Math.random() * 2.4
      const th = Math.random() * Math.PI * 2
      const ph = Math.acos(2 * Math.random() - 1)
      pos[i * 3] = rad * Math.sin(ph) * Math.cos(th)
      pos[i * 3 + 1] = rad * Math.sin(ph) * Math.sin(th)
      pos[i * 3 + 2] = rad * Math.cos(ph)
    }
    const dustGeo = new THREE.BufferGeometry()
    dustGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    const dust = new THREE.Points(
      dustGeo,
      new THREE.PointsMaterial({ size: 0.028, transparent: true, opacity: 0.7 }),
    )
    group.add(dust)

    // ─── Colors from CSS tokens ───
    function token(n: string) {
      return (
        getComputedStyle(root).getPropertyValue(n).trim() ||
        getComputedStyle(root).getPropertyValue(`--color-${n.replace(/^--/, '')}`).trim() ||
        '#C8A25E'
      )
    }
    function applyColors() {
      const brass = token('--brass')
      const ink = token('--ink')
      const muted = token('--muted')
      ;(wire.material as THREE.LineBasicMaterial).color.set(brass)
      ;(nodes.material as THREE.PointsMaterial).color.set(brass)
      ;(inner.material as THREE.LineBasicMaterial).color.set(ink)
      ;(dust.material as THREE.PointsMaterial).color.set(muted)
      if (!running) draw()
    }

    // ─── Sizing & positioning ───
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
      const hh = Math.tan((22.5 * Math.PI) / 180) * 6
      const hw = hh * camera.aspect
      const narrow = camera.aspect < 1.15
      if (narrow) {
        baseX = hw * 0.3
        baseY = hh * 0.58
        group.scale.setScalar(0.8)
        ;(wire.material as THREE.LineBasicMaterial).opacity = 0.24
        ;(inner.material as THREE.LineBasicMaterial).opacity = 0.2
      } else {
        baseX = hw * 0.56
        baseY = hh * 0.28
        group.scale.setScalar(1)
        ;(wire.material as THREE.LineBasicMaterial).opacity = 0.34
        ;(inner.material as THREE.LineBasicMaterial).opacity = 0.3
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

    // ─── Render ───
    function draw() {
      const t = performance.now() * 0.001
      const s = (window.pageYOffset || 0) / 800
      group.rotation.y = (reduce ? 0.6 : t * 0.12) + sx * 0.7 + s * 1.3
      group.rotation.x =
        (reduce ? 0.25 : Math.sin(t * 0.2) * 0.15) + sy * 0.5 + s * 0.5
      inner.rotation.y = reduce ? 0 : -t * 0.3
      inner.rotation.z = reduce ? 0 : t * 0.1
      dust.rotation.y = (reduce ? 0 : -t * 0.02) + s * 0.3
      group.position.y = baseY + s * 1.1
      renderer.render(scene, camera)
    }

    // ─── Animation loop ───
    let running = false
    let visible = true

    function loop() {
      if (!running) return
      sx += (mx - sx) * 0.05
      sy += (my - sy) * 0.05
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
    applyColors()
    draw()

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
      ro.disconnect()
      io.disconnect()
      mo.disconnect()
      document.removeEventListener('visibilitychange', onVisChange)
      window.removeEventListener('pointermove', onPointerMove)
      colorMq.removeEventListener('change', applyColors)
      if (reduce) window.removeEventListener('scroll', onScrollReduce)
      renderer.dispose()
      outerGeo.dispose()
      dustGeo.dispose()
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

import { lazy, Suspense, useEffect, useState, Component, type ReactNode } from 'react'

class LatticeErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch() {
    // Graceful fallback: hero remains fully functional without 3D canvas
  }

  render() {
    if (this.state.hasError) return null
    return this.props.children
  }
}

// Three.js chunk is loaded strictly via dynamic import()
const HeroLattice = lazy(() => import('./HeroLattice'))

export default function LazyHeroLattice() {
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>
    let idleId: number | undefined

    const trigger = () => setShouldLoad(true)

    // Load after first paint & when browser is idle, with fallback timeout
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      idleId = window.requestIdleCallback(trigger, { timeout: 1200 })
    } else {
      timeoutId = setTimeout(trigger, 200)
    }

    return () => {
      if (idleId !== undefined && typeof window !== 'undefined' && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleId)
      }
      clearTimeout(timeoutId)
    }
  }, [])

  if (!shouldLoad) return null

  return (
    <LatticeErrorBoundary>
      <Suspense fallback={null}>
        <HeroLattice />
      </Suspense>
    </LatticeErrorBoundary>
  )
}

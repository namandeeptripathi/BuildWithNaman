import { useCallback, useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'

function getResolved(): Theme {
  try {
    const saved = localStorage.getItem('ndt-theme')
    if (saved === 'light' || saved === 'dark') return saved
  } catch { /* SSR / private-browsing guard */ }
  return window.matchMedia('(prefers-color-scheme: light)').matches
    ? 'light'
    : 'dark'
}

/**
 * Manages data-theme on <html> and persists to localStorage.
 * The inline <script> in index.html restores the attribute before
 * first paint to avoid FOUC.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getResolved)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try { localStorage.setItem('ndt-theme', theme) } catch { /* noop */ }
  }, [theme])

  const toggle = useCallback(() => {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  }, [])

  return { theme, toggle } as const
}

import { useSyncExternalStore } from 'react'

const query =
  typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)')
    : null

function subscribe(cb: () => void) {
  query?.addEventListener('change', cb)
  return () => query?.removeEventListener('change', cb)
}

function getSnapshot() {
  return query?.matches ?? false
}

/**
 * Returns true when the user prefers reduced motion.
 * Updates reactively if the system preference changes.
 */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, () => false)
}

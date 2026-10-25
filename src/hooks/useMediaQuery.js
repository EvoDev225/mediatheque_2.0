import { useSyncExternalStore } from 'react'

export function useMediaQuery(query) {
  return useSyncExternalStore(
    (onChange) => {
      const mql = matchMedia(query)
      mql.addEventListener('change', onChange)
      return () => mql.removeEventListener('change', onChange)
    },
    () => matchMedia(query).matches,
    () => false,
  )
}

/** Vrai quand les animations sont autorisées (pas de prefers-reduced-motion). */
export function useMotion() {
  return !useMediaQuery('(prefers-reduced-motion: reduce)')
}

export function useNarrow() {
  return useMediaQuery('(max-width: 899px)')
}

import { useEffect } from 'react'

/**
 * Arrivée sur une page avec une ancre (ex. /#contact) : la section n'existait pas encore
 * quand le navigateur a voulu défiler, on le fait une fois React affiché.
 */
export function useHashScroll() {
  useEffect(() => {
    const target = location.hash && document.getElementById(location.hash.slice(1))
    if (!target) return
    const frame = requestAnimationFrame(() => target.scrollIntoView({ behavior: 'instant' }))
    return () => cancelAnimationFrame(frame)
  }, [])
}

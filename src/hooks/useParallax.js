import { useEffect } from 'react'

/** Décale légèrement les éléments [data-parallax] selon leur position dans l'écran. */
export function useParallax(enabled) {
  useEffect(() => {
    const els = () => document.querySelectorAll('[data-parallax]')
    if (!enabled) {
      els().forEach((el) => (el.style.transform = ''))
      return
    }
    let frame = 0
    const update = () => {
      frame = 0
      els().forEach((el) => {
        const r = el.parentElement.getBoundingClientRect()
        el.style.transform = `translateY(${(r.top + r.height / 2 - innerHeight / 2) * -0.06}px)`
      })
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    addEventListener('scroll', onScroll, { passive: true })
    addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      removeEventListener('scroll', onScroll)
      removeEventListener('resize', onScroll)
    }
  }, [enabled])
}

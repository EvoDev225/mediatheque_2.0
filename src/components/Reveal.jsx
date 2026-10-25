import { useEffect, useRef } from 'react'
import { useMotion } from '../hooks/useMediaQuery'

/** Fait apparaître son contenu (fondu + montée) quand il entre dans l'écran. */
export default function Reveal({ as: Tag = 'div', delay = 0, children, ...rest }) {
  const ref = useRef(null)
  const motion = useMotion()

  useEffect(() => {
    const el = ref.current
    if (!el || !motion || el.getBoundingClientRect().top < innerHeight * 0.9) return

    el.style.opacity = '0'
    el.style.transform = 'translateY(32px)'
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        el.style.transition = `opacity 600ms var(--ease) ${delay}ms, transform 600ms var(--ease) ${delay}ms`
        el.style.opacity = '1'
        el.style.transform = 'none'
        io.disconnect()
      },
      { threshold: 0.2 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      el.style.opacity = ''
      el.style.transform = ''
      el.style.transition = ''
    }
  }, [motion, delay])

  return (
    <Tag ref={ref} {...rest}>
      {children}
    </Tag>
  )
}

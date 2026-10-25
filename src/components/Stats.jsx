import { useEffect, useRef, useState } from 'react'
import { formatNumber, STATS } from '../data/content'
import { useMotion } from '../hooks/useMediaQuery'
import Reveal from './Reveal'
import './Stats.css'

const FINAL = STATS.map((s) => s.v)
const START = STATS.map((s) => s.from)

/** Chiffres clés avec compteur animé à l'entrée dans l'écran. */
export default function Stats() {
  const ref = useRef(null)
  const motion = useMotion()
  const [animated, setCounts] = useState(START)
  const counts = motion ? animated : FINAL

  useEffect(() => {
    if (!motion) return
    let raf = 0
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        const t0 = performance.now()
        const tick = (now) => {
          const k = Math.min(1, (now - t0) / 1500)
          const e = 1 - Math.pow(1 - k, 3)
          setCounts(STATS.map((s) => Math.round(s.from + (s.v - s.from) * e)))
          if (k < 1) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
      },
      { threshold: 0.3 },
    )
    io.observe(ref.current)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [motion])

  return (
    <section id="chiffres" className="section stats" aria-label="La médiathèque en chiffres">
      <div className="inner stats__grid" ref={ref}>
        {STATS.map((s, i) => (
          <Reveal key={s.label} className="stats__item">
            <span className="stats__value">{(s.sep ? formatNumber(counts[i]) : counts[i]) + s.suf}</span>
            <span className="stats__bar" />
            <span className="stats__label">{s.label}</span>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

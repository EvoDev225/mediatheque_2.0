import { useEffect, useRef, useState } from 'react'
import { formatNumber, STATS } from '../data/content'
import { useMotion } from '../hooks/useMediaQuery'
import { inner } from '../ui'
import Reveal from './Reveal'

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
    <section id="chiffres" className="bg-cream px-4 py-[72px] sm:px-6 lg:py-28" aria-label="La médiathèque en chiffres">
      <div ref={ref} className={`${inner} grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-5`}>
        {STATS.map((s, i) => (
          <Reveal key={s.label} className="flex min-w-0 flex-col gap-3">
            <span className="font-display text-[clamp(2.5rem,5.4vw,4.5rem)] leading-[0.9] whitespace-nowrap text-ink tabular-nums">{(s.sep ? formatNumber(counts[i]) : counts[i]) + s.suf}</span>
            <span className="h-[3px] w-7 rounded-sm bg-orange" />
            <span className="max-w-[200px] text-[15px] leading-[1.45] text-pretty">{s.label}</span>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

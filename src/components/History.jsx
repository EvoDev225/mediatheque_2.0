import { useEffect, useRef, useState } from 'react'
import { MISSIONS, NAME, TIMELINE } from '../data/content'
import { useMotion } from '../hooks/useMediaQuery'
import { display, eyebrow, inner, section } from '../ui'
import Reveal from './Reveal'

/** Notre histoire : texte + frise qui se dessine au fil du scroll. */
export default function History() {
  const trackRef = useRef(null)
  const motion = useMotion()
  const [scrollProgress, setProgress] = useState(0)
  const progress = motion ? scrollProgress : 1

  useEffect(() => {
    if (!motion) return
    let frame = 0
    const update = () => {
      frame = 0
      const r = trackRef.current.getBoundingClientRect()
      setProgress(Math.max(0, Math.min(1, (innerHeight * 0.75 - r.top) / r.height)))
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
  }, [motion])

  return (
    <section id="histoire" className={`${section} bg-cream`}>
      <div className={inner}>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-24">
          <Reveal className="flex min-w-0 flex-col gap-6">
            <span className={eyebrow}>À propos</span>
            <h2 className={display}>
              Un lieu de <em className="text-orange-deep">savoir</em> depuis 2016
            </h2>
            <p className="m-0 font-display text-[22px] leading-[1.35] font-medium text-pretty text-ink">
              Un bâtiment de trois niveaux, ouvert à toutes et à tous.
            </p>
            <p className="m-0 text-[17px] leading-[1.6] text-pretty">
              La {NAME} réunit sous un même toit une bibliothèque jeunesse, une bibliothèque adulte, un espace
              numérique et une salle polyvalente. C’est un établissement fictif, imaginé pour ce projet de
              démonstration : son histoire et ses chiffres sont inventés.
            </p>
          </Reveal>

          {/* Frise : la ligne orange se remplit au fil du scroll */}
          <div ref={trackRef} className="relative min-w-0 pt-2">
            <div className="absolute top-4 bottom-4 left-[11px] w-0.5 bg-ink/12" aria-hidden="true" />
            <div
              className="absolute top-4 left-[11px] max-h-[calc(100%-32px)] w-0.5 bg-orange"
              style={{ height: `${progress * 100}%` }}
              aria-hidden="true"
            />
            <ol className="m-0 flex list-none flex-col gap-10 p-0">
              {TIMELINE.map((m, i) => {
                const on = progress === 1 || progress >= (i + 0.2) / TIMELINE.length
                return (
                  <li
                    key={m.date}
                    className={`relative flex origin-left flex-col gap-2 pl-12 transition-all duration-400 ease-soft sm:pl-[52px] ${
                      on ? 'scale-100 opacity-100' : 'scale-[0.96] opacity-25'
                    }`}
                  >
                    <span
                      className="absolute top-1 left-0.5 size-5 rounded-full bg-orange shadow-[0_0_0_5px_var(--color-cream)]"
                      aria-hidden="true"
                    />
                    <span className="text-[13px] leading-[1.2] font-semibold tracking-[0.08em] text-orange-deep uppercase">
                      {m.date}
                    </span>
                    <span className="font-display text-[clamp(1.5rem,3vw,1.75rem)] leading-[1.05] text-ink">{m.title}</span>
                    <span className="max-w-[440px] text-base leading-normal text-pretty">{m.text}</span>
                  </li>
                )
              })}
            </ol>
          </div>
        </div>

        <Reveal className="mt-14 flex flex-col gap-5 lg:mt-[88px]">
          <span className={`${eyebrow} text-graphite!`}>Notre mission</span>
          <ul className="m-0 flex list-none flex-wrap gap-3 p-0">
            {MISSIONS.map((m) => (
              <li
                key={m.label}
                className="inline-flex items-center gap-3 rounded-full bg-sand px-5 py-3.5 font-display text-lg leading-none text-ink sm:px-6 sm:py-4 sm:text-xl"
              >
                <span className="size-2.5 rounded-full" style={{ background: m.dot }} />
                {m.label}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}

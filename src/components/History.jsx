import { useEffect, useRef, useState } from 'react'
import { MISSIONS, NAME, TIMELINE } from '../data/content'
import { useMotion } from '../hooks/useMediaQuery'
import Reveal from './Reveal'
import './History.css'

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
    <section id="histoire" className="section history">
      <div className="inner">
        <div className="history__grid">
          <Reveal className="history__intro">
            <span className="eyebrow">À propos</span>
            <h2 className="display">
              Un lieu de <em className="accent">savoir</em> depuis 2016
            </h2>
            <p className="history__sub">Un bâtiment de trois niveaux, ouvert à toutes et à tous.</p>
            <p className="history__text">
              La {NAME} réunit sous un même toit une bibliothèque jeunesse, une bibliothèque adulte, un espace
              numérique et une salle polyvalente. C’est un établissement fictif, imaginé pour ce projet de
              démonstration : son histoire et ses chiffres sont inventés.
            </p>
          </Reveal>

          <div className="timeline" ref={trackRef}>
            <div className="timeline__rail" aria-hidden="true" />
            <div className="timeline__fill" aria-hidden="true" style={{ height: `${progress * 100}%` }} />
            <ol>
              {TIMELINE.map((m, i) => {
                const on = progress === 1 || progress >= (i + 0.2) / TIMELINE.length
                return (
                  <li key={m.date} className={on ? 'is-on' : undefined}>
                    <span className="timeline__dot" aria-hidden="true" />
                    <span className="timeline__date">{m.date}</span>
                    <span className="timeline__title">{m.title}</span>
                    <span className="timeline__text">{m.text}</span>
                  </li>
                )
              })}
            </ol>
          </div>
        </div>

        <Reveal className="history__missions">
          <span className="eyebrow">Notre mission</span>
          <ul>
            {MISSIONS.map((m) => (
              <li key={m.label}>
                <span style={{ background: m.dot }} />
                {m.label}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}

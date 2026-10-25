import { useEffect, useRef } from 'react'
import { BOOKS, C, CONTACT, MARQUEE_BG, NAME } from '../data/content'
import { toCover } from '../data/cover'
import { useMotion } from '../hooks/useMediaQuery'
import Book3D from './Book3D'
import BookCover from './BookCover'
import './Hero.css'

const TITLE = [
  { w: 'Un' },
  { w: 'espace' },
  { w: 'de' },
  { w: 'savoir', accent: true },
  { w: 'et' },
  { w: 'de' },
  { w: 'culture', accent: true },
]

const intro = (root, sel, from, base, step, duration) =>
  [...root.querySelectorAll(sel)].map((el, i) =>
    el.animate([from, { opacity: 1, transform: 'none' }], {
      duration,
      delay: base + i * step,
      easing: 'cubic-bezier(.2,.7,.2,1)',
      fill: 'backwards',
    }),
  )

/** Petits confettis qui flottent autour du visuel. */
const float = (root) =>
  [...root.querySelectorAll('[data-float]')].map((el, i) => {
    const dx = (i % 2 ? 1 : -1) * (3 + (i % 4) * 1.5)
    const dy = i % 3 ? -8 : 8
    const r = i % 2 ? 5 : -5
    return el.animate(
      [{ transform: 'translate(0,0) rotate(0deg)' }, { transform: `translate(${dx}px,${dy}px) rotate(${r}deg)` }],
      { duration: 6000 + ((i * 937) % 4000), direction: 'alternate', iterations: Infinity, easing: 'ease-in-out' },
    )
  })

export default function Hero() {
  const rootRef = useRef(null)
  const trackRef = useRef(null)
  const marquee = useRef(null)
  const motion = useMotion()

  useEffect(() => {
    if (!motion) return
    const root = rootRef.current
    const anims = [
      ...intro(root, '[data-word]', { opacity: 0, transform: 'translateY(24px)' }, 100, 80, 700),
      ...intro(root, '[data-hero-after]', { opacity: 0, transform: 'translateY(16px)' }, 760, 120, 600),
      ...intro(root, '[data-hero-visual]', { opacity: 0, transform: 'scale(.96)' }, 420, 0, 800),
      ...float(root),
    ]
    marquee.current = trackRef.current.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(-50%)' }], {
      duration: 40000,
      iterations: Infinity,
    })
    anims.push(marquee.current)
    return () => {
      anims.forEach((a) => a.cancel())
      marquee.current = null
    }
  }, [motion])

  const heroBook = { ...toCover(BOOKS[0], C.cream), spine: C.orange, fg: C.ink }
  const marqueeBooks = BOOKS.map((b, i) => toCover(b, MARQUEE_BG[i % MARQUEE_BG.length]))

  return (
    <section id="top" className="hero" ref={rootRef}>
      <div className="hero__grid">
        <div className="hero__text">
          <span className="hero__badge" data-word>
            <span className="hero__dot" />
            {NAME} · projet fictif
          </span>
          <h1 className="hero__title">
            {TITLE.map(({ w, accent }, i) => (
              <span key={i} data-word className={accent ? 'is-accent' : undefined}>
                {w}
              </span>
            ))}
          </h1>
          <p className="hero__lead" data-hero-after>
            Découvrez notre bibliothèque, notre salle multimédia connectée et nos services. Un cadre moderne et
            convivial pour lire, apprendre et vous former.
          </p>
          <div className="hero__actions" data-hero-after>
            <a href="#espaces" className="btn btn--white">
              Nous rendre visite<span aria-hidden="true">→</span>
            </a>
            <a href="#collection" className="link-arrow hero__link">
              Explorer la collection<span aria-hidden="true">→</span>
            </a>
          </div>
          <div className="hero__infos" data-hero-after>
            <div>
              <span className="hero__info-label">Horaires</span>
              <span>Lun – Sam · 09h – 17h</span>
            </div>
            <div>
              <span className="hero__info-label">Adresse</span>
              <span>{CONTACT.address}</span>
            </div>
          </div>
        </div>

        <div className="hero__visual" data-hero-visual>
          <Book3D book={heroBook} />
          <div className="hero__confetti" aria-hidden="true">
            <div data-float className="c-dot c-dot--yellow" />
            <div data-float className="c-plus c-plus--yellow">+</div>
            <div data-float className="c-diamond-wrap">
              <div className="c-diamond" />
            </div>
            <div data-float className="c-star-wrap">
              <div className="c-star" />
            </div>
            <div data-float className="c-dot c-dot--blue" />
            <div data-float className="c-plus c-plus--orange">+</div>
          </div>
        </div>
      </div>

      <div
        className="hero__marquee"
        aria-label="Aperçu de la collection"
        onMouseEnter={() => marquee.current?.pause()}
        onMouseLeave={() => marquee.current?.play()}
      >
        <div className="hero__track" ref={trackRef}>
          {[...marqueeBooks, ...marqueeBooks].map((b, i) => (
            <div key={i} className="hero__track-item" aria-hidden={i >= marqueeBooks.length || undefined}>
              <BookCover book={b} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

import { useEffect, useRef } from 'react'
import { BOOKS, C, CONTACT, MARQUEE_BG, NAME } from '../data/content'
import { toCover } from '../data/cover'
import { useMotion } from '../hooks/useMediaQuery'
import { btnWhite, linkArrow } from '../ui'
import Book3D from './Book3D'
import BookCover from './BookCover'
import HeroBackdrop from './HeroDecor'

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

  const infoLabel = 'text-[11px] leading-none font-medium tracking-[0.1em] text-orange uppercase'

  return (
    <section id="top" ref={rootRef} className="relative overflow-hidden bg-forest pt-28 text-white sm:pt-36 lg:pt-[168px]">
      <HeroBackdrop />
      <div className="relative mx-auto grid max-w-site items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-[72px]">
        <div className="relative z-10 flex min-w-0 flex-col items-start gap-6 sm:gap-7">
          <span data-word className="inline-flex items-center gap-2.5 rounded-full bg-white/10 px-[18px] py-2.5 text-sm leading-none font-medium">
            <span className="size-2 rounded-full bg-orange" />
            {NAME} · projet fictif
          </span>
          <h1 className="m-0 flex flex-wrap gap-x-[0.24em] gap-y-[0.04em] font-display text-[clamp(2.6rem,6.4vw,5rem)] leading-[0.92] font-normal tracking-[-0.01em]">
            {TITLE.map(({ w, accent }, i) => (
              <span key={i} data-word className={`inline-block ${accent ? 'text-orange italic' : ''}`}>
                {w}
              </span>
            ))}
          </h1>
          <p data-hero-after className="m-0 max-w-[520px] text-base leading-[1.55] text-pretty text-white/85 sm:text-lg">
            Découvrez notre bibliothèque, notre salle multimédia connectée et nos services. Un cadre moderne et
            convivial pour lire, apprendre et vous former.
          </p>
          <div data-hero-after className="flex flex-wrap items-center gap-x-7 gap-y-3">
            <a href="#espaces" className={btnWhite}>
              Nous rendre visite<span aria-hidden="true">→</span>
            </a>
            <a href="#collection" className={linkArrow}>
              Explorer la collection
              <span aria-hidden="true" className="text-orange">
                →
              </span>
            </a>
          </div>
          <div data-hero-after className="flex flex-wrap gap-x-8 gap-y-3 pt-2 text-[15px] leading-[1.3] text-white/85">
            <div className="flex flex-col gap-1.5">
              <span className={infoLabel}>Horaires</span>
              <span>Lun – Sam · 09h – 17h</span>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className={infoLabel}>Adresse</span>
              <span>{CONTACT.address}</span>
            </div>
          </div>
        </div>

        <div data-hero-visual className="relative -order-1 mx-auto aspect-square w-[min(80%,360px)] lg:order-none lg:w-full lg:max-w-[520px]">
          <Book3D book={heroBook} />
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div data-float className="absolute top-[8%] left-[2%] size-[22px] rounded-full bg-yellow" />
            <div data-float className="absolute top-[4%] right-[4%] text-[44px] leading-none text-yellow">+</div>
            <div data-float className="absolute top-[56%] right-0">
              <div className="size-[18px] rotate-45 bg-sky" />
            </div>
            <div data-float className="absolute bottom-[10%] left-[6%]">
              <div className="size-[30px] bg-pink [clip-path:polygon(50%_0,61%_35%,98%_35%,68%_57%,79%_91%,50%_70%,21%_91%,32%_57%,2%_35%,39%_35%)]" />
            </div>
            <div data-float className="absolute bottom-0 left-[46%] size-3 rounded-full bg-sky" />
            <div data-float className="absolute top-[44%] -left-[2%] text-[32px] leading-none text-orange">+</div>
          </div>
        </div>
      </div>

      <div
        className="relative mt-16 overflow-hidden pb-14 lg:mt-[104px]"
        aria-label="Aperçu de la collection"
        onMouseEnter={() => marquee.current?.pause()}
        onMouseLeave={() => marquee.current?.play()}
      >
        <div ref={trackRef} className="flex w-max gap-5 pl-5">
          {[...marqueeBooks, ...marqueeBooks].map((b, i) => (
            <div key={i} className="shrink-0 basis-[max(112px,22vw)]" aria-hidden={i >= marqueeBooks.length || undefined}>
              <BookCover book={b} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

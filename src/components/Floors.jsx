import { useRef, useState } from 'react'
import { CONTACT, FLOORS, NAME } from '../data/content'
import { display, eyebrow, inner, linkArrow, photo, section } from '../ui'
import Reveal from './Reveal'

// Les onglets s'affichent du dernier étage au rez-de-chaussée, comme le bâtiment.
const ORDER = FLOORS.map((_, i) => i).reverse()

/** Explorateur d'étages : un onglet par niveau, un panneau photo + texte par étage. */
export default function Floors() {
  const [active, setActive] = useState(0)
  const tabs = useRef([])

  const onKeyDown = (e) => {
    const pos = ORDER.indexOf(active)
    const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key]
    if (!step) return
    e.preventDefault()
    const next = ORDER[(pos + step + ORDER.length) % ORDER.length]
    setActive(next)
    tabs.current[next]?.focus()
  }

  return (
    <section id="espaces" className={`${section} bg-cream`}>
      <div className={inner}>
        <Reveal className="mb-10 flex max-w-[720px] flex-col gap-5 lg:mb-14">
          <span className={eyebrow}>Nos espaces</span>
          <h2 className={display}>
            Un bâtiment, trois étages d’<em className="text-orange-deep">histoires</em>
          </h2>
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,460px)_minmax(0,1fr)] lg:items-start lg:gap-16">
          {/* Bâtiment stylisé : enseigne, étages, sol */}
          <Reveal className="flex min-w-0 flex-col">
            <div className="hidden rounded-t-xl bg-plum px-4 py-3.5 text-center text-xs leading-none font-semibold tracking-[0.14em] text-cream uppercase lg:block">
              {NAME}
            </div>
            <div
              className="grid grid-cols-3 gap-2 lg:grid-cols-1 lg:pt-2"
              role="tablist"
              aria-label="Étages de la médiathèque"
              onKeyDown={onKeyDown}
            >
              {ORDER.map((i) => {
                const f = FLOORS[i]
                const on = active === i
                return (
                  <button
                    key={f.code}
                    ref={(el) => (tabs.current[i] = el)}
                    type="button"
                    role="tab"
                    id={`floor-tab-${i}`}
                    aria-selected={on}
                    aria-controls={`floor-panel-${i}`}
                    tabIndex={on ? 0 : -1}
                    // En mobile (une ligne), le rez-de-chaussée passe en premier
                    style={{ '--floor': i }}
                    className={`order-(--floor) flex min-w-0 cursor-pointer flex-col-reverse items-start justify-between gap-2 rounded-xl border-none p-3 text-left text-ink transition-colors duration-400 ease-soft sm:p-4 lg:order-none lg:min-h-[120px] lg:flex-row lg:items-center lg:gap-4 lg:px-6 lg:py-5 ${
                      on ? 'bg-orange' : 'bg-sand hover:bg-sand-dark'
                    }`}
                    onClick={() => setActive(i)}
                  >
                    <span className="flex min-w-0 flex-col gap-1.5">
                      <span className="hidden text-xs leading-none font-medium tracking-[0.1em] uppercase sm:block">
                        {f.level}
                      </span>
                      <span className="font-display text-[15px] leading-[1.1] sm:text-lg lg:text-2xl lg:leading-[1.05]">
                        {f.name}
                      </span>
                    </span>
                    <span
                      className={`font-display text-2xl leading-none transition-opacity duration-400 lg:text-[clamp(28px,3vw,40px)] ${
                        on ? 'opacity-100' : 'opacity-35'
                      }`}
                    >
                      {f.code}
                    </span>
                  </button>
                )
              })}
            </div>
            <div className="-mx-4 mt-2 hidden h-3 rounded-md bg-ink lg:block" />
            <p className="mt-4 mb-0 hidden text-sm leading-normal lg:block">Sélectionnez un étage pour le découvrir.</p>
          </Reveal>

          {/* Panneaux superposés, fondu enchaîné */}
          {/* overflow-x-clip : les panneaux masqués glissent de 20px et ne doivent pas élargir la page */}
          <div className="grid min-w-0 overflow-x-clip">
            {FLOORS.map((f, i) => {
              const on = active === i
              return (
                <div
                  key={f.code}
                  role="tabpanel"
                  id={`floor-panel-${i}`}
                  aria-labelledby={`floor-tab-${i}`}
                  className={`col-start-1 row-start-1 flex min-w-0 flex-col gap-6 transition-all duration-500 ease-soft ${
                    on ? 'visible translate-x-0 opacity-100' : 'invisible translate-x-5 opacity-0'
                  }`}
                >
                  <div className="h-[clamp(220px,45vw,360px)] w-full">
                    <img className={photo} src={f.img} alt={f.alt} loading="lazy" />
                  </div>
                  <div className="flex flex-col gap-3.5">
                    <span className={eyebrow}>{f.level}</span>
                    <h3 className="m-0 font-display text-[clamp(2rem,3.4vw,2.75rem)] leading-[0.96] font-normal text-ink">
                      {f.name}
                    </h3>
                    <p className="m-0 font-display text-xl leading-[1.3] font-medium text-ink">{f.sub}</p>
                    <p className="m-0 max-w-[560px] text-base leading-[1.55] text-pretty">{f.text}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {f.points.map((p) => (
                      <span key={p} className="rounded-lg bg-sand px-3.5 py-2.5 text-sm leading-none font-medium text-ink">
                        {p}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap items-center gap-x-7 gap-y-4 text-ink">
                    <span className="inline-flex items-center gap-2 rounded-lg bg-ink px-3.5 py-2.5 text-sm leading-none font-medium text-cream">
                      <span className="size-1.5 rounded-full bg-orange" />
                      {CONTACT.hours}
                    </span>
                    <a href="#contact" className={linkArrow}>
                      En savoir plus
                      <span aria-hidden="true" className="text-orange-deep">
                        →
                      </span>
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

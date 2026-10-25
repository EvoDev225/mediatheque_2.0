import { useRef, useState } from 'react'
import { CONTACT, FLOORS, NAME } from '../data/content'
import Reveal from './Reveal'
import './Floors.css'

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
    <section id="espaces" className="section floors">
      <div className="inner">
        <Reveal className="floors__head">
          <span className="eyebrow">Nos espaces</span>
          <h2 className="display">
            Un bâtiment, trois étages d’<em className="accent">histoires</em>
          </h2>
        </Reveal>

        <div className="floors__grid">
          <Reveal className="floors__building">
            <div className="floors__sign">{NAME}</div>
            <div className="floors__tabs" role="tablist" aria-label="Étages de la médiathèque" onKeyDown={onKeyDown}>
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
                    className={on ? 'floor-tab is-active' : 'floor-tab'}
                    style={{ '--floor': i }}
                    onClick={() => setActive(i)}
                  >
                    <span className="floor-tab__text">
                      <span className="floor-tab__level">{f.level}</span>
                      <span className="floor-tab__name">{f.name}</span>
                    </span>
                    <span className="floor-tab__code">{f.code}</span>
                  </button>
                )
              })}
            </div>
            <div className="floors__ground" />
            <p className="floors__hint">Sélectionnez un étage pour le découvrir.</p>
          </Reveal>

          <div className="floors__panels">
            {FLOORS.map((f, i) => (
              <div
                key={f.code}
                role="tabpanel"
                id={`floor-panel-${i}`}
                aria-labelledby={`floor-tab-${i}`}
                className={active === i ? 'floor-panel is-active' : 'floor-panel'}
              >
                <div className="floor-panel__photo">
                  <img className="photo" src={f.img} alt={f.alt} loading="lazy" />
                </div>
                <div className="floor-panel__text">
                  <span className="eyebrow">{f.level}</span>
                  <h3>{f.name}</h3>
                  <p className="floor-panel__sub">{f.sub}</p>
                  <p>{f.text}</p>
                </div>
                <div className="floor-panel__points">
                  {f.points.map((p) => (
                    <span key={p}>{p}</span>
                  ))}
                </div>
                <div className="floor-panel__foot">
                  <span className="floor-panel__hours">
                    <span />
                    {CONTACT.hours}
                  </span>
                  <a href="#contact" className="link-arrow">
                    En savoir plus<span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

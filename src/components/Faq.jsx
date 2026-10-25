import { useState } from 'react'
import { FAQS } from '../data/content'
import Reveal from './Reveal'
import './Faq.css'

export default function Faq() {
  const [open, setOpen] = useState(0)

  return (
    <section id="faq" className="section faq">
      <div className="inner faq__grid">
        <Reveal className="faq__intro">
          <h2 className="display">
            Questions <em className="accent">fréquentes</em>
          </h2>
          <p>
            Vous ne trouvez pas votre réponse ? <a href="#contact">Écrivez-nous</a>, notre équipe vous répond.
          </p>
        </Reveal>

        <div className="faq__list">
          {FAQS.map((f, i) => {
            const isOpen = open === i
            return (
              <Reveal key={f.q} className={isOpen ? 'faq-item is-open' : 'faq-item'}>
                <h3>
                  <button
                    type="button"
                    id={`faq-q-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${i}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                  >
                    <span>{f.q}</span>
                    <span className="faq-item__icon" aria-hidden="true">
                      <span />
                    </span>
                  </button>
                </h3>
                <div id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`} className="faq-item__answer">
                  <div>
                    <p>{f.a}</p>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

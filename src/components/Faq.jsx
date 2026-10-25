import { useState } from 'react'
import { FAQS } from '../data/content'
import { display, inner, section } from '../ui'
import Reveal from './Reveal'

export default function Faq() {
  const [open, setOpen] = useState(0)

  return (
    <section id="faq" className={`${section} bg-white`}>
      <div className={`${inner} grid gap-10 lg:grid-cols-[minmax(0,440px)_minmax(0,1fr)] lg:items-start lg:gap-20`}>
        <Reveal className="flex flex-col gap-5">
          <h2 className={display}>
            Questions <em className="text-orange-deep">fréquentes</em>
          </h2>
          <p className="m-0 text-[17px] leading-[1.55]">
            Vous ne trouvez pas votre réponse ?{' '}
            <a href="#contact" className="font-medium text-orange-deep underline underline-offset-3">
              Écrivez-nous
            </a>
            , notre équipe vous répond.
          </p>
        </Reveal>

        <div className="flex min-w-0 flex-col gap-3">
          {FAQS.map((f, i) => {
            const isOpen = open === i
            return (
              <Reveal key={f.q} className="rounded-xl bg-cream">
                <h3 className="m-0">
                  <button
                    type="button"
                    id={`faq-q-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${i}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="flex min-h-16 w-full cursor-pointer items-center justify-between gap-4 rounded-xl border-none bg-transparent px-5 py-4 text-left text-base leading-[1.35] font-medium text-ink sm:gap-5 sm:px-6 sm:py-5 sm:text-lg"
                  >
                    <span>{f.q}</span>
                    <span
                      className={`flex size-9 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
                        isOpen ? 'bg-orange' : 'bg-sand'
                      }`}
                      aria-hidden="true"
                    >
                      <span
                        className={`size-[9px] border-r-2 border-b-2 border-ink transition-transform duration-300 ease-soft ${
                          isOpen ? 'translate-y-0.5 rotate-[225deg]' : '-translate-y-0.5 rotate-45'
                        }`}
                      />
                    </span>
                  </button>
                </h3>
                <div
                  id={`faq-a-${i}`}
                  role="region"
                  aria-labelledby={`faq-q-${i}`}
                  className={`grid transition-[grid-template-rows] duration-400 ease-soft ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                >
                  <div className={`overflow-hidden ${isOpen ? 'visible' : 'invisible transition-[visibility] delay-400'}`}>
                    <p className="m-0 max-w-[600px] px-5 pb-6 text-base leading-[1.6] text-pretty sm:px-6">{f.a}</p>
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

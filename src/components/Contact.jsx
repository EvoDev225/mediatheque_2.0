import { useState } from 'react'
import lecture from '../assets/img/lecture.webp'
import { CONTACT, NAME } from '../data/content'
import { btnOrange, btnOutline, btnWhite, inner, linkArrow, photo, section } from '../ui'
import Reveal from './Reveal'

const field =
  'w-full border border-ink/15 bg-white text-base leading-normal font-normal text-ink focus-visible:outline-2 focus-visible:outline-orange'
const label = 'text-[11px] leading-none font-medium tracking-[0.1em] text-orange-deep uppercase'

function Info({ title, children }) {
  return (
    <div className="flex flex-col gap-1.5 text-[15px] leading-normal">
      <span className={label}>{title}</span>
      {children}
    </div>
  )
}

/** Formulaire de démonstration : la médiathèque est fictive, rien n'est envoyé ni enregistré. */
export default function Contact() {
  const [sent, setSent] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    e.currentTarget.reset()
    setSent(true)
  }

  return (
    <section id="contact" className={`${section} overflow-hidden bg-forest text-white`}>
      <div className={`${inner} grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-[72px]`}>
        <Reveal className="flex min-w-0 flex-col gap-6 sm:gap-7">
          <h2 className="m-0 font-display text-[clamp(2.5rem,5.6vw,4.75rem)] leading-[0.92] font-normal tracking-[-0.01em] text-balance">
            Venez nous rendre <em className="text-orange">visite</em>
          </h2>
          <p className="m-0 max-w-[460px] text-base leading-[1.55] text-pretty text-white/85 sm:text-lg">
            Que vous veniez lire, travailler, vous former ou organiser un événement, nos équipes vous accueillent du
            lundi au samedi.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="#espaces" className={btnWhite}>
              Explorer nos espaces<span aria-hidden="true">→</span>
            </a>
            <a href="#services" className={btnOutline}>
              Nos services
            </a>
          </div>
          <div className="relative mt-2 h-[clamp(200px,40vw,300px)] w-full sm:mt-4">
            <div data-parallax className="absolute inset-0">
              <img className={photo} src={lecture} alt="Mains tenant un livre ouvert sur un plaid" loading="lazy" />
            </div>
          </div>
        </Reveal>

        <Reveal className="flex min-w-0 flex-col gap-8 rounded-[clamp(24px,5vw,48px)] bg-cream p-6 text-ink sm:p-10 lg:p-12">
          {sent ? (
            <div role="status" className="flex flex-col items-start gap-3 py-6">
              <h3 className="m-0 font-display text-[clamp(1.75rem,4vw,2rem)] leading-none font-normal">
                Merci pour votre <em className="text-orange-deep">message</em> !
              </h3>
              <p className="m-0 text-base leading-normal text-graphite">
                La {NAME} est un projet fictif : ce formulaire est une démonstration, aucun message n’a été envoyé ni
                enregistré.
              </p>
              <button type="button" className={`${linkArrow} cursor-pointer border-none bg-transparent p-0 text-ink`} onClick={() => setSent(false)}>
                Écrire un autre message<span aria-hidden="true">→</span>
              </button>
            </div>
          ) : (
            <form className="flex flex-col gap-3.5" onSubmit={onSubmit}>
              <h3 className="m-0 mb-2 font-display text-[clamp(1.75rem,4vw,2rem)] leading-none font-normal">Écrivez-nous</h3>
              <label className="flex flex-col gap-2 text-sm leading-none font-medium">
                Nom
                <input required name="nom" autoComplete="name" placeholder="Votre nom" className={`${field} min-h-[52px] rounded-full px-5`} />
              </label>
              <label className="flex flex-col gap-2 text-sm leading-none font-medium">
                Email
                <input
                  required
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="vous@exemple.ci"
                  className={`${field} min-h-[52px] rounded-full px-5`}
                />
              </label>
              <label className="flex flex-col gap-2 text-sm leading-none font-medium">
                Message
                <textarea required name="message" rows={4} placeholder="Votre message" className={`${field} resize-y rounded-3xl px-5 py-4`} />
              </label>
              <button type="submit" className={`${btnOrange} mt-2 self-start`}>
                Envoyer le message<span aria-hidden="true">→</span>
              </button>
              <p className="m-0 text-[13px] leading-[1.4] text-graphite">
                Formulaire de démonstration : aucun message n’est réellement envoyé.
              </p>
            </form>
          )}

          <div className="grid gap-x-6 gap-y-5 border-t border-ink/10 pt-7 sm:grid-cols-2">
            <Info title="Téléphone">
              {CONTACT.phones.map((p) => (
                <span key={p}>{p}</span>
              ))}
            </Info>
            <div className="flex flex-col gap-[18px]">
              <Info title="Email">
                <span className="break-all">{CONTACT.email}</span>
              </Info>
              <Info title="Adresse">
                <span>{CONTACT.address}</span>
              </Info>
              <Info title="Horaires">
                <span>{CONTACT.hours}</span>
              </Info>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

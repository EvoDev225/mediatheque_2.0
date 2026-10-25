import { useState } from 'react'
import lecture from '../assets/img/lecture.webp'
import { CONTACT, NAME } from '../data/content'
import Reveal from './Reveal'
import './Contact.css'

/** Formulaire de démonstration : la médiathèque est fictive, rien n'est envoyé ni enregistré. */
export default function Contact() {
  const [sent, setSent] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    e.currentTarget.reset()
    setSent(true)
  }

  return (
    <section id="contact" className="section contact">
      <div className="inner contact__grid">
        <Reveal className="contact__intro">
          <h2 className="contact__title">
            Venez nous rendre <em>visite</em>
          </h2>
          <p className="contact__lead">
            Que vous veniez lire, travailler, vous former ou organiser un événement, nos équipes vous accueillent du
            lundi au samedi.
          </p>
          <div className="contact__actions">
            <a href="#espaces" className="btn btn--white">
              Explorer nos espaces<span aria-hidden="true">→</span>
            </a>
            <a href="#services" className="btn btn--outline">
              Nos services
            </a>
          </div>
          <div className="contact__photo">
            <div data-parallax>
              <img className="photo" src={lecture} alt="Mains tenant un livre ouvert sur un plaid" loading="lazy" />
            </div>
          </div>
        </Reveal>

        <Reveal className="contact__card">
          {sent ? (
            <div role="status" className="contact__sent">
              <h3>
                Merci pour votre <em>message</em> !
              </h3>
              <p>
                La {NAME} est un projet fictif : ce formulaire est une démonstration, aucun message n’a été envoyé ni
                enregistré.
              </p>
              <button type="button" className="link-arrow" onClick={() => setSent(false)}>
                Écrire un autre message<span aria-hidden="true">→</span>
              </button>
            </div>
          ) : (
            <form className="contact__form" onSubmit={onSubmit}>
              <h3>Écrivez-nous</h3>
              <label>
                Nom
                <input required name="nom" autoComplete="name" placeholder="Votre nom" />
              </label>
              <label>
                Email
                <input required type="email" name="email" autoComplete="email" placeholder="vous@exemple.ci" />
              </label>
              <label>
                Message
                <textarea required name="message" rows={4} placeholder="Votre message" />
              </label>
              <button type="submit" className="btn btn--orange">
                Envoyer le message<span aria-hidden="true">→</span>
              </button>
              <p className="contact__note">Formulaire de démonstration : aucun message n’est réellement envoyé.</p>
            </form>
          )}

          <div className="contact__infos">
            <div className="contact__info">
              <span className="contact__label">Téléphone</span>
              {CONTACT.phones.map((p) => (
                <span key={p}>{p}</span>
              ))}
            </div>
            <div className="contact__info-col">
              <div className="contact__info">
                <span className="contact__label">Email</span>
                <span className="contact__email">{CONTACT.email}</span>
              </div>
              <div className="contact__info">
                <span className="contact__label">Adresse</span>
                <span>{CONTACT.address}</span>
              </div>
              <div className="contact__info">
                <span className="contact__label">Horaires</span>
                <span>{CONTACT.hours}</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

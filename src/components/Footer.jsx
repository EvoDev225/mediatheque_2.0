import { CONTACT, FOOTER_LINKS, LEGAL_URL, NAME, SOCIALS } from '../data/content'
import { EDITOR } from '../data/legal'
import Logo from './Logo'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__grid">
        <div className="footer__brand">
          <div className="footer__logo">
            <Logo />
            <span>{NAME}</span>
          </div>
          <p>Un espace de savoir, de culture et de partage — établissement fictif imaginé pour ce projet.</p>
        </div>

        <nav className="footer__col" aria-label="Liens rapides">
          <span className="footer__title">Liens rapides</span>
          {FOOTER_LINKS.map((l) => (
            <a key={l.label} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="footer__col">
          <span className="footer__title">Contact</span>
          <span>
            {CONTACT.phones.map((p) => (
              <span key={p} className="footer__line">
                {p}
              </span>
            ))}
          </span>
          <span className="footer__email">{CONTACT.email}</span>
          <span>{CONTACT.address}</span>
        </div>

        <div className="footer__col">
          <span className="footer__title">Suivez-nous</span>
          <div className="footer__socials">
            {SOCIALS.map((s) => (
              <a key={s.label} href={s.href} aria-label={s.label}>
                {s.short}
              </a>
            ))}
          </div>
          <span className="footer__title footer__title--spaced">Horaires</span>
          <span>{CONTACT.hours}</span>
        </div>
      </div>

      <div className="footer__legal">
        <span>© 2026 {NAME} — projet fictif réalisé à titre de démonstration.</span>
        <span>
          Conception & développement : <a href={`mailto:${EDITOR.email}`}>{EDITOR.name}</a> ·{' '}
          <a href={LEGAL_URL}>Mentions légales</a>
        </span>
      </div>
      <div className="footer__watermark" aria-hidden="true">
        Médiathèque
      </div>
    </footer>
  )
}

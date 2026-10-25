import { CONTACT, FOOTER_LINKS, LEGAL_URL, NAME, SOCIALS } from '../data/content'
import { EDITOR } from '../data/legal'
import Logo from './Logo'

const title = 'mb-1.5 text-xs leading-none font-medium tracking-[0.1em] text-cream uppercase'
const link = 'transition-colors duration-200 hover:text-orange'

export default function Footer() {
  return (
    <footer className="overflow-hidden bg-char px-4 pt-[72px] text-[15px] leading-normal text-cream/70 sm:px-6 lg:pt-[104px]">
      <div className="mx-auto grid max-w-site gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-3 font-display text-2xl leading-none text-cream">
            <Logo className="h-6" />
            <span>{NAME}</span>
          </div>
          <p className="m-0 max-w-[260px] text-pretty">
            Un espace de savoir, de culture et de partage — établissement fictif imaginé pour ce projet.
          </p>
        </div>

        <nav className="flex flex-col gap-3" aria-label="Liens rapides">
          <span className={title}>Liens rapides</span>
          {FOOTER_LINKS.map((l) => (
            <a key={l.label} href={l.href} className={link}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex flex-col gap-3">
          <span className={title}>Contact</span>
          <span>
            {CONTACT.phones.map((p) => (
              <span key={p} className="block">
                {p}
              </span>
            ))}
          </span>
          <span className="break-all">{CONTACT.email}</span>
          <span>{CONTACT.address}</span>
        </div>

        <div className="flex flex-col gap-3">
          <span className={title}>Suivez-nous</span>
          <div className="flex gap-2.5">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="flex size-11 items-center justify-center rounded-full bg-plum text-[13px] leading-none font-semibold text-cream transition-colors duration-200 hover:bg-orange hover:text-ink"
              >
                {s.short}
              </a>
            ))}
          </div>
          <span className={`${title} mt-[18px]`}>Horaires</span>
          <span>{CONTACT.hours}</span>
        </div>
      </div>

      <div className="mx-auto mt-16 flex max-w-site flex-wrap justify-between gap-x-6 gap-y-2 border-t border-cream/10 pt-6 text-[13px]">
        <span>© 2026 {NAME} — projet fictif réalisé à titre de démonstration.</span>
        <span>
          Conception & développement :{' '}
          <a href={`mailto:${EDITOR.email}`} className={`${link} text-cream underline underline-offset-3`}>
            {EDITOR.name}
          </a>{' '}
          ·{' '}
          <a href={LEGAL_URL} className={`${link} text-cream underline underline-offset-3`}>
            Mentions légales
          </a>
        </span>
      </div>
      <div
        className="mt-6 translate-y-[12%] text-center font-display text-[clamp(4.5rem,19vw,18rem)] leading-[0.8] tracking-[-0.03em] whitespace-nowrap text-orange/10"
        aria-hidden="true"
      >
        Médiathèque
      </div>
    </footer>
  )
}

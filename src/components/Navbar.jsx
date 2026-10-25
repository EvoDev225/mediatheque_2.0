import { useEffect, useState } from 'react'
import { home, NAME, NAV } from '../data/content'
import Logo from './Logo'
import './Navbar.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(scrollY > 80)
    onScroll()
    addEventListener('scroll', onScroll, { passive: true })
    return () => removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    document.body.classList.add('is-locked')
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false)
    const onResize = () => innerWidth >= 900 && setMenuOpen(false)
    addEventListener('keydown', onKey)
    addEventListener('resize', onResize)
    return () => {
      document.body.classList.remove('is-locked')
      removeEventListener('keydown', onKey)
      removeEventListener('resize', onResize)
    }
  }, [menuOpen])

  const close = () => setMenuOpen(false)

  return (
    <>
      <header className={scrolled ? 'navbar is-scrolled' : 'navbar'}>
        <div className="navbar__inner">
          <a href={home('top')} className="navbar__brand" aria-label={`${NAME} — accueil`}>
            <Logo />
            <span className="navbar__brand-text">
              <span className="navbar__name">{NAME}</span>
              <span className="navbar__tagline">Culture · Formation · Savoir</span>
            </span>
          </a>

          <nav className="navbar__links" aria-label="Navigation principale">
            {NAV.map((l) => (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ))}
          </nav>
          <a href={home('contact')} className="navbar__login">
            Connexion
          </a>

          <button type="button" className="navbar__burger" aria-label="Ouvrir le menu" onClick={() => setMenuOpen(true)}>
            <span />
            <span />
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="mobile-menu__head">
            <span className="navbar__name">{NAME}</span>
            <button type="button" className="mobile-menu__close" aria-label="Fermer le menu" onClick={close} autoFocus>
              ×
            </button>
          </div>
          <nav className="mobile-menu__links">
            {NAV.map((l) => (
              <a key={l.href} href={l.href} onClick={close}>
                {l.label}
              </a>
            ))}
          </nav>
          <a href={home('contact')} className="mobile-menu__login" onClick={close}>
            Connexion
          </a>
        </div>
      )}
    </>
  )
}

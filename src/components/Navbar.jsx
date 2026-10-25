import { useEffect, useState } from 'react'
import { home, NAME, NAV } from '../data/content'
import Logo from './Logo'

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
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false)
    const onResize = () => innerWidth >= 1024 && setMenuOpen(false)
    addEventListener('keydown', onKey)
    addEventListener('resize', onResize)
    return () => {
      document.body.style.overflow = ''
      removeEventListener('keydown', onKey)
      removeEventListener('resize', onResize)
    }
  }, [menuOpen])

  const close = () => setMenuOpen(false)
  // Pilule claire sur le hero, foncée une fois la page défilée
  const pill = scrolled ? 'bg-plum text-cream' : 'bg-white text-ink'

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[height,background-color,color] duration-300 ease-soft ${
          scrolled ? 'h-16 bg-cream/85 text-ink backdrop-blur-md' : 'h-[72px] bg-cream/0 text-white sm:h-[84px]'
        }`}
      >
        <div className="mx-auto flex h-full max-w-site items-center justify-between gap-6 px-4 sm:px-6">
          <a href={home('top')} className="flex min-w-0 items-center gap-3" aria-label={`${NAME} — accueil`}>
            <Logo className="h-6 shrink-0" />
            <span className="flex min-w-0 flex-col gap-0.5">
              <span className="truncate font-display text-xl leading-none tracking-[-0.01em] sm:text-[22px]">{NAME}</span>
              <span className="truncate text-[10px] leading-none font-medium tracking-[0.08em] uppercase opacity-80 max-[359px]:hidden">
                Culture · Formation · Savoir
              </span>
            </span>
          </a>

          <nav className="ml-auto hidden items-center gap-8 lg:flex" aria-label="Navigation principale">
            {NAV.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`py-3 text-[15px] leading-none font-medium transition-colors ${
                  scrolled ? 'hover:text-orange-deep' : 'hover:text-orange'
                }`}
              >
                {l.label}
              </a>
            ))}
          </nav>
          <a
            href={home('contact')}
            className={`hidden min-h-11 items-center rounded-full px-6 text-[15px] leading-none font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-pill lg:inline-flex ${pill}`}
          >
            Connexion
          </a>

          <button
            type="button"
            className={`flex size-12 shrink-0 cursor-pointer flex-col items-center justify-center gap-[5px] rounded-full border-none lg:hidden ${pill}`}
            aria-label="Ouvrir le menu"
            onClick={() => setMenuOpen(true)}
          >
            <span className="h-0.5 w-[18px] rounded-sm bg-current" />
            <span className="h-0.5 w-[18px] rounded-sm bg-current" />
          </button>
        </div>
      </header>

      {menuOpen && (
        <div
          className="fixed inset-0 z-60 flex animate-menu-in flex-col overflow-y-auto bg-cream p-4 text-ink"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          <div className="flex h-12 items-center justify-between">
            <span className="font-display text-[22px] leading-none">{NAME}</span>
            <button
              type="button"
              className="size-12 cursor-pointer rounded-full border-none bg-plum text-[22px] leading-none text-cream"
              aria-label="Fermer le menu"
              onClick={close}
              autoFocus
            >
              ×
            </button>
          </div>
          <nav className="mt-12 flex flex-col gap-2">
            {NAV.map((l) => (
              <a key={l.href} href={l.href} onClick={close} className="py-2 font-display text-[clamp(2rem,10vw,2.75rem)] leading-[1.1]">
                {l.label}
              </a>
            ))}
          </nav>
          <a
            href={home('contact')}
            onClick={close}
            className="mt-auto flex min-h-14 shrink-0 items-center justify-center rounded-full bg-orange text-base leading-none font-medium text-ink"
          >
            Connexion
          </a>
        </div>
      )}
    </>
  )
}

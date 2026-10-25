import { useState } from 'react'
import { BOOKS, CATALOG, CATEGORIES, formatNumber } from '../data/content'
import { toCover } from '../data/cover'
import { btnPlum, display, inner, lead, section } from '../ui'
import BookCover from './BookCover'
import Reveal from './Reveal'

export default function Collection() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('Tous')

  const q = query.trim().toLowerCase()
  const books = BOOKS.filter(
    (b) => (category === 'Tous' || b.c === category) && (!q || `${b.t} ${b.a}`.toLowerCase().includes(q)),
  ).map((b) => toCover(b))

  return (
    <section id="collection" className={`${section} overflow-hidden bg-sky text-ink`}>
      <div className={inner}>
        <Reveal className="mb-10 flex max-w-[760px] flex-col gap-5">
          <h2 className={display}>
            Votre portail vers la <em>lecture</em>
          </h2>
          <p className={lead}>
            Parcourez {formatNumber(CATALOG)} ouvrages qui éveillent la curiosité et nourrissent l’esprit.
          </p>
        </Reveal>

        <Reveal className="mb-10 flex flex-col gap-5 lg:mb-12">
          <form
            role="search"
            onSubmit={(e) => e.preventDefault()}
            className="flex min-h-[60px] max-w-[640px] items-center gap-3 rounded-full bg-cream py-1.5 pr-1.5 pl-5 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-ink sm:pl-6"
          >
            <span className="size-3.5 shrink-0 rounded-full border-2 border-ink" aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher un livre par titre, auteur…"
              aria-label="Rechercher un livre"
              className="h-11 min-w-0 flex-1 border-none bg-transparent text-base leading-none text-ink outline-none"
            />
            <button
              type="submit"
              className="hidden h-12 shrink-0 cursor-pointer rounded-full border-none bg-plum px-[22px] text-[15px] leading-none font-medium text-cream sm:block"
            >
              Rechercher
            </button>
          </form>
          {/* Défilement horizontal sur mobile, retour à la ligne à partir de la tablette */}
          <div
            role="group"
            aria-label="Catégories"
            className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
          >
            {CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={category === c}
                onClick={() => setCategory(c)}
                className={`min-h-11 shrink-0 cursor-pointer rounded-lg border-none px-4 text-sm leading-none font-medium whitespace-nowrap transition-colors duration-200 ${
                  category === c ? 'bg-plum text-cream' : 'bg-cream text-ink hover:bg-white'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </Reveal>

        <div
          aria-live="polite"
          className="-mx-4 -mt-3 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pt-3 pb-5 [scrollbar-width:thin] sm:-mx-6 sm:gap-6 sm:px-6 lg:mx-0 lg:px-0"
        >
          {books.map((b) => (
            // Grandes couvertures : 22 % de la largeur de l'écran, 168px minimum
            <article key={b.t} className="group flex shrink-0 basis-[max(168px,22vw)] snap-start flex-col gap-3.5">
              <div className="transition-transform duration-300 ease-soft group-hover:-translate-y-1.5 group-hover:scale-[1.03]">
                <BookCover book={b} />
              </div>
              <div className="flex flex-col gap-1 text-sm leading-[1.3]">
                <h3 className="m-0 text-[15px] leading-[1.3] font-semibold">{b.t}</h3>
                <span>{b.a}</span>
                <span className="text-[13px]">
                  {b.c} · {b.p} · {b.y}
                </span>
              </div>
            </article>
          ))}
          {books.length === 0 && (
            <p className="m-0 py-12 font-display text-[22px] leading-[1.3]">
              Aucun ouvrage dans cette sélection pour l’instant.
            </p>
          )}
        </div>

        <a href="#collection" className={`${btnPlum} mt-8`}>
          Voir tout le catalogue<span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  )
}

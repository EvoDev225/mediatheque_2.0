import { useState } from 'react'
import { BOOKS, CATALOG, CATEGORIES, formatNumber } from '../data/content'
import { toCover } from '../data/cover'
import BookCover from './BookCover'
import Reveal from './Reveal'
import './Collection.css'

export default function Collection() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('Tous')

  const q = query.trim().toLowerCase()
  const books = BOOKS.filter(
    (b) => (category === 'Tous' || b.c === category) && (!q || `${b.t} ${b.a}`.toLowerCase().includes(q)),
  ).map((b) => toCover(b))

  return (
    <section id="collection" className="section collection">
      <div className="inner">
        <Reveal className="collection__head">
          <h2 className="display">
            Votre portail vers la <em>lecture</em>
          </h2>
          <p className="lead">
            Parcourez {formatNumber(CATALOG)} ouvrages qui éveillent la curiosité et nourrissent l’esprit.
          </p>
        </Reveal>

        <Reveal className="collection__filters">
          <form className="collection__search" role="search" onSubmit={(e) => e.preventDefault()}>
            <span className="collection__search-icon" aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher un livre par titre, auteur…"
              aria-label="Rechercher un livre"
            />
            <button type="submit">Rechercher</button>
          </form>
          <div className="collection__cats" role="group" aria-label="Catégories">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={category === c}
                className={category === c ? 'chip is-active' : 'chip'}
                onClick={() => setCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="collection__row" aria-live="polite">
          {books.map((b) => (
            <article key={b.t} className="book">
              <div className="book__cover">
                <BookCover book={b} />
              </div>
              <div className="book__meta">
                <h3>{b.t}</h3>
                <span>{b.a}</span>
                <span>
                  {b.c} · {b.p} · {b.y}
                </span>
              </div>
            </article>
          ))}
          {books.length === 0 && <p className="collection__empty">Aucun ouvrage dans cette sélection pour l’instant.</p>}
        </div>

        <a href="#collection" className="btn btn--plum collection__cta">
          Voir tout le catalogue<span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  )
}

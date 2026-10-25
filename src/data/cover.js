import { C } from './books'

// Couvertures téléchargées par `npm run covers` ; un livre sans fichier garde sa couverture typographique.
const FILES = import.meta.glob('../assets/covers/*.webp', { eager: true, import: 'default' })
const IMAGES = Object.fromEntries(Object.entries(FILES).map(([path, url]) => [path.split('/').pop().replace('.webp', ''), url]))

const DARK = [C.forest, C.plum]
const MARK = {
  [C.forest]: C.orange,
  [C.plum]: C.orange,
  [C.orange]: C.ink,
  [C.sky]: C.yellow,
  [C.cream]: C.orange,
  [C.yellow]: C.orange,
  [C.pink]: C.forest,
  [C.teal]: C.yellow,
}

/** Ajoute à un livre ses couleurs de couverture et son image (s'il y en a une). */
export function toCover(book, bg = book.bg) {
  return {
    ...book,
    bg,
    fg: DARK.includes(bg) ? C.cream : C.ink,
    mark: MARK[bg],
    img: IMAGES[book.id] || null,
  }
}

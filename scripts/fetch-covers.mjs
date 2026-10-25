// Télécharge une fois les couvertures depuis Open Library vers src/assets/covers/<id>.webp,
// pour que le site ne dépende plus d'Open Library au chargement.
// Usage : npm run covers         (ignore les couvertures déjà présentes)
//         npm run covers -- --force
import { access, mkdir } from 'node:fs/promises'
import { join, resolve } from 'node:path'
import sharp from 'sharp'
import { BOOKS } from '../src/data/books.js'

const OUT = resolve(import.meta.dirname, '../src/assets/covers')
const force = process.argv.includes('--force')

const searchUrl = (book) =>
  'https://openlibrary.org/search.json?title=' +
  encodeURIComponent(book.t.replace(/’/g, "'")) +
  '&author=' +
  encodeURIComponent(book.a.split(' ').pop()) +
  '&fields=cover_i&limit=5'

const exists = (p) => access(p).then(() => true, () => false)

await mkdir(OUT, { recursive: true })

for (const book of BOOKS) {
  if (book.noCover) {
    console.log(`–  ${book.t} : couverture typographique (noCover)`)
    continue
  }
  const file = join(OUT, `${book.id}.webp`)
  if (!force && (await exists(file))) {
    console.log(`=  ${book.t} (déjà là)`)
    continue
  }
  try {
    const search = await fetch(searchUrl(book)).then((r) => r.json())
    const hit = search.docs?.find((d) => d.cover_i)
    if (!hit) {
      console.log(`–  ${book.t} : aucune couverture trouvée`)
      continue
    }
    // default=false : 404 au lieu d'une image vide quand la couverture n'existe pas
    const res = await fetch(`https://covers.openlibrary.org/b/id/${hit.cover_i}-L.jpg?default=false`)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const info = await sharp(Buffer.from(await res.arrayBuffer()))
      .resize({ width: 400, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(file)
    console.log(`✓  ${book.t} → ${book.id}.webp  ${Math.round(info.size / 1024)} Ko`)
  } catch (err) {
    console.log(`✗  ${book.t} : ${err.message}`)
  }
}

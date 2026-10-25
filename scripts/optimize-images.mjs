// Redimensionne et convertit en WebP les photos d'un dossier vers src/assets/img.
// Usage : npm run images -- <dossier des photos originales>
import { readdir, mkdir } from 'node:fs/promises'
import { join, parse, resolve } from 'node:path'
import sharp from 'sharp'

const [srcArg] = process.argv.slice(2)
if (!srcArg) {
  console.error('Indique le dossier des photos : npm run images -- <dossier>')
  process.exit(1)
}

const SRC = resolve(srcArg)
const OUT = resolve(import.meta.dirname, '../src/assets/img')
const MAX_WIDTH = 1600

await mkdir(OUT, { recursive: true })

for (const file of await readdir(SRC)) {
  if (!/\.(jpe?g|png|webp)$/i.test(file)) continue
  const { name } = parse(file)
  const info = await sharp(join(SRC, file))
    .rotate()
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: 78 })
    .toFile(join(OUT, `${name}.webp`))
  console.log(`${file} → ${name}.webp  ${info.width}×${info.height}  ${Math.round(info.size / 1024)} Ko`)
}

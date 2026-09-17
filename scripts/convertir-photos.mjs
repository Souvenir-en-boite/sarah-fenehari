// Convertit des photos en AVIF pour le site.
//
//   node scripts/convertir-photos.mjs <fichiers ou dossier> --sortie <dossier> [options]
//
// Options : --largeur <px>    largeur maximale (défaut 1600)
//           --qualite <1-100>  qualité AVIF (défaut 58)
//           --prefixe <nom>    renomme en <nom>-1.avif, <nom>-2.avif, ...
//           --depart <n>       premier numéro de la série (défaut 1)
//
// Les noms de fichiers livrés par Pixieset contiennent des parenthèses, qui
// n'ont rien à faire dans une URL : --prefixe les remplace par une série
// numérotée. --depart sert à compléter une galerie existante sans renommer ce
// qui est déjà en ligne — les anciennes URL restent valides pour Google.
//
// Exemple, pour une galerie complète :
//   node scripts/convertir-photos.mjs ~/Downloads/pixieset \
//     --sortie public/assets/picture/portfolio-mariage --largeur 1600
//
// ⚠️ Ne pas utiliser `sips -s format avif` : il produit des AVIF en grille de
// tuiles que Chrome ne décode pas toujours — l'image apparaît alors vide, sans
// la moindre erreur. sharp (libvips + aom) produit des fichiers standards.

import { readdir, stat, mkdir } from 'node:fs/promises'
import { join, basename, extname, resolve } from 'node:path'
import sharp from 'sharp'

const args = process.argv.slice(2)
const lire = (nom, defaut) => {
  const i = args.indexOf(nom)
  return i === -1 ? defaut : args[i + 1]
}
const sortie = lire('--sortie', null)
const largeurMax = Number(lire('--largeur', 1600))
const qualite = Number(lire('--qualite', 58))
const prefixe = lire('--prefixe', null)
const depart = Number(lire('--depart', 1))
const entrees = args.filter((a) => !a.startsWith('--') && args[args.indexOf(a) - 1]?.startsWith('--') !== true)

if (!sortie || entrees.length === 0) {
  console.error('Usage : node scripts/convertir-photos.mjs <fichiers|dossier> --sortie <dossier> [--largeur 1600] [--qualite 58] [--prefixe nom] [--depart 1]')
  process.exit(1)
}

const EXT = new Set(['.jpg', '.jpeg', '.png', '.tif', '.tiff', '.webp', '.heic'])

async function lister(chemin) {
  const infos = await stat(chemin)
  if (!infos.isDirectory()) return [chemin]
  const noms = await readdir(chemin)
  return noms
    .filter((n) => EXT.has(extname(n).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, 'fr', { numeric: true }))
    .map((n) => join(chemin, n))
}

const fichiers = (await Promise.all(entrees.map(lister))).flat()
await mkdir(resolve(sortie), { recursive: true })

console.log(`\n${fichiers.length} photo(s) — largeur max ${largeurMax}px, qualité ${qualite}\n`)

const resultats = []
for (const [i, src] of fichiers.entries()) {
  const nom = prefixe
    ? `${prefixe}-${depart + i}.avif`
    : basename(src, extname(src)) + '.avif'
  const dest = join(sortie, nom)
  const image = sharp(src).rotate() // applique l'orientation EXIF
  const meta = await image.metadata()

  const info = await image
    .resize({ width: Math.min(largeurMax, meta.width), withoutEnlargement: true })
    .avif({ quality: qualite, effort: 6, chromaSubsampling: '4:2:0' })
    .toFile(dest)

  const ko = Math.round(info.size / 1024)
  resultats.push({ nom, largeur: info.width, hauteur: info.height, ko })
  console.log(`  ${nom.padEnd(38)} ${String(info.width).padStart(5)}x${String(info.height).padEnd(5)} ${String(ko).padStart(5)} Ko`)
}

const total = resultats.reduce((s, r) => s + r.ko, 0)
console.log(`\nTotal : ${total} Ko\n`)

// Bloc prêt à coller dans src/data/galeries.js
if (process.argv.includes('--donnees')) {
  console.log('// à coller dans src/data/galeries.js')
  for (const r of resultats) {
    console.log(`    { src: '/assets/picture/.../${r.nom}', width: ${r.largeur}, height: ${r.hauteur}, alt: \`\` },`)
  }
}

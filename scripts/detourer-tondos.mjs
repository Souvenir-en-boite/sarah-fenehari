// Détoure les tondos (toiles rondes) photographiés sur fond clair.
//
//   node scripts/detourer-tondos.mjs <dossier ou fichiers> --sortie <dossier> [--taille 1280] [--qualite 60]
//
// Pour chaque image : on rogne le fond clair autour de la toile (trim), on
// recadre au carré sur la toile, puis on applique un masque circulaire à
// 98,5 % du diamètre — ce qui retire le fond photographié et l'ombre portée.
// Le résultat est un AVIF carré avec transparence : le site peut le poser sur
// n'importe quel fond, et le cercle est parfait quel que soit l'appareil qui
// a pris la photo.
//
// Les fichiers sont nommés d'après le nom du fichier source (sans extension),
// ou d'après `--noms <fichier.json>` : { "source.jpg": "composition-81" }.

import { readdir, stat, mkdir, readFile } from 'node:fs/promises'
import { join, basename, extname, resolve } from 'node:path'
import sharp from 'sharp'

const args = process.argv.slice(2)
const lire = (nom, defaut) => {
  const i = args.indexOf(nom)
  return i === -1 ? defaut : args[i + 1]
}
const sortie = lire('--sortie', null)
const taille = Number(lire("--taille", 1280))
const qualite = Number(lire('--qualite', 60))
const fichierNoms = lire('--noms', null)
const entrees = args.filter((a, i) => !a.startsWith('--') && !args[i - 1]?.startsWith('--'))

if (!sortie || entrees.length === 0) {
  console.error('Usage : node scripts/detourer-tondos.mjs <fichiers|dossier> --sortie <dossier> [--taille 1280] [--qualite 60] [--noms noms.json]')
  process.exit(1)
}

const noms = fichierNoms ? JSON.parse(await readFile(fichierNoms, 'utf8')) : {}
const EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.tif', '.tiff'])

async function lister(chemin) {
  if (!(await stat(chemin)).isDirectory()) return [chemin]
  return (await readdir(chemin))
    .filter((n) => EXT.has(extname(n).toLowerCase()))
    .sort()
    .map((n) => join(chemin, n))
}

const fichiers = (await Promise.all(entrees.map(lister))).flat()
await mkdir(resolve(sortie), { recursive: true })

const masque = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${taille}" height="${taille}">
     <circle cx="${taille / 2}" cy="${taille / 2}" r="${(taille / 2) * 0.965}" fill="#fff"/>
   </svg>`,
)

console.log(`\n${fichiers.length} tondo(s) — ${taille}px, qualité ${qualite}\n`)

for (const f of fichiers) {
  const nom = noms[basename(f)] ?? basename(f, extname(f))
  const cible = join(sortie, `${nom}.avif`)

  // 1. Rogner le fond clair. Le seuil est volontairement élevé : l'ombre
  //    portée sous la toile est grise, il faut qu'elle parte avec le fond.
  const rogne = await sharp(f).rotate().trim({ background: '#ffffff', threshold: 60 }).toBuffer({ resolveWithObject: true })
  const { width: w, height: h } = rogne.info

  // 2. Recadrer au carré, centré sur la toile.
  const cote = Math.min(w, h)
  const carre = await sharp(rogne.data)
    .extract({ left: Math.round((w - cote) / 2), top: Math.round((h - cote) / 2), width: cote, height: cote })
    .resize(taille, taille)
    .ensureAlpha()
    .toBuffer()

  // 3. Masque circulaire : `dest-in` ne garde de l'image que ce que couvre le cercle.
  const info = await sharp(carre)
    .composite([{ input: masque, blend: 'dest-in' }])
    .avif({ quality: qualite })
    .toFile(cible)

  console.log(`  ${basename(cible).padEnd(24)} ${String(Math.round(info.size / 1024)).padStart(4)} Ko   (toile ${w}x${h} dans la photo)`)
}
console.log()

// Extrait la couleur dominante et une petite palette de chaque image d'œuvre.
//
//   npm run couleurs
//
// Produit src/data/couleurs.json : { "/assets/picture/…avif": { dominante, palette } }.
// Le site s'en sert pour le halo derrière chaque tondo, le fond de la
// visionneuse, le champ de couleur de l'accueil et le spectre du pied de page.
// Tout est calculé ici, au build : rien n'est mesuré dans le navigateur.
//
// Méthode : l'image est réduite à 48 px, les pixels transparents, presque
// blancs, presque noirs ou gris sont écartés (ce qui reste, c'est la couleur
// de la toile, pas son centre blanc ni son fond noir), puis les couleurs sont
// regroupées par proximité et classées par fréquence.

import { readdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import sharp from 'sharp'

const DOSSIERS = ['public/assets/picture/composition', 'public/assets/picture/nft']
const SORTIE = 'src/data/couleurs.json'

const hex = ([r, g, b]) => '#' + [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, '0')).join('')

function hsl(r, g, b) {
  r /= 255; g /= 255; b /= 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  const l = (max + min) / 2
  const d = max - min
  const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1))
  return { s, l }
}

async function analyser(fichier) {
  const { data, info } = await sharp(fichier)
    .resize(48, 48, { fit: 'inside' })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  const groupes = new Map() // clé quantifiée -> { somme rgb, n }
  let total = 0
  for (let i = 0; i < data.length; i += info.channels) {
    const [r, g, b, a] = [data[i], data[i + 1], data[i + 2], data[i + 3]]
    if (a < 200) continue
    const { s, l } = hsl(r, g, b)
    if (l > 0.82 || l < 0.1 || s < 0.18) continue
    total++
    const cle = `${r >> 4}-${g >> 4}-${b >> 4}`
    const g0 = groupes.get(cle) ?? { r: 0, g: 0, b: 0, n: 0 }
    g0.r += r; g0.g += g; g0.b += b; g0.n++
    groupes.set(cle, g0)
  }

  // Classement par fréquence pondérée par la saturation : entre une large
  // zone terne et une zone vive un peu plus petite, c'est la vive qu'on
  // retient — c'est elle qu'on voit de l'autre côté de la pièce.
  const tri = [...groupes.values()]
    .map((g) => {
      const rgb = [g.r / g.n, g.g / g.n, g.b / g.n]
      return { rgb, n: g.n, score: g.n * (0.35 + hsl(...rgb).s) }
    })
    .sort((a, b) => b.score - a.score)

  // Palette : jusqu'à quatre couleurs suffisamment distinctes entre elles.
  const distance = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2])
  const palette = []
  for (const c of tri) {
    if (palette.every((p) => distance(p, c.rgb) > 70)) palette.push(c.rgb)
    if (palette.length === 4) break
  }
  if (palette.length === 0) palette.push([90, 90, 110]) // image entièrement grise : repli neutre

  return { dominante: hex(palette[0]), palette: palette.map(hex), couverture: total }
}

const resultat = {}
for (const dossier of DOSSIERS) {
  for (const nom of (await readdir(dossier)).filter((n) => n.endsWith('.avif')).sort()) {
    const chemin = '/' + join(dossier.replace(/^public\//, ''), nom)
    const { dominante, palette } = await analyser(join(dossier, nom))
    resultat[chemin] = { dominante, palette }
    console.log(`  ${nom.padEnd(24)} ${dominante}   ${palette.join(' ')}`)
  }
}
await writeFile(SORTIE, JSON.stringify(resultat, null, 2) + '\n')
console.log(`\n${Object.keys(resultat).length} images → ${SORTIE}\n`)

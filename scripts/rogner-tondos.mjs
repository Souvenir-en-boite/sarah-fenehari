// Resserre le masque des tondos déjà détourés quand un liseré de fond
// (blanc, gris, beige) dépasse encore sur le bord de la toile.
//
//   node scripts/rogner-tondos.mjs [--dossier public/assets/picture/composition] [--marge 3] [--seuil 165]
//                                   [--ignorer composition-51,...] [--seulement composition-43,...] [--simuler]
//
// Pour chaque AVIF : on part du bord du masque et on avance vers le centre
// le long de 360 rayons, en comptant les pixels clairs et peu saturés (le
// fond photographié, l'ombre, la tranche de la toile). Un liseré, c'est une
// plage fine (moins de 25 px) présente sur un arc d'au moins 10° ; une plage
// plus épaisse ou isolée, c'est de la peinture claire, on l'ignore. Si un
// liseré est trouvé, le cercle est réduit de sa profondeur maximale plus une
// marge, et l'image est réencodée. Sans liseré, rien n'est touché.
//
// `--simuler` mesure et affiche sans rien écrire. `--ignorer` exclut des
// fichiers (sans extension) : de la peinture blanche au ras du bord peut
// passer pour un liseré — c'est le cas de la Composition 51. `--seulement`
// ne traite que les fichiers cités. `--seuil` est la luminosité minimale
// d'un pixel de fond (165 : blanc et gris clair) ; le baisser attrape les
// tranches grises, comme celle de la Composition 43 (`--seuil 120`), mais
// confond alors de la peinture claire avec du fond sur d'autres toiles.
//
// Le script peut repasser sur une image déjà resserrée : il repart du bord
// réel de la toile (le premier pixel opaque), pas du masque d'origine.

import { readdir } from 'node:fs/promises'
import { join } from 'node:path'
import sharp from 'sharp'

const args = process.argv.slice(2)
const lire = (nom, defaut) => {
  const i = args.indexOf(nom)
  return i === -1 ? defaut : args[i + 1]
}
const dossier = lire('--dossier', 'public/assets/picture/composition')
const marge = Number(lire('--marge', 3))
const simuler = args.includes('--simuler')
const seuil = Number(lire('--seuil', 165))
const seulement = new Set(lire('--seulement', '').split(',').map((n) => n.trim()).filter(Boolean))
const ignorer = new Set(lire('--ignorer', 'composition-51').split(',').map((n) => n.trim()).filter(Boolean))
const qualite = 60

const LISERE_MAX = 25 // au-delà, c'est de la peinture claire, pas du fond
const ARC_MIN = 10 // degrés consécutifs pour qu'une plage compte comme liseré

const estClair = (r, g, b) => Math.min(r, g, b) > seuil && Math.max(r, g, b) - Math.min(r, g, b) < 34

/** Rayon réel de la toile : le premier pixel opaque en partant du bord, vers le bas. */
function rayonReel(px, taille) {
  const centre = taille / 2
  for (let r = centre - 1; r > 0; r--) if (px(centre, centre + r)[3] > 128) return r + 1
  return 0
}

/** Profondeur maximale du liseré de fond, en pixels, depuis le bord de la toile. */
function mesurer(data, taille) {
  const centre = taille / 2
  const px = (x, y) => {
    const i = (Math.round(y) * taille + Math.round(x)) * 4
    return [data[i], data[i + 1], data[i + 2], data[i + 3]]
  }
  const rayon = rayonReel(px, taille)
  // Profondeur par degré (0 quand la plage est trop épaisse pour être un liseré).
  const profondeurs = []
  for (let a = 0; a < 360; a += 1) {
    const rad = (a * Math.PI) / 180
    let d = 0
    let dansLaToile = false // on saute d'abord le bord anti-aliasé (pixels transparents)
    for (let r = rayon + 1; r > rayon - LISERE_MAX - 1; r--) {
      const [rr, gg, bb, aa] = px(centre + r * Math.cos(rad), centre + r * Math.sin(rad))
      if (!dansLaToile) {
        if (aa <= 128) continue
        dansLaToile = true
      }
      if (estClair(rr, gg, bb)) d++
      else break
    }
    profondeurs.push(d >= LISERE_MAX ? 0 : d)
  }
  // Ne garder que les arcs d'au moins ARC_MIN degrés consécutifs (le tableau est circulaire).
  let max = 0
  for (let debut = 0; debut < 360; debut++) {
    if (profondeurs[debut] === 0 || profondeurs[(debut + 359) % 360] !== 0) continue
    let longueur = 0
    let maxArc = 0
    while (longueur < 360 && profondeurs[(debut + longueur) % 360] > 0) {
      maxArc = Math.max(maxArc, profondeurs[(debut + longueur) % 360])
      longueur++
    }
    if (longueur >= ARC_MIN) max = Math.max(max, maxArc)
  }
  return { profondeur: max, rayon }
}

const fichiers = (await readdir(dossier))
  .filter((f) => f.endsWith('.avif'))
  .filter((f) => !ignorer.has(f.replace(/\.avif$/, '')))
  .filter((f) => seulement.size === 0 || seulement.has(f.replace(/\.avif$/, '')))
  .sort()
let corriges = 0
for (const f of fichiers) {
  const chemin = join(dossier, f)
  const { data, info } = await sharp(chemin).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  const taille = info.width
  const { profondeur, rayon: rayonActuel } = mesurer(data, taille)
  if (profondeur < 2) continue

  const rayon = rayonActuel - profondeur - marge
  console.log(`  ${f.padEnd(24)} liseré ${String(profondeur).padStart(3)} px → rayon ${rayon.toFixed(1)} px (${((rayon / (taille / 2)) * 100).toFixed(1)} %)${simuler ? '' : '  ✓'}`)
  corriges++
  if (simuler) continue

  const masque = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${taille}" height="${taille}">
       <circle cx="${taille / 2}" cy="${taille / 2}" r="${rayon}" fill="#fff"/>
     </svg>`,
  )
  const sortie = await sharp(data, { raw: { width: taille, height: taille, channels: 4 } })
    .composite([{ input: masque, blend: 'dest-in' }])
    .avif({ quality: qualite })
    .toBuffer()
  await sharp(sortie).toFile(chemin)
}
console.log(`\n${corriges} tondo(s) ${simuler ? 'à corriger' : 'corrigé(s)'} sur ${fichiers.length}\n`)

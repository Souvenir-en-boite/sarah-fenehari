// Génère les images d'aperçu de partage (Facebook, Messenger, WhatsApp,
// LinkedIn, iMessage) : des JPEG 1200x630 dans public/assets/partage/, en
// miroir de public/assets/picture/.
//
//   npm run images-partage
//
// Ces réseaux ne lisent pas l'AVIF et attendent un cadrage paysage : on pose
// donc chaque tondo au centre d'un fond papier, et on produit en plus une
// image par défaut (plusieurs tondos alignés) pour l'accueil et la galerie.

import { mkdir } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import sharp from 'sharp'
import { series } from '../src/data/series.js'
import { portrait, visuelNft, oeuvresEchelleAccueil } from '../src/data/site.js'

const L = 1200, H = 630
const PAPIER = '#f5f2ec'
const SOURCE = 'public/assets/picture'
const CIBLE = 'public/assets/partage'

const versCible = (src) => join(CIBLE, src.replace('/assets/picture/', '').replace(/\.avif$/, '.jpg'))
const fond = () => sharp({ create: { width: L, height: H, channels: 3, background: PAPIER } })
const ecrire = async (pipeline, cible) => {
  await mkdir(dirname(cible), { recursive: true })
  const info = await pipeline.jpeg({ quality: 82, mozjpeg: true }).toFile(cible)
  console.log(`  ${cible.replace('public', '').padEnd(52)} ${String(Math.round(info.size / 1024)).padStart(4)} Ko`)
}

console.log(`\nImages de partage — ${L}x${H}, JPEG\n`)

// Un tondo centré, avec une marge.
async function tondoCentre(src) {
  const diametre = 560
  const image = await sharp(join(SOURCE, src.replace('/assets/picture/', ''))).resize(diametre, diametre).png().toBuffer()
  await ecrire(fond().composite([{ input: image, left: Math.round((L - diametre) / 2), top: Math.round((H - diametre) / 2) }]), versCible(src))
}

for (const serie of series) for (const o of serie.oeuvres) await tondoCentre(o.src)
await tondoCentre(visuelNft.src)

// Portrait : recadré en paysage, ancré en haut pour garder le visage.
await ecrire(
  sharp(join(SOURCE, portrait.src.replace('/assets/picture/', ''))).resize(L, H, { fit: 'cover', position: sharp.gravity.north }),
  versCible(portrait.src),
)

// Image par défaut : les tondos de l'accueil, à l'échelle, sur une ligne.
{
  const oeuvres = oeuvresEchelleAccueil.map((n) => series[0].oeuvres.find((o) => o.numero === n))
  const pxParCm = 3.6
  const ecart = 36
  const largeurTotale = oeuvres.reduce((s, o) => s + o.cm * pxParCm, 0) + ecart * (oeuvres.length - 1)
  let x = Math.round((L - largeurTotale) / 2)
  const calques = []
  for (const o of oeuvres) {
    const d = Math.round(o.cm * pxParCm)
    calques.push({
      input: await sharp(join(SOURCE, o.src.replace('/assets/picture/', ''))).resize(d, d).png().toBuffer(),
      left: x,
      top: Math.round((H - d) / 2),
    })
    x += d + ecart
  }
  await ecrire(fond().composite(calques), join(CIBLE, 'defaut.jpg'))
}
console.log()

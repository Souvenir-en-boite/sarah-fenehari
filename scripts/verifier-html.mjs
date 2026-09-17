// Contrôle du HTML réellement généré : structure, accessibilité de base,
// bilingue, aperçus de partage et données structurées.
//   npm run build && npm run verifier
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { JSDOM } from 'jsdom'
import sharp from 'sharp'

const html = []
;(function walk(d) {
  for (const e of readdirSync(d)) {
    const p = join(d, e)
    if (statSync(p).isDirectory()) walk(p)
    else if (e.endsWith('.html')) html.push(p)
  }
})('dist')

let echecs = 0
const aVerifier = []
const apercus = []
const ko = (f, m) => { console.log('  ✗ ' + f.replace('dist', '') + ' — ' + m); echecs++ }
const ignorer = (f) => f === 'dist/404.html'

for (const f of html.sort()) {
  if (ignorer(f)) continue
  const doc = new JSDOM(readFileSync(f, 'utf8')).window.document
  const chemin = f.replace(/^dist/, '').replace(/\/index\.html$/, '') || '/'
  const anglais = chemin === '/en' || chemin.startsWith('/en/')

  // Langue déclarée cohérente avec l'adresse.
  const langAttendue = anglais ? 'en' : 'fr'
  if (doc.documentElement.lang !== langAttendue) ko(f, `lang="${doc.documentElement.lang}" (attendu : ${langAttendue})`)

  const titres = doc.querySelectorAll('title').length
  if (titres !== 1) ko(f, titres + ' balises <title>')

  const h1 = doc.querySelectorAll('h1')
  if (h1.length !== 1) ko(f, h1.length + ' <h1> (attendu : 1)')

  const texte = doc.querySelector('#root')?.textContent.trim() ?? ''
  if (texte.length < 400) ko(f, 'contenu pré-rendu trop court (' + texte.length + ' caractères)')

  if (!doc.querySelector('link[rel="canonical"]')) ko(f, 'canonical absente')

  // Bilingue : chaque page indexable annonce ses deux versions et x-default.
  const noindex = /noindex/.test(doc.querySelector('meta[name="robots"]')?.getAttribute('content') ?? '')
  if (!noindex && chemin !== '/404') {
    for (const l of ['fr', 'en', 'x-default']) {
      if (!doc.querySelector(`link[rel="alternate"][hreflang="${l}"]`)) ko(f, `hreflang ${l} absente`)
    }
  }

  for (const img of doc.querySelectorAll('img')) {
    const src = img.getAttribute('src') || ''
    const nom = src.split('/').pop()
    if (img.getAttribute('alt') === null) ko(f, 'img sans alt : ' + nom)
    const l = img.getAttribute('width')
    const h = img.getAttribute('height')
    if (!l || !h) ko(f, 'img sans width/height : ' + nom)
    else if (src.startsWith('/assets')) aVerifier.push({ f, nom, chemin: src, l: +l, h: +h })
  }

  // Aperçu de partage : Facebook, Messenger, WhatsApp et LinkedIn ne lisent
  // pas l'AVIF, on exige un JPEG/PNG aux dimensions déclarées.
  const og = (n) => doc.querySelector(`meta[property="og:${n}"]`)?.getAttribute('content') || ''
  for (const n of ['title', 'description', 'url', 'image', 'locale']) {
    if (!og(n)) ko(f, 'og:' + n + ' absente ou vide')
  }
  const apercu = og('image')
  if (apercu && !apercu.startsWith('http')) ko(f, 'og:image doit être une adresse absolue : ' + apercu)
  else if (apercu) apercus.push({ f, chemin: new URL(apercu).pathname, l: +og('image:width'), h: +og('image:height'), alt: og('image:alt') })

  for (const s of doc.querySelectorAll('script[type="application/ld+json"]')) {
    try { JSON.parse(s.textContent) } catch { ko(f, 'JSON-LD invalide') }
  }

  for (const a of doc.querySelectorAll('a')) {
    const nom = (a.textContent || '').trim() || a.getAttribute('aria-label') || ''
    if (!nom) ko(f, 'lien sans intitulé : ' + (a.getAttribute('href') || '?'))
  }
  for (const b of doc.querySelectorAll('button')) {
    const nom = (b.textContent || '').trim() || b.getAttribute('aria-label') || ''
    if (!nom) ko(f, 'bouton sans intitulé')
  }

  let precedent = 1
  for (const t of doc.querySelectorAll('h1,h2,h3,h4')) {
    const n = +t.tagName[1]
    if (n > precedent + 1) ko(f, 'saut h' + precedent + ' -> h' + n + ' ("' + t.textContent.trim().slice(0, 32) + '")')
    precedent = n
  }
}

// Dimensions déclarées contre dimensions réelles.
const tailles = new Map()
for (const { f, nom, chemin, l, h } of aVerifier) {
  if (!tailles.has(chemin)) {
    try { const m = await sharp('public' + chemin).metadata(); tailles.set(chemin, [m.width, m.height]) }
    catch { tailles.set(chemin, null) }
  }
  const reel = tailles.get(chemin)
  if (!reel) { ko(f, 'image introuvable dans public/ : ' + nom); continue }
  if (reel[0] !== l || reel[1] !== h) ko(f, `dimensions déclarées ${l}x${h} mais fichier ${reel[0]}x${reel[1]} : ${nom}`)
}

// Images d'aperçu de partage (npm run images-partage pour les régénérer).
const partages = new Map()
for (const { f, chemin, l, h, alt } of apercus) {
  if (!partages.has(chemin)) {
    try { partages.set(chemin, await sharp('public' + chemin).metadata()) } catch { partages.set(chemin, null) }
  }
  const m = partages.get(chemin)
  if (!m) { ko(f, 'og:image introuvable dans public/ : ' + chemin); continue }
  if (m.format !== 'jpeg' && m.format !== 'png') ko(f, `og:image en ${m.format} : illisible par Facebook et Messenger (${chemin})`)
  if (!l || !h) ko(f, 'og:image:width / og:image:height absentes')
  else if (m.width !== l || m.height !== h) ko(f, `og:image annoncée ${l}x${h} mais fichier ${m.width}x${m.height} : ${chemin}`)
  if (!alt) ko(f, 'og:image:alt absente : ' + chemin)
}

// Chaque œuvre doit avoir sa couleur extraite (npm run couleurs).
const couleurs = JSON.parse(readFileSync('src/data/couleurs.json', 'utf8'))
for (const chemin of tailles.keys()) {
  if (chemin.includes('/composition/') && !couleurs[chemin]) ko('dist', 'couleur non extraite : ' + chemin)
}

// AVIF en grille de tuiles (produits par `sips`) : Chrome les affiche vides.
const avif = []
;(function walk(d) {
  for (const e of readdirSync(d)) {
    const p = join(d, e)
    if (statSync(p).isDirectory()) walk(p)
    else if (e.endsWith('.avif')) avif.push(p)
  }
})('public/assets')
for (const f of avif) {
  if (readFileSync(f).subarray(0, 4096).includes(Buffer.from('grid'))) { console.log('  ✗ ' + f + ' — AVIF en grille de tuiles'); echecs++ }
}

console.log(
  '\n' + html.length + ' fichiers HTML, ' + tailles.size + ' images vérifiées, ' + partages.size + ' aperçus de partage, ' + avif.length + ' AVIF — ' +
  (echecs === 0 ? 'aucun problème détecté ✓' : echecs + ' problème(s)'),
)
process.exit(echecs === 0 ? 0 : 1)

// Exécuté après `vite-react-ssg build`. Produit ce qu'un site statique doit
// servir en plus du HTML : plan du site bilingue, robots.txt, redirections et
// page 404 à la racine.

import { writeFile, mkdir, copyFile, access } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { site } from '../src/data/site.js'
import { series } from '../src/data/series.js'
import { langues, slugs, pagesNonIndexees, chemin } from '../src/i18n/routes.js'

const racine = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(racine, 'dist')

// Pages indexables, avec leurs priorités. Les pages `noindex` (merci, légal)
// et la 404 en sont exclues.
const priorites = { accueil: '1.0', galerie: '0.9', biographie: '0.8', nft: '0.6', contact: '0.7' }
const frequences = { accueil: 'monthly', galerie: 'monthly', biographie: 'yearly', nft: 'yearly', contact: 'yearly' }

// Une entrée par page ET par langue, chacune déclarant ses équivalents
// (xhtml:link) : c'est ainsi que Google relie les deux versions.
const entrees = []
for (const cle of Object.keys(slugs)) {
  if (pagesNonIndexees.includes(cle)) continue
  const suffixes = cle === 'galerie' ? [undefined, ...series.map((s) => s.cle)] : [undefined]
  for (const suffixe of suffixes) {
    for (const langue of langues) {
      entrees.push({
        chemin: chemin(cle, langue, suffixe),
        priorite: suffixe ? '0.8' : priorites[cle],
        frequence: frequences[cle],
        alternates: langues.map((l) => [l, chemin(cle, l, suffixe)]),
      })
    }
  }
}

// Anciennes adresses à rediriger (aucune pour l'instant : le site Wix est sur
// un autre domaine). Format : { '/ancienne': '/nouvelle' }.
const redirections = {}

const existe = async (p) => access(p).then(() => true, () => false)

async function ecrire(cheminRelatif, contenu) {
  const complet = join(dist, cheminRelatif)
  await mkdir(dirname(complet), { recursive: true })
  await writeFile(complet, contenu, 'utf8')
}

const absolu = (c) => `${site.url}${c === '/' ? '/' : c}`

async function genererSitemap() {
  const date = new Date().toISOString().slice(0, 10)
  const urls = entrees
    .map(({ chemin: c, priorite, frequence, alternates }) => {
      const liens = [
        ...alternates.map(([l, a]) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${absolu(a)}"/>`),
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${absolu(alternates[0][1])}"/>`,
      ].join('\n')
      return `  <url>
    <loc>${absolu(c)}</loc>
${liens}
    <lastmod>${date}</lastmod>
    <changefreq>${frequence}</changefreq>
    <priority>${priorite}</priority>
  </url>`
    })
    .join('\n')

  await ecrire(
    'sitemap.xml',
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`,
  )
  return entrees.length
}

async function genererRobots() {
  await ecrire('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`)
}

async function genererRedirections() {
  const regles = Object.entries(redirections).map(([de, vers]) => `${de}  ${vers}  301`)
  // Fichier compris par Netlify et Cloudflare Pages ; Vercel lit vercel.json.
  await ecrire('_redirects', `${regles.join('\n')}${regles.length ? '\n' : ''}/*  /404.html  404\n`)
  for (const [de, vers] of Object.entries(redirections)) {
    await ecrire(
      join(de.slice(1), 'index.html'),
      `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <title>Page déplacée</title>
    <link rel="canonical" href="${absolu(vers)}" />
    <meta name="robots" content="noindex, follow" />
    <meta http-equiv="refresh" content="0; url=${vers}" />
  </head>
  <body><p>Cette page a été déplacée : <a href="${vers}">${absolu(vers)}</a></p></body>
</html>
`,
    )
  }
  return regles.length
}

async function genererPage404() {
  const source = join(dist, '404', 'index.html')
  if (await existe(source)) {
    await copyFile(source, join(dist, '404.html'))
    return true
  }
  console.warn('  ⚠️  dist/404/index.html introuvable : /404.html non généré')
  return false
}

const nbPages = await genererSitemap()
await genererRobots()
const nbRedirections = await genererRedirections()
const ok404 = await genererPage404()
console.log(`\n[post-build] sitemap.xml (${nbPages} adresses) · robots.txt · ${nbRedirections} redirection(s) · 404.html ${ok404 ? '✓' : '✗'}`)

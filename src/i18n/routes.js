// Adresses des pages dans les deux langues.
//
// Le français est servi à la racine (`/galerie`), l'anglais sous `/en`
// (`/en/gallery`). Ce fichier est le seul endroit où les adresses sont
// écrites : le routeur, le menu, le sélecteur de langue, les balises
// hreflang et le plan du site s'appuient tous dessus.
//
// Fichier en JavaScript pur (pas de JSX) : il est aussi lu par
// scripts/generate-sitemap.mjs, en dehors de Vite.

export const langues = ['fr', 'en']
export const langueParDefaut = 'fr'

export const slugs = {
  accueil: { fr: '', en: '' },
  galerie: { fr: 'galerie', en: 'gallery' },
  biographie: { fr: 'biographie', en: 'biography' },
  nft: { fr: 'nft', en: 'nft' },
  contact: { fr: 'contact', en: 'contact' },
  merci: { fr: 'merci', en: 'thank-you' },
  mentionsLegales: { fr: 'mentions-legales', en: 'legal-notice' },
  confidentialite: { fr: 'politique-de-confidentialite', en: 'privacy-policy' },
}

// Pages absentes du plan du site et marquées `noindex` : sans intérêt dans
// les résultats de recherche.
export const pagesNonIndexees = ['merci', 'mentionsLegales', 'confidentialite']

export function prefixe(langue) {
  return langue === langueParDefaut ? '' : `/${langue}`
}

/**
 * Adresse d'une page. `suffixe` sert aux sous-pages (une série de la galerie).
 *
 *   chemin('galerie', 'fr')                 -> '/galerie'
 *   chemin('galerie', 'en', 'composition')  -> '/en/gallery/composition'
 *   chemin('accueil', 'en')                 -> '/en'
 */
export function chemin(cle, langue, suffixe) {
  const slug = slugs[cle]?.[langue]
  if (slug === undefined) throw new Error(`Page inconnue : ${cle}`)
  const morceaux = [prefixe(langue), slug, suffixe].filter(Boolean)
  return morceaux.length ? `/${morceaux.join('/').replace(/^\/+/, '')}` : '/'
}

/**
 * Retrouve la page correspondant à une adresse : { langue, cle, suffixe }.
 * Renvoie `null` pour une adresse inconnue. Sert au sélecteur de langue,
 * qui doit pointer vers la MÊME page dans l'autre langue.
 */
export function resoudre(pathname) {
  const propre = pathname.replace(/\/+$/, '') || '/'
  for (const langue of langues) {
    for (const cle of Object.keys(slugs)) {
      const base = chemin(cle, langue)
      if (propre === base) return { langue, cle, suffixe: undefined }
      if (base !== '/' && propre.startsWith(`${base}/`)) {
        return { langue, cle, suffixe: propre.slice(base.length + 1) }
      }
    }
  }
  return null
}

/** Langue d'une adresse, même inconnue (page 404 sous /en, par exemple). */
export function langueDe(pathname) {
  return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'fr'
}

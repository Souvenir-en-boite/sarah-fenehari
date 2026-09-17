import { Head } from 'vite-react-ssg'
import { site } from '../data/site'
import { textes } from '../i18n/textes'
import { langues, chemin } from '../i18n/routes'

const IMAGE_PAR_DEFAUT = '/assets/partage/defaut.jpg'

/**
 * Traduit une image du site en son aperçu de partage : les réseaux ne lisent
 * pas l'AVIF et attendent un cadrage paysage. `scripts/generer-images-partage.mjs`
 * produit un JPEG 1200x630 dans /assets/partage/ en miroir de /assets/picture/.
 */
export function versImagePartage(src) {
  if (!src.startsWith('/assets/picture/')) return src
  return src.replace('/assets/picture/', '/assets/partage/').replace(/\.avif$/, '.jpg')
}

/**
 * Métadonnées d'une page. Le rendu est pré-généré au build : ces balises sont
 * réellement dans le HTML servi, lisibles par les moteurs de recherche et les
 * aperçus de partage sans exécuter JavaScript.
 *
 * `cle` + `suffixe` identifient la page dans src/i18n/routes.js : c'est ainsi
 * qu'on calcule la canonique et les équivalents dans l'autre langue (hreflang).
 */
export function Seo({ langue, cle, suffixe, titre, description, image = IMAGE_PAR_DEFAUT, imageAlt, type = 'website', noindex = false, children }) {
  const t = textes[langue]
  const baseline = site.baseline[langue]
  const titreComplet = cle === 'accueil' && !suffixe ? `${site.nom} — ${baseline}` : `${titre} · ${site.nom}`
  const cheminPage = chemin(cle, langue, suffixe)
  const url = `${site.url}${cheminPage === '/' ? '/' : cheminPage}`
  const imageAbsolue = image.startsWith('http') ? image : `${site.url}${versImagePartage(image)}`
  const altImage = imageAlt ?? `${site.nom} — ${baseline}`

  return (
    <Head>
      <html lang={langue} />
      <title>{titreComplet}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, follow" />}

      {!noindex && langues.map((l) => {
        const c = chemin(cle, l, suffixe)
        return <link key={l} rel="alternate" hrefLang={l} href={`${site.url}${c === '/' ? '/' : c}`} />
      })}
      {!noindex && <link rel="alternate" hrefLang="x-default" href={`${site.url}${chemin(cle, 'fr', suffixe) === '/' ? '/' : chemin(cle, 'fr', suffixe)}`} />}

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={site.nom} />
      <meta property="og:locale" content={t.locale} />
      <meta property="og:locale:alternate" content={textes[t.autreLangue.code].locale} />
      <meta property="og:title" content={titreComplet} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imageAbsolue} />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={altImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={titreComplet} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageAbsolue} />
      <meta name="twitter:image:alt" content={altImage} />

      {children}
    </Head>
  )
}

/** Données structurées : la fiche de l'artiste pour Google. */
export function DonneesStructurees({ langue }) {
  const donnees = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.nom,
    givenName: site.prenom,
    familyName: site.nomDeFamille,
    jobTitle: langue === 'fr' ? 'Artiste peintre' : 'Painter',
    description: site.baseline[langue],
    url: site.url,
    image: `${site.url}/assets/partage/biographie/portrait.jpg`,
    email: site.email,
    birthPlace: { '@type': 'Place', name: 'Villeneuve-Saint-Georges, France' },
    homeLocation: { '@type': 'Place', name: 'Île-de-France, France' },
    alumniOf: [
      { '@type': 'CollegeOrUniversity', name: 'Université Paris 1 Panthéon-Sorbonne' },
      { '@type': 'CollegeOrUniversity', name: 'ESPE de Paris' },
    ],
    sameAs: Object.values(site.reseaux),
  }
  return (
    <Head>
      <script type="application/ld+json">{JSON.stringify(donnees)}</script>
    </Head>
  )
}

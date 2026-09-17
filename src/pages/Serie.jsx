import { Head } from 'vite-react-ssg'
import { Seo } from '../components/Seo'
import { Container, TitreSection } from '../components/ui'
import { Galerie, techniqueDe } from '../components/Galerie'
import { serieParCle, periode } from '../data/series'
import { site } from '../data/site'
import { textes } from '../i18n/textes'
import { chemin } from '../i18n/routes'

/** Page /galerie/<serie> : les œuvres d'une série. */
export default function Serie({ langue, cle }) {
  const t = textes[langue]
  const serie = serieParCle(cle)
  const couverture = serie.oeuvres[0]

  // Chaque toile déclarée comme œuvre d'art : Google peut alors afficher les
  // images avec leur titre, leur année et leur auteure.
  const donnees = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${serie.titre[langue]} — ${site.nom}`,
    numberOfItems: serie.oeuvres.length,
    itemListElement: serie.oeuvres.map((o, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'VisualArtwork',
        name: o.titre,
        creator: { '@type': 'Person', name: site.nom },
        dateCreated: String(o.annee),
        artform: langue === 'fr' ? 'Peinture' : 'Painting',
        artMedium: techniqueDe(o, langue),
        width: { '@type': 'Distance', name: `${o.cm} cm` },
        height: { '@type': 'Distance', name: `${o.cm} cm` },
        image: `${site.url}${o.src}`,
      },
    })),
  }

  return (
    <>
      <Seo
        langue={langue}
        cle="galerie"
        suffixe={cle}
        titre={serie.titre[langue]}
        description={`${serie.description[langue]} ${t.galerie.oeuvres(serie.oeuvres.length)}, ${periode(serie)}.`}
        image={couverture.src}
        imageAlt={couverture.alt[langue]}
      />
      <Head>
        <script type="application/ld+json">{JSON.stringify(donnees)}</script>
      </Head>
      <Container className="py-16 lg:py-24">
        <nav aria-label={langue === 'fr' ? 'Fil d’Ariane' : 'Breadcrumb'} className="eyebrow text-ink-soft">
          <a href={chemin('galerie', langue)} className="hover:text-ink">{t.galerie.titre}</a>
          <span aria-hidden="true"> · </span>
          <span aria-current="page">{serie.titre[langue]}</span>
        </nav>
        <div className="mt-6 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <h1 className="titre-oeuvre text-6xl sm:text-7xl lg:text-8xl">{serie.titre[langue]}</h1>
            <p className="mt-4 text-sm text-ink-soft">{serie.format[langue]} · {periode(serie)}</p>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">{serie.description[langue]}</p>
          </div>
        </div>
        <div className="mt-14">
          <Galerie oeuvres={serie.oeuvres} />
        </div>
      </Container>
    </>
  )
}

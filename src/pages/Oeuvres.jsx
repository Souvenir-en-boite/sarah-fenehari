import { Seo } from '../components/Seo'
import { Container, TitreSection } from '../components/ui'
import { Galerie } from '../components/Galerie'
import { series, periode } from '../data/series'
import { textes } from '../i18n/textes'

/** Page /galerie : toutes les œuvres, filtrables. */
export default function Oeuvres({ langue }) {
  const t = textes[langue]
  const oeuvres = series.flatMap((s) => s.oeuvres)
  const serie = series[0]
  return (
    <>
      <Seo langue={langue} cle="galerie" titre={t.galerie.titre} description={t.galerie.metaDescription} image={oeuvres[0].src} imageAlt={oeuvres[0].alt[langue]} />
      <Container className="py-14 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <TitreSection niveau={1} eyebrow={t.galerie.eyebrow} titre={t.galerie.titre} />
            <p className="mt-4 text-xs text-ink-soft">{serie.titre[langue]} · {serie.format[langue]} · {periode(serie)}</p>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-ink-soft lg:col-span-4 lg:col-start-9 lg:pb-2">{t.galerie.chapo}</p>
        </div>
        <div className="mt-12">
          <Galerie oeuvres={oeuvres} />
        </div>
      </Container>
    </>
  )
}

import { ArrowRight } from 'lucide-react'
import { Seo } from '../components/Seo'
import { Container, Bouton, TitreSection } from '../components/ui'
import { Tondo } from '../components/Tondo'
import { series, periode } from '../data/series'
import { textes } from '../i18n/textes'
import { chemin } from '../i18n/routes'

/** Page /galerie : la liste des séries. */
export default function Oeuvres({ langue }) {
  const t = textes[langue]
  return (
    <>
      <Seo langue={langue} cle="galerie" titre={t.galerie.titre} description={t.galerie.metaDescription} />
      <Container className="py-16 lg:py-24">
        <TitreSection niveau={1} eyebrow={t.galerie.eyebrow} titre={t.galerie.titre} description={t.galerie.chapo} />

        <ul className="mt-20 flex flex-col gap-24">
          {series.map((s) => {
            const apercus = s.oeuvres.slice(0, 3)
            return (
              <li key={s.cle} className="grid items-center gap-12 lg:grid-cols-12">
                {/* Trois toiles qui se chevauchent : la série en un coup d'œil.
                    36 + 44 + 36 − 2×8 de chevauchement = 100 % : rien ne déborde. */}
                <div className="relative mx-auto flex w-full max-w-md items-center justify-center lg:col-span-6 lg:max-w-none">
                  {apercus.map((o, i) => (
                    <Tondo
                      key={o.src}
                      oeuvre={o}
                      langue={langue}
                      priorite
                      className={`w-[36%] shrink-0 ${i === 1 ? 'z-10 -mx-[8%] w-[44%]' : ''}`}
                      sizes="(min-width: 1024px) 24rem, 45vw"
                    />
                  ))}
                </div>
                <div className="lg:col-span-5 lg:col-start-8">
                  <p className="eyebrow text-ink-soft">{t.galerie.serie} · {t.galerie.oeuvres(s.oeuvres.length)} · {periode(s)}</p>
                  <h2 className="titre-oeuvre mt-4 text-5xl sm:text-6xl">{s.titre[langue]}</h2>
                  <p className="mt-3 text-sm text-ink-soft">{s.format[langue]}</p>
                  <p className="mt-6 text-lg leading-relaxed text-ink-soft">{s.description[langue]}</p>
                  <Bouton to={chemin('galerie', langue, s.cle)} className="mt-8">
                    {t.boutons.voirSerie}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Bouton>
                </div>
              </li>
            )
          })}
        </ul>
      </Container>
    </>
  )
}

import { ArrowRight } from 'lucide-react'
import { Seo, DonneesStructurees } from '../components/Seo'
import { Container, Bouton, Eyebrow, TitreSection } from '../components/ui'
import { Tondo, paletteDe } from '../components/Tondo'
import { useApparition } from '../components/useApparition'
import { series, periode } from '../data/series'
import { biographie, expositions } from '../data/biographie'
import { oeuvreAccueil, oeuvresEchelleAccueil, portrait, visuelNft, site } from '../data/site'
import { textes } from '../i18n/textes'
import { chemin } from '../i18n/routes'

export default function Accueil({ langue }) {
  const t = textes[langue]
  const serie = series[0]
  const hero = serie.oeuvres.find((o) => o.numero === oeuvreAccueil)
  const echelle = oeuvresEchelleAccueil.map((n) => serie.oeuvres.find((o) => o.numero === n))
  const bio = biographie[langue]
  const palette = paletteDe(hero.src)
  useApparition()

  return (
    <>
      <Seo langue={langue} cle="accueil" description={t.accueil.metaDescription} imageAlt={t.accueil.accroche} />
      <DonneesStructurees langue={langue} />

      {/* ——— Ouverture : le nom, une phrase, et une toile qui tourne lentement. */}
      <section className="relative overflow-hidden">
        <Container className="grid min-h-[calc(100svh-4.5rem)] items-center gap-12 py-16 lg:grid-cols-12 lg:gap-8 lg:py-10">
          <div className="lg:col-span-6">
            <Eyebrow>{t.accueil.eyebrow}</Eyebrow>
            <h1 className="mt-6 text-6xl sm:text-7xl lg:text-[6.5rem]">{t.accueil.titre}</h1>
            <p className="titre-oeuvre mt-8 max-w-xl text-2xl text-ink sm:text-3xl">{t.accueil.accroche}</p>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">{t.accueil.texte}</p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Bouton to={chemin('galerie', langue, serie.cle)}>
                {t.boutons.voirOeuvres}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Bouton>
              <Bouton to={chemin('biographie', langue)} variante="contour">{t.boutons.lireBiographie}</Bouton>
            </div>
          </div>

          <figure className="relative mx-auto w-full max-w-[26rem] lg:col-span-6 lg:max-w-none lg:translate-x-[10%]">
            <Tondo oeuvre={hero} langue={langue} priorite tourne className="mx-auto w-full lg:max-w-[44rem]" sizes="(min-width: 1024px) 44rem, 90vw" />
            <figcaption className="mt-6 text-center text-sm text-ink-soft lg:text-left lg:pl-12">{t.accueil.legendeHero(hero)}</figcaption>
          </figure>
        </Container>
      </section>

      {/* ——— La série, à l'échelle réelle. */}
      <section className="apparait py-24 lg:py-32">
        <Container>
          <TitreSection eyebrow={t.accueil.serieEyebrow} titre={t.accueil.serieTitre(serie.oeuvres.length, periode(serie))} description={t.accueil.serieTexte} />
          <ul
            className="mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-10 lg:justify-between lg:gap-x-4"
            style={{ '--px-par-cm': 'clamp(1.5px, 0.3vw, 3.2px)' }}
            aria-label={t.accueil.echelleLegende}
          >
            {echelle.map((o) => (
              <li key={o.src} className="flex flex-col items-center" style={{ width: `calc(${o.cm} * var(--px-par-cm))` }}>
                <Tondo oeuvre={o} langue={langue} sizes="(min-width: 1024px) 320px, 40vw" />
                <span className="mt-4 whitespace-nowrap text-xs text-ink-soft">{o.numero} · {o.cm} cm</span>
              </li>
            ))}
          </ul>
          <div className="mt-16 flex justify-center">
            <Bouton to={chemin('galerie', langue, serie.cle)} variante="contour">
              {t.boutons.voirSerie}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Bouton>
          </div>
        </Container>
      </section>

      {/* ——— La citation de Maurice Denis, sur un champ de couleur tiré de la toile d'ouverture. */}
      <section className="relative isolate overflow-hidden py-28 lg:py-40">
        <div
          aria-hidden="true"
          className="champ-de-couleur absolute inset-0 -z-10 opacity-[0.28]"
          style={{ '--c1': palette[0], '--c2': palette[1] ?? palette[0], '--c3': palette[2] ?? palette[0], '--c4': palette[3] ?? palette[1] ?? palette[0] }}
        />
        <div aria-hidden="true" className="grain -z-10" />
        <Container>
          <blockquote className="apparait mx-auto max-w-4xl text-center">
            <p className="font-display text-3xl leading-[1.2] text-ink sm:text-4xl lg:text-5xl" style={{ fontVariationSettings: '"opsz" 96, "SOFT" 100' }}>
              « {bio.citation.texte} »
            </p>
            <footer className="mt-8 text-sm text-ink-soft">— {bio.citation.auteur}</footer>
          </blockquote>
        </Container>
      </section>

      {/* ——— La démarche, en deux paragraphes, avec le portrait en rond. */}
      <section className="apparait py-24 lg:py-32">
        <Container className="grid items-center gap-12 lg:grid-cols-12">
          <div className="mx-auto w-56 sm:w-64 lg:col-span-4 lg:w-full lg:max-w-[22rem]">
            <img
              src={portrait.src}
              alt={portrait.alt[langue]}
              width={portrait.width}
              height={portrait.height}
              loading="lazy"
              decoding="async"
              className="aspect-square w-full rounded-full object-cover object-top"
            />
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <TitreSection eyebrow={t.accueil.demarcheEyebrow} titre={t.accueil.demarcheTitre} />
            <div className="prose-site mt-8">
              <p>{bio.demarche[0]}</p>
              <p>{bio.demarche[1]}</p>
            </div>
            <Bouton to={chemin('biographie', langue)} variante="lien" className="mt-8">
              {t.boutons.lireBiographie}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Bouton>
          </div>
        </Container>
      </section>

      {/* ——— Dernières expositions. */}
      <section className="apparait border-t border-line py-24 lg:py-32">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <TitreSection eyebrow={t.accueil.expositionsEyebrow} titre={t.accueil.expositionsTitre} />
            <Bouton to={`${chemin('biographie', langue)}#expositions`} variante="lien" className="mt-8">
              {t.boutons.toutesExpositions}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Bouton>
          </div>
          <ol className="divide-y divide-line lg:col-span-7 lg:col-start-6">
            {expositions.slice(0, 5).map((e, i) => (
              <li key={i} className="grid grid-cols-[5.5rem_1fr] items-baseline gap-4 py-5">
                <span className="font-display text-2xl text-ink">{e.annee}</span>
                <span className="text-ink-soft">{e[langue]}</span>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* ——— NFT : bande sombre. */}
      <section className="apparait bg-night py-24 text-paper lg:py-32">
        <Container className="grid items-center gap-12 lg:grid-cols-12">
          <div className="mx-auto w-56 sm:w-72 lg:col-span-4 lg:w-full lg:max-w-[20rem]">
            <Tondo oeuvre={visuelNft} langue={langue} tourne sizes="20rem" />
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <Eyebrow className="text-paper/60">{t.accueil.nftEyebrow}</Eyebrow>
            <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl">{t.accueil.nftTitre}</h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper/75">{langue === 'fr' ? 'Une sélection de compositions est disponible sur OpenSea.' : 'A selection of compositions is available on OpenSea.'}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Bouton href={site.reseaux.opensea} target="_blank" rel="noopener noreferrer" variante="contourClair">
                {t.boutons.voirOpenSea}
                <span className="sr-only"> {t.nav.nouvelleFenetre}</span>
              </Bouton>
              <Bouton to={chemin('nft', langue)} variante="lien" className="text-paper decoration-paper/30 hover:decoration-paper">
                {t.nav.nft}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Bouton>
            </div>
          </div>
        </Container>
      </section>

      {/* ——— Contact. */}
      <section className="apparait py-24 lg:py-32">
        <Container className="text-center">
          <TitreSection centre eyebrow={t.accueil.contactEyebrow} titre={t.accueil.contactTitre} description={t.accueil.contactTexte} />
          <div className="mt-10 flex justify-center">
            <Bouton to={chemin('contact', langue)}>
              {t.boutons.ecrire}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Bouton>
          </div>
        </Container>
      </section>
    </>
  )
}

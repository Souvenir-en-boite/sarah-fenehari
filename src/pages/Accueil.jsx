import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Seo, DonneesStructurees } from '../components/Seo'
import { Container, Bouton, Eyebrow, TitreSection, Image, BandeauCitation } from '../components/ui'
import { Tondo } from '../components/Tondo'
import { Cartel } from '../components/CarteOeuvre'
import { useApparition } from '../components/useApparition'
import { series } from '../data/series'
import { biographie, expositions } from '../data/biographie'
import { oeuvreAccueil, fondAccueil, oeuvresSelection, details, portrait, vueAccrochage, visuelNft, citations, site } from '../data/site'
import { textes } from '../i18n/textes'
import { chemin } from '../i18n/routes'

export default function Accueil({ langue }) {
  const t = textes[langue]
  const oeuvres = series.flatMap((s) => s.oeuvres)
  const hero = oeuvres.find((o) => o.numero === oeuvreAccueil)
  const selection = oeuvresSelection.map((n) => oeuvres.find((o) => o.numero === n))
  const bio = biographie[langue]
  useApparition()

  return (
    <>
      <Seo langue={langue} cle="accueil" description={t.accueil.metaDescription} imageAlt={t.accueil.texte} />
      <DonneesStructurees langue={langue} />

      {/* ——— Ouverture, d'après le bandeau de Sarah : son fond flou, et une toile
             posée dessus, coupée par le bord droit de la page. Sur téléphone, le
             visuel (4:3) passe au-dessus du texte. */}
      <section className="relative overflow-hidden border-b border-line lg:flex lg:min-h-[max(34rem,30.6vw)] lg:items-center">
        <div className="relative aspect-[4/3] overflow-hidden lg:absolute lg:inset-0 lg:aspect-auto">
          <img
            src={fondAccueil.src}
            width={fondAccueil.width}
            height={fondAccueil.height}
            alt=""
            fetchpriority="high"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover opacity-65"
          />
          {/* La toile : un peu plus haute que le bandeau, calée sur le bord droit. */}
          <div className="absolute right-[-22%] top-1/2 aspect-square h-[112%] -translate-y-1/2 lg:right-[-13%] lg:h-[115%]">
            <Tondo oeuvre={hero} langue={langue} priorite ombre sizes="(min-width: 1024px) 40vw, 90vw" />
          </div>
        </div>

        <Container className="relative py-12 sm:py-14 lg:py-16">
          <div className="max-w-lg lg:max-w-[42%]">
            <Eyebrow>{t.accueil.eyebrow}</Eyebrow>
            <h1 className="mt-6 text-[2.6rem] leading-[1.02] sm:text-6xl lg:text-[clamp(3.5rem,6vw,5.25rem)]">
              {t.accueil.titre.map((mot) => <span key={mot} className="block">{mot}</span>)}
            </h1>
            <p className="citation mt-4 text-2xl text-ink-soft sm:text-3xl">{t.accueil.sousTitre}</p>
            <p className="mt-8 text-sm leading-relaxed text-ink sm:text-base">
              {t.accueil.accroche.map((ligne) => <span key={ligne} className="block">{ligne}</span>)}
            </p>
            <Bouton to={chemin('galerie', langue)} className="mt-10">{t.boutons.decouvrir}</Bouton>
          </div>
        </Container>
      </section>

      {/* ——— Œuvres : une phrase à gauche, quatre toiles à l'échelle à droite,
             posées sur le papier, avec leur cartel. */}
      <section id="selection" className="apparait py-20 lg:py-28">
        <Container className="grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-10">
          <div className="lg:col-span-3 xl:col-span-4">
            <Eyebrow filet>{t.accueil.selectionEyebrow}</Eyebrow>
            <h2 className="citation mt-8 max-w-sm text-3xl text-ink sm:text-[2.5rem]">{t.accueil.selectionTitre}</h2>
            <Bouton to={chemin('galerie', langue)} variante="lien" className="mt-10 whitespace-nowrap">{t.boutons.toutesOeuvres}</Bouton>
          </div>
          <ul className="selection-echelle flex flex-wrap items-center justify-center gap-x-8 gap-y-12 lg:col-span-9 lg:justify-between lg:gap-x-4 xl:col-span-8">
            {selection.map((o, i) => (
              <li key={o.src}>
                <Link to={chemin('galerie', langue)} className="group flex flex-col items-center text-center">
                  <span className="block" style={{ width: `calc(${o.cm} * var(--px-par-cm))` }}>
                    <Tondo oeuvre={o} langue={langue} priorite={i < 2} sizes="(min-width: 1024px) 300px, 45vw" className="transition-transform duration-500 group-hover:scale-[1.03]" />
                  </span>
                  <Cartel oeuvre={o} langue={langue} t={t} className="mt-5 max-w-[9rem]" />
                  <span className="sr-only">{t.boutons.toutesOeuvres}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ——— Démarche : un détail de matière, la phrase en italique et le texte, le portrait. */}
      <section className="apparait border-t border-line">
        <div className="grid lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Image image={details[80]} langue={langue} className="aspect-[4/3] lg:aspect-auto lg:h-full" sizes="(min-width: 1024px) 25vw, 100vw" />
          </div>
          <div className="flex flex-col justify-center px-5 py-14 sm:px-8 lg:col-span-6 lg:px-16 lg:py-24">
            <h2 className="citation max-w-lg text-3xl text-ink sm:text-4xl">{t.accueil.demarcheTitre}</h2>
            <span className="mt-6 block h-px w-12 bg-line" />
            <div className="prose-site mt-8 max-w-lg">
              <p>{bio.demarche[0]}</p>
            </div>
            <Bouton to={chemin('demarche', langue)} variante="lien" className="mt-8">{t.boutons.decouvrirDemarche}</Bouton>
          </div>
          <div className="lg:col-span-3">
            <Image image={portrait} langue={langue} className="noir-et-blanc aspect-[4/5] lg:aspect-auto lg:h-full" sizes="(min-width: 1024px) 25vw, 100vw" />
          </div>
        </div>
      </section>

      {/* ——— Expositions : les dernières dates, la vue d'accrochage. */}
      <section className="apparait border-t border-line py-16 lg:py-20">
        <Container className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-3">
            <Eyebrow filet>{t.accueil.expositionsEyebrow}</Eyebrow>
          </div>
          <div className="lg:col-span-5">
            <ol className="divide-y divide-line border-y border-line">
              {expositions.slice(0, 3).map((e, i) => (
                <li key={i} className="grid grid-cols-[3.5rem_1fr] gap-4 py-4 text-sm">
                  <span className="eyebrow pt-0.5 text-ink-soft">{e.annee}</span>
                  <span className="text-ink">{e[langue]}</span>
                </li>
              ))}
            </ol>
            <Bouton to={chemin('expositions', langue)} variante="lien" className="mt-8">{t.boutons.toutesExpositions}</Bouton>
          </div>
          <div className="hidden lg:col-span-3 lg:col-start-10 lg:block">
            <Image image={vueAccrochage} langue={langue} className="aspect-[4/3]" sizes="25vw" />
          </div>
        </Container>
      </section>

      {/* ——— NFT : bande sombre. */}
      <section className="apparait border-t border-line bg-night py-20 text-paper lg:py-24">
        <Container className="grid items-center gap-12 lg:grid-cols-12">
          <div className="mx-auto w-48 sm:w-60 lg:col-span-3 lg:w-full lg:max-w-[16rem]">
            <Tondo oeuvre={visuelNft} langue={langue} sizes="16rem" />
          </div>
          <div className="lg:col-span-7 lg:col-start-5">
            <Eyebrow className="text-paper/55">{t.accueil.nftEyebrow}</Eyebrow>
            <h2 className="mt-5 text-3xl sm:text-4xl">{t.accueil.nftTitre}</h2>
            <p className="mt-6 max-w-xl leading-relaxed text-paper/70">{t.accueil.nftTexte}</p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Bouton href={site.reseaux.opensea} target="_blank" rel="noopener noreferrer" variante="contourClair">
                {t.boutons.voirOpenSea}<span className="sr-only"> {t.nav.nouvelleFenetre}</span>
              </Bouton>
              <Link to={chemin('nft', langue)} className="eyebrow inline-flex items-center gap-3 text-paper/80 underline decoration-paper/30 underline-offset-[7px] hover:decoration-paper">
                {t.nav.nft}<ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ——— Contact. */}
      <section className="apparait py-20 lg:py-24">
        <Container className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <TitreSection eyebrow={t.accueil.contactEyebrow} titre={t.accueil.contactTitre} description={t.accueil.contactTexte} />
            <Bouton to={chemin('contact', langue)} className="mt-10">{t.boutons.contacter}</Bouton>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:col-span-5 lg:col-start-8">
            {selection.slice(0, 2).map((o) => (
              <Tondo key={o.src} oeuvre={o} langue={langue} mat sizes="20vw" />
            ))}
          </div>
        </Container>
      </section>

      <BandeauCitation texte={citations.contact[langue]} auteur={site.nom} />
    </>
  )
}

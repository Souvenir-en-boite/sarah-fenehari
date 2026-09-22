import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Seo, DonneesStructurees } from '../components/Seo'
import { Container, Bouton, Eyebrow, TitreSection, Image, BandeauCitation } from '../components/ui'
import { Tondo } from '../components/Tondo'
import { CarteOeuvre } from '../components/CarteOeuvre'
import { useApparition } from '../components/useApparition'
import { series } from '../data/series'
import { biographie, expositions } from '../data/biographie'
import { oeuvreAccueil, oeuvresSelection, portrait, vueAccrochage, visuelNft, citations, site } from '../data/site'
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

      {/* ——— Ouverture, d'après la maquette de Sarah : son nom en titre, l'accroche
             en italique, et la toile coupée par le coin haut-droit de l'écran. */}
      <section className="relative overflow-hidden border-b border-line">
        {/* La toile est calée sur le coin de la fenêtre, pas sur la colonne de
            texte : on n'en voit qu'une partie, le reste sort du cadre. */}
        <div
          className="pointer-events-none absolute -right-[38%] -top-[22%] w-[92vw] sm:-right-[22%] sm:w-[70vw] lg:-right-[12%] lg:-top-[30%] lg:w-[58vw] lg:max-w-[980px]"
        >
          <Tondo oeuvre={hero} langue={langue} priorite tourne sizes="(min-width: 1024px) 58vw, 92vw" />
        </div>

        <Container className="relative flex min-h-[72svh] flex-col justify-end pb-14 pt-[46vw] sm:pt-[34vw] lg:min-h-[78svh] lg:justify-center lg:py-24">
          <div className="max-w-xl lg:max-w-[46%]">
            <Eyebrow>{t.accueil.eyebrow}</Eyebrow>
            <h1 className="mt-6 text-[2.6rem] leading-[1.02] sm:text-6xl lg:text-[4.75rem] xl:text-[5.25rem]">
              {t.accueil.titre.map((mot) => <span key={mot} className="block">{mot}</span>)}
            </h1>
            <p className="citation mt-8 max-w-md text-xl text-ink sm:text-2xl">{t.accueil.accroche}</p>
            <Bouton to={chemin('galerie', langue)} className="mt-10">{t.boutons.decouvrir}</Bouton>
          </div>

          {/* Légende de la toile et indicateur de défilement, en bas à droite. */}
          <div className="mt-12 flex items-center gap-10 text-xs text-ink-soft lg:absolute lg:bottom-8 lg:left-14 lg:mt-0">
            <p>{t.accueil.legendeHero(hero)}</p>
            <a href="#selection" className="eyebrow hidden items-center gap-3 text-ink-soft transition-colors hover:text-ink lg:inline-flex">
              {t.accueil.defiler}
              <span aria-hidden="true" className="block h-px w-8 bg-ink-soft" />
            </a>
          </div>
        </Container>
      </section>

      {/* ——— Sélection d'œuvres : quatre cartes. */}
      <section id="selection" className="apparait py-20 lg:py-24">
        <Container>
          <div className="flex items-end justify-between gap-6">
            <Eyebrow filet>{t.accueil.selectionEyebrow}</Eyebrow>
            <Bouton to={chemin('galerie', langue)} variante="lien" className="hidden sm:inline-flex">{t.boutons.toutesOeuvres}</Bouton>
          </div>
          <ul className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-8 lg:grid-cols-4 lg:gap-x-10">
            {selection.map((o, i) => (
              <li key={o.src}>
                <Link to={chemin('galerie', langue)} className="group block">
                  <CarteOeuvre oeuvre={o} langue={langue} t={t} priorite={i < 2} sizes="(min-width: 1024px) 22vw, 45vw" />
                  <span className="sr-only">{t.boutons.toutesOeuvres}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-10 sm:hidden">
            <Bouton to={chemin('galerie', langue)} variante="lien">{t.boutons.toutesOeuvres}</Bouton>
          </div>
        </Container>
      </section>

      {/* ——— Démarche + expositions : portrait noir et blanc, texte, colonne de dates, vue d'accrochage. */}
      <section className="apparait border-t border-line">
        <div className="grid lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Image image={portrait} langue={langue} className="noir-et-blanc aspect-[4/5] lg:aspect-auto lg:h-full" sizes="(min-width: 1024px) 25vw, 100vw" />
          </div>
          <div className="px-5 py-14 sm:px-8 lg:col-span-4 lg:px-12 lg:py-20">
            <TitreSection eyebrow={t.accueil.demarcheEyebrow} titre={t.accueil.demarcheTitre} />
            <div className="prose-site mt-8">
              <p>{bio.demarche[0]}</p>
              <p>{bio.demarche[1].split('. ').slice(0, 2).join('. ')}.</p>
            </div>
            <Bouton to={chemin('demarche', langue)} variante="lien" className="mt-8">{t.boutons.enSavoirPlus}</Bouton>
          </div>
          <div className="border-t border-line px-5 py-14 sm:px-8 lg:col-span-3 lg:border-l lg:border-t-0 lg:px-10 lg:py-20">
            <h2 className="text-2xl">{t.accueil.expositionsEyebrow}</h2>
            <span className="mt-4 block h-px w-12 bg-line" />
            <ol className="mt-8 flex flex-col gap-6">
              {expositions.slice(0, 3).map((e, i) => (
                <li key={i} className="grid grid-cols-[3.5rem_1fr] gap-4 text-sm">
                  <span className="eyebrow pt-0.5 text-ink-soft">{e.annee}</span>
                  <span className="text-ink">{e[langue]}</span>
                </li>
              ))}
            </ol>
            <Bouton to={chemin('expositions', langue)} variante="lien" className="mt-10">{t.boutons.toutesExpositions}</Bouton>
          </div>
          <div className="hidden lg:col-span-2 lg:block">
            <Image image={vueAccrochage} langue={langue} className="h-full" sizes="17vw" />
          </div>
        </div>
      </section>

      {/* ——— NFT : bande sombre. */}
      <section className="apparait border-t border-line bg-night py-20 text-paper lg:py-24">
        <Container className="grid items-center gap-12 lg:grid-cols-12">
          <div className="mx-auto w-48 sm:w-60 lg:col-span-3 lg:w-full lg:max-w-[16rem]">
            <Tondo oeuvre={visuelNft} langue={langue} tourne sizes="16rem" />
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
      <section className="apparait py-20 lg:py-28">
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

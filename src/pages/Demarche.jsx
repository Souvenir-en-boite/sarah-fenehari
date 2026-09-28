import { Seo } from '../components/Seo'
import { Container, Bouton, Eyebrow, EncadreCitation, Image } from '../components/ui'
import { Tondo } from '../components/Tondo'
import { biographie } from '../data/biographie'
import { series } from '../data/series'
import { details, citations } from '../data/site'
import { textes } from '../i18n/textes'
import { chemin } from '../i18n/routes'

export default function Demarche({ langue }) {
  const t = textes[langue]
  const bio = biographie[langue]
  const oeuvres = series.flatMap((s) => s.oeuvres)
  const exemple = oeuvres.find((o) => o.numero === '66')

  return (
    <>
      <Seo langue={langue} cle="demarche" titre={t.demarche.titre} description={t.demarche.metaDescription} image={details[75].src} imageAlt={details[75].alt[langue]} />

      {/* Bandeau : deux détails de matière côte à côte, comme sur la page Contact. */}
      <div className="grid gap-4 border-b border-line p-4 sm:grid-cols-2 lg:gap-5 lg:p-5">
        <Image image={details[75]} langue={langue} priorite className="aspect-[16/9] sm:aspect-[4/3]" sizes="(min-width: 640px) 50vw, 100vw" />
        <Image image={details[57]} langue={langue} priorite className="hidden aspect-[4/3] sm:block" sizes="50vw" />
      </div>

      <Container className="py-14 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow>{t.demarche.eyebrow}</Eyebrow>
            <h1 className="mt-5 text-4xl sm:text-5xl">{t.demarche.titre}</h1>
            <Bouton to={chemin('biographie', langue)} variante="lien" className="mt-10">{t.boutons.lireBiographie}</Bouton>
          </div>
          <div className="prose-site lg:col-span-6 lg:col-start-7">
            {bio.demarche.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </div>

        <div className="mt-20 grid gap-10 lg:mt-28 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <Image image={details[80]} langue={langue} className="aspect-[4/3]" sizes="(min-width: 1024px) 50vw, 100vw" />
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <EncadreCitation texte={citations.demarche[langue]} auteur="Sarah Fenehari" />
          </div>
        </div>

        <div className="mt-20 grid gap-10 border-t border-line pt-16 lg:mt-28 lg:grid-cols-12 lg:items-center">
          <div className="mx-auto w-56 lg:col-span-4 lg:w-full lg:max-w-[20rem]">
            <Tondo oeuvre={exemple} langue={langue} mat sizes="20rem" />
          </div>
          <blockquote className="lg:col-span-7 lg:col-start-6">
            <Eyebrow>{t.demarche.citationEyebrow}</Eyebrow>
            <p className="citation mt-5 text-2xl text-ink sm:text-3xl">« {bio.citation.texte} »</p>
            <footer className="mt-5 text-sm text-ink-soft">{bio.citation.auteur}</footer>
          </blockquote>
        </div>
      </Container>
    </>
  )
}

import { Seo, DonneesStructurees } from '../components/Seo'
import { Container, Bouton, Eyebrow, EncadreCitation, Image } from '../components/ui'
import { biographie, expositions } from '../data/biographie'
import { series } from '../data/series'
import { portrait, details, citations } from '../data/site'
import { textes } from '../i18n/textes'
import { chemin } from '../i18n/routes'

export default function Biographie({ langue }) {
  const t = textes[langue]
  const bio = biographie[langue]
  const nbOeuvres = series.reduce((n, s) => n + s.oeuvres.length, 0)
  const premiereAnnee = Math.min(...expositions.map((e) => Number(e.annee.slice(0, 4))))
  const derniereAnnee = Math.max(...expositions.map((e) => Number(e.annee.slice(-4))))
  const chiffres = [
    t.biographie.chiffres.annees(derniereAnnee - premiereAnnee),
    t.biographie.chiffres.expositions(expositions.length),
    t.biographie.chiffres.oeuvres(nbOeuvres),
  ]

  return (
    <>
      <Seo langue={langue} cle="biographie" titre={t.biographie.titre} description={t.biographie.metaDescription} image={portrait.src} imageAlt={portrait.alt[langue]} type="profile" />
      <DonneesStructurees langue={langue} />

      <Container className="py-14 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Eyebrow>{t.biographie.eyebrow}</Eyebrow>
            <h1 className="mt-5 text-4xl sm:text-5xl">{t.biographie.titre}</h1>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-1 text-xs text-ink-soft">
              <li>{t.biographie.neeLe}</li>
              <li>{t.biographie.vit}</li>
            </ul>
            <div className="prose-site mt-8">
              {bio.presentation.map((p, i) => <p key={i}>{p}</p>)}
              <p>{bio.demarche[0]}</p>
            </div>
            <Bouton to={chemin('demarche', langue)} variante="lien" className="mt-8">{t.boutons.enSavoirPlus}</Bouton>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <Image image={portrait} langue={langue} priorite className="noir-et-blanc aspect-[4/5]" sizes="(min-width: 1024px) 40vw, 100vw" />
          </div>
        </div>

        <div className="mt-20 grid gap-8 lg:mt-24 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <EncadreCitation texte={citations.biographie[langue]} auteur="Sarah Fenehari" />
          </div>
          <div className="lg:col-span-6">
            <Image image={details[66]} langue={langue} className="aspect-[3/2]" sizes="(min-width: 1024px) 50vw, 100vw" />
          </div>
        </div>

        <ul className="mt-20 grid grid-cols-3 divide-x divide-line border-y border-line py-10 text-center lg:mt-24">
          {chiffres.map(([n, libelle]) => (
            <li key={libelle} className="px-4">
              <span className="font-display text-4xl text-ink sm:text-5xl">{n}</span>
              <span className="eyebrow mt-3 block text-ink-soft">{libelle}</span>
            </li>
          ))}
        </ul>
      </Container>
    </>
  )
}

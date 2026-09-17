import { ArrowUpRight } from 'lucide-react'
import { Seo } from '../components/Seo'
import { Container, Bouton, Eyebrow } from '../components/ui'
import { Tondo } from '../components/Tondo'
import { nft } from '../data/nft'
import { visuelNft } from '../data/site'
import { textes } from '../i18n/textes'

export default function Nft({ langue }) {
  const t = textes[langue]
  return (
    <>
      <Seo langue={langue} cle="nft" titre={t.nft.titre} description={t.nft.metaDescription} image={visuelNft.src} imageAlt={visuelNft.alt[langue]} />
      <Container className="grid items-center gap-12 py-16 lg:min-h-[calc(100svh-4.5rem)] lg:grid-cols-12 lg:py-24">
        <div className="lg:col-span-6">
          <Eyebrow>{t.nft.eyebrow}</Eyebrow>
          <h1 className="mt-5 text-6xl sm:text-7xl lg:text-8xl">{t.nft.titre}</h1>
          <div className="prose-site mt-8 text-lg">
            {nft[langue].texte.map((p, i) => <p key={i}>{p}</p>)}
          </div>
          <Bouton href={nft.lien} target="_blank" rel="noopener noreferrer" className="mt-10">
            {t.boutons.voirOpenSea}
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only"> {t.nav.nouvelleFenetre}</span>
          </Bouton>
          <p className="mt-8 max-w-lg text-sm leading-relaxed text-ink-soft">{t.nft.note}</p>
        </div>
        <div className="mx-auto w-full max-w-sm lg:col-span-5 lg:col-start-8 lg:max-w-none">
          <Tondo oeuvre={visuelNft} langue={langue} priorite tourne sizes="(min-width: 1024px) 30rem, 80vw" />
        </div>
      </Container>
    </>
  )
}

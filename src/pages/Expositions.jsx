import { Seo } from '../components/Seo'
import { Container, Bouton, Eyebrow, Image } from '../components/ui'
import { expositions } from '../data/biographie'
import { vueAccrochage } from '../data/site'
import { textes } from '../i18n/textes'
import { chemin } from '../i18n/routes'

export default function Expositions({ langue }) {
  const t = textes[langue]
  return (
    <>
      <Seo langue={langue} cle="expositions" titre={t.expositions.titre} description={t.expositions.metaDescription} image={vueAccrochage.src} imageAlt={vueAccrochage.alt[langue]} />
      <Container className="py-14 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow>{t.expositions.eyebrow}</Eyebrow>
            <h1 className="mt-5 text-4xl sm:text-5xl">{t.expositions.titre}</h1>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-ink-soft lg:col-span-4 lg:col-start-9 lg:pb-2">{t.expositions.chapo}</p>
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Image image={vueAccrochage} langue={langue} priorite className="aspect-[4/3]" sizes="(min-width: 1024px) 40vw, 100vw" />
            <p className="mt-3 text-xs text-ink-soft">{t.accueil.accrochageLegende}</p>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <ol className="divide-y divide-line border-y border-line">
              {expositions.map((e, i) => (
                <li key={i} className="grid grid-cols-[5.5rem_1fr] items-baseline gap-4 py-5">
                  <span className="eyebrow text-ink-soft">{e.annee}</span>
                  <span className="text-ink">{e[langue]}</span>
                </li>
              ))}
            </ol>
            <Bouton to={chemin('contact', langue)} variante="lien" className="mt-10">{t.boutons.contacter}</Bouton>
          </div>
        </div>
      </Container>
    </>
  )
}

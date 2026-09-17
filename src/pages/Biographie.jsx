import { Seo, DonneesStructurees } from '../components/Seo'
import { Container, Eyebrow } from '../components/ui'
import { biographie, expositions } from '../data/biographie'
import { portrait } from '../data/site'
import { textes } from '../i18n/textes'

export default function Biographie({ langue }) {
  const t = textes[langue]
  const bio = biographie[langue]

  return (
    <>
      <Seo langue={langue} cle="biographie" titre={t.biographie.titre} description={t.biographie.metaDescription} image={portrait.src} imageAlt={portrait.alt[langue]} type="profile" />
      <DonneesStructurees langue={langue} />

      <Container className="py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="mx-auto w-64 sm:w-80 lg:col-span-4 lg:w-full lg:max-w-[24rem]">
            <img
              src={portrait.src}
              alt={portrait.alt[langue]}
              width={portrait.width}
              height={portrait.height}
              fetchpriority="high"
              className="aspect-square w-full rounded-full object-cover object-top"
            />
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <Eyebrow>{t.biographie.eyebrow}</Eyebrow>
            <h1 className="mt-5 text-5xl sm:text-6xl lg:text-7xl">{t.biographie.titre}</h1>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-1 text-sm text-ink-soft">
              <li>{t.biographie.neeLe}</li>
              <li>{t.biographie.vit}</li>
            </ul>
            <div className="prose-site mt-8 text-lg">
              {bio.presentation.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </div>
        </div>

        <section className="mt-24 grid gap-12 lg:mt-32 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="text-3xl sm:text-4xl">{t.biographie.demarche}</h2>
            <blockquote className="mt-8 border-l border-line pl-6">
              <p className="font-display text-xl italic leading-relaxed text-ink" style={{ fontVariationSettings: '"opsz" 24, "SOFT" 100' }}>« {bio.citation.texte} »</p>
              <footer className="mt-3 text-sm text-ink-soft">— {bio.citation.auteur}</footer>
            </blockquote>
          </div>
          <div className="prose-site lg:col-span-7 lg:col-start-6">
            {bio.demarche.map((p, i) => <p key={i} className={i === 0 ? 'lettrine' : ''}>{p}</p>)}
          </div>
        </section>

        <section id="expositions" className="mt-24 border-t border-line pt-16 lg:mt-32">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <h2 className="text-3xl sm:text-4xl">{t.biographie.expositions}</h2>
              <p className="mt-4 text-sm text-ink-soft">2015 – 2025</p>
            </div>
            <ol className="divide-y divide-line lg:col-span-7 lg:col-start-6">
              {expositions.map((e, i) => (
                <li key={i} className="grid grid-cols-[6.5rem_1fr] items-baseline gap-4 py-4">
                  <span className="font-display text-2xl text-ink">{e.annee}</span>
                  <span className="text-ink-soft">{e[langue]}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </Container>
    </>
  )
}

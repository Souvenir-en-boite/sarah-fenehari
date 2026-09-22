import { Link, useLocation } from 'react-router-dom'
import { Instagram, Facebook } from 'lucide-react'
import { Container } from './ui'
import { IconOpenSea, IconX } from './icons'
import { teinteDe } from './Tondo'
import { navigation, site } from '../data/site'
import { series } from '../data/series'
import { useLangue } from '../i18n/LangueContext'
import { chemin } from '../i18n/routes'
import { cheminAutreLangue } from './Header'

const anneeCourante = new Date().getFullYear()

/**
 * Le spectre de la collection : une bande fine où chaque segment porte la
 * couleur dominante d'une toile, dans l'ordre de la série.
 */
export function SpectreCollection({ className = '' }) {
  const { t } = useLangue()
  const oeuvres = series.flatMap((s) => s.oeuvres)
  return (
    <div className={`flex h-1 w-full ${className}`} role="img" aria-label={t.piedDePage.spectre}>
      {oeuvres.map((o) => (
        <span key={o.src} className="flex-1" style={{ backgroundColor: teinteDe(o.src) }} title={o.titre} />
      ))}
    </div>
  )
}

export const reseauxListe = [
  { cle: 'instagram', libelle: 'Instagram', Icon: Instagram },
  { cle: 'facebook', libelle: 'Facebook', Icon: Facebook },
  { cle: 'x', libelle: 'X', Icon: IconX },
  { cle: 'opensea', libelle: 'OpenSea', Icon: IconOpenSea },
]

export function Footer() {
  const { langue, t } = useLangue()
  const { pathname } = useLocation()

  return (
    <footer className="mt-28 bg-night text-paper">
      <SpectreCollection />
      <Container className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] lg:py-20">
        <div>
          <p className="font-display text-xl uppercase tracking-[0.28em]">{site.nom}</p>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-paper/65">{site.baseline[langue]}</p>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-paper/65">{t.piedDePage.credit}</p>
        </div>

        <nav aria-label={t.nav.piedDePage}>
          <h2 className="eyebrow text-paper/50">{t.piedDePage.navigation}</h2>
          <ul className="mt-5 flex flex-col gap-3 text-sm">
            <li><Link to={chemin('accueil', langue)} className="text-paper/85 transition-colors hover:text-paper">{t.nav.accueil}</Link></li>
            {navigation.map((cle) => (
              <li key={cle}><Link to={chemin(cle, langue)} className="text-paper/85 transition-colors hover:text-paper">{t.nav[cle]}</Link></li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="eyebrow text-paper/50">{t.piedDePage.suivre}</h2>
          <ul className="mt-5 flex flex-col gap-3 text-sm">
            {reseauxListe.map(({ cle, libelle, Icon }) => (
              <li key={cle}>
                <a href={site.reseaux[cle]} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-paper/85 transition-colors hover:text-paper">
                  <Icon className="h-4 w-4" strokeWidth={1.5} />
                  {libelle}
                  <span className="sr-only"> {t.nav.nouvelleFenetre}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="eyebrow text-paper/50">{t.piedDePage.langue}</h2>
          <ul className="mt-5 flex flex-col gap-3 text-sm">
            <li aria-current="true" className="text-paper">{langue === 'fr' ? 'Français' : 'English'}</li>
            <li>
              <Link to={cheminAutreLangue(pathname, t.autreLangue.code)} hrefLang={t.autreLangue.code} lang={t.autreLangue.code} className="text-paper/85 underline underline-offset-4 transition-colors hover:text-paper">
                {t.autreLangue.libelle}
              </Link>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-paper/10">
        <Container className="flex flex-col gap-4 py-6 text-xs text-paper/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {anneeCourante} {site.nom}. {t.piedDePage.droits}</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li><Link to={chemin('mentionsLegales', langue)} className="underline underline-offset-4 hover:text-paper">{t.piedDePage.mentionsLegales}</Link></li>
            <li><Link to={chemin('confidentialite', langue)} className="underline underline-offset-4 hover:text-paper">{t.piedDePage.confidentialite}</Link></li>
          </ul>
        </Container>
      </div>
    </footer>
  )
}

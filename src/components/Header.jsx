import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { Container } from './ui'
import { Marque } from './icons'
import { navigation, site } from '../data/site'
import { useLangue } from '../i18n/LangueContext'
import { chemin, resoudre } from '../i18n/routes'

/** Adresse de la page courante dans l'autre langue. */
export function cheminAutreLangue(pathname, autre) {
  const page = resoudre(pathname)
  if (!page) return chemin('accueil', autre)
  return chemin(page.cle, autre, page.suffixe)
}

function Wordmark({ langue, t, className = '' }) {
  return (
    <Link to={chemin('accueil', langue)} className={`flex items-center gap-3 text-ink ${className}`} aria-label={t.nav.retourAccueil}>
      <Marque className="h-8 w-8 shrink-0" />
      <span className="whitespace-nowrap font-display text-xl leading-none tracking-tight" style={{ fontVariationSettings: '"opsz" 32, "SOFT" 100' }}>
        {site.nom}
      </span>
    </Link>
  )
}

const lienClasses = ({ isActive }) =>
  `eyebrow relative py-2 transition-colors ${isActive ? 'text-ink' : 'text-ink-soft hover:text-ink'} after:absolute after:left-1/2 after:-bottom-1 after:h-1 after:w-1 after:-translate-x-1/2 after:rounded-full after:bg-cobalt after:transition-transform after:duration-300 ${isActive ? 'after:scale-100' : 'after:scale-0 hover:after:scale-100'}`

function SelecteurLangue({ pathname, t, className = '' }) {
  const autre = t.autreLangue
  return (
    <Link
      to={cheminAutreLangue(pathname, autre.code)}
      hrefLang={autre.code}
      lang={autre.code}
      aria-label={t.nav.changerLangue}
      className={`eyebrow rounded-full border border-line px-3 py-1.5 text-ink-soft transition-colors hover:border-ink hover:text-ink ${className}`}
    >
      {autre.libelleCourt}
    </Link>
  )
}

export function Header() {
  const { langue, t } = useLangue()
  const { pathname } = useLocation()
  const [ouvert, setOuvert] = useState(false)
  const panneauRef = useRef(null)
  const declencheurRef = useRef(null)

  useEffect(() => setOuvert(false), [pathname])

  useEffect(() => {
    if (!ouvert) return
    const panneau = panneauRef.current
    const focusables = panneau.querySelectorAll('a[href], button:not([disabled])')
    // Le panneau vient de passer de `invisible` à `visible` : on attend la
    // frame suivante pour que focus() ait prise.
    const frame = requestAnimationFrame(() => focusables[0]?.focus())
    const overflowInitial = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const surTouche = (e) => {
      if (e.key === 'Escape') return setOuvert(false)
      if (e.key !== 'Tab' || focusables.length === 0) return
      const premier = focusables[0]
      const dernier = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === premier) { e.preventDefault(); dernier.focus() }
      else if (!e.shiftKey && document.activeElement === dernier) { e.preventDefault(); premier.focus() }
    }
    document.addEventListener('keydown', surTouche)
    return () => {
      cancelAnimationFrame(frame)
      document.removeEventListener('keydown', surTouche)
      document.body.style.overflow = overflowInitial
      declencheurRef.current?.focus()
    }
  }, [ouvert])

  const liens = navigation.map((cle) => ({ cle, to: chemin(cle, langue), libelle: t.nav[cle] }))

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line/70 bg-paper/85 backdrop-blur-md">
        <Container className="flex items-center justify-between gap-6 py-4">
          <Wordmark langue={langue} t={t} />

          <nav aria-label={t.nav.principale} className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {liens.map((l) => (
                <li key={l.cle}>
                  <NavLink to={l.to} end={l.cle === 'accueil'} className={lienClasses}>
                    {l.libelle}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden lg:block">
            <SelecteurLangue pathname={pathname} t={t} />
          </div>

          <div className="flex items-center gap-3 lg:hidden">
            <SelecteurLangue pathname={pathname} t={t} />
            <button
              ref={declencheurRef}
              type="button"
              onClick={() => setOuvert(true)}
              className="-mr-2 p-2 text-ink"
              aria-expanded={ouvert}
              aria-controls="menu-mobile"
            >
              <Menu className="h-7 w-7" aria-hidden="true" />
              <span className="sr-only">{t.nav.ouvrirMenu}</span>
            </button>
          </div>
        </Container>
      </header>

      {/* Hors de <header> : `backdrop-blur` en ferait le bloc conteneur du
          panneau fixe. Monté en permanence pour pouvoir animer la fermeture ;
          `invisible` le retire de la tabulation et de l'arbre d'accessibilité. */}
      <div
        id="menu-mobile"
        ref={panneauRef}
        role="dialog"
        aria-modal="true"
        aria-label={t.nav.menu}
        className={`fixed inset-0 z-50 flex flex-col bg-paper transition-[opacity,transform,visibility] duration-300 ease-out lg:hidden ${
          ouvert ? 'visible translate-y-0 scale-100 opacity-100' : 'invisible -translate-y-1 scale-[0.99] opacity-0'
        }`}
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4 sm:px-8">
          <Wordmark langue={langue} t={t} />
          <button type="button" onClick={() => setOuvert(false)} className="-mr-2 p-2 text-ink">
            <X className="h-7 w-7" aria-hidden="true" />
            <span className="sr-only">{t.nav.fermerMenu}</span>
          </button>
        </div>
        <nav aria-label={t.nav.principale} className="flex-1 overflow-y-auto px-5 py-12 sm:px-8">
          <ul className="flex flex-col gap-6">
            {liens.map((l) => (
              <li key={l.cle}>
                <NavLink
                  to={l.to}
                  end={l.cle === 'accueil'}
                  className={({ isActive }) => `font-display text-4xl ${isActive ? 'text-cobalt' : 'text-ink'}`}
                >
                  {l.libelle}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="mt-14 border-t border-line pt-8">
            <p className="eyebrow text-ink-soft">{t.piedDePage.langue}</p>
            <Link
              to={cheminAutreLangue(pathname, t.autreLangue.code)}
              hrefLang={t.autreLangue.code}
              lang={t.autreLangue.code}
              className="mt-3 inline-block font-display text-2xl text-ink"
            >
              {t.autreLangue.libelle}
            </Link>
          </div>
        </nav>
      </div>
    </>
  )
}

import { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import { LangueProvider } from '../i18n/LangueContext'
import { langueDe } from '../i18n/routes'
import { textes } from '../i18n/textes'

export default function Layout() {
  const { pathname } = useLocation()
  const langue = langueDe(pathname)
  const t = textes[langue]
  const mainRef = useRef(null)
  const premierRendu = useRef(true)

  useEffect(() => {
    // Au premier affichage on ne touche ni au défilement ni au focus.
    if (premierRendu.current) {
      premierRendu.current = false
      return
    }
    // `instant` : la feuille de style met `scroll-behavior: smooth`, un
    // scrollTo classique lancerait une animation que le focus annulerait.
    window.scrollTo({ top: 0, behavior: 'instant' })
    // Replace le focus en haut du contenu pour les lecteurs d'écran.
    mainRef.current?.focus({ preventScroll: true })
  }, [pathname])

  return (
    <LangueProvider langue={langue}>
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-paper"
      >
        {t.nav.allerAuContenu}
      </a>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main id="contenu" ref={mainRef} tabIndex={-1} className="flex-1 outline-none">
          <Outlet />
        </main>
        <Footer />
      </div>
    </LangueProvider>
  )
}

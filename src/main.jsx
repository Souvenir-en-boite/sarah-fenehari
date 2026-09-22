import { ViteReactSSG } from 'vite-react-ssg'
import Layout from './components/Layout'
import Accueil from './pages/Accueil'
import Oeuvres from './pages/Oeuvres'
import Demarche from './pages/Demarche'
import Biographie from './pages/Biographie'
import Expositions from './pages/Expositions'
import Nft from './pages/Nft'
import Contact from './pages/Contact'
import Merci from './pages/Merci'
import MentionsLegales from './pages/MentionsLegales'
import Confidentialite from './pages/Confidentialite'
import NonTrouvee from './pages/NonTrouvee'
import { langues, chemin } from './i18n/routes'
import './styles/index.css'

// Les mêmes pages dans chaque langue ; les adresses viennent de
// src/i18n/routes.js. `.slice(1)` : react-router attend des chemins
// relatifs au parent (« en/gallery », pas « /en/gallery »).
const relatif = (c) => c.slice(1)

const pagesDe = (langue) => [
  langue === 'fr'
    ? { index: true, element: <Accueil langue={langue} /> }
    : { path: relatif(chemin('accueil', langue)), element: <Accueil langue={langue} /> },
  { path: relatif(chemin('galerie', langue)), element: <Oeuvres langue={langue} /> },
  { path: relatif(chemin('demarche', langue)), element: <Demarche langue={langue} /> },
  { path: relatif(chemin('biographie', langue)), element: <Biographie langue={langue} /> },
  { path: relatif(chemin('expositions', langue)), element: <Expositions langue={langue} /> },
  { path: relatif(chemin('nft', langue)), element: <Nft langue={langue} /> },
  { path: relatif(chemin('contact', langue)), element: <Contact langue={langue} /> },
  { path: relatif(chemin('merci', langue)), element: <Merci langue={langue} /> },
  { path: relatif(chemin('mentionsLegales', langue)), element: <MentionsLegales langue={langue} /> },
  { path: relatif(chemin('confidentialite', langue)), element: <Confidentialite langue={langue} /> },
]

export const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      ...langues.flatMap(pagesDe),
      // Page d'erreur générée en dur pour les hébergeurs qui servent /404.html,
      // et repli côté navigation pour toute adresse inconnue.
      { path: '404', element: <NonTrouvee /> },
      { path: '*', element: <NonTrouvee /> },
    ],
  },
]

export const createRoot = ViteReactSSG({ routes })

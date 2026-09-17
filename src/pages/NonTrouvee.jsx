import { useLocation } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { PageTexte } from '../components/PageTexte'
import { Bouton } from '../components/ui'
import { textes } from '../i18n/textes'
import { chemin, langueDe } from '../i18n/routes'

export default function NonTrouvee() {
  // La langue vient de l'adresse : une 404 sous /en/ s'affiche en anglais.
  const { pathname } = useLocation()
  const langue = langueDe(pathname)
  const t = textes[langue]
  return (
    <>
      <Seo langue={langue} cle="accueil" titre={t.nonTrouvee.metaTitre} description={t.nonTrouvee.metaDescription} noindex />
      <PageTexte
        eyebrow={t.nonTrouvee.eyebrow}
        titre={t.nonTrouvee.titre}
        chapo={t.nonTrouvee.chapo}
        actions={
          <>
            <Bouton to={chemin('accueil', langue)}>{t.boutons.retourAccueil}</Bouton>
            <Bouton to={chemin('galerie', langue)} variante="contour">{t.boutons.voirGalerie}</Bouton>
          </>
        }
      >
        <p>{langue === 'fr' ? "Les pages du site : l'accueil, la galerie et ses séries, la biographie, la page NFT et le contact. Le menu en haut de page y mène directement." : 'The pages of this site: home, the gallery and its series, the biography, the NFT page and contact. The menu at the top of the page leads to each of them.'}</p>
        <p>{langue === 'fr' ? "Si vous êtes arrivé ici depuis un lien de l'ancien site, la page que vous cherchiez a probablement changé d'adresse." : 'If you arrived here from a link on the previous website, the page you were looking for has probably moved.'}</p>
      </PageTexte>
    </>
  )
}

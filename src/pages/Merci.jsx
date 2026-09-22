import { Seo } from '../components/Seo'
import { PageTexte } from '../components/PageTexte'
import { Bouton } from '../components/ui'
import { textes } from '../i18n/textes'
import { chemin } from '../i18n/routes'

export default function Merci({ langue }) {
  const t = textes[langue]
  return (
    <>
      <Seo langue={langue} cle="merci" titre={t.merci.metaTitre} description={t.merci.metaDescription} noindex />
      <PageTexte
        eyebrow={t.merci.eyebrow}
        titre={t.merci.titre}
        chapo={t.merci.chapo}
        actions={
          <>
            <Bouton to={chemin('galerie', langue)}>{t.boutons.toutesOeuvres}</Bouton>
            <Bouton to={chemin('accueil', langue)} variante="contour">{t.boutons.retourAccueil}</Bouton>
          </>
        }
      >
        <p>{langue === 'fr' ? 'Si vous ne recevez pas de réponse sous quelques jours, vérifiez votre dossier de courrier indésirable, ou réessayez depuis la page contact.' : 'If you do not hear back within a few days, please check your spam folder or try again from the contact page.'}</p>
        <p>{langue === 'fr' ? "Vous pouvez aussi suivre l'actualité des expositions sur Instagram." : 'You can also follow exhibition news on Instagram.'}</p>
      </PageTexte>
    </>
  )
}

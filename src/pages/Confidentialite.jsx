import { Seo } from '../components/Seo'
import { PageTexte } from '../components/PageTexte'
import { site } from '../data/site'
import { textes } from '../i18n/textes'

// ⚠️ À mettre à jour à chaque modification du traitement des données.
const DERNIERE_MISE_A_JOUR = { fr: '17/09/2026', en: '17 September 2026' }

export default function Confidentialite({ langue }) {
  const t = textes[langue]
  const fr = langue === 'fr'
  return (
    <>
      <Seo langue={langue} cle="confidentialite" titre={t.piedDePage.confidentialite} description={fr ? `Comment vos données personnelles sont collectées, utilisées et protégées sur le site ${site.nom}.` : `How your personal data is collected, used and protected on ${site.nom}'s website.`} noindex />
      <PageTexte
        titre={t.piedDePage.confidentialite}
        chapo={fr ? 'Ce site collecte le strict minimum : ce que vous m’écrivez via le formulaire de contact, et rien d’autre. Cette page explique ce qu’il en advient.' : 'This website collects the bare minimum: what you write to me through the contact form, and nothing else. This page explains what happens to it.'}
      >
        <p><strong>{fr ? 'Dernière mise à jour :' : 'Last updated:'}</strong> {DERNIERE_MISE_A_JOUR[langue]}</p>

        {fr ? (
          <>
            <h2>1. Données collectées</h2>
            <p>Lorsque vous me contactez via le formulaire, je recueille votre nom, votre adresse e-mail, le sujet et le contenu de votre message. Aucune autre donnée n'est collectée sur le site : pas de compte, pas d'inscription, pas de suivi de navigation.</p>
            <p>Le formulaire est acheminé par le service FormSubmit, qui transmet votre message à ma boîte e-mail sans le conserver durablement.</p>

            <h2>2. Utilisation des données</h2>
            <p>Vos données servent uniquement à répondre à votre demande : information sur une œuvre, acquisition, exposition, collaboration. Elles ne sont ni vendues, ni transmises à des tiers, ni utilisées pour vous adresser des messages non sollicités.</p>

            <h2>3. Cookies et mesure d'audience</h2>
            <p>Ce site ne dépose aucun cookie et n'utilise aucun outil de mesure d'audience ni de publicité. Les polices de caractères sont hébergées sur le site lui-même : aucune ressource n'est chargée depuis un service tiers pendant votre visite. C'est pourquoi aucune bannière de consentement ne vous est présentée : il n'y a rien à consentir.</p>
            <p>Les liens vers Instagram, Facebook, X et OpenSea ouvrent ces services dans un nouvel onglet ; leurs propres politiques s'appliquent alors.</p>

            <h2>4. Conservation</h2>
            <p>Les messages sont conservés dans ma messagerie le temps nécessaire au traitement de votre demande et, le cas échéant, à la relation qui en découle (vente d'une œuvre, exposition), puis supprimés.</p>

            <h2>5. Vos droits</h2>
            <p>Conformément au Règlement général sur la protection des données (RGPD), vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation et d'opposition sur vos données. Pour l'exercer, écrivez-moi à <a href={`mailto:${site.email}`}>{site.email}</a>. Vous pouvez également introduire une réclamation auprès de la CNIL (<a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">www.cnil.fr</a>).</p>

            <h2>6. Hébergement</h2>
            <p>Le site est hébergé par Vercel Inc. (États-Unis). Comme tout hébergeur, Vercel traite techniquement les journaux de connexion nécessaires à la fourniture du service, selon ses propres engagements de protection des données.</p>
          </>
        ) : (
          <>
            <h2>1. Data collected</h2>
            <p>When you contact me through the form, I collect your name, your e-mail address, the subject and the content of your message. No other data is collected on this website: no account, no sign-up, no browsing tracking.</p>
            <p>The form is relayed by the FormSubmit service, which forwards your message to my mailbox without storing it durably.</p>

            <h2>2. Use of data</h2>
            <p>Your data is used only to reply to your enquiry: information about a work, acquisition, exhibition, collaboration. It is neither sold, nor shared with third parties, nor used to send you unsolicited messages.</p>

            <h2>3. Cookies and analytics</h2>
            <p>This website sets no cookies and uses no analytics or advertising tools. Fonts are hosted on the website itself: no resource is loaded from a third-party service during your visit. This is why no consent banner is shown: there is nothing to consent to.</p>
            <p>Links to Instagram, Facebook, X and OpenSea open those services in a new tab; their own policies then apply.</p>

            <h2>4. Retention</h2>
            <p>Messages are kept in my mailbox for as long as needed to handle your enquiry and, where applicable, the relationship that follows (sale of a work, exhibition), then deleted.</p>

            <h2>5. Your rights</h2>
            <p>Under the General Data Protection Regulation (GDPR), you have the right to access, rectify, erase, restrict and object to the processing of your data. To exercise these rights, write to <a href={`mailto:${site.email}`}>{site.email}</a>. You may also lodge a complaint with the French data protection authority, the CNIL (<a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">www.cnil.fr</a>).</p>

            <h2>6. Hosting</h2>
            <p>The website is hosted by Vercel Inc. (United States). Like any host, Vercel technically processes the connection logs required to provide the service, under its own data protection commitments.</p>
          </>
        )}
      </PageTexte>
    </>
  )
}

import { Seo } from '../components/Seo'
import { PageTexte } from '../components/PageTexte'
import { site, editeur, hebergeur } from '../data/site'
import { textes } from '../i18n/textes'
import { chemin } from '../i18n/routes'

/** Valeur ou mention « à compléter », visible : rien ne part en ligne à moitié rempli. */
function Valeur({ valeur, t }) {
  if (valeur) return valeur
  return <mark className="rounded bg-cobalt/10 px-1.5 py-0.5 text-cobalt">{t.legal.aCompleter}</mark>
}

/**
 * Mentions légales (article 6 de la LCEN). Les champs de `editeur` encore à
 * `null` dans src/data/site.js s'affichent surlignés : voir QUESTIONS.md.
 */
export default function MentionsLegales({ langue }) {
  const t = textes[langue]
  const fr = langue === 'fr'
  const lienConf = <a href={chemin('confidentialite', langue)}>{t.piedDePage.confidentialite.toLowerCase()}</a>

  return (
    <>
      <Seo langue={langue} cle="mentionsLegales" titre={t.piedDePage.mentionsLegales} description={fr ? `Mentions légales du site ${site.nom}, artiste peintre.` : `Legal notice of ${site.nom}'s website, painter.`} noindex />
      <PageTexte titre={t.piedDePage.mentionsLegales}>
        <h2>{fr ? 'Éditrice du site' : 'Site publisher'}</h2>
        <ul>
          <li><strong>{fr ? 'Nom :' : 'Name:'}</strong> {editeur.nom}</li>
          <li><strong>{fr ? 'Statut :' : 'Status:'}</strong> <Valeur valeur={editeur.statut} t={t} /></li>
          <li><strong>{fr ? 'Adresse :' : 'Address:'}</strong> <Valeur valeur={editeur.adresse} t={t} /></li>
          <li><strong>{fr ? 'SIRET / numéro d’identification :' : 'Registration number:'}</strong> <Valeur valeur={editeur.siret} t={t} /></li>
          <li><strong>{fr ? 'Téléphone :' : 'Telephone:'}</strong> <Valeur valeur={editeur.telephone} t={t} /></li>
          <li><strong>E-mail :</strong> <a href={`mailto:${site.email}`}>{site.email}</a></li>
          <li><strong>{fr ? 'Responsable de la publication :' : 'Publishing director:'}</strong> {editeur.nom}</li>
        </ul>

        <h2>{fr ? 'Hébergement' : 'Hosting'}</h2>
        <ul>
          <li><strong>{fr ? 'Hébergeur :' : 'Host:'}</strong> {hebergeur.nom}</li>
          <li><strong>{fr ? 'Adresse :' : 'Address:'}</strong> {hebergeur.adresse}</li>
          <li><strong>{fr ? 'Site :' : 'Website:'}</strong> <a href={hebergeur.site} target="_blank" rel="noopener noreferrer">vercel.com</a></li>
        </ul>

        <h2>{fr ? 'Propriété intellectuelle' : 'Intellectual property'}</h2>
        {fr ? (
          <>
            <p>L'ensemble des œuvres reproduites sur ce site (peintures, œuvres numériques), ainsi que les photographies, textes et éléments graphiques, sont la propriété exclusive de {site.nom}, sauf mention contraire. Toute reproduction, représentation, modification, publication ou adaptation, totale ou partielle, par quelque procédé que ce soit, sans autorisation écrite préalable, est interdite et constitue une contrefaçon au sens des articles L.335-2 et suivants du Code de la propriété intellectuelle.</p>
            <p>Les œuvres proposées sous forme de NFT le sont sur la plateforme OpenSea, selon ses propres conditions ; ce site ne fait que renvoyer vers elle.</p>
          </>
        ) : (
          <>
            <p>All works reproduced on this website (paintings, digital works), as well as the photographs, texts and graphic elements, are the exclusive property of {site.nom} unless otherwise stated. Any reproduction, representation, modification, publication or adaptation, in whole or in part, by any means whatsoever, without prior written permission, is prohibited and constitutes an infringement under articles L.335-2 et seq. of the French Intellectual Property Code.</p>
            <p>Works offered as NFTs are sold on the OpenSea platform under its own terms; this website merely links to it.</p>
          </>
        )}

        <h2>{fr ? 'Données personnelles' : 'Personal data'}</h2>
        <p>{fr ? <>Le traitement des données transmises via le formulaire de contact est décrit dans la {lienConf}.</> : <>The processing of data submitted through the contact form is described in the {lienConf}.</>}</p>

        <h2>{fr ? 'Droit applicable' : 'Governing law'}</h2>
        <p>{fr ? "Le présent site est soumis au droit français. En cas de litige, et après une tentative de résolution amiable, les tribunaux français seront seuls compétents." : 'This website is governed by French law. In the event of a dispute, and after an attempt at amicable resolution, the French courts shall have sole jurisdiction.'}</p>
      </PageTexte>
    </>
  )
}

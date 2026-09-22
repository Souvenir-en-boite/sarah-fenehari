import { useEffect, useRef } from 'react'
import { ArrowRight, Mail, MapPin, Instagram } from 'lucide-react'
import { Seo } from '../components/Seo'
import { Container, Bouton, Eyebrow, Image, BandeauCitation } from '../components/ui'
import { reseauxListe } from '../components/Footer'
import { site, details, citations } from '../data/site'
import { textes } from '../i18n/textes'
import { chemin } from '../i18n/routes'

const champClasses =
  'w-full border-b border-line bg-transparent px-0 py-3 text-ink outline-none transition-colors placeholder:text-ink-soft/50 hover:border-ink-soft focus:border-ink'

function Champ({ id, label, type = 'text', requis = false, autoComplete, obligatoire, ...rest }) {
  const Balise = type === 'textarea' ? 'textarea' : 'input'
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="eyebrow text-ink-soft">
        {label}
        {requis && <>{' '}<span aria-hidden="true">*</span><span className="sr-only"> {obligatoire}</span></>}
      </label>
      <Balise id={id} name={label} type={type === 'textarea' ? undefined : type} required={requis} autoComplete={autoComplete} className={champClasses} {...rest} />
    </div>
  )
}

export default function Contact({ langue }) {
  const t = textes[langue]
  const retourRef = useRef(null)
  const cheminMerci = chemin('merci', langue)

  // FormSubmit exige une URL absolue pour `_next` : on la recale sur le domaine
  // réellement visité. La valeur pré-générée sert de repli sans JavaScript.
  useEffect(() => {
    if (retourRef.current) retourRef.current.value = `${window.location.origin}${cheminMerci}`
  }, [cheminMerci])

  const colonnes = [
    { Icon: MapPin, titre: t.contact.atelier, contenu: <span>{site.lieu[langue]}</span> },
    { Icon: Mail, titre: t.contact.email, contenu: <a href={`mailto:${site.email}`} className="underline decoration-line underline-offset-4 hover:decoration-ink">{site.email}</a> },
    {
      Icon: Instagram,
      titre: t.contact.reseaux,
      contenu: (
        <span className="flex flex-wrap justify-center gap-x-3 gap-y-1">
          {reseauxListe.map(({ cle, libelle }) => (
            <a key={cle} href={site.reseaux[cle]} target="_blank" rel="noopener noreferrer" className="underline decoration-line underline-offset-4 hover:decoration-ink">
              {libelle}<span className="sr-only"> {t.nav.nouvelleFenetre}</span>
            </a>
          ))}
        </span>
      ),
    },
  ]

  return (
    <>
      <Seo langue={langue} cle="contact" titre={t.contact.titre} description={t.contact.metaDescription} image={details[79].src} imageAlt={details[79].alt[langue]} />

      <div className="grid gap-4 border-b border-line p-4 sm:grid-cols-2 lg:gap-5 lg:p-5">
        <Image image={details[79]} langue={langue} priorite className="aspect-[16/9] sm:aspect-[4/3]" sizes="(min-width: 640px) 50vw, 100vw" />
        <Image image={details[66]} langue={langue} priorite className="hidden aspect-[4/3] sm:block" sizes="50vw" />
      </div>

      <Container className="py-14 lg:py-20">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow>{t.contact.eyebrow}</Eyebrow>
            <h1 className="mt-5 text-4xl sm:text-5xl">{t.contact.titre}</h1>
            <p className="mt-7 max-w-md leading-relaxed text-ink-soft">{t.contact.chapo}</p>
            <Bouton href="#formulaire" className="mt-10">{t.boutons.contacter}</Bouton>
          </div>

          <div className="lg:col-span-6 lg:col-start-7" id="formulaire">
            <h2 className="eyebrow text-ink-soft" style={{ fontFamily: 'var(--font-sans)' }}>{t.contact.formulaireTitre}</h2>
            <form action={`https://formsubmit.co/${site.email}`} method="POST" className="mt-8 flex flex-col gap-8">
              <input type="hidden" name="_subject" value={t.contact.sujetMail} />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_captcha" value="false" />
              <input ref={retourRef} type="hidden" name="_next" value={`${site.url}${cheminMerci}`} />
              <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

              <div className="grid gap-8 sm:grid-cols-2">
                <Champ id="nom" label={t.contact.nom} requis obligatoire={t.contact.obligatoire} autoComplete="name" />
                <Champ id="email" label={t.contact.emailChamp} type="email" requis obligatoire={t.contact.obligatoire} autoComplete="email" />
              </div>
              <Champ id="sujet" label={t.contact.sujet} requis obligatoire={t.contact.obligatoire} />
              <Champ id="message" label={t.contact.message} type="textarea" requis obligatoire={t.contact.obligatoire} rows={6} placeholder={t.contact.messagePlaceholder} />

              <div className="flex flex-col gap-6 pt-2 sm:flex-row sm:items-center sm:justify-between">
                <button type="submit" className="eyebrow inline-flex items-center justify-center gap-4 border border-ink bg-ink px-6 py-3.5 text-paper transition-colors duration-300 hover:bg-paper hover:text-ink">
                  {t.contact.envoyer}
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
                </button>
                <p className="max-w-xs text-xs leading-relaxed text-ink-soft">
                  {t.contact.rgpd}{' '}
                  <a href={chemin('confidentialite', langue)} className="underline underline-offset-2 hover:text-ink">{t.contact.rgpdLien}</a>.
                </p>
              </div>
            </form>
          </div>
        </div>

        <ul className="mt-20 grid gap-10 border-t border-line pt-12 text-center sm:grid-cols-3 sm:divide-x sm:divide-line">
          {colonnes.map(({ Icon, titre, contenu }) => (
            <li key={titre} className="px-4">
              <Icon className="mx-auto h-5 w-5 text-ink-soft" strokeWidth={1.25} aria-hidden="true" />
              <h2 className="eyebrow mt-4 text-ink-soft" style={{ fontFamily: 'var(--font-sans)' }}>{titre}</h2>
              <p className="mt-2 text-sm text-ink">{contenu}</p>
            </li>
          ))}
        </ul>
      </Container>

      <BandeauCitation texte={citations.contact[langue]} auteur={site.nom} />
    </>
  )
}

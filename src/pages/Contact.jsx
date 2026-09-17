import { useEffect, useRef } from 'react'
import { ArrowRight, Mail } from 'lucide-react'
import { Seo } from '../components/Seo'
import { Container, Eyebrow } from '../components/ui'
import { reseauxListe } from '../components/Footer'
import { site } from '../data/site'
import { textes } from '../i18n/textes'
import { chemin } from '../i18n/routes'

const champClasses =
  'w-full border-b border-line bg-transparent px-0 py-3 text-ink outline-none transition-colors placeholder:text-ink-soft/50 hover:border-ink-soft focus:border-cobalt'

function Champ({ id, label, type = 'text', requis = false, autoComplete, obligatoire, ...rest }) {
  const Balise = type === 'textarea' ? 'textarea' : 'input'
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="eyebrow text-ink-soft">
        {label}
        {requis && (
          <>
            {' '}<span aria-hidden="true">*</span><span className="sr-only"> {obligatoire}</span>
          </>
        )}
      </label>
      <Balise id={id} name={label} type={type === 'textarea' ? undefined : type} required={requis} autoComplete={autoComplete} className={champClasses} {...rest} />
    </div>
  )
}

export default function Contact({ langue }) {
  const t = textes[langue]
  const retourRef = useRef(null)
  const cheminMerci = chemin('merci', langue)

  // FormSubmit exige une URL absolue pour `_next`. On la recale sur le domaine
  // réellement visité : un changement de domaine ne doit pas renvoyer vers une
  // page d'erreur APRÈS l'envoi. La valeur pré-générée sert de repli sans JS.
  useEffect(() => {
    if (retourRef.current) retourRef.current.value = `${window.location.origin}${cheminMerci}`
  }, [cheminMerci])

  return (
    <>
      <Seo langue={langue} cle="contact" titre={t.contact.titre} description={t.contact.metaDescription} />
      <Container className="py-16 lg:py-24">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow>{t.contact.eyebrow}</Eyebrow>
            <h1 className="mt-5 text-5xl sm:text-6xl lg:text-7xl">{t.contact.titre}</h1>
            <p className="mt-7 max-w-md text-lg leading-relaxed text-ink-soft">{t.contact.chapo}</p>

            <h2 className="eyebrow mt-14 text-ink-soft">{t.contact.parMail}</h2>
            <a href={`mailto:${site.email}`} className="mt-3 inline-flex items-center gap-3 text-lg text-ink underline-offset-[6px] hover:underline">
              <Mail className="h-5 w-5 text-ink-soft" aria-hidden="true" />
              {site.email}
            </a>

            <h2 className="eyebrow mt-12 text-ink-soft">{t.contact.suivre}</h2>
            <ul className="mt-4 flex flex-wrap gap-3">
              {reseauxListe.map(({ cle, libelle, Icon }) => (
                <li key={cle}>
                  <a
                    href={site.reseaux[cle]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper"
                  >
                    <Icon className="h-4 w-4" />
                    {libelle}
                    <span className="sr-only"> {t.nav.nouvelleFenetre}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <h2 className="eyebrow text-ink-soft">{t.contact.formulaireTitre}</h2>
            <form action={`https://formsubmit.co/${site.email}`} method="POST" className="mt-8 flex flex-col gap-8">
              <input type="hidden" name="_subject" value={t.contact.sujetMail} />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_captcha" value="false" />
              <input ref={retourRef} type="hidden" name="_next" value={`${site.url}${cheminMerci}`} />
              {/* Piège à robots : un humain ne voit pas ce champ et le laisse vide. */}
              <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

              <div className="grid gap-8 sm:grid-cols-2">
                <Champ id="nom" label={t.contact.nom} requis obligatoire={t.contact.obligatoire} autoComplete="name" />
                <Champ id="email" label={t.contact.email} type="email" requis obligatoire={t.contact.obligatoire} autoComplete="email" />
              </div>
              <Champ id="sujet" label={t.contact.sujet} requis obligatoire={t.contact.obligatoire} />
              <Champ id="message" label={t.contact.message} type="textarea" requis obligatoire={t.contact.obligatoire} rows={6} placeholder={t.contact.messagePlaceholder} />

              <div className="flex flex-col gap-6 pt-2 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  className="eyebrow inline-flex items-center justify-center gap-3 rounded-full border border-ink bg-ink px-8 py-4 text-paper transition-colors duration-300 hover:border-cobalt hover:bg-cobalt"
                >
                  {t.contact.envoyer}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
                <p className="max-w-xs text-xs leading-relaxed text-ink-soft">
                  {t.contact.rgpd}{' '}
                  <a href={chemin('confidentialite', langue)} className="underline underline-offset-2 hover:text-ink">{t.contact.rgpdLien}</a>.
                </p>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </>
  )
}

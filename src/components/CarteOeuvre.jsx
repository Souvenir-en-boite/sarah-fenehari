import { Tondo } from './Tondo'
import { techniques } from '../data/series'

export const techniqueDe = (o, langue) => (langue === 'fr' ? o.technique : techniques[o.technique] ?? o.technique)

/**
 * Cartel d'une œuvre, comme sur les maquettes : titre en petites capitales,
 * puis « Ø 100 cm | Acrylique sur toile » et l'année.
 */
export function Cartel({ oeuvre, langue, t, className = '', clair = false }) {
  return (
    <span className={`block ${className}`}>
      <span className={`titre-oeuvre block ${clair ? 'text-paper' : 'text-ink'}`}>{oeuvre.titre}</span>
      <span className={`mt-1.5 block text-xs ${clair ? 'text-paper/65' : 'text-ink-soft'}`}>
        {t.galerie.diametre(oeuvre.cm)} <span aria-hidden="true" className="mx-1.5">|</span> {techniqueDe(oeuvre, langue)}
      </span>
      <span className={`mt-0.5 block text-xs ${clair ? 'text-paper/65' : 'text-ink-soft'}`}>{oeuvre.annee}</span>
    </span>
  )
}

/**
 * Carte d'œuvre : la toile posée dans un carré gris, le cartel dessous.
 * C'est un bouton (ouvre la visionneuse) ou un simple bloc (`onClick` absent).
 */
export function CarteOeuvre({ oeuvre, langue, t, onClick, priorite = false, sizes, className = '' }) {
  const contenu = (
    <>
      <Tondo oeuvre={oeuvre} langue={langue} mat priorite={priorite} sizes={sizes} className="transition-transform duration-500 group-hover:scale-[1.02]" />
      <Cartel oeuvre={oeuvre} langue={langue} t={t} className="mt-5" />
    </>
  )
  if (!onClick) return <div className={`group ${className}`}>{contenu}</div>
  return (
    <button type="button" onClick={onClick} className={`group block w-full text-left ${className}`}>
      {contenu}
      <span className="sr-only">{t.galerie.agrandir}</span>
    </button>
  )
}

import couleurs from '../data/couleurs.json'

/** Couleur dominante d'une image, extraite au build (npm run couleurs). */
export const teinteDe = (src) => couleurs[src]?.dominante ?? '#5c5a63'
export const paletteDe = (src) => couleurs[src]?.palette ?? [teinteDe(src)]

/**
 * Une toile ronde. L'image est un AVIF carré à fond transparent : le cercle,
 * c'est l'image elle-même. Options : `mat` pose la toile dans un carré gris
 * clair (les cartes des maquettes), `ombre` la décolle du mur d'une ombre portée.
 */
export function Tondo({ oeuvre, langue, className = '', style, priorite = false, mat = false, ombre = false, sizes }) {
  const alt = typeof oeuvre.alt === 'string' ? oeuvre.alt : oeuvre.alt[langue]
  const image = (
    <span className={`tondo block ${ombre ? 'tondo-ombre' : ''}`} style={{ '--teinte': teinteDe(oeuvre.src) }}>
      <img
        src={oeuvre.src}
        alt={alt}
        width={oeuvre.width}
        height={oeuvre.height}
        sizes={sizes}
        loading={priorite ? 'eager' : 'lazy'}
        fetchpriority={priorite ? 'high' : undefined}
        decoding="async"
        className="block h-auto w-full rounded-full"
      />
    </span>
  )
  if (mat) {
    return <span className={`mat block ${className}`} style={style}>{image}</span>
  }
  return <span className={`block ${className}`} style={style}>{image}</span>
}

import couleurs from '../data/couleurs.json'

/** Couleur dominante d'une image, extraite au build (npm run couleurs). */
export const teinteDe = (src) => couleurs[src]?.dominante ?? '#5c5a63'
export const paletteDe = (src) => couleurs[src]?.palette ?? [teinteDe(src)]

/**
 * Une toile ronde. L'image est un AVIF carré à fond transparent : le cercle,
 * c'est l'image elle-même. Le composant ajoute le halo de sa couleur
 * dominante et, en option, la dérive lente (une rotation en trois minutes).
 */
export function Tondo({ oeuvre, langue, className = '', style, priorite = false, tourne = false, sizes }) {
  const alt = typeof oeuvre.alt === 'string' ? oeuvre.alt : oeuvre.alt[langue]
  return (
    <span className={`tondo block ${className}`} style={{ '--teinte': teinteDe(oeuvre.src), ...style }}>
      <img
        src={oeuvre.src}
        alt={alt}
        width={oeuvre.width}
        height={oeuvre.height}
        sizes={sizes}
        loading={priorite ? 'eager' : 'lazy'}
        fetchpriority={priorite ? "high" : undefined}
        decoding="async"
        className={`block h-auto w-full rounded-full ${tourne ? 'motion-safe:animate-derive' : ''}`}
      />
    </span>
  )
}

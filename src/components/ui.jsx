import { Link } from 'react-router-dom'

export function Container({ children, className = '', ...rest }) {
  return (
    <div className={`mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-12 ${className}`} {...rest}>
      {children}
    </div>
  )
}

const variantes = {
  plein: 'bg-ink text-paper border border-ink hover:bg-cobalt hover:border-cobalt',
  contour: 'border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-paper',
  contourClair: 'border border-paper/40 text-paper hover:bg-paper hover:text-ink',
  lien: 'text-ink underline underline-offset-[6px] decoration-line hover:decoration-ink px-0 py-0',
}

/**
 * Bouton unique pour les trois usages : lien interne, lien externe ou vrai
 * bouton. Jamais un <div> cliquable : le clavier et les lecteurs d'écran ont
 * besoin du bon élément.
 */
export function Bouton({ to, href, variante = 'plein', className = '', children, ...rest }) {
  const base = variante === 'lien' ? 'inline-flex items-center gap-2' : 'inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-full px-7 py-3.5'
  const classes = `${base} eyebrow transition-colors duration-300 ${variantes[variante]} ${className}`
  if (to) return <Link to={to} className={classes} {...rest}>{children}</Link>
  if (href) return <a href={href} className={classes} {...rest}>{children}</a>
  return <button type="button" className={classes} {...rest}>{children}</button>
}

export function Eyebrow({ children, className = '', as: Balise = 'p' }) {
  return <Balise className={`eyebrow text-ink-soft ${className}`}>{children}</Balise>
}

/**
 * Titre de section : libellé en capitales, titre serif, point de couleur.
 * `niveau` vaut 2 par défaut ; 1 quand ce bloc porte le titre principal.
 */
export function TitreSection({ eyebrow, titre, description, niveau = 2, className = '', centre = false }) {
  const Titre = `h${niveau}`
  return (
    <div className={`${centre ? 'mx-auto text-center' : ''} max-w-3xl ${className}`}>
      {eyebrow && <Eyebrow className="mb-5">{eyebrow}</Eyebrow>}
      <Titre className={niveau === 1 ? 'text-5xl sm:text-6xl lg:text-7xl' : 'text-3xl sm:text-4xl lg:text-5xl'}>{titre}</Titre>
      {description && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">{description}</p>}
    </div>
  )
}

/** Petit point rond : la ponctuation graphique du site. */
export function Point({ className = '' }) {
  return <span aria-hidden="true" className={`inline-block h-1.5 w-1.5 rounded-full bg-current ${className}`} />
}

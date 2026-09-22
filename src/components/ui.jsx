import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export function Container({ children, className = '', ...rest }) {
  return (
    <div className={`mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-14 ${className}`} {...rest}>
      {children}
    </div>
  )
}

const variantes = {
  // Filaire rectangulaire, comme sur les maquettes.
  contour: 'border border-ink/60 text-ink hover:bg-ink hover:text-paper',
  plein: 'border border-ink bg-ink text-paper hover:bg-paper hover:text-ink',
  contourClair: 'border border-paper/50 text-paper hover:bg-paper hover:text-ink',
  // Simple libellé souligné suivi d'une flèche : « EN SAVOIR PLUS → ».
  lien: 'text-ink underline decoration-line underline-offset-[7px] hover:decoration-ink px-0 py-0',
}

/**
 * Bouton unique pour les trois usages : lien interne, lien externe ou vrai
 * bouton. Une flèche suit toujours le libellé (`fleche={false}` pour l'omettre).
 */
export function Bouton({ to, href, variante = 'contour', fleche = true, className = '', children, ...rest }) {
  const base = variante === 'lien' ? 'inline-flex items-center gap-3' : 'inline-flex items-center justify-center gap-4 whitespace-nowrap px-6 py-3.5'
  const classes = `${base} eyebrow transition-colors duration-300 ${variantes[variante]} ${className}`
  const contenu = (
    <>
      {children}
      {fleche && <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />}
    </>
  )
  if (to) return <Link to={to} className={classes} {...rest}>{contenu}</Link>
  if (href) return <a href={href} className={classes} {...rest}>{contenu}</a>
  return <button type="button" className={classes} {...rest}>{contenu}</button>
}

export function Eyebrow({ children, className = '', filet = false, as: Balise = 'p' }) {
  return <Balise className={`eyebrow text-ink-soft ${filet ? 'eyebrow-filet' : ''} ${className}`}>{children}</Balise>
}

/**
 * Titre de section : surtitre en capitales, titre serif en capitales.
 * `niveau` vaut 2 par défaut ; 1 quand ce bloc porte le titre principal.
 */
export function TitreSection({ eyebrow, titre, description, niveau = 2, className = '', centre = false, filet = false }) {
  const Titre = `h${niveau}`
  return (
    <div className={`${centre ? 'mx-auto text-center' : ''} max-w-3xl ${className}`}>
      {eyebrow && <Eyebrow filet={filet && !centre} className="mb-5">{eyebrow}</Eyebrow>}
      <Titre className={niveau === 1 ? 'text-4xl sm:text-5xl lg:text-6xl' : 'text-3xl sm:text-4xl lg:text-[2.75rem]'}>{titre}</Titre>
      {description && <p className="mt-6 max-w-2xl leading-relaxed text-ink-soft">{description}</p>}
    </div>
  )
}

/** Encadré de citation sur fond gris clair, comme sur les maquettes. */
export function EncadreCitation({ texte, auteur, className = '' }) {
  return (
    <blockquote className={`bg-paper-deep px-8 py-10 sm:px-12 sm:py-12 ${className}`}>
      <p className="citation text-2xl text-ink sm:text-[1.75rem]">« {texte} »</p>
      {auteur && <footer className="eyebrow mt-6 text-ink-soft">{auteur}</footer>}
    </blockquote>
  )
}

/** Bandeau noir de citation, centré, pour clore une page. */
export function BandeauCitation({ texte, auteur }) {
  return (
    <section className="bg-night px-6 py-16 text-center text-paper sm:py-20">
      <blockquote className="mx-auto max-w-3xl">
        <p className="citation text-2xl sm:text-3xl">« {texte} »</p>
        {auteur && <footer className="eyebrow mt-7 text-paper/60">{auteur}</footer>}
      </blockquote>
    </section>
  )
}

/** Image d'ambiance : un détail de toile, une vue d'accrochage. */
export function Image({ image, langue, className = '', imgClassName = '', priorite = false, sizes }) {
  const alt = typeof image.alt === 'string' ? image.alt : image.alt[langue]
  return (
    <img
      src={image.src}
      alt={alt}
      width={image.width}
      height={image.height}
      sizes={sizes}
      loading={priorite ? 'eager' : 'lazy'}
      fetchpriority={priorite ? 'high' : undefined}
      decoding="async"
      className={`block h-auto w-full object-cover ${className} ${imgClassName}`}
    />
  )
}

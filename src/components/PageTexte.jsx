import { Container, Eyebrow } from './ui'

/**
 * Gabarit des pages rédactionnelles (légal, confirmation, erreur). `actions`
 * reçoit les boutons de fin de page, hors du bloc de prose dont le style de
 * lien les écraserait.
 */
export function PageTexte({ eyebrow, titre, chapo, children, actions }) {
  return (
    <Container className="py-16 lg:py-24">
      <div className="mx-auto max-w-[46rem]">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h1 className="mt-4 text-4xl sm:text-5xl">{titre}</h1>
        {chapo && <p className="mt-7 text-lg leading-relaxed text-ink-soft">{chapo}</p>}
        <div className="prose-site mt-10">{children}</div>
        {actions && <div className="mt-12 flex flex-col gap-3 sm:flex-row">{actions}</div>}
      </div>
    </Container>
  )
}

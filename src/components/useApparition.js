import { useEffect } from 'react'

/**
 * Fait apparaître en douceur les éléments `.apparait` quand ils entrent dans
 * l'écran. Sans JavaScript (ou avant son chargement), le HTML pré-rendu est
 * visible tel quel : la classe `visible` est ajoutée d'un coup à tous les
 * éléments si IntersectionObserver n'existe pas.
 */
export function useApparition() {
  useEffect(() => {
    const elements = document.querySelectorAll('.apparait')
    if (!('IntersectionObserver' in window)) {
      elements.forEach((el) => el.classList.add('visible'))
      return
    }
    const observateur = new IntersectionObserver(
      (entrees) => {
        for (const e of entrees) {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
            observateur.unobserve(e.target)
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px' },
    )
    elements.forEach((el) => observateur.observe(el))
    return () => observateur.disconnect()
  }, [])
}

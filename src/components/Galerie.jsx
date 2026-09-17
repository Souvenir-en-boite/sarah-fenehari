import { useCallback, useEffect, useRef, useState } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { Tondo, teinteDe } from './Tondo'
import { techniques } from '../data/series'
import { useLangue } from '../i18n/LangueContext'

export const techniqueDe = (o, langue) => (langue === 'fr' ? o.technique : techniques[o.technique] ?? o.technique)

/** Légende d'une œuvre : « 2024 · Ø 30 cm · Acrylique sur toile ». */
export function Legende({ oeuvre, langue, t, technique = false, className = '' }) {
  const morceaux = [oeuvre.annee, t.galerie.diametre(oeuvre.cm)]
  if (technique) morceaux.push(techniqueDe(oeuvre, langue))
  return <p className={`text-sm text-ink-soft ${className}`}>{morceaux.join(' · ')}</p>
}

/**
 * Deux affichages pour la même série :
 *   - la grille : toutes les toiles au même diamètre, régulières comme un
 *     catalogue ;
 *   - à l'échelle : chaque toile à la taille de son diamètre réel
 *     (--px-par-cm posé sur le conteneur), centrées sur une même ligne de
 *     regard, comme sur le mur d'une exposition.
 */
export function Galerie({ oeuvres }) {
  const { langue, t } = useLangue()
  const [mode, setMode] = useState('grille')
  const [indexActif, setIndexActif] = useState(null)

  return (
    <>
      <div className="flex flex-col gap-4 border-y border-line py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-ink-soft">{t.galerie.oeuvres(oeuvres.length)}</p>
        <div role="group" aria-label={t.galerie.modeLibelle} className="inline-flex rounded-full border border-line p-1">
          {[['grille', t.galerie.modeGrille], ['echelle', t.galerie.modeEchelle]].map(([cle, libelle]) => (
            <button
              key={cle}
              type="button"
              onClick={() => setMode(cle)}
              aria-pressed={mode === cle}
              className={`eyebrow rounded-full px-4 py-2 transition-colors ${mode === cle ? 'bg-ink text-paper' : 'text-ink-soft hover:text-ink'}`}
            >
              {libelle}
            </button>
          ))}
        </div>
      </div>

      {mode === 'echelle' && <p className="mt-6 max-w-2xl text-sm text-ink-soft">{t.galerie.echelleNote}</p>}

      {mode === 'grille' ? (
        <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 sm:gap-x-8 lg:grid-cols-4 lg:gap-x-10">
          {oeuvres.map((o, i) => (
            <li key={o.src} className="group">
              <button type="button" onClick={() => setIndexActif(i)} className="block w-full text-left">
                <Tondo oeuvre={o} langue={langue} priorite={i < 4} className="transition-transform duration-500 group-hover:scale-[1.03]" sizes="(min-width: 1024px) 22vw, (min-width: 640px) 30vw, 45vw" />
                <span className="titre-oeuvre mt-5 block text-2xl text-ink">{o.titre}</span>
                <Legende oeuvre={o} langue={langue} t={t} className="mt-1" />
                <span className="sr-only">{t.galerie.agrandir}</span>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <ul
          className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-14 sm:gap-x-12"
          style={{ '--px-par-cm': 'clamp(2.4px, 0.42vw, 4.4px)' }}
        >
          {oeuvres.map((o, i) => (
            <li key={o.src} className="group flex flex-col items-center" style={{ width: `calc(${o.cm} * var(--px-par-cm))` }}>
              <button type="button" onClick={() => setIndexActif(i)} className="block w-full">
                <Tondo oeuvre={o} langue={langue} className="transition-transform duration-500 group-hover:scale-[1.03]" sizes="(min-width: 1024px) 440px, 45vw" />
                <span className="sr-only">{o.titre}, {t.galerie.diametre(o.cm)}. {t.galerie.agrandir}</span>
              </button>
              <span aria-hidden="true" className="mt-4 whitespace-nowrap text-xs text-ink-soft">{o.numero} · {o.cm} cm</span>
            </li>
          ))}
        </ul>
      )}

      {indexActif !== null && <Visionneuse oeuvres={oeuvres} index={indexActif} setIndex={setIndexActif} />}
    </>
  )
}

/**
 * Visionneuse plein écran. Le fond prend une version très sombre de la couleur
 * dominante de la toile affichée : chaque œuvre éclaire sa propre salle.
 */
function Visionneuse({ oeuvres, index, setIndex }) {
  const { langue, t } = useLangue()
  const dialogueRef = useRef(null)
  const fermerRef = useRef(null)
  const total = oeuvres.length
  const oeuvre = oeuvres[index]

  const departGeste = useRef(null)
  const [decalage, setDecalage] = useState(0)
  const [enGeste, setEnGeste] = useState(false)
  const [sensEntree, setSensEntree] = useState(null)

  const fermer = useCallback(() => setIndex(null), [setIndex])
  const precedente = useCallback(() => { setSensEntree('gauche'); setIndex((i) => (i - 1 + total) % total) }, [setIndex, total])
  const suivante = useCallback(() => { setSensEntree('droite'); setIndex((i) => (i + 1) % total) }, [setIndex, total])

  const debutGeste = (e) => {
    const p = e.changedTouches[0]
    departGeste.current = { x: p.clientX, y: p.clientY, horizontal: null }
    setEnGeste(true)
  }
  const mouvementGeste = (e) => {
    const d = departGeste.current
    if (!d) return
    const p = e.changedTouches[0]
    const dx = p.clientX - d.x, dy = p.clientY - d.y
    if (d.horizontal === null && (Math.abs(dx) > 8 || Math.abs(dy) > 8)) d.horizontal = Math.abs(dx) > Math.abs(dy)
    if (d.horizontal) setDecalage(dx)
  }
  const finGeste = (e) => {
    const d = departGeste.current
    departGeste.current = null
    setEnGeste(false)
    setDecalage(0)
    if (!d || !d.horizontal) return
    const dx = e.changedTouches[0].clientX - d.x
    if (Math.abs(dx) < 50) return
    if (dx < 0) suivante(); else precedente()
  }

  useEffect(() => {
    const elementPrecedent = document.activeElement
    fermerRef.current?.focus()
    const overflowInitial = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const surTouche = (e) => {
      if (e.key === 'Escape') return fermer()
      if (e.key === 'ArrowLeft') return precedente()
      if (e.key === 'ArrowRight') return suivante()
      if (e.key !== 'Tab') return
      const focusables = dialogueRef.current.querySelectorAll('button')
      const premier = focusables[0], dernier = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === premier) { e.preventDefault(); dernier.focus() }
      else if (!e.shiftKey && document.activeElement === dernier) { e.preventDefault(); premier.focus() }
    }
    document.addEventListener('keydown', surTouche)
    return () => {
      document.removeEventListener('keydown', surTouche)
      document.body.style.overflow = overflowInitial
      elementPrecedent?.focus?.()
    }
  }, [fermer, precedente, suivante])

  const teinte = teinteDe(oeuvre.src)
  const boutonLateral = 'absolute z-10 shrink-0 rounded-full border border-paper/15 bg-night/40 p-3 text-paper backdrop-blur-sm transition-colors hover:bg-paper hover:text-ink sm:static sm:bg-transparent sm:backdrop-blur-none'

  return (
    <div
      ref={dialogueRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${t.galerie.visionneuse} — ${oeuvre.titre}, ${t.galerie.position(index + 1, total)}`}
      className="fixed inset-0 z-50 flex flex-col text-paper transition-colors duration-700"
      style={{ backgroundColor: `color-mix(in oklab, ${teinte} 28%, #0e0d12)` }}
    >
      <div className="flex items-center justify-between px-5 py-4">
        <p className="eyebrow text-paper/70" aria-live="polite">{index + 1} / {total}</p>
        <button ref={fermerRef} type="button" onClick={fermer} className="-mr-2 rounded-full p-2 transition-colors hover:bg-paper hover:text-ink">
          <X className="h-7 w-7" aria-hidden="true" />
          <span className="sr-only">{t.galerie.fermer}</span>
        </button>
      </div>

      <div
        className="relative flex min-h-0 flex-1 items-center justify-center px-3 sm:gap-8 sm:px-8"
        onTouchStart={debutGeste}
        onTouchMove={mouvementGeste}
        onTouchEnd={finGeste}
        onTouchCancel={finGeste}
      >
        <button type="button" onClick={precedente} className={`left-2 ${boutonLateral}`}>
          <ChevronLeft className="h-7 w-7" aria-hidden="true" />
          <span className="sr-only">{t.galerie.precedente}</span>
        </button>

        <div
          key={index}
          className={`flex h-full max-h-[min(78vh,78vw)] w-full max-w-[min(78vh,78vw)] items-center justify-center ${
            !decalage && sensEntree === 'droite' ? 'entre-de-droite' : !decalage && sensEntree === 'gauche' ? 'entre-de-gauche' : ''
          }`}
          style={{
            transform: decalage ? `translateX(${decalage * 0.6}px)` : undefined,
            opacity: decalage ? Math.max(0.4, 1 - Math.abs(decalage) / 420) : undefined,
            transition: enGeste ? 'none' : 'transform 220ms ease-out, opacity 220ms ease-out',
          }}
        >
          <img
            src={oeuvre.src}
            alt={oeuvre.alt[langue]}
            width={oeuvre.width}
            height={oeuvre.height}
            className="max-h-full w-auto max-w-full rounded-full shadow-[0_40px_120px_-20px_rgba(0,0,0,.7)]"
          />
        </div>

        <button type="button" onClick={suivante} className={`right-2 ${boutonLateral}`}>
          <ChevronRight className="h-7 w-7" aria-hidden="true" />
          <span className="sr-only">{t.galerie.suivante}</span>
        </button>
      </div>

      <div className="flex flex-col items-center gap-1 px-5 pb-8 pt-4 text-center">
        <p className="titre-oeuvre text-3xl">{oeuvre.titre}</p>
        <p className="text-sm text-paper/75">{oeuvre.annee} · {t.galerie.diametre(oeuvre.cm)} · {techniqueDe(oeuvre, langue)}</p>
      </div>
    </div>
  )
}

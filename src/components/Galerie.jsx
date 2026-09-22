import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { Tondo, teinteDe } from './Tondo'
import { CarteOeuvre, techniqueDe } from './CarteOeuvre'
import { useLangue } from '../i18n/LangueContext'

// Bornes des formats, en centimètres de diamètre.
const FORMATS = {
  grands: (cm) => cm >= 80,
  moyens: (cm) => cm >= 50 && cm < 80,
  petits: (cm) => cm < 50,
}

function Filtre({ actif, onClick, children, count }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={actif}
      className={`eyebrow relative py-2 transition-colors ${actif ? 'text-ink' : 'text-ink-soft hover:text-ink'} after:absolute after:left-0 after:right-0 after:-bottom-px after:h-px after:bg-ink after:transition-transform ${actif ? 'after:scale-x-100' : 'after:scale-x-0'}`}
    >
      {children}
      {count !== undefined && <span className="ml-1.5 text-[0.6rem] tracking-normal text-ink-soft">{count}</span>}
    </button>
  )
}

/**
 * Toutes les œuvres, filtrables par format et par année, en grille de cartes
 * ou « à l'échelle » (chaque toile à la taille de son diamètre réel).
 */
export function Galerie({ oeuvres }) {
  const { langue, t } = useLangue()
  const [format, setFormat] = useState('toutes')
  const [annee, setAnnee] = useState('toutes')
  const [mode, setMode] = useState('grille')
  const [indexActif, setIndexActif] = useState(null)

  const annees = useMemo(() => [...new Set(oeuvres.map((o) => o.annee))].sort((a, b) => b - a), [oeuvres])
  const visibles = useMemo(
    () => oeuvres.filter((o) => (format === 'toutes' || FORMATS[format](o.cm)) && (annee === 'toutes' || o.annee === annee)),
    [oeuvres, format, annee],
  )
  const compter = (f) => oeuvres.filter((o) => (f === 'toutes' || FORMATS[f](o.cm)) && (annee === 'toutes' || o.annee === annee)).length

  return (
    <>
      <div className="border-y border-line py-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div role="group" aria-label={t.galerie.filtreLibelle} className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {[['toutes', t.galerie.toutes], ['grands', t.galerie.grandsFormats], ['moyens', t.galerie.moyensFormats], ['petits', t.galerie.petitsFormats]].map(([cle, libelle], i) => (
              <span key={cle} className="flex items-center gap-6">
                {i > 0 && <span aria-hidden="true" className="text-line">/</span>}
                <Filtre actif={format === cle} onClick={() => setFormat(cle)} count={compter(cle)}>{libelle}</Filtre>
              </span>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <label className="flex items-center gap-3">
              <span className="eyebrow text-ink-soft">{langue === 'fr' ? 'Année' : 'Year'}</span>
              <select
                value={annee}
                onChange={(e) => setAnnee(e.target.value === 'toutes' ? 'toutes' : Number(e.target.value))}
                className="eyebrow cursor-pointer border-b border-line bg-transparent py-1 pr-6 text-ink outline-none hover:border-ink focus:border-ink"
              >
                <option value="toutes">{t.galerie.toutes}</option>
                {annees.map((a) => <option key={a} value={a}>{a}</option>)}
              </select>
            </label>
            <div role="group" aria-label={t.galerie.modeLibelle} className="flex items-center gap-4 border-l border-line pl-6">
              <Filtre actif={mode === 'grille'} onClick={() => setMode('grille')}>{t.galerie.modeGrille}</Filtre>
              <Filtre actif={mode === 'echelle'} onClick={() => setMode('echelle')}>{t.galerie.modeEchelle}</Filtre>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-4 text-xs text-ink-soft" aria-live="polite">
        {t.galerie.oeuvres(visibles.length)}{format !== 'toutes' && ` · ${t.galerie.formatNote}`}{mode === 'echelle' && ` · ${t.galerie.echelleNote}`}
      </p>

      {visibles.length === 0 && <p className="mt-12 text-ink-soft">{t.galerie.aucune}</p>}

      {mode === 'grille' ? (
        <ul className="mt-10 grid grid-cols-2 gap-x-5 gap-y-12 sm:gap-x-8 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-16">
          {visibles.map((o, i) => (
            <li key={o.src}>
              <CarteOeuvre oeuvre={o} langue={langue} t={t} onClick={() => setIndexActif(i)} priorite={i < 3} sizes="(min-width: 1024px) 30vw, 45vw" />
            </li>
          ))}
        </ul>
      ) : (
        <ul className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-14 sm:gap-x-12" style={{ '--px-par-cm': 'clamp(2.4px, 0.42vw, 4.4px)' }}>
          {visibles.map((o, i) => (
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

      {indexActif !== null && <Visionneuse oeuvres={visibles} index={indexActif} setIndex={setIndexActif} />}
    </>
  )
}

/** Visionneuse plein écran : le fond prend une version sombre de la couleur dominante de la toile. */
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

  const debutGeste = (e) => { const p = e.changedTouches[0]; departGeste.current = { x: p.clientX, y: p.clientY, horizontal: null }; setEnGeste(true) }
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
  const boutonLateral = 'absolute z-10 shrink-0 border border-paper/20 bg-night/40 p-3 text-paper backdrop-blur-sm transition-colors hover:bg-paper hover:text-ink sm:static sm:bg-transparent sm:backdrop-blur-none'

  return (
    <div
      ref={dialogueRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${t.galerie.visionneuse} — ${oeuvre.titre}, ${t.galerie.position(index + 1, total)}`}
      className="fixed inset-0 z-50 flex flex-col text-paper transition-colors duration-700"
      style={{ backgroundColor: `color-mix(in oklab, ${teinte} 28%, #141316)` }}
    >
      <div className="flex items-center justify-between px-5 py-4">
        <p className="eyebrow text-paper/70" aria-live="polite">{index + 1} / {total}</p>
        <button ref={fermerRef} type="button" onClick={fermer} className="-mr-2 p-2 transition-colors hover:bg-paper hover:text-ink">
          <X className="h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
          <span className="sr-only">{t.galerie.fermer}</span>
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-3 sm:gap-8 sm:px-8" onTouchStart={debutGeste} onTouchMove={mouvementGeste} onTouchEnd={finGeste} onTouchCancel={finGeste}>
        <button type="button" onClick={precedente} className={`left-2 ${boutonLateral}`}>
          <ChevronLeft className="h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
          <span className="sr-only">{t.galerie.precedente}</span>
        </button>

        <div
          key={index}
          className={`flex h-full max-h-[min(76vh,76vw)] w-full max-w-[min(76vh,76vw)] items-center justify-center ${!decalage && sensEntree === 'droite' ? 'entre-de-droite' : !decalage && sensEntree === 'gauche' ? 'entre-de-gauche' : ''}`}
          style={{
            transform: decalage ? `translateX(${decalage * 0.6}px)` : undefined,
            opacity: decalage ? Math.max(0.4, 1 - Math.abs(decalage) / 420) : undefined,
            transition: enGeste ? 'none' : 'transform 220ms ease-out, opacity 220ms ease-out',
          }}
        >
          <img src={oeuvre.src} alt={oeuvre.alt[langue]} width={oeuvre.width} height={oeuvre.height} className="max-h-full w-auto max-w-full rounded-full shadow-[0_40px_120px_-20px_rgba(0,0,0,.7)]" />
        </div>

        <button type="button" onClick={suivante} className={`right-2 ${boutonLateral}`}>
          <ChevronRight className="h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
          <span className="sr-only">{t.galerie.suivante}</span>
        </button>
      </div>

      <div className="flex flex-col items-center gap-1.5 px-5 pb-8 pt-4 text-center">
        <p className="titre-oeuvre text-sm">{oeuvre.titre}</p>
        <p className="text-xs text-paper/70">{t.galerie.diametre(oeuvre.cm)} <span aria-hidden="true" className="mx-1.5">|</span> {techniqueDe(oeuvre, langue)} <span aria-hidden="true" className="mx-1.5">|</span> {oeuvre.annee}</p>
      </div>
    </div>
  )
}

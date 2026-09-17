// Séries et œuvres de la galerie.
//
// Une série = une sous-page (/galerie/<cle>, /en/gallery/<cle>). La clé sert
// d'adresse dans les deux langues : courte, en minuscules, sans accent. Le
// titre et la description, eux, sont traduits.
//
// Les œuvres de la série « Composition » sont des TONDOS (toiles rondes).
// Les images sont des AVIF carrés de 1280 px à fond transparent, produits par
// scripts/detourer-tondos.mjs à partir des photos du site Wix (septembre
// 2026) ; les métadonnées (année, diamètre, technique) viennent des légendes
// de la galerie Wix.
//
// Pour ajouter une œuvre :
//   1. node scripts/detourer-tondos.mjs <photo.jpg> --sortie public/assets/picture/composition
//      (le fichier prend le nom de la photo : nommer la photo composition-82.jpg)
//   2. ajouter une ligne oeuvre(numéro, année, diamètre en cm, technique) ci-dessous
//   3. npm run couleurs   (extrait la palette de la nouvelle image)

const TAILLE = 1280 // côté des AVIF produits par detourer-tondos.mjs

// Traductions des techniques rencontrées. Une technique absente d'ici est
// affichée telle quelle dans les deux langues.
export const techniques = {
  'Acrylique sur toile': 'Acrylic on canvas',
  'Acrylique sur toile, pigments': 'Acrylic on canvas, pigments',
  'Acrylique sur toile, pigment': 'Acrylic on canvas, pigment',
  'Acrylique sur toile, résine': 'Acrylic on canvas, resin',
}

function oeuvre(numero, annee, cm, technique) {
  const titre = `Composition ${numero}`
  return {
    numero,
    titre,
    annee,
    // Diamètre de la toile, en centimètres. Sert à l'affichage « à l'échelle ».
    cm,
    technique,
    src: `/assets/picture/composition/composition-${numero.toLowerCase()}.avif`,
    width: TAILLE,
    height: TAILLE,
    alt: {
      fr: `${titre} (${annee}), tondo de ${cm} cm, ${technique.toLowerCase()}`,
      en: `${titre} (${annee}), ${cm} cm tondo, ${(techniques[technique] ?? technique).toLowerCase()}`,
    },
  }
}

export const series = [
  {
    cle: 'composition',
    titre: { fr: 'Composition', en: 'Composition' },
    // Format commun à toute la série, affiché dans sa présentation.
    format: { fr: 'Tondos, acrylique sur toile', en: 'Tondos, acrylic on canvas' },
    description: {
      fr: "Des toiles rondes où la couleur jaillit d'un centre, libérée de toute figuration. Chacun y projette ses propres formes, ou s'abandonne à l'expérience.",
      en: 'Round canvases where colour bursts from a centre, freed from all figuration. Each viewer projects their own shapes onto them, or surrenders to the experience.',
    },
    // Œuvres, de la plus récente à la plus ancienne.
    oeuvres: [
    oeuvre('81', 2024, 30, 'Acrylique sur toile, pigment'),
    oeuvre('80', 2024, 100, 'Acrylique sur toile, pigments'),
    oeuvre('79', 2024, 70, 'Acrylique sur toile, pigments'),
    oeuvre('78', 2024, 40, 'Acrylique sur toile'),
    oeuvre('77', 2024, 80, 'Acrylique sur toile'),
    oeuvre('76', 2024, 80, 'Acrylique sur toile, pigments'),
    oeuvre('75', 2024, 30, 'Acrylique sur toile'),
    oeuvre('74', 2024, 70, 'Acrylique sur toile'),
    oeuvre('73', 2024, 100, 'Acrylique sur toile'),
    oeuvre('72', 2024, 50, 'Acrylique sur toile'),
    oeuvre('71', 2024, 40, 'Acrylique sur toile'),
    oeuvre('70', 2024, 100, 'Acrylique sur toile'),
    oeuvre('69', 2024, 100, 'Acrylique sur toile'),
    oeuvre('68', 2023, 80, 'Acrylique sur toile'),
    oeuvre('67', 2023, 100, 'Acrylique sur toile'),
    oeuvre('66', 2023, 100, 'Acrylique sur toile'),
    oeuvre('65', 2023, 80, 'Acrylique sur toile'),
    oeuvre('64', 2023, 100, 'Acrylique sur toile'),
    oeuvre('R', 2023, 100, 'Acrylique sur toile'),
    oeuvre('62', 2022, 70, 'Acrylique sur toile'),
    oeuvre('61', 2022, 80, 'Acrylique sur toile'),
    oeuvre('60', 2022, 100, 'Acrylique sur toile'),
    oeuvre('59', 2022, 50, 'Acrylique sur toile'),
    oeuvre('58', 2022, 100, 'Acrylique sur toile'),
    oeuvre('57', 2020, 100, 'Acrylique sur toile'),
    oeuvre('56', 2020, 50, 'Acrylique sur toile'),
    oeuvre('55', 2020, 40, 'Acrylique sur toile, résine'),
    oeuvre('54', 2020, 80, 'Acrylique sur toile'),
    oeuvre('53', 2020, 50, 'Acrylique sur toile'),
    oeuvre('52', 2019, 100, 'Acrylique sur toile'),
    oeuvre('51', 2019, 50, 'Acrylique sur toile, résine'),
    oeuvre('50', 2019, 100, 'Acrylique sur toile, résine'),
    oeuvre('48', 2019, 100, 'Acrylique sur toile, résine'),
    oeuvre('43', 2019, 20, 'Acrylique sur toile, pigments'),
    oeuvre('41', 2019, 30, 'Acrylique sur toile, résine'),
    oeuvre('39', 2019, 20, 'Acrylique sur toile, résine'),
    ],
  },
]

export const serieParCle = (cle) => series.find((s) => s.cle === cle)

/** Toutes les œuvres, toutes séries confondues, avec la clé de leur série. */
export const toutesLesOeuvres = series.flatMap((s) => s.oeuvres.map((o) => ({ ...o, serie: s.cle })))

/** Première et dernière année d'une série : « 2019 – 2024 ». */
export function periode(serie) {
  const annees = serie.oeuvres.map((o) => o.annee)
  const min = Math.min(...annees)
  const max = Math.max(...annees)
  return min === max ? String(min) : `${min} – ${max}`
}

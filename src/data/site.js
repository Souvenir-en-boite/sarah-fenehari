// Point unique de vérité pour l'identité du site, les coordonnées et les
// réseaux. Modifier ici met à jour l'en-tête, le pied de page, la page
// contact, les données structurées Google et le plan du site.
//
// Les valeurs marquées « À CONFIRMER » sont provisoires : la liste complète
// des questions à poser à Sarah est dans QUESTIONS.md.

export const site = {
  nom: 'Sarah Fenehari',
  prenom: 'Sarah',
  nomDeFamille: 'Fenehari',
  // À CONFIRMER : l'adresse réelle du site. Elle sert aux liens canoniques,
  // aux balises hreflang, aux aperçus de partage et au plan du site.
  url: 'https://www.sarahfenehari.fr',
  // À CONFIRMER : l'adresse qui recevra les messages du formulaire de contact.
  // FormSubmit envoie un e-mail d'activation à cette adresse au premier envoi.
  email: 'contact@sarahfenehari.fr',
  baseline: {
    fr: 'Artiste peintre — tondos abstraits',
    en: 'Painter — abstract tondos',
  },
  // Localisation affichée sur la page contact (département, sans adresse).
  // À CONFIRMER avec Sarah.
  lieu: {
    fr: 'Seine-et-Marne, France',
    en: 'Seine-et-Marne, near Paris, France',
  },
  // Adresses relevées sur le site Wix actuel.
  reseaux: {
    opensea: 'https://opensea.io/Sarah-NFTs',
    instagram: 'https://www.instagram.com/sarah.fenehari/',
    facebook: 'https://www.facebook.com/sarahfenehari/',
    x: 'https://twitter.com/FenehariS',
  },
}

// Éditeur du site, pour les mentions légales (article 6 de la LCEN).
// Tout ce qui est `null` s'affiche comme « à compléter » sur la page :
// impossible de mettre le site en ligne sans s'en apercevoir.
export const editeur = {
  nom: 'Sarah Fenehari',
  statut: null, // ex. « Artiste-auteure », « Entrepreneuse individuelle »…
  adresse: null, // adresse du siège ou du domicile
  siret: null, // SIRET, ou numéro d'ordre Maison des Artistes / Urssaf artistes-auteurs
  telephone: null,
}

// Hébergeur (LCEN). Coordonnées relevées dans les conditions d'utilisation
// de Vercel (vercel.com/legal/terms). Vercel ne publie pas de téléphone : on
// indique l'adresse du site à la place.
export const hebergeur = {
  nom: 'Vercel Inc.',
  adresse: '440 N Barranca Ave #4133, Covina, CA 91723, États-Unis',
  site: 'https://vercel.com',
}

// Entrées du menu, dans l'ordre (l'accueil est accessible par le nom, en
// haut à gauche). Les libellés sont dans src/i18n/textes.js.
export const navigation = ['galerie', 'demarche', 'biographie', 'expositions', 'nft', 'contact']

// Réseaux affichés en icône dans l'en-tête (les autres restent en pied de page).
export const reseauxEnTete = ['instagram', 'x']

// Œuvre qui ouvre l'accueil (numéro dans la série Composition).
export const oeuvreAccueil = '80'

// Sélection d'œuvres de l'accueil, de gauche à droite.
export const oeuvresSelection = ['81', '79', '76', '72']

// Œuvres alignées « à l'échelle » (image de partage par défaut).
export const oeuvresEchelleAccueil = ['81', '79', '80', '76', '72', '75']

// Détails de matière, recadrés dans les toiles (voir README). Images
// d'ambiance pour la démarche, la biographie et le contact.
export const details = {
  80: { src: '/assets/picture/details/detail-80.avif', width: 1400, height: 1008, alt: { fr: 'Détail de Composition 80 : coulures turquoise et ocre', en: 'Detail of Composition 80: turquoise and ochre drips' } },
  66: { src: '/assets/picture/details/detail-66.avif', width: 1400, height: 1008, alt: { fr: 'Détail de Composition 66 : matière bleu nuit et éclats blancs', en: 'Detail of Composition 66: midnight-blue matter and white bursts' } },
  79: { src: '/assets/picture/details/detail-79.avif', width: 1400, height: 1008, alt: { fr: 'Détail de Composition 79 : pigments bleu profond', en: 'Detail of Composition 79: deep blue pigments' } },
}

// Vue d'accrochage (image de la galerie du site Wix).
export const vueAccrochage = {
  src: '/assets/picture/expositions/accrochage.avif',
  width: 1024,
  height: 718,
  alt: {
    fr: 'Cinq tondos de Sarah Fenehari accrochés sur les murs blancs d’une galerie',
    en: 'Five tondos by Sarah Fenehari hung on the white walls of a gallery',
  },
}

// Citations des encadrés. Tirées mot pour mot du texte de démarche de Sarah
// (src/data/biographie.js) : rien n'est inventé. À remplacer si elle
// souhaite en signer d'autres.
export const citations = {
  demarche: {
    fr: "La couleur devient une matière vivante, un écho à la nature dans sa dimension la plus essentielle.",
    en: 'Colour becomes a living substance, an echo of nature in its most essential dimension.',
  },
  biographie: {
    fr: "Une immersion qui se vit plus qu'elle ne se décrit. C'est dans cette simplicité apparente que réside la plus grande complexité.",
    en: 'An immersion that is lived rather than described. In this apparent simplicity lies the greatest complexity.',
  },
  contact: {
    fr: "L'œuvre existe par elle-même, comme une présence autonome, entre le silence des matières et l'attention du spectateur.",
    en: 'The work exists on its own, as an autonomous presence, between the silence of matter and the attention of the viewer.',
  },
}

// Portrait de la page biographie (photo du site Wix, région parisienne).
export const portrait = {
  src: '/assets/picture/biographie/portrait.avif',
  width: 1200,
  height: 1306,
  alt: {
    fr: 'Sarah Fenehari, de trois quarts, en robe claire sur un fond brun chaud',
    en: 'Sarah Fenehari, three-quarter view, in a light dress against a warm brown background',
  },
}

// Visuel de la collection NFT (détouré comme les tondos).
export const visuelNft = {
  src: '/assets/picture/nft/collection.avif',
  width: 1200,
  height: 1200,
  alt: {
    fr: 'Tondo orange, vert et blanc de la collection NFT de Sarah Fenehari',
    en: 'Orange, green and white tondo from Sarah Fenehari’s NFT collection',
  },
}

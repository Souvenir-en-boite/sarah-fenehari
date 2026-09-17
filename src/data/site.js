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

// Entrées du menu, dans l'ordre. Les libellés sont dans src/i18n/textes.js.
export const navigation = ['accueil', 'galerie', 'biographie', 'nft', 'contact']

// Œuvre qui ouvre l'accueil (numéro dans la série Composition).
export const oeuvreAccueil = '80'

// Œuvres alignées « à l'échelle » sur l'accueil, de gauche à droite.
export const oeuvresEchelleAccueil = ['81', '79', '80', '76', '72', '75']

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

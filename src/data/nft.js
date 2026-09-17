// Contenu de la page NFT, repris du site Wix.
import { site } from './site'

export const nft = {
  lien: site.reseaux.opensea,
  fr: {
    texte: [
      'Vous pouvez à présent retrouver mes œuvres sous forme de NFT.',
      'Les œuvres sont disponibles sur la plateforme OpenSea.',
    ],
  },
  en: {
    texte: [
      'My works are now also available as NFTs.',
      'The pieces are available on the OpenSea platform.',
    ],
  },
  // Œuvres mises en avant sur la page. PROVISOIRE : images générées par
  // `npm run images-provisoires`, à remplacer par les visuels de la collection.
  apercus: [
    {
      src: '/assets/picture/nft/nft-1.avif',
      width: 1200,
      height: 1200,
      alt: { fr: 'Aperçu d’une œuvre numérique de la collection', en: 'Preview of a digital work from the collection' },
    },
    {
      src: '/assets/picture/nft/nft-2.avif',
      width: 1200,
      height: 1200,
      alt: { fr: 'Aperçu d’une œuvre numérique de la collection', en: 'Preview of a digital work from the collection' },
    },
  ],
}

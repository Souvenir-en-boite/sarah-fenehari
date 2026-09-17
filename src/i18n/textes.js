// Textes de l'interface dans les deux langues.
//
// Tout ce qui s'affiche et ne relève pas d'un contenu (menu, boutons,
// libellés de formulaire, messages) vit ici. Les contenus — biographie,
// séries, œuvres — portent leurs propres traductions dans src/data/.
//
// Règle : la même clé existe dans les deux langues, dans le même ordre.

export const textes = {
  fr: {
    codeLangue: 'fr',
    locale: 'fr_FR',
    autreLangue: { code: 'en', libelle: 'English', libelleCourt: 'EN' },

    nav: {
      accueil: 'Accueil',
      galerie: 'Galerie',
      biographie: 'Biographie',
      nft: 'NFT',
      contact: 'Contact',
      principale: 'Navigation principale',
      piedDePage: 'Pied de page',
      ouvrirMenu: 'Ouvrir le menu',
      fermerMenu: 'Fermer le menu',
      menu: 'Menu de navigation',
      allerAuContenu: 'Aller au contenu principal',
      changerLangue: 'Read this page in English',
      retourAccueil: "Sarah Fenehari — retour à l'accueil",
      nouvelleFenetre: '(nouvelle fenêtre)',
    },

    boutons: {
      contacter: 'Me contacter',
      ecrire: 'Écrire à Sarah',
      voirGalerie: 'Voir la galerie',
      voirSerie: 'Voir la série',
      voirOeuvres: 'Voir les œuvres',
      retourAccueil: "Retour à l'accueil",
      lireBiographie: 'Lire la biographie',
      toutesExpositions: 'Toutes les expositions',
      voirOpenSea: 'Voir la collection sur OpenSea',
    },

    piedDePage: {
      navigation: 'Navigation',
      suivre: 'Suivre',
      langue: 'Langue',
      droits: 'Tous droits réservés.',
      spectre: 'Le spectre de la série Composition : une couleur par toile',
      mentionsLegales: 'Mentions légales',
      confidentialite: 'Politique de confidentialité',
      credit: 'Œuvres et photographies © Sarah Fenehari.',
    },

    accueil: {
      eyebrow: 'Artiste peintre · Tondos',
      titre: 'Sarah Fenehari',
      accroche: 'La couleur, libérée de toute figuration.',
      texte:
        "Des toiles rondes où la couleur jaillit d'un centre et devient matière vivante : la vibration d'une lumière sur l'eau, la transparence d'un feuillage, la densité d'un ciel chargé.",
      metaDescription:
        'Sarah Fenehari, artiste peintre en région parisienne. Tondos abstraits de la série Composition, expositions, œuvres disponibles en NFT.',
      legendeHero: (o) => `${o.titre}, ${o.annee}. Acrylique sur toile, Ø ${o.cm} cm.`,
      serieEyebrow: 'La série',
      serieTitre: (n, periode) => `${n} toiles rondes, ${periode}`,
      serieTexte:
        "Toutes portent le même nom, suivi d'un numéro. Elles mesurent de 20 à 100 centimètres de diamètre — les voici à l'échelle, les unes à côté des autres.",
      echelleLegende: 'Diamètres réels, à la même échelle',
      demarcheEyebrow: 'Démarche',
      demarcheTitre: "Une matière qui « va de soi »",
      expositionsEyebrow: 'Expositions',
      expositionsTitre: 'Dernières expositions',
      nftEyebrow: 'Œuvres numériques',
      nftTitre: 'Les compositions existent aussi en NFT',
      contactEyebrow: 'Contact',
      contactTitre: 'Une œuvre vous parle ?',
      contactTexte:
        "Acquisition, exposition, commande ou simple curiosité : écrivez-moi, je réponds à chaque message.",
    },

    galerie: {
      titre: 'Galerie',
      eyebrow: 'Œuvres',
      chapo: 'Les œuvres sont regroupées par série. Chaque toile s’ouvre en grand, avec son année, son diamètre et sa technique.',
      metaDescription:
        'Galerie des œuvres de Sarah Fenehari : la série Composition, des tondos abstraits en acrylique sur toile.',
      serie: 'Série',
      oeuvres: (n) => (n > 1 ? `${n} œuvres` : `${n} œuvre`),
      diametre: (cm) => `Ø ${cm} cm`,
      modeLibelle: 'Affichage',
      modeGrille: 'Grille',
      modeEchelle: "À l'échelle",
      echelleNote:
        'Les toiles sont affichées proportionnellement à leur diamètre réel, de 20 à 100 cm, centrées à hauteur de regard.',
      agrandir: 'Agrandir',
      fermer: 'Fermer la visionneuse',
      precedente: 'Œuvre précédente',
      suivante: 'Œuvre suivante',
      position: (i, n) => `œuvre ${i} sur ${n}`,
      visionneuse: 'Visionneuse',
    },

    biographie: {
      titre: 'Biographie',
      eyebrow: 'Parcours',
      demarche: 'Démarche artistique',
      expositions: 'Expositions',
      neeLe: 'Née en 1995 à Villeneuve-Saint-Georges',
      vit: 'Vit et travaille en région parisienne',
      metaDescription:
        'Parcours, démarche artistique et expositions de Sarah Fenehari, artiste peintre diplômée de la Sorbonne et enseignante en arts plastiques.',
    },

    nft: {
      titre: 'NFT',
      eyebrow: 'Œuvres numériques',
      metaDescription:
        'Les œuvres de Sarah Fenehari sont disponibles sous forme de NFT sur la plateforme OpenSea.',
      note: 'La collection est hébergée et vendue sur OpenSea. Ce site ne contient aucun portefeuille ni transaction : le bouton ci-dessus ouvre simplement la page de la collection.',
    },

    contact: {
      titre: 'Contact',
      eyebrow: 'Écrivez-moi',
      chapo:
        "Une question sur une œuvre, un projet d'exposition, une demande d'acquisition ? Écrivez-moi, je vous répondrai dès que possible.",
      metaDescription:
        'Contacter Sarah Fenehari, artiste peintre : acquisition, exposition, collaboration.',
      formulaireTitre: 'Envoyez-moi un message',
      suivre: 'Suivre mon travail',
      parMail: 'Par e-mail',
      nom: 'Votre nom',
      email: 'Votre e-mail',
      sujet: 'Sujet',
      message: 'Votre message',
      messagePlaceholder: 'Dites-moi en plus sur votre demande…',
      obligatoire: '(obligatoire)',
      envoyer: 'Envoyer le message',
      sujetMail: 'Nouveau message depuis le site sarahfenehari',
      rgpd: 'Vos informations servent uniquement à répondre à votre demande. Voir la',
      rgpdLien: 'politique de confidentialité',
    },

    merci: {
      titre: 'Merci pour votre message !',
      eyebrow: 'Message envoyé',
      chapo: "Je l'ai bien reçu et je vous réponds dès que possible. En attendant, la galerie vous est ouverte.",
      metaTitre: 'Message envoyé',
      metaDescription: 'Votre message a bien été envoyé.',
    },

    nonTrouvee: {
      titre: "Cette page n'existe pas",
      eyebrow: 'Erreur 404',
      chapo: "Le lien que vous avez suivi est peut-être ancien, ou l'adresse comporte une erreur.",
      metaTitre: 'Page introuvable',
      metaDescription: "Cette page n'existe pas ou a été déplacée.",
    },

    legal: {
      aCompleter: 'à compléter',
    },
  },

  en: {
    codeLangue: 'en',
    locale: 'en_GB',
    autreLangue: { code: 'fr', libelle: 'Français', libelleCourt: 'FR' },

    nav: {
      accueil: 'Home',
      galerie: 'Gallery',
      biographie: 'Biography',
      nft: 'NFT',
      contact: 'Contact',
      principale: 'Main navigation',
      piedDePage: 'Footer',
      ouvrirMenu: 'Open menu',
      fermerMenu: 'Close menu',
      menu: 'Navigation menu',
      allerAuContenu: 'Skip to main content',
      changerLangue: 'Lire cette page en français',
      retourAccueil: 'Sarah Fenehari — back to home',
      nouvelleFenetre: '(opens in a new window)',
    },

    boutons: {
      contacter: 'Get in touch',
      ecrire: 'Write to Sarah',
      voirGalerie: 'View the gallery',
      voirSerie: 'View the series',
      voirOeuvres: 'View the works',
      retourAccueil: 'Back to home',
      lireBiographie: 'Read the biography',
      toutesExpositions: 'All exhibitions',
      voirOpenSea: 'View the collection on OpenSea',
    },

    piedDePage: {
      navigation: 'Navigation',
      suivre: 'Follow',
      langue: 'Language',
      droits: 'All rights reserved.',
      spectre: 'The spectrum of the Composition series: one colour per canvas',
      mentionsLegales: 'Legal notice',
      confidentialite: 'Privacy policy',
      credit: 'Artworks and photographs © Sarah Fenehari.',
    },

    accueil: {
      eyebrow: 'Painter · Tondos',
      titre: 'Sarah Fenehari',
      accroche: 'Colour, freed from all figuration.',
      texte:
        'Round canvases where colour bursts from a centre and becomes a living substance: the shimmer of light on water, the translucence of foliage, the weight of a heavy sky.',
      metaDescription:
        'Sarah Fenehari, painter based near Paris. Abstract tondos from the Composition series, exhibitions, artworks available as NFTs.',
      legendeHero: (o) => `${o.titre}, ${o.annee}. Acrylic on canvas, Ø ${o.cm} cm.`,
      serieEyebrow: 'The series',
      serieTitre: (n, periode) => `${n} round canvases, ${periode}`,
      serieTexte:
        'They all share the same name, followed by a number. They range from 20 to 100 centimetres in diameter — here they are to scale, side by side.',
      echelleLegende: 'Real diameters, at the same scale',
      demarcheEyebrow: 'Approach',
      demarcheTitre: 'A substance that "goes without saying"',
      expositionsEyebrow: 'Exhibitions',
      expositionsTitre: 'Recent exhibitions',
      nftEyebrow: 'Digital works',
      nftTitre: 'The compositions also exist as NFTs',
      contactEyebrow: 'Contact',
      contactTitre: 'Does a work speak to you?',
      contactTexte: 'Acquisition, exhibition, commission or simple curiosity: write to me, I reply to every message.',
    },

    galerie: {
      titre: 'Gallery',
      eyebrow: 'Works',
      chapo: 'Works are grouped by series. Each canvas opens in full size, with its year, diameter and technique.',
      metaDescription:
        'Gallery of works by Sarah Fenehari: the Composition series, abstract tondos in acrylic on canvas.',
      serie: 'Series',
      oeuvres: (n) => (n > 1 ? `${n} works` : `${n} work`),
      diametre: (cm) => `Ø ${cm} cm`,
      modeLibelle: 'Display',
      modeGrille: 'Grid',
      modeEchelle: 'To scale',
      echelleNote:
        'Canvases are displayed in proportion to their real diameter, from 20 to 100 cm, centred at eye level.',
      agrandir: 'Enlarge',
      fermer: 'Close viewer',
      precedente: 'Previous work',
      suivante: 'Next work',
      position: (i, n) => `work ${i} of ${n}`,
      visionneuse: 'Viewer',
    },

    biographie: {
      titre: 'Biography',
      eyebrow: 'Background',
      demarche: 'Artistic approach',
      expositions: 'Exhibitions',
      neeLe: 'Born in 1995 in Villeneuve-Saint-Georges',
      vit: 'Lives and works in the Paris area',
      metaDescription:
        'Background, artistic approach and exhibitions of Sarah Fenehari, painter, Sorbonne graduate and visual arts teacher.',
    },

    nft: {
      titre: 'NFT',
      eyebrow: 'Digital works',
      metaDescription: "Sarah Fenehari's artworks are available as NFTs on the OpenSea platform.",
      note: 'The collection is hosted and sold on OpenSea. This website contains no wallet and no transaction: the button above simply opens the collection page.',
    },

    contact: {
      titre: 'Contact',
      eyebrow: 'Write to me',
      chapo:
        'A question about a work, an exhibition project, a purchase enquiry? Write to me and I will reply as soon as possible.',
      metaDescription: 'Contact Sarah Fenehari, painter: acquisitions, exhibitions, collaborations.',
      formulaireTitre: 'Send me a message',
      suivre: 'Follow my work',
      parMail: 'By e-mail',
      nom: 'Your name',
      email: 'Your e-mail',
      sujet: 'Subject',
      message: 'Your message',
      messagePlaceholder: 'Tell me more about your enquiry…',
      obligatoire: '(required)',
      envoyer: 'Send message',
      sujetMail: 'New message from the sarahfenehari website',
      rgpd: 'Your details are used only to reply to your enquiry. See the',
      rgpdLien: 'privacy policy',
    },

    merci: {
      titre: 'Thank you for your message!',
      eyebrow: 'Message sent',
      chapo: 'I have received it and will reply as soon as possible. In the meantime, the gallery is open.',
      metaTitre: 'Message sent',
      metaDescription: 'Your message has been sent.',
    },

    nonTrouvee: {
      titre: 'This page does not exist',
      eyebrow: 'Error 404',
      chapo: 'The link you followed may be outdated, or the address contains a typo.',
      metaTitre: 'Page not found',
      metaDescription: 'This page does not exist or has been moved.',
    },

    legal: {
      aCompleter: 'to be completed',
    },
  },
}

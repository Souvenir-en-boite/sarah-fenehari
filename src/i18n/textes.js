// Textes de l'interface dans les deux langues.
//
// Tout ce qui s'affiche et ne relève pas d'un contenu (menu, boutons,
// libellés de formulaire, messages) vit ici. Les contenus — biographie,
// séries, œuvres, citations — portent leurs propres traductions dans src/data/.
//
// Règle : la même clé existe dans les deux langues, dans le même ordre.

export const textes = {
  fr: {
    codeLangue: 'fr',
    locale: 'fr_FR',
    autreLangue: { code: 'en', libelle: 'English', libelleCourt: 'EN' },

    nav: {
      accueil: 'Accueil',
      galerie: 'Œuvres',
      demarche: 'Démarche',
      biographie: 'Biographie',
      expositions: 'Expositions',
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
      decouvrir: 'Découvrir les œuvres',
      toutesOeuvres: 'Voir toutes les œuvres',
      galerieComplete: 'Voir la galerie complète',
      enSavoirPlus: 'En savoir plus',
      toutesExpositions: 'Voir toutes les expositions',
      contacter: 'Me contacter',
      acquerir: 'Acquérir une œuvre',
      retourAccueil: "Retour à l'accueil",
      voirOpenSea: 'Voir la collection sur OpenSea',
      lireBiographie: 'Lire la biographie',
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
      eyebrow: 'Artiste peintre',
      titre: ['Sarah', 'Fenehari'],
      accroche: "Une exploration de la matière, de la couleur et de la lumière, pour révéler l'essentiel.",
      texte:
        "Des œuvres abstraites et circulaires, où la matière, la couleur et la lumière s'entrelacent pour révéler l'essentiel.",
      defiler: 'Défiler',
      metaDescription:
        'Sarah Fenehari, artiste peintre en Seine-et-Marne. Compositions : des tondos abstraits où la couleur devient matière vivante. Œuvres, démarche, expositions.',
      legendeHero: (o) => `${o.titre}, ${o.annee}. Acrylique sur toile, Ø ${o.cm} cm.`,
      selectionEyebrow: "Sélection d'œuvres",
      demarcheEyebrow: 'Démarche',
      demarcheTitre: 'Une démarche artistique',
      expositionsEyebrow: 'Expositions',
      accrochageLegende: 'Vue d’accrochage',
      nftEyebrow: 'Œuvres numériques',
      nftTitre: 'Les compositions en NFT',
      nftTexte: 'Une sélection de compositions est disponible sur OpenSea.',
      contactEyebrow: 'Contact',
      contactTitre: "Échanger autour d'une œuvre",
      contactTexte:
        "Vous souhaitez acquérir une œuvre, obtenir des informations sur une exposition ou me contacter pour un projet ? Je serai ravie d'échanger avec vous.",
    },

    galerie: {
      titre: 'Les œuvres',
      eyebrow: 'Galerie',
      chapo: "Des œuvres abstraites et circulaires, où la matière, la couleur et la lumière s'entrelacent pour révéler l'essentiel.",
      metaDescription:
        'Toutes les œuvres de Sarah Fenehari : la série Composition, des tondos abstraits en acrylique sur toile, de 20 à 100 cm.',
      filtreLibelle: 'Filtrer les œuvres',
      toutes: 'Toutes',
      grandsFormats: 'Grands formats',
      moyensFormats: 'Moyens formats',
      petitsFormats: 'Petits formats',
      formatNote: 'Grands formats : 80 cm et plus. Moyens : 50 à 70 cm. Petits : 40 cm et moins.',
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
      aucune: 'Aucune œuvre ne correspond à ce filtre.',
    },

    demarche: {
      titre: 'Une exploration sensorielle',
      eyebrow: 'Démarche',
      metaDescription:
        "La démarche artistique de Sarah Fenehari : libérer la couleur de toute figuration, effacer la trace du geste, laisser l'œuvre exister comme une présence autonome.",
      citationEyebrow: 'Maurice Denis',
    },

    biographie: {
      titre: "Un parcours au service de l'art",
      eyebrow: 'Biographie',
      neeLe: 'Née en 1995 à Villeneuve-Saint-Georges',
      vit: 'Vit et travaille en région parisienne',
      metaDescription:
        "Parcours de Sarah Fenehari, artiste peintre diplômée de la Sorbonne et enseignante en arts plastiques : formation, démarche, expositions.",
      chiffres: {
        annees: (n) => [String(n), "années d'expositions"],
        expositions: (n) => [`${n}`, 'expositions'],
        oeuvres: (n) => [`${n}`, 'œuvres en ligne'],
      },
    },

    expositions: {
      titre: 'Parcours & actualités',
      eyebrow: 'Expositions',
      chapo:
        'Mes œuvres ont été présentées dans plusieurs salons et expositions en France et en Europe. Chaque rencontre est une étape précieuse dans ce parcours.',
      metaDescription:
        'Expositions et salons de Sarah Fenehari depuis 2015 : ART3F Paris, Luxembourg et Bruxelles, Salon d’Automne, Artbox Zurich, Centre Annie Fratellini.',
      aVenir: 'À venir',
      passees: 'Expositions passées',
    },

    nft: {
      titre: 'NFT',
      eyebrow: 'Œuvres numériques',
      metaDescription:
        'Les œuvres de Sarah Fenehari sont disponibles sous forme de NFT sur la plateforme OpenSea.',
      note: 'La collection est hébergée et vendue sur OpenSea. Ce site ne contient aucun portefeuille ni transaction : le bouton ouvre simplement la page de la collection.',
    },

    contact: {
      titre: 'Acquérir une œuvre',
      eyebrow: 'Contact',
      chapo:
        "Vous souhaitez acquérir une œuvre, obtenir des informations sur une exposition ou me contacter pour un projet ? Je serai ravie d'échanger avec vous.",
      metaDescription:
        'Contacter Sarah Fenehari, artiste peintre : acquisition d’une œuvre, exposition, collaboration.',
      formulaireTitre: 'Envoyez-moi un message',
      atelier: 'Atelier',
      email: 'E-mail',
      reseaux: 'Réseaux',
      nom: 'Votre nom',
      emailChamp: 'Votre e-mail',
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
      titre: 'Merci pour votre message',
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

    legal: { aCompleter: 'à compléter' },
  },

  en: {
    codeLangue: 'en',
    locale: 'en_GB',
    autreLangue: { code: 'fr', libelle: 'Français', libelleCourt: 'FR' },

    nav: {
      accueil: 'Home',
      galerie: 'Works',
      demarche: 'Approach',
      biographie: 'Biography',
      expositions: 'Exhibitions',
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
      decouvrir: 'Discover the works',
      toutesOeuvres: 'View all works',
      galerieComplete: 'View the full gallery',
      enSavoirPlus: 'Read more',
      toutesExpositions: 'View all exhibitions',
      contacter: 'Get in touch',
      acquerir: 'Acquire a work',
      retourAccueil: 'Back to home',
      voirOpenSea: 'View the collection on OpenSea',
      lireBiographie: 'Read the biography',
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
      eyebrow: 'Painter',
      titre: ['Sarah', 'Fenehari'],
      accroche: 'An exploration of matter, colour and light, to reveal the essential.',
      texte: 'Abstract, circular works where matter, colour and light intertwine to reveal the essential.',
      defiler: 'Scroll',
      metaDescription:
        'Sarah Fenehari, painter based near Paris. Compositions: abstract tondos where colour becomes a living substance. Works, approach, exhibitions.',
      legendeHero: (o) => `${o.titre}, ${o.annee}. Acrylic on canvas, Ø ${o.cm} cm.`,
      selectionEyebrow: 'Selected works',
      demarcheEyebrow: 'Approach',
      demarcheTitre: 'An artistic approach',
      expositionsEyebrow: 'Exhibitions',
      accrochageLegende: 'Installation view',
      nftEyebrow: 'Digital works',
      nftTitre: 'The compositions as NFTs',
      nftTexte: 'A selection of compositions is available on OpenSea.',
      contactEyebrow: 'Contact',
      contactTitre: 'Talk about a work',
      contactTexte:
        'Would you like to acquire a work, learn about an exhibition or get in touch about a project? I would be delighted to hear from you.',
    },

    galerie: {
      titre: 'The works',
      eyebrow: 'Gallery',
      chapo: 'Abstract, circular works where matter, colour and light intertwine to reveal the essential.',
      metaDescription:
        'All works by Sarah Fenehari: the Composition series, abstract tondos in acrylic on canvas, from 20 to 100 cm.',
      filtreLibelle: 'Filter the works',
      toutes: 'All',
      grandsFormats: 'Large formats',
      moyensFormats: 'Medium formats',
      petitsFormats: 'Small formats',
      formatNote: 'Large: 80 cm and above. Medium: 50 to 70 cm. Small: 40 cm and below.',
      oeuvres: (n) => (n > 1 ? `${n} works` : `${n} work`),
      diametre: (cm) => `Ø ${cm} cm`,
      modeLibelle: 'Display',
      modeGrille: 'Grid',
      modeEchelle: 'To scale',
      echelleNote: 'Canvases are displayed in proportion to their real diameter, from 20 to 100 cm, centred at eye level.',
      agrandir: 'Enlarge',
      fermer: 'Close viewer',
      precedente: 'Previous work',
      suivante: 'Next work',
      position: (i, n) => `work ${i} of ${n}`,
      visionneuse: 'Viewer',
      aucune: 'No work matches this filter.',
    },

    demarche: {
      titre: 'A sensory exploration',
      eyebrow: 'Approach',
      metaDescription:
        "Sarah Fenehari's artistic approach: freeing colour from figuration, erasing the trace of the gesture, letting the work exist as an autonomous presence.",
      citationEyebrow: 'Maurice Denis',
    },

    biographie: {
      titre: 'A path devoted to art',
      eyebrow: 'Biography',
      neeLe: 'Born in 1995 in Villeneuve-Saint-Georges',
      vit: 'Lives and works in the Paris area',
      metaDescription:
        'Background of Sarah Fenehari, painter, Sorbonne graduate and visual arts teacher: training, approach, exhibitions.',
      chiffres: {
        annees: (n) => [String(n), 'years of exhibitions'],
        expositions: (n) => [`${n}`, 'exhibitions'],
        oeuvres: (n) => [`${n}`, 'works online'],
      },
    },

    expositions: {
      titre: 'Exhibitions & news',
      eyebrow: 'Exhibitions',
      chapo:
        'My works have been shown in several art fairs and exhibitions in France and Europe. Each encounter is a precious step along the way.',
      metaDescription:
        'Exhibitions and art fairs of Sarah Fenehari since 2015: ART3F Paris, Luxembourg and Brussels, Salon d’Automne, Artbox Zurich, Centre Annie Fratellini.',
      aVenir: 'Upcoming',
      passees: 'Past exhibitions',
    },

    nft: {
      titre: 'NFT',
      eyebrow: 'Digital works',
      metaDescription: "Sarah Fenehari's artworks are available as NFTs on the OpenSea platform.",
      note: 'The collection is hosted and sold on OpenSea. This website contains no wallet and no transaction: the button simply opens the collection page.',
    },

    contact: {
      titre: 'Acquire a work',
      eyebrow: 'Contact',
      chapo:
        'Would you like to acquire a work, learn about an exhibition or get in touch about a project? I would be delighted to hear from you.',
      metaDescription: 'Contact Sarah Fenehari, painter: acquiring a work, exhibitions, collaborations.',
      formulaireTitre: 'Send me a message',
      atelier: 'Studio',
      email: 'E-mail',
      reseaux: 'Social',
      nom: 'Your name',
      emailChamp: 'Your e-mail',
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
      titre: 'Thank you for your message',
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

    legal: { aCompleter: 'to be completed' },
  },
}

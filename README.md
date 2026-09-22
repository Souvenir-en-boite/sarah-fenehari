# Sarah Fenehari — site

Site vitrine de Sarah Fenehari, artiste peintre (tondos abstraits, série
*Composition*). Bilingue français / anglais. Remplace le site Wix
`sarahfenehari.wixsite.com/artiste`.

## Démarrer

```bash
npm install
npm run dev        # développement, sur http://localhost:5173
npm run build      # génère le site dans dist/ (+ sitemap, robots, 404)
npm run verifier   # contrôle le HTML généré (à lancer après le build)
npm run preview    # sert dist/ pour vérifier le résultat du build
```

## Comment ça marche

Le site est **généré statiquement** : `npm run build` produit un vrai fichier
HTML par page et par langue, contenu compris. C'est ce qui permet aux moteurs
de recherche et aux aperçus de partage (Facebook, WhatsApp, LinkedIn, qui
n'exécutent pas JavaScript) de lire chaque page.

| | |
|---|---|
| Build | [Vite](https://vite.dev) + [vite-react-ssg](https://github.com/Daydreamer-riri/vite-react-ssg) |
| Interface | React 18, react-router 6 |
| Styles | Tailwind CSS 4 (thème dans `src/styles/index.css`) |
| Polices | Fraunces + Instrument Sans, **auto-hébergées** via Fontsource |
| Images | AVIF, tondos détourés à fond transparent |
| Hébergement | Vercel (`vercel.json`) |

Aucune requête vers un tiers pendant la visite : pas de Google Fonts, pas de
mesure d'audience, pas de cookie. Donc pas de bannière de consentement — la
politique de confidentialité l'explique.

## Le parti pris graphique

Le design suit les maquettes fournies par Sarah (septembre 2026) : papier
clair, titres serif en capitales espacées (Cormorant Garamond), boutons
filaires, toiles posées sur un carré gris, portrait en noir et blanc,
bandeaux noirs de citation. Les photos des maquettes (générées par IA) ont
été remplacées par ses vraies œuvres, son portrait, des détails recadrés dans
ses toiles (`public/assets/picture/details/`) et la vue d'accrochage de son
ancien site.

Les toiles de Sarah sont **rondes**. Le site en tire parti :

- chaque œuvre est un AVIF carré à fond transparent, découpé en cercle par
  `scripts/detourer-tondos.mjs` ; le site peut la poser sur n'importe quel fond ;
- la couleur du site, c'est celle des toiles : `npm run couleurs` extrait la
  dominante et une palette de chaque image (`src/data/couleurs.json`). Elles
  servent au halo derrière chaque tondo, au fond de la visionneuse (chaque
  œuvre éclaire sa propre salle), au champ de couleur de l'accueil et au
  « spectre » du pied de page — une bande où chaque segment est une toile ;
- la galerie a deux affichages : la grille, et **à l'échelle**, où chaque toile
  a la taille de son diamètre réel (de 20 à 100 cm), alignées à hauteur de
  regard comme sur un mur d'exposition ;
- les tondos de l'accueil et de la page NFT tournent sur eux-mêmes, une
  révolution en trois minutes — désactivé si le système demande de réduire
  les animations.

## Bilingue

Le français est à la racine (`/galerie`), l'anglais sous `/en` (`/en/gallery`).
`src/i18n/routes.js` est le seul endroit où les adresses sont écrites : le
routeur, le menu, le sélecteur de langue, les balises `hreflang` et le plan du
site s'appuient dessus. Les textes d'interface sont dans `src/i18n/textes.js`,
les contenus traduits (biographie, séries) portent des champs `{ fr, en }`.

## Où modifier quoi

| Pour changer… | Fichier |
|---|---|
| Adresse du site, e-mail, réseaux, éditrice (mentions légales) | `src/data/site.js` |
| Textes de l'interface (menu, boutons, formulaire) | `src/i18n/textes.js` |
| Biographie, démarche, expositions | `src/data/biographie.js` |
| Citations des encadrés, sélection de l'accueil, images d'ambiance | `src/data/site.js` |
| Œuvres et séries | `src/data/series.js` |
| Page NFT | `src/data/nft.js` |
| Couleurs et typographies | `src/styles/index.css` (bloc `@theme`) |

### Ajouter une œuvre

1. Nommer la photo `composition-82.jpg` (numéro de l'œuvre) et la détourer :
   ```bash
   node scripts/detourer-tondos.mjs ~/Downloads/composition-82.jpg --sortie public/assets/picture/composition
   ```
   Le script rogne le fond, recadre au carré et applique un masque circulaire.
   Il attend une toile ronde photographiée sur fond clair.
2. Ajouter une ligne `oeuvre('82', 2025, 80, 'Acrylique sur toile')` dans
   `src/data/series.js` (numéro, année, diamètre en cm, technique).
3. `npm run couleurs` puis `npm run images-partage`.
4. `npm run build && npm run verifier`.

Pour des photos qui ne sont pas des tondos (portrait, vues d'exposition…),
`scripts/convertir-photos.mjs` convertit en AVIF sans détourage.

## Vérifications automatiques

`npm run verifier` contrôle le HTML réellement généré : un `<h1>` unique par
page, `lang` cohérent avec l'adresse, `alt` et dimensions exactes sur chaque
image, balises `hreflang` sur chaque page indexable, aperçus de partage en JPEG
aux bonnes dimensions, données structurées valides, aucun lien ni bouton sans
intitulé, hiérarchie de titres sans saut, couleur extraite pour chaque œuvre.
GitHub Actions (`.github/workflows/verifier.yml`) le lance à chaque push.

## Mise en ligne

Déploiement sur **Vercel** : `vercel.json` impose `dist` comme dossier de
sortie, désactive la détection de framework, et ajoute des en-têtes de
sécurité et de cache. Le build produit aussi `sitemap.xml` (bilingue, avec
alternates), `robots.txt`, `_redirects` (Netlify / Cloudflare) et `404.html`.

> **Avant la première mise en ligne** : renseigner `site.url` et `site.email`
> dans `src/data/site.js`, compléter `editeur` (mentions légales), et
> régénérer les aperçus de partage. La liste des informations à demander à
> Sarah est dans `QUESTIONS.md`.

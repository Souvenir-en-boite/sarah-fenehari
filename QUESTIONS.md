# Questions pour Sarah

Ce qu'il faut savoir avant la mise en ligne. Les réponses vont dans
`src/data/site.js` sauf mention contraire.

## Indispensable avant la mise en ligne

1. **Nom de domaine.** Lequel ? (`sarahfenehari.fr`, `.com`, `.art`…) Est-il
   déjà acheté, et chez qui ? → `site.url`
2. **Adresse e-mail de contact.** Celle qui recevra les messages du formulaire
   et qui sera affichée sur la page contact et dans les mentions légales.
   FormSubmit y enverra un e-mail d'activation au premier message. → `site.email`
3. **Mentions légales.** Statut (artiste-auteure ? entrepreneuse individuelle ?),
   adresse à afficher (domicile, atelier ou domiciliation), numéro
   d'identification (SIRET, ou numéro Urssaf artistes-auteurs / Maison des
   Artistes), et si elle veut afficher un téléphone. → `editeur`
   Tant que ces champs sont vides, la page les affiche surlignés « à compléter ».

## Contenu

4. **Les œuvres.** Le site reprend les 25 toiles de la galerie Wix avec leurs
   légendes (année, diamètre, technique). Faut-il en ajouter, en retirer, ou
   corriger une légende ? Les photos en haute définition existent-elles ?
   (Celles du Wix font ~3 900 px, c'est très bien ; les originaux seraient
   encore mieux pour le détourage.)
5. **Disponibilité et prix.** Souhaite-t-elle indiquer quelles œuvres sont
   disponibles, vendues, ou en collection privée ? Afficher des prix, ou
   « sur demande » ? (Le site ne l'affiche pas pour l'instant.)
6. **Portrait.** On utilise la photo de la page biographie du Wix, recadrée en
   rond. Convient-il ? Qui est la photographe / le photographe, pour le crédit ?
7. **Biographie en anglais.** Le texte a été traduit ; à relire par elle ou par
   quelqu'un de confiance (`src/data/biographie.js`).
8. **Expositions.** La liste s'arrête à 2025. Rien à ajouter ? Des vues
   d'exposition à montrer ?
9. **NFT.** La page renvoie vers `opensea.io/Sarah-NFTs`. La collection est-elle
   toujours active ? Garde-t-on cette page dans le menu ?
10. **Réseaux.** Instagram, Facebook, X et OpenSea sont repris du Wix. Toujours
    à jour ? (Le compte X est encore sous l'adresse twitter.com.)

## Choix graphiques à valider

11. **Les tondos qui tournent** lentement sur l'accueil et la page NFT (une
    révolution en trois minutes). Ça lui plaît, ou elle préfère des toiles fixes ?
12. **La couleur de fond** est un papier chaud, presque blanc. Alternative :
    un fond sombre, qui ferait ressortir les toiles comme dans une salle
    obscure. À lui montrer les deux ?
13. **L'affichage « à l'échelle »** dans la galerie : à garder ?
14. **Le nom affiché** : « Sarah Fenehari » partout. Le Wix écrivait
    « FENEHARI SARAH » : a-t-elle une préférence ?

## Pratique

15. **Compte GitHub** : a-t-elle un compte, ou le dépôt reste-t-il chez nous ?
16. **Vercel** : même chose pour l'hébergement (compte à son nom, ou le nôtre).
17. **Le Wix** : le garder en ligne quelque temps ? Il est sur un domaine Wix,
    aucune redirection n'est possible depuis lui — mais on peut y mettre un
    lien vers le nouveau site avant de le fermer.

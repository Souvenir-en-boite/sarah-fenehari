// Adresse absolue du site, calculée au build.
//
// Elle sert aux liens canoniques, aux balises hreflang, aux aperçus de
// partage (og:url, og:image) et au plan du site. Si elle ne correspond pas au
// domaine réellement visité, Facebook et Messenger vont chercher la page à la
// mauvaise adresse et n'affichent ni titre ni image.
//
// Ordre de priorité :
//   1. URL_SITE, à poser dans les variables d'environnement de Vercel le jour
//      où le site a son propre nom de domaine (https://sarahfenehari.com) ;
//   2. VERCEL_PROJECT_PRODUCTION_URL, fournie par Vercel à chaque build : le
//      domaine de production du projet (le .vercel.app, puis le domaine
//      personnalisé dès qu'il est rattaché au projet) ;
//   3. à défaut (build en local), l'adresse .vercel.app du projet.
//
// Ce module est lu par Vite (vite.config.js) et par les scripts Node
// (plan du site, aperçus de partage) : il ne dépend que de process.env.

export function urlDuSite() {
  const env = globalThis.process?.env ?? {}
  const candidat = env.URL_SITE || (env.VERCEL_PROJECT_PRODUCTION_URL && `https://${env.VERCEL_PROJECT_PRODUCTION_URL}`)
  return (candidat || 'https://sarah-fenehari.vercel.app').replace(/\/+$/, '')
}

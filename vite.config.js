import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { urlDuSite } from './src/data/url-site.js'

// L'adresse absolue du site (liens canoniques, aperçus de partage) est
// exposée au code client sous import.meta.env.VITE_URL_SITE. Voir url-site.js.
process.env.VITE_URL_SITE = urlDuSite()

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Les .avif sont déjà compressés : pas d'inlining en base64.
    assetsInlineLimit: 0,
  },
  ssgOptions: {
    entry: 'src/main.jsx',
    // `/galerie` -> `/galerie/index.html` : compatible avec tous les
    // hébergeurs statiques sans règle de réécriture.
    dirStyle: 'nested',
    script: 'defer',
  },
})

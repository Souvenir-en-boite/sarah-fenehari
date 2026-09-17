import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

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

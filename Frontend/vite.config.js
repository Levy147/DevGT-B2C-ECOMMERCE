import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { copyFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

// Cambia esto si tu repositorio en GitHub tiene otro nombre
const REPO_NAME = 'DevGT-B2C-ECOMMERCE'
const isGitHubPages = process.env.GITHUB_PAGES === 'true'

export default defineConfig({
  base: isGitHubPages ? `/${REPO_NAME}/` : '/',
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'spa-fallback-404',
      closeBundle() {
        if (isGitHubPages) {
          const dist = resolve('dist')
          copyFileSync(resolve(dist, 'index.html'), resolve(dist, '404.html'))
          writeFileSync(resolve(dist, '.nojekyll'), '')
        }
      },
    },
  ],
})

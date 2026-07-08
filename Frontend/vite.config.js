import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { copyFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const REPO_NAME = 'DevGT-B2C-ECOMMERCE'
const isGitHubPages = process.env.GITHUB_PAGES === 'true'
const outDir = isGitHubPages ? resolve('..', 'docs') : 'dist'

export default defineConfig({
  base: isGitHubPages ? `/${REPO_NAME}/` : '/',
  outDir,
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'spa-fallback-404',
      closeBundle() {
        if (isGitHubPages) {
          copyFileSync(resolve(outDir, 'index.html'), resolve(outDir, '404.html'))
          writeFileSync(resolve(outDir, '.nojekyll'), '')
        }
      },
    },
  ],
})

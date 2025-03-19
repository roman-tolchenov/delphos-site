import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        coming_soon: resolve(__dirname, 'coming_soon/index.html'),
        contact: resolve(__dirname, 'contact/index.html'),
        partners: resolve(__dirname, 'partners/index.html'),
        privacy: resolve(__dirname, 'privacy/index.html'),
        tos: resolve(__dirname, 'tos/index.html'),
      },
    },
  },
})
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueI18n from '@intlify/unplugin-vue-i18n/vite'

// Served from the custom domain root. Set SITE_BASE=/pampered-pooch-porthcawl/ to build for the github.io project URL.
const base = process.env.SITE_BASE || '/'

export default defineConfig({
  base,
  plugins: [
    vue(),
    VueI18n({
      include: [fileURLToPath(new URL('./src/i18n/*.json', import.meta.url))],
      strictMessage: true,
      escapeHtml: false,
    }),
  ],
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  ssgOptions: {
    script: 'async',
    dirStyle: 'nested',
    formatting: 'minify',
    includedRoutes: () => ['/', '/privacy', '/404'],
  },
})

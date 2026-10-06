import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueI18n from '@intlify/unplugin-vue-i18n/vite'

// GitHub Pages project site. Override with SITE_BASE=/ when a custom domain is attached.
const base = process.env.SITE_BASE || '/pampered-pooch-porthcawl/'

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

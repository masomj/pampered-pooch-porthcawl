<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { useI18n } from 'vue-i18n'
import TopBar from '@/components/TopBar.vue'
import SiteHeader from '@/components/SiteHeader.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import CookieBanner from '@/components/CookieBanner.vue'

const { t } = useI18n()
const base = import.meta.env.BASE_URL

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'theme-color', content: '#32AEB8' },
    { name: 'format-detection', content: 'telephone=no' },
  ],
  link: [
    { rel: 'icon', href: `${base}favicon.ico`, sizes: '32x32' },
    { rel: 'icon', type: 'image/png', href: `${base}favicon-32.png`, sizes: '32x32' },
    { rel: 'apple-touch-icon', href: `${base}apple-touch-icon.png` },
    { rel: 'manifest', href: `${base}site.webmanifest` },
  ],
})

function skip(e: Event) {
  e.preventDefault()
  const main = document.getElementById('main')
  main?.focus()
  main?.scrollIntoView()
}
</script>

<template>
  <a
    href="#main"
    class="on-dark sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:rounded-full focus:bg-wine focus:px-5 focus:py-3 focus:font-extrabold focus:text-white"
    @click="skip"
    >{{ t('a11y.skip') }}</a
  >
  <header>
    <TopBar />
    <SiteHeader />
  </header>
  <RouterView />
  <SiteFooter />
  <CookieBanner />
</template>

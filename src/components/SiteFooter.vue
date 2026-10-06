<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import HashLink from './HashLink.vue'
import { CONTACT, VANGUARD_URL } from '@/config/site'

const { t } = useI18n()
const links = [
  { key: 'header.nav.services', hash: '#services' },
  { key: 'header.nav.gallery', hash: '#gallery' },
  { key: 'header.nav.about', hash: '#about' },
  { key: 'header.nav.reviews', hash: '#reviews' },
  { key: 'footer.contact', hash: '#contact' },
]
</script>

<template>
  <footer class="on-dark bg-wine-dark text-[#F3E4E8]">
    <div class="container-pp flex flex-col gap-8 pb-7 pt-14">
      <div class="flex flex-wrap items-start justify-between gap-8">
        <div class="flex max-w-[340px] flex-col gap-2">
          <span class="font-script text-[44px] leading-none text-white">Pampered Pooch</span>
          <span class="text-[15px]">{{ t('footer.text') }}</span>
        </div>
        <nav :aria-label="t('a11y.footerNav')" class="flex flex-wrap gap-x-7 gap-y-1 text-[15px] font-bold">
          <HashLink
            v-for="l in links"
            :key="l.hash"
            :hash="l.hash"
            class="py-2 text-white no-underline hover:text-blush-pink"
            >{{ t(l.key) }}</HashLink
          >
          <a :href="CONTACT.facebook" class="py-2 text-white no-underline hover:text-blush-pink">{{ t('footer.facebook') }}</a>
        </nav>
      </div>
      <div class="flex flex-wrap justify-between gap-x-6 gap-y-2 border-t border-white/[0.18] pt-5 text-[13px]">
        <span>{{ t('footer.copyright') }}</span>
        <span>
          <RouterLink to="/privacy" class="link-pp text-[#F3E4E8]">{{ t('footer.privacy') }}</RouterLink>
          · {{ t('footer.credit') }}
          <a :href="VANGUARD_URL" class="link-pp text-[#F3E4E8]" rel="noopener">Vanguard Digital Solutions</a>
        </span>
      </div>
    </div>
  </footer>
</template>

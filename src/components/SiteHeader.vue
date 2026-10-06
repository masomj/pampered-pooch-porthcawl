<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import AppIcon from './AppIcon.vue'
import HashLink from './HashLink.vue'

const { t } = useI18n()
const open = ref(false)
const button = ref<HTMLButtonElement | null>(null)
const navId = 'site-nav'
const base = import.meta.env.BASE_URL

const links = [
  { key: 'services', hash: '#services' },
  { key: 'gallery', hash: '#gallery' },
  { key: 'about', hash: '#about' },
  { key: 'reviews', hash: '#reviews' },
  { key: 'faq', hash: '#faq' },
] as const

function close(returnFocus = false) {
  if (!open.value) return
  open.value = false
  if (returnFocus) button.value?.focus()
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && open.value) {
    e.stopPropagation()
    close(true)
  }
}

let mq: MediaQueryList | null = null
const onMq = (e: MediaQueryListEvent) => {
  if (e.matches) open.value = false
}
onMounted(() => {
  mq = window.matchMedia('(min-width: 900px)')
  mq.addEventListener('change', onMq)
})
onBeforeUnmount(() => mq?.removeEventListener('change', onMq))
</script>

<template>
  <div class="border-b border-line bg-white" @keydown="onKeydown">
    <div class="container-pp flex flex-wrap items-center justify-between gap-x-3 gap-y-2 py-3.5 nav:gap-x-8">
      <HashLink
        hash="#top"
        :aria-label="t('header.home')"
        class="flex min-w-0 items-center gap-2.5 no-underline nav:gap-3.5"
        @navigated="close()"
      >
        <picture class="contents">
          <source type="image/webp" :srcset="`${base}img/logo-136.webp`" />
          <img
            :src="`${base}img/logo-136.jpg`"
            alt=""
            width="68"
            height="68"
            class="block h-12 w-12 shrink-0 rounded-full nav:h-[68px] nav:w-[68px]"
          />
        </picture>
        <span class="flex min-w-0 flex-col leading-none">
          <span class="font-script text-[28px] text-wine min-[420px]:text-[34px] nav:text-[40px]">Pampered Pooch</span>
          <span class="mt-1 whitespace-nowrap text-[8px] font-extrabold tracking-[0.18em] text-tealtext min-[420px]:text-[11px] min-[420px]:tracking-[0.32em]">{{ t('header.tagline') }}</span>
        </span>
      </HashLink>

      <button
        ref="button"
        type="button"
        class="flex min-h-[44px] items-center gap-2 rounded-full border-2 border-tealtext bg-white px-3 text-[15px] font-bold text-tealtext nav:hidden"
        :aria-expanded="open"
        :aria-controls="navId"
        @click="open = !open"
      >
        <AppIcon :name="open ? 'close' : 'menu'" :size="20" />
        {{ open ? t('a11y.menuClose') : t('a11y.menuOpen') }}
      </button>

      <nav
        :id="navId"
        :aria-label="t('a11y.mainNav')"
        class="w-full flex-col items-stretch gap-1 pb-2 text-[15px] font-bold nav:flex nav:w-auto nav:flex-row nav:flex-wrap nav:items-center nav:gap-x-[26px] nav:gap-y-1.5 nav:pb-0"
        :class="open ? 'flex' : 'hidden'"
      >
        <HashLink
          v-for="l in links"
          :key="l.key"
          :hash="l.hash"
          class="py-3 text-ink no-underline hover:text-wine nav:py-2.5"
          @navigated="close()"
        >
          {{ t(`header.nav.${l.key}`) }}
        </HashLink>
        <HashLink
          hash="#contact"
          class="mt-2 rounded-full bg-tealtext px-[22px] py-3 text-center text-white no-underline hover:text-white nav:mt-0"
          @navigated="close()"
        >
          {{ t('header.nav.book') }}
        </HashLink>
      </nav>
    </div>
  </div>
</template>

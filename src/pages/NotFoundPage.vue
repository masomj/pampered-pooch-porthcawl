<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useSeo } from '@/composables/useSeo'

const { t } = useI18n()
useSeo({ title: t('meta.notFound.title'), description: t('meta.notFound.description'), path: '/404/', noindex: true })
</script>

<template>
  <main id="main" tabindex="-1" class="bg-white">
    <div class="mx-auto flex max-w-[760px] flex-col items-start gap-6 px-6 py-24">
      <h1 class="m-0 font-serif text-[clamp(40px,5vw,60px)] font-bold leading-[1.05] text-wine">{{ t('notFound.title') }}</h1>
      <p class="m-0 text-body">{{ t('notFound.text') }}</p>
      <RouterLink
        to="/"
        class="rounded-full bg-tealtext px-[30px] py-4 text-base font-extrabold text-white no-underline hover:text-white"
        >{{ t('notFound.home') }}</RouterLink
      >
    </div>
  </main>
</template>

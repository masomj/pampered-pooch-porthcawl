<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import PictureImg from './PictureImg.vue'

const { t } = useI18n()
</script>

<template>
  <section id="about" tabindex="-1" class="bg-blush">
    <div
      class="container-pp grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-center gap-14 py-[88px]"
    >
      <div>
        <PictureImg
          id="05"
          :alt="t('about.imageAlt')"
          sizes="(min-width: 1000px) 560px, 100vw"
          class="block aspect-[4/5] max-h-[560px] w-full rounded-[32px] object-cover"
        />
      </div>
      <div class="flex flex-col gap-[18px]">
        <span class="eyebrow">{{ t('about.eyebrow') }}</span>
        <h2 class="h2">{{ t('about.title') }}</h2>
        <p class="m-0 text-body">{{ t('about.text') }}</p>
        <div class="mt-2 grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4">
          <div class="rounded-[18px] bg-white px-5 py-[18px]">
            <div class="font-serif text-[34px] font-bold leading-[1.1] text-wine">{{ t('about.facts.yearValue') }}</div>
            <div class="text-sm font-bold text-body">{{ t('about.facts.yearLabel') }}</div>
          </div>
          <div class="rounded-[18px] bg-white px-5 py-[18px]">
            <div class="font-serif text-[34px] font-bold leading-[1.1] text-wine">{{ t('about.facts.insuredValue') }}</div>
            <div class="text-sm font-bold text-body">{{ t('about.facts.insuredLabel') }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

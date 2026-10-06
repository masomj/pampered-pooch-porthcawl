<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { CONTACT } from '@/config/site'
import PictureImg from './PictureImg.vue'

const { t } = useI18n()
const ids = ['01', '02', '03', '04', '05', '06', '07', '08']
</script>

<template>
  <section id="gallery" tabindex="-1" class="bg-white">
    <div class="container-pp flex flex-col gap-10 py-[88px]">
      <div class="flex flex-wrap items-end justify-between gap-4">
        <div class="flex max-w-[620px] flex-col gap-3">
          <span class="eyebrow">{{ t('gallery.eyebrow') }}</span>
          <h2 class="h2">{{ t('gallery.title') }}</h2>
        </div>
        <a :href="CONTACT.facebook" class="link-pp font-extrabold">{{ t('gallery.facebook') }}</a>
      </div>
      <div class="grid grid-cols-[repeat(auto-fit,minmax(min(100%,230px),1fr))] gap-[18px]">
        <figure v-for="id in ids" :key="id" class="m-0 flex flex-col gap-2.5">
          <PictureImg
            :id="id"
            :alt="t(`gallery.alts.${id}`)"
            sizes="(min-width: 1200px) 280px, (min-width: 640px) 45vw, 100vw"
            class="block aspect-[3/4] w-full rounded-[20px] object-cover"
          />
        </figure>
      </div>
    </div>
  </section>
</template>

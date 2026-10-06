<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { CONTACT } from '@/config/site'
import AppIcon from './AppIcon.vue'

const { t } = useI18n()
const keys = ['stacey', 'rachel', 'bec']
</script>

<template>
  <section id="reviews" tabindex="-1" class="on-dark bg-wine text-white">
    <div class="container-pp flex flex-col gap-10 py-[88px]">
      <div class="flex flex-col items-center gap-3 text-center">
        <span class="font-script text-[36px] leading-none text-blush-pink">{{ t('reviews.eyebrow') }}</span>
        <h2 class="h2 !text-white">{{ t('reviews.title') }}</h2>
        <a :href="CONTACT.facebookReviews" class="link-pp font-bold">{{ t('reviews.facebook') }}</a>
      </div>
      <div class="grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] gap-6">
        <blockquote v-for="k in keys" :key="k" class="m-0 flex flex-col gap-[18px] rounded-3xl bg-white p-8 text-ink">
          <AppIcon name="quote" :size="36" stroke="#34B0B9" />
          <p class="m-0 font-serif text-[23px] leading-[1.35]">{{ t(`reviews.items.${k}.text`) }}</p>
          <footer class="font-extrabold text-wine">
            {{ t(`reviews.items.${k}.author`) }}
            <span class="font-semibold text-muted">· {{ t(`reviews.items.${k}.dog`) }}</span>
          </footer>
        </blockquote>
      </div>
    </div>
  </section>
</template>

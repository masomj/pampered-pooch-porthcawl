<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { CONTACT } from '@/config/site'

const { t } = useI18n()
const keys = ['where', 'insured', 'puppies', 'time', 'book']
</script>

<template>
  <section id="faq" tabindex="-1" class="bg-mist">
    <div class="mx-auto flex max-w-[880px] flex-col gap-8 px-6 py-[88px]">
      <div class="flex flex-col items-center gap-3 text-center">
        <span class="eyebrow">{{ t('faq.eyebrow') }}</span>
        <h2 class="h2">{{ t('faq.title') }}</h2>
      </div>
      <div class="flex flex-col gap-3">
        <details v-for="(k, i) in keys" :key="k" :open="i === 0" class="rounded-[18px] bg-white px-6 py-5">
          <summary class="block text-lg font-extrabold text-ink">{{ t(`faq.items.${k}.q`) }}</summary>
          <p class="m-0 mt-3 text-body">{{ t(`faq.items.${k}.a`, { phone: CONTACT.phoneDisplay }) }}</p>
        </details>
      </div>
    </div>
  </section>
</template>

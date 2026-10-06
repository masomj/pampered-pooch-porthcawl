<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { PRICES } from '@/config/site'
import AppIcon from './AppIcon.vue'
import type { IconName } from '@/lib/icons'

const { t } = useI18n()
const items: { key: 'fullGroom' | 'puppy' | 'bathTidy'; icon: IconName }[] = [
  { key: 'fullGroom', icon: 'scissors' },
  { key: 'puppy', icon: 'heart' },
  { key: 'bathTidy', icon: 'drop' },
]
</script>

<template>
  <section id="services" tabindex="-1" class="bg-mist">
    <div class="container-pp flex flex-col gap-11 py-[88px]">
      <div class="flex max-w-[680px] flex-col gap-3">
        <span class="eyebrow">{{ t('services.eyebrow') }}</span>
        <h2 class="h2">{{ t('services.title') }}</h2>
        <p class="m-0 text-body">{{ t('services.intro') }}</p>
      </div>
      <div class="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-6">
        <article v-for="it in items" :key="it.key" class="flex flex-col gap-3.5 rounded-3xl bg-white px-7 py-8">
          <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-blush">
            <AppIcon :name="it.icon" :size="28" stroke="#6B1E2A" />
          </div>
          <h3 class="m-0 font-serif text-[28px] font-bold text-ink">{{ t(`services.items.${it.key}.title`) }}</h3>
          <p class="m-0 text-base text-body">{{ t(`services.items.${it.key}.text`) }}</p>
          <p class="m-0 mt-auto font-extrabold text-tealtext">
            {{ t(`services.items.${it.key}.price`, { price: PRICES[it.key] }) }}
          </p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const steps = ['one', 'two', 'three']
</script>

<template>
  <section class="bg-white">
    <div class="container-pp flex flex-col gap-10 py-[88px]">
      <div class="flex max-w-[640px] flex-col gap-3">
        <span class="eyebrow">{{ t('how.eyebrow') }}</span>
        <h2 class="h2">{{ t('how.title') }}</h2>
      </div>
      <ol class="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-6 p-0">
        <li v-for="(s, i) in steps" :key="s" class="flex flex-col gap-2.5 rounded-3xl border-2 border-mist p-7">
          <span
            class="flex h-12 w-12 items-center justify-center rounded-full bg-teal-badge text-xl font-extrabold text-ink"
            aria-hidden="true"
            >{{ i + 1 }}</span
          >
          <h3 class="m-0 font-serif text-[26px] font-bold">{{ t(`how.steps.${s}.title`) }}</h3>
          <p class="m-0 text-base text-body">{{ t(`how.steps.${s}.text`) }}</p>
        </li>
      </ol>
    </div>
  </section>
</template>

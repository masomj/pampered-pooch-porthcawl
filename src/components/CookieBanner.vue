<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { acceptAnalytics, analyticsEnabled, consent, declineAnalytics } from '@/lib/analytics'

const { t } = useI18n()
const mounted = ref(false)
onMounted(() => (mounted.value = true))
</script>

<template>
  <div
    v-if="analyticsEnabled && mounted && consent === null"
    role="region"
    :aria-label="t('cookies.label')"
    class="fixed inset-x-0 bottom-0 z-50 p-3 sm:p-4"
  >
    <div
      class="mx-auto flex max-w-[860px] flex-col gap-4 rounded-2xl border-2 border-blush bg-white p-5 text-[15px] text-ink shadow-hero sm:flex-row sm:items-center sm:justify-between"
    >
      <p class="m-0 max-w-[48ch]">
        {{ t('cookies.text') }}
        <RouterLink to="/privacy" class="link-pp font-bold">{{ t('cookies.privacy') }}</RouterLink>
      </p>
      <div class="flex shrink-0 gap-3">
        <button
          type="button"
          class="min-h-[44px] rounded-full border-2 border-tealtext bg-white px-6 font-extrabold text-tealtext"
          @click="declineAnalytics()"
        >
          {{ t('cookies.decline') }}
        </button>
        <button
          type="button"
          class="min-h-[44px] rounded-full border-2 border-tealtext bg-tealtext px-6 font-extrabold text-white"
          @click="acceptAnalytics()"
        >
          {{ t('cookies.accept') }}
        </button>
      </div>
    </div>
  </div>
</template>

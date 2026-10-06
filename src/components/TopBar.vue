<script setup lang="ts">
import { CONTACT } from '@/config/site'
import AppIcon from './AppIcon.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div class="on-dark bg-wine text-sm text-white">
    <div class="container-pp flex flex-wrap items-center justify-between gap-x-7 gap-y-2 py-2.5">
      <div class="flex flex-wrap items-center gap-x-6 gap-y-2">
        <a :href="`tel:${CONTACT.phoneTel}`" class="flex items-center gap-2 py-0.5 text-white no-underline hover:text-white">
          <AppIcon name="phone" :size="16" />
          {{ CONTACT.phoneDisplay }}
        </a>
        <a :href="`mailto:${CONTACT.email}`" class="flex items-center gap-2 py-0.5 text-white no-underline hover:text-white">
          <AppIcon name="mail" :size="16" />
          {{ CONTACT.email }}
        </a>
        <span class="flex items-center gap-2">
          <AppIcon name="pin" :size="16" />
          {{ t('topbar.address') }}
        </span>
      </div>
    </div>
  </div>
</template>

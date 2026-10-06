<script setup lang="ts">
import { icons, type IconName } from '@/lib/icons'

withDefaults(defineProps<{ name: IconName; size?: number; stroke?: string; strokeWidth?: number }>(), {
  size: 18,
  stroke: 'currentColor',
  strokeWidth: 2,
})
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    :stroke="stroke"
    :stroke-width="strokeWidth"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    focusable="false"
    class="shrink-0"
    v-html="icons[name]"
  />
</template>

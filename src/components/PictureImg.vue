<script setup lang="ts">
import { computed } from 'vue'
import manifest from '@/data/images.json'

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    id: string
    alt: string
    sizes: string
    eager?: boolean
  }>(),
  { eager: false },
)

type Entry = { ratio: number[]; sizes: { width: number; height: number }[] }
const entry = (manifest as Record<string, Entry>)[props.id]
const base = import.meta.env.BASE_URL

const srcset = (ext: 'webp' | 'jpg') =>
  entry.sizes.map((s) => `${base}img/dog-${props.id}-${s.width}.${ext} ${s.width}w`).join(', ')

const mid = computed(() => entry.sizes[Math.min(1, entry.sizes.length - 1)])
const fallback = computed(() => `${base}img/dog-${props.id}-${mid.value.width}.jpg`)
</script>

<template>
  <picture class="contents">
    <source type="image/webp" :srcset="srcset('webp')" :sizes="sizes" />
    <img
      v-bind="$attrs"
      :src="fallback"
      :srcset="srcset('jpg')"
      :sizes="sizes"
      :alt="alt"
      :width="mid.width"
      :height="mid.height"
      :loading="eager ? 'eager' : (($attrs.loading as 'eager' | 'lazy' | undefined) ?? 'lazy')"
      :fetchpriority="eager ? 'high' : undefined"
      decoding="async"
    />
  </picture>
</template>

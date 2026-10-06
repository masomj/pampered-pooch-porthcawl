<script setup lang="ts">
// A router link to a section of the home page that does not claim aria-current,
// since pointing at an in-page anchor is not the same as being on that page.
defineProps<{ hash: string }>()
const emit = defineEmits<{ navigated: [] }>()
</script>

<template>
  <RouterLink v-slot="{ href, navigate }" :to="{ path: '/', hash }" custom>
    <a
      :href="href"
      @click="
        (e: MouseEvent) => {
          navigate(e)
          emit('navigated')
        }
      "
    >
      <slot />
    </a>
  </RouterLink>
</template>

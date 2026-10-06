<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { useI18n } from 'vue-i18n'
import { useSeo } from '@/composables/useSeo'
import { buildHomeGraph } from '@/lib/structuredData'
import HeroSection from '@/components/HeroSection.vue'
import ServicesSection from '@/components/ServicesSection.vue'
import GallerySection from '@/components/GallerySection.vue'
import AboutSection from '@/components/AboutSection.vue'
import ReviewsSection from '@/components/ReviewsSection.vue'
import HowItWorksSection from '@/components/HowItWorksSection.vue'
import FaqSection from '@/components/FaqSection.vue'
import ContactSection from '@/components/ContactSection.vue'

const { t } = useI18n()
const description = t('meta.home.description')

useSeo({
  title: t('meta.home.title'),
  description,
  path: '/',
  jsonLd: buildHomeGraph((k, named) => t(k, named ?? {}), description),
})

const base = import.meta.env.BASE_URL
// Hint the browser to fetch the hero photo early (largest contentful paint)
useHead({
  link: [
    {
      rel: 'preload',
      as: 'image',
      type: 'image/webp',
      imagesrcset: [400, 800, 1200].map((w) => `${base}img/dog-05-${w}.webp ${w}w`).join(', '),
      imagesizes: '(min-width: 640px) 320px, 56vw',
      fetchpriority: 'high',
    },
  ],
})
</script>

<template>
  <main id="main" tabindex="-1">
    <HeroSection />
    <ServicesSection />
    <GallerySection />
    <AboutSection />
    <ReviewsSection />
    <HowItWorksSection />
    <FaqSection />
    <ContactSection />
  </main>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { CONTACT } from '@/config/site'
import AppIcon from './AppIcon.vue'
import HashLink from './HashLink.vue'
import PictureImg from './PictureImg.vue'

const { t } = useI18n()
</script>

<template>
  <section id="top" tabindex="-1" class="overflow-hidden bg-white">
    <div
      class="container-pp grid grid-cols-[repeat(auto-fit,minmax(min(100%,460px),1fr))] items-center gap-14 pb-20 pt-[72px]"
    >
      <div class="flex flex-col gap-6">
        <span
          class="self-start rounded-full bg-blush px-4 py-2 text-[13px] font-extrabold tracking-[0.14em] text-wine"
          >{{ t('hero.badge') }}</span
        >
        <h1 class="m-0 font-serif text-[clamp(44px,6vw,72px)] font-bold leading-[1.02] text-wine">
          {{ t('hero.title') }}
        </h1>
        <p class="m-0 max-w-[34em] text-[19px] text-body">{{ t('hero.intro') }}</p>
        <div class="flex flex-wrap gap-3.5">
          <HashLink
            hash="#contact"
            class="rounded-full bg-tealtext px-[30px] py-4 text-base font-extrabold text-white no-underline hover:text-white"
            >{{ t('hero.book') }}</HashLink
          >
          <a
            :href="CONTACT.whatsapp"
            class="flex items-center gap-2.5 rounded-full border-2 border-tealtext bg-white px-[26px] py-3.5 text-base font-extrabold text-tealtext no-underline"
          >
            <AppIcon name="whatsapp" :size="18" />
            {{ t('hero.whatsapp') }}
          </a>
        </div>
        <ul class="m-0 mt-2 flex list-none flex-wrap gap-x-[26px] gap-y-2.5 p-0 text-[15px] font-bold text-ink">
          <li class="flex items-center gap-2">
            <AppIcon name="check" :size="18" stroke="#1F7F87" :stroke-width="2.4" />{{ t('hero.insured') }}
          </li>
          <li class="flex items-center gap-2">
            <AppIcon name="check" :size="18" stroke="#1F7F87" :stroke-width="2.4" />{{ t('hero.qualified') }}
          </li>
        </ul>
      </div>

      <div class="relative mx-auto aspect-[1/1.02] w-full max-w-[560px]">
        <div class="absolute bottom-0 left-[12%] right-0 top-[9%] rounded-[240px_240px_32px_32px] bg-teal"></div>
        <PictureImg
          id="05"
          :alt="t('hero.mainAlt')"
          sizes="(min-width: 640px) 320px, 56vw"
          eager
          class="absolute left-[24%] top-0 box-border block aspect-[3/4] w-[56%] rounded-[220px_220px_24px_24px] border-8 border-white object-cover shadow-hero"
        />
        <div
          class="absolute bottom-[5%] left-0 box-border w-[38%] -rotate-[5deg] rounded-2xl bg-white p-2 shadow-polaroid"
        >
          <PictureImg
            id="02"
            :alt="t('hero.leftAlt')"
            sizes="(min-width: 640px) 220px, 38vw"
            class="block aspect-square w-full rounded-[10px] object-cover"
          />
        </div>
        <div
          class="absolute bottom-[15%] right-0 box-border w-[36%] rotate-[4deg] rounded-2xl bg-white p-2 shadow-polaroid"
        >
          <PictureImg
            id="08"
            :alt="t('hero.rightAlt')"
            sizes="(min-width: 640px) 210px, 36vw"
            class="block aspect-square w-full rounded-[10px] object-cover"
          />
        </div>
        <span
          class="on-dark absolute right-[2%] top-[12%] rounded-full bg-wine px-4 py-2.5 text-[13px] font-extrabold tracking-[0.08em] text-white shadow-pill"
          >{{ t('hero.groomedBy') }}</span
        >
      </div>
    </div>
  </section>
</template>

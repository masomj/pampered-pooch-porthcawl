<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useSeo } from '@/composables/useSeo'
import { CONTACT } from '@/config/site'
import { analyticsEnabled, resetConsent } from '@/lib/analytics'

const { t } = useI18n()
useSeo({ title: t('meta.privacy.title'), description: t('meta.privacy.description'), path: '/privacy/' })
const contact = { email: CONTACT.email, phone: CONTACT.phoneDisplay }
</script>

<template>
  <main id="main" tabindex="-1" class="bg-white">
    <div class="mx-auto flex max-w-[760px] flex-col gap-8 px-6 py-16">
      <div class="flex flex-col gap-3">
        <h1 class="m-0 font-serif text-[clamp(40px,5vw,60px)] font-bold leading-[1.05] text-wine">
          {{ t('privacy.title') }}
        </h1>
        <p class="m-0 text-sm font-bold text-muted">{{ t('privacy.updated') }}</p>
      </div>

      <section class="flex flex-col gap-3" aria-labelledby="p-who">
        <h2 id="p-who" class="m-0 font-serif text-[30px] font-bold text-ink">{{ t('privacy.sections.who.title') }}</h2>
        <p class="m-0 text-body">{{ t('privacy.sections.who.text') }}</p>
      </section>

      <section class="flex flex-col gap-3" aria-labelledby="p-form">
        <h2 id="p-form" class="m-0 font-serif text-[30px] font-bold text-ink">{{ t('privacy.sections.form.title') }}</h2>
        <p class="m-0 text-body">{{ t('privacy.sections.form.text') }}</p>
        <p class="m-0 text-body">{{ t('privacy.sections.form.keep') }}</p>
      </section>

      <section class="flex flex-col gap-3" aria-labelledby="p-cookies">
        <h2 id="p-cookies" class="m-0 font-serif text-[30px] font-bold text-ink">
          {{ t('privacy.sections.cookies.title') }}
        </h2>
        <p class="m-0 text-body">
          {{ analyticsEnabled ? t('privacy.sections.cookies.textOn') : t('privacy.sections.cookies.textOff') }}
        </p>
        <p class="m-0 text-body">{{ t('privacy.sections.cookies.storage') }}</p>
        <p v-if="analyticsEnabled" class="m-0">
          <button
            type="button"
            class="min-h-[44px] rounded-full border-2 border-tealtext bg-white px-6 font-extrabold text-tealtext"
            @click="resetConsent()"
          >
            {{ t('privacy.sections.cookies.change') }}
          </button>
        </p>
      </section>

      <section class="flex flex-col gap-3" aria-labelledby="p-rights">
        <h2 id="p-rights" class="m-0 font-serif text-[30px] font-bold text-ink">{{ t('privacy.sections.rights.title') }}</h2>
        <p class="m-0 text-body">{{ t('privacy.sections.rights.text') }}</p>
      </section>

      <section class="flex flex-col gap-3" aria-labelledby="p-contact">
        <h2 id="p-contact" class="m-0 font-serif text-[30px] font-bold text-ink">{{ t('privacy.sections.contact.title') }}</h2>
        <p class="m-0 text-body">{{ t('privacy.sections.contact.text', contact) }}</p>
      </section>

      <p class="m-0">
        <RouterLink to="/" class="link-pp font-extrabold">{{ t('privacy.back') }}</RouterLink>
      </p>
    </div>
  </main>
</template>

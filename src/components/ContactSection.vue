<script setup lang="ts">
import { computed, nextTick, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { CONTACT, EMAILJS } from '@/config/site'
import { trackEvent } from '@/lib/analytics'
import AppIcon from './AppIcon.vue'
import type { IconName } from '@/lib/icons'

const { t } = useI18n()

const serviceKeys = ['fullGroom', 'puppy', 'bathTidy', 'extras', 'unsure'] as const
type ServiceKey = (typeof serviceKeys)[number]

const values = reactive({
  name: '',
  phone: '',
  email: '',
  dogName: '',
  breed: '',
  service: 'fullGroom' as ServiceKey,
  message: '',
  website: '', // honeypot
})
const errors = reactive<{ name: string; email: string }>({ name: '', email: '' })
const sending = ref(false)
const sent = ref(false)
const failure = ref('')
const statusBox = ref<HTMLElement | null>(null)

const hasErrors = computed(() => Boolean(errors.name || errors.email))
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validateName() {
  errors.name = values.name.trim() ? '' : t('contact.form.errors.nameRequired')
}
function validateEmail() {
  const v = values.email.trim()
  errors.email = !v
    ? t('contact.form.errors.emailRequired')
    : EMAIL_RE.test(v)
      ? ''
      : t('contact.form.errors.emailInvalid')
}

const placeholdersInUse = () =>
  [EMAILJS.serviceId, EMAILJS.templateId, EMAILJS.publicKey].some((v) => !v || v.startsWith('REPLACE_'))

function resetForm() {
  Object.assign(values, {
    name: '',
    phone: '',
    email: '',
    dogName: '',
    breed: '',
    service: 'fullGroom',
    message: '',
    website: '',
  })
  errors.name = ''
  errors.email = ''
}

async function showSent() {
  sent.value = true
  resetForm()
  await nextTick()
  statusBox.value?.focus()
}

async function onSubmit() {
  sent.value = false
  failure.value = ''
  validateName()
  validateEmail()
  if (hasErrors.value) {
    await nextTick()
    const first = errors.name ? 'cf-name' : 'cf-email'
    document.getElementById(first)?.focus()
    return
  }

  // Honeypot: bots fill every field. Pretend it worked and send nothing.
  if (values.website) {
    await showSent()
    return
  }

  if (placeholdersInUse()) {
    console.warn('[Pampered Pooch] EmailJS is not configured. Set EMAILJS in src/config/site.ts.')
    failure.value = t('contact.form.errorUnconfigured', { phone: CONTACT.phoneDisplay })
    return
  }

  sending.value = true
  try {
    const { default: emailjs } = await import('@emailjs/browser')
    await emailjs.send(
      EMAILJS.serviceId,
      EMAILJS.templateId,
      {
        name: values.name.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        dogName: values.dogName.trim(),
        breed: values.breed.trim(),
        service: t(`contact.form.services.${values.service}`),
        message: values.message.trim(),
        time: new Date().toLocaleString('en-GB', {
          dateStyle: 'full',
          timeStyle: 'short',
          timeZone: 'Europe/London',
        }),
      },
      { publicKey: EMAILJS.publicKey },
    )
    trackEvent('generate_lead', { service: values.service })
    await showSent()
  } catch (err) {
    console.error('[Pampered Pooch] EmailJS send failed', err)
    failure.value = t('contact.form.errorSend', { phone: CONTACT.phoneDisplay })
  } finally {
    sending.value = false
  }
}

const details: { icon: IconName; kind: 'tel' | 'mail' | 'text'; key?: string }[] = [
  { icon: 'phone', kind: 'tel' },
  { icon: 'mail', kind: 'mail' },
  { icon: 'pin', kind: 'text', key: 'contact.address' },
  { icon: 'clock', kind: 'text', key: 'contact.hours' },
]

const fieldClass =
  'w-full rounded-xl border-[1.5px] border-field bg-white px-4 py-3.5 text-ink aria-[invalid=true]:border-error aria-[invalid=true]:border-2'
const labelClass = 'text-[15px] font-bold'
</script>

<template>
  <section id="contact" tabindex="-1" class="bg-white">
    <div
      class="container-pp grid grid-cols-[repeat(auto-fit,minmax(min(100%,400px),1fr))] items-start gap-12 py-[88px]"
    >
      <div class="flex flex-col gap-[22px]">
        <span class="eyebrow">{{ t('contact.eyebrow') }}</span>
        <h2 class="h2">{{ t('contact.title') }}</h2>
        <p class="m-0 text-body">{{ t('contact.intro') }}</p>
        <ul class="m-0 flex list-none flex-col gap-3.5 p-0 font-bold">
          <li v-for="d in details" :key="d.icon" class="flex items-center gap-3">
            <component
              :is="d.kind === 'tel' ? 'a' : d.kind === 'mail' ? 'a' : 'span'"
              :href="d.kind === 'tel' ? `tel:${CONTACT.phoneTel}` : d.kind === 'mail' ? `mailto:${CONTACT.email}` : undefined"
              class="flex min-w-0 items-center gap-3 text-ink"
              :class="d.kind === 'text' ? '' : 'no-underline hover:text-wine'"
            >
              <span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blush">
                <AppIcon :name="d.icon" :size="20" stroke="#6B1E2A" />
              </span>
              <span class="min-w-0 [overflow-wrap:anywhere]">{{
                d.kind === 'tel' ? CONTACT.phoneDisplay : d.kind === 'mail' ? CONTACT.email : t(d.key!)
              }}</span>
            </component>
          </li>
        </ul>
        <div
          class="box-border flex h-60 items-center justify-center rounded-3xl border-2 border-dashed border-[#8CC9CF] bg-mist p-4 text-center font-bold text-tealtext-dark"
        >
          {{ t('contact.map') }}
        </div>
      </div>

      <form
        class="flex flex-col gap-[18px] rounded-[28px] bg-blush p-6 min-[480px]:p-9"
        novalidate
        :aria-label="t('contact.form.label')"
        :aria-busy="sending"
        @submit.prevent="onSubmit"
      >
        <div
          ref="statusBox"
          role="status"
          tabindex="-1"
          :class="sent ? 'rounded-2xl bg-white px-[18px] py-4 font-bold text-tealtext-dark' : 'sr-only-pp'"
        >
          <template v-if="sent">{{ t('contact.form.sent') }}</template>
        </div>
        <div
          role="alert"
          :class="failure || hasErrors ? 'rounded-2xl bg-white px-[18px] py-4 font-bold text-error' : 'sr-only-pp'"
        >
          <template v-if="failure">{{ failure }}</template>
          <template v-else-if="hasErrors">{{ t('contact.form.errorSummary') }}</template>
        </div>

        <div class="grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-4">
          <div class="flex flex-col gap-1.5">
            <label for="cf-name" :class="labelClass">{{ t('contact.form.name') }}</label>
            <input
              id="cf-name"
              v-model="values.name"
              type="text"
              name="name"
              autocomplete="name"
              required
              aria-required="true"
              :aria-invalid="errors.name ? 'true' : 'false'"
              :aria-describedby="errors.name ? 'cf-name-error' : undefined"
              :class="fieldClass"
              @input="errors.name && validateName()"
            />
            <p v-if="errors.name" id="cf-name-error" class="m-0 text-sm font-bold text-error">{{ errors.name }}</p>
          </div>
          <div class="flex flex-col gap-1.5">
            <label for="cf-phone" :class="labelClass">{{ t('contact.form.phone') }}</label>
            <input id="cf-phone" v-model="values.phone" type="tel" name="phone" autocomplete="tel" :class="fieldClass" />
          </div>
        </div>

        <div class="flex flex-col gap-1.5">
          <label for="cf-email" :class="labelClass">{{ t('contact.form.email') }}</label>
          <input
            id="cf-email"
            v-model="values.email"
            type="email"
            name="email"
            autocomplete="email"
            required
            aria-required="true"
            :aria-invalid="errors.email ? 'true' : 'false'"
            :aria-describedby="errors.email ? 'cf-email-error' : undefined"
            :class="fieldClass"
            @input="errors.email && validateEmail()"
          />
          <p v-if="errors.email" id="cf-email-error" class="m-0 text-sm font-bold text-error">{{ errors.email }}</p>
        </div>

        <div class="grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-4">
          <div class="flex flex-col gap-1.5">
            <label for="cf-dog" :class="labelClass">{{ t('contact.form.dogName') }}</label>
            <input id="cf-dog" v-model="values.dogName" type="text" name="dog_name" :class="fieldClass" />
          </div>
          <div class="flex flex-col gap-1.5">
            <label for="cf-breed" :class="labelClass">{{ t('contact.form.breed') }}</label>
            <input id="cf-breed" v-model="values.breed" type="text" name="breed" :class="fieldClass" />
          </div>
        </div>

        <div class="flex flex-col gap-1.5">
          <label for="cf-service" :class="labelClass">{{ t('contact.form.service') }}</label>
          <select id="cf-service" v-model="values.service" name="service" :class="fieldClass">
            <option v-for="k in serviceKeys" :key="k" :value="k">{{ t(`contact.form.services.${k}`) }}</option>
          </select>
        </div>

        <div class="flex flex-col gap-1.5">
          <label for="cf-message" :class="labelClass">{{ t('contact.form.message') }}</label>
          <textarea id="cf-message" v-model="values.message" name="message" rows="4" :class="[fieldClass, 'resize-y']"></textarea>
        </div>

        <!-- Honeypot: off-screen rather than display:none so simple bots still fill it in -->
        <div aria-hidden="true" style="position: absolute; left: -10000px; top: auto; width: 1px; height: 1px; overflow: hidden">
          <label for="cf-website">Website</label>
          <input id="cf-website" v-model="values.website" type="text" name="website" tabindex="-1" autocomplete="off" />
        </div>

        <button
          type="submit"
          class="min-h-[52px] cursor-pointer rounded-full border-0 bg-tealtext px-7 py-4 text-base font-extrabold text-white disabled:cursor-wait disabled:opacity-70"
          :disabled="sending"
        >
          {{ sending ? t('contact.form.sending') : t('contact.form.submit') }}
        </button>
      </form>
    </div>
  </section>
</template>

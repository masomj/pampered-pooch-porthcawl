// Central site configuration. Copy lives in src/i18n/en.json, everything else that may change lives here.

export const SITE_URL = 'https://masomj.github.io/pampered-pooch-porthcawl'
export const SITE_NAME = 'Pampered Pooch'
export const DEFAULT_LOCALE = 'en'

// Filled in by the site owner. While these are placeholders the contact form
// does not call EmailJS and asks visitors to phone or WhatsApp instead.
export const EMAILJS = {
  serviceId: 'service_cw3aocj',
  templateId: 'template_r1gn4d6',
  publicKey: 'xGdd0WXQy-kq81htP',
}

// Google Analytics 4 measurement ID, for example 'G-XXXXXXXXXX'.
// Leave empty to load nothing and hide the cookie banner.
export const GA_MEASUREMENT_ID = ''

export const CONTACT = {
  phoneDisplay: '07367 926114',
  phoneTel: '+447367926114',
  whatsapp: 'https://wa.me/447367926114',
  email: 'pamperedpoochporthcawl@gmail.com',
  facebook: 'https://www.facebook.com/p/PamperedPooch-100091058073419/',
  facebookReviews: 'https://www.facebook.com/p/PamperedPooch-100091058073419/reviews',
}

export const ADDRESS = {
  streetAddress: '17 Victoria Avenue',
  locality: 'Porthcawl',
  region: 'Bridgend',
  country: 'GB',
}

export const AREAS_SERVED = ['Porthcawl', 'Bridgend', 'Pyle', 'Kenfig Hill', 'Nottage', 'Cornelly']

export const FOUNDING_DATE = '2023-04'

// Minimum prices in GBP. Shown on the page and used in the structured data.
export const PRICES = {
  fullGroom: 40,
  puppy: 30,
  bathTidy: 25,
}

export const VANGUARD_URL = 'https://vanguarddigitalsolutions.co.uk'

export const LOCALES = {
  en: { iso: 'en-GB', ogLocale: 'en_GB' },
} as const
export type LocaleCode = keyof typeof LOCALES

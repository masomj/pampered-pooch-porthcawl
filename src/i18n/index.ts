import { createI18n } from 'vue-i18n'
import en from './en.json'
import { DEFAULT_LOCALE } from '@/config/site'

// To add Welsh later: create src/i18n/cy.json, register it in `messages` below,
// add `cy` to LOCALES in src/config/site.ts, and add the `/cy` route prefix in src/routes.ts.
export const messages = { en }

export function createAppI18n(locale: string = DEFAULT_LOCALE) {
  return createI18n({
    legacy: false,
    locale,
    fallbackLocale: DEFAULT_LOCALE,
    messages,
  })
}

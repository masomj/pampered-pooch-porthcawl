import { ref } from 'vue'
import { GA_MEASUREMENT_ID } from '@/config/site'

export type Consent = 'granted' | 'denied' | null

const STORAGE_KEY = 'pp-analytics-consent'

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
    [key: `ga-disable-${string}`]: boolean | undefined
  }
}

export const analyticsEnabled = GA_MEASUREMENT_ID.trim() !== ''
export const consent = ref<Consent>(null)
let scriptLoaded = false

function readStored(): Consent {
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    return v === 'granted' || v === 'denied' ? v : null
  } catch {
    return null
  }
}

function store(value: Exclude<Consent, null>) {
  try {
    localStorage.setItem(STORAGE_KEY, value)
  } catch {
    /* storage unavailable, the choice lasts for this visit only */
  }
}

function setupGtag() {
  window.dataLayer = window.dataLayer || []
  if (!window.gtag) {
    window.gtag = function gtag() {
      // gtag.js expects the arguments object itself, not an array
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments)
    }
  }
}

function loadScript() {
  if (scriptLoaded) return
  scriptLoaded = true
  const s = document.createElement('script')
  s.async = true
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_MEASUREMENT_ID)}`
  document.head.appendChild(s)
  window.gtag!('js', new Date())
  window.gtag!('config', GA_MEASUREMENT_ID, { anonymize_ip: true })
}

/** Called once on the client. Sets Consent Mode v2 defaults to denied, then restores a saved choice. */
export function initAnalytics() {
  if (!analyticsEnabled) return
  setupGtag()
  window.gtag!('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    wait_for_update: 500,
  })
  const saved = readStored()
  consent.value = saved
  if (saved === 'granted') grant(false)
}

function grant(persist: boolean) {
  window[`ga-disable-${GA_MEASUREMENT_ID}`] = false
  window.gtag!('consent', 'update', { analytics_storage: 'granted' })
  loadScript()
  consent.value = 'granted'
  if (persist) store('granted')
}

export function acceptAnalytics() {
  if (!analyticsEnabled) return
  grant(true)
}

export function declineAnalytics() {
  if (!analyticsEnabled) return
  window[`ga-disable-${GA_MEASUREMENT_ID}`] = true
  window.gtag?.('consent', 'update', { analytics_storage: 'denied' })
  consent.value = 'denied'
  store('denied')
}

/** Lets the visitor change their mind from the privacy page. */
export function resetConsent() {
  consent.value = null
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    /* ignore */
  }
}

export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (!analyticsEnabled || consent.value !== 'granted' || !window.gtag) return
  window.gtag('event', name, params)
}

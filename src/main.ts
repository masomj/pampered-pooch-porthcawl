import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import { routes } from './routes'
import { createAppI18n } from './i18n'
import { DEFAULT_LOCALE } from './config/site'
import { initAnalytics } from './lib/analytics'
import './assets/main.css'

export const createApp = ViteSSG(
  App,
  {
    routes,
    base: import.meta.env.BASE_URL,
    scrollBehavior(to, from, saved) {
      if (saved) return saved
      if (to.hash) {
        const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
        return { el: to.hash, behavior: reduce ? 'auto' : 'smooth' }
      }
      if (to.path !== from.path) return { top: 0, behavior: 'auto' }
      return undefined
    },
  },
  ({ app, router, isClient }) => {
    app.use(createAppI18n(DEFAULT_LOCALE))
    if (isClient) {
      initAnalytics()
      // Move keyboard focus to the target of an in-page link, since router navigation does not do it.
      router.afterEach((to) => {
        if (!to.hash) return
        setTimeout(() => {
          const el = document.querySelector<HTMLElement>(to.hash)
          el?.focus({ preventScroll: true })
        }, 0)
      })
    }
  },
)

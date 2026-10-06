import type { RouteRecordRaw } from 'vue-router'

// Route table is built per locale prefix so a Welsh copy can be mounted at '/cy'
// by calling buildRoutes('/cy', 'cy') and spreading the result in.
export function buildRoutes(prefix = '', locale = 'en'): RouteRecordRaw[] {
  return [
    {
      path: prefix || '/',
      name: `home-${locale}`,
      component: () => import('./pages/HomePage.vue'),
      meta: { locale },
    },
    {
      path: `${prefix}/privacy`,
      name: `privacy-${locale}`,
      component: () => import('./pages/PrivacyPage.vue'),
      meta: { locale },
    },
    {
      path: `${prefix}/404`,
      name: `not-found-${locale}`,
      component: () => import('./pages/NotFoundPage.vue'),
      meta: { locale, noindex: true },
    },
  ]
}

export const routes: RouteRecordRaw[] = [
  ...buildRoutes('', 'en'),
  {
    path: '/:pathMatch(.*)*',
    name: 'catch-all',
    component: () => import('./pages/NotFoundPage.vue'),
    meta: { locale: 'en', noindex: true },
  },
]

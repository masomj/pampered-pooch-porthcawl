import { useHead } from '@unhead/vue'
import { SITE_URL, SITE_NAME, LOCALES, type LocaleCode } from '@/config/site'

interface SeoOptions {
  title: string
  description: string
  /** Path below the site root, with leading slash. Use '/' for home. */
  path: string
  noindex?: boolean
  locale?: LocaleCode
  jsonLd?: object
}

export function absoluteUrl(path: string) {
  return `${SITE_URL}${path === '/' ? '/' : path}`
}

export function useSeo(opts: SeoOptions) {
  const locale = LOCALES[opts.locale ?? 'en']
  const url = absoluteUrl(opts.path)
  const image = `${SITE_URL}/og-image.jpg`
  const robots = opts.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'

  useHead({
    htmlAttrs: { lang: locale.iso },
    title: opts.title,
    link: [{ rel: 'canonical', href: url }],
    meta: [
      { name: 'description', content: opts.description },
      { name: 'robots', content: robots },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: SITE_NAME },
      { property: 'og:locale', content: locale.ogLocale },
      { property: 'og:title', content: opts.title },
      { property: 'og:description', content: opts.description },
      { property: 'og:url', content: url },
      { property: 'og:image', content: image },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image:alt', content: 'Freshly groomed dogs from Pampered Pooch, dog grooming in Porthcawl' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: opts.title },
      { name: 'twitter:description', content: opts.description },
      { name: 'twitter:image', content: image },
    ],
    script: opts.jsonLd
      ? [{ type: 'application/ld+json', innerHTML: JSON.stringify(opts.jsonLd) }]
      : [],
  })
}

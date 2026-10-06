import { ADDRESS, AREAS_SERVED, CONTACT, FOUNDING_DATE, PRICES, SITE_NAME, SITE_URL } from '@/config/site'

type T = (key: string, named?: Record<string, unknown>) => string

const ID = {
  website: `${SITE_URL}/#website`,
  business: `${SITE_URL}/#business`,
  faq: `${SITE_URL}/#faq`,
  page: `${SITE_URL}/#webpage`,
}

/** Removes "[bracketed notes]" that are still waiting for the owner to complete. */
function clean(text: string) {
  return text.replace(/\s*\[[^\]]*\]/g, '').trim()
}

export function buildHomeGraph(t: T, description: string) {
  const offers = [
    { key: 'fullGroom', price: PRICES.fullGroom },
    { key: 'puppy', price: PRICES.puppy },
    { key: 'bathTidy', price: PRICES.bathTidy },
  ].map(({ key, price }) => ({
    '@type': 'Offer',
    itemOffered: {
      '@type': 'Service',
      name: t(`services.items.${key}.title`),
      description: t(`services.items.${key}.text`),
      provider: { '@id': ID.business },
      areaServed: AREAS_SERVED.map((name) => ({ '@type': 'Place', name })),
    },
    priceSpecification: {
      '@type': 'PriceSpecification',
      minPrice: price,
      priceCurrency: 'GBP',
    },
  }))

  const reviews = ['stacey', 'rachel', 'bec'].map((k) => ({
    '@type': 'Review',
    author: { '@type': 'Person', name: t(`reviews.items.${k}.author`) },
    reviewBody: t(`reviews.items.${k}.text`),
  }))

  const faqItems = ['where', 'insured', 'puppies', 'time', 'book']
    .map((k) => ({ q: t(`faq.items.${k}.q`), a: clean(t(`faq.items.${k}.a`, { phone: CONTACT.phoneDisplay })) }))
    .filter((i) => i.a.length > 0)
    .map((i) => ({
      '@type': 'Question',
      name: i.q,
      acceptedAnswer: { '@type': 'Answer', text: i.a },
    }))

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': ID.website,
        url: `${SITE_URL}/`,
        name: SITE_NAME,
        inLanguage: 'en-GB',
        publisher: { '@id': ID.business },
      },
      {
        '@type': 'WebPage',
        '@id': ID.page,
        url: `${SITE_URL}/`,
        name: t('meta.home.title'),
        description,
        isPartOf: { '@id': ID.website },
        about: { '@id': ID.business },
        primaryImageOfPage: { '@type': 'ImageObject', url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630 },
        inLanguage: 'en-GB',
      },
      {
        '@type': 'LocalBusiness',
        additionalType: 'https://en.wikipedia.org/wiki/Dog_grooming',
        '@id': ID.business,
        name: SITE_NAME,
        description,
        url: `${SITE_URL}/`,
        image: `${SITE_URL}/og-image.jpg`,
        logo: `${SITE_URL}/icon-192.png`,
        telephone: CONTACT.phoneTel,
        email: CONTACT.email,
        foundingDate: FOUNDING_DATE,
        address: {
          '@type': 'PostalAddress',
          streetAddress: ADDRESS.streetAddress,
          addressLocality: ADDRESS.locality,
          addressRegion: ADDRESS.region,
          addressCountry: ADDRESS.country,
        },
        areaServed: AREAS_SERVED.map((name) => ({ '@type': 'Place', name })),
        sameAs: [CONTACT.facebook],
        makesOffer: offers,
        review: reviews,
      },
      {
        '@type': 'FAQPage',
        '@id': ID.faq,
        isPartOf: { '@id': ID.page },
        mainEntity: faqItems,
      },
    ],
  }
}

# Pampered Pooch

Website for Pampered Pooch, a one-person dog grooming business in Porthcawl, Wales.
Live at https://masomj.github.io/pampered-pooch-porthcawl/

## Stack

Vue 3, Vite, TypeScript, vite-ssg (static prerender), Tailwind CSS 3, vue-i18n and @unhead/vue.
Fonts are self-hosted through @fontsource (Cormorant Garamond, Great Vibes, Mulish).

## Run and build

```
npm ci
npm run dev        # local dev server
npm run build      # type check, prerender to dist/, then sitemap, robots, llms.txt and 404.html
npm run preview    # serve dist/ locally at /pampered-pooch-porthcawl/
npm run assets     # regenerate images, favicons and og-image (needs the original photos, set PP_SRC)
```

## Where things live

- Copy: `src/i18n/en.json`. All visible text goes through vue-i18n. Do not use `|`, `{`, `}` or `@` in messages (they are vue-i18n syntax). Keep the email address in config.
- Config: `src/config/site.ts` holds the site URL, contact details, prices, area list, EmailJS and Google Analytics settings.
- EmailJS: replace the `REPLACE_*` values in `EMAILJS`. Until then the form shows a "call or WhatsApp" message and does not send. The template receives `name`, `email`, `phone`, `dogName`, `breed`, `service`, `message` and `time`.
- Google Analytics: set `GA_MEASUREMENT_ID` (for example `G-XXXXXXXXXX`). While empty nothing loads and no cookie banner shows. With an ID set, the banner appears and gtag only loads after Accept (Consent Mode v2, default denied). `generate_lead` fires on a successful enquiry when consented.
- SEO: `src/composables/useSeo.ts` (meta, canonical, Open Graph), `src/lib/structuredData.ts` (JSON-LD graph), `scripts/postbuild.mjs` (sitemap and robots.txt) and `scripts/llms.txt`.
- Images: generated into `public/img` and listed in `src/data/images.json`.
- FAQ answers and the map box still contain `[bracketed]` notes from the design. Fill them in `en.json`. Bracketed text is left out of the FAQ structured data.

## Adding Welsh later

Create `src/i18n/cy.json`, register it in `src/i18n/index.ts`, add `cy` to `LOCALES` in `src/config/site.ts`, and add `...buildRoutes('/cy', 'cy')` in `src/routes.ts`.

## Deployment

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds and publishes `dist/` to GitHub Pages.
`SITE_BASE` (default `/pampered-pooch-porthcawl/`) sets the Vite base. For a custom domain set `SITE_BASE=/`, change `SITE_URL` in `src/config/site.ts` and in `scripts/postbuild.mjs`, and add a `public/CNAME`.

// Runs after vite-ssg. Writes sitemap.xml, robots.txt, llms.txt and the root 404.html into dist/.
import { readFile, writeFile, copyFile, access } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')

// Keep in step with src/config/site.ts
const SITE_URL = 'https://masomj.github.io/pampered-pooch-porthcawl'
const today = new Date().toISOString().slice(0, 10)

// Prerendered, indexable routes (404 is excluded on purpose)
const routes = ['/', '/privacy/']

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) => `  <url>
    <loc>${SITE_URL}${r}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r === '/' ? 'monthly' : 'yearly'}</changefreq>
    <priority>${r === '/' ? '1.0' : '0.3'}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`
await writeFile(path.join(dist, 'sitemap.xml'), sitemap)

const aiBots = ['GPTBot', 'ClaudeBot', 'Claude-Web', 'PerplexityBot', 'Google-Extended', 'Applebot-Extended', 'CCBot', 'Bingbot']
const robots = `# Pampered Pooch, dog grooming in Porthcawl
User-agent: *
Allow: /

${aiBots.map((b) => `User-agent: ${b}\nAllow: /\n`).join('\n')}
Sitemap: ${SITE_URL}/sitemap.xml
`
await writeFile(path.join(dist, 'robots.txt'), robots)

const llms = await readFile(path.join(root, 'scripts/llms.txt'), 'utf8')
await writeFile(path.join(dist, 'llms.txt'), llms.replaceAll('{{SITE_URL}}', SITE_URL))

// GitHub Pages serves /404.html for unknown paths
const nested = path.join(dist, '404/index.html')
try {
  await access(nested)
  await copyFile(nested, path.join(dist, '404.html'))
} catch {
  throw new Error('Expected dist/404/index.html from the prerender step')
}
console.log('postbuild: sitemap.xml, robots.txt, llms.txt, 404.html written')

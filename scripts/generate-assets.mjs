// Generates responsive images, favicons and the Open Graph image.
// Run with: npm run assets   (outputs are committed, so the normal build does not need sharp)
// Source photos: set PP_SRC to the folder holding pampered-pooch-01..08.jpg and pampered-pooch-logo.jpg
import sharp from 'sharp'
import { mkdir, writeFile, readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const SRC = process.env.PP_SRC || '/mnt/user-data/uploads/Downloads'
const OUT = path.join(root, 'public/img')
const WIDTHS = [400, 800, 1200]
const photos = ['01', '02', '03', '04', '05', '06', '07', '08']

await mkdir(OUT, { recursive: true })
const manifest = {}

for (const id of photos) {
  const file = path.join(SRC, `pampered-pooch-${id}.jpg`)
  const meta = await sharp(file).metadata()
  const ratio = meta.height / meta.width
  const sizes = []
  for (const w of WIDTHS) {
    const width = Math.min(w, meta.width)
    if (sizes.some((s) => s.width === width)) continue
    const height = Math.round(width * ratio)
    const base = sharp(file).rotate().resize({ width })
    await base.clone().webp({ quality: 72, effort: 5 }).toFile(path.join(OUT, `dog-${id}-${width}.webp`))
    await base.clone().jpeg({ quality: 76, mozjpeg: true }).toFile(path.join(OUT, `dog-${id}-${width}.jpg`))
    sizes.push({ width, height })
  }
  manifest[id] = { ratio: [meta.width, meta.height], sizes }
}
await writeFile(path.join(root, 'src/data/images.json'), JSON.stringify(manifest, null, 2) + '\n')

// Logo and favicons
const logo = path.join(SRC, 'pampered-pooch-logo.jpg')
await sharp(logo).resize(136, 136).webp({ quality: 85 }).toFile(path.join(OUT, 'logo-136.webp'))
await sharp(logo).resize(136, 136).jpeg({ quality: 85 }).toFile(path.join(OUT, 'logo-136.jpg'))
const circle = (s) => Buffer.from(`<svg width="${s}" height="${s}"><circle cx="${s / 2}" cy="${s / 2}" r="${s / 2}"/></svg>`)
const round = (s) => sharp(logo).resize(s, s).composite([{ input: circle(s), blend: 'dest-in' }]).png().toBuffer()
const pub = path.join(root, 'public')
await writeFile(path.join(pub, 'favicon-32.png'), await round(32))
await writeFile(path.join(pub, 'icon-192.png'), await round(192))
await sharp(logo).resize(180, 180).png().toFile(path.join(pub, 'apple-touch-icon.png'))
// ICO container holding a 32px PNG
const png32 = await round(32)
const header = Buffer.alloc(22)
header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(1, 4)
header.writeUInt8(32, 6); header.writeUInt8(32, 7); header.writeUInt8(0, 8); header.writeUInt8(0, 9)
header.writeUInt16LE(1, 10); header.writeUInt16LE(32, 12)
header.writeUInt32LE(png32.length, 14); header.writeUInt32LE(22, 18)
await writeFile(path.join(pub, 'favicon.ico'), Buffer.concat([header, png32]))

const W = 1200, H = 630
// Open Graph image, 1200x630, rendered in Chromium so the self-hosted fonts are used
const { chromium } = await import('@playwright/test')
const fontDir = path.join(root, 'node_modules/@fontsource')
const fileUrl = (p) => 'file://' + p
const photo = (id) => fileUrl(path.join(OUT, `dog-${id}-800.jpg`))
const html = `<!doctype html><html><head><style>
@font-face{font-family:'Great Vibes';src:url('${fileUrl(path.join(fontDir, 'great-vibes/files/great-vibes-latin-400-normal.woff2'))}')}
@font-face{font-family:'Mulish';font-weight:800;src:url('${fileUrl(path.join(fontDir, 'mulish/files/mulish-latin-800-normal.woff2'))}')}
html,body{margin:0}
body{width:1200px;height:630px;background:#32AEB8;position:relative;overflow:hidden;color:#fff}
.mark{position:absolute;left:56px;top:210px;font:400 104px/1 'Great Vibes'}
.tag{position:absolute;left:64px;top:350px;font:800 24px/1 'Mulish';letter-spacing:.16em}
.card{position:absolute;background:#fff;padding:10px;border-radius:22px;box-shadow:0 14px 30px rgba(0,0,0,.18)}
.card img{display:block;width:100%;height:100%;object-fit:cover;border-radius:14px}
</style></head><body>
<div class="mark">Pampered Pooch</div><div class="tag">DOG GROOMING IN PORTHCAWL</div>
<div class="card" style="left:800px;top:50px;width:300px;height:300px;transform:rotate(-4deg)"><img src="${photo('05')}"></div>
<div class="card" style="left:950px;top:330px;width:230px;height:230px;transform:rotate(5deg)"><img src="${photo('02')}"></div>
<div class="card" style="left:700px;top:360px;width:230px;height:230px;transform:rotate(-3deg)"><img src="${photo('08')}"></div>
</body></html>`
const tmp = path.join(root, 'node_modules/.og.html')
await writeFile(tmp, html)
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: W, height: H } })
await page.goto(fileUrl(tmp))
await page.evaluate(() => document.fonts.ready)
const shot = await page.screenshot({ type: 'png' })
await browser.close()
await sharp(shot).jpeg({ quality: 86, mozjpeg: true }).toFile(path.join(pub, 'og-image.jpg'))
console.log('assets generated')

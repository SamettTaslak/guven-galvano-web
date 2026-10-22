import type { Payload } from 'payload'
import sharp from 'sharp'

/**
 * ÖRNEK firma logoları (şeffaf PNG) ve kart fotoğrafları — gerçek firmaların logolarıyla
 * panelden değiştirilmelidir. Tekrar çalıştırılabilir.
 */
const SHAPES = [
  (c: string) => `<circle cx="60" cy="60" r="44" fill="${c}"/><circle cx="60" cy="60" r="20" fill="#fff"/>`,
  (c: string) => `<polygon points="60,14 100,37 100,83 60,106 20,83 20,37" fill="${c}"/>`,
  (c: string) => `<polygon points="60,16 104,100 16,100" fill="${c}"/><polygon points="60,50 80,90 40,90" fill="#fff"/>`,
  (c: string) => `<rect x="22" y="22" width="76" height="76" rx="10" transform="rotate(45 60 60)" fill="${c}"/>`,
  (c: string) => `<path d="M16 86 Q60 6 104 86" stroke="${c}" stroke-width="18" fill="none" stroke-linecap="round"/><circle cx="60" cy="86" r="12" fill="${c}"/>`,
  (c: string) => `<rect x="18" y="30" width="24" height="60" rx="4" fill="${c}"/><rect x="48" y="18" width="24" height="72" rx="4" fill="${c}" opacity=".7"/><rect x="78" y="42" width="24" height="48" rx="4" fill="${c}" opacity=".45"/>`,
]
const COLORS = ['#0b5f93', '#c2410c', '#0f766e', '#7c3aed', '#b91c1c', '#1d4ed8', '#047857', '#a16207', '#be185d', '#334155', '#0e7490', '#4d7c0f']

const escapeXml = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' })[c]!)

async function renderLogo(name: string, i: number, textColor: string) {
  const color = COLORS[i % COLORS.length]
  const words = name.split(' ')
  const line1 = words.slice(0, Math.ceil(words.length / 2)).join(' ')
  const line2 = words.slice(Math.ceil(words.length / 2)).join(' ')
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="160" viewBox="0 0 640 160">
  <g transform="translate(10 20)">${SHAPES[i % SHAPES.length](color)}</g>
  <text x="150" y="${line2 ? 78 : 100}" font-family="Arial, Helvetica, sans-serif" font-size="46" font-weight="700" fill="${textColor}" textLength="${Math.min(470, line1.length * 28)}" lengthAdjust="spacingAndGlyphs">${escapeXml(line1.toUpperCase())}</text>
  ${line2 ? `<text x="150" y="126" font-family="Arial, Helvetica, sans-serif" font-size="30" letter-spacing="4" fill="${color}">${escapeXml(line2.toUpperCase())}</text>` : ''}
</svg>`
  return sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer()
}

/** Tedarikçilere kart fotoğrafı (mevcut stok görsellerden), bir firmaya koyu plaka örneği. */
const PHOTO_FOR: Record<string, string> = {
  'Nordic Metals': 'crystalsGreen',
  'Rhein Chemie Handel': 'drumsCopper',
  'Shanghai Plating Materials': 'port',
  'Mumbai Salts Ltd.': 'powderWhite',
  'Liguria Chimica': 'ibc',
  'Busan Zinc Co.': 'ship',
}
const DARK_PLATE = new Set(['Busan Zinc Co.'])

export async function applyPartnerMedia(payload: Payload) {
  const partners = await payload.find({ collection: 'partners', limit: 200, depth: 0, sort: 'order' })
  const findMedia = async (key: string) => {
    const r = await payload.find({ collection: 'media', where: { filename: { like: key } }, limit: 5, depth: 0 })
    return r.docs.find((d) => d.filename?.replace(/(-\d+)?\.\w+$/, '') === key)?.id ?? null
  }

  for (const [i, p] of partners.docs.entries()) {
    const dark = DARK_PLATE.has(p.name)
    const data = await renderLogo(p.name, i, dark ? '#ffffff' : '#14181d')
    const file = `logo-${p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '')}.png`
    const existing = await payload.find({ collection: 'media', where: { filename: { like: file.replace('.png', '') } }, limit: 1, depth: 0 })
    const fileData = { data, mimetype: 'image/png', name: file, size: data.length }
    const logo = existing.docs[0]
      ? await payload.update({ collection: 'media', id: existing.docs[0].id, data: { alt: `${p.name} logosu` }, file: fileData })
      : await payload.create({ collection: 'media', data: { alt: `${p.name} logosu` }, file: fileData })

    const photoKey = PHOTO_FOR[p.name]
    await payload.update({
      collection: 'partners',
      id: p.id,
      data: {
        logo: logo.id,
        image: photoKey ? await findMedia(photoKey) : null,
        logoPlate: dark ? 'dark' : 'light',
        grayscale: true,
      },
    })
  }
  payload.logger.info(`✓ ${partners.docs.length} firmaya örnek logo, ${Object.keys(PHOTO_FOR).length} firmaya kart görseli eklendi.`)
}

/**
 * Yer tutucu "illüstrasyon" görselleri (SVG → JPEG, sharp ile).
 * Firma gerçek fotoğrafları ve drone çekimlerini gönderince admin panelden değiştirilecek.
 */
import sharp from 'sharp'

const W = 1920
const H = 1200

// Basit, tekrarlanabilir rastgele sayı üreteci (aynı seed → aynı görsel).
const rng = (seed: number) => () => {
  seed = (seed * 16807) % 2147483647
  return (seed - 1) / 2147483646
}

const sky = (id: string, top: string, mid: string, bottom: string) =>
  `<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${top}"/><stop offset=".6" stop-color="${mid}"/><stop offset="1" stop-color="${bottom}"/></linearGradient>`

const grain = `<filter id="grain"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 .12 0"/></filter>`

const wrap = (defs: string, body: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><defs>${defs}${grain}</defs>${body}<rect width="100%" height="100%" filter="url(#grain)"/></svg>`

const CONTAINER_COLORS = ['#c2410c', '#1d4ed8', '#0f766e', '#b45309', '#475569', '#9f1239', '#d98c3f', '#1e3a5f']

function port(seed: number) {
  const r = rng(seed)
  let containers = ''
  for (let row = 0; row < 5; row++) {
    for (let i = 0; i < 26; i++) {
      if (r() < 0.25) continue
      const x = 80 + i * 68
      const y = 900 - row * 34
      containers += `<rect x="${x}" y="${y}" width="64" height="32" fill="${CONTAINER_COLORS[Math.floor(r() * 8)]}" opacity=".92"/><path d="M${x + 8} ${y + 4}v24M${x + 20} ${y + 4}v24M${x + 32} ${y + 4}v24M${x + 44} ${y + 4}v24M${x + 56} ${y + 4}v24" stroke="#000" stroke-opacity=".18"/>`
    }
  }
  const crane = (x: number, s: number) =>
    `<g fill="none" stroke="#0b1520" stroke-width="${10 * s}"><path d="M${x} 940V${640 - 120 * s}M${x + 90 * s} 940V${640 - 120 * s}M${x - 160 * s} ${560 - 120 * s}H${x + 420 * s}M${x} ${700 - 120 * s}L${x + 90 * s} ${560 - 120 * s}M${x + 90 * s} ${700 - 120 * s}L${x} ${560 - 120 * s}"/><path d="M${x + 260 * s} ${560 - 120 * s}v${200 * s}" stroke-width="${3 * s}"/></g>`
  return wrap(
    sky('s', '#0b1f33', '#7a4a2b', '#e59a52'),
    `<rect width="100%" height="100%" fill="url(#s)"/><circle cx="1450" cy="720" r="120" fill="#ffd9a8" opacity=".55"/>
${crane(260, 1.2)}${crane(980, 1)}${crane(1500, 1.3)}
<rect y="940" width="100%" height="260" fill="#0a1824"/>${containers}
<rect y="1030" width="100%" height="170" fill="#081420"/><path d="M0 1060h1920" stroke="#e59a52" stroke-opacity=".25" stroke-width="2"/>`,
  )
}

function warehouse(seed: number) {
  const r = rng(seed)
  let racks = ''
  for (let i = 0; i < 9; i++) {
    const t = i / 9
    const x1 = 960 - 900 * (1 - t)
    const x2 = 960 + 900 * (1 - t)
    const h = 760 * (1 - t) + 60
    const y = 600 - h / 2
    const shelf = (x: number) => {
      let s = `<rect x="${x - 6}" y="${y}" width="12" height="${h}" fill="#e2702b"/>`
      for (let k = 0; k < 4; k++) {
        const yy = y + (h / 4) * k
        s += `<rect x="${x - 60 * (1 - t) - 6}" y="${yy + 6}" width="${120 * (1 - t) + 12}" height="${h / 4 - 14}" fill="${r() > 0.5 ? '#1e4b78' : '#2c6ea8'}" opacity="${0.6 + r() * 0.4}"/>`
      }
      return s
    }
    racks += shelf(x1) + shelf(x2)
  }
  return wrap(
    sky('s', '#121a24', '#1c2a3a', '#33475c'),
    `<rect width="100%" height="100%" fill="url(#s)"/>
<g stroke="#fff" stroke-opacity=".5">${Array.from({ length: 7 }, (_, i) => `<path d="M${200 + i * 260} 40h120" stroke-width="10"/>`).join('')}</g>
<path d="M0 1200L860 640h200L1920 1200z" fill="#4a5b6c"/><path d="M960 640v560" stroke="#f5c542" stroke-width="6" stroke-dasharray="40 30"/>${racks}`,
  )
}

function drums(seed: number, color: string, bg: string) {
  const r = rng(seed)
  let d = ''
  for (let row = 0; row < 7; row++) {
    for (let i = 0; i < 12; i++) {
      const cx = 90 + i * 160 + (row % 2) * 80
      const cy = 110 + row * 170
      const rr = 72
      d += `<circle cx="${cx}" cy="${cy}" r="${rr}" fill="${color}"/><circle cx="${cx}" cy="${cy}" r="${rr - 10}" fill="none" stroke="#000" stroke-opacity=".25" stroke-width="4"/><circle cx="${cx}" cy="${cy}" r="${rr - 30}" fill="none" stroke="#fff" stroke-opacity=".12" stroke-width="3"/><circle cx="${cx - 30}" cy="${cy - 20}" r="10" fill="#0b1520" opacity=".7"/><circle cx="${cx + 34}" cy="${cy + 18}" r="7" fill="#0b1520" opacity="${0.4 + r() * 0.4}"/>`
    }
  }
  return wrap(`<radialGradient id="v"><stop offset=".4" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".6"/></radialGradient>`, `<rect width="100%" height="100%" fill="${bg}"/>${d}<rect width="100%" height="100%" fill="url(#v)"/>`)
}

function crystals(seed: number, hue: string, bg: string) {
  const r = rng(seed)
  let c = ''
  for (let i = 0; i < 140; i++) {
    const x = r() * W
    const y = r() * H
    const s = 30 + r() * 140
    const a = r() * 360
    const o = 0.25 + r() * 0.6
    c += `<polygon points="0,${-s} ${s * 0.6},${-s * 0.2} ${s * 0.4},${s * 0.8} ${-s * 0.45},${s * 0.7} ${-s * 0.6},${-s * 0.1}" transform="translate(${x} ${y}) rotate(${a})" fill="${hue}" fill-opacity="${o}" stroke="#fff" stroke-opacity="${o * 0.6}" stroke-width="2"/>`
  }
  return wrap(`<radialGradient id="g" cx=".5" cy=".4"><stop offset="0" stop-color="#fff" stop-opacity=".25"/><stop offset="1" stop-color="#000" stop-opacity=".5"/></radialGradient>`, `<rect width="100%" height="100%" fill="${bg}"/>${c}<rect width="100%" height="100%" fill="url(#g)"/>`)
}

function ibc(seed: number) {
  const r = rng(seed)
  let t = ''
  for (let row = 0; row < 3; row++) {
    for (let i = 0; i < 6; i++) {
      const x = 120 + i * 290 + row * 40
      const y = 200 + row * 300
      t += `<rect x="${x}" y="${y}" width="250" height="250" rx="16" fill="#e8eef3" opacity="${0.75 + r() * 0.25}"/><path d="M${x} ${y + 62}h250M${x} ${y + 125}h250M${x} ${y + 187}h250M${x + 62} ${y}v250M${x + 125} ${y}v250M${x + 187} ${y}v250" stroke="#5b6b7a" stroke-width="7"/><rect x="${x}" y="${y + 250}" width="250" height="28" fill="#1e3a5f"/><rect x="${x + 100}" y="${y - 20}" width="50" height="22" rx="4" fill="#1d4ed8"/>`
    }
  }
  return wrap(sky('s', '#1f2d3d', '#2c4157', '#0f1a26'), `<rect width="100%" height="100%" fill="url(#s)"/>${t}`)
}

function ship(seed: number) {
  const r = rng(seed)
  let stack = ''
  for (let row = 0; row < 4; row++)
    for (let i = 0; i < 18; i++)
      stack += `<rect x="${430 + i * 62}" y="${560 - row * 40}" width="60" height="38" fill="${CONTAINER_COLORS[Math.floor(r() * 8)]}"/>`
  return wrap(
    sky('s', '#0a1a2e', '#24496b', '#7fb2d6'),
    `<rect width="100%" height="100%" fill="url(#s)"/><rect y="720" width="100%" height="480" fill="#0b2740"/>
${Array.from({ length: 30 }, (_, i) => `<path d="M${(i * 137) % 1920} ${760 + ((i * 53) % 400)}h${60 + (i % 5) * 30}" stroke="#7fb2d6" stroke-opacity=".3" stroke-width="3"/>`).join('')}
<path d="M300 600h1320l-90 170H420z" fill="#14202c"/><path d="M300 600h1320l-12 24H312z" fill="#c2410c"/>${stack}<rect x="1480" y="420" width="110" height="180" fill="#e8eef3"/><rect x="1500" y="440" width="70" height="20" fill="#14202c"/>`,
  )
}

function powder(seed: number, color: string, bg: string) {
  const r = rng(seed)
  let p = ''
  for (let i = 0; i < 5; i++) {
    const cx = 200 + i * 380 + r() * 60
    const w = 260 + r() * 80
    p += `<path d="M${cx - w} 1000Q${cx} ${520 + r() * 120} ${cx + w} 1000z" fill="${color}" opacity="${0.8 + r() * 0.2}"/><ellipse cx="${cx}" cy="1000" rx="${w}" ry="26" fill="#000" opacity=".25"/>`
  }
  return wrap(sky('s', bg, bg, '#0b1520'), `<rect width="100%" height="100%" fill="url(#s)"/>${p}<rect y="1000" width="100%" height="200" fill="#0b1520"/>`)
}

export const placeholderSets = {
  port: () => port(7),
  port2: () => port(91),
  ship: () => ship(3),
  warehouse: () => warehouse(5),
  warehouse2: () => warehouse(17),
  drumsBlue: () => drums(11, '#1d4ed8', '#0b1f33'),
  drumsGreen: () => drums(23, '#0f766e', '#0b1f33'),
  drumsCopper: () => drums(31, '#c2410c', '#1a1410'),
  crystalsGreen: () => crystals(4, '#10b981', '#06261d'),
  crystalsBlue: () => crystals(8, '#38bdf8', '#071b2b'),
  crystalsCopper: () => crystals(15, '#f0bf8a', '#2a170a'),
  ibc: () => ibc(9),
  powderWhite: () => powder(13, '#e5e7eb', '#334155'),
  powderGreen: () => powder(19, '#4ade80', '#14532d'),
} as const

export type PlaceholderKey = keyof typeof placeholderSets

export async function renderPlaceholder(key: PlaceholderKey): Promise<Buffer> {
  return sharp(Buffer.from(placeholderSets[key]())).jpeg({ quality: 82, mozjpeg: true }).toBuffer()
}

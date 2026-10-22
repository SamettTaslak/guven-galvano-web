// Logo varyantlari: node scripts/brand-logo.cjs <kaynak.png> <cikti-klasoru>
// logo-dark.png (acik zemin), logo-light.png (koyu zemin), mark-dark.png (sadece G isareti)
const sharp = require('sharp')
const [src, outDir] = process.argv.slice(2)
;(async () => {
  // Kenar boşluklarını kırp, 2x büyüt (lanczos) ki retina ekranda daha keskin dursun.
  const trimmed = await sharp(src).trim({ background: '#ffffff', threshold: 18 }).toBuffer()
  const meta = await sharp(trimmed).metadata()
  const { data, info } = await sharp(trimmed).resize(meta.width * 2, meta.height * 2, { kernel: 'lanczos3' }).removeAlpha().raw().toBuffer({ resolveWithObject: true })
  const n = info.width * info.height
  const dark = Buffer.alloc(n * 4)
  const light = Buffer.alloc(n * 4)
  for (let p = 0; p < n; p++) {
    const r = data[p * 3], g = data[p * 3 + 1], b = data[p * 3 + 2]
    const max = Math.max(r, g, b), min = Math.min(r, g, b)
    // Beyaza yakınlık → saydamlık (yumuşak kenar).
    const alpha = Math.max(0, Math.min(255, Math.round(((255 - min) / 255) * 255 * 1.6)))
    // Beyazla karışmış rengi "un-premultiply" ederek saf rengi kurtar.
    const a = alpha / 255 || 1
    const un = (c) => Math.max(0, Math.min(255, Math.round(255 - (255 - c) / a)))
    const R = un(r), G = un(g), B = un(b)
    dark.set([R, G, B, alpha], p * 4)
    const isBlue = b - r > 30
    if (isBlue) {
      // Koyu zeminde mavi biraz aydınlatılır.
      light.set([Math.min(255, R + 40), Math.min(255, G + 50), Math.min(255, B + 55), alpha], p * 4)
    } else {
      // Gri/siyah tonlar açık gümüşe çevrilir (açıklık ters çevrilir, metalik degrade korunur).
      const l = (R + G + B) / 3
      const v = Math.round(255 - l * 0.55)
      light.set([v, v, Math.min(255, v + 4), alpha], p * 4)
    }
  }
  const raw = { raw: { width: info.width, height: info.height, channels: 4 } }
  await sharp(dark, raw).png({ compressionLevel: 9 }).toFile(`${outDir}/logo-dark.png`)
  await sharp(light, raw).png({ compressionLevel: 9 }).toFile(`${outDir}/logo-light.png`)
  // Sadece "G" kıvrım işareti (favicon/ikon için): sol bölüm.
  const markW = Math.round(info.width * 0.372)
  await sharp(dark, raw).extract({ left: 0, top: 0, width: markW, height: info.height }).trim().png().toFile(`${outDir}/mark-dark.png`)
  console.log('ok', info.width + 'x' + info.height)
})()

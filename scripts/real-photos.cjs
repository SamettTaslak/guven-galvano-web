// DUZENLENMİSLER klasöründeki gerçek fotoğrafları web için JPEG'e çevirir (uzun kenar ≤ 2400px).
// Kullanım: node scripts/real-photos.cjs "<kaynak klasör>"
const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const MAP = {
  'ÇATALCA DEPO.png': 'catalca-depo-1',
  'ÇATALCA DEPO 2.png': 'catalca-depo-2',
  'CATALCA DEPO 3.png': 'catalca-depo-3',
  'Konteynerde Paletli Kostik Soda Çuvalları.png': 'konteyner-kostik-soda',
  'Kırmızı Treylerde Krom Trioksit Varilleri.png': 'treyler-krom-trioksit',
  'çinko klorür torba.png': 'cinko-klorur-torbalar',
  '25 Kiloluk Çinko Klorür Torbası.png': 'cinko-klorur-25kg',
  'AMONYUM KLORÜR.png': 'amonyum-klorur',
  'BARYUM KLORÜR.png': 'baryum-klorur',
  'BASF Sodyum Nitrat Ambalajı.png': 'sodyum-nitrat',
  'COPPER SULFAT.png': 'bakir-sulfat',
  'CYPLUS SODYUM SİYANÜR.png': 'sodyum-siyanur-varil',
  'sodyum siyanür mavi fıçı.png': 'sodyum-siyanur-fici',
  'Endüstriyel Sodyum Hidroksit Çuvalı.png': 'sodyum-hidroksit-cuval',
  'Formosoda-P Kostik Soda.png': 'kostik-soda-cuval',
  'KROMİK ASİT.png': 'kromik-asit-1',
  'KROMİK ASİT 3.png': 'kromik-asit-2',
  'Mavi Galaxy Kimyasal Varil.png': 'kimyasal-varil-mavi',
  'POTASYUM HİDROKSİT.png': 'potasyum-hidroksit',
  'POTASYUM KLORÜR.png': 'potasyum-klorur',
  'POTASYUM SİYANÜR CYPLUS.png': 'potasyum-siyanur',
  'SODYUM BİKROMAT.png': 'sodyum-bikromat',
  'Sodyum Metabisülfit.png': 'sodyum-metabisulfit',
  'hidrojen peroksit evonik.png': 'hidrojen-peroksit',
  'İzopropil Alkol Varili.png': 'izopropil-alkol',
}

const src = process.argv[2]
const out = path.join(__dirname, '..', 'assets', 'real')
fs.mkdirSync(out, { recursive: true })
;(async () => {
  for (const [file, key] of Object.entries(MAP)) {
    const from = path.join(src, file.normalize('NFC'))
    if (!fs.existsSync(from)) { console.warn('yok:', file); continue }
    await sharp(from).rotate().resize(2400, 2400, { fit: 'inside', withoutEnlargement: true })
      .flatten({ background: '#ffffff' }).jpeg({ quality: 86, mozjpeg: true }).toFile(path.join(out, key + '.jpg'))
    console.log('✓', key)
  }
})()

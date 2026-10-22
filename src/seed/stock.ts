import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

import type { PlaceholderKey } from './placeholders'

/** Stok fotoğraflar (kaynak ve lisanslar: assets/stock/CREDITS.md). */
export const STOCK_DIR = path.resolve(process.cwd(), 'assets/stock')

/** Fotoğrafı doğrular, en fazla 2400 px'e indirir ve EXIF/meta verisini temizler. */
export async function loadStockPhoto(key: PlaceholderKey): Promise<Buffer | null> {
  const file = path.join(STOCK_DIR, `${key}.jpg`)
  if (!fs.existsSync(file)) return null
  return sharp(file).rotate().resize({ width: 2400, withoutEnlargement: true }).jpeg({ quality: 82, mozjpeg: true }).toBuffer()
}

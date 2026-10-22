type HeaderReader = { get(name: string): string | null }

/**
 * İstemci IP'si (hız sınırları için). İstemcinin kendisi bu başlıkları sahte gönderebileceğinden:
 *  - Önce ters proxy'nin (nginx: `proxy_set_header X-Real-IP $remote_addr;`) ÜZERİNE YAZDIĞI X-Real-IP,
 *  - yoksa X-Forwarded-For zincirinin SON halkası (en yakın proxy'nin eklediği) kullanılır; ilk halka asla.
 * Uygulama portu internete doğrudan açılmamalı, yalnızca ters proxy üzerinden erişilmelidir.
 */
export function getClientIp(headers: HeaderReader): string {
  const real = headers.get('x-real-ip')?.trim()
  if (real) return real
  const chain = headers.get('x-forwarded-for')?.split(',').map((s) => s.trim()).filter(Boolean)
  return chain?.length ? chain[chain.length - 1] : 'local'
}

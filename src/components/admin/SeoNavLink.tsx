import Link from 'next/link'

/** Panel menüsüne "SEO Kontrol" bağlantısı. */
export function SeoNavLink() {
  return (
    <Link href="/admin/seo-kontrol" className="nav__link" style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 600 }}>
      <span aria-hidden>🔍</span>
      <span className="nav__link-label">SEO Kontrol</span>
    </Link>
  )
}

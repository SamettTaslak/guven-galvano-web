import { DefaultTemplate } from '@payloadcms/next/templates'
import { Gutter } from '@payloadcms/ui'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import type { AdminViewServerProps } from 'payload'

import { type Issue, type Severity, runSeoAudit } from '@/lib/seo-audit'

const SEVERITY: Record<Severity, { label: string; color: string; bg: string }> = {
  error: { label: 'Hata', color: '#b91c1c', bg: 'rgba(185,28,28,0.08)' },
  warning: { label: 'Uyarı', color: '#b45309', bg: 'rgba(180,83,9,0.08)' },
  info: { label: 'Bilgi', color: '#1170ab', bg: 'rgba(17,112,171,0.08)' },
}

/** Panel → SEO Kontrol: içerikteki SEO eksiklerini önem sırasına göre listeler. */
export async function SeoReport({ initPageResult, params, searchParams }: AdminViewServerProps) {
  const { req, permissions, visibleEntities, locale } = initPageResult
  if (!req.user) redirect('/admin/login')

  const issues = await runSeoAudit(req.payload)
  const filter = (typeof searchParams?.seviye === 'string' ? searchParams.seviye : '') as Severity | ''
  const shown = filter ? issues.filter((i) => i.severity === filter) : issues
  const count = (s: Severity) => issues.filter((i) => i.severity === s).length
  const areas = [...new Set(shown.map((i) => i.area))]

  return (
    <DefaultTemplate
      i18n={req.i18n}
      locale={locale}
      params={params}
      payload={req.payload}
      permissions={permissions}
      searchParams={searchParams}
      user={req.user ?? undefined}
      visibleEntities={visibleEntities}
    >
      <Gutter>
        <div style={{ padding: 'calc(var(--base) * 2) 0' }}>
          <h1 style={{ marginBottom: 8 }}>SEO Kontrol</h1>
          <p style={{ color: 'var(--theme-elevation-600)', maxWidth: 760 }}>
            Ürün, kategori ve sayfaların arama motoru açısından eksikleri. Her satırdaki bağlantı ilgili kaydı açar; düzelttikten sonra bu sayfayı yenileyin.
            Başlık 50–60, açıklama 100–150 karakter önerilir (ürün düzenleme ekranındaki SEO sekmesiyle aynı ölçüt).
          </p>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', margin: '20px 0' }}>
            <FilterCard href="/admin/seo-kontrol" active={!filter} label="Tümü" value={issues.length} color="var(--theme-text)" bg="var(--theme-elevation-50)" />
            {(['error', 'warning', 'info'] as Severity[]).map((s) => (
              <FilterCard key={s} href={`/admin/seo-kontrol?seviye=${s}`} active={filter === s} label={SEVERITY[s].label} value={count(s)} color={SEVERITY[s].color} bg={SEVERITY[s].bg} />
            ))}
          </div>

          {!shown.length && <p style={{ fontWeight: 600, color: '#15803d' }}>✓ Bu seviyede sorun bulunmadı.</p>}

          {areas.map((area) => (
            <section key={area} style={{ marginTop: 28 }}>
              <h3 style={{ marginBottom: 10 }}>{area}</h3>
              <div style={{ border: '1px solid var(--theme-elevation-150)', borderRadius: 6, overflow: 'hidden' }}>
                {shown
                  .filter((i) => i.area === area)
                  .map((i, idx) => (
                    <Row key={`${i.editUrl}-${idx}`} issue={i} />
                  ))}
              </div>
            </section>
          ))}
        </div>
      </Gutter>
    </DefaultTemplate>
  )
}

function FilterCard({ href, active, label, value, color, bg }: { href: string; active: boolean; label: string; value: number; color: string; bg: string }) {
  return (
    <Link
      href={href}
      style={{
        minWidth: 130,
        padding: '12px 16px',
        borderRadius: 6,
        background: bg,
        border: `2px solid ${active ? color : 'transparent'}`,
        textDecoration: 'none',
        color,
      }}
    >
      <div style={{ fontSize: 26, fontWeight: 700, lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 13, marginTop: 4 }}>{label}</div>
    </Link>
  )
}

function Row({ issue }: { issue: Issue }) {
  const s = SEVERITY[issue.severity]
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '78px minmax(140px,1fr) 2fr auto', gap: 14, alignItems: 'center', padding: '10px 14px', borderTop: '1px solid var(--theme-elevation-100)' }}>
      <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: s.color, background: s.bg, borderRadius: 4, padding: '3px 6px', textAlign: 'center' }}>{s.label}</span>
      <strong style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={issue.item}>
        {issue.item}
      </strong>
      <div>
        <div>{issue.problem}</div>
        <div style={{ fontSize: 12, color: 'var(--theme-elevation-500)' }}>{issue.fix}</div>
      </div>
      <Link href={issue.editUrl} className="btn btn--style-secondary btn--size-small" style={{ margin: 0 }}>
        Düzenle
      </Link>
    </div>
  )
}

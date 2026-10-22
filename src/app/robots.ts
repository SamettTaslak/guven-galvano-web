import type { MetadataRoute } from 'next'

const siteUrl = (process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000').replace(/\/$/, '')

/** /robots.txt — yönetim paneli, API ve teklif sepeti arama motorlarına kapalı. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/admin', '/api', '/tr/teklif-sepeti', '/en/teklif-sepeti'] }],
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}

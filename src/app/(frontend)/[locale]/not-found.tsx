import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="grid min-h-[80vh] place-items-center bg-metal px-4 text-center text-white">
      <div>
        <p className="h-display text-[clamp(6rem,20vw,14rem)] leading-none text-brand-400">404</p>
        <p className="mt-4 text-lg text-white/70">Aradığınız sayfa bulunamadı · Page not found</p>
        <Link href="/tr" className="btn-ghost mt-10">
          Ana sayfa · Home
        </Link>
      </div>
    </section>
  )
}

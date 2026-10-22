'use client'

import { geoNaturalEarth1, geoPath } from 'd3-geo'
import { motion, useReducedMotion } from 'motion/react'
import { useMemo } from 'react'
import { feature } from 'topojson-client'
import type { GeometryCollection, Topology } from 'topojson-specification'
import land110 from 'world-atlas/land-110m.json'

export type TradeRoute = { label: string; lat: number; lng: number; direction: 'import' | 'export' }

const W = 1600
const H = 860
const COLORS = { import: '#dbe2e8', export: '#3b9ad8' } as const

/**
 * Merkez (Türkiye) ile rotalar arasında akan yaylar çizen SVG dünya haritası.
 * Kara kütlesi noktalı desenle doldurulur; tüm geometri istemcide bir kez hesaplanır.
 */
export function TradeMap({ hub, routes }: { hub: { lat: number; lng: number }; routes: TradeRoute[] }) {
  const reduce = useReducedMotion()

  const { landPath, hubXY, arcs } = useMemo(() => {
    const topo = land110 as unknown as Topology<{ land: GeometryCollection }>
    const land = feature(topo, topo.objects.land)
    // Türkiye'yi yatayda merkeze almak için haritayı döndür.
    const projection = geoNaturalEarth1()
      .rotate([-hub.lng + 5, 0])
      .fitExtent(
        [
          [-W * 0.12, 0],
          [W * 1.12, H * 1.1],
        ],
        { type: 'Sphere' },
      )
    // Merkezi, başlığın biraz üstünde ekranın ortasına taşı.
    const raw = projection([hub.lng, hub.lat])
    if (raw) {
      const [tx, ty] = projection.translate()
      projection.translate([tx + (W * 0.5 - raw[0]), ty + (H * 0.3 - raw[1])])
    }
    const path = geoPath(projection)
    const h = projection([hub.lng, hub.lat]) ?? [W / 2, H / 2]

    const arcs = routes
      .map((r, i) => {
        const p = projection([r.lng, r.lat])
        if (!p) return null
        const [from, to] = r.direction === 'import' ? [p, h] : [h, p]
        const dx = to[0] - from[0]
        const dy = to[1] - from[1]
        const dist = Math.hypot(dx, dy)
        // Yayı her zaman yukarı doğru büküyoruz.
        const mx = (from[0] + to[0]) / 2
        const my = (from[1] + to[1]) / 2 - dist * 0.35
        return {
          key: `${r.label}-${i}`,
          d: `M${from[0]},${from[1]} Q${mx},${my} ${to[0]},${to[1]}`,
          end: p,
          color: COLORS[r.direction],
          label: r.label,
          dur: 2.5 + dist / 400,
          delay: 0.6 + i * 0.18,
        }
      })
      .filter(Boolean) as {
      key: string
      d: string
      end: [number, number]
      color: string
      label: string
      dur: number
      delay: number
    }[]

    return { landPath: path(land) ?? '', hubXY: h, arcs }
  }, [hub.lat, hub.lng, routes])

  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden>
      <defs>
        <pattern id="dots" width="9" height="9" patternUnits="userSpaceOnUse">
          <circle cx="4.5" cy="4.5" r="1.6" fill="rgba(169,189,209,0.35)" />
        </pattern>
        <radialGradient id="hub-glow">
          <stop offset="0%" stopColor="#3b9ad8" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#3b9ad8" stopOpacity="0" />
        </radialGradient>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <motion.path
        d={landPath}
        fill="url(#dots)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6 }}
      />

      {arcs.map((a) => (
        <g key={a.key} filter="url(#glow)">
          <motion.path
            d={a.d}
            fill="none"
            stroke={a.color}
            strokeWidth={1.6}
            strokeLinecap="round"
            initial={reduce ? false : { pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.85 }}
            transition={{ duration: 1.8, delay: a.delay, ease: [0.65, 0, 0.35, 1] }}
          />
          {!reduce && (
            <circle r={3.2} fill="#fff">
              <animateMotion dur={`${a.dur}s`} begin={`${a.delay + 1.6}s`} repeatCount="indefinite" path={a.d} />
              <animate attributeName="opacity" values="0;1;1;0" dur={`${a.dur}s`} begin={`${a.delay + 1.6}s`} repeatCount="indefinite" />
            </circle>
          )}
          <motion.circle
            cx={a.end[0]}
            cy={a.end[1]}
            r={4}
            fill={a.color}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: a.delay + 1.2, type: 'spring' }}
          />
          <circle cx={a.end[0]} cy={a.end[1]} r={4} fill="none" stroke={a.color} strokeWidth={1}>
            {!reduce && (
              <>
                <animate attributeName="r" values="4;16" dur="2.4s" begin={`${a.delay}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.8;0" dur="2.4s" begin={`${a.delay}s`} repeatCount="indefinite" />
              </>
            )}
          </circle>
        </g>
      ))}

      <circle cx={hubXY[0]} cy={hubXY[1]} r={60} fill="url(#hub-glow)" opacity={0.5} />
      <circle cx={hubXY[0]} cy={hubXY[1]} r={7} fill="#1170ab" stroke="#fff" strokeWidth={2} />
    </svg>
  )
}

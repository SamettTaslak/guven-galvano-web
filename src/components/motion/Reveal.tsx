'use client'

import { motion, useInView, useMotionValue, useSpring, useReducedMotion } from 'motion/react'
import React, { useEffect, useRef, useState } from 'react'

/** Görünüme girince yumuşakça beliren sarmalayıcı. */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  as = 'div',
  id,
}: {
  children: React.ReactNode
  delay?: number
  y?: number
  className?: string
  as?: 'div' | 'li' | 'section'
  id?: string
}) {
  const reduce = useReducedMotion()
  const Comp = motion[as]
  return (
    <Comp
      id={id}
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Comp>
  )
}

/** Görünüme girince sıfırdan hedefe sayan sayaç. */
export function CountUp({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const mv = useMotionValue(0)
  const spring = useSpring(mv, { duration: 2200, bounce: 0 })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (inView) mv.set(value)
  }, [inView, mv, value])

  useEffect(() => spring.on('change', (v) => setDisplay(Math.round(v))), [spring])

  return (
    <span ref={ref}>
      {display.toLocaleString('tr-TR')}
      {suffix}
    </span>
  )
}

/** Kaydırma ile hafif paralaks. */
export function Parallax({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce) return
    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const el = ref.current
        if (!el) return
        const rect = el.getBoundingClientRect()
        const progress = (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight
        setOffset(progress * -50)
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
    }
  }, [reduce])

  return (
    <div ref={ref} className={className}>
      <div className="absolute inset-[-50px_0]" style={{ transform: `translate3d(0, ${offset}px, 0)` }}>
        {children}
      </div>
    </div>
  )
}

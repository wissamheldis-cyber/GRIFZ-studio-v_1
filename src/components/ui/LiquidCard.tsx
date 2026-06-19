'use client'

import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion'
import { ReactNode, useRef } from 'react'

/* ─── Types ─────────────────────────────────────────────────
   Panel liquid glass — utilisable partout sur le site.
   Variantes : default, strong, dark
   ─────────────────────────────────────────────────────────── */
interface LiquidCardProps {
  children: ReactNode
  variant?: 'default' | 'strong' | 'dark'
  /** Padding interne */
  padding?: string
  /** Radius override */
  radius?: string
  className?: string
  /** Activer hover animation */
  hoverable?: boolean
  /** onClick handler */
  onClick?: () => void
}

export default function LiquidCard({
  children,
  variant = 'default',
  padding = '32px',
  radius,
  className = '',
  hoverable = false,
  onClick,
}: LiquidCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  // 1. Parallax Effect
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  const y = useTransform(scrollYProgress, [0, 1], [40, -40])
  const springY = useSpring(y, { stiffness: 100, damping: 30 })

  // 2. 3D Hover Effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!hoverable) return
    const rect = ref.current?.getBoundingClientRect()
    if (rect) {
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      mouseX.set(x)
      mouseY.set(y)
    }
  }

  const handleMouseLeave = () => {
    if (!hoverable) return
    mouseX.set(0)
    mouseY.set(0)
  }

  const rotateX = useTransform(mouseY, [-200, 200], [5, -5])
  const rotateY = useTransform(mouseX, [-200, 200], [-5, 5])

  const variantStyles = {
    default: {
      background: 'rgba(255, 255, 255, 0.52)',
      border: '1px solid rgba(255, 255, 255, 0.75)',
      boxShadow: `
        inset 0 1px 0 rgba(255,255,255,0.92),
        inset 0 -1px 0 rgba(255,255,255,0.4),
        0 24px 80px rgba(20,20,20,0.08)
      `,
    },
    strong: {
      background: 'rgba(255, 255, 255, 0.72)',
      border: '1px solid rgba(255, 255, 255, 0.88)',
      boxShadow: `
        inset 0 1px 0 rgba(255,255,255,0.98),
        0 24px 80px rgba(20,20,20,0.10)
      `,
    },
    dark: {
      background: 'rgba(8, 8, 8, 0.75)',
      border: '1px solid rgba(255, 255, 255, 0.12)',
      boxShadow: `
        inset 0 1px 0 rgba(255,255,255,0.08),
        0 24px 80px rgba(0,0,0,0.35)
      `,
    },
  }

  const styles = variantStyles[variant]

  return (
    <motion.div
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        ...styles,
        padding,
        borderRadius: radius ?? 'var(--radius-lg)',
        backdropFilter: 'blur(24px) saturate(1.3)',
        WebkitBackdropFilter: 'blur(24px) saturate(1.3)',
        cursor: onClick ? 'pointer' : 'default',
        y: springY,
        rotateX: hoverable ? rotateX : 0,
        rotateY: hoverable ? rotateY : 0,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      className={className}
      whileHover={hoverable ? {
        scale: 1.02,
        boxShadow: `
          inset 0 1px 0 rgba(255,255,255,0.92),
          0 40px 100px rgba(20,20,20,0.14)
        `,
      } : {}}
      transition={{
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <div style={{ transform: 'translateZ(40px)', width: '100%', height: '100%' }}>
        {children}
      </div>
    </motion.div>
  )
}

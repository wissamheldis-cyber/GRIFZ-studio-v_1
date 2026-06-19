'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

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
      onClick={onClick}
      style={{
        ...styles,
        padding,
        borderRadius: radius ?? 'var(--radius-lg)',
        backdropFilter: 'blur(24px) saturate(1.3)',
        WebkitBackdropFilter: 'blur(24px) saturate(1.3)',
        cursor: onClick ? 'pointer' : 'default',
      }}
      className={className}
      whileHover={hoverable ? {
        y: -4,
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
      {children}
    </motion.div>
  )
}

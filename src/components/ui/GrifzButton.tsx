'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'

/* ─── Types ─────────────────────────────────────────────────
   GrifzButton — CTA principal et secondaire
   Utilisable comme <a> (href) ou <button> (onClick)
   ─────────────────────────────────────────────────────────── */
interface GrifzButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary'
  href?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
  fullWidth?: boolean
  size?: 'sm' | 'md' | 'lg'
  className?: string
  /** Cible externe (_blank) */
  external?: boolean
}

export default function GrifzButton({
  children,
  variant = 'primary',
  href,
  onClick,
  type = 'button',
  disabled = false,
  fullWidth = false,
  size = 'md',
  className = '',
  external = false,
}: GrifzButtonProps) {

  const heights = { sm: 48, md: 56, lg: 68 }
  const fontSizes = { sm: '11px', md: '13px', lg: '14px' }
  const paddings = { sm: '0 24px', md: '0 32px', lg: '0 40px' }

  const baseStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    fontFamily: 'var(--font-sans)',
    fontSize: fontSizes[size],
    fontWeight: 500,
    letterSpacing: '0.10em',
    textTransform: 'uppercase',
    padding: paddings[size],
    height: heights[size],
    borderRadius: 'var(--radius-md)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    textDecoration: 'none',
    border: 'none',
    width: fullWidth ? '100%' : 'auto',
    opacity: disabled ? 0.5 : 1,
    transition: 'all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  }

  const primaryStyle: React.CSSProperties = {
    ...baseStyle,
    background: 'var(--ink)',
    color: '#ffffff',
  }

  const secondaryStyle: React.CSSProperties = {
    ...baseStyle,
    background: 'transparent',
    color: 'var(--ink)',
    border: '1px solid var(--line-strong)',
  }

  const style = variant === 'primary' ? primaryStyle : secondaryStyle

  const Arrow = () => (
    <motion.span
      className="arrow"
      initial={{ x: 0 }}
      whileHover={{ x: 4 }}
      transition={{ duration: 0.25 }}
      style={{ display: 'inline-flex', alignItems: 'center' }}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path
          d="M2 7h10M8 3l4 4-4 4"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.span>
  )

  const content = (
    <>
      {children}
      <Arrow />
    </>
  )

  const motionProps = {
    whileHover: disabled ? {} : {
      y: -1,
      ...(variant === 'primary'
        ? { boxShadow: '0 12px 32px rgba(8,8,8,0.25)' }
        : { borderColor: 'var(--ink)', background: 'rgba(8,8,8,0.04)' }
      ),
    },
    whileTap: disabled ? {} : { scale: 0.98 },
    transition: { duration: 0.2 },
  }

  if (href) {
    return (
      <motion.div {...motionProps} style={{ display: fullWidth ? 'block' : 'inline-block' }}>
        <Link
          href={href}
          style={{ ...style, display: 'inline-flex', width: fullWidth ? '100%' : 'auto' }}
          className={className}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
        >
          {content}
        </Link>
      </motion.div>
    )
  }

  return (
    <motion.button
      {...motionProps}
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={style}
      className={className}
    >
      {content}
    </motion.button>
  )
}

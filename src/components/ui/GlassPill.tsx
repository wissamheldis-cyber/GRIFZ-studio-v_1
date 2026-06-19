import { ButtonHTMLAttributes, forwardRef } from 'react'

export interface GlassPillProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  isActive?: boolean
  variant?: 'primary' | 'glass'
}

export const GlassPill = forwardRef<HTMLButtonElement, GlassPillProps>(
  ({ className = '', isActive = false, variant = 'glass', children, ...props }, ref) => {
    
    // Variante "Primary" : Bouton noir ultra-premium, sculpté
    const primaryClass = `
      bg-gradient-to-b from-[#2a2a2a] to-[#0a0a0a]
      text-white
      shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),_0_8px_24px_rgba(0,0,0,0.15)]
      border border-white/10
      hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),_0_12px_32px_rgba(0,0,0,0.25)]
      hover:-translate-y-0.5
    `

    // Variante "Glass" : Bouton secondaire en verre très pur (Pure Glass)
    const glassClass = `
      glass-bubble
      text-ink
      ${isActive ? 'active shadow-[0_0_0_1px_rgba(10,10,10,0.8)] scale-[1.02]' : ''}
    `

    const selectedClass = variant === 'primary' ? primaryClass : glassClass

    return (
      <button
        ref={ref}
        className={`inline-flex w-fit items-center justify-center rounded-full transition-all duration-500 ease-[var(--ease-premium)] relative overflow-hidden ${selectedClass} ${className}`}
        style={{ padding: '0 40px', minHeight: '56px' }}
        {...props}
      >
        <span className="relative z-10 flex items-center justify-center whitespace-nowrap">{children}</span>
      </button>
    )
  }
)

GlassPill.displayName = 'GlassPill'

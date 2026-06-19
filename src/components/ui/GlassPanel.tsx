'use client'

import { HTMLAttributes, forwardRef, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion'

interface GlassPanelProps extends HTMLAttributes<HTMLDivElement> {
  strong?: boolean
  children: React.ReactNode
}

export const GlassPanel = forwardRef<HTMLDivElement, GlassPanelProps>(
  ({ className = '', strong = false, children, ...props }, externalRef) => {
    const internalRef = useRef<HTMLDivElement>(null)
    const ref = (externalRef as React.RefObject<HTMLDivElement>) || internalRef

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
      const rect = ref.current?.getBoundingClientRect()
      if (rect) {
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2
        mouseX.set(x)
        mouseY.set(y)
      }
    }

    const handleMouseLeave = () => {
      mouseX.set(0)
      mouseY.set(0)
    }

    const rotateX = useTransform(mouseY, [-300, 300], [4, -4])
    const rotateY = useTransform(mouseX, [-300, 300], [-4, 4])

    const baseClass = strong ? 'liquid-panel-strong' : 'liquid-panel'
    
    // Fallback inline style pour contrer le bug de cache Turbopack sur les paddings
    let forcedPadding = undefined
    if (className.includes('p-16')) forcedPadding = '64px'
    else if (className.includes('p-14')) forcedPadding = '56px'
    else if (className.includes('p-12')) forcedPadding = '48px'
    else if (className.includes('p-10')) forcedPadding = '40px'
    else if (className.includes('p-8')) forcedPadding = '32px'
    else if (className.includes('p-6')) forcedPadding = '24px'
    else if (className.includes('p-4')) forcedPadding = '16px'

    return (
      <motion.div 
        ref={ref}
        className={`${baseClass} ${className}`} 
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ 
          padding: forcedPadding, 
          ...props.style,
          y: springY,
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          perspective: 1000,
        }}
        {...(props as any)}
      >
        <div 
          className="relative z-10 h-full w-full flex flex-col"
          style={{ 
            gap: 'inherit', 
            alignItems: 'inherit', 
            justifyContent: 'inherit', 
            textAlign: 'inherit',
            flexDirection: 'inherit',
            transform: 'translateZ(30px)' // Pop-out 3D effect
          }}
        >
          {children}
        </div>
      </motion.div>
    )
  }
)

GlassPanel.displayName = 'GlassPanel'

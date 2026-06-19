'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface ParallaxWrapperProps {
  children: React.ReactNode
  offset?: number
  className?: string
  direction?: 'up' | 'down'
}

export function ParallaxWrapper({ 
  children, 
  offset = 50, 
  className = '',
  direction = 'up'
}: ParallaxWrapperProps) {
  const ref = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const y = useTransform(
    scrollYProgress, 
    [0, 1], 
    direction === 'up' ? [offset, -offset] : [-offset, offset]
  )

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  )
}

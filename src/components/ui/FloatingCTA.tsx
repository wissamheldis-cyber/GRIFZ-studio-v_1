'use client'

import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { Link, usePathname } from '@/i18n/routing'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

export function FloatingCTA() {
  const pathname = usePathname()
  const t = useTranslations('CTA')
  const [mounted, setMounted] = useState(false)

  // Ensure hydration matches since we rely on pathname
  useEffect(() => {
    setMounted(true)
  }, [])

  // Parallax effect on scroll
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 1000], [0, 20])
  const springY = useSpring(y, { stiffness: 100, damping: 30 })

  if (!mounted) return null

  // Determine text and href based on current pathname
  let ctaText = t('book_call')
  let ctaHref = '/reservation'

  if (pathname === '/a-propos') {
    ctaText = t('start_project')
    ctaHref = '/reservation'
  } else if (pathname === '/reservation') {
    ctaText = t('discover_materials')
    ctaHref = '/catalogue'
  } else if (pathname === '/compte') {
    ctaText = t('explore_projects')
    ctaHref = '/realisations'
  }

  return (
    <motion.div
      style={{ y: springY }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[150] pointer-events-auto"
    >
      <Link href={ctaHref}>
        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.95 }}
          className="relative group overflow-hidden rounded-full p-[1px]"
        >
          {/* Animated gradient border */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/40 to-white/10 opacity-50 group-hover:opacity-100 transition-opacity duration-500 rounded-full blur-[2px]" />
          
          {/* Glassmorphism Button Background */}
          <div className="relative px-8 py-4 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-center gap-3 shadow-[0_10px_40px_rgba(0,0,0,0.5)] group-hover:shadow-[0_15px_50px_rgba(255,255,255,0.1)] transition-all duration-500">
            
            {/* Subtle inner glow */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <span className="font-sans text-[11px] md:text-xs uppercase tracking-[0.2em] font-medium text-white/90 group-hover:text-white transition-colors relative z-10">
              {ctaText}
            </span>
            
            <span className="text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all duration-300 relative z-10 text-sm">
              →
            </span>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  )
}

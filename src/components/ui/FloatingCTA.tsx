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
        <div 
          className="flex items-center justify-center gap-[10px] font-sans text-[13px] font-medium uppercase tracking-[0.4px] text-[#7e97b8] bg-[#e0e8ef] border-2 border-[rgba(255,255,255,0.333)] rounded-[40px] pl-[28px] pr-[24px] py-[16px] transition-all duration-200 shadow-[-4px_-2px_16px_0px_#ffffff,4px_2px_16px_0px_rgba(95,157,231,0.48)] hover:text-[#516d91] hover:bg-[#E5EDF5] hover:shadow-[-2px_-1px_8px_0px_#ffffff,2px_1px_8px_0px_rgba(95,157,231,0.48)] active:shadow-none"
        >
          <span>
            {ctaText}
          </span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M5 12h14"></path>
            <path d="m12 5 7 7-7 7"></path>
          </svg>
        </div>
      </Link>
    </motion.div>
  )
}

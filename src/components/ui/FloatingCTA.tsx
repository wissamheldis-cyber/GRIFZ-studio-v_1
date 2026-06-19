'use client'

import { motion, useScroll, useTransform, useSpring, useMotionValueEvent, AnimatePresence } from 'framer-motion'
import { Link, usePathname } from '@/i18n/routing'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { MagicButton } from '@/components/ui/MagicButton'

export function FloatingCTA() {
  const pathname = usePathname()
  const t = useTranslations('CTA')
  const [mounted, setMounted] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  // Ensure hydration matches since we rely on pathname
  useEffect(() => {
    setMounted(true)
  }, [])

  // Parallax effect on scroll
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 1000], [0, 20])
  const springY = useSpring(y, { stiffness: 100, damping: 30 })

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (typeof window !== 'undefined') {
      const scrollHeight = document.documentElement.scrollHeight
      const clientHeight = window.innerHeight
      const distanceToBottom = scrollHeight - clientHeight - latest
      
      // Hide if we are within 200px of the bottom (reaching the footer)
      if (distanceToBottom < 200) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
    }
  })

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
    <AnimatePresence>
      {isVisible && (
        <motion.div
          style={{ y: springY }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50, transition: { duration: 0.3 } }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[150] pointer-events-auto"
        >
          <Link href={ctaHref}>
            <MagicButton className="px-10 group">
              <span className="flex items-center gap-3">
                <span className="font-sans text-xs tracking-[0.2em] uppercase font-medium">
                  {ctaText}
                </span>
                <span className="group-hover:translate-x-2 transition-transform duration-300">
                  →
                </span>
              </span>
            </MagicButton>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

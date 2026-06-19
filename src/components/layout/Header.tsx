'use client'

import { Link, usePathname } from '@/i18n/routing'
import { useLocale, useTranslations } from 'next-intl'
import Orb from '@/components/ui/Orb'
import { useHeaderContext } from '@/context/HeaderContext'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Header() {
  const pathname = usePathname()
  const locale = useLocale()
  
  const isActive = (href: string) => href === '/' ? pathname === '/' : pathname.startsWith(href)
  const { activeOrbImage } = useHeaderContext()
  const t = useTranslations('Header')

  /* ─── State for Dynamic Label ────────────────────────────── */
  const [hoveredLabel, setHoveredLabel] = useState<string | null>(null)
  const [showCurrent, setShowCurrent] = useState(true)

  useEffect(() => {
    setShowCurrent(true)
    const timer = setTimeout(() => {
      setShowCurrent(false)
    }, 3000)
    return () => clearTimeout(timer)
  }, [pathname])

  /* ─── Navigation ─────────────────────────────────────────── */
  const LEFT_LINKS = [
    { href: '/realisations', label: t('nav_works'),   image: '/orb/works.png' },
    { href: '/catalogue',   label: t('nav_catalog'), image: '/orb/catalog.png' },
    { href: '/',            label: t('nav_home'),    image: '/orb/home.png' },
  ]

  const RIGHT_LINKS = [
    { href: '/reservation', label: t('nav_reservation'), image: '/orb/booking.png' },
    { href: '/a-propos',    label: t('nav_about'),       image: '/orb/about.png' },
    { href: '/compte',      label: t('nav_account'),     image: '/orb/account.png' },
  ]

  const ALL_LINKS = [...LEFT_LINKS, ...RIGHT_LINKS]
  const currentLink = ALL_LINKS.find(link => isActive(link.href))
  const currentLabel = currentLink ? currentLink.label : ''

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-[100] flex flex-col items-center pt-4 md:pt-8 pb-4 pointer-events-none transition-all duration-700"
      >
        <div className="w-full max-w-[1400px] flex items-center justify-between relative min-h-[80px] md:min-h-[120px] z-10 mx-auto px-6 md:px-12">
          
          {/* Switcher EN (Extrême gauche) */}
          <div className="pointer-events-auto z-20 shrink-0">
            <Link 
              href={pathname} 
              locale="en" 
              className={`block transition-all duration-300 ${locale === 'en' ? 'scale-110 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]' : 'opacity-60 hover:opacity-100 hover:scale-105'}`}
            >
              <Image src="/orb/eng.png" alt="English" width={48} height={48} className="object-contain" unoptimized />
            </Link>
          </div>

          {/* Wrapper central pour aligner pilules et orbe (Desktop) */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[900px] flex items-center justify-between px-4 lg:px-16 pointer-events-none hidden md:flex">
            
            {/* Pilule Gauche */}
            <nav className="flex items-center gap-6 bg-white/20 backdrop-blur-xl px-8 py-3 rounded-full border border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.05),inset_0_1px_2px_rgba(255,255,255,0.4)] pointer-events-auto transition-transform duration-500 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] hover:bg-white/30">
              {LEFT_LINKS.map((link) => {
                const active = isActive(link.href)
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onMouseEnter={() => setHoveredLabel(link.label)}
                    onMouseLeave={() => setHoveredLabel(null)}
                    className="group no-underline"
                  >
                    <div
                      className={`transition-all duration-500 w-[48px] h-[48px] flex items-center justify-center rounded-full ${active ? 'scale-110 drop-shadow-[0_0_12px_rgba(255,255,255,0.6)]' : 'opacity-70 group-hover:opacity-100 group-hover:scale-110'}`}
                    >
                      <Image src={link.image} alt={link.label} width={48} height={48} className="object-contain" unoptimized />
                    </div>
                  </Link>
                )
              })}
            </nav>

            {/* Espace vide pour l'orbe centrale */}
            <div className="w-[120px] shrink-0" />

            {/* Pilule Droite */}
            <nav className="flex items-center gap-6 bg-white/20 backdrop-blur-xl px-8 py-3 rounded-full border border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.05),inset_0_1px_2px_rgba(255,255,255,0.4)] pointer-events-auto transition-transform duration-500 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] hover:bg-white/30">
              {RIGHT_LINKS.map((link) => {
                const active = isActive(link.href)
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onMouseEnter={() => setHoveredLabel(link.label)}
                    onMouseLeave={() => setHoveredLabel(null)}
                    className="group no-underline"
                  >
                    <div
                      className={`transition-all duration-500 w-[48px] h-[48px] flex items-center justify-center rounded-full ${active ? 'scale-110 drop-shadow-[0_0_12px_rgba(255,255,255,0.6)]' : 'opacity-70 group-hover:opacity-100 group-hover:scale-110'}`}
                    >
                      <Image src={link.image} alt={link.label} width={48} height={48} className="object-contain" unoptimized />
                    </div>
                  </Link>
                )
              })}
            </nav>
          </div>

          {/* L'Orb Centrale (Fixée au centre absolu) */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none flex flex-col items-center justify-center w-[120px] h-[120px]">
            <div className="relative transition-all duration-500 pointer-events-auto scale-[0.75] md:scale-100 flex items-center justify-center drop-shadow-[0_12px_30px_rgba(0,0,0,0.15)] hover:drop-shadow-[0_15px_40px_rgba(0,0,0,0.25)] hover:scale-[1.05]">
              <Orb
                material="grifz"
                customImage={activeOrbImage}
                size={120}
                showLogo={false}
                animated={true}
                intensity={0.15}
              />
            </div>
            
            {/* Dynamic Label just below Orb */}
            <div className="absolute top-[100%] mt-8 left-1/2 -translate-x-1/2 whitespace-nowrap h-[24px] flex items-center justify-center pointer-events-none">
              <AnimatePresence mode="wait">
                {(hoveredLabel || (showCurrent && currentLabel)) && (
                  <motion.span
                    key={hoveredLabel || currentLabel}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ duration: 0.3 }}
                    className="font-serif text-ink tracking-[0.2em] uppercase text-sm md:text-xl drop-shadow-[0_2px_10px_rgba(255,255,255,0.8)]"
                  >
                    {hoveredLabel || currentLabel}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Switcher FR (Extrême droite) */}
          <div className="pointer-events-auto z-20 shrink-0">
            <Link 
              href={pathname} 
              locale="fr" 
              className={`block transition-all duration-300 ${locale === 'fr' ? 'scale-110 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]' : 'opacity-60 hover:opacity-100 hover:scale-105'}`}
            >
              <Image src="/orb/fr.png" alt="Français" width={48} height={48} className="object-contain" unoptimized />
            </Link>
          </div>
        </div>

        {/* Mobile Navigation (Stacked below header) */}
        <div className="md:hidden flex flex-row justify-center gap-4 mt-8 w-full px-4 pointer-events-none z-20">
          <nav className="flex items-center justify-center gap-3 bg-white/20 backdrop-blur-xl px-4 py-2 rounded-full border border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.05)] pointer-events-auto">
            {LEFT_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="group no-underline">
                <div className={`w-[40px] h-[40px] flex items-center justify-center ${isActive(link.href) ? 'scale-110 drop-shadow-md' : 'opacity-70'}`}>
                  <Image src={link.image} alt={link.label} width={40} height={40} className="object-contain" unoptimized />
                </div>
              </Link>
            ))}
          </nav>
          <nav className="flex items-center justify-center gap-3 bg-white/20 backdrop-blur-xl px-4 py-2 rounded-full border border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.05)] pointer-events-auto">
            {RIGHT_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="group no-underline">
                <div className={`w-[40px] h-[40px] flex items-center justify-center ${isActive(link.href) ? 'scale-110 drop-shadow-md' : 'opacity-70'}`}>
                  <Image src={link.image} alt={link.label} width={40} height={40} className="object-contain" unoptimized />
                </div>
              </Link>
            ))}
          </nav>
        </div>

      </header>
    </>
  )
}

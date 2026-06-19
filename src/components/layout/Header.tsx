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
  
  // usePathname from next-intl already returns the path without the locale prefix!
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
    { href: '/',            label: t('nav_home'),    image: '/orb/home.png' },
    { href: '/realisations', label: t('nav_works'),   image: '/orb/works.png' },
    { href: '/catalogue',   label: t('nav_catalog'), image: '/orb/catalog.png' },
  ]

  const RIGHT_LINKS = [
    { href: '/reservation', label: t('nav_reservation'), image: '/orb/booking.png' },
    { href: '/a-propos',    label: t('nav_about'),       image: '/orb/about.png' },
    { href: '/compte',      label: t('nav_account'),     image: '/orb/account.png' },
  ]

  const ALL_LINKS = [...LEFT_LINKS, ...RIGHT_LINKS]
  const currentLink = ALL_LINKS.find(link => isActive(link.href))
  const currentLabel = currentLink ? currentLink.label : ''
  /* ─── State for Scroll Blur ──────────────────────────────── */
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    handleScroll() // initial check
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* ─── Header Flottant ──────────────────────────────── */}
      <header
        className="fixed top-0 left-0 right-0 z-[100] flex justify-center pt-2 md:pt-6 pb-2 pointer-events-none transition-all duration-700"
      >
        {/* Force l'application des marges via CSS pur pour éviter tout bug de compilation Tailwind */}
        <style dangerouslySetInnerHTML={{ __html: `
          .left-nav-spacing { padding-right: 75px; }
          .right-nav-spacing { padding-left: 75px; }
          @media (min-width: 768px) {
            .left-nav-spacing { padding-right: 100px; }
            .right-nav-spacing { padding-left: 100px; }
          }
          @media (min-width: 1024px) {
            .left-nav-spacing { padding-right: 140px; }
            .right-nav-spacing { padding-left: 140px; }
          }
        `}} />

        {/* Conteneur très large qui devient un "pill" au scroll */}
        <div 
          className={`w-[98%] md:w-[95%] max-w-6xl flex items-center justify-center relative min-h-[70px] md:min-h-[120px] z-10 mx-auto transition-all duration-700 pointer-events-auto ${
            isScrolled 
              ? 'bg-[var(--header-bg)] backdrop-blur-2xl shadow-[var(--header-shadow)] border border-white/20 rounded-[40px] md:rounded-[60px]' 
              : 'bg-transparent border-transparent'
          }`}
        >
          
          {/* Switcher EN (gauche) */}
          <div className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 z-20">
            <Link 
              href={pathname} 
              locale="en" 
              className={`block transition-all duration-300 ${locale === 'en' ? 'scale-110 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]' : 'opacity-50 hover:opacity-100 hover:scale-105'}`}
            >
              <Image src="/orb/eng.png" alt="English" width={40} height={40} className="object-contain" unoptimized />
            </Link>
          </div>

          {/* Switcher FR (droite) */}
          <div className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 z-20">
            <Link 
              href={pathname} 
              locale="fr" 
              className={`block transition-all duration-300 ${locale === 'fr' ? 'scale-110 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]' : 'opacity-50 hover:opacity-100 hover:scale-105'}`}
            >
              <Image src="/orb/fr.png" alt="Français" width={40} height={40} className="object-contain" unoptimized />
            </Link>
          </div>

          {/* L'Orb Centrale - En absolu pour garantir le centre parfait */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center justify-center pointer-events-none w-[120px] h-[120px]">
            <div className="relative transition-all duration-300 pointer-events-auto scale-[0.66] md:scale-[0.83] lg:scale-100 flex items-center justify-center drop-shadow-[0_12px_25px_rgba(0,0,0,0.4)] hover:drop-shadow-[0_15px_30px_rgba(0,0,0,0.5)]">
              <Orb
                material="grifz"
                customImage={activeOrbImage}
                size={120}
                showLogo={false}
                animated={true}
                intensity={0.15}
              />
            </div>
            
            {/* Dynamic Label */}
            <div className="absolute top-[100%] mt-48 left-1/2 -translate-x-1/2 whitespace-nowrap h-[24px] flex items-center justify-center pointer-events-none">
              <AnimatePresence mode="wait">
                {(hoveredLabel || (showCurrent && currentLabel)) && (
                  <motion.span
                    key={hoveredLabel || currentLabel}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ duration: 0.3 }}
                    className="font-serif text-ink tracking-[0.15em] uppercase text-lg md:text-2xl drop-shadow-[0_2px_10px_rgba(255,255,255,0.8)]"
                  >
                    {hoveredLabel || currentLabel}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Navigation Gauche */}
          {/* Padding géré par la classe custom CSS garantie */}
          <nav className="w-1/2 flex flex-col items-end gap-1 md:gap-2 left-nav-spacing">
            {LEFT_LINKS.map((link, index) => {
              const active = isActive(link.href)
              // Courbe inversée : Le milieu s'éloigne, les bords sont proches de l'orb
              const curveClass = index === 1 ? '-translate-x-2 md:-translate-x-4' : 'translate-x-0'
              
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onMouseEnter={() => setHoveredLabel(link.label)}
                  onMouseLeave={() => setHoveredLabel(null)}
                  className={`group no-underline transition-all duration-500 ${curveClass}`}
                >
                  <div
                    className={`transition-all duration-500 ${active ? 'scale-125 translate-x-2 md:translate-x-5 drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]' : 'opacity-60 group-hover:opacity-100 group-hover:scale-125 group-hover:translate-x-2 md:group-hover:translate-x-5'}`}
                  >
                    <Image src={link.image} alt={link.label} width={58} height={58} className="object-contain" unoptimized />
                  </div>
                </Link>
              )
            })}
          </nav>

          {/* Navigation Droite */}
          <nav className="w-1/2 flex flex-col items-start gap-1 md:gap-2 right-nav-spacing">
            {RIGHT_LINKS.map((link, index) => {
              const active = isActive(link.href)
              // Courbe inversée : Le milieu s'éloigne, les bords sont proches de l'orb
              const curveClass = index === 1 ? 'translate-x-2 md:translate-x-4' : 'translate-x-0'
              
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onMouseEnter={() => setHoveredLabel(link.label)}
                  onMouseLeave={() => setHoveredLabel(null)}
                  className={`group no-underline transition-all duration-500 ${curveClass}`}
                >
                  <div
                    className={`transition-all duration-500 ${active ? 'scale-125 -translate-x-2 md:-translate-x-5 drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]' : 'opacity-60 group-hover:opacity-100 group-hover:scale-125 group-hover:-translate-x-2 md:group-hover:-translate-x-5'}`}
                  >
                    <Image src={link.image} alt={link.label} width={58} height={58} className="object-contain" unoptimized />
                  </div>
                </Link>
              )
            })}
          </nav>

        </div>
      </header>
    </>
  )
}

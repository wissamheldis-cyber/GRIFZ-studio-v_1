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

  /* ─── Navigation Orbitale ────────────────────────────────── */
  // On définit le rayon de l'orbite (en pixels)
  const ORBIT_RADIUS = 160

  // Angles en degrés (0 = Haut, rotation horaire)
  // Arc gauche: Accueil, Réalisations, Catalogue
  // Arc droit: Réservation, À Propos, Compte
  const LEFT_LINKS = [
    { href: '/',            label: t('nav_home'),    image: '/orb/home.png',    angle: -45 },
    { href: '/realisations', label: t('nav_works'),   image: '/orb/works.png',   angle: -90 },
    { href: '/catalogue',   label: t('nav_catalog'), image: '/orb/catalog.png', angle: -135 },
  ]

  const RIGHT_LINKS = [
    { href: '/reservation', label: t('nav_reservation'), image: '/orb/booking.png', angle: 45 },
    { href: '/a-propos',    label: t('nav_about'),       image: '/orb/about.png',   angle: 90 },
    { href: '/compte',      label: t('nav_account'),     image: '/orb/account.png', angle: 135 },
  ]

  const ALL_LINKS = [...LEFT_LINKS, ...RIGHT_LINKS]
  const currentLink = ALL_LINKS.find(link => isActive(link.href))
  const currentLabel = currentLink ? currentLink.label : ''

  // Fonction trigonométrique pour positionner un élément sur l'orbite
  const getOrbitPosition = (angleDeg: number) => {
    const angleRad = (angleDeg * Math.PI) / 180
    const x = Math.sin(angleRad) * ORBIT_RADIUS
    const y = -Math.cos(angleRad) * ORBIT_RADIUS
    return {
      left: `calc(50% + ${x}px)`,
      top: `calc(50% + ${y}px)`,
    }
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[100] w-full pt-4 md:pt-8 pointer-events-none">
        
        {/* Conteneur principal plein écran */}
        <div className="w-full h-[320px] relative mx-auto max-w-[1400px]">
          
          {/* Switcher EN (Extrême gauche, milieu de la hauteur) */}
          <div className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 pointer-events-auto z-20">
            <Link 
              href={pathname} 
              locale="en" 
              className={`block transition-all duration-300 ${locale === 'en' ? 'scale-110 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]' : 'opacity-60 hover:opacity-100 hover:scale-105'}`}
            >
              <Image src="/orb/eng.png" alt="English" width={48} height={48} className="object-contain" unoptimized />
            </Link>
          </div>

          {/* Switcher FR (Extrême droite, milieu de la hauteur) */}
          <div className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 pointer-events-auto z-20">
            <Link 
              href={pathname} 
              locale="fr" 
              className={`block transition-all duration-300 ${locale === 'fr' ? 'scale-110 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]' : 'opacity-60 hover:opacity-100 hover:scale-105'}`}
            >
              <Image src="/orb/fr.png" alt="Français" width={48} height={48} className="object-contain" unoptimized />
            </Link>
          </div>

          {/* Wrapper Orbital Central (Responsif via scale) */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] scale-[0.6] sm:scale-[0.8] md:scale-100 transition-transform duration-500 origin-center">
            
            {/* L'Anneau Orbital Lumineux */}
            <div className="absolute inset-0 rounded-full border border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.1),inset_0_0_20px_rgba(255,255,255,0.05)] pointer-events-none" />

            {/* L'Orb Centrale */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-auto flex items-center justify-center drop-shadow-[0_12px_30px_rgba(0,0,0,0.15)] hover:drop-shadow-[0_15px_40px_rgba(0,0,0,0.25)] hover:scale-[1.05] transition-all duration-500">
              <Orb
                material="grifz"
                customImage={activeOrbImage}
                size={120}
                showLogo={false}
                animated={true}
                intensity={0.15}
              />
            </div>
            
            {/* Texte Dynamique (fixé en bas de l'orbe centrale) */}
            <div className="absolute top-1/2 mt-[80px] left-1/2 -translate-x-1/2 whitespace-nowrap flex items-center justify-center pointer-events-none z-40">
              <AnimatePresence mode="wait">
                {(hoveredLabel || (showCurrent && currentLabel)) && (
                  <motion.span
                    key={hoveredLabel || currentLabel}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ duration: 0.3 }}
                    className="font-serif text-ink tracking-[0.2em] uppercase text-xl drop-shadow-[0_2px_10px_rgba(255,255,255,0.8)]"
                  >
                    {hoveredLabel || currentLabel}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            {/* Icônes de Navigation (Positionnées sur l'orbite) */}
            {ALL_LINKS.map((link) => {
              const active = isActive(link.href)
              return (
                <div
                  key={link.href}
                  className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto z-20"
                  style={getOrbitPosition(link.angle)}
                >
                  <Link
                    href={link.href}
                    onMouseEnter={() => setHoveredLabel(link.label)}
                    onMouseLeave={() => setHoveredLabel(null)}
                    className="group flex items-center justify-center w-[44px] h-[44px] bg-white/20 backdrop-blur-md rounded-full border border-white/30 shadow-[0_4px_15px_rgba(0,0,0,0.1)] transition-all duration-500 hover:bg-white/40 hover:scale-125"
                  >
                    <Image 
                      src={link.image} 
                      alt={link.label} 
                      width={28} 
                      height={28} 
                      className={`object-contain transition-all duration-500 ${active ? 'scale-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'opacity-80 group-hover:opacity-100'}`} 
                      unoptimized 
                    />
                  </Link>
                </div>
              )
            })}
            
          </div>
        </div>
      </header>
    </>
  )
}

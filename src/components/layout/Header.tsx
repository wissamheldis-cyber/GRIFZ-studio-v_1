'use client'

import { Link, usePathname } from '@/i18n/routing'
import { useLocale, useTranslations } from 'next-intl'
import Orb from '@/components/ui/Orb'
import { useHeaderContext } from '@/context/HeaderContext'
import Image from 'next/image'

export default function Header() {
  const pathname = usePathname()
  const locale = useLocale()
  
  // usePathname from next-intl already returns the path without the locale prefix!
  const isActive = (href: string) => href === '/' ? pathname === '/' : pathname.startsWith(href)
  const { activeOrbImage } = useHeaderContext()
  const t = useTranslations('Header')

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

  return (
    <>
      {/* ─── Header Flottant ──────────────────────────────── */}
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          display: 'flex',
          justifyContent: 'center',
          paddingTop: '16px',
          paddingBottom: '16px',
          background: 'var(--header-bg)',
          backdropFilter: 'blur(32px) saturate(1.8)',
          WebkitBackdropFilter: 'blur(32px) saturate(1.8)',
          boxShadow: 'var(--header-shadow)',
          transition: 'background 0.7s ease, box-shadow 0.7s ease',
        }}
      >
        {/* Ligne translucide pour délimiter légèrement le bas si nécessaire */}
        <div className="absolute inset-0 w-full h-full border-b border-white/20 pointer-events-none z-0" />

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

        {/* Conteneur très large - passe en z-10 pour être au dessus de l'animation */}
        <div className="w-full max-w-6xl flex items-center justify-center relative min-h-[70px] md:min-h-[120px] z-10 mx-auto">
          
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
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center pointer-events-none w-[120px] h-[120px]">
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
          </div>

          {/* Navigation Gauche */}
          {/* Padding géré par la classe custom CSS garantie */}
          <nav className="w-1/2 flex flex-col items-end gap-3 md:gap-4 left-nav-spacing">
            {LEFT_LINKS.map((link, index) => {
              const active = isActive(link.href)
              // Courbe inversée : Le milieu s'éloigne, les bords sont proches de l'orb
              const curveClass = index === 1 ? '-translate-x-3 md:-translate-x-6' : 'translate-x-0'
              
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`group whitespace-nowrap flex items-center gap-2 md:gap-[10px] no-underline transition-all duration-300 ${curveClass}`}
                >
                  <div
                    className={`transition-all duration-300 ${active ? 'scale-110 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]' : 'opacity-70 group-hover:opacity-100 group-hover:scale-105'}`}
                  >
                    <Image src={link.image} alt={link.label} width={36} height={36} className="object-contain" unoptimized />
                  </div>
                  <span
                    className="text-[14px] md:text-[18px] w-[8px] md:w-[12px] flex items-center justify-center transition-colors duration-300 group-hover:text-ink"
                    style={{
                      color: active ? 'var(--ink)' : 'var(--muted)',
                      lineHeight: 1,
                    }}
                  >
                    {active ? '•' : '·'}
                  </span>
                </Link>
              )
            })}
          </nav>

          {/* Navigation Droite */}
          <nav className="w-1/2 flex flex-col items-start gap-3 md:gap-4 right-nav-spacing">
            {RIGHT_LINKS.map((link, index) => {
              const active = isActive(link.href)
              // Courbe inversée : Le milieu s'éloigne, les bords sont proches de l'orb
              const curveClass = index === 1 ? 'translate-x-3 md:translate-x-6' : 'translate-x-0'
              
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`group whitespace-nowrap flex items-center gap-2 md:gap-[10px] no-underline transition-all duration-300 ${curveClass}`}
                >
                  <span
                    className="text-[14px] md:text-[18px] w-[8px] md:w-[12px] flex items-center justify-center transition-colors duration-300 group-hover:text-ink"
                    style={{
                      color: active ? 'var(--ink)' : 'var(--muted)',
                      lineHeight: 1,
                    }}
                  >
                    {active ? '•' : '·'}
                  </span>
                  <div
                    className={`transition-all duration-300 ${active ? 'scale-110 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]' : 'opacity-70 group-hover:opacity-100 group-hover:scale-105'}`}
                  >
                    <Image src={link.image} alt={link.label} width={36} height={36} className="object-contain" unoptimized />
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

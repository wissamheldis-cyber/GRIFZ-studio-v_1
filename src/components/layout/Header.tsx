'use client'

import { Link, usePathname } from '@/i18n/routing'
import { useLocale, useTranslations } from 'next-intl'
import Orb from '@/components/ui/Orb'
import { useHeaderContext } from '@/context/HeaderContext'

export default function Header() {
  const pathname = usePathname()
  const locale = useLocale()
  
  // usePathname from next-intl already returns the path without the locale prefix!
  const isActive = (href: string) => href === '/' ? pathname === '/' : pathname.startsWith(href)
  const { activeOrbImage } = useHeaderContext()
  const t = useTranslations('Header')

  /* ─── Navigation ─────────────────────────────────────────── */
  const LEFT_LINKS = [
    { href: '/',            label: t('nav_home') },
    { href: '/realisations', label: t('nav_works') },
    { href: '/catalogue',   label: t('nav_catalog') },
  ]

  const RIGHT_LINKS = [
    { href: '/reservation', label: t('nav_reservation') },
    { href: '/a-propos',    label: t('nav_about') },
    { href: '/compte',      label: t('nav_account') },
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
              style={{ fontFamily: 'var(--font-sans)' }}
              className={`text-xs md:text-sm transition-all duration-300 ${locale === 'en' ? 'text-ink font-semibold' : 'text-muted hover:text-ink'}`}
            >
              EN
            </Link>
          </div>

          {/* Switcher FR (droite) */}
          <div className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 z-20">
            <Link 
              href={pathname} 
              locale="fr" 
              style={{ fontFamily: 'var(--font-sans)' }}
              className={`text-xs md:text-sm transition-all duration-300 ${locale === 'fr' ? 'text-ink font-semibold' : 'text-muted hover:text-ink'}`}
            >
              FR
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
                  <span
                    style={{
                      fontFamily: 'var(--font-header)',
                      fontWeight: active ? 400 : 300,
                      color: active ? 'var(--ink)' : 'var(--muted)',
                      letterSpacing: '0.05em',
                      transition: 'all 0.3s ease',
                      textTransform: active ? 'uppercase' : 'none',
                    }}
                    className="text-[11px] md:text-[14px] lg:text-[15px] group-hover:text-ink"
                  >
                    {link.label}
                  </span>
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
                  <span
                    style={{
                      fontFamily: 'var(--font-header)',
                      fontWeight: active ? 400 : 300,
                      color: active ? 'var(--ink)' : 'var(--muted)',
                      letterSpacing: '0.05em',
                      transition: 'all 0.3s ease',
                      textTransform: active ? 'uppercase' : 'none',
                    }}
                    className="text-[11px] md:text-[14px] lg:text-[15px] group-hover:text-ink"
                  >
                    {link.label}
                  </span>
                </Link>
              )
            })}
          </nav>

        </div>
      </header>
    </>
  )
}

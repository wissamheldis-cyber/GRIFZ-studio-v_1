'use client'

import { Link } from '@/i18n/routing'
import { useTranslations } from 'next-intl'

/* ─── Footer ─────────────────────────────────────────────── */
export default function Footer() {
  const year = new Date().getFullYear()
  const t = useTranslations('Footer')

  return (
    <footer
      style={{
        position: 'relative',
        zIndex: 1,
        marginTop: '240px', // Règle : Toujours une marge conséquente avant le footer
        borderTop: '1px solid rgba(255,255,255,0.5)',
        padding: '60px 28px',
        background: 'rgba(255, 255, 255, 0.3)',
        backdropFilter: 'blur(32px) saturate(1.5)',
        WebkitBackdropFilter: 'blur(32px) saturate(1.5)',
        boxShadow: '0 -4px 30px rgba(0,0,0,0.02), inset 0 1px 0 rgba(255,255,255,0.8)'
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
        }}
      >
        {/* Ligne principale */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 24,
          }}
        >
          {/* Logo + tagline */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '18px',
                fontWeight: 400,
                letterSpacing: '0.15em',
                color: 'var(--ink)',
                textTransform: 'uppercase',
              }}
            >
              GRIFZ
            </span>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '12px',
                color: 'var(--muted)',
                letterSpacing: '0.02em',
              }}
            >
              {t('subtitle')}
            </span>
          </div>

          {/* Navigation secondaire */}
          <nav
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px 32px',
              alignItems: 'flex-start',
            }}
          >
            <Link href="/realisations" style={linkStyle}>{t('nav_works')}</Link>
            <Link href="/catalogue" style={linkStyle}>{t('nav_catalog')}</Link>
            <Link href="/reservation" style={linkStyle}>{t('nav_reservation')}</Link>
            <Link href="/a-propos" style={linkStyle}>{t('nav_about')}</Link>
            <Link href="/contact" style={linkStyle}>{t('nav_contact')}</Link>
          </nav>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'var(--line)' }} />

        {/* Ligne basse */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 16,
          }}
        >
          <span style={{ ...smallStyle, color: 'var(--muted)' }}>
            © {year} GRIFZ Studio. {t('rights')}
          </span>
          <div style={{ display: 'flex', gap: 24 }}>
            <Link href="/mentions-legales" style={smallLinkStyle}>{t('legal_mentions')}</Link>
            <Link href="/confidentialite" style={smallLinkStyle}>{t('privacy')}</Link>
            <Link href="/cgv" style={smallLinkStyle}>{t('cgv')}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ─── Styles ─────────────────────────────────────────────── */
const linkStyle: React.CSSProperties = {
  fontFamily: 'var(--font-sans)',
  fontSize: '12px',
  fontWeight: 500,
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  textDecoration: 'none',
  color: 'var(--ink-soft)',
  transition: 'color 0.2s ease',
}

const smallStyle: React.CSSProperties = {
  fontFamily: 'var(--font-sans)',
  fontSize: '11px',
  letterSpacing: '0.03em',
}

const smallLinkStyle: React.CSSProperties = {
  ...smallStyle,
  textDecoration: 'none',
  color: 'var(--muted)',
}

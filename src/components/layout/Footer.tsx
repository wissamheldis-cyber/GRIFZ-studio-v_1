import Link from 'next/link'

/* ─── Footer ─────────────────────────────────────────────── */
export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      style={{
        position: 'relative',
        zIndex: 1,
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
              Studio d'évolution digitale 360
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
            <Link href="/realisations" style={linkStyle}>Réalisations</Link>
            <Link href="/catalogue" style={linkStyle}>Catalogue</Link>
            <Link href="/reservation" style={linkStyle}>Réservation</Link>
            <Link href="/a-propos" style={linkStyle}>À propos</Link>
            <Link href="/contact" style={linkStyle}>Contact</Link>
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
            © {year} GRIFZ Studio. Tous droits réservés.
          </span>
          <div style={{ display: 'flex', gap: 24 }}>
            <Link href="/mentions-legales" style={smallLinkStyle}>Mentions légales</Link>
            <Link href="/confidentialite" style={smallLinkStyle}>Confidentialité</Link>
            <Link href="/cgv" style={smallLinkStyle}>CGV</Link>
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

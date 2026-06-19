import type { Metadata, Viewport } from 'next'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { HeaderProvider } from '@/context/HeaderContext'
import { ThemeProvider } from '@/components/layout/ThemeProvider'
import RainBackground from '@/components/layout/RainBackground'
import ThreeLiquidBackground from '@/components/ui/ThreeLiquidBackground'
import { GrifzLoadingIntro } from '@/components/ui/GrifzLoadingIntro'

/* ─── Métadonnées SEO ────────────────────────────────────── */
export const metadata: Metadata = {
  title: {
    default: 'GRIFZ Studio — Présence digitale sculptée par la matière',
    template: '%s — GRIFZ Studio',
  },
  description:
    'GRIFZ Studio conçoit des identités, sites et expériences digitales premium pour marques, entreprises et créatifs exigeants. Studio d\'évolution digitale 360.',
  keywords: [
    'studio digital',
    'identité visuelle',
    'site web premium',
    'direction artistique',
    'liquid glass',
    'refonte digitale',
  ],
  authors: [{ name: 'GRIFZ Studio' }],
  creator: 'GRIFZ Studio',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: 'GRIFZ Studio',
    title: 'GRIFZ Studio — Présence digitale sculptée par la matière',
    description: 'Studio premium d\'évolution digitale 360. Identités, sites et expériences digitales premium.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#f7f3ed',
}

/* ─── Layout racine ──────────────────────────────────────── */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <head>
        {/* Google Fonts — preconnect */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="glass-bg transition-colors duration-700 ease-in-out">
        <ThreeLiquidBackground />
        <ThemeProvider />
        <RainBackground />
        <HeaderProvider>
          <GrifzLoadingIntro />
          <Header />
          <main style={{ paddingTop: 200 }}>
            {children}
          </main>
          <Footer />
        </HeaderProvider>
      </body>
    </html>
  )
}

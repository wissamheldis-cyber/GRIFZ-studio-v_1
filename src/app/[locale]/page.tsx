'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from '@/i18n/routing'
import { useTranslations } from 'next-intl'
import Orb from '@/components/ui/Orb'
import LiquidCard from '@/components/ui/LiquidCard'
import { MagicButton } from '@/components/ui/MagicButton'
import { GlassPanel } from '@/components/ui/GlassPanel'
import { ParallaxWrapper } from '@/components/ui/ParallaxWrapper'
import { FlipCard } from '@/components/ui/FlipCard'
import WireframeSphere from '@/components/ui/WireframeSphere'

/* ─── Animations ──────────────────────────────────────────── */
const EASE = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: EASE },
})

/* ─── Page Accueil ───────────────────────────────────────── */
export default function HomePage() {
  const t = useTranslations('Home')

  // Easter egg: 3 clics rapides sur la sphère pour relancer l'intro
  const [clickCount, setClickCount] = useState(0)
  
  const handleSphereClick = () => {
    const newCount = clickCount + 1
    if (newCount >= 3) {
      // 3ème clic = reset et reload
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem('grifz-intro-seen')
        window.location.reload()
      }
    } else {
      setClickCount(newCount)
      // Reset si pas de clic supplémentaire dans la seconde
      setTimeout(() => {
        setClickCount(prev => (prev === newCount ? 0 : prev))
      }, 1500)
    }
  }

  return (
    <>
      {/* ─── Hero ───────────────────────────────────────── */}
      <section
        style={{
          minHeight: 'calc(100vh - 72px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          padding: '20px 28px 80px', // Less padding top
          position: 'relative',
          overflow: 'hidden',
          textAlign: 'center',
        }}
      >
        {/* Bloc Sphere + Label superposé */}
        <div className="relative flex justify-center items-center mt-[-80px] mb-[60px] w-full">
          {/* Sphere 3D avec Easter Egg */}
          <motion.div
            {...fadeUp(0.25)}
            className="w-full flex justify-center cursor-pointer relative z-20"
            onClick={handleSphereClick}
            animate={{
              scale: 1 + clickCount * 0.08,
              filter: `drop-shadow(0 0 ${clickCount * 20}px rgba(255,255,255, ${clickCount * 0.4}))`
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <WireframeSphere 
              size={240} 
              items={24} 
              color="rgba(0, 0, 0, 0.5)" 
              glow1="rgba(255, 255, 255, 0.1)" 
              glow2="rgba(255, 255, 255, 0.2)" 
            />
          </motion.div>

          {/* Label */}
          <motion.div
            {...fadeUp(0.2)}
            className="absolute z-10 pointer-events-none text-black flex flex-col items-center justify-center leading-none"
            style={{ 
              fontFamily: '"Audiowide", cursive',
              textShadow: '0 0 12px rgba(255,255,255,0.9), 0 0 20px rgba(255,255,255,0.6)'
            }}
          >
            <span className="text-3xl md:text-5xl tracking-widest uppercase">
              GRIFZ
            </span>
            <span className="text-lg md:text-xl tracking-[0.3em] font-normal mt-2 opacity-90">
              studio
            </span>
          </motion.div>
        </div>

        {/* Grand titre */}
        <motion.h1
          {...fadeUp(0.3)}
          style={{
            fontFamily: 'var(--font-serif)',
            fontWeight: 400,
            fontSize: 'clamp(48px, 8vw, 120px)',
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            color: 'var(--ink)',
            maxWidth: 900,
            marginBottom: 28,
          }}
        >
          {t('hero_title')}
        </motion.h1>

        {/* Sous-titre */}
        <motion.p
          {...fadeUp(0.4)}
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(16px, 2vw, 20px)',
            color: 'var(--ink-soft)',
            maxWidth: 560,
            lineHeight: 1.65,
            marginBottom: 56,
          }}
        >
          {t('hero_subtitle')}
        </motion.p>

        {/* CTA */}
        <motion.div
          {...fadeUp(0.5)}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 24,
            justifyContent: 'center',
            marginTop: 16,
          }}
        >
          <Link href="/reservation">
            <MagicButton className="group">
              <span className="flex items-center justify-center gap-3">
                {t('cta_reserve')}
                <span className="transition-transform duration-300 group-hover:translate-x-2">→</span>
              </span>
            </MagicButton>
          </Link>
          <Link href="/catalogue">
            <MagicButton className="px-10 group" onClick={() => window.location.href = '#catalogue'}>
              <span className="flex items-center gap-3">
                <span className="font-sans text-xs tracking-[0.2em] uppercase font-medium">{t('cta_catalog')}</span>
                <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
              </span>
            </MagicButton>
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          style={{
            position: 'absolute',
            bottom: 40,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span className="label" style={{ fontSize: '10px' }}>{t('scroll_discover')}</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
              <path d="M8 2v16M2 13l6 6 6-6" stroke="var(--muted)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── Bloc promesses liquid glass ────────────────── */}
      <section
        style={{
          padding: '60px 28px 100px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="w-full max-w-6xl"
        >
          <ParallaxWrapper offset={40} direction="up">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '◈', titleKey: 'promise_bespoke', descKey: 'promise_bespoke_desc' },
              { icon: '◎', titleKey: 'promise_materials', descKey: 'promise_materials_desc' },
              { icon: '◉', titleKey: 'promise_impact', descKey: 'promise_impact_desc' },
            ].map((p, i) => (
              <motion.div
                key={p.titleKey}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.12, duration: 0.7 }}
              >
                <FlipCard
                  height={320}
                  frontContent={
                    <div className="flex flex-col items-center justify-center text-center h-full gap-6">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-b from-white/80 to-white/20 shadow-[inset_0_2px_4px_rgba(255,255,255,1),0_8px_16px_rgba(0,0,0,0.05)] border border-white/60 flex items-center justify-center relative">
                        <span className="text-2xl text-ink relative z-10">{p.icon}</span>
                      </div>
                      <h3 className="font-serif text-2xl text-white">{t(p.titleKey)}</h3>
                    </div>
                  }
                  backContent={
                    <div className="flex flex-col items-center justify-center text-center h-full p-4">
                      <p className="font-sans text-sm text-white/80 leading-relaxed">
                        {t(p.descKey)}
                      </p>
                    </div>
                  }
                />
              </motion.div>
            ))}
            </div>
          </ParallaxWrapper>
        </motion.div>
      </section>

      {/* ─── Réassurance ────────────────────────────────── */}
      <section
        style={{
          padding: '0 28px 120px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 48,
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px 40px' }}
        >
          {(['proof_call', 'proof_duration', 'proof_confidential', 'proof_projects', 'proof_response'] as const).map((key) => (
            <span
              key={key}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '12px',
                fontWeight: 500,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--muted)',
              }}
            >
              {t(key)}
            </span>
          ))}
        </motion.div>

        {/* CTA vers catalogue */}
        <ParallaxWrapper offset={30} direction="up">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}
        >
          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(28px, 4vw, 48px)',
              color: 'var(--ink)',
              fontWeight: 400,
              letterSpacing: '-0.02em',
            }}
          >
            {t('brand_title')}
          </p>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '15px',
              color: 'var(--ink-soft)',
              maxWidth: 440,
            }}
          >
            {t('brand_subtitle')}
          </p>
          <div style={{ marginTop: 16 }}>
            <Link href="/catalogue">
              <MagicButton className="group">
                <span className="flex items-center justify-center gap-3">
                  {t('brand_cta')}
                  <span className="transition-transform duration-300 group-hover:translate-x-2">→</span>
                </span>
              </MagicButton>
            </Link>
          </div>
        </motion.div>
        </ParallaxWrapper>
      </section>
    </>
  )
}


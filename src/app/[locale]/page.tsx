'use client'

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
          {/* Sphere 3D */}
          <motion.div
            {...fadeUp(0.25)}
            className="w-full flex justify-center"
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
            marginBottom: 16,
          }}
        >
          {t('hero_subtitle')}
        </motion.p>

        {/* Audience cible */}
        <motion.p
          {...fadeUp(0.45)}
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(14px, 1.5vw, 16px)',
            color: 'var(--muted)',
            maxWidth: 600,
            lineHeight: 1.6,
            marginBottom: 56,
          }}
        >
          {t('hero_audience')}
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
            marginBottom: 120, // Pousse le bloc vers le haut pour l'éloigner de la flèche
          }}
        >
          <Link href="/reservation">
            <MagicButton className="group">
              <span className="flex items-center justify-center gap-3">
                {t('cta_scan')}
                <span className="transition-transform duration-300 group-hover:translate-x-2">→</span>
              </span>
            </MagicButton>
          </Link>
          <Link href="#offres">
            <MagicButton className="px-10 group" onClick={(e) => { e.preventDefault(); document.getElementById('offres')?.scrollIntoView({ behavior: 'smooth' }); }}>
              <span className="flex items-center gap-3">
                <span className="font-sans text-xs tracking-[0.2em] uppercase font-medium">{t('cta_offers')}</span>
                <span className="group-hover:translate-x-2 transition-transform duration-300">↓</span>
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

      {/* ─── Problème / Solution ─────────────────────────── */}
      <section
        style={{
          padding: '40px 28px 80px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="w-full max-w-5xl"
        >
          <ParallaxWrapper offset={20} direction="up">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
              {/* Problème */}
              <div className="flex flex-col gap-4 border-l border-ink/10 pl-6">
                <p className="font-sans text-sm md:text-base text-ink-soft leading-[1.8] font-light">
                  {t('problem_text')}
                </p>
              </div>
              
              {/* Solution */}
              <div className="flex flex-col gap-4 border-l border-ink/10 pl-6">
                <p className="font-sans text-sm md:text-base text-ink-soft leading-[1.8] font-light">
                  {t('solution_text')}
                </p>
              </div>
            </div>
          </ParallaxWrapper>
        </motion.div>
      </section>

      {/* ─── Offres ─────────────────────────────────────── */}
      <section
        id="offres"
        style={{
          padding: '60px 28px 100px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div className="w-full max-w-6xl flex flex-col gap-12">
          {/* Titre */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="font-serif text-3xl md:text-4xl text-ink">{t('offers_section_title')}</h2>
          </motion.div>

          {/* Grille Offres */}
          <ParallaxWrapper offset={40} direction="up">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { key: 'prescan', label: 'Offert' },
                { key: 'scan', label: 'Recommandé' },
                { key: 'campaign', label: 'Rapide' },
                { key: 'identity', label: 'Sur devis' },
                { key: 'system', label: 'Premium' },
              ].map((offer, i) => (
                <motion.div
                  key={offer.key}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i, duration: 0.7 }}
                >
                  <LiquidCard className="h-full p-8 flex flex-col gap-4">
                    <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-ink-soft">
                      {offer.label}
                    </span>
                    <h3 className="font-serif text-2xl text-ink">
                      {t(`offer_${offer.key}`)}
                    </h3>
                    <p className="font-sans text-sm text-ink-soft leading-relaxed font-light mt-auto pt-4 border-t border-ink/10">
                      {t(`offer_${offer.key}_desc`)}
                    </p>
                  </LiquidCard>
                </motion.div>
              ))}
            </div>
          </ParallaxWrapper>

          {/* CTA Section Offres */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex justify-center mt-6"
          >
            <Link href="/reservation">
              <MagicButton className="px-10 group">
                <span className="flex items-center gap-3">
                  <span className="font-sans text-xs tracking-[0.2em] uppercase font-medium">{t('cta_detailed_offers')}</span>
                  <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                </span>
              </MagicButton>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ─── Méthode (4 étapes) ─────────────────────────── */}
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
          className="w-full max-w-7xl"
        >
          <ParallaxWrapper offset={40} direction="up">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '01', titleKey: 'method_observe', descKey: 'method_observe_desc' },
              { icon: '02', titleKey: 'method_reveal', descKey: 'method_reveal_desc' },
              { icon: '03', titleKey: 'method_build', descKey: 'method_build_desc' },
              { icon: '04', titleKey: 'method_deploy', descKey: 'method_deploy_desc' },
            ].map((p, i) => (
              <motion.div
                key={p.titleKey}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.12, duration: 0.7 }}
              >
                <FlipCard
                  height={280}
                  frontContent={
                    <div className="flex flex-col items-center justify-center text-center h-full gap-6">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-b from-white/80 to-white/20 shadow-[inset_0_2px_4px_rgba(255,255,255,1),0_8px_16px_rgba(0,0,0,0.05)] border border-white/60 flex items-center justify-center relative">
                        <span className="font-sans font-medium text-lg text-ink relative z-10">{p.icon}</span>
                      </div>
                      <h3 className="font-serif text-2xl text-white">{t(p.titleKey)}</h3>
                    </div>
                  }
                  backContent={
                    <div className="flex flex-col items-center justify-center text-center h-full p-6">
                      <p className="font-sans text-[13px] text-white/80 leading-relaxed font-light">
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

        {/* CTA vers Réservation */}
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
            {t('final_title')}
          </p>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '15px',
              color: 'var(--ink-soft)',
              maxWidth: 480,
              lineHeight: 1.6,
            }}
          >
            {t('final_subtitle')}
          </p>
          <div style={{ marginTop: 24, display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link href="/reservation">
              <MagicButton className="group">
                <span className="flex items-center justify-center gap-3">
                  {t('final_cta_scan')}
                  <span className="transition-transform duration-300 group-hover:translate-x-2">→</span>
                </span>
              </MagicButton>
            </Link>
            <Link href="/reservation">
              <MagicButton className="px-8 group">
                <span className="flex items-center justify-center gap-3">
                  <span className="font-sans text-xs tracking-[0.2em] uppercase font-medium">{t('final_cta_call')}</span>
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


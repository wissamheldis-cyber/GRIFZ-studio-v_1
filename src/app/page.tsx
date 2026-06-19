'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Orb from '@/components/ui/Orb'
import LiquidCard from '@/components/ui/LiquidCard'
import { MagicButton } from '@/components/ui/MagicButton'
import { GlassPanel } from '@/components/ui/GlassPanel'
import { ParallaxWrapper } from '@/components/ui/ParallaxWrapper'
import { FlipCard } from '@/components/ui/FlipCard'

/* ─── Animations ──────────────────────────────────────────── */
const EASE = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: EASE },
})

/* ─── Page Accueil ───────────────────────────────────────── */
export default function HomePage() {
  return (
    <>
      {/* ─── Hero ───────────────────────────────────────── */}
      <section
        style={{
          minHeight: 'calc(100vh - 72px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px 28px',
          position: 'relative',
          overflow: 'hidden',
          textAlign: 'center',
        }}
      >
        {/* Label */}
        <motion.p
          {...fadeUp(0.2)}
          className="label"
          style={{ marginBottom: 20 }}
        >
          Studio d'évolution digitale 360
        </motion.p>

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
          Présence digitale sculptée par la matière.
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
          GRIFZ Studio conçoit des identités, sites et expériences digitales premium pour marques, entreprises et créatifs exigeants.
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
                Réserver un appel
                <span className="transition-transform duration-300 group-hover:translate-x-2">→</span>
              </span>
            </MagicButton>
          </Link>
          <Link href="/catalogue">
            <MagicButton className="px-10 group" onClick={() => window.location.href = '#catalogue'}>
              <span className="flex items-center gap-3">
                <span className="font-sans text-xs tracking-[0.2em] uppercase font-medium">Découvrir l'univers</span>
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
          <span className="label" style={{ fontSize: '10px' }}>Découvrir</span>
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
            {PROMISES.map((p, i) => (
              <motion.div
                key={p.title}
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
                      <h3 className="font-serif text-2xl text-white">{p.title}</h3>
                    </div>
                  }
                  backContent={
                    <div className="flex flex-col items-center justify-center text-center h-full p-4">
                      <p className="font-sans text-sm text-white/80 leading-relaxed">
                        {p.description}
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
          {PROOF_POINTS.map((point) => (
            <span
              key={point}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '12px',
                fontWeight: 500,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--muted)',
              }}
            >
              {point}
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
            Chaque marque a une matière.
          </p>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '15px',
              color: 'var(--ink-soft)',
              maxWidth: 440,
            }}
          >
            Vous pouvez choisir une matière, ou nous laisser la trouver pour vous.
          </p>
          <div style={{ marginTop: 16 }}>
            <Link href="/catalogue">
              <MagicButton className="group">
                <span className="flex items-center justify-center gap-3">
                  Explorer les matières
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

/* ─── Data ───────────────────────────────────────────────── */
const PROMISES = [
  {
    icon: '◈',
    title: 'Sur-mesure',
    description: 'Chaque projet est pensé comme une pièce unique, au service de votre vision et de votre marque.',
  },
  {
    icon: '◎',
    title: 'Matières premium',
    description: 'Une direction visuelle construite autour de la matière qui représente votre marque.',
  },
  {
    icon: '◉',
    title: 'Impact durable',
    description: 'Des expériences digitales qui clarifient, rassurent et marquent dans le temps.',
  },
]

const PROOF_POINTS = [
  'Appel offert',
  '30 minutes',
  'Confidentiel',
  '5–10 projets / mois',
  'Réponse sous 24h',
]

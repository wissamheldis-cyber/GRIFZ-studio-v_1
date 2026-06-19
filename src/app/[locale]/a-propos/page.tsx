'use client'

import { motion } from 'framer-motion'
import { GlassPanel } from '@/components/ui/GlassPanel'
import { GlassPill } from '@/components/ui/GlassPill'
import { ParallaxWrapper } from '@/components/ui/ParallaxWrapper'
import Orb from '@/components/ui/Orb'
import { Link } from '@/i18n/routing'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import LiquidCard from '@/components/ui/LiquidCard'

export default function AboutPage() {
  const t = useTranslations('About')
  return (
    <main className="min-h-screen pt-40 pb-0 flex flex-col items-center relative overflow-hidden">
      
      {/* Container principal */}
      <div className="w-full max-w-4xl mx-auto px-6 flex flex-col items-center gap-16 relative z-10">
        
        {/* Titre & Vision */}
        <div className="text-center max-w-2xl flex flex-col items-center gap-6">
          <motion.h1 
            className="font-serif text-4xl md:text-5xl text-ink"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {t('title')}
          </motion.h1>
          <motion.p 
            className="text-base md:text-lg text-ink-soft font-light"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {t('intro')}
          </motion.p>
        </div>

        {/* Grille de Blocs (Vision, Méthode, Convictions) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          
          <ParallaxWrapper offset={30} direction="up">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <GlassPanel className="p-12 md:p-14 h-full flex flex-col gap-6">
              <h3 className="font-sans text-[11px] uppercase tracking-[0.15em] text-muted font-medium">{t('block1_label')}</h3>
              <h2 className="font-serif text-2xl text-ink">{t('block1_title')}</h2>
              <p className="text-sm text-ink-soft leading-relaxed font-light mt-auto pt-4">
                {t('block1_text')}
              </p>
            </GlassPanel>
          </motion.div>
          </ParallaxWrapper>

          <ParallaxWrapper offset={50} direction="up">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <GlassPanel className="p-12 md:p-14 h-full flex flex-col gap-6">
              <h3 className="font-sans text-[11px] uppercase tracking-[0.15em] text-muted font-medium">{t('block2_label')}</h3>
              <h2 className="font-serif text-2xl text-ink">{t('block2_title')}</h2>
              <p className="text-sm text-ink-soft leading-relaxed font-light mt-auto pt-4">
                {t('block2_text')}
              </p>
            </GlassPanel>
          </motion.div>
          </ParallaxWrapper>

          <ParallaxWrapper offset={20} direction="up" className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="h-full"
            >
              <GlassPanel strong className="p-12 md:p-16 h-full flex flex-col md:flex-row gap-10 items-center md:items-start text-center md:text-left border-ink/5">
              <div className="flex-1 flex flex-col gap-4">
                <h3 className="font-sans text-[11px] uppercase tracking-[0.15em] text-ink font-medium">{t('block3_label')}</h3>
                <h2 className="font-serif text-2xl md:text-3xl text-ink">{t('block3_title')}</h2>
                <p className="text-sm md:text-base text-ink-soft leading-relaxed font-light mt-2">
                  {t('block3_text')}
                </p>
              </div>
              <div className="w-32 h-32 flex-shrink-0 relative pointer-events-none opacity-50">
                <Orb material="verre" size={150} animated={true} intensity={0.1} />
              </div>
              </GlassPanel>
            </motion.div>
          </ParallaxWrapper>

        </div>

      </div>

      {/* ─── TEASER MASCOTTE (Mêmes specs que Le choix de la matière) ───────────────────────────────────── */}
      <div className="w-full max-w-5xl mx-auto px-6 mt-64 mb-32 z-10 relative">
        <GlassPanel strong className="p-12 md:p-16 flex flex-col md:flex-row gap-10 items-center md:items-start text-center md:text-left border-ink/5">
          {/* Partie Gauche : Textes */}
          <div className="flex-1 flex flex-col gap-4 items-center md:items-start">
            <h3 className="font-sans text-[11px] uppercase tracking-[0.15em] text-ink font-medium">Coming soon</h3>
            <h2 className="font-serif text-3xl md:text-4xl text-ink leading-tight">
              {t('teaser_title_1')} {t('teaser_title_2')}
            </h2>
            <p className="text-sm md:text-base text-ink-soft leading-relaxed font-light mt-2 uppercase tracking-widest">
              {t('teaser_text_1')} {t('teaser_text_2')}
            </p>
          </div>

          {/* Partie Droite : Image Invisible Container */}
          <div className="w-64 h-64 md:w-80 md:h-80 relative flex-shrink-0 bg-transparent flex items-center justify-center">
            <div className="relative w-full h-full transform hover:scale-105 transition-transform duration-700 ease-in-out">
              {/* L'image PNG au fond transparent s'insérera ici sans fond propre */}
              <Image 
                src="/images/mascot_placeholder.png" 
                alt="Mascot Placeholder" 
                fill 
                className="object-contain opacity-80"
                unoptimized
              />
            </div>
          </div>
        </GlassPanel>
      </div>

    </main>
  )
}

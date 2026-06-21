'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion'
import { GlassPanel } from '@/components/ui/GlassPanel'
import { MagicButton } from '@/components/ui/MagicButton'


import { ParallaxWrapper } from '@/components/ui/ParallaxWrapper'
import Orb from '@/components/ui/Orb'
import { Link } from '@/i18n/routing'

export default function ReservationPage() {
  const [selectedDay, setSelectedDay] = useState<number | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const t = useTranslations('Reservation')

  // -- Mock Data pour Juin 2026 --
  const daysInMonth = 30
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  
  // Jours pleins de 1 à 23 inclus
  const isDayFull = (day: number) => day >= 1 && day <= 23

  const mockAvailableTimes: Record<number, string[]> = {
    24: ['14:00', '15:30'],
    25: ['09:00', '11:00'],
    26: ['17:00'],
    27: [],
    28: [],
    29: ['10:30', '14:00', '17:00'],
    30: ['09:00', '10:30', '15:30'],
  }

  const availableTimesForSelectedDay = selectedDay && !isDayFull(selectedDay) ? (mockAvailableTimes[selectedDay] || []) : []

  // -- 3D Tilt Logic for Calendar (Accentué) --
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 15 })
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 15 })
  
  // Rotation plus prononcée (±15 degrés)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"])
  
  // Effet de translation (mouvement physique)
  const translateX = useTransform(mouseXSpring, [-0.5, 0.5], ["-20px", "20px"])
  const translateY = useTransform(mouseYSpring, [-0.5, 0.5], ["-20px", "20px"])

  // Glare effect (Reflet dynamique)
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], [100, 0])
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], [100, 0])
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.15) 0%, transparent 60%)`

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const xPct = (e.clientX - rect.left) / rect.width - 0.5
    const yPct = (e.clientY - rect.top) / rect.height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <main className="min-h-screen pt-40 pb-20 px-6 flex flex-col items-center relative overflow-hidden">
      
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-16 relative z-10">
        
        {/* En-tête */}
        <div className="text-center max-w-2xl flex flex-col items-center gap-6">
          <motion.h1 
            className="font-serif text-4xl md:text-5xl text-ink"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {t('title')}
          </motion.h1>
          <motion.p 
            className="text-base md:text-lg text-ink-soft font-light leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {t('subtitle')}
          </motion.p>
          <motion.p 
            className="text-sm md:text-base text-ink font-medium mt-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {t('extra_phrase')}
          </motion.p>
          <motion.div 
            className="flex gap-4 mt-2 flex-wrap justify-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Link href="#offres" onClick={(e) => { e.preventDefault(); document.getElementById('offres')?.scrollIntoView({ behavior: 'smooth' }); }}>
              <button className="px-6 py-3 rounded-full border border-ink bg-ink text-white text-xs uppercase tracking-widest font-medium hover:bg-ink/90 transition-colors duration-300 shadow-md">
                {t('cta_prescan')}
              </button>
            </Link>
            <Link href="#calendrier" onClick={(e) => { e.preventDefault(); document.getElementById('calendrier')?.scrollIntoView({ behavior: 'smooth' }); }}>
              <button className="px-6 py-3 rounded-full border border-ink/20 text-ink text-xs uppercase tracking-widest font-medium hover:bg-ink/5 transition-colors duration-300">
                {t('cta_call')}
              </button>
            </Link>
          </motion.div>
        </div>

        {/* ─── LE CALENDRIER 3D VIVANT (Sans Orbe) ─── */}
        <div id="calendrier" style={{ perspective: '1200px' }} className="w-full max-w-lg scroll-mt-32">
          <ParallaxWrapper offset={50} className="w-full">
            <motion.div
            style={{ 
              rotateX, 
              rotateY, 
              x: translateX, 
              y: translateY,
              transformStyle: "preserve-3d" 
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="w-full flex flex-col gap-6 relative"
          >

            {/* Reflet dynamique sur tout le bloc */}
            <motion.div 
              className="absolute inset-0 z-20 pointer-events-none rounded-[32px] mix-blend-overlay"
              style={{ background: glareBackground }}
            />

            {/* Outer — Gradient border wrapper */}
            <div 
              className="relative w-full z-10"
              style={{
                borderRadius: '16px',
                padding: '1px',
                background: 'radial-gradient(circle 600px at 0% 0%, #ffffff, #0c0d0d)',
              }}
            >
              {/* Inner Card */}
              <div 
                className="relative w-full h-full overflow-hidden flex flex-col"
                style={{
                  borderRadius: '15px',
                  border: '1px solid #202222',
                  background: 'radial-gradient(circle 800px at 0% 0%, #333333, #0c0d0d)',
                  padding: '48px',
                }}
              >
                {/* Ray — faisceau lumineux */}
                <div 
                  className="absolute pointer-events-none"
                  style={{
                    width: '280px',
                    height: '50px',
                    borderRadius: '100px',
                    backgroundColor: '#c7c7c7',
                    opacity: 0.2,
                    boxShadow: '0 0 60px #fff',
                    filter: 'blur(12px)',
                    transformOrigin: '10%',
                    top: '0%',
                    left: '0',
                    transform: 'rotate(40deg)',
                    zIndex: 1,
                  }}
                />

                {/* ── Lignes internes fixes — cadre de respiration ── */}
                <div className="absolute pointer-events-none z-10" style={{ top: '24px', left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, #888888 30%, #1d1f1f 70%)' }} />
                <div className="absolute pointer-events-none z-10" style={{ bottom: '24px', left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, #2c2c2c 30%, #1d1f1f 70%)' }} />
                <div className="absolute pointer-events-none z-10" style={{ left: '24px', top: 0, bottom: 0, width: '1px', background: 'linear-gradient(180deg, #747474 30%, #222424 70%)' }} />
                <div className="absolute pointer-events-none z-10" style={{ right: '24px', top: 0, bottom: 0, width: '1px', background: 'linear-gradient(180deg, #2c2c2c 30%, #222424 70%)' }} />

                {/* Contenu du calendrier */}
                <div className="relative z-20 w-full flex flex-col">
                  <div className="flex justify-between items-center mb-6 px-2">
                    <button className="text-white/60 hover:text-white transition-colors">&lt;</button>
                    <span className="font-sans font-medium tracking-widest uppercase text-sm text-white/90">{t('month')}</span>
                    <button className="text-white/60 hover:text-white transition-colors">&gt;</button>
                  </div>
                  
                  <div className="grid grid-cols-7 gap-2 mb-4 text-center">
                    {t('days_short').split(',').map((d, i) => (
                      <div key={i} className="text-[10px] uppercase tracking-widest text-white/40">{d}</div>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-2 relative z-30">
                    {/* 1er Juin 2026 est un Lundi, pas d'espace vide au début */}
                    {days.map(day => {
                      const isFull = isDayFull(day)
                      const isSelected = selectedDay === day
                      
                      return (
                        <button
                          key={day}
                          onClick={() => !isFull && setSelectedDay(day)}
                          disabled={isFull}
                          className={`
                            aspect-square rounded-xl flex items-center justify-center text-sm transition-all duration-300 relative overflow-hidden
                            ${isSelected 
                              ? 'bg-white/10 text-white font-semibold scale-110 shadow-[inset_0_0_10px_rgba(255,255,255,0.2)] ring-1 ring-white/30' 
                              : isFull 
                                ? 'text-white/10 cursor-not-allowed' 
                                : 'text-white/60 hover:bg-white/5 hover:text-white hover:scale-105 cursor-pointer border border-transparent hover:border-white/10'
                            }
                          `}
                        >
                          {isFull && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-full h-px bg-white/10 rotate-45" />
                            </div>
                          )}
                          {day}
                        </button>
                      )
                    })}
                  </div>

                  {/* Fin du contenu du calendrier (Horaires retirés d'ici) */}
                </div>
              </div>
            </div>

            {/* ── Bloc Indépendant pour les Horaires ── */}
            <AnimatePresence>
              {selectedDay && !isDayFull(selectedDay) && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="w-full relative z-10 mt-6"
                >
                    <div 
                      className="relative w-full"
                      style={{
                        borderRadius: '16px',
                        padding: '1px',
                        background: 'radial-gradient(circle 600px at 0% 0%, #ffffff, #0c0d0d)',
                      }}
                    >
                      <div 
                        className="relative w-full overflow-hidden flex flex-col"
                      style={{
                        borderRadius: '15px',
                        border: '1px solid #202222',
                        background: 'radial-gradient(circle 800px at 0% 0%, #333333, #0c0d0d)',
                        padding: '48px',
                      }}
                    >
                      {/* Lignes internes fixes pour les horaires */}
                      <div className="absolute pointer-events-none z-10" style={{ top: '24px', left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, #888888 30%, #1d1f1f 70%)' }} />
                      <div className="absolute pointer-events-none z-10" style={{ bottom: '24px', left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, #2c2c2c 30%, #1d1f1f 70%)' }} />
                      <div className="absolute pointer-events-none z-10" style={{ left: '24px', top: 0, bottom: 0, width: '1px', background: 'linear-gradient(180deg, #747474 30%, #222424 70%)' }} />
                      <div className="absolute pointer-events-none z-10" style={{ right: '24px', top: 0, bottom: 0, width: '1px', background: 'linear-gradient(180deg, #2c2c2c 30%, #222424 70%)' }} />

                      <div className="relative z-20 w-full flex flex-col items-center justify-center">
                        {availableTimesForSelectedDay.length > 0 ? (
                          <div className="flex flex-wrap justify-center gap-6">
                            {availableTimesForSelectedDay.map(time => (
                              <button
                                key={time}
                                onClick={() => setSelectedTime(time)}
                                className={`
                                  w-[76px] h-[76px] rounded-full flex items-center justify-center text-sm transition-all duration-300 border
                                  ${selectedTime === time 
                                    ? 'bg-white text-black font-medium border-white shadow-lg' 
                                    : 'border-white/20 bg-transparent text-white/70 hover:bg-white/10 hover:text-white hover:border-white/40 hover:-translate-y-1'
                                  }
                                `}
                              >
                                {time}
                              </button>
                            ))}
                          </div>
                        ) : (
                          <p className="text-center text-sm text-white/40">{t('no_slots')}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bouton Confirm */}
            <AnimatePresence>
              {selectedTime && selectedDay && !isDayFull(selectedDay) && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  whileHover={{ scale: 1.02 }} 
                  className="w-full relative z-10 mt-2"
                >
                  <button 
                    className="w-full h-16 rounded-full flex items-center justify-center transition-all duration-300 border border-white bg-white text-black hover:bg-white/90 hover:-translate-y-1 group shadow-lg" 
                    onClick={() => alert('Validation...')}
                  >
                    <span className="flex items-center justify-center gap-3 w-full">
                      <span className="text-sm font-sans tracking-[0.2em] font-medium text-black">{t('confirm')}</span>
                      <span className="transition-transform duration-300 group-hover:translate-x-2 text-black">→</span>
                    </span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>
          </ParallaxWrapper>
        </div>

        {/* Séparateur fluide */}
        <div className="w-px h-24 bg-gradient-to-b from-line to-transparent my-4" />

        {/* ─── PARTIE 2 : LES OFFRES (PARALLAX & VERRE EN FUSION) ─── */}
        <ParallaxWrapper offset={40} direction="up" className="w-full">
          <div id="offres" className="w-full max-w-6xl flex flex-col items-center gap-20 pb-16 scroll-mt-32">
            <div className="text-center flex flex-col gap-6">
              <h2 className="font-serif text-4xl md:text-5xl text-ink">{t('offers_title')}</h2>
              <p className="text-lg text-ink-soft font-light">{t('offers_subtitle')}</p>
            </div>

            <div className="flex flex-col gap-8 w-full max-w-4xl mx-auto perspective-1000 px-4 md:px-0">
              
              {/* Pack 1 : Pre-Scan */}
              <motion.div whileHover={{ scale: 1.02, rotateX: 2, rotateY: -2, z: 20 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
                <GlassPanel className="p-8 md:p-10 flex flex-col md:flex-row justify-between items-start md:items-center w-full min-h-[200px] relative overflow-hidden group border-white/20 hover:border-white/50 transition-colors duration-500">
                  <div className="absolute top-1/2 -translate-y-1/2 right-10 opacity-0 group-hover:opacity-40 transition-all duration-700 blur-2xl group-hover:scale-125">
                    <Orb material="cuivre" size={200} animated={true} intensity={0.5} />
                  </div>
                  
                  <div className="flex flex-col relative z-10 transition-transform duration-300 group-hover:translate-x-2 w-full md:w-[60%]">
                    <h4 className="text-[10px] uppercase tracking-[0.2em] text-muted mb-2 font-semibold">{t('pack1_label')}</h4>
                    <h3 className="font-serif text-3xl md:text-4xl text-ink mb-4">{t('pack1_title')}</h3>
                    <p className="text-sm md:text-base text-ink-soft font-light leading-relaxed whitespace-pre-wrap">{t('pack1_desc')}</p>
                  </div>
                  
                  <div className="flex flex-col items-start md:items-end justify-center w-full md:w-auto mt-6 md:mt-0 relative z-10 transition-transform duration-300 group-hover:-translate-x-2">
                    <span className="font-serif text-2xl md:text-3xl text-ink italic opacity-70 mb-4">{t('pack1_price')}</span>
                    <MagicButton className="!min-h-[44px] !text-[10px] md:!text-[11px] px-6 group !backdrop-blur-none !shadow-[0_0_15px_rgba(255,255,255,0.15)] hover:!shadow-[0_0_25px_rgba(255,255,255,0.35)]" onClick={(e) => { e.preventDefault(); document.getElementById('calendrier')?.scrollIntoView({ behavior: 'smooth' }); }}>
                      <span className="flex items-center gap-2">
                        {t('pack1_cta')} <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </span>
                    </MagicButton>
                  </div>
                </GlassPanel>
              </motion.div>

              {/* Pack 2 : Scan - Recommandé */}
              <motion.div whileHover={{ scale: 1.02, rotateX: 2, rotateY: -2, z: 20 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
                <GlassPanel strong className="p-8 md:p-10 flex flex-col md:flex-row justify-between items-start md:items-center w-full min-h-[200px] relative overflow-hidden group border-white/30 hover:border-white/60 transition-colors duration-500">
                  <div className="absolute top-1/2 -translate-y-1/2 right-10 opacity-20 group-hover:opacity-60 transition-all duration-700 blur-2xl group-hover:scale-125">
                    <Orb material="cuivre" size={250} animated={true} intensity={0.6} />
                  </div>
                  
                  {/* Badge Recommandé */}
                  <div className="absolute top-0 right-8 transform -translate-y-1/2 z-20 hidden md:block">
                    <span className="bg-ink text-white text-[9px] uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">{t('pack2_label')}</span>
                  </div>
                  <div className="absolute top-4 right-4 z-20 md:hidden">
                    <span className="bg-ink text-white text-[9px] uppercase tracking-widest px-2 py-1 rounded-full shadow-lg">{t('pack2_label')}</span>
                  </div>
                  
                  <div className="flex flex-col relative z-10 transition-transform duration-300 group-hover:translate-x-2 w-full md:w-[60%]">
                    <h4 className="text-[10px] uppercase tracking-[0.2em] text-ink mb-2 font-semibold">{t('pack2_label')}</h4>
                    <h3 className="font-serif text-3xl md:text-4xl text-ink mb-4">{t('pack2_title')}</h3>
                    <p className="text-sm md:text-base text-ink-soft font-light leading-relaxed whitespace-pre-wrap">{t('pack2_desc')}</p>
                  </div>
                  
                  <div className="flex flex-col items-start md:items-end justify-center w-full md:w-auto mt-6 md:mt-0 relative z-10 transition-transform duration-300 group-hover:-translate-x-2">
                    <span className="font-serif text-2xl md:text-3xl text-ink italic opacity-70 mb-4">{t('pack2_price')}</span>
                    <MagicButton className="!min-h-[44px] !text-[10px] md:!text-[11px] px-6 group !backdrop-blur-none !shadow-[0_0_15px_rgba(255,255,255,0.15)] hover:!shadow-[0_0_25px_rgba(255,255,255,0.35)]" onClick={(e) => { e.preventDefault(); document.getElementById('calendrier')?.scrollIntoView({ behavior: 'smooth' }); }}>
                      <span className="flex items-center gap-2">
                        {t('pack2_cta')} <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </span>
                    </MagicButton>
                  </div>
                </GlassPanel>
              </motion.div>

              {/* Pack 3 : Campaign */}
              <motion.div whileHover={{ scale: 1.02, rotateX: 2, rotateY: -2, z: 20 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
                <GlassPanel className="p-8 md:p-10 flex flex-col md:flex-row justify-between items-start md:items-center w-full min-h-[200px] relative overflow-hidden group border-white/20 hover:border-white/50 transition-colors duration-500">
                  <div className="absolute top-1/2 -translate-y-1/2 right-10 opacity-0 group-hover:opacity-40 transition-all duration-700 blur-2xl group-hover:scale-125">
                    <Orb material="cuivre" size={200} animated={true} intensity={0.5} />
                  </div>
                  
                  <div className="flex flex-col relative z-10 transition-transform duration-300 group-hover:translate-x-2 w-full md:w-[60%]">
                    <h4 className="text-[10px] uppercase tracking-[0.2em] text-muted mb-2 font-semibold">{t('pack3_label')}</h4>
                    <h3 className="font-serif text-3xl md:text-4xl text-ink mb-4">{t('pack3_title')}</h3>
                    <p className="text-sm md:text-base text-ink-soft font-light leading-relaxed whitespace-pre-wrap">{t('pack3_desc')}</p>
                  </div>
                  
                  <div className="flex flex-col items-start md:items-end justify-center w-full md:w-auto mt-6 md:mt-0 relative z-10 transition-transform duration-300 group-hover:-translate-x-2">
                    <span className="font-serif text-2xl md:text-3xl text-ink italic opacity-70 mb-4">{t('pack3_price')}</span>
                    <MagicButton className="!min-h-[44px] !text-[10px] md:!text-[11px] px-6 group !backdrop-blur-none !shadow-[0_0_15px_rgba(255,255,255,0.15)] hover:!shadow-[0_0_25px_rgba(255,255,255,0.35)]" onClick={(e) => { e.preventDefault(); document.getElementById('calendrier')?.scrollIntoView({ behavior: 'smooth' }); }}>
                      <span className="flex items-center gap-2">
                        {t('pack3_cta')} <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </span>
                    </MagicButton>
                  </div>
                </GlassPanel>
              </motion.div>

              {/* Pack 4 : Identity */}
              <motion.div whileHover={{ scale: 1.02, rotateX: 2, rotateY: -2, z: 20 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
                <GlassPanel className="p-8 md:p-10 flex flex-col md:flex-row justify-between items-start md:items-center w-full min-h-[200px] relative overflow-hidden group border-white/20 hover:border-white/50 transition-colors duration-500">
                  <div className="absolute top-1/2 -translate-y-1/2 right-10 opacity-0 group-hover:opacity-40 transition-all duration-700 blur-2xl group-hover:scale-125">
                    <Orb material="cuivre" size={200} animated={true} intensity={0.5} />
                  </div>
                  
                  <div className="flex flex-col relative z-10 transition-transform duration-300 group-hover:translate-x-2 w-full md:w-[60%]">
                    <h4 className="text-[10px] uppercase tracking-[0.2em] text-muted mb-2 font-semibold">{t('pack4_label')}</h4>
                    <h3 className="font-serif text-3xl md:text-4xl text-ink mb-4">{t('pack4_title')}</h3>
                    <p className="text-sm md:text-base text-ink-soft font-light leading-relaxed whitespace-pre-wrap">{t('pack4_desc')}</p>
                  </div>
                  
                  <div className="flex flex-col items-start md:items-end justify-center w-full md:w-auto mt-6 md:mt-0 relative z-10 transition-transform duration-300 group-hover:-translate-x-2">
                    <span className="font-serif text-2xl md:text-3xl text-ink italic opacity-70 mb-4">{t('pack4_price')}</span>
                    <MagicButton className="!min-h-[44px] !text-[10px] md:!text-[11px] px-6 group !backdrop-blur-none !shadow-[0_0_15px_rgba(255,255,255,0.15)] hover:!shadow-[0_0_25px_rgba(255,255,255,0.35)]" onClick={(e) => { e.preventDefault(); document.getElementById('calendrier')?.scrollIntoView({ behavior: 'smooth' }); }}>
                      <span className="flex items-center gap-2">
                        {t('pack4_cta')} <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </span>
                    </MagicButton>
                  </div>
                </GlassPanel>
              </motion.div>

              {/* Pack 5 : System */}
              <motion.div whileHover={{ scale: 1.02, rotateX: 2, rotateY: -2, z: 20 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
                <GlassPanel className="p-8 md:p-10 flex flex-col md:flex-row justify-between items-start md:items-center w-full min-h-[200px] relative overflow-hidden group border-white/20 hover:border-white/50 transition-colors duration-500">
                  <div className="absolute top-1/2 -translate-y-1/2 right-10 opacity-0 group-hover:opacity-40 transition-all duration-700 blur-2xl group-hover:scale-125">
                    <Orb material="cuivre" size={200} animated={true} intensity={0.5} />
                  </div>
                  
                  <div className="flex flex-col relative z-10 transition-transform duration-300 group-hover:translate-x-2 w-full md:w-[60%]">
                    <h4 className="text-[10px] uppercase tracking-[0.2em] text-muted mb-2 font-semibold">{t('pack5_label')}</h4>
                    <h3 className="font-serif text-3xl md:text-4xl text-ink mb-4">{t('pack5_title')}</h3>
                    <p className="text-sm md:text-base text-ink-soft font-light leading-relaxed whitespace-pre-wrap">{t('pack5_desc')}</p>
                  </div>
                  
                  <div className="flex flex-col items-start md:items-end justify-center w-full md:w-auto mt-6 md:mt-0 relative z-10 transition-transform duration-300 group-hover:-translate-x-2">
                    <span className="font-serif text-2xl md:text-3xl text-ink italic opacity-70 mb-4">{t('pack5_price')}</span>
                    <MagicButton className="!min-h-[44px] !text-[10px] md:!text-[11px] px-6 group !backdrop-blur-none !shadow-[0_0_15px_rgba(255,255,255,0.15)] hover:!shadow-[0_0_25px_rgba(255,255,255,0.35)]" onClick={(e) => { e.preventDefault(); document.getElementById('calendrier')?.scrollIntoView({ behavior: 'smooth' }); }}>
                      <span className="flex items-center gap-2">
                        {t('pack5_cta')} <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </span>
                    </MagicButton>
                  </div>
                </GlassPanel>
              </motion.div>

            </div>
          </div>
        </ParallaxWrapper>

      </div>
    </main>
  )
}

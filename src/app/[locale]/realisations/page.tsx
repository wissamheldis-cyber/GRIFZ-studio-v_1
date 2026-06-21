'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { FlipCard } from '@/components/ui/FlipCard'
import Orb from '@/components/ui/Orb'
import Image from 'next/image'
import { projects, Project } from '@/data/projectsData'
import { fictionalConcepts } from '@/data/fictionalConceptsData'
import { useTranslations, useLocale } from 'next-intl'
import { Link } from '@/i18n/routing'
import { MagicButton } from '@/components/ui/MagicButton'

// --- Composant Mini Carrousel d'images ---
function ProjectMiniCarousel({ images }: { images: string[] }) {
  const [index, setIndex] = useState(0)

  if (!images || images.length === 0) return null

  return (
    <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden group"
      style={{
        border: '1px solid rgba(255,255,255,0.15)',
        boxShadow: '0 20px 60px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.3)',
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <Image
            src={images[index]}
            alt={`Gallery image ${index + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            quality={85}
          />
        </motion.div>
      </AnimatePresence>

      {/* Couche verre subtile sur l'image */}
      <div 
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 50%, rgba(0,0,0,0.04) 100%)',
          mixBlendMode: 'overlay',
        }}
      />
      {/* Reflet haut subtil */}
      <div 
        className="absolute top-0 left-0 right-0 h-[30%] pointer-events-none z-[1]"
        style={{
          background: 'linear-gradient(to bottom, rgba(255,255,255,0.12) 0%, transparent 100%)',
        }}
      />

      {/* Navigation */}
      {images.length > 1 && (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2.5 z-10 bg-black/30 backdrop-blur-xl px-4 py-2 rounded-full border border-white/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${i === index ? 'bg-white scale-125 shadow-[0_0_6px_rgba(255,255,255,0.5)]' : 'bg-white/40 hover:bg-white/60'}`}
            />
          ))}
        </div>
      )}
      
      {/* Click zones */}
      {images.length > 1 && (
        <>
          <div className="absolute top-0 left-0 w-1/4 h-full cursor-pointer z-0" onClick={() => setIndex((index - 1 + images.length) % images.length)} />
          <div className="absolute top-0 right-0 w-1/4 h-full cursor-pointer z-0" onClick={() => setIndex((index + 1) % images.length)} />
        </>
      )}
    </div>
  )
}


export default function RealisationsPage() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [activeFlipped, setActiveFlipped] = useState(false)
  
  // Nouveaux états pour le carrousel Fictif
  const [activeFictionalIndex, setActiveFictionalIndex] = useState(0)
  const [activeFictionalFlipped, setActiveFictionalFlipped] = useState(false)

  const realisationsRef = useRef<HTMLDivElement>(null)
  const fictionalRef = useRef<HTMLDivElement>(null)
  
  const [hasEntered, setHasEntered] = useState(false)
  const [entranceComplete, setEntranceComplete] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const t = useTranslations('Realisations')
  const locale = useLocale()
  const isEn = locale === 'en'

  const translateMaterial = (mat: string) => {
    if (!isEn) return mat;
    const map: Record<string, string> = {
      'Aluminium': 'Aluminum', 'Cuivre': 'Copper', 'Graphite': 'Graphite', 'Lithium': 'Lithium',
      'Gallium': 'Gallium', 'Tungstène': 'Tungsten', 'Cuir Classic': 'Classic Leather', 
      'Cuir Rouge': 'Red Leather', 'Cuir Vert': 'Green Leather', 'Cuir Beige': 'Beige Leather',
      'Charbon': 'Charcoal', 'Chrome': 'Chrome', 'Palladium': 'Palladium', 'Indium': 'Indium',
      'Céréales': 'Cereals', 'PET': 'PET', 'Caoutchouc naturel': 'Natural Rubber', 'Bois': 'Wood',
      'Coton': 'Cotton', 'PVC': 'PVC', 'Titane': 'Titanium'
    };
    return map[mat] || mat;
  };

  const activeProject = projects[activeIndex]
  const activeFictionalProject = fictionalConcepts[activeFictionalIndex]

  // Déclencher l'animation d'entrée au montage
  useEffect(() => {
    const startTimer = setTimeout(() => setHasEntered(true), 100)
    // Marquer la fin de l'animation d'entrée (durée max du stagger + durée animation)
    const endTimer = setTimeout(() => setEntranceComplete(true), 1200)
    return () => { clearTimeout(startTimer); clearTimeout(endTimer) }
  }, [])

  const handleCardClick = (index: number) => {
    if (activeIndex !== index) {
      setActiveIndex(index)
      setActiveFlipped(false)
    }
  }

  const handleFlipChange = (isFlipped: boolean, index: number) => {
    if (activeIndex === index) {
      setActiveFlipped(isFlipped)
      // Désactiver le flip de l'autre carrousel si activé
      if (isFlipped) {
        setActiveFictionalFlipped(false)
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }, 150)
      }
      
      // On dispatch l'event pour le composant RainBackground
      window.dispatchEvent(new CustomEvent('card-flip', { 
        detail: { 
          isFlipped,
          color: projects[index].rainColor 
        } 
      }))
    }
  }

  // Handlers pour le carrousel Fictif
  const handleFictionalCardClick = (index: number) => {
    if (activeFictionalIndex !== index) {
      setActiveFictionalIndex(index)
      setActiveFictionalFlipped(false)
    }
  }

  const handleFictionalFlipChange = (isFlipped: boolean, index: number) => {
    if (activeFictionalIndex === index) {
      setActiveFictionalFlipped(isFlipped)
      // Désactiver le flip de l'autre carrousel si activé
      if (isFlipped) {
        setActiveFlipped(false)
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }, 150)
      }
      
      window.dispatchEvent(new CustomEvent('card-flip', { 
        detail: { 
          isFlipped,
          color: fictionalConcepts[index].rainColor 
        } 
      }))
    }
  }

  // --- Calcul de l'ordre d'apparition staggeré ---
  // Les cartes latérales apparaissent d'abord, la carte centrale en dernier
  const getStaggerDelay = (index: number) => {
    if (prefersReducedMotion) return 0
    const offset = Math.abs(index - activeIndex)
    const maxOffset = Math.max(...projects.map((_, i) => Math.abs(i - activeIndex)))
    // Les plus éloignées apparaissent en premier (0ms), la centrale en dernier
    const normalizedOrder = maxOffset > 0 ? 1 - (offset / maxOffset) : 0
    return normalizedOrder * 0.35 + 0.05 // de 50ms à 400ms
  }

  const getEntranceDuration = () => prefersReducedMotion ? 0.01 : 0.7

  return (
    <main className="min-h-screen pt-40 pb-32 flex flex-col items-center relative overflow-hidden">

      <AnimatePresence>
        {!activeFictionalFlipped && (
          <motion.div 
            ref={realisationsRef}
            key="section-realisations"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-6xl mx-auto px-4 flex flex-col items-center gap-12 relative z-10 overflow-hidden"
          >
            {/* Titre central */}
            <motion.div 
              className="text-center flex flex-col gap-4"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              animate={hasEntered ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <h1 className="font-serif text-4xl md:text-5xl text-ink">
                {t('title')}
              </h1>
              <p className="text-ink-soft font-light text-sm md:text-base">{t('subtitle')}</p>
            </motion.div>

            {/* ─── CARROUSEL 3D COVERFLOW ─── */}
            <div className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center mt-8" style={{ perspective: '1200px' }}>
              {projects.map((project, index) => {
                const offset = index - activeIndex
                const isActive = offset === 0

                // Mathématiques du Coverflow
                const isInactiveFlippedState = activeFlipped && !isActive
                const translateX = offset * (typeof window !== 'undefined' && window.innerWidth < 768 ? 140 : 280)
                const translateZ = Math.abs(offset) * -200 + (isInactiveFlippedState ? -150 : 0) + (isActive && activeFlipped ? 40 : 0)
                const rotateY = offset * -25
                const scale = 1 - Math.abs(offset) * 0.1
                const opacity = isInactiveFlippedState 
                  ? Math.max(0, 1 - Math.abs(offset) * 0.3 - 0.6)
                  : 1 - Math.abs(offset) * 0.3
                const zIndex = isActive && activeFlipped ? 100 : 50 - Math.abs(offset)
                
                const filterBlur = isInactiveFlippedState
                  ? `brightness(0.3)`
                  : Math.abs(offset) > 0 ? `brightness(${Math.max(0.4, 1 - Math.abs(offset) * 0.2)})` : 'brightness(1)'

                const staggerDelay = getStaggerDelay(index)

                // État initial : toutes les cartes partent du centre, invisibles, écrasées
                const entranceInitial = prefersReducedMotion ? false : {
                  x: 0,
                  z: -600,
                  rotateY: 0,
                  scale: 0.3,
                  opacity: 0,
                }

                // État animé : position finale du coverflow OU état initial si pas encore entré
                const entranceAnimate = hasEntered ? {
                  x: translateX,
                  z: translateZ,
                  rotateY: rotateY,
                  scale: scale,
                  opacity: opacity,
                  filter: filterBlur,
                } : entranceInitial

                return (
                  <motion.div
                    key={project.id}
                    className="absolute top-0 bottom-0 flex flex-col items-center justify-center cursor-pointer"
                    style={{ zIndex }}
                    initial={entranceInitial}
                    animate={entranceAnimate}
                    transition={
                      !hasEntered 
                        ? { duration: 0.01 }
                        : entranceComplete
                          ? { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
                          : {
                              duration: getEntranceDuration(),
                              delay: staggerDelay,
                              ease: [0.25, 0.46, 0.45, 0.94],
                            }
                    }
                    onClick={() => handleCardClick(index)}
                  >
                    <motion.div
                      className="w-[260px] h-[360px] md:w-[350px] md:h-[480px] rounded-2xl"
                      animate={isActive && activeFlipped ? {
                        y: -15,
                      } : {
                        y: 0,
                      }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      style={{ willChange: 'transform' }}
                    >
                      <FlipCard 
                        key={`${project.id}-${isActive}`}
                        className="w-full h-full cursor-pointer group"
                        isFlippable={isActive}
                        onFlipChange={(flipped) => handleFlipChange(flipped, index)}
                        frontImage={project.coverPath}
                        frontContent={
                          <div className="absolute inset-0 flex items-center justify-center p-8 bg-black/40 backdrop-blur-[2px]">
                            {project.logoPath ? (
                              <div className="relative w-4/5 h-1/2 transition-transform duration-500 group-hover:scale-105">
                                <Image src={project.logoPath} alt={`${project.title} logo`} fill className="object-contain" sizes="(max-width: 768px) 50vw, 300px" />
                              </div>
                            ) : (
                              <h3 className="font-serif text-3xl md:text-4xl text-white transition-transform duration-500 group-hover:scale-105">{project.title}</h3>
                            )}
                          </div>
                        }
                        backContent={
                          <div className="absolute inset-0 w-full h-full overflow-hidden rounded-2xl">
                            {/* Wrapper pour future vidéo. Actuellement une image. */}
                            <Image 
                              src={project.galleryPaths && project.galleryPaths.length > 0 ? project.galleryPaths[0] : project.coverPath} 
                              alt={`${project.title} aperçu`} 
                              fill 
                              className="object-cover" 
                              sizes="(max-width: 768px) 100vw, 400px"
                            />
                            {/* Overlay sombre très léger pour que l'image paraisse propre */}
                            <div className="absolute inset-0 bg-black/10" />
                          </div>
                        }
                      />
                    </motion.div>

                  </motion.div>
                )
              })}
            </div>

            {/* ─── PANNEAU ÉDITORIAL PREMIUM (Dark Card) ─── */}
            <AnimatePresence>
              {activeFlipped && activeProject && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="w-full max-w-5xl mx-auto overflow-hidden mt-12 md:mt-20"
                >
                  {/* ── Styles pour le dot animé et le ray ── */}
                  <style dangerouslySetInnerHTML={{ __html: `
                    @keyframes moveDotPanel {
                      0%, 100% { top: 8%; right: 8%; }
                      25% { top: 8%; right: calc(100% - 30px); }
                      50% { top: calc(100% - 24px); right: calc(100% - 30px); }
                      75% { top: calc(100% - 24px); right: 8%; }
                    }
                    .panel-dot {
                      width: 5px;
                      aspect-ratio: 1;
                      position: absolute;
                      background-color: #fff;
                      border-radius: 100px;
                      z-index: 20;
                      animation: moveDotPanel 8s linear infinite;
                    }
                  `}} />

                  {/* Outer — Gradient border wrapper */}
                  <div 
                    className="mx-4 md:mx-0 relative"
                    style={{
                      borderRadius: '16px',
                      padding: '1px',
                      background: 'radial-gradient(circle 600px at 0% 0%, #ffffff, #0c0d0d)',
                    }}
                  >
                    {/* Dot lumineux animé */}
                    <div className="panel-dot" />

                    {/* Inner Card */}
                    <div 
                      className="relative w-full overflow-hidden"
                      style={{
                        borderRadius: '15px',
                        border: '1px solid #202222',
                        background: 'radial-gradient(circle 800px at 0% 0%, #333333, #0c0d0d)',
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
                          opacity: 0.3,
                          filter: 'blur(12px)',
                          transformOrigin: '10%',
                          top: '0%',
                          left: '0',
                          transform: 'rotate(40deg)',
                          zIndex: 1,
                        }}
                      />

                      {/* ── Lignes internes à ~8% — cadre de respiration ── */}
                      <div className="absolute pointer-events-none" style={{ top: '8%', left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, #888888 30%, #1d1f1f 70%)' }} />
                      <div className="absolute pointer-events-none" style={{ bottom: '8%', left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, #2c2c2c 30%, #1d1f1f 70%)' }} />
                      <div className="absolute pointer-events-none" style={{ left: '5%', top: 0, bottom: 0, width: '1px', background: 'linear-gradient(180deg, #747474 30%, #222424 70%)' }} />
                      <div className="absolute pointer-events-none" style={{ right: '5%', top: 0, bottom: 0, width: '1px', background: 'linear-gradient(180deg, #2c2c2c 30%, #222424 70%)' }} />

                      {/* ── Contenu à l'intérieur du cadre ── */}
                      <div className="relative z-10 flex flex-col md:flex-row items-stretch" style={{ padding: '10% 7%' }}>
                        
                        {/* Bloc Texte */}
                        <div className="flex-1 flex flex-col gap-6 text-left pr-0 md:pr-12">
                          {/* Badges and Title */}
                          <div className="flex flex-col gap-4">
                            <div className="flex flex-wrap gap-2">
                              <span className="font-sans text-[10px] md:text-xs uppercase tracking-widest text-white/40 border border-white/20 px-3 py-1 rounded-full">
                                {t('lbl_type')}: {isEn ? activeProject.projectTypeEn : activeProject.projectTypeFr}
                              </span>
                              {activeProject.offerIllustrated && (
                                <span className="font-sans text-[10px] md:text-xs uppercase tracking-widest text-white/80 border border-white/40 px-3 py-1 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.1)]">
                                  {activeProject.offerIllustrated}
                                </span>
                              )}
                            </div>
                            <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white leading-tight">{activeProject.title}</h3>
                          </div>

                          <div className="w-8 h-px bg-white/20" />

                          {/* Contribution */}
                          <div className="flex flex-col gap-1">
                            <span className="font-sans text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-white/30">{t('lbl_contribution')}</span>
                            <p className="font-sans text-xs md:text-sm text-white/80 leading-[1.6] font-light">
                              {isEn ? activeProject.contributionEn : activeProject.contributionFr}
                            </p>
                          </div>

                          {/* Livrables */}
                          <div className="flex flex-col gap-2">
                            <span className="font-sans text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-white/30">{t('lbl_deliverables')}</span>
                            <div className="flex flex-wrap gap-2">
                              {activeProject.deliverables.map(d => (
                                <span key={d} className="font-sans text-[9px] md:text-[10px] uppercase tracking-[0.1em] text-white/60 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
                                  {d}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Ce que cela démontre */}
                          <div className="flex flex-col gap-1">
                            <span className="font-sans text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-white/30">{t('lbl_demonstrates')}</span>
                            <p className="font-sans text-xs md:text-sm text-white/80 leading-[1.6] font-light">
                              {isEn ? activeProject.demonstratesEn : activeProject.demonstratesFr}
                            </p>
                          </div>

                          {/* Bouton Fermer */}
                          <div className="mt-4">
                            <button 
                              onClick={() => {
                                setActiveFlipped(false)
                                setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100)
                              }}
                              className="font-sans text-xs uppercase tracking-widest text-white/50 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                            >
                              <span className="group-hover:-translate-x-1 transition-transform duration-300">←</span> {t('btn_close').replace('× ', '')}
                            </button>
                          </div>
                        </div>

                        {/* Bloc Image */}
                        <div className="w-full md:w-[44%] flex items-center justify-center mt-8 md:mt-0">
                          <ProjectMiniCarousel 
                            images={activeProject.galleryPaths.length > 0 ? activeProject.galleryPaths : [activeProject.coverPath]} 
                          />
                        </div>
                      </div>

                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!activeFlipped && !activeFictionalFlipped && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full flex flex-col items-center justify-center py-20 gap-8"
          >
            <div className="w-px h-16 bg-gradient-to-b from-ink-soft/0 via-ink-soft/20 to-ink-soft/0" />
            
            <div className="text-center flex flex-col items-center gap-6">
              <h2 className="font-serif text-2xl md:text-3xl text-ink">
                {t('cta_separator_text')}
              </h2>
              
              <Link href="/reservation">
                <MagicButton className="px-8 group">
                  <span className="flex items-center justify-center gap-3">
                    <span className="font-sans text-xs tracking-[0.2em] uppercase font-medium">{t('cta_separator_btn')}</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-2">→</span>
                  </span>
                </MagicButton>
              </Link>
            </div>

            <div className="w-px h-16 bg-gradient-to-b from-ink-soft/0 via-ink-soft/20 to-ink-soft/0 mt-4" />
            
            {/* Indicateur visuel simple (Flèche) */}
            <div className="flex flex-col items-center justify-center gap-4 opacity-60 mt-8">
              <span className="font-sans uppercase tracking-[0.25em] text-[10px] text-ink-soft">
                {isEn ? 'Fictional Concepts' : 'Concepts Fictifs'}
              </span>
              <svg 
                width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                className="text-ink-soft/70 animate-bounce"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!activeFlipped && (
          <motion.div 
            ref={fictionalRef}
            key="section-fictif"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-6xl mx-auto px-4 flex flex-col items-center gap-12 relative z-10 overflow-hidden pb-32"
          >
            {/* Titre central Fictif */}
            <motion.div 
              className="text-center flex flex-col gap-4"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <h1 className="font-serif text-4xl md:text-5xl text-ink">
                {isEn ? 'Fictional Visions' : 'Visions Fictives'}
              </h1>
              <p className="text-ink-soft font-light text-sm md:text-base">
                {isEn ? 'Conceptual exploration of materials through global brands.' : 'Exploration conceptuelle des matières à travers des marques mondiales.'}
              </p>
        </motion.div>

        {/* ─── CARROUSEL 3D COVERFLOW FICTIF ─── */}
        <div className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center mt-8" style={{ perspective: '1200px' }}>
          {fictionalConcepts.map((project, index) => {
            const offset = index - activeFictionalIndex
            const isActive = offset === 0

            // Mathématiques du Coverflow
            const isInactiveFlippedState = activeFictionalFlipped && !isActive
            const translateX = offset * (typeof window !== 'undefined' && window.innerWidth < 768 ? 140 : 280)
            const translateZ = Math.abs(offset) * -200 + (isInactiveFlippedState ? -150 : 0) + (isActive && activeFictionalFlipped ? 40 : 0)
            const rotateY = offset * -25
            const scale = 1 - Math.abs(offset) * 0.1
            const opacity = isInactiveFlippedState 
              ? Math.max(0, 1 - Math.abs(offset) * 0.3 - 0.6)
              : 1 - Math.abs(offset) * 0.3
            const zIndex = isActive && activeFictionalFlipped ? 100 : 50 - Math.abs(offset)
            
            const filterValue = isInactiveFlippedState
               ? `brightness(0.2)`
               : 'brightness(1)'

            // Pour simplifier l'animation d'entrée du second carrousel, on utilise whileInView
            const entranceAnimate = {
              x: translateX,
              z: translateZ,
              rotateY: rotateY,
              scale: scale,
              opacity: opacity,
              filter: filterValue,
            }

            return (
              <motion.div
                key={project.id}
                className="absolute top-0 bottom-0 flex flex-col items-center justify-center cursor-pointer"
                style={{ zIndex, willChange: 'transform, opacity' }}
                initial={{ opacity: 0 }}
                whileInView={entranceAnimate}
                viewport={{ once: false, margin: "-50px" }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                onClick={() => handleFictionalCardClick(index)}
              >
                <motion.div
                  className="w-[260px] h-[360px] md:w-[350px] md:h-[480px] rounded-2xl"
                  animate={isActive && activeFictionalFlipped ? {
                    y: -15,
                  } : {
                    y: 0,
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  style={{ willChange: 'transform' }}
                >
                  <FlipCard 
                    key={`${project.id}-${isActive}`}
                    className="w-full h-full cursor-pointer group"
                    isFlippable={isActive}
                    onFlipChange={(flipped) => handleFictionalFlipChange(flipped, index)}
                    frontImage={project.coverPath}
                    frontContent={
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-black/40 backdrop-blur-[2px] text-center z-10 pointer-events-none">
                        {project.logoPath ? (
                          <div className="relative w-72 h-36 md:w-[340px] md:h-[180px] mb-6">
                            {/* Halo simple */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-white/10 blur-[30px] rounded-full z-0 pointer-events-none" />
                            
                            <Image 
                              src={project.logoPath} 
                              alt={`${project.brandName} logo`}
                              fill
                              sizes="(max-width: 768px) 300px, 400px"
                              className="object-contain relative z-10"
                            />
                          </div>
                        ) : (
                          <h3 className="font-serif text-5xl md:text-6xl lg:text-7xl text-white tracking-widest uppercase drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
                              style={{ textShadow: '0 4px 30px rgba(0,0,0,0.8), 0 2px 10px rgba(255,255,255,0.2)' }}
                          >
                            {project.brandName}
                          </h3>
                        )}
                      </div>
                    }
                    backContent={
                      <div className="absolute inset-0 w-full h-full p-8 flex flex-col justify-center items-center text-center rounded-2xl border border-white/10"
                           style={{ background: 'linear-gradient(135deg, rgba(20,20,20,0.95), rgba(0,0,0,0.98))' }}>
                        <h4 className="font-sans text-[10px] md:text-xs uppercase tracking-[0.3em] text-white/50 mb-6">{isEn ? 'Materials used' : 'Matières utilisées'}</h4>
                        <div className="flex flex-col gap-4">
                          {project.materials.map(mat => (
                            <div key={mat} className="font-serif text-lg md:text-2xl text-white">
                              {translateMaterial(mat)}
                            </div>
                          ))}
                        </div>
                      </div>
                    }
                  />
                </motion.div>

              </motion.div>
            )
          })}
        </div>

        {/* ─── PANNEAU ÉDITORIAL MINI (Fictional) ─── */}
        <AnimatePresence>
          {activeFictionalFlipped && activeFictionalProject && (
            <motion.div
              initial={{ opacity: 0, y: 30, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: 30, height: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="w-full max-w-5xl mx-auto overflow-hidden mt-12 md:mt-20"
            >
              {/* Outer — Gradient border wrapper */}
              <div 
                className="mx-4 md:mx-0 relative"
                style={{
                  borderRadius: '16px',
                  padding: '1px',
                  background: 'radial-gradient(circle 600px at 0% 0%, #ffffff, #0c0d0d)',
                }}
              >
                <div className="panel-dot" />

                <div 
                  className="relative w-full overflow-hidden"
                  style={{
                    borderRadius: '15px',
                    border: '1px solid #202222',
                    background: 'radial-gradient(circle 800px at 0% 0%, #333333, #0c0d0d)',
                  }}
                >
                  <div 
                    className="absolute pointer-events-none"
                    style={{
                      width: '280px', height: '50px', borderRadius: '100px',
                      backgroundColor: '#c7c7c7', opacity: 0.3, boxShadow: '0 0 60px #fff',
                      filter: 'blur(12px)', transformOrigin: '10%', top: '0%', left: '0',
                      transform: 'rotate(40deg)', zIndex: 1,
                    }}
                  />
                  <div className="absolute pointer-events-none" style={{ top: '8%', left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, #888888 30%, #1d1f1f 70%)' }} />
                  <div className="absolute pointer-events-none" style={{ bottom: '8%', left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, #2c2c2c 30%, #1d1f1f 70%)' }} />
                  <div className="absolute pointer-events-none" style={{ left: '5%', top: 0, bottom: 0, width: '1px', background: 'linear-gradient(180deg, #747474 30%, #222424 70%)' }} />
                  <div className="absolute pointer-events-none" style={{ right: '5%', top: 0, bottom: 0, width: '1px', background: 'linear-gradient(180deg, #2c2c2c 30%, #222424 70%)' }} />

                  <div className="relative z-10 flex flex-col items-center justify-center text-center" style={{ padding: '8% 7%' }}>
                    <div className="flex flex-col md:flex-row items-center gap-2 mb-6">
                      <span className="font-sans text-[10px] md:text-xs uppercase tracking-widest text-white border border-white/30 px-3 py-1 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                        {t('fictional_type')}
                      </span>
                    </div>

                    <h3 className="font-serif text-3xl md:text-4xl text-white mb-2">{activeFictionalProject.brandName}</h3>
                    
                    <p className="font-sans text-[10px] md:text-xs text-white/40 italic font-light mb-8 max-w-md">
                      {t('fictional_disclaimer')}
                    </p>

                    <div className="flex flex-col md:flex-row gap-8 text-left w-full max-w-4xl mb-12">
                      <div className="flex-1 flex flex-col gap-1 md:items-center md:text-center">
                        <span className="font-sans text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-white/30">{t('lbl_contribution')}</span>
                        <p className="font-sans text-xs md:text-sm text-white/80 leading-[1.6] font-light">
                          {t('fictional_contribution')}
                        </p>
                      </div>
                      <div className="flex-1 flex flex-col gap-1 md:items-center md:text-center">
                        <span className="font-sans text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-white/30">{t('lbl_demonstrates')}</span>
                        <p className="font-sans text-xs md:text-sm text-white/80 leading-[1.6] font-light">
                          {t('fictional_demonstrates')}
                        </p>
                      </div>
                    </div>

                    <div className="w-full md:w-3/4 lg:w-2/3 flex items-center justify-center mb-8">
                      <ProjectMiniCarousel 
                        images={activeFictionalProject.galleryPaths.length > 0 ? activeFictionalProject.galleryPaths : [activeFictionalProject.coverPath]} 
                      />
                    </div>

                    {/* Bouton Fermer */}
                    <button 
                      onClick={() => {
                        setActiveFictionalFlipped(false)
                        setTimeout(() => window.scrollTo({ top: fictionalRef.current?.offsetTop || 0, behavior: 'smooth' }), 100)
                      }}
                      className="font-sans text-xs uppercase tracking-widest text-white/50 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <span className="group-hover:-translate-x-1 transition-transform duration-300">←</span> {t('btn_close').replace('× ', '')}
                    </button>
                  </div>

                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

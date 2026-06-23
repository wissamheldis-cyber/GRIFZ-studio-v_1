'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { projects, Project } from '@/data/projectsData'
import { fictionalConcepts, FictionalConcept } from '@/data/fictionalConceptsData'
import { useTranslations, useLocale } from 'next-intl'
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

      <div 
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 50%, rgba(0,0,0,0.04) 100%)',
          mixBlendMode: 'overlay',
        }}
      />
      <div 
        className="absolute top-0 left-0 right-0 h-[30%] pointer-events-none z-[1]"
        style={{
          background: 'linear-gradient(to bottom, rgba(255,255,255,0.12) 0%, transparent 100%)',
        }}
      />

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
  const [viewMode, setViewMode] = useState<'selection' | 'realisations' | 'fictional'>('selection')
  const [activeIndex, setActiveIndex] = useState(0)
  const [showDetails, setShowDetails] = useState(false)
  
  const [isMobile, setIsMobile] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const t = useTranslations('Realisations')
  const locale = useLocale()
  const isEn = locale === 'en'

  const realisationsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

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

  const currentList = viewMode === 'realisations' ? projects : fictionalConcepts
  const activeProject = currentList[activeIndex]

  const handleCardClick = (index: number) => {
    if (activeIndex === index) {
      setShowDetails(true)
      window.dispatchEvent(new CustomEvent('card-flip', { 
        detail: { isFlipped: true, color: currentList[index].rainColor } 
      }))
      setTimeout(() => {
        window.scrollTo({ top: 300, behavior: 'smooth' })
      }, 150)
    } else {
      setActiveIndex(index)
      setShowDetails(false)
      window.dispatchEvent(new CustomEvent('card-flip', { 
        detail: { isFlipped: false } 
      }))
    }
  }

  const handleCloseDetails = () => {
    setShowDetails(false)
    window.dispatchEvent(new CustomEvent('card-flip', { 
      detail: { isFlipped: false } 
    }))
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100)
  }

  return (
    <main className="min-h-[100dvh] pt-32 pb-32 flex flex-col items-center justify-center relative overflow-hidden">

      <AnimatePresence mode="wait">
        {viewMode === 'selection' ? (
          <motion.div 
            key="selection"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row gap-6 md:gap-12 items-center justify-center w-full px-4 mt-20"
          >
            {/* Bouton Nos Réalisations (Même style que Reserver un appel) */}
            <div onClick={() => { setViewMode('realisations'); setActiveIndex(0); setShowDetails(false); }}>
              <MagicButton className="px-12 py-6 text-lg group">
                <span className="flex items-center justify-center gap-4">
                  <span className="font-sans tracking-[0.2em] uppercase font-medium">{t('title')}</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-2">→</span>
                </span>
              </MagicButton>
            </div>

            {/* Bouton Visions Fictives (Style grisâtre) */}
            <div 
              onClick={() => { setViewMode('fictional'); setActiveIndex(0); setShowDetails(false); }}
              style={{
                '--color-wrapper-border': 'rgba(255, 255, 255, 0.1)',
                '--color-btn-bg': 'rgba(100, 100, 100, 0.05)',
                '--color-layer-b': 'rgba(150, 150, 150, 0.2)',
                '--color-overlay-text': 'rgba(255, 255, 255, 0.6)',
              } as React.CSSProperties}
            >
              <MagicButton className="px-12 py-6 text-lg group" style={{ filter: 'grayscale(0.8)' }}>
                <span className="flex items-center justify-center gap-4">
                  <span className="font-sans tracking-[0.2em] uppercase font-medium">{isEn ? 'Fictional Visions' : 'Visions Fictives'}</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-2">→</span>
                </span>
              </MagicButton>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key={`view-${viewMode}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-6xl mx-auto px-4 flex flex-col items-center relative z-10"
            ref={realisationsRef}
          >
            {/* Header info et Bouton retour */}
            <div className="absolute top-0 left-0 w-full flex items-center justify-between z-20">
              <button 
                onClick={() => {
                   setViewMode('selection')
                   setShowDetails(false)
                   window.dispatchEvent(new CustomEvent('card-flip', { detail: { isFlipped: false } }))
                }}
                className="font-sans text-xs md:text-sm uppercase tracking-widest text-white/50 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
              >
                <span className="group-hover:-translate-x-1 transition-transform duration-300">←</span> {t('btn_close').replace('× ', isEn ? 'Back' : 'Précédent')}
              </button>
            </div>

            {/* Titre central en haut du carrousel */}
            <motion.div 
              className="text-center flex flex-col gap-4 mt-8 md:mt-0"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <h1 className="font-serif text-4xl md:text-5xl text-ink">
                {viewMode === 'realisations' ? t('title') : (isEn ? 'Fictional Visions' : 'Visions Fictives')}
              </h1>
              <p className="text-ink-soft font-light text-sm md:text-base">
                {viewMode === 'realisations' ? t('subtitle') : (isEn ? 'Conceptual exploration of materials through global brands.' : 'Exploration conceptuelle des matières à travers des marques mondiales.')}
              </p>
            </motion.div>

            {/* Carrousel Logos (Desktop 3D / Mobile 2D) */}
            <div className="mt-8 w-full max-w-[100vw]">
              {!isMobile ? (
                /* Coverflow 3D pour Desktop */
                <div className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center" style={{ perspective: '1200px' }}>
                  {currentList.map((item, index) => {
                    const offset = index - activeIndex
                    const isActive = offset === 0

                    const translateX = offset * 280
                    const translateZ = Math.abs(offset) * -200 + (isActive && showDetails ? 40 : 0)
                    const rotateY = offset * -25
                    const scale = 1 - Math.abs(offset) * 0.1
                    const opacity = showDetails && !isActive
                      ? Math.max(0, 1 - Math.abs(offset) * 0.3 - 0.6)
                      : 1 - Math.abs(offset) * 0.3
                    const zIndex = isActive && showDetails ? 100 : 50 - Math.abs(offset)
                    
                    const filterBlur = showDetails && !isActive
                      ? `brightness(0.2) blur(4px)`
                      : Math.abs(offset) > 0 ? `brightness(${Math.max(0.4, 1 - Math.abs(offset) * 0.2)}) blur(${Math.abs(offset) * 2}px)` : 'brightness(1) blur(0px)'

                    return (
                      <motion.div
                        key={item.id}
                        className="absolute top-0 bottom-0 flex flex-col items-center justify-center cursor-pointer"
                        style={{ zIndex }}
                        animate={{
                          x: translateX,
                          z: translateZ,
                          rotateY: rotateY,
                          scale: scale,
                          opacity: opacity,
                          filter: filterBlur,
                        }}
                        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                        onClick={() => handleCardClick(index)}
                      >
                        <motion.div
                          animate={
                            isActive && showDetails 
                              ? { y: -15 }
                              : prefersReducedMotion ? {} : { y: [0, -10, 0] }
                          }
                          transition={
                            isActive && showDetails
                              ? { type: 'spring', stiffness: 300, damping: 20 }
                              : { duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }
                          }
                          className="w-[200px] h-[200px] md:w-[350px] md:h-[350px] flex items-center justify-center relative transition-transform duration-500 hover:scale-110"
                        >
                          {item.logoPath ? (
                            <Image src={item.logoPath} alt={'title' in item ? item.title : item.brandName} fill className="object-contain drop-shadow-[0_10px_25px_rgba(255,255,255,0.15)]" sizes="350px" />
                          ) : (
                            <h3 className="font-serif text-3xl md:text-5xl text-white drop-shadow-2xl text-center uppercase tracking-widest">{'title' in item ? item.title : item.brandName}</h3>
                          )}
                        </motion.div>
                      </motion.div>
                    )
                  })}
                </div>
              ) : (
                /* Native Slider 2D pour Mobile */
                <div className="w-full flex overflow-x-auto gap-16 px-[50vw] snap-x snap-mandatory py-16 scrollbar-hide items-center h-[300px]">
                  <div className="-ml-[100px] shrink-0" />
                  {currentList.map((item, index) => {
                    const isActive = index === activeIndex
                    return (
                      <div 
                        key={item.id}
                        className="snap-center shrink-0 w-[180px] h-[180px] flex flex-col items-center justify-center cursor-pointer"
                        onClick={() => handleCardClick(index)}
                      >
                        <motion.div
                          animate={{ 
                            y: isActive && showDetails ? -10 : [0, -8, 0],
                            scale: isActive ? 1.1 : 0.8,
                            opacity: isActive ? 1 : 0.5,
                          }}
                          transition={
                            isActive && showDetails
                              ? { type: 'spring', stiffness: 300, damping: 20 }
                              : { duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }
                          }
                          className="relative w-full h-full flex items-center justify-center"
                        >
                          {item.logoPath ? (
                            <Image src={item.logoPath} alt={'title' in item ? item.title : item.brandName} fill className="object-contain drop-shadow-[0_10px_20px_rgba(255,255,255,0.1)]" sizes="180px" />
                          ) : (
                            <h3 className="font-serif text-2xl text-white drop-shadow-xl text-center uppercase tracking-widest w-full">{'title' in item ? item.title : item.brandName}</h3>
                          )}
                        </motion.div>
                      </div>
                    )
                  })}
                  <div className="-mr-[100px] shrink-0" />
                </div>
              )}
            </div>

            {/* ─── PANNEAU ÉDITORIAL (Restauration de l'ancien panneau) ─── */}
            <AnimatePresence>
              {showDetails && activeProject && (
                <motion.div
                  initial={{ opacity: 0, y: 30, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: 30, height: 0 }}
                  transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="w-full max-w-5xl mx-auto overflow-hidden mt-2 md:mt-8 mb-20"
                >
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
                    @media (max-width: 768px) {
                      .panel-dot { display: none; }
                    }
                  `}} />

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
                          width: '280px', height: '50px', borderRadius: '100px', backgroundColor: '#c7c7c7', opacity: 0.3,
                          filter: 'blur(12px)', transformOrigin: '10%', top: '0%', left: '0', transform: 'rotate(40deg)', zIndex: 1,
                        }}
                      />

                      <div className="absolute pointer-events-none" style={{ top: '8%', left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, #888888 30%, #1d1f1f 70%)' }} />
                      <div className="absolute pointer-events-none" style={{ bottom: '8%', left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, #2c2c2c 30%, #1d1f1f 70%)' }} />
                      <div className="absolute pointer-events-none" style={{ left: '5%', top: 0, bottom: 0, width: '1px', background: 'linear-gradient(180deg, #747474 30%, #222424 70%)' }} />
                      <div className="absolute pointer-events-none" style={{ right: '5%', top: 0, bottom: 0, width: '1px', background: 'linear-gradient(180deg, #2c2c2c 30%, #222424 70%)' }} />

                      <div className="relative z-10 flex flex-col md:flex-row items-stretch" style={{ padding: '10% 7%' }}>
                        
                        {/* Bloc Texte */}
                        <div className="flex-1 flex flex-col gap-6 text-left pr-0 md:pr-12">
                          {viewMode === 'realisations' ? (
                            <>
                              <div className="flex flex-col gap-4">
                                <div className="flex flex-wrap gap-2">
                                  <span className="font-sans text-[10px] md:text-xs uppercase tracking-widest text-white/40 border border-white/20 px-3 py-1 rounded-full">
                                    {t('lbl_type')}: {isEn ? (activeProject as Project).projectTypeEn : (activeProject as Project).projectTypeFr}
                                  </span>
                                  {(activeProject as Project).offerIllustrated && (
                                    <span className="font-sans text-[10px] md:text-xs uppercase tracking-widest text-white/80 border border-white/40 px-3 py-1 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.1)]">
                                      {(activeProject as Project).offerIllustrated}
                                    </span>
                                  )}
                                </div>
                                <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white leading-tight">{(activeProject as Project).title}</h3>
                              </div>

                              <div className="w-8 h-px bg-white/20" />

                              <div className="flex flex-col gap-1">
                                <span className="font-sans text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-white/30">{t('lbl_contribution')}</span>
                                <p className="font-sans text-xs md:text-sm text-white/80 leading-[1.6] font-light">
                                  {isEn ? (activeProject as Project).contributionEn : (activeProject as Project).contributionFr}
                                </p>
                              </div>

                              <div className="flex flex-col gap-2">
                                <span className="font-sans text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-white/30">{t('lbl_deliverables')}</span>
                                <div className="flex flex-wrap gap-2">
                                  {(activeProject as Project).deliverables.map((d: string) => (
                                    <span key={d} className="font-sans text-[9px] md:text-[10px] uppercase tracking-[0.1em] text-white/60 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
                                      {d}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              <div className="flex flex-col gap-1">
                                <span className="font-sans text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-white/30">{t('lbl_demonstrates')}</span>
                                <p className="font-sans text-xs md:text-sm text-white/80 leading-[1.6] font-light">
                                  {isEn ? (activeProject as Project).demonstratesEn : (activeProject as Project).demonstratesFr}
                                </p>
                              </div>
                            </>
                          ) : (
                            <>
                              {/* Fictional Text Block */}
                              <div className="flex flex-col gap-4">
                                <div className="flex flex-wrap gap-2">
                                  <span className="font-sans text-[10px] md:text-xs uppercase tracking-widest text-white/40 border border-white/20 px-3 py-1 rounded-full">
                                    {isEn ? 'Fictional Concept' : 'Concept Fictif'}
                                  </span>
                                </div>
                                <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white leading-tight">{(activeProject as FictionalConcept).brandName}</h3>
                              </div>

                              <div className="w-8 h-px bg-white/20" />

                              <p className="font-sans text-xs md:text-sm text-white/40 italic font-light">
                                {t('fictional_disclaimer')}
                              </p>

                              <div className="flex flex-col gap-1">
                                <span className="font-sans text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-white/30">{t('lbl_contribution')}</span>
                                <p className="font-sans text-xs md:text-sm text-white/80 leading-[1.6] font-light">
                                  {t('fictional_contribution')}
                                </p>
                              </div>

                              <div className="flex flex-col gap-2">
                                <span className="font-sans text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-white/30">{isEn ? 'Materials' : 'Matières'}</span>
                                <div className="flex flex-wrap gap-2">
                                  {(activeProject as FictionalConcept).materials.map((m: string) => (
                                    <span key={m} className="font-sans text-[9px] md:text-[10px] uppercase tracking-[0.1em] text-white/60 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
                                      {translateMaterial(m)}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              <div className="flex flex-col gap-1">
                                <span className="font-sans text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-white/30">{t('lbl_demonstrates')}</span>
                                <p className="font-sans text-xs md:text-sm text-white/80 leading-[1.6] font-light">
                                  {t('fictional_demonstrates')}
                                </p>
                              </div>
                            </>
                          )}

                          <div className="mt-4">
                            <button 
                              onClick={handleCloseDetails}
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
    </main>
  )
}

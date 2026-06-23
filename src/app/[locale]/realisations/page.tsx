'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { projects, Project } from '@/data/projectsData'
import { fictionalConcepts, FictionalConcept } from '@/data/fictionalConceptsData'
import { useTranslations, useLocale } from 'next-intl'

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
  const [selectedProject, setSelectedProject] = useState<Project | FictionalConcept | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  
  const [isMobile, setIsMobile] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const t = useTranslations('Realisations')
  const locale = useLocale()
  const isEn = locale === 'en'

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (selectedProject) {
      window.dispatchEvent(new CustomEvent('card-flip', { 
        detail: { isFlipped: true, color: selectedProject.rainColor } 
      }))
    } else {
      window.dispatchEvent(new CustomEvent('card-flip', { 
        detail: { isFlipped: false } 
      }))
    }
  }, [selectedProject])

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
            className="flex flex-col md:flex-row gap-8 items-center justify-center w-full max-w-5xl px-4"
          >
            {/* Bouton Nos Réalisations */}
            <div 
              onClick={() => {
                setViewMode('realisations')
                setActiveIndex(0)
              }}
              className="group relative cursor-pointer flex-1 w-full flex flex-col items-center justify-center p-12 md:p-24 rounded-3xl border border-white/10 hover:border-white/30 transition-all duration-500 overflow-hidden"
              style={{ background: 'radial-gradient(circle at center, rgba(30,30,30,0.4), rgba(0,0,0,0.6))' }}
            >
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <h2 className="font-serif text-3xl md:text-5xl text-white z-10 text-center tracking-widest drop-shadow-md transition-transform duration-500 group-hover:scale-105">
                {t('title')}
              </h2>
              <span className="font-sans text-xs md:text-sm text-white/50 uppercase tracking-[0.3em] mt-6 z-10 transition-colors duration-300 group-hover:text-white/80">
                {t('subtitle')}
              </span>
            </div>

            {/* Bouton Visions Fictives */}
            <div 
              onClick={() => {
                setViewMode('fictional')
                setActiveIndex(0)
              }}
              className="group relative cursor-pointer flex-1 w-full flex flex-col items-center justify-center p-12 md:p-24 rounded-3xl border border-white/10 hover:border-white/30 transition-all duration-500 overflow-hidden"
              style={{ background: 'radial-gradient(circle at center, rgba(30,30,30,0.4), rgba(0,0,0,0.6))' }}
            >
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <h2 className="font-serif text-3xl md:text-5xl text-white z-10 text-center tracking-widest drop-shadow-md transition-transform duration-500 group-hover:scale-105">
                {isEn ? 'Fictional Visions' : 'Visions Fictives'}
              </h2>
              <span className="font-sans text-xs md:text-sm text-white/50 uppercase tracking-[0.3em] mt-6 z-10 transition-colors duration-300 group-hover:text-white/80 text-center">
                {isEn ? 'Conceptual exploration' : 'Exploration conceptuelle'}
              </span>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key={`view-${viewMode}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full flex flex-col items-center justify-center relative"
          >
            {/* Header info et Bouton retour */}
            <div className="absolute top-0 left-0 w-full flex items-center justify-between px-6 md:px-12 z-20">
              <button 
                onClick={() => setViewMode('selection')}
                className="font-sans text-xs md:text-sm uppercase tracking-widest text-white/50 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
              >
                <span className="group-hover:-translate-x-1 transition-transform duration-300">←</span> {t('btn_close').replace('× ', isEn ? 'Back' : 'Précédent')}
              </button>
              
              <div className="font-serif text-xl md:text-2xl text-white/40 tracking-widest">
                {viewMode === 'realisations' ? t('title') : (isEn ? 'Fictional Visions' : 'Visions Fictives')}
              </div>
            </div>

            {/* Carrousel Logos */}
            <div className="mt-16 w-full max-w-[100vw]">
              {!isMobile ? (
                /* Coverflow 3D pour Desktop */
                <div className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center" style={{ perspective: '1200px' }}>
                  {currentList.map((item, index) => {
                    const offset = index - activeIndex
                    const isActive = offset === 0

                    const translateX = offset * 280
                    const translateZ = Math.abs(offset) * -200
                    const rotateY = offset * -25
                    const scale = 1 - Math.abs(offset) * 0.1
                    const opacity = 1 - Math.abs(offset) * 0.3
                    const zIndex = 50 - Math.abs(offset)
                    
                    const filterBlur = Math.abs(offset) > 0 ? `brightness(${Math.max(0.4, 1 - Math.abs(offset) * 0.2)}) blur(${Math.abs(offset) * 2}px)` : 'brightness(1) blur(0px)'

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
                        onClick={() => {
                          if (isActive) setSelectedProject(item as any)
                          else setActiveIndex(index)
                        }}
                      >
                        <motion.div
                          animate={prefersReducedMotion ? {} : { y: [0, -10, 0] }}
                          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
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
                <div className="w-full flex overflow-x-auto gap-16 px-[50vw] snap-x snap-mandatory py-16 scrollbar-hide items-center h-[400px]">
                  {/* Pseudo elements to enforce start padding correctly in flex */ }
                  <div className="-ml-[100px] shrink-0" />
                  {currentList.map((item, index) => {
                    const isActive = index === activeIndex
                    return (
                      <div 
                        key={item.id}
                        className="snap-center shrink-0 w-[200px] h-[200px] flex flex-col items-center justify-center cursor-pointer"
                        onClick={() => {
                          setActiveIndex(index)
                          setSelectedProject(item as any)
                        }}
                      >
                        <motion.div
                          animate={{ 
                            y: [0, -8, 0],
                            scale: isActive ? 1.1 : 0.8,
                            opacity: isActive ? 1 : 0.5,
                          }}
                          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
                          className="relative w-full h-full flex items-center justify-center"
                        >
                          {item.logoPath ? (
                            <Image src={item.logoPath} alt={'title' in item ? item.title : item.brandName} fill className="object-contain drop-shadow-[0_10px_20px_rgba(255,255,255,0.1)]" sizes="200px" />
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

          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Interface Modal Floutée pour le Projet Sélectionné --- */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-8"
          >
            {/* Background flouté */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-2xl" onClick={() => setSelectedProject(null)} />
            
            {/* Contenu de la modale */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative w-full h-full md:h-auto max-h-full md:max-h-[90vh] md:max-w-6xl md:rounded-3xl border-0 md:border border-white/10 overflow-y-auto overflow-x-hidden flex flex-col md:flex-row gap-8 lg:gap-16 items-start p-6 md:p-12 lg:p-16 scrollbar-hide"
              style={{ background: 'radial-gradient(circle at top right, rgba(40,40,40,0.7), rgba(10,10,10,0.95))' }}
            >
              {/* Bouton Fermer */}
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 font-sans text-xs uppercase tracking-widest text-white/50 hover:text-white transition-colors duration-300 flex items-center gap-2 group z-20 bg-black/20 p-2 rounded-full md:bg-transparent md:p-0"
              >
                <span className="group-hover:-translate-x-1 transition-transform duration-300">←</span> <span className="hidden md:inline">{t('btn_close').replace('× ', isEn ? 'Back' : 'Précédent')}</span>
              </button>

              {/* Colonne Informations */}
              <div className="flex-1 flex flex-col gap-8 w-full mt-10 md:mt-0">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-wrap gap-2">
                    <span className="font-sans text-[10px] md:text-xs uppercase tracking-widest text-white/50 border border-white/20 px-3 py-1 rounded-full">
                      {'title' in selectedProject ? (isEn ? selectedProject.projectTypeEn : selectedProject.projectTypeFr) : (isEn ? 'Fictional Concept' : 'Concept Fictif')}
                    </span>
                  </div>
                  
                  {selectedProject.logoPath ? (
                    <div className="relative w-full max-w-[250px] h-20 md:h-24 opacity-80 mb-2">
                       <Image src={selectedProject.logoPath} alt="Logo" fill className="object-contain object-left" />
                    </div>
                  ) : (
                    <h3 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
                      {'title' in selectedProject ? selectedProject.title : selectedProject.brandName}
                    </h3>
                  )}
                </div>

                <div className="w-12 h-px bg-white/20" />

                {/* Données spécifiques selon le type de projet */}
                {'title' in selectedProject ? (
                  // C'est un "Vrai" Projet (Realisations)
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-1">
                      <span className="font-sans text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-white/30">{t('lbl_contribution')}</span>
                      <p className="font-sans text-sm md:text-base text-white/80 leading-relaxed font-light">
                        {isEn ? selectedProject.contributionEn : selectedProject.contributionFr}
                      </p>
                    </div>

                    <div className="flex flex-col gap-2">
                      <span className="font-sans text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-white/30">{t('lbl_deliverables')}</span>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.deliverables.map(d => (
                          <span key={d} className="font-sans text-[10px] uppercase tracking-[0.1em] text-white/60 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
                            {d}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <span className="font-sans text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-white/30">{t('lbl_demonstrates')}</span>
                      <p className="font-sans text-sm md:text-base text-white/80 leading-relaxed font-light">
                        {isEn ? selectedProject.demonstratesEn : selectedProject.demonstratesFr}
                      </p>
                    </div>
                  </div>
                ) : (
                  // C'est un concept Fictif
                  <div className="flex flex-col gap-6">
                     <p className="font-sans text-xs md:text-sm text-white/40 italic font-light max-w-md">
                        {t('fictional_disclaimer')}
                     </p>
                     
                     <div className="flex flex-col gap-1">
                        <span className="font-sans text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-white/30">{t('lbl_contribution')}</span>
                        <p className="font-sans text-sm md:text-base text-white/80 leading-relaxed font-light">
                           {t('fictional_contribution')}
                        </p>
                     </div>

                     <div className="flex flex-col gap-2">
                        <span className="font-sans text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-white/30">{isEn ? 'Materials used' : 'Matières explorées'}</span>
                        <div className="flex flex-wrap gap-2">
                           {selectedProject.materials.map(m => (
                             <span key={m} className="font-sans text-[10px] uppercase tracking-[0.1em] text-white/70 bg-white/10 border border-white/20 px-3 py-1.5 rounded-full">
                               {translateMaterial(m)}
                             </span>
                           ))}
                        </div>
                     </div>

                     <div className="flex flex-col gap-1">
                        <span className="font-sans text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-white/30">{t('lbl_demonstrates')}</span>
                        <p className="font-sans text-sm md:text-base text-white/80 leading-relaxed font-light">
                           {t('fictional_demonstrates')}
                        </p>
                     </div>
                  </div>
                )}
              </div>

              {/* Colonne Galerie d'images */}
              <div className="w-full md:w-[50%] lg:w-[45%] flex-shrink-0 flex items-start justify-center">
                <ProjectMiniCarousel images={selectedProject.galleryPaths?.length > 0 ? selectedProject.galleryPaths : [selectedProject.coverPath]} />
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

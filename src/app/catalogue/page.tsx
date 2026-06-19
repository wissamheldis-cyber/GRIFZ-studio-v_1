'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { FlipCard } from '@/components/ui/FlipCard'
import Image from 'next/image'
import { materials, MaterialData } from '@/data/materialsData'
import { useHeaderContext } from '@/context/HeaderContext'

const categories = [
  'Métaux & Alliages', 
  'Organiques & Naturels', 
  'Minéraux & Carbone', 
  'Polymères & Synthétiques'
]

// Composant Carrousel pour une catégorie spécifique
function CategoryCarousel({ 
  title, 
  categoryMaterials,
  onCardActivate 
}: { 
  title: string, 
  categoryMaterials: MaterialData[],
  onCardActivate: (orbPath: string | undefined) => void
}) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [hasEntered, setHasEntered] = useState(false)
  const [entranceComplete, setEntranceComplete] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })
  const prefersReducedMotion = useReducedMotion()

  // Déclencher l'animation quand la section entre dans le viewport
  useEffect(() => {
    if (isInView) {
      const startTimer = setTimeout(() => setHasEntered(true), 80)
      const endTimer = setTimeout(() => setEntranceComplete(true), 1000)
      return () => { clearTimeout(startTimer); clearTimeout(endTimer) }
    }
  }, [isInView])

  const handleCardClick = (index: number) => {
    if (activeIndex !== index) {
      setActiveIndex(index)
    }
    onCardActivate(categoryMaterials[index].orbPath)
  }

  if (categoryMaterials.length === 0) return null

  // --- Calcul du stagger : latérales d'abord, centrale en dernier ---
  const getStaggerDelay = (index: number) => {
    if (prefersReducedMotion) return 0
    const offset = Math.abs(index - activeIndex)
    const maxOffset = Math.max(...categoryMaterials.map((_, i) => Math.abs(i - activeIndex)))
    const normalizedOrder = maxOffset > 0 ? 1 - (offset / maxOffset) : 0
    return normalizedOrder * 0.3 + 0.05
  }

  const getEntranceDuration = () => prefersReducedMotion ? 0.01 : 0.65

  return (
    <div ref={sectionRef} className="w-full flex flex-col items-center gap-6 py-12 md:py-20 border-b border-line last:border-b-0">
      
      {/* Titre de la Catégorie — avec fade-in au viewport */}
      <motion.h2 
        className="font-serif text-3xl md:text-4xl text-ink text-center"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
        animate={hasEntered ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {title}
      </motion.h2>
      
      {/* Carrousel 3D de la Catégorie */}
      <div className="relative w-full h-[320px] md:h-[400px] flex items-center justify-center mt-4" style={{ perspective: '1200px' }}>
        {categoryMaterials.map((mat, index) => {
          const offset = index - activeIndex
          const isActive = offset === 0

          // Mathématiques du Coverflow
          const translateX = offset * (typeof window !== 'undefined' && window.innerWidth < 768 ? 140 : 280)
          const translateZ = Math.abs(offset) * -200
          const rotateY = offset * -25
          const scale = 1 - Math.abs(offset) * 0.1
          const opacity = 1 - Math.abs(offset) * 0.3
          const zIndex = 50 - Math.abs(offset)
          
          const filterBlur = Math.abs(offset) > 0 ? `blur(${Math.abs(offset) * 4}px)` : 'blur(0px)'

          const staggerDelay = getStaggerDelay(index)

          // État initial : toutes les cartes partent du centre, invisibles, écrasées
          const entranceInitial = prefersReducedMotion ? false : {
            x: 0,
            z: -500,
            rotateY: 0,
            scale: 0.25,
            opacity: 0,
            filter: 'blur(18px)',
          }

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
              key={mat.id}
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
                className="w-[240px] h-[240px] md:w-[320px] md:h-[320px]"
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <FlipCard 
                  key={`${mat.id}-${isActive}`}
                  className="w-full h-full cursor-pointer group"
                  isFlippable={isActive}
                  frontImage={mat.coverPath}
                  frontContent={
                    <div className="absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-black/0" />
                  }
                  backContent={
                    <div className="flex flex-col gap-3 md:gap-4 text-center w-full h-full p-6 justify-between relative z-10 overflow-hidden">
                      
                      <div className="flex flex-col gap-2">
                        <h4 className="font-serif text-xl md:text-2xl text-white drop-shadow-md">{mat.name}</h4>
                        <p className="text-[9px] md:text-[10px] text-white/80 font-light leading-relaxed line-clamp-3 md:line-clamp-none">
                          {mat.description}
                        </p>
                      </div>
                      
                      {mat.paletteImages && mat.paletteImages.length > 0 && (
                        <div className="w-full">
                          <span className="font-sans text-[7px] md:text-[8px] uppercase tracking-[0.2em] text-white/50 block mb-2">Palette</span>
                          <div className="flex justify-center items-center gap-2">
                            {mat.paletteImages.slice(0, 4).map((img, i) => (
                              <div key={i} className="relative w-10 h-10 md:w-14 md:h-14 rounded-lg overflow-hidden border border-white/20 shadow-lg">
                                <Image 
                                  src={img} 
                                  alt={`${mat.name} palette ${i + 1}`} 
                                  fill 
                                  className="object-cover"
                                  unoptimized 
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                    </div>
                  }
                />
              </motion.div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}


export default function CataloguePage() {
  const { setActiveOrbImage } = useHeaderContext()

  // S'assurer que l'orbe est réinitialisée quand on quitte le catalogue
  useEffect(() => {
    return () => setActiveOrbImage(null)
  }, [setActiveOrbImage])

  return (
    <main className="min-h-screen pt-40 pb-32 flex flex-col items-center relative overflow-hidden">


      <div className="w-full max-w-7xl mx-auto px-4 flex flex-col items-center relative z-10">
        
        {/* Titre central de la page */}
        <div className="text-center flex flex-col gap-4 mb-8 md:mb-16">
          <h1 className="font-serif text-4xl md:text-6xl text-ink">
            Catalogue des Matières
          </h1>
          <p className="text-ink-soft font-light text-sm md:text-base max-w-2xl mx-auto">
            Découvrez nos essences à travers différentes collections. Cliquez sur les cartes au centre pour en révéler les palettes.
          </p>
        </div>

        {/* Section par Catégorie */}
        <div className="w-full flex flex-col">
          {categories.map(catTitle => {
            const catMaterials = materials.filter(m => m.category === catTitle)
            return (
              <CategoryCarousel 
                key={catTitle} 
                title={catTitle} 
                categoryMaterials={catMaterials} 
                onCardActivate={(orbPath) => setActiveOrbImage(orbPath || null)}
              />
            )
          })}
        </div>

      </div>
    </main>
  )
}

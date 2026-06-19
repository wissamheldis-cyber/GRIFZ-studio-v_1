'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Orb, { OrbMaterial } from '@/components/ui/Orb'
import { EnterButton } from '@/components/ui/EnterButton'
import Image from 'next/image'

// Config
const SHOW_INTRO = true

const MATERIALS_SEQUENCE: OrbMaterial[] = [
  'charbon', 
  'cuivre', 
  'emeraude', 
  'bois-de-cerisier', 
  'cuir', 
  'verre'
]

const WORDS = [
  'matière', 
  'forme', 
  'présence', 
  'direction', 
  'identité'
]

export function GrifzLoadingIntro() {
  const [isVisible, setIsVisible] = useState(false)
  const [phase, setPhase] = useState(0)
  const [isSkipped, setIsSkipped] = useState(false)

  useEffect(() => {
    if (!SHOW_INTRO) return
    const hasSeenIntro = sessionStorage.getItem('grifz-intro-seen')
    if (!hasSeenIntro) {
      setIsVisible(true)
    }
  }, [])

  const finishIntro = () => {
    setIsSkipped(true)
    setTimeout(() => {
      setIsVisible(false)
      sessionStorage.setItem('grifz-intro-seen', 'true')
    }, 800) // durée du fade out global
  }

  useEffect(() => {
    if (!isVisible || isSkipped) return

    let currentPhase = 0
    // Durée totale d'animation ~3.5 secondes pour 6 étapes = ~500ms par étape
    const interval = setInterval(() => {
      currentPhase++
      if (currentPhase <= 5) {
        setPhase(currentPhase)
      } else {
        setPhase(6) // Phase finale : texte final + logo
        clearInterval(interval)
      }
    }, 500)

    return () => clearInterval(interval)
  }, [isVisible, isSkipped])

  // Si on a déjà vu l'intro ou qu'elle est terminée
  if (!isVisible) return null

  const isFinalPhase = phase === 6
  // La matière active suit la phase (de 0 à 5)
  const activeMaterial = MATERIALS_SEQUENCE[Math.min(phase, 5)]

  return (
    <AnimatePresence>
      {!isSkipped && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(10px)' }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black overflow-hidden"
        >
          {/* Logo GRIFZ affiché en permanence ou à la fin en haut */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: isFinalPhase ? 1 : 0.4, y: 0 }}
            transition={{ duration: 1 }}
            className="absolute top-12 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center"
          >
            <div className="relative w-48 h-24 md:w-56 md:h-28 mb-2">
              <Image 
                src="/logo/grifz-logo-black.png" 
                alt="GRIFZ Studio Logo" 
                fill 
                style={{ objectFit: 'contain' }} 
                priority
                unoptimized={true}
              />
            </div>
          </motion.div>

          <div className="relative flex flex-col items-center justify-center w-full h-full flex-1">
            
            <AnimatePresence mode="wait">
              {!isFinalPhase ? (
                /* --- L'Orb Centrale en cours d'animation --- */
                <motion.div 
                  key="orb"
                  className="relative z-10 flex items-center justify-center"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0, filter: 'blur(10px)' }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                >
                  <Orb 
                    material={activeMaterial} 
                    size={280} 
                    animated={false} 
                    intensity={0.4} 
                    showLogo={false}
                  />
                </motion.div>
              ) : (
                /* --- Le Bouton ENTER qui remplace l'Orbe --- */
                <motion.div
                  key="button"
                  className="relative z-20 flex flex-col items-center justify-center gap-12"
                  initial={{ scale: 0.8, opacity: 0, filter: 'blur(10px)' }}
                  animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
                  transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                >
                  {/* Container pour centrer parfaitement la lueur derrière le bouton */}
                  <div className="relative flex items-center justify-center">
                    {/* Lueur lente et floue émanant du bouton */}
                    <motion.div
                      className="absolute w-40 h-40 md:w-64 md:h-64 rounded-full bg-white pointer-events-none"
                      style={{ filter: 'blur(60px)' }}
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.05, 0.15, 0.05],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />

                    <EnterButton onClick={finishIntro} />
                  </div>
                  
                  {/* --- La Citation apparaissant 3 secondes plus tard --- */}
                  <motion.p 
                    className="font-serif text-lg md:text-xl text-white italic tracking-wide text-center w-[300px]"
                    style={{ textShadow: '0 0 12px rgba(255,255,255,0.6)' }}
                    initial={{ opacity: 0, filter: 'blur(10px)', y: -10 }}
                    animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                    transition={{ delay: 3, duration: 1.5, ease: 'easeInOut' }}
                  >
                    "a touch can change the world"
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* --- Mots Flottants --- */}
            <AnimatePresence>
              {!isFinalPhase && (
                <motion.div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  {WORDS.map((word, i) => {
                    const isVisibleWord = phase >= i && phase < 6
                    const angle = (i * (360 / WORDS.length) + 45) * (Math.PI / 180)
                    const radius = 220
                    const x = Math.cos(angle) * radius
                    const y = Math.sin(angle) * radius

                    return (
                      <AnimatePresence key={word}>
                        {isVisibleWord && (
                          <motion.div
                            initial={{ opacity: 0, filter: 'blur(10px)', x: x * 0.8, y: y * 0.8 }}
                            animate={{ opacity: 0.4, filter: 'blur(0px)', x, y }}
                            exit={{ opacity: 0, filter: 'blur(10px)', scale: 1.1 }}
                            transition={{ duration: 0.6 }}
                            className="absolute font-sans text-xs md:text-sm uppercase tracking-[0.3em] text-white"
                          >
                            {word}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  )
}

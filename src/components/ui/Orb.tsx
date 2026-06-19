'use client'

import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

/* ─── Types ─────────────────────────────────────────────────
   Props du composant Orb
   Modulaire : peut être enrichi plus tard avec Three.js / WebGL
   sans changer l'interface publique.
   ─────────────────────────────────────────────────────────── */
export type OrbMaterial =
  | 'grifz'
  | 'verre'
  | 'bois-de-cerisier'
  | 'cuir'
  | 'cuivre'
  | 'emeraude'
  | 'charbon'

export interface OrbProps {
  /** Matière active (prédéfinie) */
  material?: OrbMaterial
  /** Image personnalisée (écrase material) */
  customImage?: string | null
  /** Taille en pixels (diamètre) */
  size?: number
  /** Afficher le logo GRIFZ sur l'orb */
  showLogo?: boolean
  /** Activer les animations (flottement, shimmer) */
  animated?: boolean
  /** Intensité des effets : 0–1 */
  intensity?: number
  /** Classes CSS additionnelles */
  className?: string
}

/* ─── Config matières ────────────────────────────────────── */
export const MATERIAL_CONFIG: Record<string, { image: string; glow: string; shadowColor: string }> = {
  'grifz': {
    image: '/orb/orb grifz .png',
    glow: 'rgba(255, 255, 255, 0.3)',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
  },
  'verre': {
    image: '/orb/orb-glass.png',
    glow: 'rgba(200, 230, 240, 0.6)',
    shadowColor: 'rgba(180, 210, 230, 0.4)',
  },
  'bois-de-cerisier': {
    image: '/orb/orb-wood.png',
    glow: 'rgba(155, 87, 45, 0.35)',
    shadowColor: 'rgba(155, 87, 45, 0.25)',
  },
  'cuir': {
    image: '/orb/orb-leather.png',
    glow: 'rgba(123, 74, 49, 0.35)',
    shadowColor: 'rgba(123, 74, 49, 0.25)',
  },
  'cuivre': {
    image: '/orb/orb-copper.png',
    glow: 'rgba(182, 107, 61, 0.45)',
    shadowColor: 'rgba(182, 107, 61, 0.3)',
  },
  'emeraude': {
    image: '/orb/orb-emerald.png',
    glow: 'rgba(0, 110, 79, 0.4)',
    shadowColor: 'rgba(0, 110, 79, 0.25)',
  },
  'charbon': {
    image: '/orb/orb-charcoal.png',
    glow: 'rgba(40, 40, 40, 0.35)',
    shadowColor: 'rgba(20, 20, 20, 0.4)',
  },
}

/* ─── Composant Orb ──────────────────────────────────────── */
export default function Orb({
  material = 'verre',
  customImage = null,
  size = 160,
  showLogo = false,
  animated = true,
  intensity = 0.7,
  className = '',
}: OrbProps) {
  // Déterminer la config de base
  const baseConfig = showLogo
    ? { ...MATERIAL_CONFIG['verre'], image: '/orb/orb-glass-logo.png' }
    : (MATERIAL_CONFIG[material] || MATERIAL_CONFIG['grifz'])

  // Si customImage, on remplace l'image, sinon config de base
  const finalImage = customImage || baseConfig.image
  // On peut utiliser le glow de 'verre' par défaut pour les images customisées ou celui de base
  const finalGlow = customImage ? 'rgba(255, 255, 255, 0.4)' : baseConfig.glow
  const finalShadow = customImage ? 'rgba(0, 0, 0, 0.2)' : baseConfig.shadowColor

  const glowIntensity = intensity

  return (
    <div
      className={`relative flex items-center justify-center flex-shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Halo / glow externe */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle at 40% 35%, ${finalGlow}, transparent 70%)`,
          filter: 'blur(20px)',
          opacity: glowIntensity * 0.8,
        }}
        animate={animated ? {
          opacity: [glowIntensity * 0.6, glowIntensity * 0.9, glowIntensity * 0.6],
          scale: [1, 1.05, 1],
        } : {}}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Corps de l'orb — image avec transition AnimatePresence */}
      <motion.div
        className="relative rounded-full overflow-hidden"
        style={{
          width: size,
          height: size,
          boxShadow: [
            `0 20px 60px ${finalShadow}`,
            `0 8px 24px rgba(0,0,0,0.08)`,
            `inset 0 -2px 10px rgba(255,255,255,0.4)`,
          ].join(', '),
        }}
        animate={animated ? {
          y: [0, -8, -4, 0],
          rotate: [0, 0.5, -0.3, 0],
        } : {}}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <AnimatePresence>
          <motion.div
            key={finalImage}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Image de la matière en fond */}
            <Image
              src={finalImage}
              alt={`Orb image`}
              fill
              quality={100}
              style={{ 
                objectFit: 'cover', 
                objectPosition: 'center', 
                filter: 'contrast(1.05) brightness(0.95)', 
                transform: 'scale(1.6)' 
              }}
              priority
              sizes="(max-width: 768px) 100vw, 800px"
            />

            {/* --- Couches de Verre (Glass Layers) --- */}
            
            {/* Ombre interne pour la profondeur sphérique */}
            <div 
              className="absolute inset-0 pointer-events-none" 
              style={{ boxShadow: 'inset -12px -20px 40px rgba(0,0,0,0.3), inset 12px 20px 40px rgba(255,255,255,0.5)' }} 
            />
            
            {/* Highlight principal (reflet en haut à gauche) */}
            <div 
              className="absolute pointer-events-none" 
              style={{ 
                top: '6%', left: '12%', width: '45%', height: '35%', 
                background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 70%)', 
                transform: 'rotate(-40deg)',
                filter: 'blur(2px)'
              }} 
            />
            
            {/* Reflet d'environnement (en bas) */}
            <div 
              className="absolute pointer-events-none" 
              style={{ 
                bottom: '-5%', left: '10%', width: '80%', height: '40%', 
                background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 65%)',
                filter: 'blur(4px)'
              }} 
            />

            {/* Couche globale de réfraction (overlay) */}
            <div 
              className="absolute inset-0 pointer-events-none" 
              style={{ 
                background: 'radial-gradient(circle at 35% 35%, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 50%, rgba(0,0,0,0.05) 80%, rgba(0,0,0,0.2) 100%)', 
                mixBlendMode: 'overlay' 
              }} 
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

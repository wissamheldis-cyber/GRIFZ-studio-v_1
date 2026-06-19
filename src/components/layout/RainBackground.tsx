'use client'

import { usePathname } from '@/i18n/routing'
import { useEffect, useState } from 'react'

export default function RainBackground() {
  const pathname = usePathname()
  const [isFlippedActive, setIsFlippedActive] = useState(false)
  const [rainColor, setRainColor] = useState<string | undefined>(undefined)

  useEffect(() => {
    // Écoute un événement personnalisé "card-flip" pour afficher la pluie dynamique
    const handleFlip = (e: CustomEvent) => {
      setIsFlippedActive(e.detail.isFlipped)
      setRainColor(e.detail.color)
    }
    
    // Ajout et retrait du listener
    window.addEventListener('card-flip' as any, handleFlip)
    return () => window.removeEventListener('card-flip' as any, handleFlip)
  }, [])

  // Réinitialiser le flip si on change de page
  useEffect(() => {
    setIsFlippedActive(false)
    setRainColor(undefined)
  }, [pathname])

  // Pages où la pluie est toujours active (Désactivé suite aux retours)
  const isActive = isFlippedActive

  // Gérer la classe theme-dark sur le body pour rendre le texte blanc
  useEffect(() => {
    if (isActive) {
      document.body.classList.add('theme-dark')
    } else {
      document.body.classList.remove('theme-dark')
    }
  }, [isActive])

  const isRainbow = rainColor === 'rainbow'
  const finalColor = isRainbow ? '#09f' : (rainColor || '#09f')

  return (
    <div 
      className={`fixed inset-0 z-[-1] rain-pattern pointer-events-none transition-opacity duration-700 ${
        isActive ? 'opacity-100' : 'opacity-0'
      } ${isRainbow ? 'rainbow' : ''}`}
      style={{ '--rain-color': finalColor } as React.CSSProperties}
    />
  )
}

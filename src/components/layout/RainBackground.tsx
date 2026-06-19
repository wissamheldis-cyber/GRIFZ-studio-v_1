'use client'

import { usePathname } from '@/i18n/routing'
import { useEffect, useState } from 'react'

export default function RainBackground() {
  const pathname = usePathname()
  const [isFlippedActive, setIsFlippedActive] = useState(false)

  useEffect(() => {
    // Écoute un événement personnalisé "card-flip" pour afficher la pluie dynamique
    const handleFlip = (e: CustomEvent) => {
      setIsFlippedActive(e.detail.isFlipped)
    }
    
    // Ajout et retrait du listener
    window.addEventListener('card-flip' as any, handleFlip)
    return () => window.removeEventListener('card-flip' as any, handleFlip)
  }, [])

  // Réinitialiser le flip si on change de page
  useEffect(() => {
    setIsFlippedActive(false)
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

  return (
    <div 
      className={`fixed inset-0 z-[-1] rain-pattern pointer-events-none transition-opacity duration-700 ${
        isActive ? 'opacity-100' : 'opacity-0'
      }`}
    />
  )
}

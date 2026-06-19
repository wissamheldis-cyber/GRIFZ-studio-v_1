'use client'

import { useState, useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { FlipCard } from '@/components/ui/FlipCard'
import Image from 'next/image'

export interface Article {
  id: string | number
  title: string
  coverPath: string
}

export function ArticlesCarousel({ articles }: { articles: Article[] }) {
  const [activeIndex, setActiveIndex] = useState(Math.floor(articles.length / 2))
  const [activeFlipped, setActiveFlipped] = useState(false)
  const [hasEntered, setHasEntered] = useState(false)
  const [entranceComplete, setEntranceComplete] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const startTimer = setTimeout(() => setHasEntered(true), 100)
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
    }
  }

  const getStaggerDelay = (index: number) => {
    if (prefersReducedMotion) return 0
    const offset = Math.abs(index - activeIndex)
    const maxOffset = Math.max(...articles.map((_, i) => Math.abs(i - activeIndex)))
    const normalizedOrder = maxOffset > 0 ? 1 - (offset / maxOffset) : 0
    return normalizedOrder * 0.35 + 0.05
  }

  const getEntranceDuration = () => prefersReducedMotion ? 0.01 : 0.7

  if (!articles || articles.length === 0) return null

  return (
    <div className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center mt-8" style={{ perspective: '1200px' }}>
      {articles.map((article, index) => {
        const offset = index - activeIndex
        const isActive = offset === 0

        const isInactiveFlippedState = activeFlipped && !isActive
        const translateX = offset * (typeof window !== 'undefined' && window.innerWidth < 768 ? 120 : 240)
        const translateZ = Math.abs(offset) * -200 + (isInactiveFlippedState ? -150 : 0) + (isActive && activeFlipped ? 40 : 0)
        const rotateY = offset * -25
        const scale = 1 - Math.abs(offset) * 0.1
        const opacity = isInactiveFlippedState 
          ? Math.max(0, 1 - Math.abs(offset) * 0.3 - 0.6)
          : 1 - Math.abs(offset) * 0.3
        const zIndex = isActive && activeFlipped ? 100 : 50 - Math.abs(offset)
        
        const filterBlur = isInactiveFlippedState
            ? `blur(${Math.abs(offset) * 4 + 16}px) brightness(0.2)`
            : Math.abs(offset) > 0 ? `blur(${Math.abs(offset) * 4}px)` : 'blur(0px)'

        const staggerDelay = getStaggerDelay(index)

        const entranceInitial = prefersReducedMotion ? false : {
          x: 0,
          z: -600,
          rotateY: 0,
          scale: 0.3,
          opacity: 0,
          filter: 'blur(20px)',
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
            key={article.id}
            className="absolute top-0 bottom-0 flex flex-col items-center justify-center cursor-pointer"
            style={{ zIndex }}
            initial={entranceInitial as any}
            animate={entranceAnimate as any}
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
              className="w-[240px] h-[340px] md:w-[300px] md:h-[420px] rounded-2xl"
              animate={isActive && activeFlipped ? {
                y: -15,
                boxShadow: "0 40px 100px rgba(0,0,0,0.8), 0 0 80px rgba(255,255,255,0.06)"
              } : {
                y: 0,
                boxShadow: "0 0 0 rgba(0,0,0,0)"
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <FlipCard 
                key={`${article.id}-${isActive}`}
                className="w-full h-full cursor-pointer group"
                isFlippable={isActive}
                onFlipChange={(flipped) => handleFlipChange(flipped, index)}
                frontImage={article.coverPath}
                frontContent={
                  <div className="absolute inset-0 flex items-center justify-center p-8 bg-black/40 backdrop-blur-[2px]">
                    <h3 className="font-serif text-2xl md:text-3xl text-white drop-shadow-2xl transition-transform duration-500 group-hover:scale-105 text-center">
                      {article.title}
                    </h3>
                  </div>
                }
                backContent={
                  <div className="absolute inset-0 w-full h-full overflow-hidden rounded-2xl bg-black flex flex-col items-center justify-center p-6 text-center">
                    <p className="text-white/80 text-sm mb-4">Read Article</p>
                    <div className="px-6 py-2 border border-white/20 rounded-full text-white text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
                      Discover
                    </div>
                  </div>
                }
              />
            </motion.div>
          </motion.div>
        )
      })}
    </div>
  )
}

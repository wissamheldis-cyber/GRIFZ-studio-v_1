'use client'

import Image from 'next/image'
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion'
import { useRef } from 'react'
import { Project } from '@/data/projectsData'

interface ProjectCardProps {
  project: Project
  onClick: () => void
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  // 1. Parallax Effect
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  const y = useTransform(scrollYProgress, [0, 1], [30, -30])
  const springY = useSpring(y, { stiffness: 100, damping: 30 })

  // 2. 3D Hover Effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (rect) {
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      mouseX.set(x)
      mouseY.set(y)
    }
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  const rotateX = useTransform(mouseY, [-200, 200], [4, -4])
  const rotateY = useTransform(mouseX, [-200, 200], [-4, 4])

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      className="group relative cursor-pointer overflow-visible rounded-2xl"
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        y: springY,
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      whileHover={{ scale: 1.02 }}
    >
      <div 
        className="relative w-full aspect-[4/5] md:aspect-[3/4] rounded-2xl overflow-hidden bg-black border border-white/10"
        style={{ transform: 'translateZ(20px)' }}
      >
        <Image
          src={project.coverPath}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />
      </div>
      
      <div 
        className="absolute bottom-0 left-0 w-full p-6 flex flex-col gap-2 pointer-events-none"
        style={{ transform: 'translateZ(60px)' }}
      >
        {project.isConceptual && (
          <span className="text-[10px] uppercase tracking-widest text-white/50 border border-white/20 rounded-full px-3 py-1 w-max mb-2 backdrop-blur-md bg-black/20">
            Exploration Interne
          </span>
        )}
        <h3 className="font-serif text-2xl md:text-3xl text-white transform transition-transform duration-300 translate-y-2 group-hover:translate-y-0">
          {project.title}
        </h3>
        <p className="font-sans text-xs uppercase tracking-widest text-white/60 transform transition-transform duration-300 translate-y-2 group-hover:translate-y-0 delay-75">
          {project.category}
        </p>
      </div>
    </motion.div>
  )
}

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Project } from '@/data/projectsData'

interface ProjectCardProps {
  project: Project
  onClick: () => void
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      className="group relative cursor-pointer overflow-hidden rounded-2xl bg-black border border-white/10"
      onClick={onClick}
    >
      <div className="relative w-full aspect-[4/5] md:aspect-[3/4]">
        <Image
          src={project.coverPath}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />
      </div>
      
      <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col gap-2 transform transition-transform duration-300 translate-y-2 group-hover:translate-y-0">
        {project.isConceptual && (
          <span className="text-[10px] uppercase tracking-widest text-white/50 border border-white/20 rounded-full px-3 py-1 w-max mb-2 backdrop-blur-md bg-black/20">
            Exploration Interne
          </span>
        )}
        <h3 className="font-serif text-2xl md:text-3xl text-white">{project.title}</h3>
        <p className="font-sans text-xs uppercase tracking-widest text-white/60">{project.category}</p>
      </div>
    </motion.div>
  )
}

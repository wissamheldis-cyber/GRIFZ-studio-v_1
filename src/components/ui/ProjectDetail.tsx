import { useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Project } from '@/data/projectsData'
import Orb from '@/components/ui/Orb'

interface ProjectDetailProps {
  project: Project | null
  onClose: () => void
}

export function ProjectDetail({ project, onClose }: ProjectDetailProps) {
  // Désactiver le scroll du body quand la modale est ouverte
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [project])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[100] flex justify-end bg-black/60 backdrop-blur-xl"
          onClick={onClose}
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="relative w-full max-w-4xl h-full bg-[#050505] border-l border-white/10 overflow-y-auto flex flex-col"
            onClick={(e) => e.stopPropagation()} // Évite de fermer au clic sur le panneau
          >
            {/* Bouton fermer */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
            >
              ✕
            </button>

            {/* Header avec Cover & Logo */}
            <div className="relative w-full h-[40vh] md:h-[50vh] min-h-[300px]">
              <Image
                src={project.coverPath}
                alt={project.title}
                fill
                className="object-cover opacity-60"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent" />
              
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                {project.logoPath ? (
                  <div className="relative w-32 h-32 md:w-48 md:h-48 mb-6 drop-shadow-2xl">
                    <Image
                      src={project.logoPath}
                      alt={`${project.title} logo`}
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                ) : (
                  <h2 className="font-serif text-5xl md:text-7xl text-white mb-6 drop-shadow-2xl">
                    {project.title}
                  </h2>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 px-6 md:px-16 py-12 flex flex-col gap-12 relative z-10">
              
              {/* Orb background */}
              <div className="absolute top-0 right-0 opacity-10 pointer-events-none blur-3xl">
                <Orb material={project.material} size={300} animated={false} intensity={0.5} showLogo={false} />
              </div>

              {/* Disclaimer si conceptuel */}
              {project.isConceptual && (
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-white/60 text-sm font-light flex items-start gap-3">
                  <span className="text-white mt-1">✦</span>
                  <p>
                    <strong className="text-white font-medium">Exploration conceptuelle interne</strong><br/>
                    Ce projet est une étude de style réalisée par GRIFZ Studio. Il ne s'agit pas d'une collaboration officielle avec la marque évoquée, mais d'une démonstration de notre vision et de notre savoir-faire.
                  </p>
                </div>
              )}

              {/* Infos principales */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="flex flex-col gap-4">
                  <h3 className="font-sans text-xs uppercase tracking-[0.2em] text-white/40">Le Problème</h3>
                  <p className="font-serif text-lg md:text-xl text-white/90 leading-relaxed">
                    {project.problem}
                  </p>
                </div>
                <div className="flex flex-col gap-4">
                  <h3 className="font-sans text-xs uppercase tracking-[0.2em] text-white/40">La Solution</h3>
                  <p className="font-serif text-lg md:text-xl text-white/90 leading-relaxed">
                    {project.solution}
                  </p>
                </div>
              </div>

              {/* Livrables & Catégorie */}
              <div className="flex flex-wrap gap-8 pt-8 border-t border-white/10">
                <div className="flex flex-col gap-2">
                  <span className="font-sans text-[10px] uppercase tracking-widest text-white/40">Catégorie</span>
                  <span className="font-sans text-sm text-white">{project.category}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="font-sans text-[10px] uppercase tracking-widest text-white/40">Livrables</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {project.deliverables.map(d => (
                      <span key={d} className="px-3 py-1 rounded-full border border-white/20 text-xs text-white/80">
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Galerie */}
              {project.galleryPaths.length > 0 && (
                <div className="flex flex-col gap-6 mt-8">
                  <h3 className="font-sans text-xs uppercase tracking-[0.2em] text-white/40 text-center mb-4">Galerie</h3>
                  <div className="grid grid-cols-1 gap-6">
                    {project.galleryPaths.map((path, idx) => (
                      <div key={idx} className="relative w-full overflow-hidden rounded-xl bg-white/5" style={{ minHeight: '300px' }}>
                        <Image
                          src={path}
                          alt={`${project.title} gallery ${idx + 1}`}
                          width={1200}
                          height={800}
                          className="w-full h-auto object-cover"
                          unoptimized
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Footer Spacer */}
              <div className="h-24"></div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

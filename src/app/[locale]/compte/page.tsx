'use client'

import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import WireframeSphere from '@/components/ui/WireframeSphere'
import { MagicButton } from '@/components/ui/MagicButton'
import { EnterButton } from '@/components/ui/EnterButton'

export default function ComptePage() {
  const locale = useLocale()
  
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAuthenticating, setIsAuthenticating] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsAuthenticating(true)
    // Simulation d'un chargement
    setTimeout(() => {
      setIsAuthenticating(false)
      setIsAuthenticated(true)
    }, 1500)
  }

  const isEn = locale === 'en'

  return (
    <section className="min-h-screen px-6 pt-24 pb-12 flex flex-col items-center justify-center relative overflow-hidden">
      
      <AnimatePresence mode="wait">
        {!isAuthenticated ? (
          <motion.div 
            key="login"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
            transition={{ duration: 0.6 }}
            className="w-full flex justify-center"
          >
            {/* Écran de Connexion */}
            <div className="relative w-full max-w-md md:max-w-xl aspect-[4/5] md:aspect-square rounded-2xl overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.5)] border border-white/10 group">
              {/* Le fond de pluie géré par la classe universelle */}
              <div className="absolute inset-0 z-0 rain-pattern pointer-events-none opacity-50 group-hover:opacity-70 transition-opacity duration-700"></div>
              {/* Overlay sombre */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40 z-[1]"></div>

              <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-8">
                <h1 className="font-serif text-3xl md:text-4xl mb-2 text-white tracking-wide text-center">
                  GRIFZ VAULT
                </h1>
                <p className="text-white/50 text-sm font-sans uppercase tracking-[0.2em] text-center mb-12">
                  {isEn ? 'Client Portal Access' : 'Accès Espace Client'}
                </p>
                
                <form onSubmit={handleLogin} className="w-[85%] md:w-[75%] max-w-sm flex flex-col items-center gap-6 mx-auto">
                  <div className="flex flex-col items-center gap-2 w-full">
                    <label className="text-[10px] text-white/50 uppercase tracking-widest text-center">{isEn ? 'Identifier' : 'Identifiant'}</label>
                    <input 
                      type="text" 
                      placeholder="studio@marque.com"
                      className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-4 text-center text-white placeholder-white/20 focus:outline-none focus:border-white/40 transition-colors font-sans text-sm"
                      required
                    />
                  </div>
                  <div className="flex flex-col items-center gap-2 w-full">
                    <label className="text-[10px] text-white/50 uppercase tracking-widest text-center">{isEn ? 'Access Key' : 'Clé d\'accès'}</label>
                    <input 
                      type="password" 
                      placeholder="••••••••••••"
                      className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-4 text-center text-white placeholder-white/20 focus:outline-none focus:border-white/40 transition-colors font-sans text-sm"
                      required
                    />
                  </div>
                  
                  <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex justify-center">
                    <EnterButton type="submit" disabled={isAuthenticating} />
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="dashboard"
            initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="w-full max-w-6xl flex flex-col gap-8"
          >
            {/* Header Dashboard */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4 border-b border-ink/10 pb-8">
              <div>
                <p className="text-ink-soft text-xs uppercase tracking-[0.3em] mb-2">{isEn ? 'Secure connection established' : 'Connexion sécurisée établie'}</p>
                <h1 className="font-serif text-3xl md:text-5xl text-ink">Welcome back, <br/><span className="text-ink-soft">Guest Brand</span></h1>
              </div>
              <div className="flex items-center gap-3 bg-black/5 px-6 py-3 rounded-full border border-black/5">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs uppercase tracking-widest text-ink font-medium">{isEn ? 'System Online' : 'Système Actif'}</span>
              </div>
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Widget 1: Timeline */}
              <div className="col-span-1 lg:col-span-2 relative rounded-3xl p-8 border border-ink/10 bg-gradient-to-br from-black/5 to-transparent overflow-hidden backdrop-blur-sm">
                <h3 className="font-serif text-2xl text-ink mb-12">{isEn ? 'Project Timeline' : 'Avancement du Projet'}</h3>
                
                <div className="relative flex justify-between items-center mb-4">
                  {/* Ligne de fond */}
                  <div className="absolute left-0 top-3 md:top-4 w-full h-[2px] bg-ink/10 -z-10" />
                  {/* Ligne active */}
                  <div className="absolute left-0 top-3 md:top-4 w-[60%] h-[2px] bg-ink -z-10" />
                  
                  {['OBSERVER', 'RÉVÉLER', 'CONSTRUIRE', 'DÉPLOYER'].map((step, idx) => {
                    const isActive = idx <= 2; // Simulation: étape 3 (Construire) en cours
                    const isCurrent = idx === 2;
                    return (
                      <div key={step} className="flex flex-col items-center gap-3">
                        <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full border-2 transition-colors duration-500 bg-white ${isActive ? 'border-ink' : 'border-ink/20'} ${isCurrent ? 'ring-4 ring-ink/20 shadow-lg' : ''}`}>
                          {isActive && <div className="w-full h-full rounded-full bg-ink scale-50" />}
                        </div>
                        <span className={`text-[9px] md:text-xs uppercase tracking-widest ${isActive ? 'text-ink font-medium' : 'text-ink-soft'}`}>{step}</span>
                      </div>
                    )
                  })}
                </div>
                
                <div className="mt-12 bg-white/50 p-6 rounded-2xl border border-ink/5">
                  <span className="text-[10px] uppercase tracking-widest text-ink-soft block mb-2">{isEn ? 'Current Phase' : 'Phase Actuelle'}</span>
                  <p className="font-sans text-sm md:text-base leading-relaxed text-ink">
                    {isEn 
                      ? 'We are currently building your digital assets. 3D renders and core visual identity are being finalized.'
                      : 'Nous sommes en train de construire vos actifs digitaux. Les rendus 3D et l\'identité visuelle de base sont en cours de finalisation.'}
                  </p>
                </div>
              </div>

              {/* Widget 3: Conciergerie */}
              <div className="col-span-1 relative rounded-3xl p-8 border border-ink/10 bg-ink overflow-hidden text-white flex flex-col justify-between min-h-[300px]">
                <div className="absolute -top-20 -right-20 opacity-30 pointer-events-none">
                  <WireframeSphere size={300} items={20} glow2="rgba(255, 255, 255, 0.1)" />
                </div>
                
                <div className="relative z-10">
                  <h3 className="font-serif text-2xl mb-2">{isEn ? 'Concierge' : 'Conciergerie'}</h3>
                  <p className="text-white/60 text-sm font-light leading-relaxed">
                    {isEn ? 'Need an update or want to adjust the direction? Book a direct sync with your Art Director.' : 'Besoin d\'un point d\'étape ou d\'ajuster la direction ? Planifiez un échange direct avec votre Directeur Artistique.'}
                  </p>
                </div>

                <div className="relative z-10 mt-8 flex justify-center w-full">
                  <MagicButton>
                    <span className="flex items-center justify-center gap-3">
                      <span className="font-sans text-xs tracking-[0.2em] uppercase font-medium">{isEn ? 'Book a Call' : 'Planifier un Appel'}</span>
                      <span className="transition-transform duration-300 group-hover:translate-x-2">→</span>
                    </span>
                  </MagicButton>
                </div>
              </div>

              {/* Widget 2: Vault (Livrables) */}
              <div className="col-span-1 lg:col-span-3 relative rounded-3xl p-8 border border-ink/10 bg-white/40 backdrop-blur-md">
                <div className="flex justify-between items-end mb-8">
                  <h3 className="font-serif text-2xl text-ink">{isEn ? 'Assets Vault' : 'Coffre-fort Livrables'}</h3>
                  <span className="text-xs uppercase tracking-widest text-ink-soft">3 {isEn ? 'files available' : 'fichiers disponibles'}</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { name: 'Brand_Guidelines_V1.pdf', size: '24 MB', type: 'PDF' },
                    { name: 'Logo_Pack_Premium.zip', size: '142 MB', type: 'ZIP' },
                    { name: '3D_Renders_Batch1.zip', size: '1.2 GB', type: 'ZIP' },
                  ].map((file, i) => (
                    <div key={i} className="group flex flex-col gap-4 p-6 rounded-2xl border border-ink/10 bg-white hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)] transition-all duration-300 cursor-pointer">
                      <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center">
                        <span className="text-[10px] font-bold text-ink">{file.type}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-ink mb-1 truncate">{file.name}</p>
                        <p className="text-xs text-ink-soft">{file.size}</p>
                      </div>
                      <div className="mt-2 w-full flex items-center justify-between text-xs font-medium text-ink opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span>{isEn ? 'Download' : 'Télécharger'}</span>
                        <span>↓</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

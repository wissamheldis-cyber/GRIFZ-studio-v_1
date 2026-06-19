'use client'

import { motion } from 'framer-motion'
import { GlassPanel } from '@/components/ui/GlassPanel'
import { GlassPill } from '@/components/ui/GlassPill'
import { ParallaxWrapper } from '@/components/ui/ParallaxWrapper'
import Orb from '@/components/ui/Orb'
import { useTranslations } from 'next-intl'

export default function ContactPage() {
  const t = useTranslations('Contact')
  return (
    <main className="min-h-screen pt-40 pb-20 px-6 flex flex-col items-center relative overflow-hidden">
      
      {/* Background glow subtil */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-ink/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-5xl mx-auto flex flex-col lg:flex-row items-start gap-12 lg:gap-24 relative z-10">
        
        {/* Colonne Gauche : Textes & Réassurance */}
        <div className="w-full lg:w-1/3 flex flex-col gap-12">
          <ParallaxWrapper offset={30} direction="up">
          
          <div className="flex flex-col gap-4">
            <motion.h1 
              className="font-serif text-4xl md:text-5xl text-ink"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {t('title')}
            </motion.h1>
            <motion.p 
              className="text-base text-ink-soft font-light leading-relaxed"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {t('intro')}
            </motion.p>
          </div>
          </ParallaxWrapper>

          <ParallaxWrapper offset={60} direction="up">
          <motion.div 
            className="flex flex-col gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="font-sans text-[11px] uppercase tracking-[0.15em] text-muted font-medium mb-2">{t('commitments')}</h3>
            
            <div className="flex items-center gap-4 text-sm text-ink-soft font-light">
              <div className="w-1.5 h-1.5 rounded-full bg-ink/40" />
              {t('commit_response')}
            </div>
            <div className="flex items-center gap-4 text-sm text-ink-soft font-light">
              <div className="w-1.5 h-1.5 rounded-full bg-ink/40" />
              {t('commit_confidential')}
            </div>
            <div className="flex items-center gap-4 text-sm text-ink-soft font-light">
              <div className="w-1.5 h-1.5 rounded-full bg-ink/40" />
              {t('commit_call')}
            </div>
            <div className="flex items-center gap-4 text-sm text-ink-soft font-light">
              <div className="w-1.5 h-1.5 rounded-full bg-ink/40" />
              {t('commit_obligation')}
            </div>
          </motion.div>
          </ParallaxWrapper>

          <ParallaxWrapper offset={20} direction="down">
          <motion.div 
            className="w-32 h-32 relative mt-auto hidden lg:block opacity-60"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 0.6, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Orb material="charbon" size={160} animated={true} intensity={0.2} />
          </motion.div>
          </ParallaxWrapper>
        </div>


        {/* Colonne Droite : Formulaire Glassmorphism */}
        <ParallaxWrapper offset={40} direction="up" className="w-full lg:w-2/3">
        <motion.div 
          className="w-full"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <GlassPanel className="p-10 md:p-16 w-full flex flex-col gap-10 border-white/50">
            
            <form className="flex flex-col gap-8" onSubmit={(e) => e.preventDefault()}>
              
              {/* Ligne 1 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-[10px] uppercase tracking-widest text-muted font-medium ml-2">{t('label_name')}</label>
                  <input 
                    type="text" 
                    id="name"
                    className="w-full bg-white/20 border border-white/30 rounded-2xl px-6 py-4 text-sm text-ink placeholder:text-ink/30 focus:outline-none focus:border-ink/20 focus:bg-white/40 transition-all backdrop-blur-md"
                    placeholder={t('placeholder_name')}
                  />
                </div>
                
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-[10px] uppercase tracking-widest text-muted font-medium ml-2">Email</label>
                  <input 
                    type="email" 
                    id="email"
                    className="w-full bg-white/20 border border-white/30 rounded-2xl px-6 py-4 text-sm text-ink placeholder:text-ink/30 focus:outline-none focus:border-ink/20 focus:bg-white/40 transition-all backdrop-blur-md"
                    placeholder="contact@email.com"
                  />
                </div>
              </div>

              {/* Ligne 2 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <label htmlFor="link" className="text-[10px] uppercase tracking-widest text-muted font-medium ml-2">{t('label_link')}</label>
                  <input 
                    type="url" 
                    id="link"
                    className="w-full bg-white/20 border border-white/30 rounded-2xl px-6 py-4 text-sm text-ink placeholder:text-ink/30 focus:outline-none focus:border-ink/20 focus:bg-white/40 transition-all backdrop-blur-md"
                    placeholder="https://"
                  />
                </div>
                
                <div className="flex flex-col gap-2">
                  <label htmlFor="material" className="text-[10px] uppercase tracking-widest text-muted font-medium ml-2">{t('label_material')}</label>
                  <select 
                    id="material"
                    className="w-full bg-white/20 border border-white/30 rounded-2xl px-6 py-4 text-sm text-ink focus:outline-none focus:border-ink/20 focus:bg-white/40 transition-all backdrop-blur-md appearance-none cursor-pointer"
                  >
                    <option value="" className="text-ink">{t('option_default')}</option>
                    <option value="verre" className="text-ink">{t('option_glass')}</option>
                    <option value="bois" className="text-ink">{t('option_wood')}</option>
                    <option value="cuir" className="text-ink">{t('option_leather')}</option>
                    <option value="cuivre" className="text-ink">{t('option_copper')}</option>
                    <option value="emeraude" className="text-ink">{t('option_emerald')}</option>
                    <option value="charbon" className="text-ink">{t('option_charcoal')}</option>
                  </select>
                </div>
              </div>

              {/* Ligne 3 */}
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-[10px] uppercase tracking-widest text-muted font-medium ml-2">{t('label_message')}</label>
                <textarea 
                  id="message"
                  rows={4}
                  className="w-full bg-white/20 border border-white/30 rounded-2xl px-6 py-4 text-sm text-ink placeholder:text-ink/30 focus:outline-none focus:border-ink/20 focus:bg-white/40 transition-all backdrop-blur-md resize-none"
                  placeholder={t('placeholder_message')}
                />
              </div>

              {/* Submit */}
              <div className="pt-4">
                <GlassPill className="w-full md:w-auto px-12 py-5 group" type="submit">
                  <span className="text-sm uppercase tracking-[0.15em] font-medium text-ink flex items-center justify-center gap-3">
                    {t('submit')}
                    <span className="transition-transform duration-300 group-hover:translate-x-2">→</span>
                  </span>
                </GlassPill>
              </div>

            </form>
          </GlassPanel>
        </motion.div>
        </ParallaxWrapper>

      </div>
    </main>
  )
}

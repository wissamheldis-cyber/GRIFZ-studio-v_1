'use client'

import { useTranslations } from 'next-intl'
import WireframeSphere from '@/components/ui/WireframeSphere'

export default function ComptePage() {
  const t = useTranslations('Account')

  return (
    <section className="min-h-[150vh] px-6 pt-40 pb-24 flex flex-col items-center justify-start">
      {/* Cadre animé avec le pattern de pluie */}
      <div className="relative w-full max-w-2xl aspect-[16/9] rounded-2xl overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.5)] border border-white/10">
        
        {/* Le fond de pluie géré par la classe universelle */}
        <div className="absolute inset-0 z-0 rain-pattern pointer-events-none"></div>
        
        {/* Overlay sombre pour assurer la lisibilité parfaite du texte blanc */}
        <div className="absolute inset-0 bg-black/20 z-[1]"></div>

        {/* Le contenu du cadre */}
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center p-8">
          <h1 className="font-serif text-4xl md:text-5xl mb-6 text-white tracking-wide">
            {t('title')}
          </h1>
          <p className="text-white/70 text-lg max-w-md mx-auto font-light leading-relaxed">
            {t('description')}
          </p>
          
          <div className="mt-10 px-8 py-3 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-white/90 text-sm tracking-widest uppercase shadow-[0_0_30px_rgba(0,153,255,0.1)]">
            {t('restricted')}
          </div>
        </div>
      </div>

      {/* ─── Encadré de test de Font (Font Lab) ─── */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Audiowide&family=Zen+Dots&family=Blinker:wght@400;600&family=Handjet:wght@400;600&family=Text+Me+One&family=Fascinate&family=Dongle:wght@400;700&family=Exo+2:wght@400;600&display=swap');
      `}} />

      <div className="mt-16 w-full max-w-4xl p-8 rounded-2xl border border-white/10 bg-black/5 backdrop-blur-md shadow-[0_20px_60px_rgba(0,0,0,0.1)] flex flex-col gap-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        
        <div className="text-center mb-4">
          <h2 className="text-xl text-ink font-semibold tracking-wider">{t('lab_title')}</h2>
          <p className="text-sm text-ink-soft mt-2">{t('lab_subtitle')}</p>
        </div>

        {[
          { name: 'Audiowide', family: "'Audiowide', cursive" },
          { name: 'Zen Dots', family: "'Zen Dots', cursive" },
          { name: 'Blinker', family: "'Blinker', sans-serif" },
          { name: 'Handjet', family: "'Handjet', cursive" },
          { name: 'Text Me One', family: "'Text Me One', sans-serif" },
          { name: 'Fascinate', family: "'Fascinate', cursive" },
          { name: 'Dongle', family: "'Dongle', sans-serif", extraClass: "text-5xl md:text-7xl" },
          { name: 'Exo 2', family: "'Exo 2', sans-serif" },
        ].map((font, i) => (
          <div key={i} className="text-center relative">
            <p className="text-xs uppercase tracking-[0.3em] text-ink-soft mb-4">{font.name}</p>
            <p 
              className={`text-3xl md:text-5xl text-ink leading-tight ${font.extraClass || ''}`}
              style={{ fontFamily: font.family }}
            >
              GRIFZ studio , A touch can change the world
            </p>
            {i !== 7 && <div className="w-1/2 h-[1px] bg-white/10 mx-auto mt-12"></div>}
          </div>
        ))}

        <div className="text-center mt-4">
          <p className="text-xs text-ink-soft italic">{t('lab_note')}</p>
        </div>
      </div>

      {/* ─── 3D Wireframe Sphere ─── */}
      <div className="mt-24 mb-12 flex flex-col items-center w-full">
        <WireframeSphere size={333} items={32} glow2="rgba(180, 180, 180, 0.25)" />
      </div>

    </section>
  )
}

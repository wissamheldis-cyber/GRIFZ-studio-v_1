export default function ComptePage() {
  return (
    <section className="min-h-[80vh] px-6 py-24 flex flex-col items-center justify-center">
      {/* Cadre animé avec le pattern de pluie */}
      <div className="relative w-full max-w-2xl aspect-[16/9] rounded-2xl overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.5)] border border-white/10">
        
        {/* Le fond de pluie géré par la classe universelle */}
        <div className="absolute inset-0 z-0 rain-pattern pointer-events-none"></div>
        
        {/* Overlay sombre pour assurer la lisibilité parfaite du texte blanc */}
        <div className="absolute inset-0 bg-black/20 z-[1]"></div>

        {/* Le contenu du cadre */}
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center p-8">
          <h1 className="font-serif text-4xl md:text-5xl mb-6 text-white tracking-wide">
            Compte Client
          </h1>
          <p className="text-white/70 text-lg max-w-md mx-auto font-light leading-relaxed">
            Votre espace confidentiel est actuellement en construction. Bientôt, la matière prendra forme.
          </p>
          
          <div className="mt-10 px-8 py-3 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-white/90 text-sm tracking-widest uppercase shadow-[0_0_30px_rgba(0,153,255,0.1)]">
            Accès Restreint
          </div>
        </div>
      </div>
    </section>
  )
}

'use client'

import { motion } from 'framer-motion'
import { GlassPanel } from '@/components/ui/GlassPanel'
import { GlassPill } from '@/components/ui/GlassPill'
import { ParallaxWrapper } from '@/components/ui/ParallaxWrapper'
import Orb from '@/components/ui/Orb'
import { Link } from '@/i18n/routing'
import { useTranslations, useLocale } from 'next-intl'
import Image from 'next/image'
import LiquidCard from '@/components/ui/LiquidCard'
import { ArticlesCarousel } from '@/components/ui/ArticlesCarousel'

export default function AboutPage() {
  const t = useTranslations('About')
  const locale = useLocale()
  const isEn = locale === 'en'

  const mockArticles = [
    { 
      id: 1, 
      title: isEn ? 'Digital Identity: Sculpting instead of Coding' : 'Identité Numérique : Sculpter au lieu de Coder', 
      coverPath: '/images/mascot_placeholder.png',
      image: '/images/mascot_placeholder.png',
      content: isEn ? (
        <>
          <p className="font-semibold text-ink text-lg mb-8">Digital presence is no longer a simple broadcasting channel, it has become the virtual extension of your brand's soul.</p>
          
          <h3 className="font-serif text-2xl text-ink mt-12 mb-4">1. The genesis of experience</h3>
          <p>At GRIFZ studio, we approach website creation not as simple code, but as the sculpting of living matter. Every pixel, every interaction is designed to reflect the very essence of what you represent. We forge experiences that leave a lasting impression and transform visitors into ambassadors.</p>
          <p>The era of static templates and rigid grids is over. The modern user demands to be transported, surprised, and emotionally engaged. This is where the concept of "Digital Presence Sculpted by Matter" comes in.</p>

          <h3 className="font-serif text-2xl text-ink mt-12 mb-4">2. From geometry to emotion</h3>
          <p>Technology alone is cold. It is design that breathes life into it. By using the complex mathematics behind WebGL, we manage to bend digital space. The refraction of light on our glass components is not a simple image, it is a real-time physical calculation that reacts to the movement of your mouse.</p>
          <p>This tactile, almost carnal interactivity is what separates an ordinary website from a premium brand experience.</p>

          <h3 className="font-serif text-2xl text-ink mt-12 mb-4">3. The rejection of industrialization</h3>
          <p>In a world where everything tends towards standardization and mass creation (classic CMS, page builders, standardized generative AI), we make the radical choice of craftsmanship. Each project is a playground where custom-made is the only rule.</p>
          <p>This requires time, precision, and rare technical expertise. But the result is clear: a visual signature impossible to reproduce or confuse with that of a competitor.</p>

          <h3 className="font-serif text-2xl text-ink mt-12 mb-4">4. The weight of matter</h3>
          <p>Glass (Glassmorphism), leather, charcoal, wood... Why use these physical terms to talk about pixels? Because our brain is programmed to react to the textures of nature. By imitating the physical behavior of these materials in a web browser, we trigger primary cognitive responses.</p>
          <p>The heaviness of a "Charcoal" panel, the delicacy of smoked "Glass". All this participates in extremely powerful non-verbal communication.</p>

          <h3 className="font-serif text-2xl text-ink mt-12 mb-4">5. Towards 360 evolution</h3>
          <p>Creating a showcase site is only the first step. The final goal is the 360 Digital Evolution. This means the brand must exist coherently across all its digital touchpoints. The website acts as the central sun of this solar system, radiating its quality and aesthetic codes to all your communication.</p>
          <p>This is the promise of GRIFZ studio: not to deliver a simple communication tool, but the absolute weapon of your digital domination.</p>

          <h3 className="font-serif text-2xl text-ink mt-12 mb-4">6. The choreography of pixels</h3>
          <p>Movement is the universal language of interaction. An abrupt transition breaks immersion, while a fluid animation, timed on a perfectly studied Bezier curve, guides the eye and the mind. At GRIFZ studio, every element that enters or leaves the screen follows a strict choreography.</p>
          <p>We spend hours tweaking the physics of our animations so they feel natural. A button doesn't just change color, it breathes, it sinks with realistic inertia. It is in this obsessive level of micro-details that true digital luxury resides.</p>

          <h3 className="font-serif text-2xl text-ink mt-12 mb-4">7. Visual acoustics</h3>
          <p>Although the web is primarily a visual medium, we design our interfaces with what we call "visual acoustics". Every interaction must resonate in the user's mind like a clear, pure sound. Spacing, typographic rhythm and contrast act as musical notes.</p>
          <p>A silent design is a dead design. Our interfaces whisper through subtle glowing halos, and speak loudly during parallax scrolls. The result is a digital symphony where nothing is left to chance.</p>

          <div className="w-full relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-xl mt-16 mb-12">
            <Image 
              src="/images/mascot_placeholder.png" 
              alt="Digital Immersion" 
              fill 
              className="object-cover"
              unoptimized
            />
            <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-sans text-white/50 tracking-widest uppercase text-sm">GRIFZ Vision</span>
            </div>
          </div>

          <div className="flex justify-center mt-12 pb-12">
            <Link 
              href="/realisations"
              className="group relative px-8 py-4 bg-ink text-white rounded-full overflow-hidden transition-all duration-500 hover:shadow-2xl hover:scale-105"
            >
              <span className="relative z-10 font-sans uppercase tracking-[0.15em] text-sm font-medium">Our works</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
            </Link>
          </div>
        </>
      ) : (
        <>
          <p className="font-semibold text-ink text-lg mb-8">La présence digitale n'est plus un simple canal de diffusion, elle est devenue l'extension virtuelle de l'âme de votre marque.</p>
          
          <h3 className="font-serif text-2xl text-ink mt-12 mb-4">1. La genèse de l'expérience</h3>
          <p>Chez GRIFZ studio, nous abordons la création de sites web non pas comme du simple code, mais comme la sculpture d'une matière vivante. Chaque pixel, chaque interaction est pensée pour refléter l'essence même de ce que vous représentez. Nous forgeons des expériences qui marquent les esprits et transforment les visiteurs en ambassadeurs.</p>
          <p>L'ère des templates statiques et des grilles rigides est révolue. L'utilisateur moderne demande à être transporté, surpris, et émotionnellement engagé. C'est ici qu'intervient la notion de "Digital Presence Sculpted by Matter".</p>

          <h3 className="font-serif text-2xl text-ink mt-12 mb-4">2. De la géométrie à l'émotion</h3>
          <p>La technologie seule est froide. C'est le design qui lui insuffle la vie. En utilisant les mathématiques complexes derrière WebGL, nous parvenons à courber l'espace numérique. La réfraction de la lumière sur nos composants en verre n'est pas une simple image, c'est un calcul physique en temps réel qui réagit au mouvement de votre souris.</p>
          <p>Cette interactivité tactile, presque charnelle, est ce qui sépare un site web ordinaire d'une expérience de marque premium.</p>

          <h3 className="font-serif text-2xl text-ink mt-12 mb-4">3. Le rejet de l'industrialisation</h3>
          <p>Dans un monde où tout tend vers l'uniformisation et la création de masse (les CMS classiques, les constructeurs de pages, l'IA générative standardisée), nous faisons le choix radical de l'artisanat. Chaque projet est un terrain de jeu où le sur-mesure est la seule règle.</p>
          <p>Cela demande du temps, de la précision, et une expertise technique rare. Mais le résultat est sans appel : une signature visuelle impossible à reproduire ou à confondre avec celle d'un concurrent.</p>

          <h3 className="font-serif text-2xl text-ink mt-12 mb-4">4. Le poids de la matière</h3>
          <p>Le verre (Glassmorphism), le cuir, le charbon, le bois... Pourquoi utiliser ces termes physiques pour parler de pixels ? Parce que notre cerveau est programmé pour réagir aux textures de la nature. En imitant le comportement physique de ces matériaux dans un navigateur web, nous déclenchons des réponses cognitives primaires.</p>
          <p>La lourdeur d'un panneau de "Charbon", la délicatesse d'un "Verre" fumé. Tout ceci participe à une communication non-verbale extrêmement puissante.</p>

          <h3 className="font-serif text-2xl text-ink mt-12 mb-4">5. Vers l'évolution 360</h3>
          <p>Créer un site vitrine n'est que la première étape. L'objectif final est la 360 Digital Evolution. Cela signifie que la marque doit exister de manière cohérente à travers tous ses points de contact numériques. Le site web agit comme le soleil central de ce système solaire, irradiant sa qualité et ses codes esthétiques vers l'ensemble de votre communication.</p>
          <p>C'est la promesse de GRIFZ studio : ne pas vous livrer un simple outil de communication, mais l'arme absolue de votre domination numérique.</p>

          <h3 className="font-serif text-2xl text-ink mt-12 mb-4">6. La chorégraphie des pixels</h3>
          <p>Le mouvement est le langage universel de l'interaction. Une transition abrupte brise l'immersion, tandis qu'une animation fluide, calée sur une courbe de Bézier parfaitement étudiée, guide l'œil et l'esprit. Chez GRIFZ studio, chaque élément qui entre ou sort de l'écran suit une chorégraphie stricte.</p>
          <p>Nous passons des heures à peaufiner la physique de nos animations pour qu'elles semblent naturelles. Un bouton ne se contente pas de changer de couleur, il respire, il s'enfonce avec une inertie réaliste. C'est dans ce niveau obsessionnel de micro-détails que réside le véritable luxe digital.</p>

          <h3 className="font-serif text-2xl text-ink mt-12 mb-4">7. L'acoustique visuelle</h3>
          <p>Bien que le web soit principalement un médium visuel, nous concevons nos interfaces avec ce que nous appelons une "acoustique visuelle". Chaque interaction doit résonner dans l'esprit de l'utilisateur comme un son clair et pur. L'espacement, le rythme typographique et le contraste agissent comme des notes de musique.</p>
          <p>Un design silencieux est un design mort. Nos interfaces murmurent à travers des halos lumineux subtils, et s'expriment à pleine voix lors des défilements parallaxe. Le résultat est une symphonie numérique où rien n'est laissé au hasard.</p>

          <div className="w-full relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-xl mt-16 mb-12">
            <Image 
              src="/images/mascot_placeholder.png" 
              alt="Immersion Digitale" 
              fill 
              className="object-cover"
              unoptimized
            />
            <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-sans text-white/50 tracking-widest uppercase text-sm">GRIFZ Vision</span>
            </div>
          </div>

          <div className="flex justify-center mt-12 pb-12">
            <Link 
              href="/realisations"
              className="group relative px-8 py-4 bg-ink text-white rounded-full overflow-hidden transition-all duration-500 hover:shadow-2xl hover:scale-105"
            >
              <span className="relative z-10 font-sans uppercase tracking-[0.15em] text-sm font-medium">Nos réalisations</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
            </Link>
          </div>
        </>
      )
    },
    { 
      id: 2, 
      title: isEn ? '3D Web: Breaking the screen' : 'Le Web 3D : Briser l\'écran', 
      coverPath: '/images/mascot_placeholder.png',
      image: '/images/mascot_placeholder.png',
      content: isEn ? (
        <>
          <p>Immersion is the new standard of premium user experience. Integrating real-time 3D via WebGL and Three.js breaks the barrier of the flat screen.</p>
          <p>We no longer design pages, but spatial environments where light, texture, and physics respond to user actions. This sensory approach creates an instant emotional connection between the digital product and its audience.</p>
        </>
      ) : (
        <>
          <p>L'immersion est la nouvelle norme de l'expérience utilisateur premium. L'intégration de la 3D en temps réel via WebGL et Three.js permet de briser la barrière de l'écran plat.</p>
          <p>Nous ne concevons plus des pages, mais des environnements spatiaux où la lumière, la texture et la physique répondent aux actions de l'utilisateur. Cette approche sensorielle crée un lien émotionnel instantané entre le produit digital et son public.</p>
        </>
      )
    },
    { 
      id: 3, 
      title: isEn ? 'Matter & Light' : 'Matière & Lumière', 
      coverPath: '/images/mascot_placeholder.png',
      image: '/images/mascot_placeholder.png',
      content: isEn ? (
        <>
          <p>Modern web design finds its inspiration in the physical world. Our interfaces are inspired by glass, metal, water, and light.</p>
          <p>By mastering shaders and real-time refraction, we manage to give weight, thickness, and warmth to digital elements. It is this marriage between the brutality of matter and the purity of code that defines the unique aesthetic of GRIFZ studio.</p>
        </>
      ) : (
        <>
          <p>Le design web moderne trouve son inspiration dans le monde physique. Nos interfaces s'inspirent du verre, du métal, de l'eau et de la lumière.</p>
          <p>En maîtrisant les shaders et la réfraction en temps réel, nous parvenons à donner un poids, une épaisseur et une chaleur aux éléments numériques. C'est ce mariage entre brutalité de la matière et pureté du code qui définit l'esthétique unique de GRIFZ studio.</p>
        </>
      )
    },
    { 
      id: 4, 
      title: isEn ? 'Performance serving Luxury' : 'La Performance au service du Luxe', 
      coverPath: '/images/mascot_placeholder.png',
      image: '/images/mascot_placeholder.png',
      content: isEn ? (
        <>
          <p>A premium experience requires flawless velocity. Behind every fluid 60-frames-per-second animation lies rigorous engineering.</p>
          <p>Using cutting-edge technologies like Next.js and Framer Motion allows us to orchestrate complex visual choreographies while maintaining imperceptible loading times and optimal SEO.</p>
        </>
      ) : (
        <>
          <p>Une expérience premium exige une vélocité sans faille. Derrière chaque animation fluide à 60 images par seconde se cache une ingénierie rigoureuse.</p>
          <p>L'utilisation de technologies de pointe comme Next.js et Framer Motion nous permet d'orchestrer des chorégraphies visuelles complexes tout en conservant des temps de chargement imperceptibles et un référencement optimal.</p>
        </>
      )
    },
    { 
      id: 5, 
      title: isEn ? 'Studio Vision' : 'Vision Studio', 
      coverPath: '/images/mascot_placeholder.png',
      image: '/images/mascot_placeholder.png',
      content: isEn ? (
        <>
          <p>Digital craftsmanship is our fundamental philosophy. We refuse prefabricated templates and the industrialization of design.</p>
          <p>Every project that leaves the studio is treated as a unique, hand-sculpted piece. Our methodology merges avant-garde design and software engineering to create platforms that transcend the usual standards of the Internet.</p>
        </>
      ) : (
        <>
          <p>L'artisanat digital est notre philosophie fondamentale. Nous refusons les templates préfabriqués et l'industrialisation du design.</p>
          <p>Chaque projet qui sort du studio est traité comme une pièce unique, sculptée à la main. Notre méthodologie fusionne le design avant-gardiste et l'ingénierie logicielle pour donner naissance à des plateformes qui transcendent les standards habituels d'Internet.</p>
        </>
      )
    },
  ]

  return (
    <main className="min-h-screen pt-40 pb-[400px] flex flex-col items-center relative overflow-hidden">
      
      {/* Container principal */}
      <div className="w-full max-w-4xl mx-auto px-6 flex flex-col items-center gap-16 relative z-10">
        
        {/* Titre & Vision */}
        <div className="text-center max-w-2xl flex flex-col items-center gap-6">
          <motion.h1 
            className="font-serif text-4xl md:text-5xl text-ink"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {t('title')}
          </motion.h1>
          <motion.p 
            className="text-base md:text-lg text-ink-soft font-light"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {t('intro')}
          </motion.p>
        </div>

        {/* Grille de Blocs (Vision, Méthode, Convictions) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          
          <ParallaxWrapper offset={30} direction="up">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <GlassPanel className="p-12 md:p-14 h-full flex flex-col gap-6">
              <h3 className="font-sans text-[11px] uppercase tracking-[0.15em] text-muted font-medium">{t('block1_label')}</h3>
              <h2 className="font-serif text-2xl text-ink">{t('block1_title')}</h2>
              <p className="text-sm text-ink-soft leading-relaxed font-light mt-auto pt-4">
                {t('block1_text')}
              </p>
            </GlassPanel>
          </motion.div>
          </ParallaxWrapper>

          <ParallaxWrapper offset={50} direction="up">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <GlassPanel className="p-12 md:p-14 h-full flex flex-col gap-6">
              <h3 className="font-sans text-[11px] uppercase tracking-[0.15em] text-muted font-medium">{t('block2_label')}</h3>
              <h2 className="font-serif text-2xl text-ink">{t('block2_title')}</h2>
              <p className="text-sm text-ink-soft leading-relaxed font-light mt-auto pt-4">
                {t('block2_text')}
              </p>
            </GlassPanel>
          </motion.div>
          </ParallaxWrapper>

          <ParallaxWrapper offset={20} direction="up" className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="h-full"
            >
              <GlassPanel strong className="p-12 md:p-16 h-full flex flex-col md:flex-row gap-10 items-center md:items-start text-center md:text-left border-ink/5">
              <div className="flex-1 flex flex-col gap-4">
                <h3 className="font-sans text-[11px] uppercase tracking-[0.15em] text-ink font-medium">{t('block3_label')}</h3>
                <h2 className="font-serif text-2xl md:text-3xl text-ink">{t('block3_title')}</h2>
                <p className="text-sm md:text-base text-ink-soft leading-relaxed font-light mt-2">
                  {t('block3_text')}
                </p>
              </div>
              <div className="w-32 h-32 flex-shrink-0 relative pointer-events-none opacity-50">
                <Orb material="verre" size={150} animated={true} intensity={0.1} />
              </div>
              </GlassPanel>
            </motion.div>
          </ParallaxWrapper>

        </div>

      </div>

      {/* BLOC D'ESPACEMENT MAJEUR */}
      <div className="h-40 md:h-80 w-full" />

      {/* ─── CARROUSEL D'ARTICLES ───────────────────────────────────── */}
      <div className="w-full max-w-6xl mx-auto px-4 relative z-10 flex flex-col items-center">
        <div className="text-center mb-8">
          <h2 className="font-serif text-3xl md:text-4xl text-ink">{isEn ? 'Articles' : 'Articles'}</h2>
          <p className="text-ink-soft text-sm mt-2 uppercase tracking-widest">{isEn ? 'Coming soon' : 'À lire prochainement'}</p>
        </div>
        <ArticlesCarousel articles={mockArticles} />
      </div>

      {/* ─── TEASER MASCOTTE ───────────────────────────────────── */}
      <div className="w-full max-w-5xl mx-auto px-6 mt-[200px] md:mt-[300px] z-10 relative">
        <div 
          className="relative w-full shadow-2xl"
          style={{
            borderRadius: '24px',
            padding: '1px',
            background: 'radial-gradient(circle 800px at 0% 0%, rgba(255,255,255,0.8), #0c0d0d)',
          }}
        >
          <div 
            className="relative w-full overflow-hidden flex flex-col md:flex-row gap-10 items-center md:items-start text-center md:text-left"
            style={{
              borderRadius: '23px',
              border: '1px solid #202222',
              background: 'radial-gradient(circle 1000px at 0% 0%, #222222, #0c0d0d)',
              padding: '64px',
            }}
          >
            {/* Lignes internes fixes — cadre de respiration */}
            <div className="absolute pointer-events-none z-10" style={{ top: '32px', left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, #888888 30%, #1d1f1f 70%)' }} />
            <div className="absolute pointer-events-none z-10" style={{ bottom: '32px', left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, #2c2c2c 30%, #1d1f1f 70%)' }} />
            <div className="absolute pointer-events-none z-10" style={{ left: '32px', top: 0, bottom: 0, width: '1px', background: 'linear-gradient(180deg, #747474 30%, #222424 70%)' }} />
            <div className="absolute pointer-events-none z-10" style={{ right: '32px', top: 0, bottom: 0, width: '1px', background: 'linear-gradient(180deg, #2c2c2c 30%, #222424 70%)' }} />

            {/* Partie Gauche : Textes */}
            <div className="flex-1 flex flex-col gap-4 items-center md:items-start relative z-20">
              <h3 className="font-sans text-[11px] uppercase tracking-[0.15em] text-white/50 font-medium">Coming soon</h3>
              <h2 className="font-serif text-3xl md:text-4xl text-white leading-tight">
                {t('teaser_title_1')}<br/>{t('teaser_title_2')}
              </h2>
              <p className="text-sm md:text-base text-white/70 leading-relaxed font-light mt-2 uppercase tracking-widest">
                {t('teaser_text_1')} {t('teaser_text_2')}
              </p>
            </div>

            {/* Partie Droite : Image Invisible Container */}
            <div className="w-64 h-64 md:w-80 md:h-80 relative flex-shrink-0 bg-transparent flex items-center justify-center z-20">
              <div className="relative w-full h-full transform hover:scale-105 transition-transform duration-700 ease-in-out">
                <Image 
                  src="/images/mascot_placeholder.png" 
                  alt="Mascot Placeholder" 
                  fill 
                  className="object-contain opacity-80 filter drop-shadow-[0_10px_20px_rgba(255,255,255,0.05)]"
                  unoptimized
                />
              </div>
            </div>
          </div>
        </div>
      </div>


    </main>
  )
}

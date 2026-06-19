'use client'

import { motion } from 'framer-motion'
import { GlassPanel } from '@/components/ui/GlassPanel'
import { GlassPill } from '@/components/ui/GlassPill'
import { ParallaxWrapper } from '@/components/ui/ParallaxWrapper'
import Orb from '@/components/ui/Orb'
import { Link } from '@/i18n/routing'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import LiquidCard from '@/components/ui/LiquidCard'
import { ArticlesCarousel } from '@/components/ui/ArticlesCarousel'

export default function AboutPage() {
  const t = useTranslations('About')

  const mockArticles = [
    { 
      id: 1, 
      title: 'Identité Numérique : Sculpter au lieu de Coder', 
      coverPath: '/images/mascot_placeholder.png',
      image: '/images/mascot_placeholder.png',
      content: (
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
        </>
      )
    },
    { 
      id: 2, 
      title: 'Le Web 3D : Briser l\'écran', 
      coverPath: '/images/mascot_placeholder.png',
      image: '/images/mascot_placeholder.png',
      content: (
        <>
          <p>L'immersion est la nouvelle norme de l'expérience utilisateur premium. L'intégration de la 3D en temps réel via WebGL et Three.js permet de briser la barrière de l'écran plat.</p>
          <p>Nous ne concevons plus des pages, mais des environnements spatiaux où la lumière, la texture et la physique répondent aux actions de l'utilisateur. Cette approche sensorielle crée un lien émotionnel instantané entre le produit digital et son public.</p>
        </>
      )
    },
    { 
      id: 3, 
      title: 'Matière & Lumière', 
      coverPath: '/images/mascot_placeholder.png',
      image: '/images/mascot_placeholder.png',
      content: (
        <>
          <p>Le design web moderne trouve son inspiration dans le monde physique. Nos interfaces s'inspirent du verre, du métal, de l'eau et de la lumière.</p>
          <p>En maîtrisant les shaders et la réfraction en temps réel, nous parvenons à donner un poids, une épaisseur et une chaleur aux éléments numériques. C'est ce mariage entre brutalité de la matière et pureté du code qui définit l'esthétique unique de GRIFZ studio.</p>
        </>
      )
    },
    { 
      id: 4, 
      title: 'La Performance au service du Luxe', 
      coverPath: '/images/mascot_placeholder.png',
      image: '/images/mascot_placeholder.png',
      content: (
        <>
          <p>Une expérience premium exige une vélocité sans faille. Derrière chaque animation fluide à 60 images par seconde se cache une ingénierie rigoureuse.</p>
          <p>L'utilisation de technologies de pointe comme Next.js et Framer Motion nous permet d'orchestrer des chorégraphies visuelles complexes tout en conservant des temps de chargement imperceptibles et un référencement optimal.</p>
        </>
      )
    },
    { 
      id: 5, 
      title: 'Vision Studio', 
      coverPath: '/images/mascot_placeholder.png',
      image: '/images/mascot_placeholder.png',
      content: (
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

      {/* ─── TEASER MASCOTTE (Mêmes specs que Le choix de la matière) ───────────────────────────────────── */}
      <div className="w-full max-w-5xl mx-auto px-6 mt-64 mb-64 z-10 relative">
        <GlassPanel strong className="p-12 md:p-16 flex flex-col md:flex-row gap-10 items-center md:items-start text-center md:text-left border-ink/5">
          {/* Partie Gauche : Textes */}
          <div className="flex-1 flex flex-col gap-4 items-center md:items-start">
            <h3 className="font-sans text-[11px] uppercase tracking-[0.15em] text-ink font-medium">Coming soon</h3>
            <h2 className="font-serif text-3xl md:text-4xl text-ink leading-tight">
              {t('teaser_title_1')}<br/>{t('teaser_title_2')}
            </h2>
            <p className="text-sm md:text-base text-ink-soft leading-relaxed font-light mt-2 uppercase tracking-widest">
              {t('teaser_text_1')} {t('teaser_text_2')}
            </p>
          </div>

          {/* Partie Droite : Image Invisible Container */}
          <div className="w-64 h-64 md:w-80 md:h-80 relative flex-shrink-0 bg-transparent flex items-center justify-center">
            <div className="relative w-full h-full transform hover:scale-105 transition-transform duration-700 ease-in-out">
              {/* L'image PNG au fond transparent s'insérera ici sans fond propre */}
              <Image 
                src="/images/mascot_placeholder.png" 
                alt="Mascot Placeholder" 
                fill 
                className="object-contain opacity-80"
                unoptimized
              />
            </div>
          </div>
        </GlassPanel>
      </div>

      {/* ─── CARROUSEL D'ARTICLES ───────────────────────────────────── */}
      <div className="w-full max-w-6xl mx-auto px-4 mt-20 mb-32 relative z-10 flex flex-col items-center">
        <div className="text-center mb-8">
          <h2 className="font-serif text-3xl md:text-4xl text-ink">Articles</h2>
          <p className="text-ink-soft text-sm mt-2 uppercase tracking-widest">À lire prochainement</p>
        </div>
        <ArticlesCarousel articles={mockArticles} />
      </div>

    </main>
  )
}

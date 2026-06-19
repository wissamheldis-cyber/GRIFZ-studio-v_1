export type ProjectCategory = 'Identité' | 'Site web' | 'Direction artistique' | 'Contenu' | 'Concept interne';
export type MaterialTheme = 'charbon' | 'cuivre' | 'emeraude' | 'bois-de-cerisier' | 'cuir' | 'verre' | 'grifz';

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  material: MaterialTheme;
  isConceptual: boolean;
  problem: string;
  solution: string;
  deliverables: string[];
  logoPath?: string;
  coverPath: string;
  galleryPaths: string[];
}

export const projects: Project[] = [
  {
    id: 'uohs',
    title: 'U.O.H.S',
    category: 'Concept interne',
    material: 'charbon',
    isConceptual: true,
    problem: 'Créer une identité forte, ancrée dans un univers texturé et mystérieux, pour un concept institutionnel fictif.',
    solution: 'Développement d\'une iconographie riche et sombre, exploitant des matières brutes et un design éditorial sophistiqué.',
    deliverables: ['Direction Artistique', 'Création de Logo', 'Recherche Iconographique'],
    logoPath: '/works realisations/U.O.H.S/logo/logo uohs.png',
    coverPath: '/works realisations/U.O.H.S/cover.png',
    galleryPaths: [
      '/works realisations/U.O.H.S/4.png',
      '/works realisations/U.O.H.S/7.png',
      '/works realisations/U.O.H.S/9.png'
    ]
  },
  {
    id: 'redthorn',
    title: 'Redthorn',
    category: 'Concept interne',
    material: 'cuir',
    isConceptual: true,
    problem: 'Explorer les limites de la direction artistique autour d\'une esthétique organique et luxueuse.',
    solution: 'Création d\'un branding complet intégrant des textures de cuir et des teintes chaudes, évoquant un héritage intemporel.',
    deliverables: ['Logotype', 'Concept Brand', 'Imagerie IA'],
    logoPath: '/works realisations/Redthorn/logo/logo redthorne.png',
    coverPath: '/works realisations/Redthorn/cover.png',
    galleryPaths: [] // La cover suffit ici
  },
  {
    id: 'shou-games',
    title: 'SHOU games tv',
    category: 'Contenu',
    material: 'emeraude',
    isConceptual: true,
    problem: 'Imaginer un univers visuel pour du contenu gaming alliant élégance et dynamisme.',
    solution: 'Un système visuel basé sur l\'émeraude, avec des contrastes profonds et des typographies lisibles pour les miniatures et le contenu.',
    deliverables: ['Direction Visuelle', 'Vignettes', 'Logotype'],
    logoPath: '/works realisations/SHOU games tv/logo/logo.png',
    coverPath: '/works realisations/SHOU games tv/cover.png',
    galleryPaths: [
      '/works realisations/SHOU games tv/il_est_tracté_202604050706.png',
      '/works realisations/SHOU games tv/Le_camp_parait_202604051026.png'
    ]
  },
  {
    id: 'shou-edition',
    title: 'SHOU edition',
    category: 'Direction artistique',
    material: 'verre',
    isConceptual: true,
    problem: 'Concevoir l\'identité visuelle d\'une maison d\'édition au positionnement premium et épuré.',
    solution: 'Utilisation de l\'esthétique du verre, jouant sur la transparence, les espaces blancs et une typographie minimale.',
    deliverables: ['Identité de marque', 'Maquettes éditoriales'],
    logoPath: '/works realisations/SHOU edition/logo/logo.png',
    coverPath: '/works realisations/SHOU edition/am articles.png',
    galleryPaths: []
  },
  /* {
    id: 'pick-a-trip',
    title: 'Pick a trip',
    category: 'Direction artistique',
    material: 'cuivre',
    isConceptual: true,
    problem: 'Redéfinir la découverte visuelle dans le domaine du voyage à travers une UI moderne.',
    solution: 'Une direction artistique chaleureuse (cuivre) et immersive, mettant en avant la photographie et le storytelling.',
    deliverables: ['UI/UX Design', 'Composants visuels'],
    logoPath: undefined,
    coverPath: '/works realisations/Pick a trip/19.png',
    galleryPaths: [
      '/works realisations/Pick a trip/20.png',
      '/works realisations/Pick a trip/21.png',
      '/works realisations/Pick a trip/22.png',
      '/works realisations/Pick a trip/23.png',
      '/works realisations/Pick a trip/24.png'
    ]
  }, */
  {
    id: 'heynouth',
    title: 'Heynouth',
    category: 'Identité',
    material: 'grifz',
    isConceptual: true,
    problem: 'Créer un marquage fort et reconnaissable pour une entité créative.',
    solution: 'Design d\'un logotype impactant accompagné d\'une icône moderne pour les supports digitaux.',
    deliverables: ['Logo', 'Brand Guidelines', 'Favicon'],
    logoPath: '/works realisations/Heynouth/logo/logo.png',
    coverPath: '/works realisations/Heynouth/cover.png',
    galleryPaths: ['/works realisations/Heynouth/logo/apple-touch-icon.png']
  },
  {
    id: 'dangushop',
    title: 'DANGUSHOP - Benzen',
    category: 'Site web',
    material: 'bois-de-cerisier',
    isConceptual: true,
    problem: 'Imaginer une plateforme e-commerce fusionnant luxe et approche organique.',
    solution: 'Création d\'une interface épurée avec des textures subtiles évoquant le bois de cerisier pour une navigation apaisante.',
    deliverables: ['Maquettes Web', 'Identité E-commerce'],
    logoPath: '/works realisations/DANGUSHOP - Benzen/logo/marque dangushop.png',
    coverPath: '/works realisations/DANGUSHOP - Benzen/cover.png',
    galleryPaths: []
  },
  {
    id: 'dag-data',
    title: 'DAG DATA',
    category: 'Concept interne',
    material: 'verre',
    isConceptual: true,
    problem: 'Visualiser la donnée de manière esthétique, technique et architecturale.',
    solution: 'Une série de visuels 4K exploitant les reflets du verre et des structures géométriques complexes.',
    deliverables: ['Modélisation 3D', 'Rendus 4K', 'Direction technique'],
    logoPath: '/works realisations/DAG DATA/logo/logo.png',
    coverPath: '/works realisations/DAG DATA/cover.png',
    galleryPaths: ['/works realisations/DAG DATA/DAG DATA VISUALS04_4K.png']
  },
  {
    id: 'alert-eleves',
    title: 'Alert Eleves',
    category: 'Concept interne',
    material: 'charbon',
    isConceptual: true,
    problem: 'Illustrer un système de notification d\'urgence avec une interface sérieuse et contrastée.',
    solution: 'Une direction sombre (charbon) accentuée par des éléments signalétiques forts.',
    deliverables: ['UI Concept', 'Iconographie'],
    logoPath: '/works realisations/Alert Eleves/logo/logo.png',
    coverPath: '/works realisations/Alert Eleves/cover.png',
    galleryPaths: ['/works realisations/Alert Eleves/cover 2.png']
  }
];

import { ProjectCategory, MaterialTheme, Project } from './projectsDataTypes';

export type { ProjectCategory, MaterialTheme, Project };

export const projects: Project[] = [
  {
    id: 'uohs',
    title: 'U.O.H.S',
    category: 'Concept interne',
    material: 'charbon',
    rainColor: '#d2c8bc',
    isConceptual: true,
    problem: 'Création d\'images & vidéos',
    solution: 'Pour U.O.H.S, GRIFZ Studio a accompagné la construction de l\'univers visuel à travers la création d\'images et de vidéos. L\'objectif était de donner corps aux artistes, aux ambiances et aux concepts musicaux à travers une direction visuelle forte, immersive et exploitable.',
    deliverables: ['Création d\'images', 'Création de vidéos', 'Direction visuelle', 'Mise en scène des univers artistiques', 'Supports visuels pour artistes et projets musicaux'],
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
    rainColor: '#e60000',
    isConceptual: true,
    problem: 'Prévisualisation digitale & base d\'identité visuelle',
    solution: 'Redthorn représente une intervention de prévisualisation. GRIFZ Studio a créé une première base digitale permettant de visualiser rapidement la direction possible du projet : site simple, première ambiance visuelle, début d\'identité et structure de présentation.',
    deliverables: ['Prévisualisation digitale', 'Site web simple', 'Début d\'identité visuelle', 'Première direction artistique', 'Base graphique exploitable'],
    logoPath: '/works realisations/Redthorn/logo/logo redthorndde.png',
    coverPath: '/works realisations/Redthorn/cover.png',
    galleryPaths: []
  },
  {
    id: 'shou-games',
    title: 'SHOU games tv',
    category: 'Contenu',
    material: 'emeraude',
    rainColor: '#d4af37',
    isConceptual: true,
    problem: 'Création d\'images, visuels & vidéos',
    solution: 'GRIFZ Studio est intervenu sur SHOU games tv à travers la création de contenus visuels. Le travail porte principalement sur la génération d\'images, la création de visuels et la production de vidéos destinées à donner une identité plus forte au projet.',
    deliverables: ['Création d\'images', 'Création de vidéos', 'Visuels de présentation', 'Direction graphique des contenus'],
    logoPath: '/works realisations/SHOU games tv/logo/logo.png',
    coverPath: '/works realisations/SHOU games tv/cover.png',
    galleryPaths: [
      '/works realisations/SHOU games tv/il_est_tracté_202604050706.png',
      '/works realisations/SHOU games tv/enleve_la_cicatrice_202604050658.png'
    ]
  },
  {
    id: 'shou-edition',
    title: 'SHOU edition',
    category: 'Direction artistique',
    material: 'verre',
    rainColor: '#d4af37',
    isConceptual: true,
    problem: 'Identité visuelle, logo, UX/UI & site web',
    solution: 'GRIFZ Studio a contribué à structurer l\'image digitale de SHOU edition à travers une direction artistique complète. Le travail inclut l\'identité visuelle, le logo, l\'UX/UI et la construction du site web, avec l\'objectif de rendre une méthode complexe plus lisible, plus sérieuse et plus présentable.',
    deliverables: ['Direction artistique', 'Logo', 'Identité visuelle', 'UX/UI design', 'Construction du site web', 'Architecture visuelle du projet'],
    logoPath: '/works realisations/SHOU edition/logo/logo.png',
    coverPath: '/works realisations/SHOU edition/am articles.png',
    galleryPaths: []
  },
  {
    id: 'heynouth',
    title: 'Heynouth',
    category: 'Identité',
    material: 'grifz',
    rainColor: '#04d960',
    isConceptual: true,
    problem: 'Identité visuelle, logo, UX/UI & site web',
    solution: 'Pour Heynouth, GRIFZ Studio a posé les bases d\'un univers digital clair et reconnaissable. Le travail s\'est concentré sur la direction artistique, l\'identité visuelle, le logo, l\'interface et la construction du site web afin de rendre le concept plus compréhensible et plus attractif.',
    deliverables: ['Direction artistique', 'Logo', 'Identité visuelle', 'UX/UI design', 'Construction du site web', 'Clarification du concept'],
    logoPath: '/works realisations/Heynouth/logo/logo.png',
    coverPath: '/works realisations/Heynouth/cover.png',
    galleryPaths: []
  },
  {
    id: 'dangushop',
    title: 'DANGUSHOP - Benzen',
    category: 'Site web',
    material: 'charbon',
    rainColor: '#2b2b2b',
    isConceptual: false,
    problem: 'Identité visuelle, logo, UX/UI & site web',
    solution: 'GRIFZ Studio a travaillé sur l\'image digitale de Dangusho.p afin de construire une présence plus professionnelle, plus cohérente et plus orientée conversion. L\'intervention couvre la direction artistique, l\'identité visuelle, le logo, l\'UX/UI et la construction du site web.',
    deliverables: ['Direction artistique', 'Logo', 'Identité visuelle', 'UX/UI design', 'Construction du site web', 'Mise en valeur de l\'offre'],
    logoPath: '/works realisations/DANGUSHOP - Benzen/logo/marque dangushop.png',
    coverPath: '/works realisations/DANGUSHOP - Benzen/cover.png',
    galleryPaths: [
      '/works realisations/DANGUSHOP - Benzen/de.png'
    ]
  },
  {
    id: 'dag-data',
    title: 'DAG DATA',
    category: 'Identité',
    material: 'cuivre',
    rainColor: '#c0c0c0',
    isConceptual: false,
    problem: 'Identité visuelle, logo, UX/UI & site web',
    solution: 'GRIFZ Studio a accompagné DAG DATA dans la construction de son univers visuel complet. Le travail a porté sur la direction artistique, la création du logo, l\'identité visuelle, ainsi que la conception UX/UI du site web. L\'objectif était de transformer un projet complexe en une interface plus lisible, plus premium et plus accessible.',
    deliverables: ['Direction artistique', 'Logo', 'Identité visuelle', 'UX/UI design', 'Construction du site web', 'Structuration de l\'expérience utilisateur'],
    logoPath: '/works realisations/DAG DATA/logo/logo.png',
    coverPath: '/works realisations/DAG DATA/cover.png',
    galleryPaths: []
  },
  {
    id: 'alert-eleves',
    title: 'Alert Élèves',
    category: 'Site web',
    material: 'grifz',
    rainColor: 'rainbow',
    isConceptual: false,
    problem: 'Direction artistique & création de visuels',
    solution: 'GRIFZ Studio est intervenu sur la direction artistique du projet Alert Élèves afin de lui donner une présence plus claire, plus crédible et plus identifiable. Le travail s\'est concentré sur la création de visuels, l\'ambiance graphique et la cohérence esthétique globale du projet.',
    deliverables: ['Direction artistique', 'Création de visuels', 'Cohérence graphique', 'Mise en forme visuelle du projet'],
    logoPath: '/works realisations/Alert Eleves/logo/logo.png',
    coverPath: '/works realisations/Alert Eleves/cover.png',
    galleryPaths: []
  }
];

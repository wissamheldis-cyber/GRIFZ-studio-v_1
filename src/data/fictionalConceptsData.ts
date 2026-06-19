export interface FictionalConcept {
  id: string;
  brandName: string;
  materials: string[];
  coverPath: string;
  galleryPaths: string[];
  rainColor?: string;
  logoPath?: string;
}

export const fictionalConcepts: FictionalConcept[] = [
  {
    id: 'tesla',
    brandName: 'TESLA',
    materials: ['Aluminium', 'Cuivre', 'Graphite', 'Lithium'],
    coverPath: '/materials paysage + palette matiere/Cuivre/GRIFZ x TESLA02_4K.png',
    galleryPaths: [
      '/materials paysage + palette matiere/Cuivre/GRIFZ x TESLA05_4K.png',
      '/materials paysage + palette matiere/Aluminium/GRIFZ x TESLA18_4K.png',
      '/materials paysage + palette matiere/Graphite/GRIFZ x TESLA24_4K.png',
      '/materials paysage + palette matiere/Lithium/GRIFZ x TESLA25_4K.png'
    ],
    rainColor: '#b87333' ,
    logoPath: '/works/logo brands/tesla.png'// Cuivre
  },
  {
    id: 'apple',
    brandName: 'APPLE',
    materials: ['Gallium', 'Tungstène'],
    coverPath: '/materials paysage + palette matiere/Gallium/GRIFZ x APPLE11_4K.png',
    galleryPaths: [
      '/materials paysage + palette matiere/Gallium/GRIFZ x APPLE14_4K.png',
      '/materials paysage + palette matiere/Tungstene/GRIFZ x APPLE17_4K.png',
      '/materials paysage + palette matiere/Tungstene/GRIFZ x APPLE18_4K.png'
    ],
    rainColor: '#d3d3d3' ,
    logoPath: '/works/logo brands/apple.png'// Gris métal/Gallium
  },
  {
    id: 'lvmh',
    brandName: 'LVMH',
    materials: ['Cuir Classic', 'Cuir Rouge', 'Cuir Vert', 'Cuir Beige'],
    coverPath: '/materials paysage + palette matiere/Cuir ( variantes )/GRIFZ x LVMH02_4K.png',
    galleryPaths: [
      '/materials paysage + palette matiere/Cuir ( variantes )/Cuir Rouge/GRIFZ x LVMH06_4K.png',
      '/materials paysage + palette matiere/Cuir ( variantes )/Cuir vert/GRIFZ x LVMH07_4K.png',
      '/materials paysage + palette matiere/Cuir ( variantes )/Cuire beige/GRIFZ x LVMH08_4K.png'
    ],
    rainColor: '#8b4513' ,
    logoPath: '/works/logo brands/LVMH.png'// Cuir SaddleBrown
  },
  {
    id: 'toyota',
    brandName: 'TOYOTA',
    materials: ['Charbon', 'Chrome', 'Palladium'],
    coverPath: '/materials paysage + palette matiere/Charbon/GRIFZ x TOYOTA08_4K.png',
    galleryPaths: [
      '/materials paysage + palette matiere/Palladium/GRIFZ x TOYOTA19_4K.png',
      '/materials paysage + palette matiere/Chrome/GRIFZ x TOYOTA24_4K.png'
    ],
    rainColor: '#36454f' ,
    logoPath: '/works/logo brands/toyota.png'// Charbon
  },
  {
    id: 'samsung',
    brandName: 'SAMSUNG',
    materials: ['Indium'],
    coverPath: '/materials paysage + palette matiere/Indium/GRIFZ x SAMSUNG01_4K.png',
    galleryPaths: [
      '/materials paysage + palette matiere/Indium/GRIFZ x SAMSUNG02_4K.png',
      '/materials paysage + palette matiere/Indium/GRIFZ x SAMSUNG03_4K.png',
      '/materials paysage + palette matiere/Indium/GRIFZ x SAMSUNG04_4K.png',
      '/materials paysage + palette matiere/Indium/GRIFZ x SAMSUNG05_4K.png',
      '/materials paysage + palette matiere/Indium/GRIFZ x SAMSUNG06_4K.png'
    ],
    rainColor: '#0057b7' ,
    logoPath: '/works/logo brands/Samsung.png'// Samsung Blue (Indium ref)
  },
  {
    id: 'pepsico',
    brandName: 'PEPSI',
    materials: ['Céréales'],
    coverPath: '/materials paysage + palette matiere/Cereales/GRIFZ x PEPSI.co04_4K.png',
    galleryPaths: [],
    rainColor: '#e5ca9a' ,
    logoPath: '/works/logo brands/pepsi.png'// Céréales
  },
  {
    id: 'coca-cola',
    brandName: 'COCA COLA',
    materials: ['PET'],
    coverPath: '/materials paysage + palette matiere/PET/GRIFZ x COCA COLA04_4K.png',
    galleryPaths: [],
    rainColor: '#ff0000' ,
    logoPath: '/works/logo brands/cocacola.png'// Rouge
  },
  {
    id: 'michelin',
    brandName: 'MICHELIN',
    materials: ['Caoutchouc naturel'],
    coverPath: '/materials paysage + palette matiere/Caoutchouc naturel/GRIFZ x MICHELIN03_4K.png',
    galleryPaths: [],
    rainColor: '#2b2b2b' ,
    logoPath: '/works/logo brands/michelin.png'// Caoutchouc
  },
  {
    id: 'ikea',
    brandName: 'IKEA',
    materials: ['Bois'],
    coverPath: '/materials paysage + palette matiere/Bois/GRIFZ x IKEA02_4K.png',
    galleryPaths: [],
    rainColor: '#deb887' ,
    logoPath: '/works/logo brands/ikea.png'// Bois
  },
  {
    id: 'zara',
    brandName: 'ZARA',
    materials: ['Coton'],
    coverPath: '/materials paysage + palette matiere/Coton/GRIFZ x ZARA04_4K.png',
    galleryPaths: [],
    rainColor: '#ffffff' ,
    logoPath: '/works/logo brands/zara.png'// Coton
  },
  {
    id: 'leroy-merlin',
    brandName: 'LEROY MERLIN',
    materials: ['PVC'],
    coverPath: '/materials paysage + palette matiere/PVC/GRIFZ x LEROY MERLIN03_4K.png',
    galleryPaths: [],
    rainColor: '#7db928' ,
    logoPath: '/works/logo brands/leroy merlin.png'// Vert Leroy Merlin
  },
  {
    id: 'boeing',
    brandName: 'BOEING',
    materials: ['Titane'],
    coverPath: '/materials paysage + palette matiere/Titane/GRIFZ x BOEING02_4K.png',
    galleryPaths: [],
    rainColor: '#878681' ,
    logoPath: '/works/logo brands/boeing.png'// Titane
  }
];

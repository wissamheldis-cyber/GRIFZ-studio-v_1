export type ProjectCategory = 'Identité' | 'Site web' | 'Direction artistique' | 'Contenu' | 'Concept interne';
export type MaterialTheme = 'charbon' | 'cuivre' | 'emeraude' | 'bois-de-cerisier' | 'cuir' | 'verre' | 'grifz';

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  material: MaterialTheme;
  rainColor?: string;
  isConceptual: boolean;
  problem: string;
  solution: string;
  deliverables: string[];
  logoPath?: string;
  coverPath: string;
  galleryPaths: string[];
}

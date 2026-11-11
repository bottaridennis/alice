export type PageType = 'portfolio' | 'curriculum';

export type FilterCategory = 'Editorial Design' | 'Poster Design' | 'Brand & Visual Identity' | 'Typography & Lettering';

export interface Project {
  id: string;
  title: string;
  category: string;
  categories: FilterCategory[];
  categorySlug?: string;
  tags?: string[];
  year?: string;
  client?: string;
  role?: string;
  summary?: string;
  description: string;
  cover?: string;
  coverImage: string;
  pdf?: string | null;
  galleryImages?: string[];
  specs?: {
    format?: string;
    paperStock?: string;
    printTechnique?: string;
    finishes?: string;
  };
  typography?: string;
  palette?: string[];
  featured?: boolean;
  sizeSpan?: 'tall' | 'wide' | 'large' | 'regular';
}

export interface Experience {
  id: string;
  period: string;
  company: string;
  role: string;
  location: string;
  description: string;
  keyActivities: string[];
  tags: string[];
}

export interface Education {
  id: string;
  period: string;
  school: string;
  degree: string;
  specialization?: string;
  location: string;
  details?: string;
}

export interface SkillCategory {
  title: string;
  description: string;
  items: string[];
}

export interface SoftwareTool {
  name: string;
  category: string;
}

export interface Language {
  name: string;
  /** livello come riportato nel CV */
  level: string;
  /** livello QCER (A1–C2), assente per la madrelingua */
  cefr?: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
}

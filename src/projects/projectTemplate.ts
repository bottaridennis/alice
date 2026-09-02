import { Project } from '../types';

/**
 * Modello / Template per un nuovo progetto di Alice Mele.
 * Puoi duplicare questo modello per aggiungere facilmente nuovi progetti.
 */
export const projectTemplate: Project = {
  id: 'nome-univoco-progetto',
  title: 'Titolo del Progetto',
  category: 'Categoria descrittiva completa (es. Editorial Design / Magazine Design)',
  // Macro-categorie per i filtri del portfolio:
  // 'Editorial Design' | 'Poster Design' | 'Brand & Visual Identity' | 'Typography & Lettering'
  categories: ['Editorial Design'],
  categorySlug: 'editorial-design',
  tags: ['Editorial Design', 'Tipografia', 'Stampa', 'Layout'],
  description: 'Descrizione completa ufficiale del progetto.',
  summary: 'Breve sintesi del concept.',
  cover: '/projects/nome-univoco-progetto/cover.jpg',
  coverImage: '/projects/nome-univoco-progetto/cover.jpg',
  pdf: '/projects/nome-univoco-progetto/project.pdf',
  galleryImages: ['/projects/nome-univoco-progetto/cover.jpg'],
  palette: ['#7C3AED', '#A855F7', '#E9D5FF', '#1E1B24'],
  featured: false,
  sizeSpan: 'regular' // 'regular' | 'tall' | 'wide' | 'large'
};

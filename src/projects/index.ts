import { Project } from '../types';
import { userProjects } from './userProjects';

export * from './userProjects';
export * from './projectTemplate';

/**
 * Elenco aggregato dei progetti reali del portfolio:
 * Sostituisce integralmente i placeholder con i 15 progetti reali.
 */
export const ALL_PROJECTS: Project[] = [
  ...userProjects
];

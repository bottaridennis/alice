import { Project, Experience, Education, SkillCategory, SoftwareTool, Language } from '../types';
import { ALL_PROJECTS } from '../projects';

/**
 * PROJECTS_DATA è ora alimentato direttamente dalla nuova cartella `/src/projects/`!
 * I nuovi progetti aggiunti in `/src/projects/userProjects.ts` compariranno automaticamente qui.
 */
export const PROJECTS_DATA: Project[] = ALL_PROJECTS;

export const RESUME_DATA = {
  name: 'Alice Mariarita Mele',
  title: 'Graphic Designer',
  subtitle: 'Grafica e Comunicazione',
  bio: "Sono una giovane professionista di 20 anni, che ha maturato solide competenze in ambito grafico e della comunicazione, grazie all'esperienza lavorativa svolta in progetti e contesti digitali.",
  location: '',
  email: 'alicemariaritamele@gmail.com',
  portfolioUrl: '',
  profileText: `Sono una giovane professionista di 20 anni, che ha maturato solide competenze in ambito grafico e della comunicazione, grazie all'esperienza lavorativa svolta in progetti e contesti digitali.\n\nCaratteristiche che mi contraddistinguono sono la curiosità, l'attenzione ai dettagli, l'approccio analitico, il problem solving e una spiccata propensione all'apprendimento. Connotata da buone doti relazionali, di ascolto e di comunicazione, sviluppate grazie all'esperienza di animatrice di un gruppo adolescenti che mi ha permesso di potenziare la capacità di gestione del gruppo, l'attitudine al dialogo, capacità che intendo valorizzare in ambito formativo.`,
  experiences: [
    {
      id: 'exp-1',
      period: '08/2025 — Oggi',
      company: 'Edulife S.p.A Impresa Sociale',
      role: '',
      location: '',
      description: '',
      keyActivities: [
        'Progettazione e realizzazione di contenuti digitali ed e-learning, dalla stesura dello storyboard allo sviluppo dei materiali multimediali e interattivi.',
        'Creazione e adattamento di asset visivi, registrazione, montaggio video e produzione di contenuti attraverso soluzioni di Intelligenza Artificiale come ChatGPT, Gemini, Copilot, Higgsfield, ElevenLabs e Gamma.',
        'Confronto con il cliente per recepire esigenze, feedback e revisioni.'
      ],
      tags: ['E-learning', 'AI', 'Video']
    },
    {
      id: 'exp-2',
      period: '05/2024 — 09/2024',
      company: 'Withub S.p.A',
      role: 'Stage',
      location: '',
      description: '',
      keyActivities: [
        'Progettazione e impaginazione di materiali grafici per la comunicazione offline: volantini, contenuti di enigmistica, quotidiani e magazine.'
      ],
      tags: ['Offline', 'Editoria', 'Impaginazione']
    },
    {
      id: 'exp-3',
      period: '02/2023 — 04/2023',
      company: 'Sgaravato srl',
      role: 'Stage',
      location: '',
      description: '',
      keyActivities: [
        'Sviluppo di identità visive, progettazione di loghi e definizione di naming coerenti con le esigenze e gli obiettivi della commessa.'
      ],
      tags: ['Brand Identity', 'Naming', 'Loghi']
    }
  ] as Experience[],
  education: [
    {
      id: 'edu-1',
      period: '2023 — 2025',
      school: 'Istituto Salesiano San Zeno',
      degree: 'Diploma di maturità in grafica e comunicazione',
      specialization: '',
      location: '',
      details: ''
    },
    {
      id: 'edu-2',
      period: '2020 — 2023',
      school: 'Istituto Salesiano San Zeno',
      degree: 'Qualifica professionale in grafica e comunicazione',
      specialization: '',
      location: '',
      details: ''
    }
  ] as Education[],
  skillCategories: [
    {
      title: 'Competenze Trasversali',
      description: 'Doti relazionali, di ascolto e di comunicazione, rafforzate anche come animatrice di un gruppo di adolescenti.',
      items: [
        'Problem solving e approccio analitico',
        'Propensione all\'apprendimento continuo',
        'Gestione di gruppo e team working',
        'Attitudine al dialogo e all\'ascolto attivo',
        'Curiosità e attenzione ai dettagli'
      ]
    },
    {
      title: 'Digital & AI Tools',
      description: 'Strumenti di Intelligenza Artificiale e produzione di contenuti digitali ed e-learning.',
      items: [
        'Prompting e Generative AI (ChatGPT, Gemini, Copilot)',
        'Video e Audio AI (Higgsfield, ElevenLabs, Gamma)',
        'Progettazione e-learning e storyboard',
        'Registrazione e montaggio video',
        'Sviluppo materiali multimediali interattivi'
      ]
    },
    {
      title: 'Grafica e Visual Identity',
      description: 'Identità visive, loghi e impaginazione per la comunicazione offline.',
      items: [
        'Sviluppo di identità visive e progettazione di loghi',
        'Definizione di naming e concept',
        'Impaginazione per comunicazione offline (volantini, magazine, quotidiani)',
        'Confronto e gestione del cliente (feedback e revisioni)'
      ]
    }
  ] as SkillCategory[],
  softwareTools: [
    { name: 'Adobe Illustrator', category: 'Design' },
    { name: 'Adobe InDesign', category: 'Design' },
    { name: 'Adobe Photoshop', category: 'Design' },
    { name: 'Adobe XD', category: 'UI/UX' },
    { name: 'Adobe Premiere', category: 'Video' },
    { name: 'Adobe Character Animator', category: 'Animation' },
    { name: 'Articulate 360', category: 'E-learning' },
    { name: 'Camtasia', category: 'Video' },
    { name: 'Pacchetto Office', category: 'Productivity' }
  ] as SoftwareTool[],
  languages: [
    { name: 'Italiano', level: 'Madrelingua' },
    { name: 'Inglese', level: 'B1 - Intermedio', cefr: 'B1' }
  ] as Language[]
};

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
  phone: '347 8468996',
  email: 'alicemariaritamele@gmail.com',
  portfolioUrl: '',
  profileText: `Sono una giovane professionista di 20 anni, che ha maturato solide competenze in ambito grafico e della comunicazione, grazie all'esperienza lavorativa svolta in progetti e contesti digitali.\n\nCaratteristiche che mi contraddistinguono sono la curiosità, l'attenzione ai dettagli, l'approccio analitico, il problem solving e una spiccata propensione all'apprendimento. Connotata da buone doti relazionali, di ascolto e di comunicazione, sviluppate grazie all'esperienza di animatrice di un gruppo adolescenti che mi ha permesso di potenziare la capacità di gestione del gruppo, l'attitudine al dialogo, capacità che intendo valorizzare in ambito formativo.`,
  experiences: [
    {
      id: 'exp-1',
      period: '08/2023 — Oggi',
      company: 'Edulife S.p.A Impresa Sociale',
      role: 'Graphic Designer',
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
      period: '09/2022 — 05/2023',
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
      period: '02/2022 — 04/2022',
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
      description: 'Capacità organizzative e relazionali sviluppate sul campo.',
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
      description: 'Integrazione di strumenti innovativi nel flusso di lavoro.',
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
      description: 'Ideazione e sviluppo di progetti per la comunicazione offline e online.',
      items: [
        'Sviluppo di identità visive e progettazione di loghi',
        'Definizione di naming e concept',
        'Impaginazione per comunicazione offline (volantini, magazine, quotidiani)',
        'Confronto e gestione del cliente (feedback e revisioni)'
      ]
    }
  ] as SkillCategory[],
  softwareTools: [
    { name: 'Adobe Illustrator', category: 'Design', level: 'Avanzato', badge: 'Core' },
    { name: 'Adobe InDesign', category: 'Design', level: 'Avanzato', badge: 'Core' },
    { name: 'Adobe Photoshop', category: 'Design', level: 'Avanzato', badge: 'Core' },
    { name: 'Adobe XD', category: 'UI/UX', level: 'Intermedio', badge: 'Digital' },
    { name: 'Adobe Premiere', category: 'Video', level: 'Intermedio', badge: 'Video' },
    { name: 'Adobe Character Animator', category: 'Animation', level: 'Base', badge: 'Animation' },
    { name: 'Articulate 360', category: 'E-learning', level: 'Intermedio', badge: 'E-learning' },
    { name: 'Camtasia', category: 'Video', level: 'Intermedio', badge: 'Video' },
    { name: 'Pacchetto Office', category: 'Productivity', level: 'Avanzato', badge: 'Office' }
  ] as SoftwareTool[],
  languages: [
    { name: 'Italiano', level: 'Madrelingua', percentage: 100, note: '' },
    { name: 'Inglese', level: 'B1 - Intermedio', percentage: 60, note: '' }
  ] as Language[]
};

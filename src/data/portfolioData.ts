import { Project, Experience, Education, SkillCategory, SoftwareTool, Language } from '../types';
import { ALL_PROJECTS } from '../projects';

/**
 * PROJECTS_DATA è ora alimentato direttamente dalla nuova cartella `/src/projects/`!
 * I nuovi progetti aggiunti in `/src/projects/userProjects.ts` compariranno automaticamente qui.
 */
export const PROJECTS_DATA: Project[] = ALL_PROJECTS;

export const RESUME_DATA = {
  name: 'Alice Mele',
  title: 'Graphic Designer',
  subtitle: 'Specializzata in Stampa, Grafica Editoriale e Sistemi di Comunicazione Visiva',
  bio: 'Progetto identità visive e materiali grafici capaci di trasformare idee, informazioni e contenuti in esperienze visive chiare, riconoscibili e coinvolgenti. Con una profonda passione per la cultura della carta, la precisione tipografica e le tecniche di stampa, affianco brand, istituzioni culturali e studi creativi dalla prima intuizione al controllo esecutivo in tipografia.',
  location: 'Milano, Italia (Disponibile per progetti in loco e da remoto)',
  email: 'alice.mele.design@gmail.com',
  portfolioUrl: 'alicemele.design',
  profileText: `Mi piace costruire progetti grafici in cui estetica e funzionalità lavorano insieme in perfetta armonia. Credo che la grafica destinata alla stampa conservi un valore sensoriale insostituibile: il peso di una carta speciale, la brillantezza di un Pantone calibrato, la griglia invisibile che guida l’occhio nella lettura di un testo complesso.
  
Il mio approccio unisce sensibilità visiva contemporanea, rigore tecnico nella prestampa e ascolto meticoloso degli obiettivi comunicativi del committente.`,

  experiences: [
    {
      id: 'exp-1',
      period: '2023 — Presente',
      company: 'Studio Grafico Radice & Partner',
      role: 'Senior Graphic & Editorial Designer',
      location: 'Milano',
      description: 'Responsabile della direzione visiva e dell’esecutivizzazione di progetti di stampa editoriali e commerciali di grande scala per clienti nel settore del design, moda e cultura.',
      keyActivities: [
        'Ideazione e impaginazione di cataloghi d’arte, brochure istituzionali e riviste periodiche',
        'Supervisione delle prove colore (Cromalin, prove contrattuali) e avviamento stampa in tipografia',
        'Sviluppo di sistemi di identità visiva scalabili e linee guida di brand',
        'Coordinamento di un team junior e gestione della relazione tecnica con cartiere e centri stampa'
      ],
      tags: ['InDesign', 'Prestampa', 'Cataloghi', 'Art Direction', 'Fedrigoni']
    },
    {
      id: 'exp-2',
      period: '2021 — 2023',
      company: 'Officina Tipografica & Comunicazione Nova',
      role: 'Graphic Designer & Print Specialist',
      location: 'Torino / Milano',
      description: 'Progettazione grafica a stretto contatto con il reparto produttivo di legatoria e stampa offset/serigrafica.',
      keyActivities: [
        'Progettazione di locandine, manifesti d’affissione, pieghevoli e flyer promozionali',
        'Creazione di fustelle personalizzate per packaging e prodotti cartotecnici complessi',
        'Controllo file esecutivi (abbondanze, profili colore CMYK, risoluzione raster, gestione inchiostri speciali)',
        'Supporto ai clienti nella selezione di carte materiche e nobilitazioni a caldo'
      ],
      tags: ['Offset', 'Serigrafia', 'Fustellatura', 'Packaging', 'Poster']
    },
    {
      id: 'exp-3',
      period: '2019 — 2021',
      company: 'Atelier Visuale & Indipendente',
      role: 'Junior Graphic Designer',
      location: 'Milano',
      description: 'Collaborazione alla realizzazione di identità visive per festival musicali, rassegne cinematografiche ed editoria indipendente.',
      keyActivities: [
        'Composizione tipografica per locandine, programmi di sala e materiali promozionali per eventi',
        'Preparazione mockup realistici per presentazioni al cliente',
        'Adattamento dei formati per stampa e declinazioni per canali digitali'
      ],
      tags: ['Illustrator', 'Photoshop', 'Tipografia', 'Locandine']
    }
  ] as Experience[],

  education: [
    {
      id: 'edu-1',
      period: '2020 — 2021',
      school: 'CFP Bauer — Centro di Formazione Professionale',
      degree: 'Master di Specializzazione in Tipografia & Editorial Design',
      specialization: 'Microtipografia, griglie complesse e produzione del libro d’arte',
      location: 'Milano',
      details: 'Studio approfondito della cultura del carattere, composizione editoriale svizzera e gestione avanzata della prestampa.'
    },
    {
      id: 'edu-2',
      period: '2016 — 2019',
      school: 'NABA — Nuova Accademia di Belle Arti',
      degree: 'Laurea Triennale in Graphic Design & Art Direction',
      specialization: 'Comunicazione Visiva, Brand Identity & Tecnologie Grafiche',
      location: 'Milano',
      details: 'Votazione finale: 110/110 con Lode. Tesi di laurea sulla rivalutazione della stampa d’arte nell’era digitale.'
    },
    {
      id: 'edu-3',
      period: '2022',
      school: 'Associazione Tecnici Grafici Italiani (TAGA)',
      degree: 'Certificazione di Qualità in Gestione del Colore e Prestampa',
      specialization: 'Standard ISO 12647 e profili colore Fogra/Esko',
      location: 'Bologna'
    }
  ] as Education[],

  skillCategories: [
    {
      title: 'Print & Editorial Design',
      description: 'Padronanza completa del ciclo di vita del prodotto stampato.',
      items: [
        'Impaginazione di cataloghi e monografie',
        'Progettazione di brochure, pieghevoli e flyer',
        'Poster e locandine d’affissione',
        'Packaging e cartotecnica fustellata',
        'Materiali coordinati e stationery aziendale'
      ]
    },
    {
      title: 'Visual Identity & Branding',
      description: 'Costruzione di sistemi visivi coerenti e memorabili.',
      items: [
        'Marchi tipografici e logotipi vettoriali',
        'Palette cromatiche e codifica Pantone®',
        'Brand guidelines e manuali d’uso',
        'Applicazioni fisiche e packaging identity',
        'Art direction fotografica'
      ]
    },
    {
      title: 'Tipografia & Layout',
      description: 'Cura rigorosa del ritmo, della gerarchia e del micro-spazio.',
      items: [
        'Griglie asimmetriche e sistemi modulari',
        'Microtipografia (interlinea, crenatura, allineamento)',
        'Accoppiamenti tipografici (serif/sans/display)',
        'Sviluppo di poster a prevalenza tipografica',
        'Leggibilità e accessibilità visiva'
      ]
    },
    {
      title: 'Tecnologia di Stampa & Prestampa',
      description: 'Competenza esecutiva per garantire zero difetti in macchina.',
      items: [
        'Controllo file esecutivi e trapping',
        'Gestione profili colore CMYK e tinte piatte',
        'Conoscenza approfondita delle cartiere (Fedrigoni, Favini, Arjowiggins)',
        'Nobilitazioni: lamina a caldo, rilievo a secco, serigrafia UV',
        'Avviamento macchina e verifica fogli stesi'
      ]
    }
  ] as SkillCategory[],

  softwareTools: [
    { name: 'Adobe InDesign', category: 'Layout & Print', level: 'Esperta / Quotidiano', badge: 'Core' },
    { name: 'Adobe Illustrator', category: 'Adobe Creative Cloud', level: 'Esperta / Quotidiano', badge: 'Core' },
    { name: 'Adobe Photoshop', category: 'Adobe Creative Cloud', level: 'Avanzato / Quotidiano', badge: 'Core' },
    { name: 'Adobe Acrobat Pro (Preflight)', category: 'Layout & Print', level: 'Esperta / Prestampa', badge: 'Tecnico' },
    { name: 'Figma', category: 'Digital & Web', level: 'Avanzato / Layout & Presentazioni', badge: 'Digital' },
    { name: 'Generative AI & Firefly', category: 'Generative AI', level: 'Intermedio / Ricerca Moodboard', badge: 'Workflow' }
  ] as SoftwareTool[],

  languages: [
    { name: 'Italiano', level: 'Madrelingua', percentage: 100, note: 'Comunicazione professionale impeccabile' },
    { name: 'Inglese', level: 'Fluente (C1)', percentage: 90, note: 'Capacità di condurre meeting e briefing internazionali' },
    { name: 'Francese', level: 'Intermedio (B1)', percentage: 65, note: 'Comprensione e conversazione di settore' }
  ] as Language[]
};

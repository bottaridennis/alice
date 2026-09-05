import React, { useState } from 'react';
import { RESUME_DATA } from '../data/portfolioData';
import { Layout,   
  Briefcase,
  GraduationCap,
  Sparkles,
  Layers,
  CheckCircle2,
  Mail,
  ArrowLeft,
  Printer,
  Copy,
  Check,
  Globe,
  Award
, PenTool , LayoutTemplate , Image as ImageIcon , Film , Smile , MonitorPlay , FileText , Box } from 'lucide-react';
import { motion } from 'motion/react';

interface CurriculumViewProps {
  onBackToPortfolio: () => void;
}


const getSoftwareIcon = (name: string) => {
  if (name.includes('Illustrator')) return (
    <div className="w-6 h-6 rounded-[4px] flex items-center justify-center font-bold text-[12px] bg-[#330000] text-[#FF9A00] tracking-tighter"><span>Ai</span></div>
  );
  if (name.includes('InDesign')) return (
    <div className="w-6 h-6 rounded-[4px] flex items-center justify-center font-bold text-[12px] bg-[#49021F] text-[#FF3366] tracking-tighter"><span>Id</span></div>
  );
  if (name.includes('Photoshop')) return (
    <div className="w-6 h-6 rounded-[4px] flex items-center justify-center font-bold text-[12px] bg-[#001E36] text-[#31A8FF] tracking-tighter"><span>Ps</span></div>
  );
  if (name.includes('XD')) return (
    <div className="w-6 h-6 rounded-[4px] flex items-center justify-center font-bold text-[12px] bg-[#470137] text-[#FF61C6] tracking-tighter"><span>Xd</span></div>
  );
  if (name.includes('Premiere')) return (
    <div className="w-6 h-6 rounded-[4px] flex items-center justify-center font-bold text-[12px] bg-[#00005C] text-[#EA77FF] tracking-tighter"><span>Pr</span></div>
  );
  if (name.includes('Character')) return (
    <div className="w-6 h-6 rounded-[4px] flex items-center justify-center font-bold text-[12px] bg-[#14003C] text-[#DCA2FF] tracking-tighter"><span>Ch</span></div>
  );
  if (name.includes('Articulate')) return (
    <div className="w-6 h-6 rounded-full flex items-center justify-center font-bold text-[14px] bg-[#00A5D9] text-white"><span>a</span></div>
  );
  if (name.includes('Camtasia')) return (
    <div className="w-6 h-6 rounded-full flex items-center justify-center font-bold text-[14px] bg-[#087754] text-white"><span>C</span></div>
  );
  if (name.includes('Office')) return (
    <div className="w-6 h-6 grid grid-cols-2 gap-[1.5px] p-[2.5px]">
      <div className="bg-[#F25022] rounded-sm"></div>
      <div className="bg-[#7FBA00] rounded-sm"></div>
      <div className="bg-[#00A4EF] rounded-sm"></div>
      <div className="bg-[#FFB900] rounded-sm"></div>
    </div>
  );
  
  return <div className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center font-bold text-[12px] text-gray-500"><span>{name.charAt(0)}</span></div>;
};

export const CurriculumView: React.FC<CurriculumViewProps> = ({ onBackToPortfolio }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(RESUME_DATA.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.open('./CV_Mele.pdf', '_blank');
  };

  const sectionAnim = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-50px' },
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] }
  };

  return (
    <div id="curriculum-page" className="pt-40 sm:pt-32 pb-20 relative">
      {/* Background Accent Shapes */}
      <div className="absolute top-24 -left-20 w-80 h-80 rounded-full bg-[#EDE9FE] blur-[120px] opacity-60 pointer-events-none" />
      <div className="absolute top-1/2 -right-20 w-96 h-96 rounded-full bg-[#DDD6FE] blur-[100px] opacity-40 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Navigation Breadcrumb / Return */}
        <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              id="cv-copy-email-btn"
              onClick={handleCopyEmail}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2.5 rounded-full bg-white border border-[#E9D5FF] text-[11px] sm:text-xs font-semibold text-[#4C1D95] hover:bg-[#FAF5FF] hover:border-[#C084FC] transition-all shadow-sm min-h-[42px]"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Email Copiata!' : 'Copia Email'}</span>
            </button>

            <button
              id="cv-print-btn"
              onClick={handlePrint}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2.5 rounded-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-[11px] sm:text-xs font-semibold shadow-md shadow-purple-200 transition-all hover:scale-105 min-h-[42px]"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Stampa / PDF</span>
            </button>
          </div>
        </div>

        {/* Curriculum Header: Editorial & Typographic */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white rounded-[24px] sm:rounded-[36px] p-6 sm:p-10 lg:p-12 border border-[#E9D5FF] shadow-[0_10px_36px_rgba(124,58,237,0.06)] hover:border-[#C084FC]/60 hover:shadow-[0_14px_40px_rgba(124,58,237,0.09)] transition-all duration-300 mb-8 sm:mb-12 relative overflow-hidden"
        >
          {/* Subtle print mark in background */}
          <div className="absolute top-6 right-8 hidden md:block text-right">
            <span className="font-mono text-[10px] text-[#7C3AED]/40 block">DOC_ID // CV-2026</span>
            <span className="font-mono text-[10px] text-[#374151]/40 block">FORMAT: WEB EDITORIAL</span>
          </div>

          <div className="flex flex-col-reverse md:flex-row items-center md:items-start justify-between gap-6 md:gap-10">
            <div className="flex-1 max-w-2xl text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-white border border-[#E9D5FF] text-[#7C3AED] text-[11px] sm:text-[12px] font-bold uppercase tracking-wider sm:tracking-widest mb-3 sm:mb-4 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#7C3AED]"></span>
                <span>Curriculum Vitae</span>
              </div>

              <h1 className="font-serif italic text-4xl sm:text-6xl lg:text-7xl text-[#1A1A1A] tracking-tight mb-2">
                Alice Mariarita Mele
              </h1>
              <div className="flex items-center justify-center md:justify-start gap-3 mb-4 sm:mb-5">
                <div className="w-8 sm:w-10 h-[1.5px] bg-[#7C3AED]"></div>
                <h2 className="text-lg sm:text-2xl font-serif italic text-[#7C3AED]">
                  Graphic Designer
                </h2>
              </div>

              <p className="text-[#1F2937] text-base sm:text-lg leading-relaxed mb-5 sm:mb-6 font-medium">
                Specializzata nella progettazione per la stampa, grafica editoriale d’arte e costruzione di identità visive coerenti. Coniugo rigore metodologico, sensibilità materica per i supporti cartacei e precisione tipografica in ogni fase del lavoro.
              </p>

              {/* Direct Contact Pills */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 sm:gap-3 text-xs sm:text-sm">
                <a
                  href={`mailto:${RESUME_DATA.email}`}
                  className="flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full bg-[#FAF5FF] text-[#6D28D9] border border-[#DDD6FE] hover:bg-[#7C3AED] hover:text-white hover:border-[#7C3AED] hover:shadow-sm transition-all duration-200 min-h-[38px]"
                >
                  <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="truncate max-w-[200px] sm:max-w-none">{RESUME_DATA.email}</span>
                </a>

                <a 
                  href="https://amale.eu" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full bg-[#FAF9FC] text-[#1F2937] border border-[#E9D5FF] hover:border-[#DDD6FE] hover:text-[#7C3AED] transition-all min-h-[38px]"
                >
                  <Globe className="w-3.5 h-3.5 text-[#7C3AED] flex-shrink-0" />
                  <span>amale.eu</span>
                </a>
              </div>
            </div>

            {/* Alice Portrait with Studio Backdrop */}
            <div className="flex-shrink-0 relative flex flex-col items-center">
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44 rounded-full bg-gradient-to-b from-[#FAF8FE] via-[#F4EEFF] to-[#E9DDFD] border-2 border-white shadow-[0_12px_32px_rgba(124,58,237,0.14)] overflow-hidden flex items-end justify-center">
                <div className="absolute top-2 w-28 h-28 rounded-full border border-[#DDD6FE]/60 pointer-events-none" />
                <img
                  src="./Alice_photo.png"
                  alt="Alice Mariarita Mele — Graphic Designer"
                  className="relative z-10 w-full h-[90%] object-contain object-bottom drop-shadow-[0_8px_16px_rgba(76,29,149,0.18)]"
                />
              </div>
              <span className="mt-2 text-[10px] font-mono text-[#7C3AED] font-semibold uppercase tracking-wider">
                Alice Mariarita Mele
              </span>
            </div>
          </div>
        </motion.div>

        {/* Section 1: Profilo */}
        <section className="mb-16 sm:mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-2xl bg-[#F3E8FF] flex items-center justify-center text-[#7C3AED] shadow-sm">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-serif italic font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#0A0A0A]">
              Profilo Professionale
            </h3>
          </div>

          <div className="group bg-white rounded-[28px] p-6 sm:p-8 md:p-10 border border-[#E9D5FF] shadow-sm hover:border-[#C084FC] hover:bg-[#FDFBFE] hover:shadow-[0_12px_32px_rgba(124,58,237,0.07)] transition-all duration-300 leading-relaxed text-[#111827] space-y-4">
            <p className="text-base sm:text-lg font-medium text-[#111827] leading-relaxed">
              Mi piace costruire progetti grafici in cui estetica e funzionalità lavorano insieme in perfetta armonia. Credo che la grafica destinata alla stampa conservi un valore sensoriale insostituibile: il peso e la grana di una carta speciale, la brillantezza di un inchiostro calibrato, la griglia invisibile che guida l’occhio nella lettura di un testo articolato.
            </p>
            <p className="text-base sm:text-lg font-medium text-[#1F2937] leading-relaxed">
              Il mio percorso unisce sensibilità visiva contemporanea, rigore tecnico nella gestione della prestampa (abbondanze, profili colore) e una costante attenzione alle esigenze dei clienti e delle istituzioni culturali.
            </p>
          </div>
        </section>

        {/* Section 2: Esperienze Lavorative */}
        <section className="mb-16 sm:mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-2xl bg-[#F3E8FF] flex items-center justify-center text-[#7C3AED] shadow-sm">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif italic font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#0A0A0A]">
                Esperienze Lavorative
              </h3>
              <p className="text-sm sm:text-base text-[#374151] font-medium">Percorso professionale e progetti svolti in agenzie e tipografie</p>
            </div>
          </div>

          {/* Vertical Editorial Timeline with generous vertical spacing */}
          <div className="relative pl-4 sm:pl-8 space-y-12 sm:space-y-16 before:absolute before:left-2 sm:before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-[#DDD6FE]">
            {RESUME_DATA.experiences.map((exp) => (
              <div key={exp.id} className="relative group/exp">
                {/* Timeline node with glowing micro-interaction */}
                <div className="absolute -left-[22px] sm:-left-[35px] top-3.5 w-4 h-4 sm:w-4 sm:h-4 rounded-full bg-white border-3 sm:border-4 border-[#7C3AED] shadow-md group-hover/exp:scale-125 group-hover/exp:border-[#6D28D9] group-hover/exp:ring-4 group-hover/exp:ring-[#EDE9FE] transition-all duration-300" />

                {/* Experience Card with delicate hover color shift and elevation */}
                <div className="bg-white rounded-[24px] sm:rounded-[30px] p-5 sm:p-8 md:p-9 border border-[#E9D5FF] shadow-sm group-hover/exp:border-[#C084FC] group-hover/exp:bg-[#FDFBFE] group-hover/exp:shadow-[0_16px_40px_rgba(124,58,237,0.09)] group-hover/exp:-translate-y-0.5 transition-all duration-300">
                  {/* Period & Company Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <div className="flex items-baseline gap-2">
                      <h4 className="font-serif italic font-black text-2xl sm:text-3xl text-[#0A0A0A] tracking-tight group-hover/exp:text-[#7C3AED] transition-colors duration-200">
                        {exp.role}
                      </h4>
                    </div>
                    <span className="inline-block px-3 sm:px-3.5 py-1.5 rounded-full bg-[#FAF5FF] border border-[#DDD6FE] text-[#6D28D9] font-bold text-xs self-start sm:self-auto group-hover/exp:bg-[#7C3AED] group-hover/exp:text-white group-hover/exp:border-[#7C3AED] transition-colors duration-200 shadow-xs">
                      {exp.period}
                    </span>
                  </div>

                  <div className="text-sm sm:text-base font-bold text-[#6D28D9] mb-3 sm:mb-4">
                    {exp.company} <span className="text-[#4B5563] font-semibold">· {exp.location || 'Verona'}</span>
                  </div>

                  {exp.description && (
                    <p className="text-sm sm:text-base text-[#111827] leading-relaxed mb-4 sm:mb-5 font-medium">
                      {exp.description}
                    </p>
                  )}

                  {/* Main Activities */}
                  <div className="space-y-2.5 mb-5 sm:mb-6 bg-[#FAF9FD] p-4 sm:p-5 rounded-2xl border border-[#F3E8FF] group-hover/exp:bg-white group-hover/exp:border-[#E9D5FF] transition-colors duration-200">
                    <span className="text-xs sm:text-sm font-bold text-[#6D28D9] uppercase tracking-wider block mb-1.5">
                      Principali Attività & Responsabilità:
                    </span>
                    <ul className="space-y-2 text-xs sm:text-sm text-[#111827] font-medium leading-relaxed">
                      {exp.keyActivities.map((act, i) => (
                        <li key={i} className="flex items-start gap-2.5 group/act py-0.5 rounded-lg hover:text-[#581C87] transition-colors">
                          <span className="w-2 h-2 rounded-full bg-[#7C3AED] mt-1.5 flex-shrink-0 group-hover/act:scale-125 transition-transform" />
                          <span className="text-[#111827] font-medium">{act}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tags with micro-interactions */}
                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 rounded-lg bg-[#FAF5FF] text-[#581C87] text-xs font-bold border border-[#DDD6FE] hover:border-[#C084FC] hover:bg-[#F3E8FF] hover:text-[#4C1D95] hover:shadow-xs transition-all duration-200 cursor-default"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Formazione */}
        <section className="mb-16 sm:mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-2xl bg-[#F3E8FF] flex items-center justify-center text-[#7C3AED] shadow-sm">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif italic font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#0A0A0A]">
                Formazione & Studi
              </h3>
              <p className="text-sm sm:text-base text-[#374151] font-medium">Percorso accademico e master di specializzazione</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {RESUME_DATA.education.map((edu) => (
              <div
                key={edu.id}
                className="group/edu bg-white rounded-[22px] sm:rounded-[28px] p-6 sm:p-7 border border-[#E9D5FF] shadow-sm flex flex-col justify-between hover:border-[#C084FC] hover:bg-[#FDFBFE] hover:shadow-[0_14px_36px_rgba(124,58,237,0.08)] hover:-translate-y-1 transition-all duration-300"
              >
                <div>
                  <span className="inline-block px-3.5 py-1.5 rounded-full bg-[#FAF5FF] text-[#6D28D9] text-xs font-bold mb-3.5 border border-[#DDD6FE] group-hover/edu:bg-[#7C3AED] group-hover/edu:text-white transition-colors duration-200">
                    {edu.period}
                  </span>
                  <h4 className="font-serif italic font-black text-xl sm:text-2xl text-[#0A0A0A] group-hover/edu:text-[#7C3AED] transition-colors duration-200 mb-1.5">
                    {edu.degree}
                  </h4>
                  <div className="text-sm font-bold text-[#6D28D9] mb-2">
                    {edu.school} {edu.location ? `— ${edu.location}` : ''}
                  </div>
                  {edu.specialization && (
                    <p className="text-sm text-[#111827] font-medium mb-3 leading-relaxed">
                      <strong className="font-bold text-[#0A0A0A]">Specializzazione:</strong> {edu.specialization}
                    </p>
                  )}
                </div>
                {edu.details && (
                  <p className="text-xs text-[#374151] font-medium pt-3.5 border-t border-[#F3E8FF] mt-2 italic">
                    {edu.details}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Competenze (Categorizzate visivamente) */}
        <section className="mb-16 sm:mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-2xl bg-[#F3E8FF] flex items-center justify-center text-[#7C3AED] shadow-sm">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif italic font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#0A0A0A]">
                Competenze
              </h3>
              <p className="text-sm sm:text-base text-[#374151] font-medium">Aree di specializzazione e metodologie progettuali</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {RESUME_DATA.skillCategories.map((cat, idx) => (
              <div
                key={idx}
                className="group/cat bg-white rounded-[22px] sm:rounded-[28px] p-6 sm:p-7 border border-[#E9D5FF] shadow-sm hover:border-[#C084FC] hover:bg-[#FDFBFE] hover:shadow-[0_14px_36px_rgba(124,58,237,0.08)] hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#7C3AED] group-hover/cat:scale-125 transition-transform duration-200"></span>
                  <h4 className="font-serif italic font-black text-xl sm:text-2xl text-[#0A0A0A] group-hover/cat:text-[#7C3AED] transition-colors duration-200">
                    {cat.title}
                  </h4>
                </div>
                <p className="text-sm text-[#1F2937] font-medium mb-4">
                  {cat.description}
                </p>

                <div className="space-y-2.5">
                  {cat.items.map((item, i) => (
                    <div
                      key={i}
                      className="group/item flex items-center gap-2.5 p-2.5 rounded-xl bg-[#FAF9FD] text-xs sm:text-sm font-semibold text-[#111827] border border-[#F3E8FF] hover:border-[#DDD6FE] hover:bg-[#F5EEFF] hover:text-[#581C87] hover:shadow-[0_2px_8px_rgba(124,58,237,0.06)] hover:translate-x-1 transition-all duration-200 cursor-default"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#7C3AED] group-hover/item:text-[#6D28D9] group-hover/item:scale-110 flex-shrink-0 transition-transform duration-200" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: Software & Strumenti (Pill & Badge grafici) */}
        <section className="mb-16 sm:mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-2xl bg-[#F3E8FF] flex items-center justify-center text-[#7C3AED] shadow-sm">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif italic font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#0A0A0A]">
                Software & Strumenti
              </h3>
              <p className="text-sm sm:text-base text-[#374151] font-medium">Applicazioni e tool di lavoro per layout, vettori e prestampa</p>
            </div>
          </div>

          <div className="bg-white rounded-[24px] sm:rounded-[30px] p-5 sm:p-8 border border-[#E9D5FF] shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
              {RESUME_DATA.softwareTools.map((tool, idx) => (
                <div
                  key={idx}
                  className="group/tool p-4 rounded-xl sm:rounded-2xl bg-[#FAF9FC] border border-[#E9D5FF] hover:border-[#C084FC] hover:bg-white hover:shadow-[0_8px_24px_rgba(124,58,237,0.08)] hover:-translate-y-0.5 transition-all duration-200 cursor-default"
                >
                  <div className="flex items-center justify-between mb-2">
                    
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 rounded-lg bg-white border border-[#F3E8FF] group-hover/tool:border-[#E9D5FF] group-hover/tool:shadow-sm transition-all flex-shrink-0">
                        {getSoftwareIcon(tool.name)}
                      </div>
                      <span className="font-bold text-sm sm:text-base text-[#0A0A0A] group-hover/tool:text-[#7C3AED] transition-colors">{tool.name}</span>
                    </div>

                    <span className="px-2 py-0.5 rounded-md bg-[#FAF5FF] text-[#6D28D9] group-hover/tool:bg-[#7C3AED] group-hover/tool:text-white text-[11px] font-bold border border-[#DDD6FE] transition-colors duration-200">
                      {tool.badge}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-1 pt-1 border-t border-[#F3E8FF]/80">
                    <span className="text-xs text-[#6D28D9] font-bold block">
                      {tool.level}
                    </span>
                    <span className="text-xs text-[#4B5563] font-medium">
                      {tool.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 6: Lingue */}
        <section className="mb-16 sm:mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-2xl bg-[#F3E8FF] flex items-center justify-center text-[#7C3AED] shadow-sm">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif italic font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#0A0A0A]">
                Lingue
              </h3>
              <p className="text-sm sm:text-base text-[#374151] font-medium">Competenze linguistiche per collaborazioni nazionali e internazionali</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {RESUME_DATA.languages.map((lang, idx) => (
              <div
                key={idx}
                className="group/lang bg-white rounded-[22px] sm:rounded-[28px] p-5 sm:p-6 border border-[#E9D5FF] shadow-sm hover:border-[#C084FC] hover:bg-[#FDFBFE] hover:shadow-[0_14px_32px_rgba(124,58,237,0.08)] hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="flex items-baseline justify-between mb-1.5">
                  <h4 className="font-serif italic font-black text-xl sm:text-2xl text-[#0A0A0A] group-hover/lang:text-[#7C3AED] transition-colors duration-200">
                    {lang.name}
                  </h4>
                  <span className="text-xs sm:text-sm font-bold text-[#7C3AED]">
                    {lang.level}
                  </span>
                </div>

                <p className="text-sm text-[#111827] font-medium mb-4">
                  {lang.note}
                </p>

                {/* Visual Progress Bar */}
                <div className="w-full bg-[#F3E8FF] h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-[#7C3AED] to-[#A855F7] h-full rounded-full group-hover/lang:from-[#6D28D9] group-hover/lang:to-[#C084FC] transition-all duration-700"
                    style={{ width: `${lang.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

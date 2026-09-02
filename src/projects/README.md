# Cartella Progetti (`/src/projects`)

Questa cartella è il punto centrale dove gestire e posizionare tutti i progetti di Alice Mele.

---

## File contenuti:

1. **`userProjects.ts`**:
   - File principale in cui incollare direttamente l'array con i tuoi nuovi progetti.
   - I progetti aggiunti in questo array compariranno automaticamente in cima al portfolio!

2. **`projectTemplate.ts`**:
   - Modello di riferimento con tutti i campi tipizzati (titolo, cliente, specifiche di stampa, carta Fedrigoni/Favini, nobilitazioni, palette colori, immagini).

3. **`initialProjects.ts`**:
   - I progetti di partenza già presenti nel portfolio.

4. **`index.ts`**:
   - Unifica ed esporta tutti i progetti (`ALL_PROJECTS`), collegandoli all'applicazione.

---

## Struttura di un progetto:

```typescript
{
  id: 'nome-progetto',
  title: 'Titolo',
  category: 'Print Design & Visual Identity',
  categories: ['Print Design', 'Visual Identity'],
  year: '2026',
  client: 'Nome Committente',
  role: 'Ruolo / Responsabilità',
  summary: 'Breve sintesi...',
  description: 'Descrizione estesa del concept...',
  coverImage: 'URL immagine di copertina...',
  galleryImages: ['URL 1', 'URL 2'],
  specs: {
    format: 'es. 70x100 cm',
    paperStock: 'es. Fedrigoni Arena 250g',
    printTechnique: 'es. Serigrafia / Offset',
    finishes: 'es. Lamina a caldo'
  },
  typography: 'es. Neue Haas Grotesk',
  palette: ['#7C3AED', '#FFFFFF', '#1A1A1A'],
  featured: true, // true se deve apparire anche nella Hero in evidenza
  sizeSpan: 'regular' // 'regular' | 'tall' | 'wide' | 'large'
}
```

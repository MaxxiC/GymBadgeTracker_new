# 🎨 UI/UX Mockup Blueprint: GymBadgeTracker

Basandomi sul nuovo concept (piattaforma gamificata per il fitness) e prendendo spunto dalle funzionalità della vecchia cartella `frontend` (che includeva una MainBar, una HomePage, caricamento file/dati, statistiche Admin e modali utente), ecco una descrizione dettagliata di come dovrebbe essere strutturato graficamente il sito web. Puoi usare questo documento come riferimento per creare i tuoi mockup su Figma (o simili).

---

## 🧭 Stile Grafico Generale (Design System)
- **Tema Principale**: Dark mode (sfondi grigio scuro/nero `#121212` o `#18181b`).
- **Accenti (Brand Colors)**: Verde fluo (stile matrix/energia) e Viola/Azzurro elettrico per dare un tocco "gaming/tech".
- **Tipografia**: Font moderno e pulito, es. *Inter*, *Geist* o *Poppins*. Titoli audaci (Bold) e testi leggibili.
- **Forme e Componenti**: Stile *Glassmorphism* (sfondi semi-trasparenti sfocati) per modali e card. Bordi arrotondati e ombre colorate (neon glow) per evidenziare elementi interattivi.

---

## 📱 1. La Navigation Bar (Top o Sidebar) - *Da `MainBar.js`*
Invece di una semplice barra orizzontale statica, immagina una barra moderna (che può essere posizionata in alto o come Sidebar espandibile a sinistra).
- **Sinistra**: Logo "Fit" affiancato al testo "GymBadgeTracker" con un font aggressivo/sportivo.
- **Centro (o Links)**: Link principali -> Dashboard, I Miei Badge, Info, Contattaci, Admin (se utente con privilegi).
- **Destra**:
  - Selettore Lingua (ITA/ENG) molto minimale (es. icone con le bandierine o un piccolo dropdown).
  - **Bottone Utente (Avatar)**: Al click, invece di aprire un popup standard di bootstrap, apre un *Drawer (pannello laterale)* o un *Glass Menu* bello ed elegante.

### 👇 1.1 Pannello Profilo Utente (Evoluzione di `userModal`)
- Foto Profilo/Avatar + Username.
- Email e data di iscrizione ("Iscritto dal...").
- **Gamification Stats**: Livello Utente (es. "Livello 5 - Intermedio"), Barra dell'esperienza (XP) per arrivare al livello successivo.
- Pulsanti: "Impostazioni Profilo", "Logout".

---

## 🏠 2. Landing Page Pubblica (Da non loggato) - *Da `HomePage.js`*
- **Hero Section**: Titolo enorme (es. "Traccia. Sblocca. Dominia la tua Palestra."), con un sottotitolo esplicativo.
- **Visuale**: Al centro/destra un render 3D di uno dei badge luminosi, oppure uno screenshot stilizzato della dashboard.
- **Call to Action**: Due bottoni glow: `Inizia Subito (Register)` e `Accedi`.

---

## 📊 3. Dashboard Utente (Loggato)
Questa è l'area principale dove l'utente atterra dopo il login.
- **Header della pagina**: "Bentornato, [Username]!" + una piccola frase motivazionale.
- **Sezione 'Resoconto Settimanale'**: 
  - Tre/Quattro card orizzontali in stile *bento-grid* sfocate:
    - Workout fatti questa settimana (es. "3/4").
    - Ultimo carico sollevato.
    - Consistency (un grafico a quadratini stile GitHub constributions, ma per gli allenamenti).
- **Sezione 'Ultimi Badge Sbloccati'**:
  - Una griglia orizzontale con grafiche 3D (o flat ma dettagliate) dei badge sbloccati di recente (es. icona di un bilanciere in fiamme = "Forza del Toro").
- **Input Veloce (Nuovo Workout)**: Un pulsante vistoso e mobile-friendly "➕ Registra Allenamento" che fa comparire un form o modale per inserire i dati della seduta odierna.

---

## 🛠️ 4. Area Admin & Gestione Dati (Per lo Staff)
Riprendendo `AppPage.js`, `OldFiles.js` e `AdminPage.js`, lo staff ha bisogno di un'interfaccia tecnica per inserire dati massivi o monitorare la community.

### 📈 4.1 Admin Stats (Da `AdminPage.js`)
- Una vera e propria *Control Room*.
- **Card Statistiche (Top)**: Totale Utenti Iscritti, Utenti Attivi (ultime 24h), Badge Totali generati dal sistema.
- **Tabella Logs**: Un log live in stile terminale hacker o log server (con i colori per tipo di azione: rosso=error, verde=upload, azzurro=login). Ottimo per far sentire l'admin "in controllo".

### 📂 4.2 Data Upload (Da `AppPage.js` e `OldFiles.js`)
- **Zona Drag & Drop Box**: Un'area grande tratteggiata per caricare file Excel/CSV di massa (se l'integrazione manuale da gestionali palestre esterni è ancora prevista). 
- **Selettore Fogli & Filtri**: Una UI a step (Fase 1: Carica file -> Fase 2: Scegli foglio -> Fase 3: Applica Filtri (staff, corsista, ecc.) in una modale).
- **Storico Elaborazioni**: Una tabella oscura e pulita per mostrare file caricati, data, pulsante icona Download e icona Cestino (rosse).

---

## 💡 Suggerimenti Tecnici per il Mockup
- Cerca su Pinterest o Dribbble referenze digitando *"Gaming Dashboard UI"*, *"Dark Mode SaaS"*, *"Fitness Web App"*.
- Usa icone spesse e arrotondate (es. *Lucide Icons* o *Phosphor Icons*).
- I "Badge" devono essere l'elemento visivamente più "premiante" dell'intera interfaccia. Rendili colorati rispetto al nero/grigio del resto della UI.

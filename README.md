# GymBadgeTracker (Web)

GymBadgeTracker è un'applicazione web moderna per tracciare i propri allenamenti in palestra, monitorare i progressi e sbloccare "badge" (obiettivi) al raggiungimento di determinati traguardi.

Questa repository contiene l'intera applicazione, progettata per sostituire la vecchia architettura separata (frontend/backend) con un unico progetto **Next.js** full-stack, ottimizzato per il deploy su Vercel.

## 🚀 Tech Stack

Come definito nel file di workflow, lo stack utilizzato è orientato alla semplicità e scalabilità delle app moderne:

- **Framework**: [Next.js](https://nextjs.org/) (App Router, React)
- **Styling**: Tailwind CSS / Vanilla CSS (Modern UI)
- **Database & Auth**: [MongoDB](https://www.mongodb.com/)
- **Email**: [Resend](https://resend.com/)
- **Analytics**: [PostHog](https://posthog.com/)
- **Deploy**: [Vercel](https://vercel.com/)
- **Dominio**: Tophost

## 🛠 Come avviare il progetto in locale

1. **Installa le dipendenze**:
   ```bash
   npm install
   ```
2. **Configura le variabili d'ambiente**:
   Crea un file `.env.local` partendo da eventuali file di esempio e inserisci le chiavi relative a Supabase, ecc.
3. **Avvia il server di sviluppo**:
   ```bash
   npm run dev
   ```
4. Apri [http://localhost:3000](http://localhost:3000) nel browser.

## 📂 Struttura della Cartella `src/`
- `/app` - Le pagine dell'applicazione e le API Routes per Vercel.
- `/components` - Componenti UI isolati e riutilizzabili.
- `/lib` - Funzioni di utilità, configurazione database, middleware.

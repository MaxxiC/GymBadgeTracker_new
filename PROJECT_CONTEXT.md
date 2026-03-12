# Contesto del Progetto (per Agenti IA e Sviluppatori)

Questo file serve come "bussola" per chiunque (incluso me, l'agente IA) lavori allo sviluppo di **GymBadgeTracker**. Definisce le regole, la storia e le istruzioni chiare per proseguire evitando errori.

## 🎯 Obiettivo dell'Applicazione
Creare una piattaforma gamificata per il fitness. L'utente registra i suoi allenamenti, i carichi sollevati e la sua costanza. Sulla base di questi parametri, il sistema verifica determinati requisiti e gli assegna automaticamente dei "Badge" grafici (es. "Forza del Toro" per aver sollevato 100kg di panca, "Costanza Incredibile" per essersi allenato 3 mesi di fila senza interruzioni).

## 🏗 Architettura e Scelte Tecniche
Stiamo abbandonando la vecchia architettura MERN frammentata in più cartelle (frontend React, backend Node/Express) e passando a un unico framework: **Next.js (App Router)**.

### Lo stack
Riprendendo il file `nextjs_deploy_workflow.md`:
1. **Next.js** gestisce sia l'interfaccia utente che le API.
2. **MongoDB** è il database.
3. **Vercel** è l'ambiente di produzione serverless.
4. **Resend / PostHog** per email e analytics.

### Regole Base per lo Sviluppo Futuro
1. **Ambiente di Lavoro**: D'ora in poi, l'intero sviluppo e i comandi devono avvenire SOLO all'interno della cartella `gymbadgetracker-web`. Le cartelle vecchie (`backend`, `frontend`, `next`) servono solo come reference temporaneo (lettura codice in caso di dubbio sulle vecchie logiche di business).
2. **Next.js App Router**: Utilizza obbligatoriamente i Server Components di default. Usa `'use client'` solo nei componenti foglia che necessitano di interattività (es. form, bottoni, state management locale).
3. **Deploy Vercel Ready**: Ogni riga di codice dev'essere compatibile con l'ambiente Serverless di Vercel. Nessun file uploadato localmente, usare invece Supabase Storage per le immagini profilo/badge.
4. **Clean Code & Design Premium**: Il progetto richiede una veste grafica di livello, moderna, "wow". Animazioni fluide, glassmorphism, gradienti ben curati.

## 🗺 Roadmap a Breve Termine
- [x] Inizializzazione repository web pulita
- [x] Documentazione di contesto (questo file)
- [x] Generazione di un Mockup Grafico da seguire
- [ ] Implementazione layout di base e routing Next.js
- [ ] Configurazione setup DB generale per Auth e Database Schema
- [ ] Implementazione logiche di autenticazione e login
- [ ] Creazione componenti Dashboard (stats e badge views)

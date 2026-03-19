# GymBadgeTracker (B2B SaaS)

Piattaforma B2B as a Service per le palestre. 
Il sistema permette alle palestre clienti di caricare e analizzare i propri fogli Excel operativi, scalando i costi in base agli utilizzi (modello a crediti/utilizzi). L'obiettivo finale è offrire un servizio a pagamento per elaborare ed estrarre statistiche dai loro dati.

---

## Features Principali

- **Elaborazione Dati:** I clienti (palestre) possono caricare i file Excel per l'elaborazione rapida informatica.
- **Gestione a Crediti ("Utilizzi"):** Ogni account ha a disposizione un numero prefissato di utilizzi. L'analisi dei file è contingentata.
- **Pannello Admin Avanzato:** 
  - Gestione manuale degli account clienti (non è prevista la libera registrazione al pubblico).
  - Ricarica manuale dei crediti (utilizzi rimanenti) per ogni account palestra.
  - Log operativi dettagliati (chi ha fatto cosa, quali utenti si sono loggati di recente).
  - Statistiche globali di utilizzo del sistema.
- **Area Cliente Privata:** Dashboard per processare i file (usage page) e pagina riepilogativa con panoramica dati e statistiche.

## Stack Tecnologico
- **Next.js (App Router)** & **React**
- **Tailwind CSS**
- **MongoDB** (con Mongoose)

## Setup Locale

1. Installa le dipendenze:
   ```bash
   npm install
   ```
2. Configura le variabili d'ambiente copiando `.env.exemple` in `.env.local` e inserisci l'URI di MongoDB.
3. Avvia il server di sviluppo:
   ```bash
   npm run dev
   ```
Visita `http://localhost:3000`.

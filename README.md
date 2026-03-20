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

---

## 🔄 Flusso Operativo della Dashboard

Questa è la sequenza esatta che il cliente (palestra) segue ogni volta che elabora un file.

### Struttura del File Excel Atteso

Il file di input è un registro presenze con la seguente struttura (**9 colonne, ultime 3 vuote**):

| Col | Nome | Esempio |
|-----|------|---------|
| 1 | Num. Tessera | `12487` |
| 2 | Data | `01/01/2024` |
| 3 | Orario di ingresso | `00:18:22` |
| 4 | Cognome | `ROSSI` |
| 5 | Nome | `MARIO` |
| **6** | **Attività** *(colonna filtri)* | `STAFF`, `ABBONAMENTO`, ecc. |
| 7-9 | *(vuote — da ignorare nel parsing)* | — |

> La **colonna Attività (col. 6)** è quella su cui si basano i filtri. Non è la colonna fisica più a destra (che è vuota), ma la **prima colonna non vuota partendo dall'ultima**. Il sistema la individua automaticamente.

### Step 1 — Caricamento File & Rilevamento Fogli

L'utente trascina o seleziona uno o più file `.xlsx` nel box di upload.
Il sistema legge i **nomi dei fogli** (Sheets) presenti nel file in modo automatico:
- Se è presente **un solo foglio**, viene selezionato automaticamente e si passa allo Step 2.
- Se sono presenti **due o più fogli**, vengono visualizzati come schede/tab cliccabili. L'utente deve **selezionarne uno** prima di poter procedere.

### Step 2 — Scelta dei Filtri (Modal Obbligatoria)

Una volta selezionato il foglio, si abilita un tasto che apre una **modal obbligatoria per la selezione dei filtri**.

Il sistema legge tutti i **valori unici della colonna Attività** e li mostra nella modal **tutti pre-selezionati (spunta attiva)**.
L'utente può rimuovere la spunta da quelle che **non** vuole includere nell'elaborazione.
Solo dopo la conferma si abilita il tasto "Elabora".

### Step 3 — Elaborazione e Cronologia

Il tasto **"Elabora"** avvia l'elaborazione *(attualmente fittizia — non modifica il file in output)*.
Al termine, viene aggiunto un **record nella Cronologia** (pannello laterale destro) contenente:
- Nome del file originale + data/ora elaborazione
- Numero di righe totali e peso del file
- **Tasto "Download Originale"** — scarica il file `.xlsx` caricato.
- **Tasto "Download Elaborato"** — scarica il file `.xlsx` risultante.

---

## Stack Tecnologico
- **Next.js (App Router)** & **React**
- **Tailwind CSS**
- **MongoDB** (con Mongoose)
- **ExcelJS** — parsing server-side dei file Excel
- **JWT** — autenticazione e gestione sessioni sicure

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


"use client";

import { useLanguage } from "@/components/language-provider";

export default function CookiePage() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-start justify-start flex-1 px-6 max-w-3xl mx-auto py-20 w-full relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="glow-br opacity-30"></div>
      </div>

      <div className="w-full relative z-10">
        <h1 className="font-syne text-[36px] font-bold text-foreground mb-4">
          {t("legal.cookie_title")}
        </h1>
        <p className="text-[14px] text-muted-foreground mb-12 border-b border-border pb-6">
          {t("legal.last_updated")}
        </p>

        <div className="space-y-6 text-[15px] text-muted-foreground leading-relaxed">
          <p>Come richiesto dalla Direttiva e-Privacy (Cookie Law) e dal GDPR, spieghiamo come GymBadgeTracker utilizza i cookie.</p>
          
          <h2 className="text-[18px] font-bold text-foreground mt-8 mb-4">Cookie Essenziali / Tecnici</h2>
          <p>Utilizziamo cookie tecnici indispensabili per il funzionamento dell'applicazione B2B, in particolare per:</p>
          <ul className="list-disc pl-5 mt-2 space-y-2">
            <li>Gestione delle sessioni di autenticazione in modo sicuro (tramite cookie HttpOnly per la salvaguardia dei token).</li>
            <li>Memorizzazione della preferenza linguistica e del tema visivo (Light/Dark mode) in LocalStorage.</li>
            <li>Gestione del consenso ai cookie stessi in modo da non mostrare ripetutamente il banner.</li>
          </ul>
          <p className="mt-2 text-[14px] p-4 bg-white/5 border border-white/10 rounded-lg">Questi cookie non richiedono il consenso preventivo dell'utente in quanto strettamente necessari all'erogazione del servizio.</p>
          
          <h2 className="text-[18px] font-bold text-foreground mt-8 mb-4">Cookie di Terze Parti</h2>
          <p>Attualmente, GymBadgeTracker non implementa cookie di profilazione pubblicitaria di terze parti (come Facebook Pixel, Google Ads, ecc).</p>

          <p className="mt-12 pt-8 border-t border-border text-[14px]">
            Per gestire o revocare le preferenze del tuo browser, fai riferimento alla documentazione ufficiale del tuo programma di navigazione (Chrome, Safari, Firefox o Edge).
          </p>
        </div>
      </div>
    </div>
  );
}

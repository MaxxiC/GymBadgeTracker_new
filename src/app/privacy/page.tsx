"use client";

import { useLanguage } from "@/components/language-provider";

export default function PrivacyPage() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-start justify-start flex-1 px-6 max-w-3xl mx-auto py-20 w-full relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="glow-tl opacity-30"></div>
      </div>

      <div className="w-full relative z-10">
        <h1 className="font-syne text-[36px] font-bold text-foreground mb-4">
          {t("legal.privacy_title")}
        </h1>
        <p className="text-[14px] text-muted-foreground mb-12 border-b border-border pb-6">
          {t("legal.last_updated")}
        </p>

        <div className="space-y-6 text-[15px] text-muted-foreground leading-relaxed">
          <p>In GymBadgeTracker ci impegniamo a proteggere la privacy dei nostri clienti B2B e dei loro utenti finali. Questa informativa sulla privacy spiega come raccogliamo, utilizziamo e proteggiamo i tuoi dati.</p>
          
          <h2 className="text-[18px] font-bold text-foreground mt-8 mb-4">1. Dati Raccolti</h2>
          <p>Raccogliamo esclusivamente i dati operativi e gestionali (es. file Excel) caricati volontariamente dai nostri clienti, necessari per l'elaborazione delle dashboard.</p>
          
          <h2 className="text-[18px] font-bold text-foreground mt-8 mb-4">2. Uso dei Dati</h2>
          <p>I dati vengono elaborati al solo scopo di fornire le funzionalità SaaS contrattualizzate. Nessun dato viene venduto a terzi o utilizzato per profilazione commerciale o pubblicitaria.</p>
          
          <h2 className="text-[18px] font-bold text-foreground mt-8 mb-4">3. Sicurezza</h2>
          <p>Proteggiamo i file in transito e a riposo applicando i più elevati standard di sicurezza informatica. L'accesso ai server è limitato ai soli autorizzati tramite sistema RBAC (Role-Based Access Control) in infrastrutture conformi al GDPR.</p>

          <p className="mt-12 pt-8 border-t border-border text-[14px]">
            Per richieste relative al GDPR o per esercitare il Diritto all'Oblio, scrivi a: <a href="mailto:privacy@gymbadgetracker.com" className="text-primary hover:underline">privacy@gymbadgetracker.com</a>
          </p>
        </div>
      </div>
    </div>
  );
}

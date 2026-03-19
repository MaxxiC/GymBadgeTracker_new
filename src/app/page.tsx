"use client";

import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "@/components/language-provider";
import dynamic from "next/dynamic";

const DashboardPreviewModal = dynamic(() => import("@/components/DashboardPreviewModal"), {
  ssr: false,
});

export default function Home() {
  const { t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row items-center justify-between flex-1 px-10 gap-16 relative w-full max-w-7xl mx-auto py-12 md:py-0">
      
      {/* Glows specifically for Home */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="glow-tl"></div>
        <div className="glow-br"></div>
      </div>

      {/* Left Column (Hero) */}
      <div className="flex-1 max-w-xl z-10 w-full">
        <div className="inline-flex items-center gap-1.5 bg-primary/10 border border-primary/25 text-primary text-[11.5px] font-medium px-3 py-1 rounded-full mb-6">
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
          {t("home.pill")}
        </div>

        <h1 className="font-syne text-[40px] md:text-[52px] font-extrabold leading-[1.04] tracking-tight text-foreground mb-4">
          {t("home.title_1")}<br />
          <em className="not-italic text-primary">{t("home.title_2")}</em>
        </h1>

        <p className="text-[15.5px] font-light text-muted-foreground leading-relaxed mb-8 max-w-md">
          {t("home.subtitle")}
        </p>

        <div className="flex gap-2.5 items-center">
          <Link 
            href="/login" 
            className="px-6 py-2.5 bg-foreground text-background border-none rounded-lg text-[13.5px] font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            {t("home.cta_primary")}
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="stroke-background text-background">
              <path d="M2 6.5h9M7.5 3l3.5 3.5-3.5 3.5" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          <Link 
            href="/about"
            className="px-5 py-2.5 bg-transparent border border-border rounded-lg text-[13.5px] text-muted-foreground hover:text-foreground transition-colors"
          >
            {t("home.cta_secondary")}
          </Link>
        </div>
      </div>

      {/* Right Column (Stats/Preview) */}
      <div className="flex-shrink-0 flex flex-col gap-2.5 w-full md:w-[280px] z-10">
        
        <div className="bg-card border border-border rounded-xl p-4 flex items-center gap-3.5 shadow-sm">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 bg-primary/10">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <rect x="2" y="2" width="14" height="14" rx="2" stroke="var(--primary)" strokeWidth="1.2"/>
              <line x1="5" y1="6" x2="13" y2="6" stroke="var(--primary)" strokeWidth="1.1" strokeLinecap="round"/>
              <line x1="5" y1="9" x2="10" y2="9" stroke="var(--primary)" strokeWidth="1.1" strokeLinecap="round"/>
              <line x1="5" y1="12" x2="7" y2="12" stroke="var(--primary)" strokeWidth="1.1" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <div className="font-syne text-[22px] font-bold text-foreground leading-none">12k+</div>
            <div className="text-[12px] text-muted-foreground mt-0.5">{t("home.stats_files")}</div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-4 flex items-center gap-3.5 shadow-sm">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 bg-accent/10">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="9" cy="7" r="3" stroke="var(--accent)" strokeWidth="1.2"/>
              <path d="M3 15c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="var(--accent)" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <div className="font-syne text-[22px] font-bold text-foreground leading-none">340k+</div>
            <div className="text-[12px] text-muted-foreground mt-0.5">{t("home.stats_rows")}</div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-4 shadow-sm">
          <p className="text-[11px] font-medium tracking-wider uppercase text-muted-foreground mb-3">{t("home.how_it_works")}</p>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-full bg-secondary border border-border text-[11px] font-medium text-muted-foreground flex items-center justify-center flex-shrink-0">1</div>
              <span className="text-[12.5px] text-muted-foreground">{t("home.step_1")}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-full bg-secondary border border-border text-[11px] font-medium text-muted-foreground flex items-center justify-center flex-shrink-0">2</div>
              <span className="text-[12.5px] text-muted-foreground">{t("home.step_2")}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-full bg-primary/20 border border-primary/30 text-[11px] font-bold text-primary flex items-center justify-center flex-shrink-0">3</div>
              <span className="text-[12.5px] text-foreground font-medium">{t("home.step_3")}</span>
            </div>
          </div>
        </div>

        <button 
          onClick={() => setIsModalOpen(true)}
          className="w-full p-2.5 bg-primary/10 border border-primary/20 rounded-lg text-[13px] font-medium text-primary text-center hover:bg-primary/15 transition-colors"
        >
          {t("home.preview")}
        </button>
      </div>

      {/* Dashboard Preview Modal */}
      {isModalOpen && (
        <DashboardPreviewModal onClose={() => setIsModalOpen(false)} />
      )}

    </div>
  );
}

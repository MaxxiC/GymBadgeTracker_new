"use client";

import { useLanguage } from "@/components/language-provider";
import { MoveRight } from "lucide-react";
import Link from "next/link";

export default function FeaturesPage() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-start flex-1 px-6 md:px-10 max-w-7xl mx-auto py-16 w-full relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="glow-tl opacity-50"></div>
      </div>
      
      <div className="max-w-3xl text-center mb-16 z-10">
        <h1 className="font-syne text-[40px] md:text-[52px] font-extrabold tracking-tight text-foreground mb-4">
          {t("features.title")}
        </h1>
        <p className="text-[16px] text-muted-foreground leading-relaxed max-w-xl mx-auto">
          {t("features.subtitle")}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full z-10">
        
        {/* Feature 1 */}
        <div className="bg-card border border-border rounded-2xl p-6 lg:p-8 hover:border-primary/50 transition-colors group">
          <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
          </div>
          <h3 className="font-syne text-[20px] font-bold text-foreground mb-3">{t("features.feature_1_title")}</h3>
          <p className="text-[14px] text-muted-foreground leading-relaxed mb-6">{t("features.feature_1_desc")}</p>
          <div className="w-full aspect-[4/3] rounded-lg bg-background border border-border flex items-center justify-center text-[12px] text-muted-foreground/50">
            [ Screenshot Placeholder ]
          </div>
        </div>

        {/* Feature 2 */}
        <div className="bg-card border border-border rounded-2xl p-6 lg:p-8 hover:border-accent/50 transition-colors group">
          <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform">
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
          </div>
          <h3 className="font-syne text-[20px] font-bold text-foreground mb-3">{t("features.feature_2_title")}</h3>
          <p className="text-[14px] text-muted-foreground leading-relaxed mb-6">{t("features.feature_2_desc")}</p>
          <div className="w-full aspect-[4/3] rounded-lg bg-background border border-border flex items-center justify-center text-[12px] text-muted-foreground/50">
            [ Screenshot Placeholder ]
          </div>
        </div>

        {/* Feature 3 */}
        <div className="bg-card border border-border rounded-2xl p-6 lg:p-8 hover:border-primary/50 transition-colors group">
          <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
          </div>
          <h3 className="font-syne text-[20px] font-bold text-foreground mb-3">{t("features.feature_3_title")}</h3>
          <p className="text-[14px] text-muted-foreground leading-relaxed mb-6">{t("features.feature_3_desc")}</p>
          <div className="w-full aspect-[4/3] rounded-lg bg-background border border-border flex items-center justify-center text-[12px] text-muted-foreground/50">
            [ Screenshot Placeholder ]
          </div>
        </div>

      </div>

      <div className="mt-16 z-10">
        <Link href="/login" className="flex items-center gap-2 text-[14px] font-medium text-foreground hover:text-primary transition-colors">
          {t("home.cta_primary")} <MoveRight size={16} />
        </Link>
      </div>

    </div>
  );
}

"use client";

import { useLanguage } from "@/components/language-provider";

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-start flex-1 px-6 max-w-3xl mx-auto py-20 w-full relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="glow-br opacity-50"></div>
      </div>
      
      <div className="w-full text-center z-10">
        <h1 className="font-syne text-[40px] md:text-[52px] font-extrabold tracking-tight text-foreground mb-6">
          {t("about.title")}
        </h1>
        <p className="text-[18px] text-primary font-medium mb-12">
          {t("about.subtitle")}
        </p>

        <div className="text-left space-y-6 text-[15px] text-muted-foreground leading-relaxed bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8">
          <p>
            {t("about.content_1")}
          </p>
          <p>
            {t("about.content_2")}
          </p>
          <p className="pt-4 border-t border-border/50">
            <strong>Contact:</strong> admin@gymbadgetracker.com
          </p>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/components/language-provider";
import { X } from "lucide-react";

export default function CookieBanner() {
  const { t } = useLanguage();
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if consent is already given on client mount
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie_consent", "accepted");
    setShowBanner(false);
  };

  const declineCookies = () => {
    localStorage.setItem("cookie_consent", "declined");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6 pb-6 animate-modal-enter pointer-events-none">
      <div className="max-w-4xl mx-auto bg-background/95 backdrop-blur-xl border border-border rounded-2xl shadow-2xl p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8 pointer-events-auto">
        
        <div className="flex-1 text-[13px] md:text-[14px] text-muted-foreground leading-relaxed">
          {t("cookie_banner.message")}{" "}
          <Link href="/cookie" className="text-primary hover:underline font-medium">
            {t("cookie_banner.policy")}
          </Link>.
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto flex-shrink-0">
          <button 
            onClick={declineCookies}
            className="flex-1 md:flex-none px-4 py-2 border border-border rounded-lg text-[13px] font-medium text-muted-foreground hover:bg-white/5 transition-colors"
          >
            {t("cookie_banner.decline")}
          </button>
          
          <button 
            onClick={acceptCookies}
            className="flex-1 md:flex-none px-5 py-2 border border-primary/20 bg-primary/10 text-primary rounded-lg text-[13px] font-bold hover:bg-primary/20 transition-colors"
          >
            {t("cookie_banner.accept")}
          </button>
          
          <button 
            onClick={declineCookies}
            className="p-2 ml-1 text-muted-foreground hover:text-foreground md:hidden"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>

      </div>
    </div>
  );
}

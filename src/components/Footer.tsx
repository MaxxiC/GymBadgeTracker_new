"use client";

import Link from "next/link";
import { useLanguage } from "@/components/language-provider";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="px-10 py-4 border-t border-border flex justify-between items-center relative z-[2] flex-shrink-0 bg-background/50 backdrop-blur-sm">
      <span className="text-[11.5px] text-muted-foreground">
        © {currentYear} GymBadgeTracker
      </span>
      <div className="flex gap-4">
        <Link href="/about" className="text-[11.5px] text-muted-foreground hover:text-foreground transition-colors">
          {t("footer.about")}
        </Link>
        <Link href="/privacy" className="text-[11.5px] text-muted-foreground hover:text-foreground transition-colors">
          {t("footer.privacy")}
        </Link>
        <Link href="/cookie" className="text-[11.5px] text-muted-foreground hover:text-foreground transition-colors">
          {t("footer.cookie")}
        </Link>
      </div>
    </footer>
  );
}

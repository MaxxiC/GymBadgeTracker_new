"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Moon, Sun, Monitor, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "@/components/language-provider";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const { locale, setLocale, t } = useLanguage();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  // Fake auth check for UI
  const isAuthenticated = pathname?.includes("/dashboard");

  // Evitare hydration mismatch con next-themes
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b border-border relative z-10 flex-shrink-0 bg-background/50 backdrop-blur-md">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2.5">
        <div className="w-[30px] h-[30px] bg-white/5 border border-white/10 rounded-lg flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="1" y="1" width="6" height="6" rx="1.5" fill="var(--primary)" />
            <rect x="9" y="1" width="6" height="6" rx="1.5" fill="var(--primary)" fillOpacity="0.35" />
            <rect x="1" y="9" width="6" height="6" rx="1.5" fill="var(--primary)" fillOpacity="0.35" />
            <rect x="9" y="9" width="6" height="6" rx="1.5" fill="var(--primary)" fillOpacity="0.15" />
          </svg>
        </div>
        <span className="font-syne font-bold text-[15px] tracking-tight text-foreground">
          GymBadgeTracker
        </span>
      </Link>

      {/* Links Center (Hidden on mobile) */}
      <div className="hidden md:flex gap-6 items-center">
        <Link href="/dashboard" className="text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors">
          {t("nav.workspace")}
        </Link>
        <Link href="/badges" className="text-[13px] text-muted-foreground hover:text-foreground transition-colors">
          {t("nav.badges")}
        </Link>
        <Link href="/info" className="text-[13px] text-muted-foreground hover:text-foreground transition-colors">
          {t("nav.info")}
        </Link>
      </div>

      {/* Right Actions */}
      <div className="flex gap-2 items-center">
        {/* Mock Language switch */}
        <div className="hidden sm:flex gap-1 items-center px-2.5 py-1 border border-border rounded-full text-xs text-muted-foreground">
          <button 
            className={`hover:text-foreground ${locale === "it" ? "font-medium text-foreground" : ""}`}
            onClick={() => setLocale("it")}
          >
            ITA
          </button>
          <span className="opacity-25">/</span>
          <button 
            className={`hover:text-foreground ${locale === "en" ? "font-medium text-foreground" : ""}`}
            onClick={() => setLocale("en")}
          >
            ENG
          </button>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="w-[30px] h-[30px] border border-border rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground bg-transparent transition-colors"
          aria-label="Toggle theme"
        >
          {mounted ? (
            theme === "dark" ? <Moon size={14} /> : <Sun size={14} />
          ) : (
            <div className="w-3 h-3 rounded-full border border-current" />
          )}
        </button>

        {/* Mobile menu toggle */}
        <button className="md:hidden w-[30px] h-[30px] border border-border rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground bg-transparent">
          <Menu size={16} />
        </button>

        {/* Login Btn OR Avatar */}
        {!isAuthenticated ? (
          <Link 
            href="/login"
            className="hidden sm:block px-4 py-1.5 border border-white/15 dark:border-white/10 rounded-lg text-[13px] bg-white/5 text-foreground hover:bg-white/10 transition-colors ml-2"
          >
            {t("nav.login")}
          </Link>
        ) : (
          <div className="hidden sm:flex items-center gap-2 pl-1 pr-3 py-1 ml-2 border border-white/10 rounded-full cursor-pointer bg-white/[0.03] hover:bg-white/5 transition-colors">
            <div className="w-6 h-6 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-[10px] font-bold text-primary">
              MC
            </div>
            <span className="text-[12.5px] font-medium text-foreground">Marco C.</span>
            <span className="text-[10px] text-muted-foreground/60 ml-0.5">▼</span>
          </div>
        )}
      </div>
    </nav>
  );
}

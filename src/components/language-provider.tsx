"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import it from "../locales/it.json";
import en from "../locales/en.json";

type Locale = "it" | "en";
type Translations = typeof it;

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string | any;
}

const dictionaries: Record<Locale, Translations> = { it, en };

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("it");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("gb-locale") as Locale;
    if (saved && (saved === "it" || saved === "en")) {
      setLocaleState(saved);
    }
    setMounted(true);
  }, []);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    localStorage.setItem("gb-locale", l);
  };

  const t = (path: string) => {
    const keys = path.split(".");
    let current: any = dictionaries[locale];
    
    for (const key of keys) {
      if (current[key] === undefined) return path; // Return key path if not found
      current = current[key];
    }
    
    return current;
  };

  // Prevent hydration mismatch by rendering default quickly, then swapping
  return (
    <LanguageContext.Provider value={{ locale: mounted ? locale : "it", setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

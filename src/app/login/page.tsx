"use client";

import { useLanguage } from "@/components/language-provider";
import Link from "next/link";
import { useState } from "react";
import { Mail, Lock, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: implement actual login logic connecting to POST /api/auth
    console.log("Login attempted with", { email });
  };

  return (
    <div className="flex flex-col items-center justify-center flex-1 px-6 w-full relative z-10 py-12">
      
      {/* Subtle Glows for Auth Page */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="glow-tl opacity-60"></div>
        <div className="glow-br opacity-50"></div>
      </div>

      <div className="w-full max-w-[400px] z-10">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-sm">
            <svg width="24" height="24" viewBox="0 0 16 16" fill="none">
              <rect x="1" y="1" width="6" height="6" rx="1.5" fill="var(--primary)" />
              <rect x="9" y="1" width="6" height="6" rx="1.5" fill="var(--primary)" fillOpacity="0.35" />
              <rect x="1" y="9" width="6" height="6" rx="1.5" fill="var(--primary)" fillOpacity="0.35" />
              <rect x="9" y="9" width="6" height="6" rx="1.5" fill="var(--primary)" fillOpacity="0.15" />
            </svg>
          </div>
          <h1 className="font-syne text-[28px] font-bold text-foreground tracking-tight mb-2">
            {t("login.title")}
          </h1>
          <p className="text-[14px] text-muted-foreground">
            {t("login.subtitle")}
          </p>
        </div>

        {/* Login Form (Glassmorphism card) */}
        <form 
          onSubmit={handleSubmit}
          className="glass-effect rounded-2xl p-6 md:p-8 flex flex-col gap-5 shadow-2xl relative"
        >
          {/* Email Input */}
          <div className="flex flex-col gap-2">
            <label className="text-[12px] font-medium text-foreground ml-1" htmlFor="email">
              {t("login.email_label")}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground/60">
                <Mail size={16} strokeWidth={1.5} />
              </div>
              <input 
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                placeholder={t("login.email_placeholder")}
                className="w-full pl-10 pr-4 py-3 bg-white/[0.03] hover:bg-white/[0.05] border border-white/10 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none rounded-xl text-[14px] text-foreground transition-all placeholder:text-muted-foreground/40"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-end mb-0.5 ml-1">
              <label className="text-[12px] font-medium text-foreground" htmlFor="password">
                {t("login.password_label")}
              </label>
              <a href="#" className="text-[11.5px] text-primary hover:text-primary/80 transition-colors">
                {t("login.forgot")}
              </a>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground/60">
                <Lock size={16} strokeWidth={1.5} />
              </div>
              <input 
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                placeholder={t("login.password_placeholder")}
                className="w-full pl-10 pr-4 py-3 bg-white/[0.03] hover:bg-white/[0.05] border border-white/10 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none rounded-xl text-[14px] text-foreground transition-all placeholder:text-muted-foreground/40"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit"
            className="w-full mt-2 py-3.5 bg-foreground text-background font-medium rounded-xl text-[14px] hover:opacity-90 transition-opacity flex items-center justify-center gap-2 group"
          >
            {t("login.submit")}
            <ArrowRight size={16} strokeWidth={2} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        {/* Footer info */}
        <div className="mt-8 text-center text-[13px] text-muted-foreground flex gap-1.5 justify-center">
          <span>{t("login.no_account")}</span>
          <a href="#" className="text-foreground font-medium hover:underline decoration-white/30 underline-offset-4 transition-all">
            {t("login.contact_admin")}
          </a>
        </div>

      </div>
    </div>
  );
}

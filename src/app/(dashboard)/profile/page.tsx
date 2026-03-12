"use client";

import { useLanguage } from "@/components/language-provider";
import { useEffect, useState } from "react";
import { User, Mail, Shield, Calendar, Activity, LogOut } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  const { t } = useLanguage();
  const [userData, setUserData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          if (data.authenticated && data.user) {
            setUserData(data.user);
          }
        }
      } catch (err) {
        console.error("Failed to fetch user data", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      window.location.href = "/login";
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-syne font-bold text-foreground mb-2">
            {t("profile.title")}
          </h1>
          <p className="text-muted-foreground text-[14px]">
            {t("profile.subtitle")}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - Main Info */}
        <div className="md:col-span-1 space-y-6">
          <div className="glass-effect rounded-2xl p-6 flex flex-col items-center text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="w-24 h-24 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center text-3xl font-bold text-primary mb-4 shadow-[0_0_30px_rgba(var(--primary-rgb),0.2)]">
              {userData?.name ? userData.name.substring(0, 2).toUpperCase() : "US"}
            </div>
            
            <h2 className="text-xl font-bold text-foreground mb-1">{userData?.name || "Utente"}</h2>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-bold uppercase tracking-wider mb-6">
              <Shield size={12} />
              {userData?.role || "standard"}
            </div>

            <button 
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-destructive/20 text-destructive hover:bg-destructive text-[13px] font-medium transition-all group-hover:border-destructive/40"
            >
              <LogOut size={16} />
              {t("nav.logout")}
            </button>
          </div>
        </div>

        {/* Right Column - Details */}
        <div className="md:col-span-2 space-y-6">
          <div className="glass-effect rounded-2xl p-6">
            <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
              <User size={18} className="text-primary" />
              {t("profile.account_info")}
            </h3>
            
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="flex items-center gap-3 text-muted-foreground mb-2 sm:mb-0">
                  <User size={16} />
                  <span className="text-[14px]">{t("profile.name")}</span>
                </div>
                <span className="text-[14px] font-medium text-foreground">{userData?.name || "-"}</span>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="flex items-center gap-3 text-muted-foreground mb-2 sm:mb-0">
                  <Mail size={16} />
                  <span className="text-[14px]">{t("profile.email")}</span>
                </div>
                <span className="text-[14px] font-medium text-foreground">{userData?.email || "-"}</span>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="flex items-center gap-3 text-muted-foreground mb-2 sm:mb-0">
                  <Shield size={16} />
                  <span className="text-[14px]">{t("profile.role")}</span>
                </div>
                <span className="text-[14px] font-medium text-foreground capitalize">{userData?.role || "-"}</span>
              </div>
            </div>
          </div>

          <div className="glass-effect rounded-2xl p-6 hidden">
             {/* Statistiche future */}
            <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
              <Activity size={18} className="text-primary" />
              {t("profile.stats")}
            </h3>
            <div className="grid grid-cols-2 gap-4">
               <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-center">
                 <div className="text-2xl font-bold text-foreground mb-1">0</div>
                 <div className="text-[12px] text-muted-foreground">{t("profile.total_process")}</div>
               </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

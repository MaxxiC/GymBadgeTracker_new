"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Moon, Sun, Monitor, Menu, User, LogOut, ChevronDown, X, ShieldAlert } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useLanguage } from "@/components/language-provider";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const { locale, setLocale, t } = useLanguage();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [userData, setUserData] = useState<{ name: string, email: string, role?: string } | null>(null);

  // Layout states
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Fake auth check for UI
  const isAuthenticated = pathname?.includes("/dashboard") || pathname?.includes("/profile");

  useEffect(() => {
    setMounted(true);

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
        // Silently fail intentionally to avoid console errors
      }
    };

    fetchUser();
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      window.location.href = "/login";
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  // Dynamic Navigation Links Logic
  const navLinks = [

    { href: "/dashboard", label: t("nav.workspace"), icon: <Monitor size={18} /> },
    { href: "/features", label: t("nav.features") || "Features" },
    { href: "/info", label: t("nav.info") },
    ...(userData?.role === "admin" ? [
      { href: "/admin", label: t("nav.admin"), icon: <ShieldAlert size={18} />, isAdmin: true }
    ] : []),
  ];

  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b border-border relative z-50 flex-shrink-0 bg-background/50 backdrop-blur-md">
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
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`text-[13px] transition-colors flex items-center gap-1.5 ${pathname === link.href
                ? 'text-primary font-bold'
                : link.isAdmin
                  ? 'text-accent font-bold hover:opacity-80'
                  : 'text-muted-foreground font-medium hover:text-foreground'
              }`}
          >
            {link.label}
          </Link>
        ))}
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
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden w-[30px] h-[30px] border border-border rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground bg-transparent transition-colors"
        >
          {isMobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
        </button>

        {/* Login Btn OR Avatar */}
        {!userData && !isAuthenticated ? (
          <Link
            href="/login"
            className="hidden sm:block px-4 py-1.5 border border-white/15 dark:border-white/10 rounded-lg text-[13px] bg-white/5 text-foreground hover:bg-white/10 transition-colors ml-2"
          >
            {t("nav.login")}
          </Link>
        ) : (
          <div className="relative hidden sm:block" ref={userMenuRef}>
            <div
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center gap-2 pl-1 pr-3 py-1 ml-2 border border-white/10 rounded-full cursor-pointer bg-white/[0.03] hover:bg-white/5 transition-colors"
            >
              <div className="w-6 h-6 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-[10px] font-bold text-primary uppercase">
                {userData?.name ? userData.name.substring(0, 2) : "US"}
              </div>
              <span className="text-[12.5px] font-medium text-foreground select-none">
                {userData?.name || "Utente"}
              </span>
              <ChevronDown size={14} className={`text-muted-foreground/60 transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
            </div>

            {/* Desktop User Dropdown */}
            <div
              className={`absolute right-0 top-full mt-2 w-56 bg-background/95 backdrop-blur-xl border border-border rounded-xl shadow-2xl py-1.5 z-50 transition-all duration-300 origin-top-right ${isUserMenuOpen ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible pointer-events-none"
                }`}
            >
              <div className="px-4 py-2 mb-1 border-b border-border">
                <p className="text-[13px] font-bold text-foreground truncate flex items-center gap-1.5">
                  {userData?.name || "Utente"}
                  {userData?.role === 'admin' && <ShieldAlert size={12} className="text-accent" />}
                </p>
                <p className="text-[11px] text-muted-foreground truncate">{userData?.email || "Nessuna email"}</p>
              </div>
              <Link
                href="/profile"
                onClick={() => setIsUserMenuOpen(false)}
                className="flex items-center gap-2 px-4 py-2.5 text-[13px] text-muted-foreground hover:text-foreground hover:bg-white/[0.03] transition-colors"
              >
                <User size={15} />
                {t("nav.profile")}
              </Link>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-2.5 text-[13px] text-destructive hover:bg-destructive/10 transition-colors"
              >
                <LogOut size={15} />
                {t("nav.logout")}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu Dropdown View */}
      <div
        className={`absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border flex flex-col gap-3 md:hidden shadow-2xl overflow-hidden transition-all duration-300 ease-in-out z-40 ${isMobileMenuOpen
          ? "max-h-[500px] opacity-100 p-4"
          : "max-h-0 opacity-0 p-0 pointer-events-none"
          }`}
      >
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setIsMobileMenuOpen(false)}
            className={`px-4 py-3 rounded-xl flex items-center gap-3 transition-colors ${pathname === link.href
                ? 'bg-primary/10 text-primary font-bold'
                : link.isAdmin
                  ? 'bg-accent/10 text-accent font-bold'
                  : 'hover:bg-white/[0.03] text-muted-foreground hover:text-foreground font-medium'
              }`}
          >
            {link.icon && link.icon}
            {link.label}
          </Link>
        ))}

        {(userData || isAuthenticated) ? (
          <div className="pt-3 mt-1 border-t border-border flex flex-col gap-1">
            <div className="px-4 pb-2 mb-1">
              <p className="text-[14px] font-bold text-foreground flex items-center gap-1.5">
                {userData?.name || "Utente"}
                {userData?.role === 'admin' && <ShieldAlert size={12} className="text-accent" />}
              </p>
              <p className="text-[12px] text-muted-foreground">{userData?.email}</p>
            </div>
            <Link
              href="/profile"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-4 py-3 rounded-xl hover:bg-white/[0.03] text-foreground font-medium flex items-center gap-3 transition-colors"
            >
              <User size={18} />
              {t("nav.profile")}
            </Link>
            <button
              onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
              className="px-4 py-3 text-left rounded-xl hover:bg-destructive/10 text-destructive font-bold flex items-center gap-3 transition-colors w-full"
            >
              <LogOut size={18} />
              {t("nav.logout")}
            </button>
          </div>
        ) : (
          <Link
            href="/login"
            onClick={() => setIsMobileMenuOpen(false)}
            className="mt-2 px-4 py-3 bg-foreground text-background text-center rounded-xl font-bold flex justify-center w-full"
          >
            {t("nav.login")}
          </Link>
        )}
      </div>
    </nav>
  );
}

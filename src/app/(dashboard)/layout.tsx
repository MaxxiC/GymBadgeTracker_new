"use client";
import React from "react";
import { useLanguage } from "@/components/language-provider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1 flex flex-col w-full h-full relative z-10 overflow-hidden bg-[#111118]">
      {/* Glows for Dashboard */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="glow-tl opacity-70" style={{ top: '-150px', left: '-120px' }}></div>
        <div className="glow-br opacity-60" style={{ bottom: '-100px', right: '-80px' }}></div>
      </div>
      
      {/* Main App Container spanning 100% height minus navbar */}
      <div className="flex flex-1 overflow-hidden relative z-10 mx-auto max-w-[1400px] w-full">
        {children}
      </div>
    </div>
  );
}

"use client";

import { useLanguage } from "./language-provider";

interface DashboardPreviewModalProps {
  onClose: () => void;
}

export default function DashboardPreviewModal({ onClose }: DashboardPreviewModalProps) {
  const { t } = useLanguage();

  return (
    <div 
      className="fixed inset-0 bg-[#08080e]/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
      onClick={onClose}
      style={{ animation: "overlayEnter 0.25s ease-out forwards" }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes overlayEnter { from { opacity: 0; } to { opacity: 1; } }
        @keyframes modalEnter { from { opacity: 0; transform: scale(0.95) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } }
      `}} />
      <div 
        className="bg-[#16161e] border border-white/10 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 md:p-8 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: "modalEnter 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="font-syne text-[18px] font-bold text-foreground block">{t("dashboard.title_upload")}</span>
            <span className="text-[13px] text-muted-foreground">Demo statica della Dashboard</span>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/10 bg-white/5 text-muted-foreground hover:text-foreground transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M13 1L1 13M1 1l12 12" />
            </svg>
          </button>
        </div>

        {/* Simulated UI Area */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium tracking-widest uppercase text-muted-foreground/60">{t("dashboard.title_upload")}</span>
          </div>
          
          {/* Upload Zone */}
          <div className="flex gap-4">
            <div className="flex-1 border border-dashed border-white/10 rounded-xl p-8 flex flex-col items-center justify-center gap-2.5 bg-white/[0.015]">
              <div className="w-10 h-10 border border-white/10 rounded-xl flex items-center justify-center bg-white/5 mb-1">
                <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                  <path d="M8 3v8M5 6l3-3 3 3" stroke="rgba(232,232,226,0.6)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12h12" stroke="rgba(232,232,226,0.6)" strokeWidth="1.3" strokeLinecap="round"/>
                </svg>
              </div>
              <span className="text-[14px] font-medium text-foreground">{t("dashboard.upload_zone")}</span>
              <span className="text-[12px] text-muted-foreground">{t("dashboard.upload_reqs")}</span>
            </div>
          </div>

          {/* Loaded File Mock */}
          <div className="bg-white/[0.02] border border-white/5 rounded-xl p-5">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold px-2 py-1 bg-primary/10 text-primary border border-primary/20 rounded">XLSX</span>
                <div>
                  <div className="text-[14.5px] font-medium text-foreground">dati_maggio_2025.xlsx</div>
                  <div className="text-[12px] text-muted-foreground mt-0.5">142 KB · caricato adesso</div>
                </div>
              </div>
              <div className="flex gap-2">
                  <button className="px-3.5 py-1.5 text-[12.5px] font-medium border border-white/10 text-muted-foreground rounded-lg hover:bg-white/5">{t("dashboard.file_remove")}</button>
                  <button className="px-3.5 py-1.5 text-[12.5px] font-medium border border-primary/20 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors">{t("dashboard.file_process")}</button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white/[0.025] rounded-lg p-3">
                <div className="text-[11px] text-muted-foreground/60 mb-1">{t("dashboard.rows")}</div>
                <div className="text-[15px] font-medium text-foreground">1.248</div>
              </div>
              <div className="bg-white/[0.025] rounded-lg p-3">
                <div className="text-[11px] text-muted-foreground/60 mb-1">{t("dashboard.cols")}</div>
                <div className="text-[15px] font-medium text-foreground">14</div>
              </div>
              <div className="bg-white/[0.025] rounded-lg p-3">
                <div className="text-[11px] text-muted-foreground/60 mb-1">{t("dashboard.sheets_found")}</div>
                <div className="text-[15px] font-medium text-foreground">3</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

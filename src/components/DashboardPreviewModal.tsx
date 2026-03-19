"use client";

import { useLanguage } from "./language-provider";
import { X, UploadCloud, FileSpreadsheet } from "lucide-react";

interface DashboardPreviewModalProps {
  onClose: () => void;
}

export default function DashboardPreviewModal({ onClose }: DashboardPreviewModalProps) {
  const { t } = useLanguage();

  return (
    <div 
      className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
      style={{ animation: "overlayEnter 0.25s ease-out forwards" }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes overlayEnter { from { opacity: 0; } to { opacity: 1; } }
        @keyframes modalEnter { from { opacity: 0; transform: scale(0.95) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } }
      `}} />
      <div 
        className="bg-card border border-border rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-5 md:p-8 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: "modalEnter 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="font-syne text-[18px] md:text-[20px] font-bold text-foreground block">{t("dashboard.title_upload")}</span>
            <span className="text-[12px] md:text-[13px] text-muted-foreground">Demo statica della Dashboard</span>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-border bg-muted/20 text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors flex-shrink-0"
          >
            <X size={16} />
          </button>
        </div>

        {/* Simulated UI Area */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold tracking-widest uppercase text-muted-foreground">{t("dashboard.title_upload")}</span>
          </div>
          
          {/* Upload Zone */}
          <div className="flex flex-col border border-dashed border-border rounded-xl p-6 md:p-8 items-center justify-center gap-2.5 bg-muted/10 hover:bg-muted/20 transition-colors">
            <div className="w-12 h-12 border border-border rounded-xl flex items-center justify-center bg-background shadow-sm mb-1 text-muted-foreground">
              <UploadCloud size={24} />
            </div>
            <span className="text-[14px] font-medium text-foreground text-center">{t("dashboard.upload_zone")}</span>
            <span className="text-[12px] text-muted-foreground text-center px-4">{t("dashboard.upload_reqs")}</span>
          </div>

          {/* Loaded File Mock */}
          <div className="bg-muted/10 border border-border rounded-xl p-4 md:p-5 mt-2">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary flex-shrink-0">
                  <FileSpreadsheet size={20} />
                </div>
                <div className="min-w-0">
                  <div className="text-[14px] font-bold text-foreground truncate">dati_maggio_2025.xlsx</div>
                  <div className="text-[12px] text-muted-foreground mt-0.5">142 KB · caricato adesso</div>
                </div>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                  <button className="flex-1 sm:flex-none px-3.5 py-2 text-[12.5px] font-medium border border-border text-muted-foreground rounded-lg hover:bg-muted/30 transition-colors">{t("dashboard.file_remove")}</button>
                  <button className="flex-1 sm:flex-none px-4 py-2 text-[12.5px] font-bold border border-primary/20 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors">{t("dashboard.file_process")}</button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-background border border-border rounded-lg p-3">
                <div className="text-[11px] font-medium text-muted-foreground mb-1 uppercase tracking-wide">{t("dashboard.rows")}</div>
                <div className="text-[16px] font-bold text-foreground">1.248</div>
              </div>
              <div className="bg-background border border-border rounded-lg p-3">
                <div className="text-[11px] font-medium text-muted-foreground mb-1 uppercase tracking-wide">{t("dashboard.cols")}</div>
                <div className="text-[16px] font-bold text-foreground">14</div>
              </div>
              <div className="bg-background border border-border rounded-lg p-3">
                <div className="text-[11px] font-medium text-muted-foreground mb-1 uppercase tracking-wide">{t("dashboard.sheets_found")}</div>
                <div className="text-[16px] font-bold text-foreground">3</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

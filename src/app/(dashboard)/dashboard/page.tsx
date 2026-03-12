"use client";

import React, { useState } from "react";
import { useLanguage } from "@/components/language-provider";
import { UploadCloud, FileSpreadsheet, Download, RefreshCw, X, ChevronDown, CheckCircle2, Clock } from "lucide-react";

export default function DashboardPage() {
  const { t } = useLanguage();
  
  // Fake states for UI Demonstration
  const [hasFile, setHasFile] = useState(true); // set true to show the "file loaded" state by default for the mockup
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [autoHeader, setAutoHeader] = useState(true);
  const [filterEmpty, setFilterEmpty] = useState(true);

  return (
    <>
      {/* Left Panel - Upload & Current Action */}
      <div className="flex-1 flex flex-col p-6 md:p-8 overflow-y-auto">
        
        {/* Header Section */}
        <div className="mb-4 flex items-center justify-between">
          <span className="text-[11px] font-medium tracking-[0.07em] uppercase text-muted-foreground/50">
            {t("dashboard.title_upload")}
          </span>
        </div>

        {/* Upload Zone */}
        {!hasFile ? (
          <div 
            className="w-full border border-dashed border-white/10 rounded-2xl p-10 flex flex-col items-center justify-center gap-3 bg-white/[0.015] hover:border-primary/30 transition-colors cursor-pointer group"
            onClick={() => setHasFile(true)}
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 group-hover:bg-primary/10 group-hover:border-primary/20 transition-colors">
              <UploadCloud size={24} className="text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <span className="text-[14px] font-medium text-foreground">
              {t("dashboard.upload_zone")}
            </span>
            <span className="text-[12px] text-muted-foreground/60">
              {t("dashboard.upload_reqs")}
            </span>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {/* Top row with Add btn if you want to upload another */}
            <div className="flex gap-3">
              <div 
                className="flex-1 border border-dashed border-white/10 rounded-xl p-6 flex flex-col items-center justify-center gap-2 bg-white/[0.015] hover:border-primary/30 transition-colors cursor-pointer group min-h-[110px]"
                onClick={() => setHasFile(false)} // just for demo toggle
              >
                <div className="w-9 h-9 border border-white/10 rounded-lg flex items-center justify-center bg-white/5 mb-1 group-hover:bg-primary/10 group-hover:border-primary/20 transition-colors">
                  <UploadCloud size={18} className="text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <span className="text-[13px] font-medium text-foreground">{t("dashboard.upload_zone")}</span>
                <span className="text-[11.5px] text-muted-foreground/60">{t("dashboard.upload_reqs")}</span>
              </div>
              
              <button className="w-[48px] h-[110px] border border-white/10 rounded-xl bg-white/[0.03] flex items-center justify-center cursor-pointer flex-shrink-0 text-muted-foreground hover:border-primary/30 hover:text-primary hover:bg-primary/5 transition-all text-2xl font-light">
                +
              </button>
            </div>

            {/* Loaded File Card */}
            <div className="bg-white/[0.03] border border-white/5 rounded-xl p-5 shadow-lg relative overflow-hidden mt-2">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold px-2 py-1 bg-primary/10 text-primary border border-primary/20 rounded">
                    XLSX
                  </span>
                  <div>
                    <div className="text-[14.5px] font-medium text-foreground">dati_maggio_2025.xlsx</div>
                    <div className="text-[12px] text-muted-foreground mt-0.5">142 KB · caricato adesso</div>
                  </div>
                </div>
                <div className="flex gap-2">
                   <button 
                    onClick={() => setHasFile(false)}
                    className="px-3.5 py-1.5 text-[12.5px] font-medium border border-white/10 bg-transparent text-muted-foreground rounded-lg hover:bg-white/5 transition-colors"
                  >
                    {t("dashboard.file_remove")}
                   </button>
                   <button 
                    onClick={() => setIsModalOpen(true)}
                    className="px-3.5 py-1.5 text-[12.5px] font-medium border border-primary/20 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors flex items-center gap-1.5"
                  >
                    {t("dashboard.file_process")}
                   </button>
                </div>
              </div>

              {/* Sheets Row */}
              <div className="mb-4">
                <div className="text-[11px] font-medium tracking-[0.05em] uppercase text-muted-foreground/60 mb-2">
                  {t("dashboard.sheets_found")}
                </div>
                <div className="flex flex-wrap gap-2">
                  <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#534ab7]/10 border border-[#534ab7]/30 text-[#afa9ec] rounded-md text-[12px] font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70"></span> Maggio 2025
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 text-muted-foreground hover:text-foreground rounded-md text-[12px] transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-current opacity-50"></span> Aprile 2025
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 text-muted-foreground hover:text-foreground rounded-md text-[12px] transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-current opacity-50"></span> Riepilogo
                  </button>
                </div>
              </div>

              {/* Meta Grid */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/5">
                <div className="bg-white/[0.025] rounded-lg p-3">
                  <div className="text-[11px] text-muted-foreground/60 mb-1">{t("dashboard.rows")}</div>
                  <div className="text-[15px] font-medium text-foreground">1.248</div>
                </div>
                <div className="bg-white/[0.025] rounded-lg p-3">
                  <div className="text-[11px] text-muted-foreground/60 mb-1">{t("dashboard.cols")}</div>
                  <div className="text-[15px] font-medium text-foreground">14</div>
                </div>
                <div className="bg-white/[0.025] rounded-lg p-3">
                  <div className="text-[11px] text-muted-foreground/60 mb-1">{t("dashboard.size")}</div>
                  <div className="text-[15px] font-medium text-foreground">142 KB</div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Right Panel - History */}
      <div className="w-full md:w-[320px] lg:w-[360px] border-l border-white/5 flex flex-col p-6 overflow-y-auto bg-black/20 shrink-0">
        <div className="flex items-center justify-between mb-5">
          <span className="text-[11px] font-medium tracking-[0.07em] uppercase text-muted-foreground/50">
            {t("dashboard.history_title")}
          </span>
          <span className="text-[11px] text-muted-foreground/40">12 file</span>
        </div>

        <div className="flex flex-col gap-3">
          {/* History Item 1 */}
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-3.5 hover:border-primary/40 transition-colors cursor-pointer">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 overflow-hidden">
                <FileSpreadsheet size={14} className="text-muted-foreground shrink-0" />
                <span className="text-[13px] font-medium text-foreground truncate">dati_aprile_2025.xlsx</span>
              </div>
              <span className="text-[10px] bg-primary/10 text-primary border border-primary/20 px-1.5 py-0.5 rounded font-medium shrink-0 flex items-center gap-1">
                <CheckCircle2 size={10} /> {t("dashboard.status_done")}
              </span>
            </div>
            <div className="text-[11px] text-muted-foreground mb-3">
              142 KB · 3 fogli · 2 giorni fa
            </div>
            <div className="flex gap-2">
              <button className="flex-1 py-1.5 bg-white/5 border border-white/10 rounded-md text-[11px] font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center gap-1.5">
                <Download size={12} /> {t("dashboard.history_download")}
              </button>
              <button className="flex-1 py-1.5 bg-primary/10 border border-primary/20 rounded-md text-[11px] font-medium text-primary hover:bg-primary/15 transition-colors flex items-center justify-center gap-1.5">
                <RefreshCw size={12} /> {t("dashboard.history_reuse")}
              </button>
            </div>
          </div>

          {/* History Item 2 */}
          <div className="bg-white/[0.025] border border-white/5 rounded-xl p-3.5 hover:border-white/10 transition-colors cursor-pointer">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 overflow-hidden">
                <FileSpreadsheet size={14} className="text-muted-foreground shrink-0" />
                <span className="text-[13px] font-medium text-foreground truncate">dati_marzo_2025.xlsx</span>
              </div>
              <span className="text-[10px] bg-primary/10 text-primary border border-primary/20 px-1.5 py-0.5 rounded font-medium shrink-0 flex items-center gap-1">
                <CheckCircle2 size={10} /> {t("dashboard.status_done")}
              </span>
            </div>
            <div className="text-[11px] text-muted-foreground mb-3">
              98 KB · 2 fogli · 1 mese fa
            </div>
            <div className="flex gap-2">
              <button className="flex-1 py-1.5 bg-white/5 border border-white/10 rounded-md text-[11px] font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center gap-1.5">
                <Download size={12} /> {t("dashboard.history_download")}
              </button>
              <button className="flex-1 py-1.5 bg-primary/10 border border-primary/20 rounded-md text-[11px] font-medium text-primary hover:bg-primary/15 transition-colors flex items-center justify-center gap-1.5">
                <RefreshCw size={12} /> {t("dashboard.history_reuse")}
              </button>
            </div>
          </div>

           {/* History Item 3 (Processing) */}
           <div className="bg-white/[0.025] border border-white/5 rounded-xl p-3.5 hover:border-white/10 transition-colors cursor-pointer">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 overflow-hidden">
                <FileSpreadsheet size={14} className="text-muted-foreground shrink-0" />
                <span className="text-[13px] font-medium text-foreground truncate">export_febbraio.xlsx</span>
              </div>
              <span className="text-[10px] bg-[#534ab7]/10 text-[#afa9ec] border border-[#534ab7]/20 px-1.5 py-0.5 rounded font-medium shrink-0 flex items-center gap-1">
                <Clock size={10} /> {t("dashboard.status_waiting")}
              </span>
            </div>
            <div className="text-[11px] text-muted-foreground mb-3">
              210 KB · 4 fogli · 2 mesi fa
            </div>
            <div className="flex gap-2 opacity-50 pointer-events-none">
              <button className="flex-1 py-1.5 bg-white/5 border border-white/10 rounded-md text-[11px] font-medium text-muted-foreground flex items-center justify-center gap-1.5">
                <Download size={12} /> {t("dashboard.history_download")}
              </button>
              <button className="flex-1 py-1.5 bg-primary/10 border border-primary/20 rounded-md text-[11px] font-medium text-primary flex items-center justify-center gap-1.5">
                <RefreshCw size={12} /> {t("dashboard.history_reuse")}
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Processing parameters Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-[#08080e]/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4 transition-opacity"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="bg-[#16161e] border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <span className="font-syne text-[16px] font-bold text-foreground">Parametri di elaborazione</span>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="w-7 h-7 flex items-center justify-center rounded-md bg-white/5 text-muted-foreground hover:text-foreground hover:bg-white/10 transition-colors"
              >
                <X size={14} />
              </button>
            </div>

            <div className="p-6">
              {/* File Reference */}
              <div className="flex items-center gap-2 p-3 bg-white/[0.03] border border-white/5 rounded-lg mb-6">
                 <span className="text-[10px] font-bold px-1.5 py-0.5 bg-white/10 text-muted-foreground border border-white/10 rounded">XLSX</span>
                 <span className="text-[12.5px] text-muted-foreground/80">dati_maggio_2025.xlsx — <span className="text-foreground">foglio: Maggio 2025</span></span>
              </div>

              {/* Toggles List */}
              <div className="flex flex-col gap-3 mb-6">
                
                <div className="flex items-center justify-between p-3.5 bg-white/[0.025] border border-white/5 rounded-xl">
                  <div>
                    <div className="text-[13px] text-foreground font-medium">Intestazione automatica</div>
                    <div className="text-[11px] text-muted-foreground mt-0.5">Rileva la prima riga come header</div>
                  </div>
                  <button 
                    onClick={() => setAutoHeader(!autoHeader)}
                    className={`w-9 h-5 rounded-full relative transition-colors ${autoHeader ? 'bg-primary' : 'bg-white/10'}`}
                  >
                    <div className={`w-3.5 h-3.5 rounded-full bg-white absolute top-[3px] transition-all shadow-sm ${autoHeader ? 'left-[19px]' : 'left-[3px]'}`}></div>
                  </button>
                </div>

                <div className="flex items-center justify-between p-3.5 bg-white/[0.025] border border-white/5 rounded-xl">
                  <div>
                    <div className="text-[13px] text-foreground font-medium">Filtra righe vuote</div>
                    <div className="text-[11px] text-muted-foreground mt-0.5">Rimuovi le righe senza dati validi</div>
                  </div>
                  <button 
                    onClick={() => setFilterEmpty(!filterEmpty)}
                    className={`w-9 h-5 rounded-full relative transition-colors ${filterEmpty ? 'bg-primary' : 'bg-white/10'}`}
                  >
                    <div className={`w-3.5 h-3.5 rounded-full bg-white absolute top-[3px] transition-all shadow-sm ${filterEmpty ? 'left-[19px]' : 'left-[3px]'}`}></div>
                  </button>
                </div>

                <div className="flex items-center justify-between p-3.5 bg-white/[0.025] border border-white/5 rounded-xl">
                  <div>
                    <div className="text-[13px] text-foreground font-medium">Tipo utente</div>
                    <div className="text-[11px] text-muted-foreground mt-0.5">Categoria da applicare al dataset</div>
                  </div>
                  <button className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-[12px] text-muted-foreground hover:text-foreground transition-colors">
                    Staff <ChevronDown size={14} />
                  </button>
                </div>

              </div>
            </div>

            {/* Footer */}
            <div className="flex gap-3 p-6 pt-0">
              <button 
                className="flex-1 py-2.5 bg-transparent border border-white/10 rounded-xl text-[13px] text-muted-foreground hover:text-foreground hover:bg-white/5 font-medium transition-colors"
                onClick={() => setIsModalOpen(false)}
              >
                Annulla
              </button>
              <button 
                className="flex-[2] py-2.5 bg-foreground text-background font-medium rounded-xl text-[13px] hover:opacity-90 transition-opacity"
                onClick={() => setIsModalOpen(false)}
              >
                Avvia elaborazione →
              </button>
            </div>
            
          </div>
        </div>
      )}
    </>
  );
}

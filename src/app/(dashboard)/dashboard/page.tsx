"use client";

import React, { useState } from "react";
import { useLanguage } from "@/components/language-provider";
import { UploadCloud, FileSpreadsheet, Download, RefreshCw, X, ChevronDown, CheckCircle2, Clock } from "lucide-react";

export default function DashboardPage() {
  const { t } = useLanguage();
  
  // Real File States
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Processing Parameters
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [autoHeader, setAutoHeader] = useState(true);
  const [filterEmpty, setFilterEmpty] = useState(true);

  // Helpers
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const validateFile = (selectedFile: File) => {
    setError(null);
    const validTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'];
    const ext = selectedFile.name.split('.').pop()?.toLowerCase();
    
    if (!validTypes.includes(selectedFile.type) && ext !== 'xlsx' && ext !== 'xls') {
      setError("Formato non valido. Carica solo file Excel (.xlsx o .xls).");
      return false;
    }
    if (selectedFile.size > 10 * 1024 * 1024) {
      setError("File troppo grande. Limite massimo 10MB.");
      return false;
    }
    return true;
  };

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(false); };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      if (validateFile(e.dataTransfer.files[0])) setFile(e.dataTransfer.files[0]);
    }
  };
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      if (validateFile(e.target.files[0])) setFile(e.target.files[0]);
    }
  };

  return (
    <div className="flex flex-col md:flex-row flex-1 w-full max-w-[1400px] mx-auto min-h-[calc(100vh-140px)]">
      {/* Left Panel - Upload & Current Action */}
      <div className="flex-1 flex flex-col p-6 md:p-8">
        
        {/* Header Section */}
        <div className="mb-4 flex items-center justify-between">
          <span className="text-[11px] font-bold tracking-[0.07em] uppercase text-muted-foreground">
            {t("dashboard.title_upload")}
          </span>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl border border-red-500/20 bg-red-500/10 text-red-500 text-[13px] font-medium flex items-center justify-between">
            {error}
            <button onClick={() => setError(null)} className="hover:text-red-400"><X size={14} /></button>
          </div>
        )}

        {/* Upload Zone */}
        {!file ? (
          <div 
            className={`w-full border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center gap-3 transition-colors cursor-pointer group ${
              isDragging ? "border-primary bg-primary/5" : "border-border bg-muted/10 hover:border-primary/50"
            }`}
            onClick={() => fileInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input type="file" ref={fileInputRef} className="hidden" accept=".xlsx,.xls" onChange={handleFileSelect} />
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-colors ${
              isDragging ? "bg-primary/20 border-primary/30" : "bg-card border-border shadow-sm group-hover:bg-primary/5 group-hover:border-primary/20"
            }`}>
              <UploadCloud size={24} className={isDragging ? "text-primary" : "text-muted-foreground group-hover:text-primary transition-colors"} />
            </div>
            <span className="text-[14px] font-medium text-foreground">
              {isDragging ? "Rilascia il file qui" : t("dashboard.upload_zone")}
            </span>
            <span className="text-[12px] text-muted-foreground/80 max-w-xs text-center leading-relaxed">
              Trascina un file Excel (.xlsx o .xls) in questo box oppure clicca per cercare nel tuo dispositivo. Limite: 10MB.
            </span>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {/* Top row with Add btn if you want to upload another */}
            <div className="flex gap-3">
              <div 
                className="flex-1 border border-dashed border-border rounded-xl p-6 flex flex-col items-center justify-center gap-2 bg-muted/5 hover:border-primary/50 transition-colors cursor-pointer group min-h-[110px]"
                onClick={() => { setFile(null); if (fileInputRef.current) fileInputRef.current.value = ""; }}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="w-9 h-9 border border-border rounded-lg flex items-center justify-center bg-card shadow-sm mb-1 group-hover:bg-primary/5 group-hover:border-primary/20 transition-colors">
                  <UploadCloud size={18} className="text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <span className="text-[13px] font-medium text-foreground">{t("dashboard.upload_zone")}</span>
                <span className="text-[11.5px] text-muted-foreground/80">{t("dashboard.upload_reqs")}</span>
              </div>
              
              <button 
                className="w-[48px] h-[110px] border border-border rounded-xl bg-card shadow-sm flex items-center justify-center cursor-pointer flex-shrink-0 text-muted-foreground hover:border-primary/50 hover:text-primary hover:bg-primary/5 transition-all text-2xl font-light"
                onClick={() => fileInputRef.current?.click()}
              >
                +
              </button>
            </div>

            {/* Loaded File Card */}
            <div className="bg-muted/10 border border-border rounded-xl p-5 shadow-sm relative overflow-hidden mt-2">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold px-2 py-1 bg-primary/10 text-primary border border-primary/20 rounded">
                    {file.name.split('.').pop()?.toUpperCase() || 'XLSX'}
                  </span>
                  <div className="min-w-0">
                    <div className="text-[14.5px] font-bold text-foreground truncate max-w-[200px] md:max-w-xs" title={file.name}>{file.name}</div>
                    <div className="text-[12px] text-muted-foreground mt-0.5">{formatFileSize(file.size)} · elaborazione pronta</div>
                  </div>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                   <button 
                    onClick={() => { setFile(null); if (fileInputRef.current) fileInputRef.current.value = ""; }}
                    className="flex-1 sm:flex-none px-3.5 py-1.5 text-[12.5px] font-medium border border-border bg-background text-muted-foreground rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    {t("dashboard.file_remove")}
                   </button>
                   <button 
                    onClick={() => setIsModalOpen(true)}
                    className="flex-1 sm:flex-none px-4 py-1.5 text-[12.5px] font-bold border border-primary/20 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors flex items-center justify-center gap-1.5"
                  >
                    {t("dashboard.file_process")}
                   </button>
                </div>
              </div>

              {/* Sheets Row Placeholder */}
              <div className="mb-4">
                <div className="text-[11px] font-bold tracking-[0.05em] uppercase text-muted-foreground mb-2">
                  {t("dashboard.sheets_found")}
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="text-[12px] text-muted-foreground italic">
                    I fogli saranno visibili dopo l'elaborazione.
                  </span>
                </div>
              </div>

              {/* Meta Grid Placeholder */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-border opacity-50 pointer-events-none">
                <div className="bg-background border border-border rounded-lg p-3">
                  <div className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground mb-1">{t("dashboard.rows")}</div>
                  <div className="text-[16px] font-bold text-foreground">--</div>
                </div>
                <div className="bg-background border border-border rounded-lg p-3">
                  <div className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground mb-1">{t("dashboard.cols")}</div>
                  <div className="text-[16px] font-bold text-foreground">--</div>
                </div>
                <div className="bg-background border border-border rounded-lg p-3">
                  <div className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground mb-1">{t("dashboard.size")}</div>
                  <div className="text-[16px] font-bold text-foreground">{formatFileSize(file.size)}</div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Right Panel - History */}
      <div className="w-full md:w-[320px] lg:w-[360px] md:border-l border-t md:border-t-0 border-border flex flex-col p-6 bg-muted/5 shrink-0">
        <div className="flex items-center justify-between mb-5">
          <span className="text-[11px] font-bold tracking-[0.07em] uppercase text-muted-foreground">
            {t("dashboard.history_title")}
          </span>
          <span className="text-[11px] text-muted-foreground/60">12 file</span>
        </div>

        <div className="flex flex-col gap-3">
          {/* History Item 1 */}
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-3.5 hover:border-primary/40 transition-colors cursor-pointer shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 overflow-hidden">
                <FileSpreadsheet size={14} className="text-muted-foreground shrink-0" />
                <span className="text-[13px] font-bold text-foreground truncate">dati_aprile_2025.xlsx</span>
              </div>
              <span className="text-[10px] bg-primary/10 text-primary border border-primary/20 px-1.5 py-0.5 rounded font-bold shrink-0 flex items-center gap-1">
                <CheckCircle2 size={10} /> {t("dashboard.status_done")}
              </span>
            </div>
            <div className="text-[11px] text-muted-foreground mb-3">
              142 KB · 3 fogli · 2 giorni fa
            </div>
            <div className="flex gap-2">
              <button className="flex-1 py-1.5 bg-background border border-border rounded-md text-[11px] font-medium text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors flex items-center justify-center gap-1.5">
                <Download size={12} /> {t("dashboard.history_download")}
              </button>
              <button className="flex-1 py-1.5 bg-primary/10 border border-primary/20 rounded-md text-[11px] font-bold text-primary hover:bg-primary/20 transition-colors flex items-center justify-center gap-1.5">
                <RefreshCw size={12} /> {t("dashboard.history_reuse")}
              </button>
            </div>
          </div>

          {/* History Item 2 */}
          <div className="bg-card border border-border rounded-xl p-3.5 hover:border-border/80 transition-colors cursor-pointer shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 overflow-hidden">
                <FileSpreadsheet size={14} className="text-muted-foreground shrink-0" />
                <span className="text-[13px] font-bold text-foreground truncate">dati_marzo_2025.xlsx</span>
              </div>
              <span className="text-[10px] bg-primary/10 text-primary border border-primary/20 px-1.5 py-0.5 rounded font-bold shrink-0 flex items-center gap-1">
                <CheckCircle2 size={10} /> {t("dashboard.status_done")}
              </span>
            </div>
            <div className="text-[11px] text-muted-foreground mb-3">
              98 KB · 2 fogli · 1 mese fa
            </div>
            <div className="flex gap-2">
              <button className="flex-1 py-1.5 bg-background border border-border rounded-md text-[11px] font-medium text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors flex items-center justify-center gap-1.5">
                <Download size={12} /> {t("dashboard.history_download")}
              </button>
              <button className="flex-1 py-1.5 bg-primary/10 border border-primary/20 rounded-md text-[11px] font-bold text-primary hover:bg-primary/20 transition-colors flex items-center justify-center gap-1.5">
                <RefreshCw size={12} /> {t("dashboard.history_reuse")}
              </button>
            </div>
          </div>

           {/* History Item 3 (Processing) */}
           <div className="bg-card border border-border rounded-xl p-3.5 hover:border-border/80 transition-colors cursor-pointer shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 overflow-hidden">
                <FileSpreadsheet size={14} className="text-muted-foreground shrink-0" />
                <span className="text-[13px] font-bold text-foreground truncate">export_febbraio.xlsx</span>
              </div>
              <span className="text-[10px] bg-blue-500/10 text-blue-500 border border-blue-500/20 px-1.5 py-0.5 rounded font-bold shrink-0 flex items-center gap-1">
                <Clock size={10} /> {t("dashboard.status_waiting")}
              </span>
            </div>
            <div className="text-[11px] text-muted-foreground mb-3">
              210 KB · 4 fogli · 2 mesi fa
            </div>
            <div className="flex gap-2 opacity-50 pointer-events-none">
              <button className="flex-1 py-1.5 bg-background border border-border rounded-md text-[11px] font-medium text-muted-foreground flex items-center justify-center gap-1.5">
                <Download size={12} /> {t("dashboard.history_download")}
              </button>
              <button className="flex-1 py-1.5 bg-primary/10 border border-primary/20 rounded-md text-[11px] font-bold text-primary flex items-center justify-center gap-1.5">
                <RefreshCw size={12} /> {t("dashboard.history_reuse")}
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Processing parameters Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4 sm:p-6 transition-opacity"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="bg-card border border-border rounded-2xl w-full max-w-lg shadow-2xl relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <span className="font-syne text-[18px] font-bold text-foreground">Parametri di elaborazione</span>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-muted/20 text-muted-foreground border border-border hover:text-foreground hover:bg-muted/50 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-6">
              {/* File Reference */}
              <div className="flex items-center gap-2 p-3 bg-muted/10 border border-border rounded-lg mb-6">
                 <span className="text-[10px] font-bold px-1.5 py-0.5 bg-background text-muted-foreground border border-border rounded shadow-sm">XLSX</span>
                 <span className="text-[13px] font-medium text-foreground truncate">{file?.name || "dati.xlsx"}</span>
              </div>

              {/* Toggles List */}
              <div className="flex flex-col gap-3 mb-6">
                
                <div className="flex items-center justify-between p-3.5 bg-card border border-border rounded-xl shadow-sm">
                  <div>
                    <div className="text-[14px] text-foreground font-bold">Intestazione automatica</div>
                    <div className="text-[12px] text-muted-foreground mt-0.5">Rileva la prima riga come header</div>
                  </div>
                  <button 
                    onClick={() => setAutoHeader(!autoHeader)}
                    className={`w-10 h-6 rounded-full relative transition-colors ${autoHeader ? 'bg-primary' : 'bg-muted/50'}`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white absolute top-[4px] transition-all shadow-sm ${autoHeader ? 'left-[20px]' : 'left-[4px]'}`}></div>
                  </button>
                </div>

                <div className="flex items-center justify-between p-3.5 bg-card border border-border rounded-xl shadow-sm">
                  <div>
                    <div className="text-[14px] text-foreground font-bold">Filtra righe vuote</div>
                    <div className="text-[12px] text-muted-foreground mt-0.5">Rimuovi le righe senza dati validi</div>
                  </div>
                  <button 
                    onClick={() => setFilterEmpty(!filterEmpty)}
                    className={`w-10 h-6 rounded-full relative transition-colors ${filterEmpty ? 'bg-primary' : 'bg-muted/50'}`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white absolute top-[4px] transition-all shadow-sm ${filterEmpty ? 'left-[20px]' : 'left-[4px]'}`}></div>
                  </button>
                </div>

                <div className="flex items-center justify-between p-3.5 bg-card border border-border rounded-xl shadow-sm">
                  <div>
                    <div className="text-[14px] text-foreground font-bold">Tipo utente</div>
                    <div className="text-[12px] text-muted-foreground mt-0.5">Categoria da applicare al dataset</div>
                  </div>
                  <button className="flex items-center gap-2 px-3 py-1.5 bg-background border border-border rounded-lg text-[13px] font-medium text-muted-foreground hover:text-foreground hover:bg-muted/20 transition-colors shadow-sm">
                    Staff <ChevronDown size={14} />
                  </button>
                </div>

              </div>
            </div>

            {/* Footer */}
            <div className="flex gap-3 p-6 pt-0">
              <button 
                className="flex-1 py-2.5 bg-background border border-border rounded-xl text-[14px] text-muted-foreground hover:text-foreground hover:bg-muted/30 font-medium transition-colors"
                onClick={() => setIsModalOpen(false)}
              >
                Annulla
              </button>
              <button 
                className="flex-[2] py-2.5 bg-primary text-primary-foreground font-bold rounded-xl text-[14px] hover:opacity-90 shadow-sm transition-opacity"
                onClick={() => setIsModalOpen(false)}
              >
                Avvia elaborazione →
              </button>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
}

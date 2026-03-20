"use client";

import React, { useState } from "react";
import { useLanguage } from "@/components/language-provider";
import { UploadCloud, FileSpreadsheet, Download, RefreshCw, X, CheckCircle2, Clock, Check } from "lucide-react";

// --- Types ---
interface ParseResult {
  rows: number;
  cols: number;
  sheets: string[];
  sizeKB: number;
}

// --- Flow Steps ---
// Step 0: No file
// Step 1: File loaded, sheets displayed, user selects sheet (auto if 1)
// Step 2: Sheet selected, user opens filter modal
// Step 3: Filters confirmed, user can Elaborate
// Step 4: Elaborated → result shown in history

export default function DashboardPage() {
  const { t } = useLanguage();

  // File state
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Flow state
  const [parseResult, setParseResult] = useState<ParseResult | null>(null);
  const [selectedSheet, setSelectedSheet] = useState<string | null>(null);
  const [isLoadingSheets, setIsLoadingSheets] = useState(false);
  const [isLoadingFilters, setIsLoadingFilters] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Filter modal state
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [availableFilters, setAvailableFilters] = useState<string[]>([]);
  const [filterColumnName, setFilterColumnName] = useState("Attività");
  const [selectedFilters, setSelectedFilters] = useState<Set<string>>(new Set());
  const [filtersConfirmed, setFiltersConfirmed] = useState(false);

  // Helpers
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const validateFile = (f: File) => {
    setError(null);
    const validTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
    ];
    const ext = f.name.split(".").pop()?.toLowerCase();
    if (!validTypes.includes(f.type) && ext !== "xlsx" && ext !== "xls") {
      setError("Formato non valido. Carica solo file Excel (.xlsx o .xls).");
      return false;
    }
    if (f.size > 10 * 1024 * 1024) {
      setError("File troppo grande. Limite massimo 10MB.");
      return false;
    }
    return true;
  };

  const resetFlow = () => {
    setFile(null);
    setParseResult(null);
    setSelectedSheet(null);
    setAvailableFilters([]);
    setSelectedFilters(new Set());
    setFiltersConfirmed(false);
    setError(null);
    setSuccessMsg(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Step 1: Load file and parse sheets
  const loadFile = async (f: File) => {
    if (!validateFile(f)) return;
    setFile(f);
    setIsLoadingSheets(true);
    setParseResult(null);
    setSelectedSheet(null);
    setFiltersConfirmed(false);

    const formData = new FormData();
    formData.append("file", f);

    try {
      const res = await fetch("/api/dashboard/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Errore nel caricamento."); setFile(null); return; }
      setParseResult(data.result);
      // Auto-select if single sheet
      if (data.result.sheets.length === 1) {
        setSelectedSheet(data.result.sheets[0]);
      }
    } catch {
      setError("Errore di rete.");
      setFile(null);
    } finally {
      setIsLoadingSheets(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(false); };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); setIsDragging(false);
    if (e.dataTransfer.files?.[0]) loadFile(e.dataTransfer.files[0]);
  };
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) loadFile(e.target.files[0]);
  };

  // Step 2: Open filter modal — fetch unique filter values
  const openFilterModal = async () => {
    if (!file || !selectedSheet) return;
    setIsLoadingFilters(true);
    setShowFilterModal(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("sheetName", selectedSheet);

    try {
      const res = await fetch("/api/dashboard/filters", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Errore nel caricamento filtri."); setShowFilterModal(false); return; }
      setAvailableFilters(data.filters);
      setFilterColumnName(data.filterColumnName);
      // Pre-select all
      setSelectedFilters(new Set(data.filters));
      setFiltersConfirmed(false);
    } catch {
      setError("Errore di rete nel caricamento filtri.");
      setShowFilterModal(false);
    } finally {
      setIsLoadingFilters(false);
    }
  };

  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev => {
      const next = new Set(prev);
      if (next.has(filter)) next.delete(filter); else next.add(filter);
      return next;
    });
  };

  const confirmFilters = () => {
    if (selectedFilters.size === 0) { setError("Devi selezionare almeno un filtro."); return; }
    setFiltersConfirmed(true);
    setShowFilterModal(false);
  };

  // Step 3: Process (currently fictitious)
  const handleProcessFile = async () => {
    if (!file || !selectedSheet || !filtersConfirmed) return;
    setIsProcessing(true);
    setError(null);

    // Simulate processing delay
    await new Promise(r => setTimeout(r, 1200));

    setSuccessMsg(`Elaborazione completata: ${parseResult?.rows.toLocaleString("it-IT")} righe processate con ${selectedFilters.size} filtri attivi.`);
    setIsProcessing(false);
    // NOTE: Mini-Task 5 will add history DB write here
  };

  // --- Derived state for rendering ---
  const step = !file ? 0
    : isLoadingSheets ? 0
    : !selectedSheet ? 1
    : !filtersConfirmed ? 2
    : 3;

  return (
    <div className="flex flex-col md:flex-row flex-1 w-full max-w-[1400px] mx-auto min-h-[calc(100vh-140px)]">

      {/* Left Panel */}
      <div className="flex-1 flex flex-col p-6 md:p-8">

        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <span className="text-[11px] font-bold tracking-[0.07em] uppercase text-muted-foreground">
            {t("dashboard.title_upload")}
          </span>
          {/* Step indicator pills */}
          {file && (
            <div className="flex items-center gap-1.5">
              {["File", "Foglio", "Filtri", "Pronto"].map((label, i) => (
                <div key={i} className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border transition-all ${
                  step > i ? "bg-primary/15 border-primary/30 text-primary"
                  : step === i ? "bg-foreground/8 border-border text-foreground"
                  : "bg-transparent border-border/40 text-muted-foreground/50"
                }`}>
                  {step > i && <Check size={9} />} {label}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Alerts */}
        {error && (
          <div className="mb-4 p-3 rounded-xl border border-red-500/20 bg-red-500/10 text-red-500 text-[13px] font-medium flex items-center justify-between">
            {error}
            <button onClick={() => setError(null)} className="hover:opacity-70"><X size={14} /></button>
          </div>
        )}
        {successMsg && (
          <div className="mb-4 p-3 rounded-xl border border-green-500/20 bg-green-500/10 text-green-600 dark:text-green-400 text-[13px] font-medium flex items-center justify-between">
            ✓ {successMsg}
            <button onClick={() => setSuccessMsg(null)} className="hover:opacity-70"><X size={14} /></button>
          </div>
        )}
        {isLoadingSheets && (
          <div className="mb-4 p-3 rounded-xl border border-primary/20 bg-primary/5 text-primary text-[13px] font-medium flex items-center gap-2">
            <svg className="animate-spin" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
            Analisi del file in corso...
          </div>
        )}
        {isProcessing && (
          <div className="mb-4 p-3 rounded-xl border border-primary/20 bg-primary/5 text-primary text-[13px] font-medium flex items-center gap-2">
            <svg className="animate-spin" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
            Elaborazione in corso...
          </div>
        )}

        {/* UPLOAD ZONE (no file) */}
        {!file && (
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
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-colors ${
              isDragging ? "bg-primary/20 border-primary/30" : "bg-card border-border shadow-sm group-hover:bg-primary/5 group-hover:border-primary/20"
            }`}>
              <UploadCloud size={28} className={isDragging ? "text-primary" : "text-muted-foreground group-hover:text-primary transition-colors"} />
            </div>
            <span className="text-[15px] font-bold text-foreground">
              {isDragging ? "Rilascia il file qui" : t("dashboard.upload_zone")}
            </span>
            <span className="text-[12px] text-muted-foreground/80 max-w-xs text-center leading-relaxed">
              Trascina un file Excel (.xlsx) qui oppure clicca per sfogliare. Max 10MB.
            </span>
          </div>
        )}

        {/* FILE LOADED STATE */}
        {file && (
          <div className="flex flex-col gap-4">

            {/* File Header Card */}
            <div className="bg-muted/10 border border-border rounded-xl p-4 md:p-5 shadow-sm">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary flex-shrink-0">
                    <FileSpreadsheet size={22} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[14px] font-bold text-foreground truncate max-w-[200px] md:max-w-xs" title={file.name}>{file.name}</div>
                    <div className="text-[12px] text-muted-foreground mt-0.5">
                      {formatFileSize(file.size)}
                      {parseResult && ` · ${parseResult.rows.toLocaleString("it-IT")} righe rilevate`}
                    </div>
                  </div>
                </div>
                <button
                  onClick={resetFlow}
                  className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium border border-border bg-background text-muted-foreground rounded-lg hover:bg-muted/50 hover:text-foreground transition-colors"
                >
                  <X size={13} /> Rimuovi
                </button>
              </div>
            </div>

            {/* STEP 1: Sheet Selection */}
            {parseResult && (
              <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold tracking-wider uppercase text-muted-foreground">
                    {t("dashboard.sheets_found")}
                  </span>
                  {parseResult.sheets.length === 1 && (
                    <span className="text-[10px] bg-green-500/10 text-green-500 border border-green-500/20 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                      <Check size={9} /> Auto-selezionato
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {parseResult.sheets.map((sheet) => (
                    <button
                      key={sheet}
                      onClick={() => { setSelectedSheet(sheet); setFiltersConfirmed(false); }}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] font-medium border transition-all ${
                        selectedSheet === sheet
                          ? "bg-primary/10 border-primary/40 text-primary shadow-sm"
                          : "bg-muted/10 border-border text-muted-foreground hover:text-foreground hover:border-border/80"
                      }`}
                    >
                      {selectedSheet === sheet && <Check size={11} />}
                      {sheet}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 2: Filter Button */}
            {parseResult && (
              <div className={`bg-card border rounded-xl p-5 shadow-sm transition-all ${
                !selectedSheet ? "opacity-40 pointer-events-none border-border" : "border-border"
              }`}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[14px] font-bold text-foreground mb-1">Selezione Filtri</div>
                    <div className="text-[12px] text-muted-foreground">
                      {filtersConfirmed
                        ? `${selectedFilters.size} di ${availableFilters.length} filtri selezionati`
                        : "Scegli quali attività includere nell'elaborazione"}
                    </div>
                  </div>
                  <button
                    onClick={openFilterModal}
                    disabled={!selectedSheet}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-bold border transition-all ${
                      filtersConfirmed
                        ? "bg-green-500/10 border-green-500/30 text-green-600 dark:text-green-400 hover:bg-green-500/20"
                        : "bg-primary/10 border-primary/20 text-primary hover:bg-primary/20"
                    }`}
                  >
                    {filtersConfirmed ? <><Check size={14}/> Modifica</> : "Scegli Filtri →"}
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Process Button + Stats */}
            {parseResult && (
              <div className={`bg-card border rounded-xl p-5 shadow-sm transition-all ${
                !filtersConfirmed ? "opacity-40 pointer-events-none border-border" : "border-border"
              }`}>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  {/* Mini stats grid */}
                  <div className="grid grid-cols-3 gap-3 flex-1">
                    <div className="bg-background border border-border rounded-lg p-3">
                      <div className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground mb-1">{t("dashboard.rows")}</div>
                      <div className="text-[15px] font-bold text-foreground">{parseResult.rows.toLocaleString("it-IT")}</div>
                    </div>
                    <div className="bg-background border border-border rounded-lg p-3">
                      <div className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground mb-1">{t("dashboard.cols")}</div>
                      <div className="text-[15px] font-bold text-foreground">{parseResult.cols}</div>
                    </div>
                    <div className="bg-background border border-border rounded-lg p-3">
                      <div className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground mb-1">{t("dashboard.size")}</div>
                      <div className="text-[15px] font-bold text-foreground">{formatFileSize(file.size)}</div>
                    </div>
                  </div>
                  <button
                    onClick={handleProcessFile}
                    disabled={!filtersConfirmed || isProcessing}
                    className="w-full sm:w-auto px-6 py-3 text-[14px] font-bold bg-primary text-primary-foreground rounded-xl hover:opacity-90 shadow-sm transition-opacity disabled:opacity-50 disabled:cursor-wait flex items-center justify-center gap-2"
                  >
                    {isProcessing ? (
                      <><svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg> Elaborazione...</>
                    ) : "Elabora →"}
                  </button>
                </div>
              </div>
            )}

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
          {/* Mock History Items (will be replaced with DB data in Mini-Task 5) */}
          {[
            { name: "dati_aprile_2025.xlsx", meta: "142 KB · 3 fogli · 2 giorni fa", status: "done" },
            { name: "dati_marzo_2025.xlsx", meta: "98 KB · 2 fogli · 1 mese fa", status: "done" },
            { name: "export_febbraio.xlsx", meta: "210 KB · 4 fogli · 2 mesi fa", status: "waiting" },
          ].map((item, i) => (
            <div key={i} className={`border rounded-xl p-3.5 cursor-pointer shadow-sm transition-colors ${
              item.status === "done"
                ? i === 0 ? "bg-primary/5 border-primary/20 hover:border-primary/40" : "bg-card border-border hover:border-border/80"
                : "bg-card border-border hover:border-border/80"
            }`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 overflow-hidden">
                  <FileSpreadsheet size={14} className="text-muted-foreground shrink-0" />
                  <span className="text-[13px] font-bold text-foreground truncate">{item.name}</span>
                </div>
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold shrink-0 flex items-center gap-1 border ${
                  item.status === "done"
                    ? "bg-primary/10 text-primary border-primary/20"
                    : "bg-blue-500/10 text-blue-500 border-blue-500/20"
                }`}>
                  {item.status === "done" ? <><CheckCircle2 size={9}/> {t("dashboard.status_done")}</> : <><Clock size={9}/> {t("dashboard.status_waiting")}</>}
                </span>
              </div>
              <div className="text-[11px] text-muted-foreground mb-3">{item.meta}</div>
              <div className={`flex gap-2 ${item.status === "waiting" ? "opacity-40 pointer-events-none" : ""}`}>
                <button className="flex-1 py-1.5 bg-background border border-border rounded-md text-[11px] font-medium text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors flex items-center justify-center gap-1.5">
                  <Download size={11} /> {t("dashboard.history_download")}
                </button>
                <button className="flex-1 py-1.5 bg-primary/10 border border-primary/20 rounded-md text-[11px] font-bold text-primary hover:bg-primary/20 transition-colors flex items-center justify-center gap-1.5">
                  <RefreshCw size={11} /> {t("dashboard.history_reuse")}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FILTER MODAL */}
      {showFilterModal && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4 sm:p-6"
          onClick={() => setShowFilterModal(false)}
          style={{ animation: "overlayEnter 0.2s ease-out forwards" }}
        >
          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes overlayEnter { from { opacity: 0 } to { opacity: 1 } }
            @keyframes modalEnter { from { opacity: 0; transform: scale(0.96) translateY(8px) } to { opacity: 1; transform: scale(1) translateY(0) } }
          `}} />
          <div
            className="bg-card border border-border rounded-2xl w-full max-w-md shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            style={{ animation: "modalEnter 0.3s cubic-bezier(0.16,1,0.3,1) forwards" }}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-border">
              <div>
                <span className="font-syne text-[17px] font-bold text-foreground block">Selezione Filtri</span>
                <span className="text-[12px] text-muted-foreground">Foglio: <strong>{selectedSheet}</strong></span>
              </div>
              <button onClick={() => setShowFilterModal(false)} className="w-8 h-8 flex items-center justify-center rounded-lg bg-muted/20 border border-border text-muted-foreground hover:text-foreground transition-colors">
                <X size={15} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5">
              {isLoadingFilters ? (
                <div className="flex items-center justify-center gap-3 py-10 text-muted-foreground text-[13px]">
                  <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
                  Caricamento valori dalla colonna <strong className="text-foreground ml-1">{filterColumnName}</strong>...
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[12px] text-muted-foreground">Colonna: <strong className="text-foreground">{filterColumnName}</strong> · {selectedFilters.size}/{availableFilters.length} selezionati</span>
                    <div className="flex gap-2">
                      <button onClick={() => setSelectedFilters(new Set(availableFilters))} className="text-[11px] text-primary hover:underline">Tutti</button>
                      <span className="text-muted-foreground/40">|</span>
                      <button onClick={() => setSelectedFilters(new Set())} className="text-[11px] text-muted-foreground hover:underline">Nessuno</button>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5 max-h-64 overflow-y-auto pr-1">
                    {availableFilters.map((filter) => (
                      <button
                        key={filter}
                        onClick={() => toggleFilter(filter)}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border text-left text-[13px] font-medium transition-all ${
                          selectedFilters.has(filter)
                            ? "bg-primary/8 border-primary/25 text-foreground"
                            : "bg-muted/5 border-border text-muted-foreground hover:text-foreground hover:border-border/80"
                        }`}
                      >
                        <div className={`w-4 h-4 rounded flex items-center justify-center border flex-shrink-0 transition-colors ${
                          selectedFilters.has(filter) ? "bg-primary border-primary" : "border-border"
                        }`}>
                          {selectedFilters.has(filter) && <Check size={10} className="text-primary-foreground" />}
                        </div>
                        <span className="truncate">{filter}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Modal Footer */}
            {!isLoadingFilters && (
              <div className="flex gap-3 p-5 pt-0">
                <button onClick={() => setShowFilterModal(false)} className="flex-1 py-2.5 bg-background border border-border rounded-xl text-[13px] font-medium text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors">
                  Annulla
                </button>
                <button
                  onClick={confirmFilters}
                  disabled={selectedFilters.size === 0}
                  className="flex-[2] py-2.5 bg-primary text-primary-foreground font-bold rounded-xl text-[13px] hover:opacity-90 shadow-sm transition-opacity disabled:opacity-50"
                >
                  Conferma {selectedFilters.size > 0 ? `(${selectedFilters.size})` : ""} →
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}

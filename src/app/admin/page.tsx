import { Users, FileSpreadsheet, ShieldCheck, Activity } from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col flex-1 px-6 md:px-10 max-w-7xl mx-auto py-12 w-full">
      <div className="mb-10">
        <h1 className="font-syne text-[32px] font-bold text-foreground">Control Room</h1>
        <p className="text-[14px] text-muted-foreground mt-2">
          Pannello di amministrazione globale. Gestisci utenze e visualizza i log di sistema.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm flex flex-col justify-between h-[130px]">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[13px] font-medium text-muted-foreground uppercase tracking-wider mb-2">Utenti Attivi</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <Users size={18} />
            </div>
          </div>
          <div className="text-[32px] font-bold text-foreground">0</div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm flex flex-col justify-between h-[130px]">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[13px] font-medium text-muted-foreground uppercase tracking-wider mb-2">File Elaborati</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
              <FileSpreadsheet size={18} />
            </div>
          </div>
          <div className="text-[32px] font-bold text-foreground">0</div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm flex flex-col justify-between h-[130px]">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[13px] font-medium text-muted-foreground uppercase tracking-wider mb-2">Stato Sistema</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500">
              <Activity size={18} />
            </div>
          </div>
          <div className="text-[16px] font-bold text-green-500 mt-2">Operational</div>
        </div>
        
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm flex flex-col justify-between h-[130px]">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[13px] font-medium text-muted-foreground uppercase tracking-wider mb-2">Sicurezza</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
              <ShieldCheck size={18} />
            </div>
          </div>
          <div className="text-[16px] font-bold text-blue-500 mt-2">RBAC Attivo</div>
        </div>

      </div>

      {/* Database Users Table Placeholder */}
      <h2 className="font-syne text-[20px] font-bold text-foreground mb-6">Database Clienti</h2>
      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[14px]">
            <thead className="bg-black/20 dark:bg-white/5 border-b border-border">
              <tr>
                <th className="px-6 py-4 font-semibold text-muted-foreground w-[30%]">Azienda / Utente</th>
                <th className="px-6 py-4 font-semibold text-muted-foreground w-[25%]">Email</th>
                <th className="px-6 py-4 font-semibold text-muted-foreground w-[15%]">Ruolo</th>
                <th className="px-6 py-4 font-semibold text-muted-foreground w-[15%]">Utilizzi Rimanenti</th>
                <th className="px-6 py-4 font-semibold text-muted-foreground w-[15%] text-right">Azioni</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {/* Dummy row until DB integration */}
              <tr className="hover:bg-white/[0.02] transition-colors group">
                <td className="px-6 py-4">
                  <div className="font-medium text-foreground">Palestra Esempio SRL</div>
                  <div className="text-[12px] text-muted-foreground mt-0.5">Iscrizione: Oggi</div>
                </td>
                <td className="px-6 py-4 text-muted-foreground">admin@palestraesempio.it</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-white/10 text-muted-foreground">
                    Standard
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">50</span>
                    <span className="text-muted-foreground text-[12px]">file</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-[13px] font-semibold text-primary hover:text-primary/80 transition-colors">Modifica</button>
                </td>
              </tr>
              
              <tr className="hover:bg-white/[0.02] transition-colors group">
                <td className="px-6 py-4">
                  <div className="font-medium text-foreground">Amministratore</div>
                  <div className="text-[12px] text-muted-foreground mt-0.5">System Admin</div>
                </td>
                <td className="px-6 py-4 text-muted-foreground">tuo@gymbadgetracker.it</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-accent/20 text-accent">
                    Admin
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-muted-foreground italic">Illimitati</span>
                </td>
                <td className="px-6 py-4 text-right">
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 px-6 text-center z-10 relative">
      <div className="glow-tl opacity-50"></div>
      
      <div className="font-syne text-[80px] md:text-[120px] font-extrabold text-primary leading-none mb-2 tracking-tighter">
        404
      </div>
      
      <h2 className="font-syne text-[24px] md:text-[32px] font-bold text-foreground mb-4">
        Pagina non trovata
      </h2>
      
      <p className="text-[15px] text-muted-foreground max-w-md mb-8">
        La pagina che stai cercando non esiste o è stata spostata.
        Forse stavi cercando un nuovo record da battere?
      </p>

      <Link 
        href="/"
        className="px-6 py-2.5 bg-foreground text-background border-none rounded-lg text-[13.5px] font-medium hover:opacity-90 transition-opacity"
      >
        Torna alla Home
      </Link>
    </div>
  );
}

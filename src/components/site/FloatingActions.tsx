import { CalendarPlus, Instagram, MessageCircle } from "lucide-react";
import { CLINIC } from "@/data/clinic";

export function FloatingActions({ onSchedule }: { onSchedule: () => void }) {
  return (
    <>
      <button
        onClick={onSchedule}
        className="fixed bottom-5 left-5 z-50 inline-flex animate-pulse-ring items-center gap-2 rounded-full bg-accent px-5 py-3.5 font-display font-bold text-accent-foreground shadow-glow transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring"
      >
        <CalendarPlus className="h-5 w-5" aria-hidden /> Agendar Consulta
      </button>
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3">
        <a href={CLINIC.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram da clínica"
          className="grid h-13 w-13 place-items-center rounded-full bg-instagram p-3.5 text-primary-foreground shadow-soft transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring">
          <Instagram className="h-6 w-6" aria-hidden />
        </a>
        <a href={`https://wa.me/${CLINIC.whatsapp}`} target="_blank" rel="noopener noreferrer" aria-label="Conversar no WhatsApp"
          className="grid h-13 w-13 place-items-center rounded-full bg-whatsapp p-3.5 text-primary-foreground shadow-soft transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring">
          <MessageCircle className="h-6 w-6" aria-hidden />
        </a>
      </div>
    </>
  );
}

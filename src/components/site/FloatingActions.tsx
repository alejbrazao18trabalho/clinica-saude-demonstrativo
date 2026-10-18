import { CalendarPlus, Instagram, MessageCircle } from "lucide-react";
import { CLINIC } from "@/data/clinic";

export function FloatingActions({ onSchedule }: { onSchedule: () => void }) {
  return (
    <>
      <button
        onClick={onSchedule}
        aria-label="Agendar Consulta"
        className="fixed fab-offset left-[var(--fab-offset)] z-50 inline-flex h-[var(--fab-size)] min-w-[var(--fab-size)] animate-pulse-ring items-center justify-center gap-2 rounded-full bg-accent px-[clamp(0.75rem,2vw,1.25rem)] text-[clamp(0.8rem,0.7rem+0.4vw,1rem)] font-display font-bold text-accent-foreground shadow-glow transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring"
      >
        <CalendarPlus className="h-[45%] w-auto shrink-0" aria-hidden /> <span className="hidden min-[480px]:inline">Agendar Consulta</span>
      </button>
      <div className="fixed fab-offset right-[var(--fab-offset)] z-50 flex flex-col gap-[clamp(0.5rem,1.2vw,0.75rem)]">
        <a href={CLINIC.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram da clínica"
          className="fab grid place-items-center rounded-full bg-instagram text-primary-foreground shadow-soft transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring">
          <Instagram className="h-[45%] w-[45%]" aria-hidden />
        </a>
        <a href={`https://wa.me/${CLINIC.whatsapp}`} target="_blank" rel="noopener noreferrer" aria-label="Conversar no WhatsApp"
          className="fab grid place-items-center rounded-full bg-whatsapp text-primary-foreground shadow-soft transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring">
          <MessageCircle className="h-[45%] w-[45%]" aria-hidden />
        </a>
      </div>
    </>
  );
}

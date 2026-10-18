import { useEffect, useState } from "react";
import { CalendarPlus, HeartPulse, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CLINIC, NAV } from "@/data/clinic";
import { cn } from "@/lib/utils";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <a href="#inicio" className="flex min-w-0 items-center gap-2.5" aria-label={`${CLINIC.name} — voltar ao início`}>
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand text-primary-foreground shadow-soft">
        <HeartPulse className="h-5 w-5" aria-hidden />
      </span>
      <span className="leading-tight">
        <span className={cn("block font-display text-lg font-extrabold", light ? "text-primary-foreground" : "text-primary")}>
          {CLINIC.name}
        </span>
        <span className={cn("block text-[11px] font-semibold uppercase tracking-widest", light ? "text-primary-foreground/70" : "text-muted-foreground")}>
          {CLINIC.tagline}
        </span>
      </span>
    </a>
  );
}

export function Header({ onSchedule }: { onSchedule: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition-all",
        scrolled ? "border-border bg-background/85 shadow-soft backdrop-blur-lg" : "border-transparent bg-background",
      )}
    >
      <div className="container-fluid grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-[clamp(0.5rem,1.2vw,0.85rem)] lg:grid-cols-[auto_1fr_auto]">
        <Logo />
        <nav aria-label="Navegação principal" className="hidden justify-center lg:flex">
          <ul className="flex items-center gap-1">
            {NAV.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  className="rounded-full px-3.5 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-secondary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="brand" size="default" className="hidden sm:inline-flex" onClick={onSchedule}>
            <CalendarPlus className="h-4 w-4" aria-hidden /> Agendar Consulta
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            aria-controls="menu-mobile"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
      {open && (
        <nav id="menu-mobile" aria-label="Navegação móvel" className="border-t border-border bg-background px-4 pb-4 lg:hidden">
          <ul className="flex flex-col py-2">
            {NAV.map((n) => (
              <li key={n.id}>
                <a href={`#${n.id}`} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-3 font-semibold text-foreground hover:bg-secondary">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          <Button variant="brand" className="w-full sm:hidden" onClick={() => { setOpen(false); onSchedule(); }}>
            <CalendarPlus className="h-4 w-4" aria-hidden /> Agendar Consulta
          </Button>
        </nav>
      )}
    </header>
  );
}

import { Lock } from "lucide-react";
import { CLINIC, NAV } from "@/data/clinic";
import { Logo } from "./Header";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo light />
          <p className="mt-4 text-sm text-primary-foreground/75">Saúde integrada e humanizada no Rio de Janeiro.</p>
          <p className="mt-4 inline-flex items-center gap-2 text-xs text-primary-foreground/70"><Lock className="h-3.5 w-3.5" aria-hidden /> Dados protegidos conforme a LGPD</p>
        </div>
        <nav aria-label="Links rápidos">
          <h2 className="font-bold">Links rápidos</h2>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/75">
            {NAV.map((n) => <li key={n.id}><a className="hover:text-accent" href={`#${n.id}`}>{n.label}</a></li>)}
          </ul>
        </nav>
        <div>
          <h2 className="font-bold">Contato</h2>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/75">
            <li>{CLINIC.phone}</li><li>{CLINIC.email}</li><li>{CLINIC.address}</li>
          </ul>
        </div>
        <div>
          <h2 className="font-bold">Institucional</h2>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/75">
            <li><a className="hover:text-accent" href="#termos">Termos de Uso</a></li>
            <li><a className="hover:text-accent" href="#privacidade">Política de Privacidade</a></li>
            <li>Responsável técnico: Dr. Marcelo Almeida — CRM-RJ 41.209-8</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/15 py-6 text-center text-xs text-primary-foreground/60">
        © {new Date().getFullYear()} {CLINIC.name} {CLINIC.tagline}. Todos os direitos reservados.
      </div>
    </footer>
  );
}

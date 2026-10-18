import { useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { ArrowLeft, CalendarClock, ClipboardList, Users, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { HeartPulse } from "lucide-react";

export const Route = createFileRoute("/painel")({
  head: () => ({
    meta: [
      { title: "Painel do Médico — Vitalis Clínica" },
      { name: "description", content: "Área restrita para a equipe cadastrar dados clínicos e próximas consultas." },
      { property: "og:title", content: "Painel do Médico — Vitalis" },
      { property: "og:description", content: "Sistema interno de cadastro clínico de pacientes." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Painel,
});

type Patient = { nome: string; idade: string; tipo: string; proxima: string };

function Painel() {
  const [patients, setPatients] = useState<Patient[]>([
    { nome: "Ana Ribeiro", idade: "34", tipo: "O+", proxima: "2026-10-22T09:30" },
    { nome: "João Pereira", idade: "58", tipo: "A-", proxima: "2026-10-23T14:00" },
  ]);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const nome = String(f.get("nome") || "").trim();
    if (!nome) { toast.error("Informe o nome do paciente."); return; }
    setPatients((p) => [{ nome, idade: String(f.get("idade") || "—"), tipo: String(f.get("tipo") || "—"), proxima: String(f.get("proxima") || "") }, ...p]);
    e.currentTarget.reset();
    toast.success("Paciente cadastrado com sucesso.");
  }

  const stats = [
    { icon: Users, label: "Pacientes ativos", value: 248 + patients.length - 2 },
    { icon: CalendarClock, label: "Consultas hoje", value: 12 },
    { icon: ClipboardList, label: "Prontuários pendentes", value: 3 },
  ];

  return (
    <div className="min-h-screen bg-secondary/50">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand text-primary-foreground"><HeartPulse className="h-5 w-5" aria-hidden /></span>
            <div className="min-w-0"><p className="truncate font-display font-extrabold text-primary">Painel do Médico</p><p className="truncate text-xs text-muted-foreground">Dra. Mariana Costa · Cardiologia</p></div>
          </div>
          <Button asChild variant="outline" className="rounded-full"><Link to="/"><ArrowLeft className="h-4 w-4" /> Voltar ao site</Link></Button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-8 px-4 py-10 sm:px-6">
        <p className="rounded-xl border border-border bg-card px-4 py-3 text-sm text-muted-foreground">Ambiente de demonstração — os dados não são salvos.</p>
        <div className="grid gap-4 sm:grid-cols-3">
          {stats.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-4 rounded-2xl bg-card p-5 shadow-soft">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-secondary text-primary"><Icon className="h-5 w-5" aria-hidden /></span>
              <div><p className="font-display text-2xl font-extrabold text-primary">{value}</p><p className="text-sm text-muted-foreground">{label}</p></div>
            </div>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
          <form onSubmit={submit} className="space-y-5 rounded-3xl bg-card p-7 shadow-soft">
            <h1 className="flex items-center gap-2 text-2xl font-extrabold text-primary"><UserPlus className="h-6 w-6" aria-hidden /> Cadastro clínico do paciente</h1>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5 sm:col-span-2"><Label htmlFor="p-nome">Nome do paciente</Label><Input id="p-nome" name="nome" maxLength={100} required /></div>
              <div className="space-y-1.5"><Label htmlFor="p-idade">Idade</Label><Input id="p-idade" name="idade" type="number" min={0} max={130} /></div>
              <div className="space-y-1.5"><Label htmlFor="p-tipo">Tipo sanguíneo</Label>
                <select id="p-tipo" name="tipo" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm shadow-sm">
                  {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((t) => <option key={t}>{t}</option>)}
                </select></div>
              <div className="space-y-1.5"><Label htmlFor="p-peso">Peso (kg)</Label><Input id="p-peso" name="peso" type="number" step="0.1" /></div>
              <div className="space-y-1.5"><Label htmlFor="p-pa">Pressão arterial</Label><Input id="p-pa" name="pa" placeholder="120/80" /></div>
              <div className="space-y-1.5 sm:col-span-2"><Label htmlFor="p-alergias">Alergias e medicamentos em uso</Label><Input id="p-alergias" name="alergias" maxLength={300} /></div>
              <div className="space-y-1.5 sm:col-span-2"><Label htmlFor="p-hist">Histórico breve</Label><Textarea id="p-hist" name="historico" rows={4} maxLength={1000} placeholder="Queixa principal, antecedentes, observações…" /></div>
              <div className="space-y-1.5 sm:col-span-2"><Label htmlFor="p-prox">Próxima consulta</Label><Input id="p-prox" name="proxima" type="datetime-local" /></div>
            </div>
            <Button type="submit" variant="brand" size="xl" className="w-full">Salvar cadastro</Button>
          </form>

          <section aria-labelledby="proximas" className="rounded-3xl bg-card p-7 shadow-soft">
            <h2 id="proximas" className="text-xl font-extrabold text-primary">Próximas consultas</h2>
            <ul className="mt-5 divide-y divide-border">
              {patients.map((p, i) => (
                <li key={i} className="flex items-center justify-between gap-3 py-4">
                  <div className="min-w-0"><p className="truncate font-bold text-foreground">{p.nome}</p><p className="text-sm text-muted-foreground">{p.idade} anos · {p.tipo}</p></div>
                  <span className="shrink-0 rounded-full bg-accent/50 px-3 py-1 text-xs font-bold text-accent-foreground">
                    {p.proxima ? new Date(p.proxima).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" }) : "A definir"}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
}

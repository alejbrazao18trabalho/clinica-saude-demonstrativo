import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SPECIALTIES } from "@/data/clinic";
import { isValidCPF, maskCPF, maskPhone } from "@/lib/validation";

type Errors = Partial<Record<"nome" | "cpf" | "email" | "telefone" | "nascimento" | "especialidade", string>>;

export function PreRegisterDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const [cpf, setCpf] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const nome = String(f.get("nome") || "").trim();
    const email = String(f.get("email") || "").trim();
    const nascimento = String(f.get("nascimento") || "");
    const especialidade = String(f.get("especialidade") || "");
    const errs: Errors = {};
    if (nome.split(" ").length < 2 || nome.length > 100) errs.nome = "Informe nome e sobrenome.";
    if (!isValidCPF(cpf)) errs.cpf = "CPF inválido.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "E-mail inválido.";
    if (phone.replace(/\D/g, "").length < 10) errs.telefone = "Telefone inválido.";
    if (!nascimento || new Date(nascimento) > new Date()) errs.nascimento = "Data inválida.";
    if (!especialidade) errs.especialidade = "Escolha uma especialidade.";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    // Ponto de integração futura com backend.
    toast.success("Pré-cadastro enviado!", { description: "Entraremos em contato para confirmar sua consulta." });
    setCpf(""); setPhone(""); onOpenChange(false);
  }

  const field = (id: keyof Errors, label: string, input: React.ReactNode) => (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      {input}
      {errors[id] && <p id={`${id}-err`} role="alert" className="text-sm text-destructive">{errors[id]}</p>}
    </div>
  );
  const aria = (id: keyof Errors) => ({ "aria-invalid": !!errors[id], "aria-describedby": errors[id] ? `${id}-err` : undefined });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto rounded-3xl sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl text-primary">Pré-cadastro de paciente</DialogTitle>
          <DialogDescription>Preencha seus dados e nossa equipe entrará em contato para agendar.</DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} noValidate className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">{field("nome", "Nome completo", <Input id="nome" name="nome" maxLength={100} autoComplete="name" {...aria("nome")} />)}</div>
          {field("cpf", "CPF", <Input id="cpf" inputMode="numeric" value={cpf} onChange={(e) => setCpf(maskCPF(e.target.value))} placeholder="000.000.000-00" {...aria("cpf")} />)}
          {field("nascimento", "Data de nascimento", <Input id="nascimento" name="nascimento" type="date" {...aria("nascimento")} />)}
          {field("email", "E-mail", <Input id="email" name="email" type="email" maxLength={255} autoComplete="email" {...aria("email")} />)}
          {field("telefone", "Telefone", <Input id="telefone" inputMode="tel" value={phone} onChange={(e) => setPhone(maskPhone(e.target.value))} placeholder="(21) 90000-0000" {...aria("telefone")} />)}
          <div className="sm:col-span-2">
            {field("especialidade", "Especialidade desejada",
              <select id="especialidade" name="especialidade" defaultValue="" {...aria("especialidade")}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                <option value="" disabled>Selecione…</option>
                {SPECIALTIES.map((s) => <option key={s.name}>{s.name}</option>)}
              </select>)}
          </div>
          <p className="text-xs text-muted-foreground sm:col-span-2">Seus dados são tratados com sigilo, conforme a LGPD.</p>
          <Button type="submit" variant="brand" size="xl" className="sm:col-span-2">Enviar pré-cadastro</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

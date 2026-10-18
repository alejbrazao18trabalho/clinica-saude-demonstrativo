export type PreRegister = {
  nome: string; cpf: string; nascimento: string; telefone: string; email: string;
  profissional?: string | undefined; especialidade: string; mes: string;
};

export function formatBirth(iso: string) {
  const [y, m, d] = iso.split("-");
  return y && m && d ? `${d}/${m}/${y}` : iso;
}

export function buildWhatsAppMessage(p: PreRegister) {
  return [
    "Olá, gostaria de agendar uma consulta.",
    "*Dados do Paciente:*",
    `Nome: ${p.nome}`,
    `CPF: ${p.cpf}`,
    `Data de Nascimento: ${formatBirth(p.nascimento)}`,
    `Telefone: ${p.telefone}`,
    `E-mail: ${p.email}`,
    `Profissional: ${p.profissional || "Sem preferência"}`,
    `Especialidade: ${p.especialidade}`,
    `Mês desejado: ${p.mes}`,
    "",
    "Por favor, quais os dias e horários disponíveis no mês informado para realizarmos a consulta?",
  ].join("\n");
}

export function buildWhatsAppUrl(phone: string, p: PreRegister) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(buildWhatsAppMessage(p))}`;
}

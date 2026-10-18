// Regras de data de nascimento — puras e seguras quanto a fuso horário.
// toISOString() devolve UTC e adiantaria/atrasaria o dia para quem está no Brasil,
// por isso tudo aqui usa a data local do visitante.

/** ISO local (yyyy-mm-dd) de um Date. */
export function toISODate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** Data de hoje no fuso de quem acessa o site. */
export function todayISO(now: Date = new Date()): string {
  return toISODate(now);
}

/** Converte yyyy-mm-dd em Date no fuso local; undefined se for data inexistente. */
export function parseISODate(iso: string): Date | undefined {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return undefined;
  const [y, m, d] = iso.split("-");
  const date = new Date(Number(y), Number(m) - 1, Number(d));
  // Rejeita datas roladas, como 2026-02-30, que virariam 02/03.
  return toISODate(date) === iso ? date : undefined;
}

/** true quando a data ISO cai depois de hoje. Comparar strings dispensa o fuso. */
export function isFutureDate(iso: string, now: Date = new Date()): boolean {
  return !!iso && iso > todayISO(now);
}

/** Regra de negócio: nascimento é obrigatório, válido e nunca no futuro. */
export function birthDateError(iso: string, now: Date = new Date()): string | undefined {
  if (!iso) return "Informe a data de nascimento.";
  if (!parseISODate(iso)) return "Data inválida.";
  if (isFutureDate(iso, now)) return "A data de nascimento não pode estar no futuro.";
  return undefined;
}

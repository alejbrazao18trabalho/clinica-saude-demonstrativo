const MONTHS = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
] as const;

export const SCHEDULE_MONTH_COUNT = 4;

/**
 * Booking window: the current month plus the following ones, strictly month
 * names in Portuguese (never the year). Wraps over the end of the year.
 */
export function getMonthOptions(
  now: Date = new Date(),
  count: number = SCHEDULE_MONTH_COUNT,
): string[] {
  const start = now.getMonth();
  return Array.from({ length: count }, (_, i) => MONTHS[(start + i) % 12]);
}

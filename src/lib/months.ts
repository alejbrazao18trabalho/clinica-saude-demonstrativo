const MONTHS: readonly string[] = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

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
  const options: string[] = [];
  for (let i = 0; i < count; i++) {
    const name = MONTHS[(start + i) % 12];
    if (name) options.push(name);
  }
  return options;
}

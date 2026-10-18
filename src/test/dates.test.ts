import { describe, expect, it } from "vitest";
import { birthDateError, isFutureDate, parseISODate, todayISO } from "@/lib/dates";

// 18/10/2026, 14h36 no fuso local de quem acessa
const now = new Date(2026, 9, 18, 14, 36);

describe("Data de nascimento", () => {
  it("usa hoje como teto, no fuso do visitante", () => {
    expect(todayISO(now)).toBe("2026-10-18");
    expect(isFutureDate("2026-10-18", now)).toBe(false);
    expect(isFutureDate("2026-10-19", now)).toBe(true);
    expect(isFutureDate("2027-01-01", now)).toBe(true);
    expect(isFutureDate("2030-12-31", now)).toBe(true);
    expect(isFutureDate("1990-05-12", now)).toBe(false);
  });

  it("impede o envio de datas futuras com o aviso exigido", () => {
    expect(birthDateError("2027-05-10", now)).toBe("A data de nascimento não pode estar no futuro.");
    expect(birthDateError("2030-01-01", now)).toBe("A data de nascimento não pode estar no futuro.");
    expect(birthDateError("2026-10-19", now)).toBe("A data de nascimento não pode estar no futuro.");
  });

  it("exige que a data seja informada", () => {
    expect(birthDateError("", now)).toBe("Informe a data de nascimento.");
  });

  it("rejeita datas malformadas ou inexistentes", () => {
    expect(birthDateError("2026-02-30", now)).toBe("Data inválida.");
    expect(birthDateError("18/10/1990", now)).toBe("Data inválida.");
    expect(birthDateError("2027", now)).toBe("Data inválida.");
  });

  it("aceita hoje e qualquer data passada", () => {
    expect(birthDateError("2026-10-18", now)).toBeUndefined();
    expect(birthDateError("1990-05-12", now)).toBeUndefined();
    expect(birthDateError("1940-01-01", now)).toBeUndefined();
  });

  it("lê a data ISO no fuso local, sem trocar de dia", () => {
    const d = parseISODate("1990-05-12");
    expect([d?.getFullYear(), d?.getMonth(), d?.getDate()]).toEqual([1990, 4, 12]);
  });
});

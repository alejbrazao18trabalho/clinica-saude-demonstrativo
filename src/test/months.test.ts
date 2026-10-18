import { describe, expect, it } from "vitest";
import { getMonthOptions } from "@/lib/months";

describe("Mês desejado options", () => {
  it("shows current month + next 3", () => {
    expect(getMonthOptions(new Date(2026, 1, 1))).toEqual(["Fevereiro", "Março", "Abril", "Maio"]);
  });

  it("wraps over the end of the year", () => {
    expect(getMonthOptions(new Date(2026, 11, 31))).toEqual(["Dezembro", "Janeiro", "Fevereiro", "Março"]);
  });

  it("always offers exactly 4 options", () => {
    for (let m = 0; m < 12; m++) expect(getMonthOptions(new Date(2026, m, 15))).toHaveLength(4);
  });

  it("never renders the year", () => {
    for (let m = 0; m < 12; m++) {
      for (const option of getMonthOptions(new Date(2026, m, 1))) {
        expect(option).not.toMatch(/\d/);
        expect(option[0]).toBe(option[0].toUpperCase());
      }
    }
  });

  it("defaults to the month of access", () => {
    const expected = ["Fevereiro", "Março", "Abril", "Maio"];
    expect(getMonthOptions(new Date(2027, 1, 9))).toEqual(expected);
  });
});

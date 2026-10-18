import { describe, it, expect } from "vitest";
import { isValidCPF } from "@/lib/validation";
describe("CPF", () => {
  it("accepts a valid CPF", () => expect(isValidCPF("529.982.247-25")).toBe(true));
  it("rejects wrong check digits", () => expect(isValidCPF("529.982.247-24")).toBe(false));
  it("rejects repeated digits", () => expect(isValidCPF("111.111.111-11")).toBe(false));
});

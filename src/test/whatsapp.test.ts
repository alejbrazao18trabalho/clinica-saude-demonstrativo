import { describe, expect, it } from "vitest";
import { buildWhatsAppMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

const p = { nome: "Ana Lima", cpf: "529.982.247-25", nascimento: "1990-05-12", telefone: "(21) 99999-0000", email: "a@b.com", profissional: "Dra. Mariana Costa", especialidade: "Cardiologia", mes: "Março" };

describe("WhatsApp pre-registration", () => {
  it("includes professional and formatted birth date", () => {
    const m = buildWhatsAppMessage(p);
    expect(m).toContain("Profissional: Dra. Mariana Costa");
    expect(m).toContain("Data de Nascimento: 12/05/1990");
    expect(m.startsWith("Olá, gostaria de agendar uma consulta.")).toBe(true);
  });
  it("targets the clinic number", () => {
    expect(buildWhatsAppUrl("5521934567890", p)).toMatch(/^https:\/\/wa\.me\/5521934567890\?text=/);
  });
});

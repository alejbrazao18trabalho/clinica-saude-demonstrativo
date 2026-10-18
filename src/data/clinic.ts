import doc1 from "@/assets/doc-1.jpg";
import doc2 from "@/assets/doc-2.jpg";
import doc3 from "@/assets/doc-3.jpg";
import doc4 from "@/assets/doc-4.jpg";

// Dados estáticos — prontos para serem substituídos por chamadas a um backend.
export const CLINIC = {
  name: "Vitalis",
  tagline: "Clínica Integrada",
  phone: "(21) 99425-4575",
  whatsapp: "5521994254575",
  instagram: "https://instagram.com/",
  email: "contato@vitalisclinica.com.br",
  address: "Av. Rio Branco, 156 — Sala 1201, Centro, Rio de Janeiro — RJ, 20040-003",
  hours: [
    { day: "Segunda a Sexta", time: "08h às 20h" },
    { day: "Sábado", time: "08h às 14h" },
    { day: "Domingo e feriados", time: "Fechado" },
  ],
};

export const NAV = [
  { id: "inicio", label: "Início" },
  { id: "sobre", label: "Sobre Nós" },
  { id: "especialidades", label: "Especialidades" },
  { id: "profissionais", label: "Profissionais" },
  { id: "avaliacoes", label: "Avaliações" },
  { id: "contato", label: "Contato" },
];

export const SPECIALTIES = [
  { name: "Cardiologia", desc: "Check-ups, eletrocardiograma e acompanhamento do coração." },
  { name: "Clínica Geral", desc: "Atendimento integral e encaminhamento personalizado." },
  { name: "Pediatria", desc: "Cuidado acolhedor do recém-nascido à adolescência." },
  { name: "Dermatologia", desc: "Saúde da pele, cabelos e unhas, clínica e estética." },
  { name: "Ginecologia", desc: "Saúde da mulher em todas as fases da vida." },
  { name: "Ortopedia", desc: "Ossos, articulações e reabilitação do movimento." },
];

export const DOCTORS = [
  { name: "Dra. Mariana Costa", specialty: "Cardiologia", crm: "CRM-RJ 52.874-3", photo: doc1 },
  { name: "Dr. Marcelo Almeida", specialty: "Clínica Geral", crm: "CRM-RJ 41.209-8", photo: doc2 },
  { name: "Dra. Aline Santos", specialty: "Pediatria", crm: "CRM-RJ 63.115-0", photo: doc3 },
  { name: "Dr. Rafael Torres", specialty: "Dermatologia", crm: "CRM-RJ 70.442-6", photo: doc4 },
];

export const TESTIMONIALS = [
  { name: "Juliana M.", stars: 5, text: "Atendimento impecável do início ao fim. Me senti ouvida e muito bem cuidada." },
  { name: "Carlos R.", stars: 5, text: "Clínica linda, pontual e com médicos extremamente atenciosos. Recomendo!" },
  { name: "Patrícia L.", stars: 5, text: "A pediatra foi maravilhosa com meu filho. Ambiente acolhedor e limpo." },
  { name: "Fernando S.", stars: 4, text: "Agendamento rápido pelo WhatsApp e consulta sem espera. Excelente." },
  { name: "Beatriz A.", stars: 5, text: "Equipe humana de verdade. Finalmente encontrei uma clínica de confiança." },
];

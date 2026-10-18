import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { About, Location, Professionals, Specialties, Testimonials } from "@/components/site/Sections";
import { Footer } from "@/components/site/Footer";
import { FloatingActions } from "@/components/site/FloatingActions";
import { PreRegisterDialog, type DoctorPick } from "@/components/site/PreRegisterDialog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vitalis Clínica Integrada — Saúde humanizada no Rio de Janeiro" },
      { name: "description", content: "Cardiologia, pediatria, dermatologia e mais. Agende sua consulta na Vitalis, no Centro do Rio de Janeiro." },
      { property: "og:title", content: "Vitalis Clínica Integrada" },
      { property: "og:description", content: "Saúde humanizada com especialistas e tecnologia no Centro do Rio." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [open, setOpen] = useState(false);
  const [doctor, setDoctor] = useState<DoctorPick>(null);
  const schedule = () => { setDoctor(null); setOpen(true); };
  return (
    <>
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground">
        Pular para o conteúdo
      </a>
      <Header onSchedule={schedule} />
      <main id="conteudo">
        <Hero onSchedule={schedule} />
        <About />
        <Specialties />
        <Professionals onScheduleDoctor={(d) => { setDoctor(d); setOpen(true); }} />
        <Testimonials />
        <Location />
      </main>
      <Footer />
      <FloatingActions onSchedule={schedule} />
      <PreRegisterDialog key={doctor?.name ?? "geral"} open={open} onOpenChange={setOpen} doctor={doctor} />
    </>
  );
}

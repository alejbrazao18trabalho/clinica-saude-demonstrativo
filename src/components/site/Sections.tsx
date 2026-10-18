import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import {
  Baby, Bone, Clock, HeartPulse, Mail, MapPin, Phone, Quote, Sparkles, Star, Stethoscope, Target, Eye, HandHeart, Flower2,
} from "lucide-react";
import { CLINIC, DOCTORS, SPECIALTIES, TESTIMONIALS } from "@/data/clinic";
import team from "@/assets/team.jpg";
import { cn } from "@/lib/utils";

function SectionHead({ eyebrow, title, desc, center = true }: { eyebrow: string; title: string; desc?: string; center?: boolean }) {
  return (
    <div className={cn("mb-12 max-w-2xl", center && "mx-auto text-center")}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="mt-3 text-3xl font-extrabold text-primary sm:text-4xl">{title}</h2>
      {desc && <p className="mt-4 text-lg text-muted-foreground">{desc}</p>}
    </div>
  );
}

export function About() {
  const items = [
    { icon: Target, t: "Missão", d: "Promover saúde com excelência técnica e empatia em cada atendimento." },
    { icon: Eye, t: "Visão", d: "Ser referência em cuidado integrado e humanizado no Rio de Janeiro." },
    { icon: HandHeart, t: "Compromisso", d: "Escuta ativa, transparência e respeito à história de cada paciente." },
  ];
  return (
    <section id="sobre" className="py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2">
        <div className="relative">
          <div className="absolute -left-4 -top-4 h-full w-full rounded-[2rem] bg-accent/40" aria-hidden />
          <img src={team} alt="Equipe médica da clínica reunida" width={1024} height={1200} loading="lazy" className="relative aspect-[4/5] w-full rounded-[2rem] object-cover shadow-soft" />
          <div className="absolute -bottom-6 right-6 rounded-2xl bg-card p-5 shadow-soft">
            <p className="font-display text-3xl font-extrabold text-primary">15+</p>
            <p className="text-sm text-muted-foreground">anos cuidando de vidas</p>
          </div>
        </div>
        <div>
          <SectionHead center={false} eyebrow="Sobre nós" title="Medicina de alto nível, com o calor de quem cuida."
            desc="Nascemos com o propósito de transformar a experiência médica: menos espera, mais escuta. Cada detalhe da Vitalis foi pensado para que você se sinta seguro e acolhido." />
          <ul className="space-y-4">
            {items.map(({ icon: Icon, t, d }) => (
              <li key={t} className="flex gap-4 rounded-2xl border border-border bg-card p-5 transition-shadow hover:shadow-soft">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-secondary text-primary"><Icon className="h-5 w-5" aria-hidden /></span>
                <div><h3 className="font-bold text-primary">{t}</h3><p className="text-muted-foreground">{d}</p></div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

const SPEC_ICONS = [HeartPulse, Stethoscope, Baby, Sparkles, Flower2, Bone];

export function Specialties() {
  return (
    <section id="especialidades" className="bg-secondary/50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHead eyebrow="Especialidades" title="Cuidado completo para toda a família" desc="Diversas áreas médicas integradas para um diagnóstico mais preciso e um tratamento contínuo." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SPECIALTIES.map((s, i) => {
            const Icon = SPEC_ICONS[i] ?? Stethoscope;
            return (
              <article key={s.name} className="group rounded-3xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:shadow-soft">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand text-primary-foreground transition-transform group-hover:scale-105"><Icon className="h-6 w-6" aria-hidden /></span>
                <h3 className="mt-5 text-xl font-bold text-primary">{s.name}</h3>
                <p className="mt-2 text-muted-foreground">{s.desc}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function DoctorCard({ name, specialty, crm, photo }: (typeof DOCTORS)[number]) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-soft">
      <div className="overflow-hidden bg-muted">
        <img src={photo} alt={`Foto de ${name}`} width={768} height={896} loading="lazy" className="aspect-[6/7] w-full object-cover transition-transform duration-500 group-hover:scale-105" />
      </div>
      <div className="p-5">
        <span className="rounded-full bg-accent/50 px-3 py-1 text-xs font-bold text-accent-foreground">{specialty}</span>
        <h3 className="mt-3 text-lg font-bold text-primary">{name}</h3>
        <p className="text-sm text-muted-foreground">{crm}</p>
      </div>
    </article>
  );
}

export function Professionals() {
  return (
    <section id="profissionais" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHead eyebrow="Corpo clínico" title="Profissionais que fazem a diferença" desc="Especialistas com sólida formação e o compromisso de tratar cada paciente como único." />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {DOCTORS.map((d) => <DoctorCard key={d.crm} {...d} />)}
        </div>
      </div>
    </section>
  );
}

export function Testimonials() {
  const [ref, embla] = useEmblaCarousel({ loop: true, align: "start" });
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (!embla) return;
    const on = () => setIdx(embla.selectedScrollSnap());
    embla.on("select", on);
    const t = setInterval(() => embla.scrollNext(), 5000);
    return () => { clearInterval(t); embla.off("select", on); };
  }, [embla]);
  return (
    <section id="avaliacoes" className="bg-brand py-24 text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-12 text-center">
          <span className="eyebrow text-accent">Avaliações</span>
          <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">Quem é cuidado por nós, recomenda</h2>
          <p className="mt-3 flex items-center justify-center gap-2 text-primary-foreground/85">
            <Star className="h-5 w-5 fill-current text-accent" aria-hidden /> 4,9 de média em mais de 1.200 avaliações
          </p>
        </div>
        <div className="overflow-hidden" ref={ref} aria-roledescription="carrossel" aria-label="Depoimentos de pacientes">
          <div className="-ml-5 flex">
            {TESTIMONIALS.map((t) => (
              <figure key={t.name} className="min-w-0 flex-[0_0_100%] pl-5 md:flex-[0_0_50%] lg:flex-[0_0_33.333%]">
                <div className="h-full rounded-3xl bg-card p-7 text-card-foreground shadow-soft">
                  <Quote className="h-8 w-8 text-mint" aria-hidden />
                  <div className="mt-3 flex gap-0.5" role="img" aria-label={`${t.stars} de 5 estrelas`}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={cn("h-4 w-4", i < t.stars ? "fill-current text-mint" : "text-border")} aria-hidden />
                    ))}
                  </div>
                  <blockquote className="mt-4 text-lg leading-relaxed">“{t.text}”</blockquote>
                  <figcaption className="mt-5 font-bold text-primary">{t.name}</figcaption>
                </div>
              </figure>
            ))}
          </div>
        </div>
        <div className="mt-8 flex justify-center gap-2">
          {TESTIMONIALS.map((_, i) => (
            <button key={i} onClick={() => embla?.scrollTo(i)} aria-label={`Depoimento ${i + 1}`} aria-current={i === idx}
              className={cn("h-2.5 rounded-full transition-all", i === idx ? "w-8 bg-accent" : "w-2.5 bg-primary-foreground/40")} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function Location() {
  const q = encodeURIComponent("Av. Rio Branco, 156, Centro, Rio de Janeiro - RJ");
  return (
    <section id="contato" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHead eyebrow="Localização e horários" title="Venha nos visitar" desc="Fácil acesso no Centro do Rio, próximo ao metrô Carioca." />
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-5 rounded-3xl border border-border bg-card p-8">
            <InfoRow icon={MapPin} title="Endereço">{CLINIC.address}</InfoRow>
            <InfoRow icon={Phone} title="Telefone"><a className="hover:text-primary" href={`tel:${CLINIC.phone.replace(/\D/g, "")}`}>{CLINIC.phone}</a></InfoRow>
            <InfoRow icon={Mail} title="E-mail"><a className="hover:text-primary" href={`mailto:${CLINIC.email}`}>{CLINIC.email}</a></InfoRow>
            <InfoRow icon={Clock} title="Horário de funcionamento">
              <dl className="mt-1 divide-y divide-border">
                {CLINIC.hours.map((h) => (
                  <div key={h.day} className="flex justify-between gap-4 py-2">
                    <dt>{h.day}</dt><dd className="font-semibold text-primary">{h.time}</dd>
                  </div>
                ))}
              </dl>
            </InfoRow>
          </div>
          <div className="min-h-[380px] overflow-hidden rounded-3xl border border-border shadow-soft">
            <iframe title="Mapa da localização da clínica" src={`https://www.google.com/maps?q=${q}&output=embed`} className="h-full min-h-[380px] w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoRow({ icon: Icon, title, children }: { icon: typeof MapPin; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-secondary text-primary"><Icon className="h-5 w-5" aria-hidden /></span>
      <div className="min-w-0 flex-1 text-muted-foreground"><h3 className="font-bold text-primary">{title}</h3>{children}</div>
    </div>
  );
}

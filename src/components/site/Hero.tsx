import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowRight, ChevronLeft, ChevronRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";

const SLIDES = [
  { src: hero1, alt: "Recepção clara e acolhedora da clínica" },
  { src: hero2, alt: "Médica conversando com paciente em consultório" },
  { src: hero3, alt: "Sala de exames com equipamentos modernos" },
];

export function Hero({ onSchedule }: { onSchedule: () => void }) {
  const [emblaRef, embla] = useEmblaCarousel({ loop: true });
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!embla) return;
    const onSelect = () => setIndex(embla.selectedScrollSnap());
    embla.on("select", onSelect);
    const t = setInterval(() => embla.scrollNext(), 6000);
    return () => { clearInterval(t); embla.off("select", onSelect); };
  }, [embla]);

  const prev = useCallback(() => embla?.scrollPrev(), [embla]);
  const next = useCallback(() => embla?.scrollNext(), [embla]);

  return (
    <section id="inicio" aria-roledescription="carrossel" aria-label="Destaques da clínica" className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {SLIDES.map((s, i) => (
            <div key={i} className="relative aspect-[3/4] max-h-[88vh] min-w-0 flex-[0_0_100%] sm:aspect-video lg:aspect-[21/9] lg:min-h-[34rem]" aria-roledescription="slide" aria-label={`${i + 1} de ${SLIDES.length}`}>
              <img src={s.src} alt={s.alt} width={1600} height={912} className="img-fluid h-full object-cover" loading={i === 0 ? "eager" : "lazy"} />
            </div>
          ))}
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-hero-overlay" />
      <div className="absolute inset-0 flex items-center">
        <div className="container-fluid">
          <div className="w-full max-w-[min(42rem,100%)] animate-fade-up text-primary-foreground">
            <span className="mb-[clamp(0.75rem,2vw,1.25rem)] hidden min-[400px]:inline-flex items-center gap-2 rounded-full border border-primary-foreground/25 bg-primary-foreground/10 px-4 py-1.5 text-sm font-semibold backdrop-blur">
              <ShieldCheck className="h-4 w-4 text-accent" aria-hidden /> Saúde humanizada no coração do Rio
            </span>
            <h1 className="text-fluid-display font-extrabold">
              Cuidar de você é a nossa <span className="text-accent">melhor especialidade.</span>
            </h1>
            <p className="mt-[clamp(0.75rem,2vw,1.25rem)] max-w-[36rem] text-fluid-lead text-primary-foreground/85">
              Médicos experientes, tecnologia de ponta e um atendimento acolhedor — tudo em um só lugar, pensado para o seu bem-estar.
            </p>
            <div className="pointer-events-auto mt-[clamp(1.25rem,3vw,2rem)] flex flex-wrap gap-3">
              <Button asChild variant="hero" size="xl">
                <a href="#especialidades">Conheça nossos serviços <ArrowRight className="h-4 w-4" aria-hidden /></a>
              </Button>
              <Button variant="heroOutline" size="xl" className="rounded-full" onClick={onSchedule}>
                Pré-cadastro
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-[clamp(0.75rem,3vw,2rem)] left-1/2 flex -translate-x-1/2 items-center gap-3">
        <button onClick={prev} aria-label="Slide anterior" className="grid h-10 w-10 place-items-center rounded-full bg-primary-foreground/15 text-primary-foreground backdrop-blur hover:bg-primary-foreground/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
          <ChevronLeft className="h-5 w-5" />
        </button>
        {SLIDES.map((_, i) => (
          <button key={i} onClick={() => embla?.scrollTo(i)} aria-label={`Ir para slide ${i + 1}`} aria-current={i === index}
            className={cn("h-2.5 rounded-full transition-all", i === index ? "w-8 bg-accent" : "w-2.5 bg-primary-foreground/50")} />
        ))}
        <button onClick={next} aria-label="Próximo slide" className="grid h-10 w-10 place-items-center rounded-full bg-primary-foreground/15 text-primary-foreground backdrop-blur hover:bg-primary-foreground/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
}

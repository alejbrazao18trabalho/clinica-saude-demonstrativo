import { useMemo, useState } from "react";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { parseISODate, toISODate } from "@/lib/dates";

const MIN_BIRTH_YEAR = 1900;

/**
 * Seletor de data de nascimento: hoje é o teto.
 * O calendário bloqueia dias, meses e anos depois de hoje — a navegação e a
 * lista de anos só vão para trás — e a digitação não é possível, então o
 * envio continua protegido pela validação do formulário.
 */
export function BirthDatePicker({ id, value, onChange, error }: {
  id: string;
  value: string;
  onChange: (iso: string) => void;
  error?: string | undefined;
}) {
  const [open, setOpen] = useState(false);

  // Capta a data de hoje no momento em que o campo é montado, no fuso do visitante.
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const selected = parseISODate(value);
  const year = today.getFullYear();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id={id}
          type="button"
          variant="outline"
          aria-expanded={open}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-err` : undefined}
          className={cn("w-full justify-start text-left font-normal", !value && "text-muted-foreground")}
        >
          <CalendarIcon className="mr-2 h-4 w-4 shrink-0" aria-hidden />
          {selected ? format(selected, "d 'de' MMMM 'de' yyyy", { locale: ptBR }) : <span>Selecionar data</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          className="pointer-events-auto"
          locale={ptBR}
          captionLayout="dropdown"
          formatters={{ formatMonthDropdown: (d) => d.toLocaleString("pt-BR", { month: "short" }) }}
          selected={selected}
          defaultMonth={selected ?? today}
          onSelect={(d) => {
            if (!d) return;
            onChange(toISODate(d));
            setOpen(false);
          }}
          // Dias depois de hoje ficam desabilitados visualmente e sem clique.
          disabled={{ after: today }}
          classNames={{ disabled: "text-muted-foreground line-through" }}
          // Teto de navegação: o mês atual e o ano atual. Anos só andam para trás.
          startMonth={new Date(MIN_BIRTH_YEAR, 0, 1)}
          endMonth={today}
          numberOfMonths={1}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

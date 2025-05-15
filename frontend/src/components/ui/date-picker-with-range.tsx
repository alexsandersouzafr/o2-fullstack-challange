import * as React from "react";
import { format } from "date-fns";
import { Check, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ptBR } from "date-fns/locale";
import { useNavigate } from "@tanstack/react-router";
import type { Routes } from "@/lib/types";
import { useDateRangeSearchParams } from "@/hooks/useDateRangeSearchParams";
import type { DateRange } from "react-day-picker";

export function DatePickerWithRange({
  className,
  route,
}: {
  route: Routes;
  className?: string;
}) {
  const navigate = useNavigate();

  const { date, setDate } = useDateRangeSearchParams();

  const [open, setOpen] = React.useState(false);

  const handleSetDate = () => {
    setOpen(false);
    navigate({
      to: route as
        | "/product/$id"
        | "/"
        | "/add"
        | "/product"
        | "."
        | ".."
        | "/edit/$id",
      search: {
        startDate: date?.from?.toString(),
        endDate: date?.to?.toString(),
      },
    });
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[250px] justify-start text-left font-normal rounded-l-lg rounded-r-none",
              !date?.from && !date?.to && "text-muted-foreground",
              className
            )}
          >
            <Filter />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y", {
                    locale: ptBR,
                  })}{" "}
                  -{" "}
                  {format(date.to, "LLL dd, y", {
                    locale: ptBR,
                  })}
                </>
              ) : (
                format(date.from, "LLL dd, y", {
                  locale: ptBR,
                })
              )
            ) : (
              <span>Filtrar por período</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date as DateRange}
            onSelect={setDate}
            numberOfMonths={2}
          />
          <div className="w-full flex justify-end">
            <Button className="w-fit" onClick={() => handleSetDate()}>
              <Check />
              Aplicar
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

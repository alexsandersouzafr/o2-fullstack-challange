"use client";

import * as React from "react";
import { format } from "date-fns";
import { Filter } from "lucide-react";
import type { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ptBR } from "date-fns/locale";

export function DatePickerWithRange({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<DateRange | undefined>();

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[250px] justify-start text-left font-normal rounded-l-lg rounded-r-none",
              !date && "text-muted-foreground",
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
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

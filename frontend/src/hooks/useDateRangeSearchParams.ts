import type { DateRange } from "@/lib/types";
import { useMatches, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export function useDateRangeSearchParams() {
  const matches = useMatches();

  const routeId = matches[matches.length - 1]?.routeId;

  const { startDate, endDate } = useSearch({
    from: routeId || "__root__",
  }) as {
    startDate?: string | undefined;
    endDate?: string | undefined;
  };

  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  useEffect(() => {
    setDate({
      from: startDate ? new Date(startDate as string) : undefined,
      to: endDate ? new Date(endDate as string) : undefined,
    });
    console.log("date update", routeId, date);
  }, [startDate, endDate]);

  return { date, setDate };
}

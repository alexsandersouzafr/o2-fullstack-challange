import {
  BetweenHorizontalEnd,
  BetweenHorizontalStart,
  Filter,
} from "lucide-react";
import { Area, AreaChart, Tooltip } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { type ChartConfig, ChartContainer } from "@/components/ui/chart";
import { useQuery } from "@tanstack/react-query";
import { getMovements } from "@/lib/api";
import { cn } from "@/lib/utils";
import { useDateRangeSearchParams } from "@/hooks/useDateRangeSearchParams";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const chartConfig = {
  entry: {
    label: "Movimentação De Estoque",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function Chart({ id, className }: { id?: number; className?: string }) {
  const { date } = useDateRangeSearchParams();

  const { data, error } = useQuery({
    queryKey: ["movements", date],
    queryFn: () => getMovements(id, date?.from, date?.to),
  });

  const isFilterApplied = date?.from !== undefined && date.to !== undefined;

  const chartData = data?.movements
    ? data.movements
        .map((movement) => ({
          ...movement,
          dateTime: new Date(movement.date).toLocaleString(),
          entry: movement.type === "ENTRY" ? movement.quantity : 0,
          exit: movement.type === "EXIT" ? movement.quantity : 0,
        }))
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    : [];

  return (
    <Card className={cn("h-full flex", className)}>
      <CardHeader>
        <CardTitle className="justify-between flex">
          Movimentações do Estoque
          {isFilterApplied && <Filter className="size-4 text-foreground/50" />}
        </CardTitle>
        <CardDescription className="w-3/5">
          Mostrando gráficos de movimentações
          {date?.from && date.to && (
            <>
              {" "}
              de{" "}
              {format(date.from, "dd 'de' MMMM 'de' yyyy", {
                locale: ptBR,
              })}{" "}
              a{" "}
              {format(date.to, "dd 'de' MMMM 'de' yyyy", {
                locale: ptBR,
              })}
            </>
          )}
          .
        </CardDescription>
      </CardHeader>
      <CardContent className="grow">
        {error || !chartData.length ? (
          <div className="grow">Sem resultados.</div>
        ) : (
          <ChartContainer
            config={chartConfig}
            className="h-52 flex items-center w-full"
          >
            <AreaChart accessibilityLayer data={chartData}>
              <Tooltip
                wrapperClassName="rounded-lg shadow-lg"
                formatter={(value, name) => [
                  `${value} unidades`,
                  name === "entry" ? "Entrada" : "Saída",
                ]}
                labelFormatter={(value) => (
                  <span className="text-foreground dark:text-black">
                    Data: {new Date(value).toLocaleString()}
                  </span>
                )}
              />
              <Area
                dataKey="entry"
                type="natural"
                fill="var(--primary)"
                fillOpacity={0.4}
                stroke="var(--primary)"
              />
              <Area
                dataKey="exit"
                type="natural"
                fill="var(--primary)"
                fillOpacity={0.4}
                stroke="var(--primary)"
              />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              <BetweenHorizontalEnd className="h-4 w-4 text-green-500" />
              {data ? data.totals.totalItemsBought : 0} ítens comprados
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              <BetweenHorizontalStart className="h-4 w-4 text-red-500" />
              {data ? data.totals.totalItemsSold : 0} ítens vendidos
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

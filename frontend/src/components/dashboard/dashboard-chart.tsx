import { TrendingDown, TrendingUp } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

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
import { cn, currencyFormatter } from "@/lib/utils";
import { useDateRangeSearchParams } from "@/hooks/useDateRangeSearchParams";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const chartConfig = {
  desktop: {
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
    <Card className={cn("w-[70%]", className)}>
      <CardHeader>
        <CardTitle>Movimentações do Estoque</CardTitle>
        <CardDescription>
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
      <CardContent className="h-full">
        {error || !chartData.length ? (
          <div className="grow">Sem resultados.</div>
        ) : (
          <ChartContainer config={chartConfig} className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
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
            </ResponsiveContainer>
          </ChartContainer>
        )}
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              <TrendingUp className="h-4 w-4 text-green-500" />
              Total entradas: {data ? currencyFormatter(data.totals.entry) : 0}
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              <TrendingDown className="h-4 w-4 text-red-500" />
              Total saídas: {data ? currencyFormatter(data.totals.exit) : 0}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

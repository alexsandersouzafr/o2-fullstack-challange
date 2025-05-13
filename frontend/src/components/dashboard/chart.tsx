"use client";

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
import { useMemo } from "react";

const chartConfig = {
  desktop: {
    label: "Movimentação De Estoque",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function Chart() {
  const { data, error } = useQuery({
    queryKey: ["movements"],
    queryFn: () => getMovements(),
  });

  const chartData = useMemo(() => {
    if (!data?.movements) return [];

    return data.movements
      .map((movement) => ({
        ...movement,
        dateTime: new Date(movement.date).toLocaleString(),
        entry: movement.type === "ENTRY" ? movement.quantity : 0,
        exit: movement.type === "EXIT" ? movement.quantity : 0,
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [data]);

  if (!error)
    return (
      <Card className="w-[70%]">
        <CardHeader>
          <CardTitle>Vendas</CardTitle>
          <CardDescription>
            Mostrando gráficos de vendas no período selecionado.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <Tooltip
                  formatter={(value, name) => [
                    `${value} unidades`,
                    name === "entry" ? "Entrada" : "Saída",
                  ]}
                  labelFormatter={(value) =>
                    `Data: ${new Date(value).toLocaleString()}`
                  }
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
        </CardContent>
        <CardFooter>
          <div className="flex w-full items-start gap-2 text-sm">
            <div className="grid gap-2">
              <div className="flex items-center gap-2 font-medium leading-none">
                <TrendingUp className="h-4 w-4 text-green-500" />
                Total entradas: {data?.totals.entry} unidades
              </div>
              <div className="flex items-center gap-2 leading-none text-muted-foreground">
                <TrendingDown className="h-4 w-4 text-red-500" />
                Total saídas: {data?.totals.exit} unidades
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    );
}

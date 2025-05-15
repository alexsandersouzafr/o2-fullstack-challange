import { currencyFormatter } from "@/lib/utils";
import MetricCard from "../dashboard/metric-card";
import { Card } from "../ui/card";
import { ClockPlus, FilePenLine } from "lucide-react";
import type { MovementsResponse, Product } from "@/lib/types";
import { format } from "date-fns";
import { useDateRangeSearchParams } from "@/hooks/useDateRangeSearchParams";

export default function Metrics({
  movementsData,
  productData,
}: {
  movementsData: MovementsResponse;
  productData: Product;
}) {
  const { date } = useDateRangeSearchParams();
  return (
    <div className="grid grid-cols-2 gap-8">
      <MetricCard
        className="h-24 [&>*>span]:text-2xl [&>*>h3]:text-sm"
        title="Total de vendas:"
        value={currencyFormatter(movementsData.totals.exit).toString()}
        variant="secondary"
        filtered={date?.from && date?.to !== undefined}
      />
      <MetricCard
        className="h-24 [&>*>span]:text-2xl [&>*>h3]:text-sm"
        title="Quantidade em estoque:"
        value={productData.stock.toString()}
      />
      <MetricCard
        className="h-24 [&>*>span]:text-2xl [&>*>h3]:text-sm"
        title="Itens vendidos:"
        value={movementsData.totals.totalItemsSold.toString()}
        filtered={date?.from && date?.to !== undefined}
      />

      <MetricCard
        className="h-24 [&>*>span]:text-2xl [&>*>h3]:text-sm"
        title="Itens comprados:"
        value={movementsData.totals.entry.toString()}
        filtered={date?.from && date?.to !== undefined}
      />
      <MetricCard
        className="h-24 [&>*>span]:text-2xl [&>*>h3]:text-sm"
        title="Preço unitário:"
        value={currencyFormatter(productData.unitPrice)}
      />
      <Card className="text-sm text-foreground/60 p-4 gap-0">
        <div>
          <ClockPlus /> Criado em:
        </div>
        {format(productData.createdAt, " dd/mm/yyyy")}
      </Card>
      <Card className="text-sm text-foreground/60 p-4 gap-0">
        <div>
          <FilePenLine />
          Última atualização:
        </div>
        {format(productData.updatedAt, "dd/mm/yyyy")}
      </Card>
    </div>
  );
}

import { getStockTotals } from "@/lib/api";
import { currencyFormatter } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { BadgeDollarSign, Layers, PackageCheck } from "lucide-react";
import MetricCard from "./metric-card";

export default function MetricHighlights() {
  const { data: metrics } = useQuery({
    queryKey: ["darboardMetrics"],
    queryFn: () => getStockTotals(),
  });

  const cardsData = [
    {
      title: "Total de vendas",
      value: String(currencyFormatter(metrics?.totalSales || 0)),
      icon: <BadgeDollarSign strokeWidth={1.5} size={44} />,
    },
    {
      title: "Valor do estoque",
      value: String(currencyFormatter(metrics?.totalStockValue || 0)),
      icon: <Layers strokeWidth={1.5} size={44} />,
    },
    {
      title: "Total de ítens vendidos",
      value: String(metrics?.totalItemsSold || 0),
      icon: <PackageCheck strokeWidth={1.5} size={44} />,
    },
  ];

  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="flex gap-8 w-full">
        {cardsData.map((item, index) => (
          <MetricCard
            {...item}
            key={index}
            variant={index == 0 ? "secondary" : "default"}
          />
        ))}
      </div>
    </div>
  );
}

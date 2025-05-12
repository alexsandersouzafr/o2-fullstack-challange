import { BadgeDollarSign, Layers, PackageCheck } from "lucide-react";
import MetricCard from "./metric-card";
import { DatePickerWithRange } from "@/components/date-picker-with-range";
import { ProductFilter } from "./product-filter";
import TopProducts from "./top-products";
import { Chart } from "./chart";

const metricas = [
  {
    title: "Total de vendas",
    value: "R$ 875.63",
    icon: <BadgeDollarSign strokeWidth={1.5} size={44} />,
  },
  {
    title: "Valor do estoque",
    value: "R$ 56.789,63",
    icon: <Layers strokeWidth={1.5} size={44} />,
  },
  {
    title: "Total de ítens vendidos",
    value: "69",
    icon: <PackageCheck strokeWidth={1.5} size={44} />,
  },
];

export default function Dashboard() {
  return (
    <div className="p-4 border rounded-lg flex flex-col gap-8 w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-5xl font-bold">DASHBOARD</h1>

        <div className="flex gap-8">
          <DatePickerWithRange />
          <ProductFilter />
        </div>
      </div>
      <div className="flex gap-8">
        <div className="flex flex-col gap-8 w-full">
          <div className="flex gap-8 w-full">
            {metricas.map((item, index) => (
              <MetricCard
                {...item}
                key={index}
                variant={index == 0 ? "secondary" : "default"}
              />
            ))}
          </div>
          <div className="flex gap-8 w-full">
            <Chart />
            <TopProducts />
          </div>
        </div>
      </div>
    </div>
  );
}

import TopProducts from "./top-products";
import { Chart } from "./dashboard-chart";
import Filters from "./filters";
import MetricHighlights from "./metric-highlights";

export default function Dashboard() {
  return (
    <div className="p-4 border rounded-lg flex flex-col gap-8 w-full">
      <div className="flex gap-8 flex-col">
        <MetricHighlights />
        <div className="flex gap-8 w-full">
          <Chart className="w-[66%] h-[398px]" />
          <TopProducts />
        </div>
      </div>
      <Filters />
    </div>
  );
}

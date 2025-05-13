import TopProducts from "./top-products";
import { Chart } from "./chart";
import Filters from "./filters";
import MetricHighlights from "./metric-highlights";

export default function Dashboard() {
  return (
    <div className="p-4 border rounded-lg flex flex-col gap-8 w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-5xl font-bold">DASHBOARD</h1>
      </div>
      <div className="flex gap-8 flex-col">
        <MetricHighlights />
        <div className="flex gap-8 w-full">
          <Chart />
          <TopProducts />
        </div>
      </div>
      <Filters />
    </div>
  );
}

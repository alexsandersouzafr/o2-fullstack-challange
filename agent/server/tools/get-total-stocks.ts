import { z } from "zod";
import { server } from "../index.ts";
import { getStockTotals } from "../lib/api.ts";

server.tool(
  "get-total-sales-per-period",
  {
    startDate: z.string(),
    endDate: z.string(),
  },
  async ({ startDate, endDate }) => {
    const res = await getStockTotals(startDate, endDate);
    const data = await res.totalSales;
    return { content: [{ type: "text", text: data }] };
  }
);

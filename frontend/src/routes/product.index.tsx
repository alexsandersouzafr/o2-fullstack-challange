import Stock from "@/components/stock/stock";
import AnimatedPage from "@/components/ui/animated-page";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const productSearchSchema = z.object({
  limit: z.number().min(1).default(10),
  page: z.number().min(1).default(1),
});

export const Route = createFileRoute("/product/")({
  component: RouteComponent,
  validateSearch: productSearchSchema,
});

function RouteComponent() {
  return (
    <AnimatedPage>
      <Stock />
    </AnimatedPage>
  );
}

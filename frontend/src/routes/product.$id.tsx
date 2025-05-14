import ProductView from "@/components/stock/product-view";
import AnimatedPage from "@/components/ui/animated-page";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const movementsSearchSchema = z.object({
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

export const Route = createFileRoute("/product/$id")({
  component: RouteComponent,
  loader: ({ params }) => params.id,
  validateSearch: movementsSearchSchema.parse,
});

function RouteComponent() {
  const id = Route.useLoaderData();

  return (
    <AnimatedPage>
      <ProductView id={parseInt(id)} />
    </AnimatedPage>
  );
}

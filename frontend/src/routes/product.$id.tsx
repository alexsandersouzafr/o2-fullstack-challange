import ProductView from "@/components/stock/product-view";
import AnimatedPage from "@/components/ui/animated-page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/product/$id")({
  component: RouteComponent,
  loader: ({ params }) => params.id,
});

function RouteComponent() {
  const id = Route.useLoaderData();

  return (
    <AnimatedPage>
      <ProductView id={parseInt(id)} />
    </AnimatedPage>
  );
}

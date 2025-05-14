import { ProductForm } from "@/components/stock/form";
import AnimatedPage from "@/components/ui/animated-page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/edit/$id")({
  component: RouteComponent,
  loader: ({ params }) => params.id,
});

function RouteComponent() {
  const id = Route.useLoaderData();

  return (
    <AnimatedPage>
      <ProductForm id={parseInt(id)} editMode />
    </AnimatedPage>
  );
}

import { ProductForm } from "@/components/stock/form";
import AnimatedPage from "@/components/ui/animated-page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/add")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AnimatedPage>
      <ProductForm />
    </AnimatedPage>
  );
}

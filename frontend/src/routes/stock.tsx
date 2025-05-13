import AnimatedPage from "@/components/ui/animated-page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/stock")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AnimatedPage>
      <div>Hello "/stock"!</div>
    </AnimatedPage>
  );
}

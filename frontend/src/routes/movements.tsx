import AnimatedPage from "@/components/ui/animated-page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/movements")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AnimatedPage>
      <div>Hello "/movements"!</div>
    </AnimatedPage>
  );
}

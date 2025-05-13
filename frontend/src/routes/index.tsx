import { createFileRoute } from "@tanstack/react-router";
import Dashboard from "@/components/dashboard/dashboard";
import AnimatedPage from "@/components/ui/animated-page";

export const Route = createFileRoute("/")({
  component: () => (
    <AnimatedPage>
      <Dashboard />
    </AnimatedPage>
  ),
});

import { createFileRoute } from "@tanstack/react-router";
import Dashboard from "@/components/dashboard/dashboard";
import AnimatedPage from "@/components/ui/animated-page";
import { z } from "zod";

const movementsSearchSchema = z.object({
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

export const Route = createFileRoute("/")({
  component: () => (
    <AnimatedPage>
      <Dashboard />
    </AnimatedPage>
  ),
  validateSearch: movementsSearchSchema,
});

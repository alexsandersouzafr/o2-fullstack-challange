import Navbar from "@/components/ui/navbar";
import Welcome from "@/components/ui/welcome";
import { ThemeProvider } from "@/hooks/theme-provider";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: () => (
    <div className="flex [&>*]:transition-all [&>*]:duration-500 [&>*]:ease-out">
      <ThemeProvider>
        <div className="bg-background min-h-screen min-w-screen">
          <div className="max-w-6xl mx-auto px-2 py-8 flex flex-col gap-4">
            <Welcome />
            <div className="flex gap-8 justify-between">
              <h1 className="text-5xl font-bold">DASHBOARD</h1>
              <Navbar />
            </div>
            <Outlet />
            <TanStackRouterDevtools />
          </div>
        </div>
      </ThemeProvider>
    </div>
  ),
});

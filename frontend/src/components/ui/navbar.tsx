import { CircleGauge, PackageSearch } from "lucide-react";

import { ThemeToggle } from "./theme-toggle";
import { Button } from "./button";
import { useNavigate } from "@tanstack/react-router";
import AiInterface from "./ai-interface";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <nav className="flex justify-between items-center gap-4">
      <ThemeToggle />
      <div className="flex [&>button]:bg-primary/40 [&>button]:text-foreground">
        <Button
          className="rounded-r-none"
          onClick={() => navigate({ to: "/" })}
        >
          <CircleGauge strokeWidth={1.5} />
          Dashboard
        </Button>
        <Button
          className="rounded-r-lg rounded-l-none border-l "
          onClick={() => navigate({ to: "/product" })}
        >
          <PackageSearch strokeWidth={1.5} />
          Produtos
        </Button>
      </div>
      <AiInterface />
    </nav>
  );
}

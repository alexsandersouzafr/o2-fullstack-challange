import { CircleGauge, PackageSearch, TicketCheck } from "lucide-react";

import { Sparkles } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./button";
import { useNavigate } from "@tanstack/react-router";

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
          className="rounded-none border-l border-r"
          onClick={() => navigate({ to: "/product" })}
        >
          <PackageSearch strokeWidth={1.5} />
          Produtos
        </Button>
        <Button
          className="
          rounded-l-none"
          onClick={() => navigate({ to: "/movements" })}
        >
          <TicketCheck strokeWidth={1.5} />
          Movimentações
        </Button>
      </div>
      <Button className="px-5">
        <Sparkles className="h-[1.2rem] w-[1.2rem] transition-all" /> Ajuda da
        IA
      </Button>
    </nav>
  );
}

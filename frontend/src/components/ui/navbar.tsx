import { CircleGauge, PackageSearch, TicketCheck } from "lucide-react";

import { Sparkles } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./button";
import { Link } from "@tanstack/react-router";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center gap-4">
      <ThemeToggle />
      <div className="flex [&>button]:bg-primary/40 [&>button]:text-foreground">
        <Link to="/">
          <Button className="rounded-r-none">
            <CircleGauge strokeWidth={1.5} />
            Dashboard
          </Button>
        </Link>{" "}
        <Link to="/stock">
          <Button className="rounded-none border-l border-r">
            <PackageSearch strokeWidth={1.5} />
            Produtos
          </Button>
        </Link>
        <Link to="/movements">
          <Button
            className="
          rounded-l-none"
          >
            <TicketCheck strokeWidth={1.5} />
            Movimentações
          </Button>
        </Link>
      </div>
      <Button className="px-5">
        <Sparkles className="h-[1.2rem] w-[1.2rem] transition-all" /> Ajuda da
        IA
      </Button>
    </nav>
  );
}

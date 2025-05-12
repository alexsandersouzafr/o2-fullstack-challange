import { CircleGauge, PackageSearch, TicketCheck } from "lucide-react";

import { Sparkles } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-4">
        <Button>
          <CircleGauge strokeWidth={1.5} />
          Dashboard
        </Button>
        <Button>
          <PackageSearch strokeWidth={1.5} />
          Produtos
        </Button>
        <Button>
          <TicketCheck strokeWidth={1.5} />
          Movimentações
        </Button>
      </div>
      <div className="flex gap-4 rounded-lg bg-background text-primary py-2 px-4 items-center">
        <Button variant="outline" size="icon">
          <Sparkles
            className="h-[1.2rem] w-[1.2rem] transition-all"
            strokeWidth={1.5}
          />
        </Button>
        <ThemeToggle />
      </div>
    </div>
  );
}

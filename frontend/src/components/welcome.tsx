import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Sparkles } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";

export default function Welcome() {
  const formattedDate = format(new Date(), "PPPP", {
    locale: ptBR,
  });
  return (
    <div className="rounded-4xl border bg-primary text-primary-foreground p-4 flex justify-between items-center text-xl">
      <div>
        <strong>Bem-vindo Usuário!</strong> Hoje é dia {formattedDate}.
      </div>
      <div className="flex gap-4 rounded-4xl bg-background text-primary py-2 px-4 items-center">
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

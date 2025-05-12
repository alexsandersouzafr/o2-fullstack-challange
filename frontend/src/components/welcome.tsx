import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
export default function Welcome() {
  const formattedDate = format(new Date(), "PPPP", {
    locale: ptBR,
  });
  return (
    <div className="rounded-lg border bg-primary text-primary-foreground p-4 flex justify-between items-center text-xl">
      <div>
        <strong>Bem-vindo Usuário!</strong> Hoje é dia {formattedDate}.
      </div>
    </div>
  );
}

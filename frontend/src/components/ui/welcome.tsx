import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
export default function Welcome() {
  const formattedDate = format(new Date(), "PPPP", {
    locale: ptBR,
  });
  return (
    <div className="flex justify-between items-center ">
      <div>
        <strong>Bem-vindo Usuário!</strong> Hoje é {formattedDate}.
      </div>
    </div>
  );
}

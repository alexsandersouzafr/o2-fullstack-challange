import {
  ArrowRightLeft,
  FilterX,
  PackageMinus,
  PackagePlus,
  Pencil,
  Settings,
  Trash,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DatePickerWithRange } from "../ui/date-picker-with-range";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { useProductId } from "@/hooks/useProductId";

export default function ProductViewControls() {
  const navigate = useNavigate();
  const pathname = useLocation().pathname;
  const id = useProductId();
  return (
    <div className="flex ">
      <DatePickerWithRange route="/product/$id" />
      <Button
        variant="secondary"
        className="rounded-none border-l border-r"
        onClick={() => navigate({ to: pathname })}
      >
        <FilterX />
        Limpar Filtro
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="secondary"
            className="rounded-none border-l border-r"
          >
            <span className="sr-only">Ações</span>
            <Settings /> Ações
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="rounded-lg flex flex-col gap-2 p-4"
        >
          <DropdownMenuItem onClick={() => navigate({ to: "/edit/" + id })}>
            <Pencil />
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Trash />
            Excluir
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="secondary"
            className="rounded-l-none rounded-r-lg border-l border-r"
          >
            <span className="sr-only">Nova movimentação</span>
            <ArrowRightLeft />
            Nova movimentação
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="rounded-lg flex flex-col gap-2 p-4"
        >
          <DropdownMenuItem>
            <PackagePlus />
            Nova entrada
          </DropdownMenuItem>
          <DropdownMenuItem>
            <PackageMinus />
            Nova saída
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

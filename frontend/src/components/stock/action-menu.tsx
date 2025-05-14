import {
  ChartNoAxesCombined,
  MoreHorizontal,
  PackageMinus,
  PackagePlus,
  Pencil,
  Trash,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "@tanstack/react-router";

export default function ActionMenu({ id }: { id: number }) {
  const navigate = useNavigate();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="rounded-lg flex flex-col gap-2 p-4"
      >
        <div>
          <DropdownMenuLabel>Ações</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() =>
              navigate({
                to: "/product/$id",
                params: { id: id.toString() },
                replace: true,
              })
            }
          >
            <ChartNoAxesCombined />
            Ver detalhes
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Pencil />
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Trash />
            Excluir
          </DropdownMenuItem>
        </div>
        <hr />
        <div>
          <DropdownMenuLabel>Movimentação</DropdownMenuLabel>
          <DropdownMenuItem>
            <PackagePlus />
            Nova entrada
          </DropdownMenuItem>
          <DropdownMenuItem>
            <PackageMinus />
            Nova saída
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

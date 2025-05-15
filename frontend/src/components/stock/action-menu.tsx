import {
  ArrowLeftRight,
  BarChartIcon as ChartNoAxesCombined,
  MoreHorizontal,
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
import { Dialog } from "../ui/dialog";
import DeleteDialog from "./delete-dialog";
import { useState } from "react";
import MovementDialog from "./movement-dialog";

export default function ActionMenu({ id }: { id: number }) {
  const navigate = useNavigate();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [movementDialogOpen, setMovementDialogOpen] = useState(false);

  return (
    <>
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
              <ChartNoAxesCombined className="mr-2 h-4 w-4" />
              Ver detalhes
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                navigate({
                  to: "/edit/$id",
                  params: { id: id.toString() },
                  replace: true,
                })
              }
            >
              <Pencil className="mr-2 h-4 w-4" />
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setDeleteDialogOpen(true)}>
              <Trash className="mr-2 h-4 w-4" />
              Excluir
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setMovementDialogOpen(true)}>
              <ArrowLeftRight className="mr-2 h-4 w-4" />
              Nova movimentação
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DeleteDialog id={id} />
      </Dialog>

      <Dialog open={movementDialogOpen} onOpenChange={setMovementDialogOpen}>
        <MovementDialog productId={id} />
      </Dialog>
    </>
  );
}

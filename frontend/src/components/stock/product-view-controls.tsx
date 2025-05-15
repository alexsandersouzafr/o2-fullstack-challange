import { ArrowRightLeft, FilterX, Pencil, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "../ui/date-picker-with-range";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { useProductId } from "@/hooks/useProductId";
import { Dialog, DialogTrigger } from "../ui/dialog";
import DeleteDialog from "./delete-dialog";
import MovementDialog from "./movement-dialog";

export default function ProductViewControls() {
  const navigate = useNavigate();
  const pathname = useLocation().pathname;
  const id = useProductId() || 0;
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
      <Button
        variant="secondary"
        className=" border-l border-r rounded-none gap-2 p-4"
        onClick={() =>
          navigate({ to: "/edit/$id", params: { id: id?.toString() } })
        }
      >
        <Pencil />
        Editar
      </Button>
      <Dialog>
        <DialogTrigger className="inline-flex items-center rounded-none border-l border-r bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80 h-9 px-6 py-2 has-[>svg]:px-6 justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive">
          <Trash />
          Excluir
        </DialogTrigger>
        <DeleteDialog id={id} />
      </Dialog>
      <Dialog>
        <DialogTrigger className="inline-flex items-center rounded-l-none rounded-r-lg border-l border-r bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80 h-9 px-6 py-2 has-[>svg]:px-6 justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive">
          <ArrowRightLeft />
          Nova movimentação
        </DialogTrigger>
        <MovementDialog productId={id} />
      </Dialog>
    </div>
  );
}

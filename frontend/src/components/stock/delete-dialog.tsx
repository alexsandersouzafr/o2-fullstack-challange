import { useMutation } from "@tanstack/react-query";
import { Button } from "../ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { deleteProduct } from "@/lib/api";
import { Spinner } from "../ui/spinner";
import { useLocation, useNavigate } from "@tanstack/react-router";

export default function DeleteDialog({ id }: { id: number }) {
  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: () => deleteProduct(id),
  });

  const isDefault = !isSuccess && !isError && !isPending;

  const navigate = useNavigate();
  const pathname = useLocation().pathname;

  return (
    <DialogContent onPointerDownOutside={(e) => e.preventDefault()}>
      <DialogHeader>
        <DialogTitle>Você tem certeza?</DialogTitle>
        <DialogDescription>
          {isSuccess && "Produto excluído com sucesso."}
          {isError && "Erro ao excluir produto."}
          {isPending && <Spinner />}
          {isDefault &&
            "Esta ação não pode ser desfeita. Você tem certeza que deseja excluir este produto dos nossos servidores?"}
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        {isDefault && (
          <Button variant="secondary" onClick={() => mutate()}>
            Deletar permanentemente
          </Button>
        )}
        <DialogClose
          variant="secondary"
          disabled={isPending}
          onClick={() =>
            isSuccess &&
            navigate({
              to: pathname.startsWith("/product/") ? "/product" : pathname,
              reloadDocument: true,
            })
          }
        >
          {isSuccess || isError ? "Voltar" : "Cancelar"}
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}

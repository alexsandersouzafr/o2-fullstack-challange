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

export default function DeleteDialog({ id }: { id: number }) {
  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: () => deleteProduct(id),
  });

  const isDefault = !isSuccess && !isError && !isPending;

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
        <DialogClose>
          <Button disabled={isPending}>
            {isSuccess || isError ? "Voltar" : "Cancelar"}
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}

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
import { createStockMovement } from "@/lib/api";
import { Spinner } from "../ui/spinner";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

export const stockMovementSchema = z.object({
  quantity: z
    .number({
      required_error: "A quantidade é obrigatória",
      invalid_type_error: "A quantidade deve ser um número",
    })
    .positive("A quantidade deve ser maior que zero"),
  type: z.enum(["ENTRY", "EXIT"], {
    required_error: "O tipo de movimentação é obrigatório",
    invalid_type_error: "O tipo deve ser ENTRY ou EXIT",
  }),
});

export default function MovementDialog({ productId }: { productId: number }) {
  const { mutate, isPending, isSuccess, isError, error, reset } = useMutation({
    mutationFn: ({ quantity, type }: StockMvementSchemaType) =>
      createStockMovement({ productId, quantity, type }),
  });

  const isDefault = !isSuccess && !isError && !isPending;

  type StockMvementSchemaType = z.infer<typeof stockMovementSchema>;

  const form = useForm<StockMvementSchemaType>({
    resolver: zodResolver(stockMovementSchema),
    defaultValues: {
      quantity: 0,
      type: "ENTRY",
    },
  });

  const onSubmit = (data: StockMvementSchemaType) => {
    console.log("AQUI");
    mutate(data);
    return;
  };

  const navigate = useNavigate();

  return (
    <DialogContent onPointerDownOutside={(e) => e.preventDefault()}>
      <DialogHeader>
        <DialogTitle>Movimentação de estoque</DialogTitle>
        {isSuccess && "Movimentação aplicada com sucesso."}
        {isError && <>Erro ao movimentar estoque. {error.message}</>}
        {isPending && <Spinner />}
        {isDefault && (
          <DialogDescription>
            Escolha a quantidade de produtos que deseja movimentar e o tipo de
            movimentação.
          </DialogDescription>
        )}
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {isDefault && (
            <div className="flex  gap-4 p-8">
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
                        placeholder="Quantidade"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className="flex gap-4"
                      >
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="ENTRY" />
                          </FormControl>
                          <FormLabel className="font-normal flex items-center gap-1">
                            <ArrowDownIcon className="h-4 w-4 text-green-500" />
                            Entrada
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="EXIT" />
                          </FormControl>
                          <FormLabel className="font-normal flex items-center gap-1">
                            <ArrowUpIcon className="h-4 w-4 text-red-500" />
                            Saída
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
          <DialogFooter>
            <DialogClose
              variant="secondary"
              disabled={isPending}
              onClick={() =>
                isSuccess
                  ? navigate({
                      to: "/product/$id",
                      params: { id: productId.toString() },
                      reloadDocument: true,
                    })
                  : reset()
              }
            >
              {isSuccess || isError ? "Voltar" : "Cancelar"}
            </DialogClose>
            {isDefault && (
              <Button type="submit" disabled={isPending}>
                Aplicar
              </Button>
            )}
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}

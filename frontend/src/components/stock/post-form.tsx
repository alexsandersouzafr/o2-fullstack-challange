import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { createProduct, getCategories } from "@/lib/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ChevronLeftCircle } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import type { Category } from "@/lib/types";

export const createProductSchema = z.object({
  name: z
    .string()
    .min(1, "O nome do produto é obrigatório")
    .describe("Nome do produto"),
  description: z
    .string()
    .optional()
    .describe("Descrição do produto (opcional)"),
  stock: z
    .number()
    .int("O estoque deve ser um número inteiro")
    .min(0, "O estoque não pode ser negativo")
    .describe("Quantidade em estoque"),
  unitPrice: z
    .number()
    .positive("O preço unitário deve ser maior que zero")
    .describe("Preço unitário do produto"),
  categoryId: z
    .number()
    .int("O ID da categoria deve ser um número inteiro")
    .positive("O ID da categoria deve ser maior que zero")
    .describe("ID da categoria do produto"),
});

type CreateProductSchemaType = z.infer<typeof createProductSchema>;

export function CreateProductForm() {
  const form = useForm<CreateProductSchemaType>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: "",
      description: "",
      stock: 0,
      unitPrice: 0,
      categoryId: undefined,
    },
  });

  const { data: categories, isLoading: isCategoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });

  const {
    mutate,
    isPending,
    isError,
    isSuccess,
    data: postRes,
  } = useMutation({
    mutationFn: createProduct,
  });

  const onSubmit = (data: CreateProductSchemaType) => mutate(data);

  const navigate = useNavigate();

  return (
    <div className="flex border rounded-lg p-8">
      <div className="flex flex-col gap-4 w-1/4 border-r">
        <h2 className="text-lg ">Cadastrar novo produto</h2>
        <Button
          size="default"
          variant="secondary"
          className="w-fit"
          onClick={() => navigate({ to: "/product" })}
        >
          <ChevronLeftCircle />
          Voltar
        </Button>
      </div>
      {isPending && "Carregando"}
      {isSuccess && (
        <div className="p-8 flex flex-col gap-4">
          Produto adicionado com sucesso. Clique em 'continuar' para ver
          detalhes.
          <Button
            className="w-fit"
            onClick={() => navigate({ to: `/product/${postRes.id}` })}
          >
            Continuar
          </Button>
        </div>
      )}
      {isError && "Erro ao cadastrar produto. Tente novamente"}
      {!isPending && !isSuccess && !isError && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-8 px-8"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Produto</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Laptop" {...field} />
                  </FormControl>
                  <FormDescription>
                    Este é o nome público do produto.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: Laptop de alto desempenho"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Uma breve descrição do produto (opcional).
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estoque</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Ex: 10"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription>
                    Quantidade inicialmente disponível em estoque.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="unitPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preço Unitário</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="Ex: 999.99"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormDescription>
                    Preço unitário do produto em reais.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => field.onChange(parseInt(value))}
                      defaultValue={field.value?.toString()}
                      disabled={isCategoriesLoading}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories &&
                          categories.map((category: Category) => (
                            <SelectItem
                              key={category.id}
                              value={category.id.toString()}
                            >
                              {category.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Criando..." : "Criar Produto"}
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
}

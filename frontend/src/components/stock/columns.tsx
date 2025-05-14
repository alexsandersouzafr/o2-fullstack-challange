import type { Product } from "@/lib/types";
import type { ColumnDef } from "@tanstack/react-table";

import ActionMenu from "./action-menu";

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ getValue }) => getValue<number>(),
    enableSorting: true,
    size: 80,
  },
  {
    accessorKey: "name",
    header: "Nome",
    cell: ({ getValue }) => getValue<string>(),
    enableSorting: true,
    size: 200,
  },
  {
    accessorKey: "description",
    header: "Descrição",
    cell: ({ getValue }) => (
      <div className="w-52 text-ellipsis overflow-hidden">
        {getValue<string | undefined>() || "Sem descrição"}
      </div>
    ),
    enableSorting: false,
    size: 100,
  },
  {
    accessorKey: "stock",
    header: "Estoque",
    cell: ({ getValue }) => getValue<number>(),
    enableSorting: true,
    size: 100,
  },
  {
    accessorKey: "unitPrice",
    header: "Preço Unitário",
    cell: ({ getValue }) =>
      getValue<number>().toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      }),
    enableSorting: true,
    size: 120,
  },
  {
    accessorKey: "categoryId",
    header: "Categoria",
    cell: ({ getValue }) => {
      getValue();
    },
    enableSorting: true,
    size: 150,
  },
  {
    accessorKey: "createdAt",
    header: "Criado Em",
    cell: ({ getValue }) =>
      new Date(getValue<string>()).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
    enableSorting: true,
    size: 120,
  },
  {
    accessorKey: "updatedAt",
    header: "Atualizado Em",
    cell: ({ getValue }) =>
      new Date(getValue<string>()).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
    enableSorting: true,
    size: 120,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const id: number = row.getValue("id");
      return <ActionMenu id={id} />;
    },
  },
];

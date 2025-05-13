import { useQuery } from "@tanstack/react-query";
import { DataTable } from "./data-table";
import { getAllProducts, getCategories } from "@/lib/api";
import { columns } from "./columns";
import { Skeleton } from "../ui/skeleton";
import type { Category, Product } from "@/lib/types";
import type { CellContext, ColumnDef } from "@tanstack/react-table";
import { DataTablePagination } from "../ui/data-table-pagination";

export default function Stock() {
  const { data, isLoading, error, isFetched } = useQuery({
    queryKey: ["stockProducs"],
    queryFn: () => getAllProducts(),
  });

  const { data: categories } = useQuery({
    queryKey: ["stockCategories"],
    queryFn: () => getCategories(),
  });

  const tableColumns = columns.map((column) => {
    if (column.header === "Categoria") {
      return {
        ...column,
        cell: ({ getValue }: CellContext<Product, unknown>) => {
          const categoryId = getValue();
          if (typeof categoryId !== "number") {
            return "ID de categoria inválido";
          }
          const category = categories.find(
            (item: Category) => item.id === categoryId
          );
          return category ? category.name : "Sem categoria";
        },
      } as ColumnDef<Product, unknown>;
    }
    return column;
  });

  return (
    <div>
      {isLoading && (
        <div>
          <Skeleton className="w-full h-96" />
        </div>
      )}
      {error && "Não vou possível recuperar os dados."}
      {isFetched && <DataTable columns={tableColumns} data={data} />}
    </div>
  );
}

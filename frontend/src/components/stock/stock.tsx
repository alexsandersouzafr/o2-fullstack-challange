import { useQuery } from "@tanstack/react-query";
import { DataTable } from "./data-table";
import { getAllProducts, getCategories } from "@/lib/api";
import { columns } from "./columns";
import { Skeleton } from "../ui/skeleton";
import type { Category, Product } from "@/lib/types";
import type { CellContext, ColumnDef } from "@tanstack/react-table";
import { DataTablePagination } from "../ui/data-table-pagination";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { Card } from "../ui/card";
import { MessageCircleWarning, Plus } from "lucide-react";
import { categoryStyles } from "@/lib/categories";
import { Button } from "../ui/button";
import CategoryBadge from "../ui/category-badge";

const TableSkeleton = () => (
  <div className="space-y-2">
    {[...Array(5)].map((_, i) => (
      <Skeleton key={i} className="w-full h-12" />
    ))}
  </div>
);

export default function Stock() {
  const { limit, page } = useSearch({ from: "/product/" });

  const { data, isLoading, error } = useQuery({
    queryKey: ["stockProducts", limit, page],
    queryFn: () => getAllProducts(limit, page),
  });

  const { data: categories, isLoading: isCategoriesLoading } = useQuery({
    queryKey: ["stockCategories"],
    queryFn: () => getCategories(),
  });

  const tableColumns = columns.map((column) => {
    if (column.header === "Categoria") {
      return {
        ...column,
        cell: ({ getValue }: CellContext<Product, unknown>) => {
          const categoryId = getValue();
          if (typeof categoryId !== "number" || isCategoriesLoading) {
            return "Carregando...";
          }
          const category = categories?.find(
            (item: Category) => item.id === categoryId
          );
          const style = categoryStyles.find((item) => item.id === categoryId);

          return category ? (
            <CategoryBadge
              style={style!}
              category={category!}
              className="w-fit"
            />
          ) : (
            "Sem categoria"
          );
        },
      } as ColumnDef<Product, unknown>;
    }
    return column;
  });

  const navigate = useNavigate();

  return (
    <Card className="p-4 rounded-md border flex flex-col gap-4">
      {isLoading ? (
        <TableSkeleton />
      ) : error ? (
        <span className="text-primary flex gap-2 items-center">
          <MessageCircleWarning />
          Erro ao carregar os dados: {error.message}
        </span>
      ) : (
        <>
          {data && (
            <>
              <div className="flex items-center justify-between">
                <Button onClick={() => navigate({ to: "/add" })}>
                  <Plus className="mr-2 h-4 w-4" />
                  Adicionar produto
                </Button>
                <DataTablePagination
                  currentPage={data.currentPage ?? 1}
                  totalPages={data.totalPages ?? 1}
                  route="/product"
                  pageSize={limit}
                />
              </div>
              <DataTable columns={tableColumns} data={data.products ?? []} />
            </>
          )}
        </>
      )}
    </Card>
  );
}

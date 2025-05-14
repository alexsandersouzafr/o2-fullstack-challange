import { Chart } from "@/components/dashboard/chart";
import MetricCard from "@/components/dashboard/metric-card";
import AnimatedPage from "@/components/ui/animated-page";
import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "@/components/ui/date-picker-with-range";
import { getCategories, getMovements, getProductById } from "@/lib/api";
import type { Category } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { format } from "date-fns";
import {
  ChevronLeftCircle,
  ClockPlus,
  FilePenLine,
  Pencil,
  Trash,
} from "lucide-react";

export const Route = createFileRoute("/product/$id")({
  component: RouteComponent,
  loader: ({ params }) => params.id,
});

function RouteComponent() {
  const id = Route.useLoaderData();

  const { data: productData } = useQuery({
    queryKey: ["product"],
    queryFn: () => getProductById(parseInt(id)),
  });

  const { data: movementsData } = useQuery({
    queryKey: ["movement"],
    queryFn: () => getMovements(parseInt(id)),
  });

  const { data: categoriesData } = useQuery({
    queryKey: ["stockCategories"],
    queryFn: () => getCategories(),
  });

  const category = categoriesData?.find(
    (item: Category) => item.id === productData?.categoryId
  );

  const navigate = useNavigate();

  return (
    <AnimatedPage>
      {productData && categoriesData && movementsData && (
        <>
          <div className="rounded-lg border p-8 gap-8 flex flex-col">
            <div className="flex justify-between ">
              <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-bold">{productData.name}</h2>
                <p>{productData.description}</p>
              </div>
              <div className="flex gap-4">
                <Button variant="secondary">
                  <Pencil />
                  Editar Produto
                </Button>
                <Button variant="secondary">
                  <Trash />
                  Deletar Produto
                </Button>
                <DatePickerWithRange />
                <Button
                  className="w-fit"
                  onClick={() => navigate({ to: "/product" })}
                >
                  <ChevronLeftCircle />
                  Voltar
                </Button>
              </div>
            </div>
            <div className="flex gap-8">
              <div className="flex flex-col gap-8 w-1/3">
                <MetricCard
                  className="h-24 "
                  icon={<></>}
                  title="Quantidade em estoque:"
                  value={productData.stock.toString()}
                />
                <MetricCard
                  className="h-24"
                  icon={<></>}
                  title="Preço unitário:"
                  value={productData.unitPrice.toString()}
                />
                <MetricCard
                  className="bg-secondary flex gap-4 rounded-xl h-24"
                  icon={<></>}
                  title="Categoria"
                  value={category?.name || ""}
                />
              </div>
              <Chart id={parseInt(id)} />
            </div>
            <div className="[&>*]:text-foreground/60 flex-row-reverse flex gap-4 text-sm [&>div]:flex [&>div]:gap-2">
              <div>
                <FilePenLine />
                Última atualização:
                {format(productData.updatedAt, "dd/mm/yyyy")}
              </div>
              <div>
                <ClockPlus /> Criado em:
                {format(productData.createdAt, " dd/mm/yyyy")}
              </div>
            </div>
          </div>
        </>
      )}
    </AnimatedPage>
  );
}

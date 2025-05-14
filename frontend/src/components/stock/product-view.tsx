import { getCategories, getMovements, getProductById } from "@/lib/api";
import type { Category } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Chart } from "@/components/dashboard/chart";
import { Button } from "@/components/ui/button";
import { ChevronLeftCircle } from "lucide-react";
import ProductViewControls from "./product-view-controls";
import { categoryStyles } from "@/lib/categories";
import CategoryBadge from "../ui/category-badge";
import Metrics from "./metrics";
import { useDateRangeSearchParams } from "@/hooks/useDateRangeSearchParams";

export default function ProductView({ id }: { id: number }) {
  const { date } = useDateRangeSearchParams();

  const { data: productData } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
  });

  const { data: movementsData } = useQuery({
    queryKey: ["movement", date, id],

    queryFn: () => getMovements(id, date?.from, date?.to),
  });

  const { data: categoriesData } = useQuery({
    queryKey: ["stockCategories"],
    queryFn: () => getCategories(),
  });

  const category = categoriesData?.find(
    (item: Category) => item.id === productData?.categoryId
  );
  const style = categoryStyles.find((item) => item.id === category?.id);

  const navigate = useNavigate();

  if (productData && categoriesData && movementsData)
    return (
      <div className="rounded-lg border p-8 gap-8 flex flex-col shadow-md">
        <div className="flex gap-2">
          <Button
            className="w-fit"
            onClick={() => navigate({ to: "/product" })}
          >
            <ChevronLeftCircle />
            Voltar
          </Button>
          <ProductViewControls />
        </div>
        <div className="flex flex-col">
          <div className="flex gap-4 items-end">
            <h2 className="text-2xl font-bold">{productData?.name}</h2>
            <CategoryBadge
              style={style!}
              category={category!}
              className="w-fit"
            />
          </div>
          <p>{productData.description}</p>
        </div>
        <div className="flex gap-8">
          <Metrics movementsData={movementsData} productData={productData} />
          <Chart id={parseInt(id.toString())} className="w-1/2" />
        </div>
      </div>
    );
}

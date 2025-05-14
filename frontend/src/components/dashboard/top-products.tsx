import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getTopProducts } from "@/lib/api";
import type { Product } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { Expand, Package } from "lucide-react";

export default function TopProducts() {
  const {
    data: products,
    isLoading,
    error,
    isFetched,
  } = useQuery({
    queryKey: ["topProducts"],
    queryFn: () => getTopProducts(5),
  });

  return (
    <Card className="border rounded-lg p-4 w-1/3 flex flex-col gap-4">
      <div className="flex gap-2 items-center font-bold">
        <Package strokeWidth={1.5} /> Produtos Mais Vendidos
      </div>
      <hr />
      {isLoading && (
        <div className="flex flex-col gap-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="rounded-lg h-12" />
          ))}
        </div>
      )}
      <ul className="flex flex-col gap-4 ">
        {isFetched &&
          products?.map((product: Product, index: number) => (
            <li
              key={index}
              className="flex gap-2 px-4 items-center group justify-between hover:bg-primary/20 transition-all duration-300 p-2 rounded-lg"
            >
              <div>
                <span className="text-primary ">{index + 1}.</span>
                {product.name}
              </div>{" "}
              <Button variant="outline" size="sm">
                <Expand />{" "}
              </Button>
            </li>
          ))}
      </ul>
      {error && "ERRO"}
    </Card>
  );
}

export class MovementResponseDto {
  movements: ({
    product: {
      id: number;
      name: string;
      description: string | null;
      stock: number;
      unitPrice: number;
      categoryId: number;
      createdAt: Date;
      updatedAt: Date;
    };
  } & {
    quantity: number;
    id: number;
    productId: number;
    totalValue: number;
    type: string;
    date: Date;
  })[];
  totals: {
    entry: number;
    exit: number;
    totalItemsSold: number;
    totalItemsBought: number;
  };
}

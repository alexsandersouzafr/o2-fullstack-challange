export class UpdateProductDto {
  id: number;
  name: string;
  description?: string;
  stock: number;
  unitPrice: number;
  categoryId: number;
}

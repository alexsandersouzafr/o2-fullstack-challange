export class UpdateProductDto {
  id: number;
  name: string;
  description?: string;
  quantity: number;
  unitPrice: number;
  categoryId: number;
}

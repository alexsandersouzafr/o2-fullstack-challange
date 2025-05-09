export class CreateProducDto {
  name: string;
  description?: string;
  stock: number;
  unitPrice: number;
  categoryId: number;
}

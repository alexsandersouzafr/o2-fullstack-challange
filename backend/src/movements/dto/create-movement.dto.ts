export class CreateMovementDto {
  productId: number;
  quantity: number;
  totalValue: number;
  type: 'ENTRY' | 'EXIT';
}

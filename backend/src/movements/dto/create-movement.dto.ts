export class CreateMovementDto {
  productId: number;
  quantity: number;
  type: 'ENTRY' | 'EXIT';
}

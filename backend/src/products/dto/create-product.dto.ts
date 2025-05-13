import { ApiProperty } from '@nestjs/swagger';

export class CreateProducDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  stock: number;

  @ApiProperty()
  unitPrice: number;

  @ApiProperty()
  categoryId: number;
}

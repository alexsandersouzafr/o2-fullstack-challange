import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProductDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiPropertyOptional()
  description?: string;

  @ApiProperty()
  stock: number;

  @ApiProperty()
  unitPrice: number;

  @ApiProperty()
  categoryId: number;
}

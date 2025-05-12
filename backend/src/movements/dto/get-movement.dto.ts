import { IsDateString, IsNotEmpty } from 'class-validator';

export class GetMovementDto {
  id?: number;

  @IsNotEmpty()
  @IsDateString()
  startDate: string;

  @IsNotEmpty()
  @IsDateString()
  endDate: string;
}

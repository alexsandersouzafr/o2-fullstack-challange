import { Module } from '@nestjs/common';
import { MovementsService } from './movements.service';
import { MovementsController } from './movements.controller';

@Module({
  providers: [MovementsService],
  controllers: [MovementsController]
})
export class MovementsModule {}

import { Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { MovementsModule } from 'src/movements/movements.module';
import { ProductsModule } from 'src/products/products.module';
import { AiController } from './ai.controller';

@Module({
  imports: [MovementsModule, ProductsModule],
  controllers: [AiController],
  providers: [AiService],
  exports: [AiService],
})
export class AiModule {}

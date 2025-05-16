import { Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { MovementsModule } from 'src/movements/movements.module';
import { ProductsModule } from 'src/products/products.module';
import { AiController } from './ai.controller';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  imports: [MovementsModule, ProductsModule],
  controllers: [AiController],
  providers: [AiService, PrismaService],
  exports: [AiService],
})
export class AiModule {}

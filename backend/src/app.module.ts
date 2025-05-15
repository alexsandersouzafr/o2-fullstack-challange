import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { MovementsModule } from './movements/movements.module';
import { PrismaService } from '../prisma/prisma.service';
import { CategoriesController } from './categories/categories.controller';
import { CategoriesService } from './categories/categories.service';
import { CategoriesModule } from './categories/categories.module';
import { AiModule } from './ai/ai.module';

@Module({
  imports: [ProductsModule, MovementsModule, CategoriesModule, AiModule],
  controllers: [CategoriesController],
  providers: [PrismaService, CategoriesService],
})
export class AppModule {}

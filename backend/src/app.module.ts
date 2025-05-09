import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { MovementsModule } from './movements/movements.module';
import { PrismaService } from '../prisma/prisma.service';
import { CategoriesController } from './categories/categories.controller';
import { CategoriesService } from './categories/categories.service';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [ProductsModule, MovementsModule, CategoriesModule],
  controllers: [AppController, CategoriesController],
  providers: [AppService, PrismaService, CategoriesService],
})
export class AppModule {}

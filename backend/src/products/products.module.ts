import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  providers: [PrismaService, ProductsService],
  controllers: [ProductsController],
})
export class ProductsModule {}

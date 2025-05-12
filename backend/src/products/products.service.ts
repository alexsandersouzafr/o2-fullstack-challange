import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateProducDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.product.findMany();
  }

  async create(createProductDto: CreateProducDto) {
    return this.prisma.product.create({ data: createProductDto });
  }

  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) {
      throw new NotFoundException('Product not found.');
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) {
      throw new NotFoundException('Product not found.');
    }
    return this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  async remove(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });
    if (!product) {
      throw new NotFoundException('Product not found.');
    }
    return this.prisma.product.delete({ where: { id } });
  }

  async getStockTotals() {
    const products = await this.prisma.product.findMany({
      select: { unitPrice: true, stock: true },
    });
    const movements = await this.prisma.movement.findMany({
      where: { type: 'EXIT' },
      select: { quantity: true, totalValue: true },
    });

    const totalStockValue = products.reduce(
      (total, product) => total + product.unitPrice * product.stock,
      0,
    );
    const totalItemsSold = movements.reduce(
      (total, movement) => total + movement.quantity,
      0,
    );
    const totalSales = movements.reduce(
      (total, movement) => total + movement.totalValue,
      0,
    );

    return {
      totalStockValue,
      totalItemsSold,
      totalSales,
    };
  }

  async getTopProducts(limit: number = 5) {
    // IDs dos produtos mais movimentados
    const mostMovedProductIds = await this.prisma.product.findMany({
      select: { id: true },
      take: limit,
      orderBy: {
        movements: {
          _count: 'desc',
        },
      },
    });

    // Detalhes das movimentações
    const productsWithDetails = await Promise.all(
      mostMovedProductIds.map(async ({ id }) => {
        const product = await this.prisma.product.findUnique({
          where: { id },
          include: {
            category: {
              select: {
                name: true,
              },
            },
          },
        });

        const movementStats = await this.prisma.movement.groupBy({
          by: ['type'],
          where: { productId: id },
          _count: { _all: true },
          _sum: { totalValue: true },
        });

        const stats = movementStats.reduce(
          (acc, curr) => {
            acc[curr.type.toLowerCase() + 'Count'] = curr._count._all;
            acc[curr.type.toLowerCase() + 'Total'] = curr._sum.totalValue;
            return acc;
          },
          { entryCount: 0, exitCount: 0, entryTotal: 0, exitTotal: 0 },
        );

        //retorna produto,totalCount,entryCount,exitCount,entryTotal,exitTotal,netTotal
        return {
          ...product,
          movementStats: {
            totalCount: stats.entryCount + stats.exitCount,
            ...stats,
            netTotal: stats.entryTotal - stats.exitTotal,
          },
        };
      }),
    );

    return productsWithDetails;
  }
}

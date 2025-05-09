import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateMovementDto } from './dto/create-movement.dto';

@Injectable()
export class MovementsService {
  constructor(private prisma: PrismaService) {}

  async create({ productId, quantity, type }: CreateMovementDto) {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException('Product not found.');
    }

    if (quantity <= 0) {
      throw new BadRequestException('Quantity must be greater than 0.');
    }

    if (type === 'EXIT' && product.stock < quantity) {
      throw new BadRequestException(
        `Insufficient stock for product ${productId}. Available: ${product.stock}, Requested: ${quantity}`,
      );
    }

    return this.prisma.$transaction(async (prisma) => {
      const stockUpdate = type === 'ENTRY' ? quantity : -quantity;
      await prisma.product.update({
        where: { id: productId },
        data: { stock: { increment: stockUpdate } },
      });

      return prisma.movement.create({
        data: {
          productId,
          quantity,
          type,
        },
      });
    });
  }

  async findMany(id: number) {
    return this.prisma.movement.findMany({ where: { id } });
  }
}

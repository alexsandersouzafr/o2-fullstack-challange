import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateMovementDto } from './dto/create-movement.dto';
import { CreateMovementResponseDto } from './dto/create-movement-response.dto';
import { MovementResponseDto } from './dto/movement-response.dto';

@Injectable()
export class MovementsService {
  constructor(private prisma: PrismaService) {}

  async create({
    productId,
    quantity,
    type,
  }: CreateMovementDto): Promise<CreateMovementResponseDto> {
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
        `Você solicitou mais produtos do que o disponível em estoque. Disponível: ${product.stock}. Solicitado: ${quantity}.`,
      );
    }

    return this.prisma.$transaction(async (prisma) => {
      const stockUpdate = type === 'ENTRY' ? quantity : -quantity;
      await this.prisma.product.update({
        where: { id: productId },
        data: { stock: { increment: stockUpdate } },
      });

      return prisma.movement.create({
        data: {
          productId,
          quantity,
          totalValue: product.unitPrice * quantity,
          type,
        },
      });
    });
  }

  async findMany(
    productId: number | undefined,
    startDate: Date,
    endDate: Date,
  ): Promise<MovementResponseDto> {
    const movements = await this.prisma.movement.findMany({
      where: {
        ...(productId !== undefined && { productId: Number(productId) }),
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: { product: true },
      orderBy: {
        date: 'desc',
      },
    });

    const totals = await this.prisma.movement.groupBy({
      by: ['type'],
      where: {
        ...(productId !== undefined && { productId: Number(productId) }),
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      _sum: {
        totalValue: true,
        quantity: true,
      },
    });

    const entryTotal =
      Number(
        totals.find((movement) => movement.type === 'ENTRY')?._sum?.totalValue,
      ) || 0;
    const exitTotal =
      Number(
        totals.find((movement) => movement.type === 'EXIT')?._sum?.totalValue,
      ) || 0;
    const totalItemsSold =
      Number(
        totals.find((movement) => movement.type === 'EXIT')?._sum?.quantity,
      ) || 0;
    const totalItemsBought =
      Number(
        totals.find((movement) => movement.type === 'ENTRY')?._sum?.quantity,
      ) || 0;

    return {
      movements,
      totals: {
        entry: entryTotal,
        exit: exitTotal,
        totalItemsSold,
        totalItemsBought,
      },
    };
  }
}

import { Module } from '@nestjs/common';
import { MovementsService } from './movements.service';
import { MovementsController } from './movements.controller';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  providers: [PrismaService, MovementsService],
  controllers: [MovementsController],
})
export class MovementsModule {}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateProducDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';
import { ApiBody } from '@nestjs/swagger';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Get()
  findAll(@Query('limit') limit: number, @Query('page') page: number) {
    return this.productService.findAll(limit, page);
  }

  @Get('stock-totals')
  getStockTotals(
    @Query('startDate') startDate: Date,
    @Query('endDate') endDate: Date,
  ) {
    return this.productService.getStockTotals(startDate, endDate);
  }

  @Get('top-products')
  getTopProducts(@Query('limit') limit: number) {
    return this.productService.getTopProducts(limit);
  }

  @ApiBody({ type: [CreateProducDto] })
  @Post()
  create(@Body() createProductDto: CreateProducDto) {
    return this.productService.create(createProductDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productService.findOne(id);
  }

  @ApiBody({ type: [UpdateProductDto] })
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productService.remove(id);
  }
}

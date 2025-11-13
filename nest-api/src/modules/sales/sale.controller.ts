import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { SaleService } from './sale.service';
import { CreateSaleDto } from './sale.dto';
import { BookId } from '../books/entities/book.entity';

@Controller('api/sales')
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

  @Get()
  findAll() {
    return this.saleService.findAll();
  }

  @Post()
  create(@Body() data: CreateSaleDto) {
    return this.saleService.create(data);
  }

  @Get('book/:bookId/clients')
  findClientsByBook(@Param('bookId') bookId: string) {
    return this.saleService.findClientsByBookId(bookId as BookId);
  }
}

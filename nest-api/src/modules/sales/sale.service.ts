import { Injectable } from '@nestjs/common';
import { SaleRepository } from './sale.repository';
import { CreateSaleDto } from './sale.dto';
import { BookId } from '../books/entities/book.entity';
import { ClientEntity } from '../clients/client.entity';

@Injectable()
export class SaleService {
  constructor(private readonly saleRepo: SaleRepository) {}

  findAll() {
    return this.saleRepo.findAll();
  }

  create(dto: CreateSaleDto) {
    return this.saleRepo.create(dto);
  }

  async findClientsByBookId(bookId: BookId): Promise<ClientEntity[]> {
    return this.saleRepo.findClientsByBookId(bookId);
  }
}

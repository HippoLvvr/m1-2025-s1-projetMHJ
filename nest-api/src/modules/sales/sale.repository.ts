import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SaleEntity } from './sale.entity';
import { CreateSaleDto } from './sale.dto';
import { ClientEntity } from '../clients/client.entity';
import { BookEntity, BookId } from '../books/entities/book.entity';

@Injectable()
export class SaleRepository {
  constructor(
    @InjectRepository(SaleEntity)
    private readonly repo: Repository<SaleEntity>,
    private readonly dataSource: DataSource,
  ) {}

  findAll() {
    return this.repo.find({ relations: ['client', 'book'] });
  }

  async create(dto: CreateSaleDto) {
    const manager = this.dataSource.manager;
    const client = await manager.findOne(ClientEntity, { where: { id: dto.clientId } });
    const book = await manager.findOne(BookEntity, { where: { id: dto.bookId as BookId } });

    if (!client) throw new NotFoundException('Client not found');
    if (!book) throw new NotFoundException('Book not found');

    const sale = this.repo.create({
      client,
      book,
      date: dto.date,
    } as Partial<SaleEntity>);

    return this.repo.save(sale);
  }

  async findClientsByBookId(bookId: BookId): Promise<ClientEntity[]> {
    const sales = await this.repo.find({
      where: { book: { id: bookId } },
      relations: ['client', 'book'],
    });

    if (sales.length === 0) {
      throw new NotFoundException(`Aucune vente trouvée pour le livre avec l'id ${bookId}`);
    }

    // Supprimer les doublons éventuels si un client a acheté plusieurs fois le même livre
    const clientsMap = new Map<number, ClientEntity>();
    for (const sale of sales) {
      clientsMap.set(sale.client.id, sale.client);
    }

    return Array.from(clientsMap.values());
  }
}

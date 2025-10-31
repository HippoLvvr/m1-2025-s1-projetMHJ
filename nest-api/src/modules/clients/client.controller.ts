import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientEntity } from './client.entity';

@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get()
  findAll() {
    return this.clientService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientService.findOne(+id);
  }

  @Post()
  create(@Body() data: ClientEntity) {
    return this.clientService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<ClientEntity>) {
    return this.clientService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientService.remove(+id);
  }
}
    
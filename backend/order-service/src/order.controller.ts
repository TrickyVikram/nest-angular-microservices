import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './order.entity';

@Controller('api/orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async findAll(): Promise<Order[]> {
    return this.orderService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Order> {
    return this.orderService.findOne(id);
  }

  @Post()
  async create(@Body() order: Partial<Order>): Promise<Order> {
    return this.orderService.create(order);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() order: Partial<Order>,
  ): Promise<Order> {
    return this.orderService.update(id, order);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.orderService.delete(id);
  }
}

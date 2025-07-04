import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from '../../../libs/common/src/dto/create-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('menu')
  getMenu() {
    return this.orderService.getMenu();
  }

  @Post()
  placeOrder(@Body() dto: CreateOrderDto) {
    return this.orderService.placeOrder(dto);
  }

  @Get(':id')
  getStatus(@Param('id') id: number) {
    return this.orderService.getStatus(id);
  }
}

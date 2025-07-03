import { Controller, Get } from '@nestjs/common';
import { KitchenService } from './kitchen.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class KitchenController {
  constructor(private readonly kitchenService: KitchenService) {}

  @MessagePattern('order.process')
  async handleOrder(@Payload() data: any) {
    await this.kitchenService.handleOrder(data);
  }
}

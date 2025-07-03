import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../../../libs/common/src/entities/order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class KitchenService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async handleOrder(data: Order) {
    const order = await this.orderRepository.findOne({
      where: { id: data.id },
    });
    if (!order) return;
    order.status = 'Processed';
    await this.orderRepository.save(order);
  }
}

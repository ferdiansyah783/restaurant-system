import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Repository } from 'typeorm';
import { CreateOrderDto } from '../../../libs/common/src/dto/create-order.dto';
import { Menu } from '../../../libs/common/src/entities/menu.entity';
import { Order } from '../../../libs/common/src/entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(Menu)
    private menuRepository: Repository<Menu>,
    @Inject('KITCHEN_SERVICE') private readonly kitchenService: ClientProxy,
    @Inject('NOTIFICATION_SERVICE') private readonly notificationService: ClientProxy
  ) {}

  async getMenu() {
    return this.menuRepository.find();
  }

  async placeOrder(dto: CreateOrderDto) {
    const order = this.orderRepository.create({ ...dto, status: 'Pending' });
    const saved = await this.orderRepository.save(order);

    // Fan-out manually: emit to 2 topics
    this.kitchenService.emit('order.process', saved);
    this.notificationService.emit('order.confirmation', saved);

    return { orderId: saved.id };
  }

  async getStatus(id: number) {
    const order = await this.orderRepository.findOne({ where: { id } });
    if (!order) throw new NotFoundException('Order not found');
    return { status: order.status };
  }
}

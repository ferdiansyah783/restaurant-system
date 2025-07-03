import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { Order } from '../../../libs/common/src/entities/order.entity';
import { NotificationService } from './notification.service';

@Controller()
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @MessagePattern('order.confirmation')
  async notify(@Payload() data: Order) {
    console.log(
      `Email to ${data.customerEmail}: Your order #${data.id} is pending.`,
    );
  }
}

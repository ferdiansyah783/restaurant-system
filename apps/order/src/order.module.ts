import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from '../../../libs/common/src/entities/menu.entity';
import { Order } from '../../../libs/common/src/entities/order.entity';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { MenuSeederService } from './seeder/menu.seeder';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [Order, Menu],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Order, Menu]),
    ClientsModule.register([
      {
        name: 'KITCHEN_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://rabbitmq:5672'],
          exchange: 'orders',
          exchangeType: 'fanout',
          routingKey: 'order.*',
          queue: 'kitchen_queue',
          queueOptions: { durable: false },
        },
      },
      {
        name: 'NOTIFICATION_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://rabbitmq:5672'],
          exchange: 'orders',
          exchangeType: 'fanout',
          routingKey: 'order.*',
          queue: 'notification_queue',
          queueOptions: { durable: false },
        },
      },
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService, MenuSeederService],
})
export class OrderModule {}

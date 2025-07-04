import { NestFactory } from '@nestjs/core';
import { KitchenModule } from './kitchen.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(KitchenModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://rabbitmq:5672'],
      exchange: 'orders',
      exchangeType: 'fanout',
      routingKey: 'order.process',
      queue: 'kitchen_queue',
      queueOptions: { durable: false },
    },
  });

  await app.listen();
}
bootstrap();

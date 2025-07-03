import { NestFactory } from '@nestjs/core';
import { KitchenModule } from './kitchen.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(KitchenModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://rabbitmq:5672'],
      queue: 'order.process',
      queueOptions: { durable: false },
    },
  });

  await app.listen();
}
bootstrap();

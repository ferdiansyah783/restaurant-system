import { NestFactory } from '@nestjs/core';
import { NotificationModule } from './notification.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(NotificationModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://rabbitmq:5672'],
      queue: 'order.confirmation',
      queueOptions: { durable: false },
    },
  });

  await app.listen();
}
bootstrap();

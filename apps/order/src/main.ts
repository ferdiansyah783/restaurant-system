import { NestFactory } from '@nestjs/core';
import { OrderModule } from './order.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(OrderModule);

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://rabbitmq:5672'],
      queue: 'orders',
      queueOptions: { durable: false },
    },
  });

  await app.startAllMicroservices();

  await app.listen(process.env.port ?? 3001);
}
bootstrap();

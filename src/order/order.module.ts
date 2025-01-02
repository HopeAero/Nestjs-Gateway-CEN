import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { API_EXCHANGE, envs } from 'src/config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: API_EXCHANGE,
        transport: Transport.RMQ,
        options: {
          urls: [`amqp://${envs.RABBITMQ_DEFAULT_USER}:${envs.RABBITMQ_DEFAULT_PASS}@${envs.RABBITMQ_HOST}:${envs.RABBITMQ_PORT}`],
          queue: 'api_exchange',
          queueOptions: {
            durable: false
          },
        },
      },
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}

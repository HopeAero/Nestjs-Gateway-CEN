import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { API_EXCHANGE } from 'src/config';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class OrderService {
  constructor(
    @Inject(API_EXCHANGE) private readonly client: ClientProxy,
  ) {}
  orderList = [];
  
 async create(payload: CreateOrderDto) {
    this.orderList.push(payload);
    const response = await lastValueFrom(this.client.send('order_send', payload));
    return response;
    
  }
}

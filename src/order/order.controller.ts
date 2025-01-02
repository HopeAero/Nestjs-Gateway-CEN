import { Controller, Post, Body} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
@Controller('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService
  ) {}

  @Post()
  async create(@Body() payload: CreateOrderDto) {
    console.log('OrderController -> create -> payload', payload);
    return this.orderService.create(payload);
  }
}

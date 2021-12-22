import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { OrderEntity, OrderItemEntity } from '@entities/Order';
import { CreateOrderItemDTO } from '@dto/Order';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(OrderEntity) private readonly orderRepo: Repository<OrderService>,
        @InjectRepository(OrderItemEntity) private readonly orderItemRepo: Repository<OrderItemEntity>,
    ) {}

    addOrderItem(orderItem: CreateOrderItemDTO): Promise<void> {
        return;
        
    }
}

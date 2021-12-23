import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

import { OrderEntity } from '@entities/Order';
import { OrderItemEntity } from '@entities/OrderItemEntity';
import { OrderPublicDTO } from '@dto/Order';
import { ISession } from '@interfaces/Session';
import { IOrder, IOrderPublic, OrderStatus } from '@interfaces/Order';
import { CreateOrderItemDTO } from '@dto/OrderItem';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(OrderEntity) public readonly orderRepo: Repository<OrderEntity>,
        @InjectRepository(OrderItemEntity) public readonly orderItemRepo: Repository<OrderItemEntity>,
    ) {}

    async createOrder(order: IOrder, item: CreateOrderItemDTO): Promise<void> {
        //@ts-ignore
        const { id } = await this.orderRepo.save(order);
        
        //@ts-ignore
        await this.orderItemRepo.save({ order: id, ...item });
    }

    removeOrder(id: IOrder['id']): Promise<DeleteResult> {
        return this.orderRepo.delete({ id });
    }
}

// non-authorizated user service
@Injectable()
export class OrderServiceNA extends OrderService {
    async getCurrentOrder(session_id: ISession['id']): Promise<IOrderPublic> {
        try {
            const res = await this.orderRepo.findOneOrFail({
                where: { session_id, status: OrderStatus.CREATED },
                relations: ['list', 'list.product']
            });

            return new OrderPublicDTO(res);
        } catch(err) {
            throw new NotFoundException('no any active order');
        }
    }

    async addOrderItem(orderItem: CreateOrderItemDTO, session_id: ISession['id']) {
        const res = await this.orderRepo.findOne({
            where: { session_id, status: OrderStatus.CREATED }
        });

        if (res) { // order is existed
            console.log('existed');
            
        } else { // create new order
            await this.createOrder({ session_id }, orderItem);
        }
    }
}

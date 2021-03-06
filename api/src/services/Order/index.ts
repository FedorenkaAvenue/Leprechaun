import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { DeepPartial, Not, UpdateResult } from 'typeorm';

import { CreateOrderDTO } from '@dto/Order';
import { OrderPublic } from '@dto/Order/constructor';
import { ISession } from '@interfaces/Session';
import { IOrderPublic } from '@interfaces/Order';
import { OrderStatus } from '@enums/Order';
import { CreateOrderItemDTO, UpdateOrderItemDTO } from '@dto/OrderItem';
import { IOrderItem } from '@interfaces/OrderItem';
import { ProductEntity } from '@entities/Product';
import OrderAdminService from './admin';

export const ORDER_RELATIONS = [ 'list', 'list.product' ];

@Injectable()
export class OrderService extends OrderAdminService {
    async getOrderHistory(session_id: ISession['id']): Promise<IOrderPublic[]> {
        try {
            const res = await this.orderRepo.find({
                where: { session_id, status: Not(OrderStatus.INIT) },
                relations: ORDER_RELATIONS,
                order: { status: 'ASC' }
            });

            if (!res.length) return [];

            return res.map(order => new OrderPublic(order));
        } catch(err) {
            throw new NotFoundException('no any active order');
        }
    }

    async addOrderItem(orderItem: CreateOrderItemDTO, session_id: ISession['id']): Promise<IOrderPublic> {
        const res = await this.orderRepo.findOne({
            where: { session_id, status: OrderStatus.INIT },
            relations: ORDER_RELATIONS
        });

        if (res) { // order is existed
            const { list, id } = res;
            
            if (list.some(({ product }) => product.id == orderItem.product)) { // order item already at order
                throw new BadRequestException('product already exists');
            } else { // add order item
                await this.orderItemRepo.save({ order_id: id, ...orderItem } as DeepPartial<ProductEntity>);
            }
        } else { // create new order
            const { id: order_id } = await this.orderRepo.save({ session_id });

            await this.orderItemRepo.save({ order_id, ...orderItem } as DeepPartial<ProductEntity>);
        }

        return await this.getCart(session_id);
    }

    async changeOrderItemAmount(
        { order_item, amount }: UpdateOrderItemDTO,
        sessionId: ISession['id']
    ): Promise<IOrderPublic> {
        await this.orderItemRepo.update({ id: order_item }, { amount });

        return this.getCart(sessionId);
    }

    sendOrder({ order, customer }: CreateOrderDTO): Promise<UpdateResult> {
        return this.orderRepo.update(
            { id: order.id },
            { status: OrderStatus.POSTED, customer }
        );
    }

    async removeOrderItem(
        id: IOrderItem['id'],
        sessionId: ISession['id']
    ): Promise<IOrderPublic> {
        await this.orderItemRepo.delete({ id });

        return this.getCart(sessionId);
    }
}

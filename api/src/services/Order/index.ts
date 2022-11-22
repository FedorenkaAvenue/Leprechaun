import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { DeepPartial, Not, UpdateResult } from 'typeorm';

import { CreateOrderDTO } from '@dto/Order';
import { OrderPublic } from '@dto/Order/constructor';
import { SessionI } from '@interfaces/Session';
import { OrderPublicI } from '@interfaces/Order';
import { OrderStatus } from '@enums/Order';
import { CreateOrderItemDTO, UpdateOrderItemDTO } from '@dto/OrderItem';
import { OrderItemI } from '@interfaces/OrderItem';
import { ProductEntity } from '@entities/Product';
import OrderAdminService from './admin';

@Injectable()
export default class OrderService extends OrderAdminService {
    async addOrderItem(orderItem: CreateOrderItemDTO, sid: SessionI['sid']): Promise<OrderPublicI> {
        const res = await this.orderRepo.findOneBy({
            sid, status: OrderStatus.INIT
        });

        if (res) {
            // order is existed
            const { list, id } = res;

            if (list.some(({ product }) => product.id == orderItem.product)) {
                // order item already at order
                throw new BadRequestException('product already exists');
            } else {
                // add order item
                await this.orderItemRepo.save({ order_id: id, ...orderItem } as DeepPartial<ProductEntity>);
            }
        } else {
            // create new order
            const { id: order_id } = await this.createOrder(sid);

            await this.orderItemRepo.save({ order_id, ...orderItem } as DeepPartial<ProductEntity>);
        }

        return await this.getCart(sid);
    }

    async changeOrderItemAmount(
        { order_item, amount }: UpdateOrderItemDTO,
        sid: SessionI['sid'],
    ): Promise<OrderPublicI> {
        await this.orderItemRepo.update({ id: order_item }, { amount });

        return this.getCart(sid);
    }

    sendOrder({ order, customer }: CreateOrderDTO): Promise<UpdateResult> {
        return this.orderRepo.update({ id: order.id }, { status: OrderStatus.POSTED, customer });
    }

    async getOrderList(sid: SessionI['sid']): Promise<OrderPublicI[]> {
        try {
            const res = await this.orderRepo.find({
                where: { sid, status: Not(OrderStatus.INIT) },
                order: { updated_at: 'DESC' },
            });

            if (!res.length) return [];

            return res.map(order => new OrderPublic(order));
        } catch (err) {
            throw new NotFoundException('no any active order');
        }
    }

    async removeOrderItem(id: OrderItemI['id'], sid: SessionI['sid']): Promise<OrderPublicI> {
        await this.orderItemRepo.delete({ id });

        return this.getCart(sid);
    }
}

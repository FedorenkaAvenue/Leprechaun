import { Injectable, NotFoundException } from '@nestjs/common';
import { DeepPartial, Not, UpdateResult } from 'typeorm';

import { SessionI } from '@interfaces/Session';
import { OrderStatus } from '@enums/Order';
import { OrderItemI } from '@interfaces/OrderItem';
import OrderService from '.';
import { CreateOrderDTO, OrderPublic } from '@dto/Order/public';
import { CreateOrderItemDTO, UpdateOrderItemDTO } from '@dto/OrderItem/public';
import { OrderItemEntity } from '@entities/OrderItem';
import { QueriesCommonI } from '@interfaces/Queries';
import { OrderPublicI } from '@interfaces/Order';

@Injectable()
export default class OrderPublicService extends OrderService {
    public async getCart(sid: SessionI['sid'], searchParams: QueriesCommonI): Promise<OrderPublicI | null> {
        const qb = this.orderRepo
            .createQueryBuilder('order')
            .where('order.sid = :sid', { sid })
            .andWhere('order.status = :status', { status: OrderStatus.INIT });

        return await this.getOrder<OrderPublic>(qb, searchParams, OrderPublic);
    }

    public async addOrderItems(
        orderItems: CreateOrderItemDTO[],
        sid: SessionI['sid'],
        searchParams: QueriesCommonI,
    ): Promise<OrderPublicI | null> {
        const res = await this.orderRepo.findOneBy({ sid, status: OrderStatus.INIT });

        if (res) { // order is existed
            const filteredItems = orderItems.filter(
                ({ product }) => !res.items.find(({ product: { id } }) => id === product)
            );

            await this.orderItemRepo.save(filteredItems.map(i => ({ order_id: res.id, ...i }) as DeepPartial<OrderItemEntity>));
        } else { // create new order
            const { id: order_id } = await this.createOrder(sid);
            const mapedOrderItems = orderItems.map(o => ({ order_id, ...o }));

            await this.orderItemRepo.save(mapedOrderItems as DeepPartial<OrderItemEntity[]>);
        }

        return await this.getCart(sid, searchParams);
    }

    public async changeOrderItemAmount(
        id: OrderItemI['id'],
        { amount }: UpdateOrderItemDTO,
        sid: SessionI['sid'],
        searchParams: QueriesCommonI,
    ): Promise<OrderPublicI | null> {
        await this.orderItemRepo.update({ id }, { amount });

        return this.getCart(sid, searchParams);
    }

    public async postOrder({ order: { id }, customer }: CreateOrderDTO, sid: SessionI['sid']): Promise<UpdateResult> {
        return this.orderRepo.update({ id, sid }, { status: OrderStatus.POSTED, customer });
    }

    public async getOrderList(sid: SessionI['sid'], searchParams: QueriesCommonI): Promise<OrderPublicI[]> {
        try {
            const res = await this.orderRepo.find({
                where: { sid, status: Not(OrderStatus.INIT) },
                order: { updated_at: 'DESC' },
            });

            if (!res.length) return [];

            return res.map(order => new OrderPublic(order, searchParams));
        } catch (err) {
            throw new NotFoundException('no any active order');
        }
    }

    public async removeOrderItem(
        id: OrderItemI['id'],
        sid: SessionI['sid'],
        searchParams: QueriesCommonI,
    ): Promise<OrderPublicI | null> {
        await this.orderItemRepo.delete({ id });

        return this.getCart(sid, searchParams);
    }
}

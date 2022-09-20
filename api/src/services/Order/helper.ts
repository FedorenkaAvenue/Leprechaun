import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeepPartial, SelectQueryBuilder } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { OrderEntity } from '@entities/Order';
import { OrderItemEntity } from '@entities/OrderItem';
import { OrderPublic } from '@dto/Order/constructor';
import { ISession } from '@interfaces/Session';
import { IOrder, IOrderPublic } from '@interfaces/Order';
import { OrderStatus } from '@enums/Order';
import { CreateOrderItemDTO } from '@dto/OrderItem';
import { IOrderItem } from '@interfaces/OrderItem';
import { ProductEntity } from '@entities/Product';

@Injectable()
export default class OrderHelperService {
    constructor(
        @InjectRepository(OrderEntity) public readonly orderRepo: Repository<OrderEntity>,
        @InjectRepository(OrderItemEntity) public readonly orderItemRepo: Repository<OrderItemEntity>,
    ) {}

    /**
     * @description get current order by session ID
     * @param session_id
     * @returns cart
     */
    async getCart(session_id: ISession['id']): Promise<IOrderPublic> {
        const qb = this.orderRepo
            .createQueryBuilder('order')
            .where('order.session_id = :session_id', { session_id })
            .andWhere('order.status = :status', { status: OrderStatus.INIT });

        return await this.getOrder(qb);
    }

    /**
     * @description save order item to DB
     * @param orderId
     * @param item
     * @returns
     */
    createOrderItem(orderId: IOrder['id'], item: CreateOrderItemDTO): Promise<IOrderItem> {
        return this.orderItemRepo.save({ order_id: orderId, ...item } as DeepPartial<ProductEntity>);
    }

    /**
     * @description split relative tables for order by query builder
     * @param qb current query builder to continue building query
     * @returns completed OrderPublicDTO or null
     */
    async getOrder(qb: SelectQueryBuilder<OrderEntity>): Promise<OrderPublic | null> {
        const res = await qb
            .leftJoinAndSelect('order.list', 'list')
            .leftJoinAndSelect('list.product', 'product')
            .leftJoinAndSelect('product.images', 'images')
            .orderBy('list.created_at', 'ASC')
            .getOne();

        return res ? new OrderPublic(res) : null;
    }

    clearUselessOrders() {
        // console.log(777);
    }
}

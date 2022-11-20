import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SelectQueryBuilder } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { OrderEntity } from '@entities/Order';
import { OrderItemEntity } from '@entities/OrderItem';
import { OrderPublic } from '@dto/Order/constructor';
import { SessionI } from '@interfaces/Session';
import { OrderPublicI } from '@interfaces/Order';
import { OrderStatus } from '@enums/Order';
import { genID } from '@utils/genIds';

@Injectable()
export default class OrderHelperService {
    constructor(
        @InjectRepository(OrderEntity) public readonly orderRepo: Repository<OrderEntity>,
        @InjectRepository(OrderItemEntity) public readonly orderItemRepo: Repository<OrderItemEntity>,
    ) {}

    /**
     * @description create new order with session ID
     * @param session_id
     * @returns created order with 1 status
     */
    async createOrder(session_id: SessionI['sid']): Promise<OrderEntity> {
        return await this.orderRepo.save({ session_id, id: genID() });
    }

    /**
     * @description get current order by session ID
     * @param session_id
     * @returns cart
     */
    async getCart(session_id: SessionI['sid']): Promise<OrderPublicI> {
        const qb = this.orderRepo
            .createQueryBuilder('order')
            .where('order.session_id = :session_id', { session_id })
            .andWhere('order.status = :status', { status: OrderStatus.INIT });

        return await this.getOrder(qb);
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
}

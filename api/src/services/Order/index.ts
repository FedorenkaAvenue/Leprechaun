import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SelectQueryBuilder } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { OrderEntity } from '@entities/Order';
import { OrderItemEntity } from '@entities/OrderItem';
import { SessionI } from '@interfaces/Session';
import { genID } from '@utils/genIds';
import ProductService from '@services/Product';

@Injectable()
export default class OrderService {
    constructor(
        @InjectRepository(OrderEntity) public readonly orderRepo: Repository<OrderEntity>,
        @InjectRepository(OrderItemEntity) public readonly orderItemRepo: Repository<OrderItemEntity>,
        protected readonly productService: ProductService,
    ) {}

    /**
     * @description create new order with session ID
     * @param sid
     * @returns created order with 1 status
     */
    async createOrder(sid: SessionI['sid']): Promise<OrderEntity> {
        return await this.orderRepo.save({ sid, id: genID() });
    }

    /**
     * @description split relative tables for order by query builder
     * @param qb current query builder to continue building query
     * @returns completed OrderPublicDTO or null
     */
    async getOrder(qb: SelectQueryBuilder<OrderEntity>, resConstructor?: any) {
        const res = await qb
            .leftJoinAndSelect('order.list', 'list')
            .leftJoinAndSelect('list.product', 'product')
            .leftJoinAndSelect('product.images', 'images')
            .orderBy('list.created_at', 'ASC')
            .getOne();

        return res ? (resConstructor ? new resConstructor(res) : res) : null;
    }
}

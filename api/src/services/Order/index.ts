import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SelectQueryBuilder } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

import { OrderEntity } from '@entities/Order';
import { OrderItemEntity } from '@entities/OrderItem';
import { SessionI } from '@interfaces/Session';
import { genID } from '@utils/genIds';
import ProductService from '@services/Product';
import { OrderI } from '@interfaces/Order';
import { QueriesCommonI } from '@interfaces/Queries';

@Injectable()
export default class OrderService {
    constructor(
        @InjectRepository(OrderEntity) public readonly orderRepo: Repository<OrderEntity>,
        @InjectRepository(OrderItemEntity) public readonly orderItemRepo: Repository<OrderItemEntity>,
        protected readonly productService: ProductService,
    ) { }

    /**
     * @description create new order with session ID
     * @param sid session ID
     * @returns created order with 1 status
     */
    protected async createOrder(sid: SessionI['sid']): Promise<OrderI> {
        return await this.orderRepo.save({ sid, id: genID() });
    }

    /**
     * @description split relative tables for order by query builder
     * @param qb current query builder to continue building query
     * @param searchParams search parameters from URL query
     * @param resConstructor constructor for result maping
     * @returns completed OrderPublicDTO or null
     */
    protected async getOrder<T>(
        qb: SelectQueryBuilder<OrderEntity>,
        searchParams: QueriesCommonI,
        resConstructor: { new(res: OrderEntity, searchParams?: QueriesCommonI): T }
    ): Promise<T | null>;

    protected async getOrder(
        qb: SelectQueryBuilder<OrderEntity>,
        searchParams: QueriesCommonI
    ): Promise<OrderI | null>;

    protected async getOrder<T = OrderI>(
        qb: SelectQueryBuilder<OrderEntity>,
        searchParams: QueriesCommonI,
        resConstructor?: { new(res: OrderEntity, searchParams?: QueriesCommonI): T }
    ): Promise<T | OrderI | null> {
        const res = await qb
            .leftJoinAndSelect('order.items', 'items')
            .leftJoinAndSelect('items.product', 'p')
            .leftJoinAndSelect('p.title', 'title')
            .leftJoinAndSelect('p.images', 'images')
            .orderBy({
                'items.created_at': 'DESC',
                'items.id': 'ASC', // when some items are added to cart, they have equal created_at value
            })
            .getOne();

        if (!res) return null;

        return resConstructor ? new resConstructor(res, searchParams) : res;
    }
}

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SelectQueryBuilder } from 'typeorm';
import { Injectable } from '@nestjs/common';

import OrderEntity from './order.entity';
import { SessionI } from '../session/session.interface';
import { OrderI } from './order.interface';
import { QueriesCommonI } from '../queries/queries.interface';
import { genID } from '@shared/utils/genIds';

@Injectable()
export default class OrderService {
    constructor(
        @InjectRepository(OrderEntity) public readonly orderRepo: Repository<OrderEntity>,
    ) { }

    /**
     * @description create new order with session ID
     * @param sid session ID
     * @returns created order with 1 status
     */
    public async createOrder(sid: SessionI['sid']): Promise<OrderI> {
        return await this.orderRepo.save({ sid, id: genID() });
    }

    /**
     * @description split relative tables for order by query builder
     * @param qb current query builder to continue building query
     * @param searchParams search parameters from URL query
     * @param resConstructor constructor for result maping
     * @returns completed OrderPublicDTO or null
     */
    public async getOrder<T>(
        qb: SelectQueryBuilder<OrderEntity>,
        searchParams: QueriesCommonI,
        resConstructor: { new(res: OrderEntity, searchParams?: QueriesCommonI): T }
    ): Promise<T | null>;

    public async getOrder(
        qb: SelectQueryBuilder<OrderEntity>,
        searchParams: QueriesCommonI
    ): Promise<OrderI | null>;

    public async getOrder<T = OrderI>(
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

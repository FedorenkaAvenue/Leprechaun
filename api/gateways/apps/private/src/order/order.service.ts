import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { UpdateOrderStatusDTO } from './order.dto';
import { OrderI } from '@core/order/order.interface';
import { QueriesCommonI } from '@core/queries/queries.interface';
import OrderEntity from '@core/order/order.entity';
import { ProductI } from '@core/product/product.interface';
import OrderCoreService from '@core/order/order.service'

@Injectable()
export default class OrderService {
    constructor(
        @InjectRepository(OrderEntity) public readonly orderRepo: Repository<OrderEntity>,
        private readonly orderCoreService: OrderCoreService
    ) { }

    public async getOrderById(id: OrderI['id'], params: QueriesCommonI): Promise<OrderI | null> {
        const qb = this.orderRepo.createQueryBuilder('order').where({ id });
        const res = await this.orderCoreService.getOrder(qb, params);

        return res;
    }

    public changeOrderStatus(orderId: OrderI['id'], { status }: UpdateOrderStatusDTO): Promise<UpdateResult> {
        return this.orderRepo.update({ id: orderId }, { status });
    }

    public getOrders(): Promise<OrderI[]> {
        return this.orderRepo.find();
    }

    public async getOrdersByProductId(productId: ProductI['id']): Promise<OrderI[]> {
        return await this.orderRepo
            .createQueryBuilder('order')
            .leftJoinAndSelect('order.items', 'items')
            .leftJoin('items.product', 'product')
            .where('product.id = :id', { id: productId })
            .getMany();
    }

    public removeOrder(id: OrderI['id']): Promise<DeleteResult> {
        return this.orderRepo.delete({ id });
    }
}

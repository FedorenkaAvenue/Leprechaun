import { Injectable } from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';

import { OrderI } from '@interfaces/Order';
import OrderService from '.';
import { ProductI } from '@interfaces/Product';
import { UpdateOrderStatusDTO } from '@dto/Order/private';
import { QueriesCommonI } from '@interfaces/Queries';

@Injectable()
export default class OrderPrivateService extends OrderService {
    public async getOrderById(id: OrderI['id'], params: QueriesCommonI): Promise<OrderI | null> {
        const qb = this.orderRepo.createQueryBuilder('order').where({ id });
        const res = await this.getOrder(qb, params);

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

import { NotFoundException } from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';

import { UpdateOrderStatusDTO } from '@dto/Order';
import { IOrder, IOrderPublic } from '@interfaces/Order';
import OrderHelperService from './helper';
import { IProduct } from '@interfaces/Product';
import { ORDER_RELATIONS } from '.';

export default class OrderAdminService extends OrderHelperService {
    async getOrderById(id: IOrder['id']): Promise<IOrderPublic> {
        const qb = this.orderRepo
            .createQueryBuilder('order')
            .where({ id });

        const res = await this.getOrder(qb);

        if (res) return res;

        throw new NotFoundException('order not found');
    }

    changeOrderStatus(
        orderId: IOrder['id'],
        { status }: UpdateOrderStatusDTO
    ): Promise<UpdateResult> {
        return this.orderRepo.update({ id: orderId }, { status });
    }

    getAdminOrders(): Promise<IOrder[]> {
        return this.orderRepo.find({
            relations: ORDER_RELATIONS
        });
    }

    async getOrdersByProductId(productId: IProduct['id']): Promise<IOrder[]> {
        return await this.orderRepo
            .createQueryBuilder('order')
            .leftJoinAndSelect('order.list', 'list')
            .leftJoin('list.product', 'product')
            .where('product.id = :id', { id: productId })
            .getMany();
    }

    removeOrder(id: IOrder['id']): Promise<DeleteResult> {
        return this.orderRepo.delete({ id });
    }
}

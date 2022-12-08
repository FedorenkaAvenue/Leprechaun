import { OrderItemI } from '@interfaces/OrderItem';
import { OrderItemPublic } from '@dto/OrderItem/constructor';
import { OrderPublicDTO, OrderSummaryDTO } from '.';
import { OrderEntity } from '@entities/Order';
import { QueriesProductT } from '@interfaces/Queries';

export class OrderSummary extends OrderSummaryDTO {
    constructor(items: OrderItemI[]) {
        super();
        this.price = items.reduce<number>((prev, { product, amount }) => product.price.current * amount + prev, 0);
        this.productsAmount = items.length;
    }
}

export class OrderPublic extends OrderPublicDTO {
    constructor({ id, status, list, updated_at }: OrderEntity, searchParams: QueriesProductT) {
        super();
        this.id = id;
        this.status = status;
        this.list = list.map(prod => new OrderItemPublic(prod, searchParams));
        this.summary = new OrderSummary(list);
        this.updated_at = updated_at;
    }
}

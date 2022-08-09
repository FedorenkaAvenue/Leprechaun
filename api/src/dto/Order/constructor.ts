import { IOrder } from '@interfaces/Order';
import { IOrderItem } from '@interfaces/OrderItem';
import { OrderItemPublic } from '@dto/OrderItem/constructor';
import { OrderPublicDTO, OrderSummaryDTO } from '.';

export class OrderSummary extends OrderSummaryDTO {
    constructor(items: Array<IOrderItem>) {
        super();
        this.price = items.reduce<number>((prev, { product, amount }) => product.price.current * amount + prev, 0);
        this.productsAmount = items.length;
    }
}

export class OrderPublic extends OrderPublicDTO {
    constructor({ id, status, list }: IOrder) {
        super();
        this.id = id;
        this.status = status;
        this.list = list.map(prod => new OrderItemPublic(prod));
        this.summary = new OrderSummary(list);
    }
}

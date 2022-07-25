import { IOrderItem } from '@interfaces/OrderItem';
import { OrderItemDTO } from '.';
import { Price } from '@dto/Price/constructor';
import { ProductPreview } from '@dto/Product/constructor';

export class OrderItemPublic extends OrderItemDTO {
    constructor({ id, amount, product }: IOrderItem) {
        super();
        this.id = id;
        this.amount = amount;
        this.product = new ProductPreview(product);
        this.summaryPrice = new Price({
            current: product.price.current * amount,
            old: product.price.old * amount
        });
    }
}

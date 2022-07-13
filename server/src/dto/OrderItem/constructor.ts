import { ProductPreviewDTO } from '@dto/Product';
import { IOrderItem } from '@interfaces/OrderItem';
import { OrderItemDTO } from '.';
import { Price } from '@dto/Price/constructor';

export class OrderItemPublic extends OrderItemDTO {
    constructor({ id, amount, product }: IOrderItem) {
        super();
        this.id = id;
        this.amount = amount;
        this.product = new ProductPreviewDTO(product);
        this.summaryPrice = new Price({
            current: product.price.current * amount,
            old: product.price.old * amount
        });
    }
}

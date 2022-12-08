import { OrderItemDTO } from '.';
import { Price } from '@dto/Price/constructor';
import { ProductPreview } from '@dto/Product/constructor';
import { OrderItemEntity } from '@entities/OrderItem';
import { QueriesProductT } from '@interfaces/Queries';

export class OrderItemPublic extends OrderItemDTO {
    constructor({ id, amount, product }: OrderItemEntity, searchParams: QueriesProductT) {
        super();
        this.id = id;
        this.amount = amount;
        this.product = new ProductPreview(product, searchParams);
        this.summaryPrice = new Price({
            current: product.price.current * amount,
            old: product.price.old * amount,
        });
    }
}

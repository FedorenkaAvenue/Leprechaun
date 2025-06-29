import { OrderItemPublic } from "gen/order";
import { OrderItemEntity } from "./orderItem.entity";
import { ProductPreviewPublic } from "gen/product";

export default class OrderItemMapper {
    public static toViewPublic(
        { id, amount }: OrderItemEntity,
        product: ProductPreviewPublic,
    ): OrderItemPublic {
        return {
            id, amount, product,
            summaryPrice: {
                current: product.price.current * amount,
                old: product.price.old ? product.price.old * amount : undefined,
            },
        }
    }
}

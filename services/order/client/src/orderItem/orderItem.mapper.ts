import { ProductPreviewPublic } from "@fedorenkaavenue/leprechaun_lib_entities/server/product";
import { OrderItemPublic } from "@fedorenkaavenue/leprechaun_lib_entities/server/order";

import { OrderItemEntity } from "./orderItem.entity";

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

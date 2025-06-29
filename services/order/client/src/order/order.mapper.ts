import { OrderItemPublic, OrderPublic } from "gen/order";
import OrderEntity from "./order.entity";
import OrderItemMapper from "../orderItem/orderItem.mapper";
import { ProductPreviewPublic, ProductStatus } from "gen/product";
import { OrderItemEntity } from "../orderItem/orderItem.entity";

export default class OrderMapper {
    public static toViewPublic(
        { id, status, items }: OrderEntity,
        productList: ProductPreviewPublic[],
    ): OrderPublic {
        const availableProducts = productList.filter(({ status }) => status === ProductStatus.AVAILABLE_STATUS);
        const unavailableProducts = productList.filter(({ status }) => status !== ProductStatus.AVAILABLE_STATUS);

        return {
            id, status,
            items: availableProducts.length ? this.mapItems(items, availableProducts) : [],
            unavailableItems: unavailableProducts.length ? this.mapItems(items, unavailableProducts) : [],
            summary: {
                price: items.reduce(
                    (acc, { product, amount }) => {
                        const availableProduct = availableProducts.find(p => p.id === product);

                        return (availableProduct?.price.current || 0) * amount + acc;
                    },
                    0,
                ),
                productsAmount: items.reduce((acc, { amount }) => amount + acc, 0),
            },
        };
    }

    private static mapItems(items: OrderItemEntity[], productList: ProductPreviewPublic[]): OrderItemPublic[] {
        return items.map(item => OrderItemMapper.toViewPublic(
            item as OrderItemEntity,
            productList.find(({ id }) => id === item.product) as ProductPreviewPublic,
        ))
    }
}

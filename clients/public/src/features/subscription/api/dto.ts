import { ProductCardModel } from "@entities/product/model/interfaces";
import { SubscribeProductStatusSchema } from '../model/schemas';

export interface SubscribeProductStatusDTO extends SubscribeProductStatusSchema {
    productId: ProductCardModel['id']
}

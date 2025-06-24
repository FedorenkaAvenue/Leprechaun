import { ProductCardPublic } from '@gen/product';
import { SubscribeProductStatusSchema } from '../model/schemas';

export interface SubscribeProductStatusDTO extends SubscribeProductStatusSchema {
    productId: ProductCardPublic['id']
}

import { ProductStatusE } from '@enums/ProductStatus';
import ImageSchema from './Image';
import { LabelSchema } from './Label';
import { PriceSchema } from './Price';
import PropertyPublicI from './Property';

export default interface ProductCardSchema {
    id: string;
    title: string;
    status: ProductStatusE;
    price: PriceSchema;
    labels: LabelSchema[];
    images: ImageSchema[];
    properties: PropertyPublicI[];
}

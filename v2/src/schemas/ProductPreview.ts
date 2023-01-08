import { ProductStatusE } from '@enums/ProductStatus';
import { LabelSchema } from './Label';
import { PriceSchema } from './Price';

export default interface ProductPreviewSchema {
    id: string;
    title: string;
    status: ProductStatusE;
    price: PriceSchema;
    labels: LabelSchema[];
    image: string;
}

import { CategoryI } from '@interfaces/Category';
import { ImageI } from '@interfaces/Image';
import { PropertyI } from '@interfaces/Property';
import { LabelI } from '@interfaces/Label';
import { ProductStatus } from '@enums/Product';
import { PriceI } from './Price';

export interface BaseProductI {
    id?: string;
    title: string;
    status: ProductStatus;
    price?: PriceI;
    labels?: Array<LabelI>;
}

export interface ProductPreviewI extends BaseProductI {
    image: string;
}

export interface ProductPublicI extends BaseProductI {
    images: Array<ImageI>;
    category?: CategoryI;
    properties?: Array<PropertyI>;
}

export interface ProductI extends ProductPublicI {
    rating?: number;
    created_at?: Date;
    is_public?: boolean;
    comment: string;
    is_new: boolean;
}

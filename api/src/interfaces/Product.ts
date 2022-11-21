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
    labels?: LabelI[];
}

export interface ProductPreviewI extends BaseProductI {
    image: string;
}

export interface ProductCardI extends BaseProductI {
    images: ImageI[];
    properties?: PropertyI[];
}

export interface ProductI extends ProductCardI {
    category?: CategoryI;
    rating?: number;
    created_at?: Date;
    is_public?: boolean;
    comment: string;
    is_new: boolean;
}

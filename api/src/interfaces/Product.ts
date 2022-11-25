import { CategoryI, CategoryPublicI } from '@interfaces/Category';
import { ImageI } from '@interfaces/Image';
import { PropertyI, PropertyPublicI } from '@interfaces/Property';
import { LabelI } from '@interfaces/Label';
import { ProductStatusE } from '@enums/Product';
import { PriceI } from './Price';

export interface ProductBaseI {
    id?: string;
    title: string;
    status: ProductStatusE;
    price?: PriceI;
    labels?: LabelI[];
}

export interface ProductPreviewI extends ProductBaseI {
    image: string;
}

export interface ProductCardI extends ProductBaseI {
    images: ImageI[];
    properties?: PropertyPublicI[];
}

export interface ProductPublicI extends ProductBaseI {
    category?: CategoryPublicI;
    images: ImageI[];
    properties?: PropertyPublicI[];
}

export interface ProductI extends ProductBaseI {
    properties?: PropertyI[];
    images: ImageI[];
    category?: CategoryI;
    rating?: number;
    created_at?: Date;
    is_public?: boolean;
    comment: string;
    is_new: boolean;
}

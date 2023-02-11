import { CategoryI, CategoryPublicI } from '@interfaces/Category';
import { ImageI } from '@interfaces/Image';
import { PropertyI, PropertyPublicI } from '@interfaces/Property';
import { LabelI } from '@interfaces/Label';
import { ProductStatusE } from '@enums/Product';
import { PriceI } from './Price';
import WishlistItemEntity from '@entities/WishlistItem';
import { TransI } from './Trans';

//TODO refactoring interfaces by generics and extending

export interface ProductBaseI<T = TransI> {
    id?: string;
    title: T;
    status: ProductStatusE;
    price?: PriceI;
    labels?: LabelI[];
    description?: T;
}

export interface ProductPreviewI extends ProductBaseI<string> {
    image: string;
}

export interface ProductCardI extends ProductBaseI<string> {
    images: ImageI[];
    properties: PropertyPublicI[];
}

export interface ProductPublicI extends ProductBaseI<string> {
    category: CategoryPublicI;
    images: ImageI[];
    properties: PropertyPublicI[];
    wishlistCount: number;
    orderCount: number;
}

export interface ProductI extends ProductBaseI {
    description?: TransI;
    properties: PropertyI[];
    images: ImageI[];
    category: CategoryI;
    rating: number;
    created_at?: Date;
    is_public?: boolean;
    comment: string;
    is_new: boolean;
    orderCount?: number;
    wishlistCount?: WishlistItemEntity[];
}

export interface ProductSearchI extends Pick<ProductI, 'id' | 'title'> {
    image: string;
}

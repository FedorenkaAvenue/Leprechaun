import { CategoryI, CategoryPublicI } from '@interfaces/Category';
import { ImageI } from '@interfaces/Image';
import { PropertyI } from '@interfaces/Property';
import { LabelI } from '@interfaces/Label';
import { ProductStatusE } from '@enums/Product';
import { PriceI } from './Price';
import WishlistItemEntity from '@entities/WishlistItem';
import { TransI } from './Trans';
import { OptionPublicI } from './PropertyGroup';

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

export interface ProductLightCardI extends ProductBaseI<string> {
    images: ImageI[];
}

export interface ProductCardI extends ProductBaseI<string> {
    images: ImageI[];
    options: OptionPublicI[];
}

export interface ProductPublicI extends ProductBaseI<string> {
    category: CategoryPublicI;
    images: ImageI[];
    wishlistCount: number;
    orderCount: number;
    options: OptionPublicI[];
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

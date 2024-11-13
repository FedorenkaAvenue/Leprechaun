import { ProductStatusE } from "@enums/Product";
import { TransI } from "./Trans";
import { PriceI } from "./Price";
import { LabelI } from "./Label";
import { ImageI } from "./Image";
import { OptionPublicI } from "./PropertyGroup";
import { CategoryI, CategoryPublicI } from "./Category";
import { PropertyI } from "./Property";
import WishlistItemEntity from "@entities/WishlistItem";

export interface ProductBaseI<T = TransI> {
    id?: string;
    title: T;
    status: ProductStatusE;
    price?: PriceI;
    labels?: LabelI[];
    description?: T;
}

// private

export interface ProductPreviewI extends ProductBaseI {
    category: CategoryI;
    rating: number;
    created_at: Date;
    is_public: boolean;
    comment: string;
    is_new: boolean;
}

export interface ProductI extends ProductPreviewI {
    images: ImageI[];
    properties: PropertyI[];
    orderCount: number;
    wishlistCount?: WishlistItemEntity[];
}

export interface ProductLightCardI extends ProductBaseI<string> {
    images: ImageI[];
}

// public

export interface ProductPreviewPublicI extends ProductBaseI<string> {
    image: string;
}

export interface ProductCardPublicI extends ProductBaseI<string> {
    images: ImageI[];
    options: OptionPublicI[];
}

export interface ProductPublicI extends ProductCardPublicI {
    category: CategoryPublicI;
    images: ImageI[];
    wishlistCount: number;
    orderCount: number;
    options: OptionPublicI[];
}

import { ProductStatusE } from "@enums/Product";
import { TransI } from "./Trans";
import { PriceI } from "./Price";
import { LabelI } from "./Label";
import { ImageI } from "./Image";
import { CategoryI, CategoryPublicI } from "./Category";
import { PropertyI } from "./Property";
import { OptionPublicI } from "./Option";

interface BaseI<T> {
    id: string;
    title: T;
    status: ProductStatusE;
    price: PriceI;
}

// private

export interface ProductBaseI extends BaseI<TransI> {
    category: CategoryI;
    rating: number;
    created_at: Date;
    is_public: boolean;
    is_new: boolean;
    comment: string;
}

export interface ProductPreviewI extends ProductBaseI {
    image: string;
}

export interface ProductI extends ProductBaseI {
    images: ImageI[];
    properties: PropertyI[];
    orderCount: number;
    description: TransI;
}

// public

export interface ProductPublicBaseI extends BaseI<string> {
    labels: LabelI[];
}

export interface ProductPreviewPublicI extends ProductPublicBaseI {
    image: string;
}

export interface ProductCardPublicI extends ProductPublicBaseI {
    images: ImageI[];
    options: OptionPublicI[];
    description: string;
}

export interface ProductPublicI extends ProductCardPublicI {
    description: string;
    category: CategoryPublicI;
    orderCount: number;
}

import { TransI } from "../trans/trans.interface";
import { ProductStatus } from "./product.enum";
import { CategoryI } from "../category/category.interface";
import { ImageI } from "../image/image.interface";
import { PropertyI } from "../property/property.interface";
import { PropertyGroupI } from "../propertyGroup/propertyGroup.interface";
import { PriceI } from "@shared/interfaces/price.interface";

export interface ProductBaseI<T = TransI> {
    id: string;
    title: T;
    status: ProductStatus;
    price: PriceI;
    category: CategoryI;
    rating: number;
    created_at: Date;
    is_public: boolean;
    is_new: boolean;
    comment: string;
}

export interface ProductPreviewI extends ProductBaseI {
    image: string | null;
}

export interface ProductI extends ProductBaseI {
    images: ImageI[];
    properties: PropertyI[];
    orderCount: number;
    description: TransI;
}

export interface OptionI extends PropertyGroupI {
    properties: PropertyI[];
}

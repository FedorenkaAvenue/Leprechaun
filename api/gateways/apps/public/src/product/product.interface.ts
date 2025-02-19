import { CategoryPublicI } from "../category/category.interface";
import { ProductLabel } from "./product.enum";
import { PropertyGroupPublicI } from "../propertyGroup/propertyGroup.interface";
import { PropertyPublicI } from "../property/property.interface";
import { ProductImageI } from "@core/productImage/productImage.interface";
import { ProductI } from "@core/product/product.interface";

export interface ProductPublicBaseI extends Pick<ProductI, 'id' | 'status' | 'price'> {
    title: string
    labels: ProductLabelI[];
}

export interface ProductPreviewPublicI extends ProductPublicBaseI {
    image: string;
}

export interface ProductCardPublicI extends ProductPublicBaseI {
    images: ProductImageI[];
    options: OptionPublicI[];
    description: string;
}

export interface ProductPublicI extends ProductCardPublicI {
    description: string;
    category: CategoryPublicI;
    orderCount: number;
}

export interface ProductLabelI {
    type: ProductLabel;
    value: string | null;
}

export interface OptionPublicI extends PropertyGroupPublicI {
    properties: PropertyPublicI[];
}

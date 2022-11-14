import { ProductI } from '@interfaces/Product';
import { PropertyGroupI } from '@interfaces/PropertyGroup';

export interface CategoryBaseI<T = string> {
    id?: number;
    url: string;
    title: string;
    icon: T | null;
}

export type CategoryPublicI = CategoryBaseI;

export interface CategoryI extends CategoryBaseI {
    products?: Array<ProductI> | null;
    property_groups?: Array<PropertyGroupI> | null;
    is_public: boolean;
    comment: string;
}

import { PropertyGroupPreviewI } from '@interfaces/PropertyGroup';
import { TransI } from './Trans';
import { ProductPreviewI } from './Product';

interface BaseI<I = string, T = TransI> {
    id?: number;
    url: string;
    title: T;
    icon: I | null;
}

export type CategoryPublicI = BaseI<string, string>;

export interface CategoryPreviewI extends BaseI {
    is_public: boolean;
    comment: string;
}

export interface CategoryI extends CategoryPreviewI {
    products: ProductPreviewI[] | null;
    propertygroups: PropertyGroupPreviewI[] | null;
}

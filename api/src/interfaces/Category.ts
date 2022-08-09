import { IProduct } from '@interfaces/Product';
import { IPropertyGroup } from '@interfaces/PropertyGroup';

export interface ICategoryBase<T = string> {
    id?: number;
    url: string;
    title: string;
    icon: T | null;
}

export interface ICategoryPublic extends ICategoryBase {}

export interface ICategory extends ICategoryBase {
    products?: Array<IProduct> | null;
    property_groups?: Array<IPropertyGroup> | null;
    is_public: boolean;
    comment: string;
}

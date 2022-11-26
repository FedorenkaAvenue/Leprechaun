import { ProductI } from '@interfaces/Product';
import { PropertyGroupI } from '@interfaces/PropertyGroup';

interface BaseI<T = string> {
    id?: number;
    url: string;
    title: string;
    icon: T | null;
}

export type CategoryPublicI = BaseI;

export interface CategoryI extends BaseI {
    products?: ProductI[] | null;
    property_groups?: PropertyGroupI[] | null;
    is_public: boolean;
    comment: string;
}

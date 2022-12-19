import { ProductI } from '@interfaces/Product';
import { PropertyGroupI } from '@interfaces/PropertyGroup';
import { TransI } from './Trans';

interface BaseI<I = string, T = TransI> {
    id?: number;
    url: string;
    title: T;
    icon: I | null;
}

export type CategoryPublicI = BaseI;

export interface CategoryI extends BaseI {
    products?: ProductI[] | null;
    propertygroups?: PropertyGroupI[] | null;
    is_public: boolean;
    comment: string;
}

import { PropertyGroupI, PropertyGroupPublicI } from './PropertyGroup';
import { TransI } from './Trans';

interface BaseI<P = PropertyGroupI, T = TransI> {
    id?: number;
    title: T;
    alt_name: string;
    propertygroup?: P;
}

export type PropertyPublicI = BaseI<PropertyGroupPublicI, string>;

export interface PropertyI extends BaseI {
    comment?: string;
}

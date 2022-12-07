import { PropertyGroupI, PropertyGroupPublicI } from './PropertyGroup';

interface BaseI<P = PropertyGroupI> {
    id?: number;
    title: string;
    alt_name: string;
    propertygroup?: P;
}

export type PropertyPublicI = BaseI<PropertyGroupPublicI>;

export interface PropertyI extends BaseI {
    comment?: string;
}

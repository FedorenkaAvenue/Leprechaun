import { PropertyGroupI, PropertyGroupPublicI } from './PropertyGroup';

interface BaseI<P = PropertyGroupI> {
    id?: number;
    title: string;
    alt_name: string;
    property_group?: P;
}

export type PropertyPublicI = BaseI<PropertyGroupPublicI>;

export interface PropertyI extends BaseI {
    is_primary: boolean;
    comment?: string;
}

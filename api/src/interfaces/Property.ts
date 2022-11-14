import { PropertyGroupI } from './PropertyGroup';

interface PropertyBaseI {
    id?: number;
    property_group?: PropertyGroupI;
    title: string;
    alt_name: string;
}

export interface PropertyI extends PropertyBaseI {
    comment?: string;
}

export interface PropertyPublicI extends PropertyBaseI {}

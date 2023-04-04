import { PropertyI, PropertyPublicI } from './Property';
import { TransI } from './Trans';

interface BaseI<T = TransI> {
    id?: number;
    title: T;
    alt_name: string;
}

export interface PropertyGroupI extends BaseI {
    is_primary?: boolean;
    comment?: string;
}

export type PropertyGroupPublicI = BaseI<string>;

export interface OptionI extends PropertyGroupI {
    properties: PropertyI[];
}

export interface OptionPublicI extends PropertyGroupPublicI {
    properties: PropertyPublicI[];
}

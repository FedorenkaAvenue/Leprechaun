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

// TODO сука блять ёбаный TS
// TODO refactoring interfaces by generics and extending

// mapped property group
export interface OptionI extends PropertyGroupI {
    properties: PropertyI[];
}

export interface OptionPublicI extends PropertyGroupPublicI {
    properties: PropertyPublicI[];
}

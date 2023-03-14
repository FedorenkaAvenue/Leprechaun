import { TransI } from './Trans';

interface BaseI<T = TransI> {
    id?: number;
    title: T;
    alt_name: string;
}

export type PropertyPublicI = BaseI<string>;

export interface PropertyI extends BaseI {
    comment?: string;
}

import { TransI } from './Trans';

interface BaseI<T> {
    id: number;
    title: T;
    alt_name: string;
}

export interface PropertyI extends BaseI<TransI> {
    comment: string;
}

export type PropertyPublicI = BaseI<string>;

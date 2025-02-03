import { TransI } from './Trans';

interface BaseI<T> {
    id: number
    title: T
    alt_name: string
}

export type PropertyPublicI = BaseI<string>

export interface PropertyI extends BaseI<TransI> {
    comment: string
    created_at: Date
    updated_at: Date
}

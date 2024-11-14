import { CategoryPreviewI } from './Category';
import { TransI } from './Trans';

interface BaseI<T> {
    id?: number;
    title: T;
    alt_name: string;
}

// private

export interface PropertyGroupPreviewI extends BaseI<TransI> {
    is_primary: boolean;
    comment: string;
}

export interface PropertyGroupI extends PropertyGroupPreviewI {
    categories: CategoryPreviewI[]
}

// public

export type PropertyGroupPublicI = BaseI<string>;
